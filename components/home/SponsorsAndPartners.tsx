import Image from "next/image";
import Section from "../ui/section";
import { SectionHeading } from "../ui/sectionheading";
import type { Sponsor } from "@/types/types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

type SponsorsProps = {
  sponsors: Sponsor[];
};

export default async function SponsorsAndPartners({ sponsors }: SponsorsProps) {
  return (
    <div className="border-t border-border py-16 md:py-20">
      <Section aria-labelledby="sponsors-title">
        <SectionHeading id="sponsors-title" heading="Sponsors & Partners" />

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <li
              key={sponsor.sponsorName}
              className="group text-center overflow-hidden "
            >
              <Link
                href={sponsor.href}
                target="_blank"
                className="relative flex items-center justify-center w-full h-32 md:h-40 bg-white/5"
                rel="noreferrer noopener"
              >
                <Image
                  src={urlFor(sponsor.sponsorImage)
                    .width(200)
                    .height(200)
                    .auto("format")
                    .url()}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  alt={sponsor.sponsorName}
                  className="object-cover object-center group-hover:scale-105 transition-transform"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
