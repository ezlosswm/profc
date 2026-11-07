import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        aria-labelledby="not-found-title"
        className="relative flex min-h-[72svh] flex-1 items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-center md:px-8"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none font-heading text-[min(62vw,30rem)] leading-none text-foreground/[0.035]"
        >
          404
        </span>

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <p className="font-heading text-sm uppercase tracking-[0.24em] text-primary sm:text-base">
            404 <span className="px-2 text-muted-foreground">/</span> Out of the
            ring
          </p>
          <h1
            id="not-found-title"
            className="mt-5 font-heading text-5xl uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
          >
            Page not found
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            This page isn’t on the fight card. It may have moved, or the link
            may be outdated.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href="/" className="min-h-12 gap-2 px-6">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to home
            </Button>
            <Button
              href="/events"
              variant="outline"
              className="min-h-12 gap-2 px-6"
            >
              Browse events
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
