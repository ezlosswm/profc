import { SectionHeading } from "@/components/ui/sectionheading";
import Section from "@/components/ui/section";
import type { FightEvent } from "@/types/types";
import { Banner } from "./Banner";
import { FightCard } from "./FightCard";

type FightEventProps = {
  event: FightEvent;
};

export function Events({ event }: FightEventProps) {
  return (
    <>
      <Banner event={event!} />
      <main aria-labelledby="fight-card-title">
        <Section className="bg-muted-background py-20 md:py-28">
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
