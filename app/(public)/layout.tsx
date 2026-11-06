import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import React from "react";
import CookieConsent from "@/components/CookiesConsent";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <CookieConsent />
      <SiteFooter />
    </>
  );
}

export default PublicLayout;
