import Section from "../ui/section";
import { SectionHeading } from "../ui/sectionheading";
import type { Sponsor } from "@/types/types";

type SponsorsProps = {
  sponsors: Sponsor[];
};

export default async function SponsorsAndPartners({ sponsors }: SponsorsProps) {
  return (
    <div className="border-t border-border py-16 md:py-20">
      <Section aria-labelledby="sponsors-title">
        <SectionHeading id="sponsors-title" heading="Sponsors & Partners" />

        <ul className="mt-10 grid grid-cols-2 gap-px divide-x divide-y divide-border border border-border lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <li
              key={sponsor.sponsorName}
              className="flex flex-col items-center justify-center h-32 md:h-40 text-center px-4"
            >
              <span className="text-base font-semibold md:text-lg">
                {sponsor.sponsorName}
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
