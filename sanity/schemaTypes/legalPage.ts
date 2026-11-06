import { defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "path",
      title: "Page Path",
      type: "string",
      description: "URL path, e.g. /privacy or /terms",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      options: {
        dateFormat: "MMMM D, YYYY",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isDraft",
      title: "Is Draft?",
      type: "boolean",
      initialValue: true,
      description:
        "Set to false once reviewed by a qualified lawyer in Belize.",
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "legalSection" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "path",
    },
  },
});
