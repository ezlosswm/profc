import { createPageMetadata } from "@/lib/seo";
import ContactPage from "@/components/contact/Contact";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { sanityFetch } from "@/lib/sanity";
import type { ContactPageData } from "@/types/types";
import { CONTACT_QUERY } from "@/lib/queries/queries";
import { contactPageDataBackup } from "@/data/contactPageInfo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact PROFC Belize for event inquiries, sponsorship opportunities, and business partnerships.",
  path: "/contact",
});

export default async function Contact() {
  let pageData = await sanityFetch<ContactPageData>({
    query: CONTACT_QUERY,
    errorMessage: "Unable to get Contact Page page data.",
  });

  if (!pageData) {
    pageData = contactPageDataBackup;
  }

  return (
    <Suspense fallback={<Loader />}>
      <ContactPage pageData={pageData} />
    </Suspense>
  );
}
