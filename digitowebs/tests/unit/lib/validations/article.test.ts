import { describe, it, expect } from "vitest";
import { articleCreateSchema, articleQuerySchema } from "@/lib/validations/article";

describe("articleCreateSchema", () => {
  it("accepts valid article data", () => {
    const result = articleCreateSchema.safeParse({
      title: "Test Article",
      content: { type: "doc", content: [] },
      status: "draft",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = articleCreateSchema.safeParse({
      title: "",
      content: null,
    });
    expect(result.success).toBe(false);
  });

  it("rejects title exceeding 200 characters", () => {
    const result = articleCreateSchema.safeParse({
      title: "a".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("validates slug format", () => {
    const valid = articleCreateSchema.safeParse({
      title: "Test",
      slug: "valid-slug-123",
    });
    expect(valid.success).toBe(true);

    const invalid = articleCreateSchema.safeParse({
      title: "Test",
      slug: "Invalid Slug!",
    });
    expect(invalid.success).toBe(false);
  });

  it("validates status enum", () => {
    const valid = articleCreateSchema.safeParse({
      title: "Test",
      status: "published",
    });
    expect(valid.success).toBe(true);

    const invalid = articleCreateSchema.safeParse({
      title: "Test",
      status: "unknown",
    });
    expect(invalid.success).toBe(false);
  });

  it("validates category_id as UUID", () => {
    const valid = articleCreateSchema.safeParse({
      title: "Test",
      category_id: "550e8400-e29b-41d4-a716-446655440000",
    });
    expect(valid.success).toBe(true);

    const invalid = articleCreateSchema.safeParse({
      title: "Test",
      category_id: "not-a-uuid",
    });
    expect(invalid.success).toBe(false);
  });

  it("limits tag_ids to 10", () => {
    const uuids = Array.from({ length: 11 }, (_, i) =>
      `550e8400-e29b-41d4-a716-44665544${String(i).padStart(4, "0")}`
    );
    const result = articleCreateSchema.safeParse({
      title: "Test",
      tag_ids: uuids,
    });
    expect(result.success).toBe(false);
  });

  it("validates meta_title length", () => {
    const result = articleCreateSchema.safeParse({
      title: "Test",
      meta_title: "a".repeat(71),
    });
    expect(result.success).toBe(false);
  });

  it("validates meta_description length", () => {
    const result = articleCreateSchema.safeParse({
      title: "Test",
      meta_description: "a".repeat(161),
    });
    expect(result.success).toBe(false);
  });
});

describe("articleQuerySchema", () => {
  it("applies defaults", () => {
    const result = articleQuerySchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.per_page).toBe(20);
      expect(result.data.sort).toBe("published_at");
      expect(result.data.order).toBe("desc");
    }
  });

  it("coerces string numbers", () => {
    const result = articleQuerySchema.safeParse({
      page: "3",
      per_page: "50",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(3);
      expect(result.data.per_page).toBe(50);
    }
  });

  it("rejects per_page over 100", () => {
    const result = articleQuerySchema.safeParse({
      per_page: "101",
    });
    expect(result.success).toBe(false);
  });

  it("rejects page less than 1", () => {
    const result = articleQuerySchema.safeParse({
      page: "0",
    });
    expect(result.success).toBe(false);
  });
});
