import { Metadata } from "next";
import Section from "@/components/ui/section";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { AboutSectionData } from "@/types/types";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | PROFC Belize",
  description: "PROFC",
  openGraph: {
    title: "About Us | PROFC",
    description: "Home Page",
  },
};

const ABOUT_QUERY = `*[_type == "aboutSection"][0]`;

const options = {
  next: { revalidate: 30 },
};

async function About() {
  let aboutSectionData: AboutSectionData | null = null;

  try {
    aboutSectionData = await client.fetch<AboutSectionData>(
      ABOUT_QUERY,
      {},
      options,
    );
  } catch (error) {
    console.error("Query failed: ", (error as Error).message);
  }

  if (!aboutSectionData) {
    return <Section>No about info</Section>;
  }

  return (
    <>
      <main aria-labelledby="about-hero-title">
        <section className="relative min-h-[46vh]">
          <Image
            src={urlFor(aboutSectionData.image!.asset)
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
              {aboutSectionData.heading}
            </h1>
            <p className="text-foreground/70 mt-6 max-w-lg text-lg">
              {aboutSectionData.description}
            </p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="text-sm font-semibold text-foreground/70">
              Leadership & broadcast team
            </h2>
            <ul className="mt-4 divide-y divide-border border-border border-y">
              {aboutSectionData.team.map((team) => (
                <li
                  key={team.name}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-sm text-foreground/70">
                    {team.title}
                  </span>
                  <span className="text-lg font-semibold">{team.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>
    </>
  );
}

export default About;
