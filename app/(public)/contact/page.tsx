import { Metadata } from "next";
import ContactPage from "@/components/Contact";

export const instant = false;

export const metadata: Metadata = {
  title: "Contact Us | PROFC Belize",
  description: "PROFC",
  openGraph: {
    title: "Contact | PROFC",
    description: "Contact Page",
  },
};

function Contact() {
  return <ContactPage />;
}
export default Contact;
