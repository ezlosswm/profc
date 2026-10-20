import AllEvent from "@/components/Events";
import Hero from "@/components/Hero";
import Section from "@/components/ui/section";
import { Suspense } from "react";

export function Events() {
  return (
    <main className="bg-muted-background">
      <Suspense fallback={<></>}>
        <Hero />
      </Suspense>
      <Section>
        <Suspense
          fallback={
            <>
              <h1>All event</h1>
            </>
          }
        >
          <AllEvent />
        </Suspense>
      </Section>
    </main>
  );
}
export default Events;
