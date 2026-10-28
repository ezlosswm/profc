import type { Fight } from "@/types/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type FightProps = {
  fight: Fight;
};

function getLastname(name: string): string {
  const [, lastName] = name.split(" ");
  return lastName;
}

export function FightCard({ fight }: FightProps) {
  return (
    <article className="border border-border bg-background">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b px-5 py-3 md:px-8 border-border text-xs font-medium text-muted-foreground">
        {fight.isMainEvent ? (
          <span className="bg-primary px-2 py-px font-semibold text-white">
            Main event
          </span>
        ) : (
          <></>
        )}
        <span>{fight.weightClass}</span>
        <span className="h-3 w-px bg-border" aria-hidden="true"></span>
        <span>Rounds {fight.scheduledRounds}</span>
      </header>
      <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 md:p-8">
        {/* Left */}
        <div className="flex items-center gap-4 md:gap-5">
          <div className="size-24 md:size-36 flex shrink-0 items-center justify-center border border-border">
            <Image
              src={urlFor(fight.redCorner.image.asset)
                .width(200)
                .height(200)
                .url()}
              loading="lazy"
              width={200}
              height={200}
              alt={fight.redCorner.name}
              className="object-cover object-top"
            />
          </div>

          <div className="min-w-0 border-l-2 pl-4 border-primary">
            <p className="text-xs font-medium text-muted-foreground">
              Red corner
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="font-heading uppercase leading-none text-4xl md:text-5xl">
                {getLastname(fight.redCorner.name)}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span>Country</span>
                <span
                  className="font-medium
                            "
                >
                  {fight.redCorner.country?.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Record</span>
                <span>
                  {fight.redCorner.record.wins} -{" "}
                  {fight.redCorner.record.losses} -{" "}
                  {fight.redCorner.record.draws}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="font-heading text-primary text-3xl md:text-5xl">
            VS
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 md:gap-5 md:flex-row-reverse md:text-right">
          <div className="size-24 md:size-36 flex shrink-0 items-center justify-center border border-border">
            <Image
              src={urlFor(fight.blueCorner.image.asset)
                .width(200)
                .height(200)
                .auto("format")
                .fit("crop")
                .url()}
              loading="lazy"
              width={200}
              height={200}
              alt={fight.blueCorner.name}
              className="object-cover object-top"
            />
          </div>

          <div className="min-w-0 border-l-2 md:border-l-0 md:border-r-2 md:pl-0 pl-4 md:pr-4 border-muted-foreground">
            <p className="text-xs font-medium text-muted-foreground">
              Blue corner
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="font-heading uppercase leading-none text-4xl md:text-5xl">
                {getLastname(fight.blueCorner.name)}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span>Country</span>
                <span
                  className="font-medium
                            "
                >
                  {fight.blueCorner.country?.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Record</span>
                <span>
                  {fight.blueCorner.record.wins} -{" "}
                  {fight.blueCorner.record.losses} -{" "}
                  {fight.blueCorner.record.draws}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {fight.status !== "completed" ? (
        <footer className="border-t border-border px-5 py-4 md:px-8">
          <p className="text-sm text-muted-foreground">
            Official results not published yet
          </p>
        </footer>
      ) : (
        <>{/* <span>winner: </span> */}</>
      )}
    </article>
  );
}
