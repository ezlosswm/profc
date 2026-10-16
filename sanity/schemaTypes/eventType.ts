import { defineField, defineType } from "sanity";

export const eventType = defineType({
  // This is how the document is going to be called
  name: "nextEvent",
  title: "Next Event",
  type: "document",

  // This is what goes in the document
  fields: [
    // name
    defineField({
      name: "name",
      title: "Event Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    // dateLabel
    defineField({
      name: "dateLabel",
      title: "Date Label",
      type: "string",
      description: "Human-readable date (e.g., Saturday, November 14)",
    }),
    // startsAt
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
    // venue
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
    }),
    // city
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    // image
    // defineField({
    //   name: 'image',
    //   type: 'image',
    // }),
  ],
});
