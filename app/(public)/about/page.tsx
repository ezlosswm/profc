import { createPageMetadata } from "@/lib/seo";
import Section from "@/components/ui/section";
import { urlFor } from "@/sanity/image";
import { AboutPageData } from "@/types/types";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity";

export const metadata = createPageMetadata({
  title: "About PROFC Belize | Our MMA Promotion",
  description:
    "Learn about PROFC Belize, our mission, the team behind our MMA events, and our commitment to showcasing mixed martial arts in Belize.",
  path: "/about",
});

const ABOUT_QUERY = `*[_type == "aboutPage"][0]`;

async function About() {
  const aboutPageData = await sanityFetch<AboutPageData>({
    query: ABOUT_QUERY,
    errorMessage: "Unable to get about page data",
  });

  return (
    <main aria-labelledby="about-hero-title">
      <section className="relative min-h-[46vh]">
        <Image
          src={urlFor(aboutPageData!.image!.asset)
            .width(1920)
            .height(1080)
            .url()}
          alt="Ring side"
          width={1920}
          height={1920}
          priority
          className="absolute inset-0 -z-20 h-[46vh] min-h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-background/60" />
      </section>
      <Section className="grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h1
            id="about-hero-title"
            className="uppercase font-heading text-5xl mt-4 md:text-6xl"
          >
            {aboutPageData!.heading}
          </h1>
          <p className="text-foreground/70 mt-6 max-w-lg text-lg">
            {aboutPageData!.description}
          </p>
        </div>
        <div className="lg:col-span-6">
          <h2 className="text-sm font-semibold text-foreground/70">
            Leadership & broadcast team
          </h2>
          <ul className="mt-4 divide-y divide-border border-border border-y">
            {aboutPageData!.team.map((team) => (
              <li
                key={team.name}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-sm text-foreground/70">{team.title}</span>
                <span className="text-lg font-semibold">{team.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </main>
  );
}

export default About;
