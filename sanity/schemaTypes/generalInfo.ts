import { SOCIAL_PLATFORMS } from "@/data/constants/socials";
import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons/Link";

export const generalInfoType = defineType({
  name: "generalInfo",
  title: "General Info",
  type: "document",
  fields: [
    {
      name: "generalInfoData",
      title: "General Info Data",
      type: "string",
      initialValue: "General Info Data",
      readOnly: true,
      placeholder: "General Info Data",
    },
    defineField({
      name: "contactInfo",
      title: "Contact Info",
      type: "object",
      fields: [
        defineField({
          name: "email",
          title: "Primary Email",
          type: "email",
        }),
        defineField({
          name: "phoneNumber",
          title: "Primary Contact Number",
          type: "string",
          description: "International format required (e.g., +15550192834)",
          validation: (Rule) =>
            Rule.regex(/^\+?[1-9]\d{1,14}$/, {
              name: "phone", // Error message label
              invert: false, // Target string must match the regex
            }).error(
              "Please enter a valid international phone number (e.g., +15550192834).",
            ),
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
          icon: LinkIcon,
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
  ],
});
