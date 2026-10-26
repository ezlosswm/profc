import { defineField, defineType } from "sanity";

export const allEventsType = defineType({
  name: "allEvents",
  title: "All Events",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Event Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 48,
      },
    }),
    defineField({
      name: "redCorner",
      title: "Red Corner",
      type: "reference",
      to: [{ type: "fighter" }],
      description: "Fighter One",
    }),
    defineField({
      name: "blueCorner",
      title: "Blue Corner",
      type: "reference",
      to: [{ type: "fighter" }],
      description: "Fighter Two",
    }),
    defineField({
      name: "dateLabel",
      title: "Date Label",
      type: "string",
      description: "Human-readable date (e.g., Saturday, November 14)",
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
      validation: (rule) => rule.required(),
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
      name: "image",
      title: "Event Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
