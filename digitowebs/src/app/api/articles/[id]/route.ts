import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { articleUpdateSchema } from "@/lib/validations/article";
import { validateRequestBody } from "@/lib/security/validate-request";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*, categories(name, slug), profiles(full_name)")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const validation = await validateRequestBody(request, articleUpdateSchema);
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

  const { tag_ids, ...updateData } = validation.data;

  // Set published_at if transitioning to published
  if (updateData.status === "published") {
    const { data: existing } = await supabase
      .from("articles")
      .select("published_at")
      .eq("id", id)
      .single();

    if (existing && !existing.published_at) {
      (updateData as Record<string, unknown>).published_at =
        new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from("articles")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Update tag associations if provided
  if (tag_ids) {
    await supabase.from("article_tags").delete().eq("article_id", id);
    if (tag_ids.length > 0) {
      await supabase.from("article_tags").insert(
        tag_ids.map((tag_id) => ({
          article_id: id,
          tag_id,
        }))
      );
    }
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
