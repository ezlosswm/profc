import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "events",
  title: "Events",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Event name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline matchup",
      description: "e.g. Cortes vs Soto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startsAt",
      title: "Starts At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      description:
        "Optional. If empty the site uses the date to decide upcoming vs completed.",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Event artwork",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "fightCard",
      title: "Fight card",
      description: "Ordered list of bouts. Mark one or more as main events.",
      type: "array",
      of: [{ type: "fight" }],
    }),
  ],
});
