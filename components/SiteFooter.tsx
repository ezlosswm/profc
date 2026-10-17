import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/Logo.webp";
import FooterNav from "./FooterNav";
import { Suspense } from "react";
import { connection } from "next/server";

async function CurrentYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl py-12 flex-col gap-8 px-5 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <Link aria-label="PROFC Belize Home" href="/">
            <Image
              src={logo}
              alt="PROFC logo"
              width={500}
              height={500}
              priority
              className="w-37.5 h-12.5"
            />
          </Link>
        </div>

        <FooterNav />
      </div>

      <div className="mx-auto max-w-7xl border-t border-border px-5 py-6 md:px-8">
        <p className="text-sm text-muted-foreground">
          ©{""}
          <Suspense fallback="2026">
            <CurrentYear />
          </Suspense>{" "}
          {""}
          PROFC Belize MMA LTD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
