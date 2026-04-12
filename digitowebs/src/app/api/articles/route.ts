import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { articleCreateSchema, articleQuerySchema } from "@/lib/validations/article";
import { validateRequestBody, validateQueryParams } from "@/lib/security/validate-request";

export async function GET(request: NextRequest) {
  const validation = validateQueryParams(
    request.nextUrl.searchParams,
    articleQuerySchema
  );
  if (!validation.success) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  const { page, per_page, status, category, search, sort, order } =
    validation.data;
  const offset = (page - 1) * per_page;

  const supabase = await createClient();

  let query = supabase
    .from("articles")
    .select("*, categories(name, slug), profiles(full_name)", {
      count: "exact",
    });

  // Public users can only see published articles
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    query = query.eq("status", "published");
  } else if (status) {
    query = query.eq("status", status);
  }

  if (category) {
    query = query.eq("category_id", category);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  const { data, error, count } = await query
    .order(sort, { ascending: order === "asc" })
    .range(offset, offset + per_page - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    pagination: {
      page,
      per_page,
      total: count ?? 0,
      total_pages: Math.ceil((count ?? 0) / per_page),
    },
  });
}

export async function POST(request: NextRequest) {
  const validation = await validateRequestBody(request, articleCreateSchema);
  if (!validation.success) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tag_ids, ...articleData } = validation.data;

  // Auto-generate slug from title if not provided
  const slug =
    articleData.slug ||
    articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const { data, error } = await supabase
    .from("articles")
    .insert({
      ...articleData,
      slug,
      author_id: user.id,
      published_at:
        articleData.status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "An article with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Insert tag associations
  if (tag_ids?.length && data) {
    await supabase.from("article_tags").insert(
      tag_ids.map((tag_id) => ({
        article_id: data.id,
        tag_id,
      }))
    );
  }

  return NextResponse.json(data, { status: 201 });
}
