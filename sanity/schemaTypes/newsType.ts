import { defineField, defineType } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    defineField({
      name: "publicationDate",
      title: "Publication Date",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
      options: {
        dateFormat: "MMM DD, YYYY",
      },
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Article headline",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "headlineImage",
      title: "Headline Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      description: "One sentance summary of the article.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "headline", maxLength: 48 },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for accessibility and SEO",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
