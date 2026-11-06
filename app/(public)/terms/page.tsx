import { LegalDocument } from "@/components/legal/LegalDocument";
import Loader from "@/components/Loader";
import { getLegalPage } from "@/lib/fetchLegalPage";
import { createPageMetadata } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Terms of service ",
  path: "/terms",
});

export default async function Terms() {
  const page = await getLegalPage("/terms");

  return (
    <Suspense fallback={<Loader />}>
      <LegalDocument doc={page!} />
    </Suspense>
  );
}
