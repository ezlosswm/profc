import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "homePageData",
      title: "Home Page",
      type: "string",
      initialValue: "Home Page Data",
      placeholder: "Home Page Date",
    },
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sponsor",
      title: "Sponsor and/or Partner",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sponsors",
          fields: [
            defineField({
              name: "sponsorName",
              title: "Sponsor's Name",
              type: "string",
            }),
            defineField({
              name: "sponsorImage",
              title: "Sponsor's Logo/Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),
  ],
});
