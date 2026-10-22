import { createPageMetadata } from "@/lib/seo";
import ContactPage from "@/components/contact/Contact";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact PROFC Belize for event inquiries, sponsorship opportunities, and business partnerships.",
  path: "/contact",
});

function Contact() {
  return (
    <Suspense fallback={<Loader />}>
      <ContactPage />;
    </Suspense>
  );
}
export default Contact;
