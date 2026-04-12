import { z } from "zod";

export const articleCreateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or fewer")
    .trim(),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be URL-safe lowercase with hyphens"
    )
    .optional(),
  content: z.any(),
  excerpt: z.string().max(500).optional(),
  cover_image_url: z.string().url().optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  category_id: z.string().uuid().optional().nullable(),
  meta_title: z.string().max(70).optional(),
  meta_description: z.string().max(160).optional(),
  tag_ids: z.array(z.string().uuid()).max(10).optional(),
});

export const articleUpdateSchema = articleCreateSchema.partial();

export const articleQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  per_page: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(["draft", "published", "archived"]).optional(),
  category: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  sort: z
    .enum(["published_at", "created_at", "title"])
    .default("published_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type ArticleCreateInput = z.infer<typeof articleCreateSchema>;
export type ArticleUpdateInput = z.infer<typeof articleUpdateSchema>;
export type ArticleQueryParams = z.infer<typeof articleQuerySchema>;
