import { SOCIAL_PLATFORMS } from "@/data/constants/socials";
import { WEIGHT_CLASSES } from "@/data/constants/weightClasses";
import { defineField, defineType } from "sanity";

export const fighterType = defineType({
  name: "fighter",
  title: "Fighters",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nickname",
      title: "Nickname",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "dateOfBirth",
      title: "Date of Birth",
      type: "date",
    }),
    defineField({
      name: "height",
      title: "Height",
      type: "object",
      fields: [
        defineField({
          name: "feet",
          title: "Feet",
          type: "number",
          validation: (Rule) => Rule.required().integer().min(3).max(8),
        }),
        defineField({
          name: "inches",
          title: "Inches",
          type: "number",
          initialValue: 0,
          validation: (Rule) => Rule.required().integer().min(0).max(11),
        }),
      ],
      options: {
        columns: 2,
      },
    }),

    defineField({ name: "club", title: "Club", type: "string" }),
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
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social Link",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [...SOCIAL_PLATFORMS],
              },
            }),
            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "weightClass",
      title: "Weight class",
      type: "string",
      options: {
        list: [...WEIGHT_CLASSES],
      },
    }),
  ],
});
