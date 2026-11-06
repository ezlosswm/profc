"use client";

import { Button } from "./ui/button";
import { OPEN_COOKIE_SETTINGS_EVENT } from "./CookiesConsent";

export default function CookieSettingsButton() {
  return (
    <Button
      variant="nav"
      onClick={() =>
        window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))
      }
    >
      Cookie settings
    </Button>
  );
}
