import { defineField, defineType } from "sanity";

export const fighterType = defineType({
  name: "fighter",
  title: "Fighters",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "nickname",
      title: "Nickname",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country of origin",
      type: "object",
      fields: [
        {
          name: "code",
          title: "ISO country code",
          description:
            "Two-letter ISO 3166-1 code, e.g. BZ for Belize. Used for the flag.",
          type: "string",
          validation: (Rule) => Rule.length(2).uppercase(),
        },
        { name: "name", title: "Country name", type: "string" },
      ],
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "record",
      title: "Professional record",
      type: "object",
      fields: [
        defineField({
          name: "wins",
          type: "number",
          initialValue: 0,
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: "losses",
          type: "number",
          initialValue: 0,
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: "draws",
          type: "number",
          initialValue: 0,
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: "noContests",
          title: "No contests",
          type: "number",
          validation: (Rule) => Rule.integer().min(0),
        }),
      ],
    }),
    defineField({
      name: "weightClass",
      title: "Weight class",
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
  ],
});
