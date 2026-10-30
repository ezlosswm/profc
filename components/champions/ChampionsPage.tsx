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
      <Section aria-labelledby="champion-title">
        <ChampionsInteractive
          champions={championsPageData!.champions}
          description={championsPageData!.description}
        />
      </Section>
    </main>
  );
}
