type Crumb = { name: string; path: string };

/**
 * Renders BreadcrumbList JSON-LD for SERP breadcrumb display. `path` is
 * relative (e.g. "/services") — the base URL is applied here so callers
 * never hardcode the domain.
 */
export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const baseUrl = "https://slatech.com.ng";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
