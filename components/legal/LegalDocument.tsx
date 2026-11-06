import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

type LegalSection = {
  id?: string;
  heading: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
  link?: { label?: string; to?: string };
};

type LegalDocumentProps = {
  doc: {
    title: string;
    path: string;
    lastUpdated: string;
    isDraft?: boolean;
    intro?: string;
    sections?: LegalSection[];
  };
};

export function LegalDocument({ doc }: LegalDocumentProps) {
  return (
    <section
      aria-labelledby="legal-title"
      className="min-h-[80vh] bg-background pt-32 md:pb-28 md:pt-40"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="max-w-3xl">
          <h1
            id="legal-title"
            className="font-heading text-6xl uppercase leading-[0.9] md:text-7xl"
          >
            {doc.title}
          </h1>
          <p className="mt-6 text-sm font-medium text-muted-foreground">
            Last updated {doc.lastUpdated}
          </p>
          {doc.isDraft && (
            <p className="mt-4 border-l-2 border-primary pl-4 text-sm text-foreground">
              Draft — this document is pending legal review.
            </p>
          )}
          {doc.intro && (
            <p className="mt-6 text-lg text-foreground">{doc.intro}</p>
          )}
        </header>

        <div className="mt-14 grid gap-12 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold text-muted-foreground">
                On this page
              </h2>
              <ol className="mt-4 space-y-2.5">
                {doc.sections?.map((s, idx) => {
                  const sectionId = s.id || `section-${idx}`;
                  return (
                    <li key={sectionId}>
                      <a
                        href={`#${sectionId}`}
                        className="text-sm text-foreground transition-colors duration-150 hover:text-foreground"
                      >
                        {s.heading}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          <div className="max-w-3xl lg:col-span-9">
            {doc.sections?.map((s, idx) => {
              const sectionId = s.id || `section-${idx}`;
              return (
                <section
                  key={sectionId}
                  id={sectionId}
                  aria-labelledby={`${sectionId}-heading`}
                  className="scroll-mt-24 border-b border-border py-10 first:pt-0 last:border-b-0"
                >
                  <h2
                    id={`${sectionId}-heading`}
                    className="font-heading text-3xl uppercase leading-none md:text-4xl"
                  >
                    {s.heading}
                  </h2>
                  {s.paragraphs?.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="mt-5 text-lg leading-relaxed text-muted-foreground"
                    >
                      {p}
                    </p>
                  ))}
                  {s.list && s.list.length > 0 && (
                    <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground marker:text-primary">
                      {s.list.map((item, lIdx) => (
                        <li key={lIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {s.after?.map((p, aIdx) => (
                    <p
                      key={aIdx}
                      className="mt-5 leading-relaxed text-muted-foreground"
                    >
                      {p}
                    </p>
                  ))}
                  {s.link?.to && (
                    <Link
                      href={s.link.to}
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
                    >
                      {s.link.label || "Learn more"}
                      <ArrowRightIcon
                        className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
