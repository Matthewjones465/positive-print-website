import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Treated as a singleton — the Studio structure only ever shows one entry.
  fields: [
    defineField({
      name: "heroTag",
      title: "Hero tag line",
      type: "string",
      initialValue: "Durban, South Africa · 100% Woman-Owned",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      description: "Plain text. Use a pipe | to mark where the emphasised word starts, e.g. 'Bold ideas, brought to |life.'",
      initialValue: "Bold ideas, brought to |life.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero subtext",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "aboutHeadline",
      title: "About headline",
      type: "string",
      initialValue: "Studio-led, values-first",
    }),
    defineField({
      name: "aboutBody",
      title: "About body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "studioAddress",
      title: "Studio address",
      type: "string",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle (without @)",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
