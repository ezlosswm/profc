import { defineField, defineType } from "sanity";

type FightReference = {
  _ref?: string;
};

type FightDocument = {
  redCorner?: FightReference;
  blueCorner?: FightReference;
  status?: "scheduled" | "completed" | "cancelled";
  scheduledRounds?: number;
  result?: {
    winner?: FightReference;
    round?: number;
  };
};

export const fightsType = defineType({
  name: "fight",
  title: "Fight",
  type: "document",
  fields: [
    defineField({
      name: "redCorner",
      title: "Red corner",
      type: "reference",
      to: [{ type: "fighter" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blueCorner",
      title: "Blue corner",
      type: "reference",
      to: [{ type: "fighter" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isMainEvent",
      title: "Main Event",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "weightClass",
      title: "Weight class",
      type: "string",
      options: {
        list: [
          "Strawweight",
          "Flyweight",
          "Featherweight",
          "Bantamweight",
          "Lightweight",
        ],
      },
    }),
    defineField({
      name: "scheduledRounds",
      title: "Scheduled rounds",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (Rule) => Rule.integer().min(1).max(5),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "scheduled",
      options: {
        list: [
          { title: "Scheduled", value: "scheduled" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "result",
      title: "Official result",
      type: "fightResult",
      hidden: ({ parent }) => parent?.status !== "completed",
    }),
  ],

  validation: (Rule) =>
    Rule.custom((value) => {
      const fight = value as FightDocument | undefined;

      if (!fight) return true;

      const redCorner = fight.redCorner?._ref;
      const blueCorner = fight.blueCorner?._ref;

      // Completed fights need both fighters.
      if (fight.status === "completed" && (!redCorner || !blueCorner)) {
        return "A completed fight needs both fighters.";
      }

      // Results can only exist on completed fights.
      if (fight.result && fight.status !== "completed") {
        return "Results can only be recorded on completed fights.";
      }

      // Fighters cannot fight themselves.
      if (redCorner && redCorner === blueCorner) {
        return "A fighter can't fight themselves.";
      }

      // Winner must be one of the two fighters.
      const winner = fight.result?.winner?._ref;

      if (winner && winner !== redCorner && winner !== blueCorner) {
        return "The winner must be one of the two fighters.";
      }

      // Result round cannot exceed scheduled rounds.
      if (
        fight.result?.round != null &&
        fight.scheduledRounds != null &&
        fight.result.round > fight.scheduledRounds
      ) {
        return "The finishing round can't exceed the scheduled rounds.";
      }

      return true;
    }),

  preview: {
    select: {
      red: "redCorner.name",
      blue: "blueCorner.name",
      main: "isMainEvent",
      weight: "weightClass",
    },
    prepare: ({ red, blue, main, weight }) => ({
      title: `${red ?? "TBA"} vs ${blue ?? "TBA"}`,
      subtitle: [main ? "Main event" : null, weight]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
