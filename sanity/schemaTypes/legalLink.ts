import { defineField, defineType } from "sanity";

export const legalLink = defineType({
  name: "legalLink",
  title: "Legal Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "to",
      title: "Path / URL",
      type: "string",
    }),
  ],
});
