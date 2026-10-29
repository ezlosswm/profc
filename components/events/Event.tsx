import { SectionHeading } from "@/components/ui/sectionheading";
import Section from "@/components/ui/section";
import type { FightEvent } from "@/types/types";
import { Banner } from "./Banner";
import { FightCard } from "./FightCard";
import YouTubeEmbed from "../YouTubeEmbed";

type FightEventProps = {
  event: FightEvent;
};

export function Events({ event }: FightEventProps) {
  return (
    <>
      <Banner event={event!} />
      <main aria-labelledby="fight-card-title" className="bg-muted-background">
        <div className="mt-3">
          <YouTubeEmbed videoId="Kwk90VoBjXQ" />
        </div>
        <Section className="py-20 md:py-28">
          <SectionHeading id="fight-card-title" heading="Fight Card" />
          <ul className="space-y-6 mt-10">
            {event!.fightCard.map((fight) => (
              <li key={fight._key}>
                <FightCard fight={fight} />
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </>
  );
}
