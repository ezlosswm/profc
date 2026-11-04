import { FIGHTERS_QUERY } from "@/lib/queries/queries";
import { sanityFetch } from "@/lib/sanity";
import { Fighter } from "@/types/types";
import { urlFor } from "@/sanity/lib/image";
import Section from "../ui/section";
import FightersCarousel from "./FightersCarousel";

export default async function Fighters() {
  const fighters = await sanityFetch<Fighter[]>({
    query: FIGHTERS_QUERY,
  });

  const slides = (fighters ?? []).map((fighter) => ({
    id: fighter._id,
    name: fighter.name,
    imageUrl: urlFor(fighter.image).width(1000).height(1000).url(),
  }));

  return (
    <Section className="w-full border-t border-border py-16 md:py-20">
      <FightersCarousel fighters={slides} />
    </Section>
  );
}
