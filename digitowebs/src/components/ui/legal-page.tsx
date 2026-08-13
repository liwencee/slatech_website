import Link from "next/link";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-secondary py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h1>
          <p className="text-sm text-gray-400">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-3 [&_p]:mb-3 [&_li]:mb-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          {children}
          <hr className="my-10 border-border" />
          <p className="text-sm text-muted-foreground">
            Questions about this policy? Contact us at{" "}
            <a href="mailto:info@slatech.com.ng" className="text-primary font-medium">
              info@slatech.com.ng
            </a>{" "}
            or{" "}
            <Link href="/contact" className="text-primary font-medium">
              via our contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
