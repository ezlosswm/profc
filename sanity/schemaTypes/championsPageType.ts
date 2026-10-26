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
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "champions",
          fields: [
            defineField({
              name: "division",
              title: "Division",
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
              name: "name",
              type: "string",
              title: "Name",
            }),
            defineField({
              name: "nickname",
              type: "string",
              title: "Nickname",
            }),
            defineField({
              name: "limit",
              title: "Limit",
              type: "string",
              placeholder: "145 lb",
            }),
            defineField({
              name: "image",
              type: "image",
              title: "Champion's Image",
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),
  ],
});
