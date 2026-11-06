import { defineArrayMember, defineField, defineType } from "sanity";

export const championsPageType = defineType({
  name: "championsPage",
  title: "Champions Page",
  type: "document",
  fields: [
    defineField({
      name: "ourChampions",
      title: "Our Champions",
      type: "string",
      initialValue: "Our Champions",
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "text",
    }),
    defineField({
      name: "champions",
      title: "Champions",
      description: "Select the fighters to display on the Champions page.",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "fighter" }],
        }),
      ],
    }),
  ],
});
