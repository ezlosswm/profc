"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type MouseEvent } from "react";
import { Button } from "./ui/button";
import { IconX } from "@tabler/icons-react";

const CONSENT_STORAGE_KEY = "profc-cookie-consent-v1";
export const OPEN_COOKIE_SETTINGS_EVENT = "profc:open-cookie-settings";

type ConsentChoice = "necessary-only" | "all";

export default function CookieConsent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const rejectButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const openSettings = () => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;

      dialog.showModal();
      rejectButtonRef.current?.focus();
    };

    const hasSavedConsent = () => {
      try {
        return window.localStorage.getItem(CONSENT_STORAGE_KEY) !== null;
      } catch {
        return false;
      }
    };

    if (!hasSavedConsent()) openSettings();

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () =>
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  function saveChoice(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Keep the dialog usable if browser storage is unavailable.
    }

    dialogRef.current?.close();
  }

  function closeFromBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      dialogRef.current?.close();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-settings-title"
      aria-describedby="cookie-settings-description"
      onClick={closeFromBackdrop}
      className="cookie-settings-dialog m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto border border-border bg-muted-background p-0 text-foreground shadow-2xl backdrop:bg-background/75"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2
            id="cookie-settings-title"
            className="font-heading text-3xl uppercase leading-none sm:text-4xl"
          >
            Cookie settings
          </h2>
          <Button
            variant="link"
            aria-label="Close cookie settings"
            onClick={() => dialogRef.current?.close()}
            className="-mr-2 -mt-2 size-10 shrink-0 text-muted-foreground transition-colors hover:text-foreground "
          >
            <IconX aria-hidden="true" className="size-6" />
          </Button>
        </div>

        <p
          id="cookie-settings-description"
          className="mt-4 text-sm leading-relaxed text-foreground/90 sm:text-base"
        >
          Choose which categories this site may use. You can change this at any
          time from “Cookie settings” in the footer.
        </p>

        <section
          aria-labelledby="necessary-cookies-title"
          className="mt-6 border-y border-border py-5"
        >
          <div className="flex items-center justify-between gap-4">
            <h3
              id="necessary-cookies-title"
              className="font-semibold text-foreground"
            >
              Strictly necessary
            </h3>
            <span className="shrink-0 text-xs font-medium text-muted-foreground sm:text-sm">
              Always on
            </span>
          </div>
          <p className="mt-2 max-w-100 text-sm leading-relaxed text-foreground/85">
            Remembers your cookie choice so this banner doesn`t keep
            reappearing. Stored in your browser.
          </p>
        </section>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          This site doesn`t currently use analytics, functional or marketing
          cookies.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            variant="link"
            ref={rejectButtonRef}
            onClick={() => saveChoice("necessary-only")}
            className="min-h-11 underline underline-offset-4 sm:mr-auto"
          >
            Reject optional
          </Button>
          <Button
            variant="outline"
            onClick={() => saveChoice("all")}
            className="min-h-11"
          >
            Accept all
          </Button>
          <Button
            onClick={() => saveChoice("necessary-only")}
            className="min-h-11"
          >
            Save preferences
          </Button>
        </div>
      </div>
    </dialog>
  );
}
