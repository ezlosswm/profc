import { createPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { ChampionsPage } from "@/components/champions/ChampionsPage";

export const metadata = createPageMetadata({
  title: "MMA Champions & Titleholders | PROFC Belize",
  description:
    "Meet the PROFC Belize champions and titleholders. Explore championship divisions, fighter achievements, and the athletes competing for MMA titles.",
  path: "/champions",
});

export default function Champions() {
  return (
    <Suspense fallback={<Loader />}>
      <ChampionsPage />
    </Suspense>
  );
}
