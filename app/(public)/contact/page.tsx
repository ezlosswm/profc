import { createPageMetadata } from "@/lib/seo";
import ContactPage from "@/components/Contact";

export const instant = false;

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact PROFC Belize for event inquiries, sponsorship opportunities, and business partnerships.",
  path: "/contact",
});

function Contact() {
  return <ContactPage />;
}
export default Contact;
