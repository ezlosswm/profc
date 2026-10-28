import { defineField, defineType } from "sanity";

const METHODS_WITH_WINNER = [
  "ko",
  "tko",
  "submission",
  "decision",
  "dq",
  "other",
];
const METHODS_WITH_TECHNIQUE = ["ko", "tko", "submission", "other"];

export const fightResult = defineType({
  name: "fightResult",
  title: "Official results",
  type: "object",
  fields: [
    defineField({
      name: "method",
      title: "Method",
      type: "string",
      options: {
        list: [
          { title: "KO", value: "ko" },
          { title: "TKO", value: "tko" },
          { title: "Submission", value: "submission" },
          { title: "Decision", value: "decision" },
          { title: "Draw", value: "draw" },
          { title: "No contest", value: "no_contest" },
          { title: "Disqualification", value: "dq" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "winner",
      title: "Winner",
      type: "reference",
      to: [{ type: "fighter" }],
      hidden: ({ parent }) =>
        !parent || !METHODS_WITH_WINNER.includes(parent.method),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { method?: string } | undefined;

          if (!parent?.method) return true;

          const needsWinner = METHODS_WITH_WINNER.includes(parent.method);

          if (needsWinner && !value) {
            return "A winner is required for this method.";
          }

          if (!needsWinner && value) {
            return "Draws and no contests can't have a winner.";
          }

          return true;
        }),
    }),
    defineField({
      name: "technique",
      title: "Finish technique",
      description:
        "e.g. Guillotine choke, Rear-naked choke, Armbar, Head kick.",
      type: "string",
      hidden: ({ parent }) =>
        !parent || !METHODS_WITH_TECHNIQUE.includes(parent.method),
    }),
    defineField({
      name: "decisionType",
      title: "Decision type",
      type: "string",
      options: {
        list: [
          { title: "Unanimous", value: "unanimous" },
          { title: "Split", value: "split" },
          { title: "Majority", value: "majority" },
        ],
      },
      hidden: ({ parent }) =>
        !parent || !["decision", "draw"].includes(parent.method),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { method?: string } | undefined;

          return parent?.method === "decision" && !value
            ? "Select the decision type."
            : true;
        }),
    }),
    defineField({
      name: "round",
      title: "Round ended",
      type: "number",
      validation: (Rule) => Rule.integer().min(1).max(5),
    }),
    defineField({
      name: "time",
      title: "Official time",
      description: "Format m:ss, e.g. 3:42",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^\d{1,2}:[0-5]\d$/, { name: "m:ss" }).error(
          "Use the format m:ss, e.g. 3:42.",
        ),
    }),
  ],
});
