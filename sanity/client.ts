import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "5ybqz3k9",
  dataset: "production",
  apiVersion: "2026-10-15",
  useCdn: true,
});
