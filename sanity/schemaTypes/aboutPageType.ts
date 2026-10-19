import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "The premier MMA promotion in Belize and Central America",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Short description to highlight the heading",
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "team",
      title: "Leadership & Broadcast team",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "teamMembers",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              description: "(E.g., CEO, VP Operations)",
            }),
            defineField({ name: "name", type: "string", title: "Name" }),
          ],
        }),
      ],
    }),
  ],
});
