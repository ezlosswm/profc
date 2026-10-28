import Section from "@/components/ui/section";
import { ChampionsPageData } from "@/types/types";
import ChampionsInteractive from "./ChampionsInteractive";
import { sanityFetch } from "@/lib/sanity";
import { CHAMPIONS_QUERY } from "@/lib/queries/queries";

export async function ChampionsPage() {
  const championsPageData = await sanityFetch<ChampionsPageData>({
    query: CHAMPIONS_QUERY,
    errorMessage: "Failed to get champion page data",
  });

  return (
    <main className="bg-muted-background pb-20 pt-32 md:pb-28 md:pt-40">
      <Section
        aria-labelledby="champion-title"
        className="grid lg:grid-cols-12 lg:grid-rows-4 gap-12 grid-rows-2"
      >
        <div className="lg:col-span-4 lg:row-span-1 row-start-1 lg:col-start-1">
          <h1
            id="champions-title"
            className="font-heading text-6xl uppercase leading-[0.9] md:text-7xl"
          >
            Our <br />
            Champions
          </h1>

          <p className="mt-6 max-w-sm text-muted-foreground">
            {championsPageData!.description}
          </p>
        </div>
        <ChampionsInteractive champions={championsPageData!.champions} />
      </Section>
    </main>
  );
}
