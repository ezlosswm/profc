"use client";
import { Button } from "@/components/ui/button";
import type { FormStatus } from "@/types/types";
import Section from "@/components/ui/section";
import { formTopics } from "@/data/topics";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckIcon, LoaderCircle } from "lucide-react";

function ContactPage() {
  const params = useSearchParams();
  const requested = params.get("topic");
  const [topic, setTopic] = useState(
    requested && formTopics.includes(requested) ? requested : formTopics[0],
  );
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    return () => setTopic(formTopics[0]);
  }, []);

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus("error");
      form.reportValidity();
      return;
    }

    setStatus("sending");

    try {
      const formData = new FormData(form);

      console.log("Name: ", formData.get("name"));
      console.log("\nEmail: ", formData.get("email"));
      console.log("\nMessage: ", formData.get("message"));

      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }

    window.setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 900);
  }

  return (
    <main aria-labelledby="contact-title" className="bg-muted-background">
      <Section className="min-h-[80vh] pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h1
              id="contact-title"
              className="uppercase text-6xl font-heading md:text-7xl leading-[0.9]"
            >
              Get in <br />
              the fight
            </h1>

            <p className="mt-6 max-w-sm text-muted-foreground">
              Tickets for an upcoming event, sponsorship packages, fighter
              applications or press credentials - tell us what you need and the
              team will get back to you.
            </p>
          </div>

          <div className="lg:col-span-7">
            {status === "sent" ? (
              <div className="border-l-2 border-primary py-4 pl-6">
                <CheckIcon className="size-6 text-primary" aria-hidden="true" />
                <p className="mt-4 font-heading text-3xl uppercase">
                  Message received
                </p>
                <p className="mt-2 text-muted-foreground">
                  We will reply by email, usually withing two business days.
                </p>
                <Button
                  variant="link"
                  className="pl-0 mt-6 underline underline-offset-6"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="space-y-8">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    What&lsquo;s this about?
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formTopics.map((t) => (
                      <label
                        key={t}
                        className={`cursor-pointer whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors duration-150  ${topic === t ? "bg-primary hover:bg-primary-hover" : "bg-background border border-white/40 hover:border-white hover:bg-white/10"}`}
                      >
                        <input
                          type="radio"
                          name="topic"
                          value={t}
                          checked={topic === t}
                          onChange={() => setTopic(t)}
                          className="sr-only"
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-muted-foreground"></span>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      className="input__field"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-muted-foreground"></span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="input__field"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-mediu text-muted-foreground"></span>
                    <textarea
                      name="message"
                      rows={4}
                      className="input__field resize-none"
                      placeholder="How many tickets, your brand, your fight record…"
                      required
                    ></textarea>
                  </label>
                </div>
                <Button type="submit" disabled={status === "sending"}>
                  {status === "sending" && (
                    <LoaderCircle
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  {status === "sending" ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
export default ContactPage;
