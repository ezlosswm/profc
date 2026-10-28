import { createPageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata = createPageMetadata({
  title: "About PROFC Belize | Our MMA Promotion",
  description:
    "Learn about PROFC Belize, our mission, the team behind our MMA events, and our commitment to showcasing mixed martial arts in Belize.",
  path: "/about",
});

export default function About() {
  return (
    <Suspense fallback={<Loader />}>
      <AboutPage />
    </Suspense>
  );
}
