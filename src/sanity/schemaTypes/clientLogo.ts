import { defineField, defineType } from "sanity";

export default defineType({
  name: "clientLogo",
  title: "Client",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo (optional)",
      type: "image",
      description: "If left blank, the client's name is shown as a text chip instead.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
