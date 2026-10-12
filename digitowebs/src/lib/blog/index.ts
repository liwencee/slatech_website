import { OCT_2026_POSTS } from "./posts-oct-2026";
import { BATCH_2_POSTS } from "./posts-batch-2";

export type { BlogPost, ContentParagraph } from "./posts-oct-2026";

// Posts kept outside the page files, newest batch first. Used by /blog,
// /blog/[slug] and the sitemap.
export const EXTRA_POSTS = { ...BATCH_2_POSTS, ...OCT_2026_POSTS };
