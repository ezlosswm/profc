import { defineField, defineType } from "sanity";

export const legalSection = defineType({
  name: "legalSection",
  title: "Legal Section",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Section ID / Anchor",
      type: "string",
      description:
        "Used for internal anchor links (e.g. information-we-collect)",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "list",
      title: "Bullet List Items",
      type: "array",
      of: [{ type: "text", rows: 2 }],
    }),
    defineField({
      name: "after",
      title: "Paragraphs After List",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "link",
      title: "Section Link",
      type: "legalLink",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "id",
    },
  },
});
