import type { StructureResolver } from "sanity/structure";

// Makes "Site Settings" behave like a singleton (one editable document,
// not a list you can add more of), and groups everything else sensibly.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("portfolioItem").title("Portfolio Items"),
      S.documentTypeListItem("journalPost").title("Journal Posts"),
      S.documentTypeListItem("clientLogo").title("Clients"),
    ]);
