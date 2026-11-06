import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/Logo.webp";
import FooterNav from "./SiteFooterNav";
import { Suspense } from "react";
import { connection } from "next/server";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Section from "./ui/section";
import { sanityFetch } from "@/lib/sanity";
import { GENERAL_INFO_QUERY } from "@/lib/queries/queries";
import { GeneralInfo } from "@/types/types";
import { generalInfoBackUp } from "@/data/generalInfo";
import CookieSettingsButton from "./CookieSettingsButton"; // 👈 Import the client component
import { Button } from "./ui/button";

async function CurrentYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

function SocialPlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "instagram":
      return <IconBrandInstagram className="size-6 hover:text-primary" />;
    case "facebook":
      return <IconBrandFacebook className="size-6 hover:text-primary" />;
    case "youtube":
      return <IconBrandYoutube className="size-6 hover:text-primary" />;
  }
}

export default async function SiteFooter() {
  let generalInfo = await sanityFetch<GeneralInfo>({
    query: GENERAL_INFO_QUERY,
  });

  if (!generalInfo) {
    generalInfo = generalInfoBackUp;
  }

  return (
    <footer className="border-t border-border">
      <Section>
        <div className="pt-12 w-full">
          <Image
            src={logo}
            width={1920}
            height={1080}
            loading="eager"
            alt="PROFC Belize logo"
          />
        </div>

        <div className="py-12 space-y-4">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <Link aria-label="PROFC Belize Home" href="/">
                <Image
                  src={logo}
                  alt="PROFC logo"
                  width={150}
                  height={50}
                  sizes="120px"
                  priority
                  className="w-37.5 h-12.5"
                />
              </Link>
            </div>

            <FooterNav />
          </div>

          <ul className="border-y border-border py-8 flex gap-4 items-center w-full justify-center text-muted-foreground">
            {generalInfo.socialLinks.map((social, index) => (
              <li key={`${index}`}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <SocialPlatformIcon platform={social.platform} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex justify-between flex-col md:flex-row gap-y-4 items-center w-full">
              <p className="text-sm text-muted-foreground">
                ©{""}
                <Suspense fallback="2026">
                  <CurrentYear />
                </Suspense>{" "}
                {""}
                PROFC Belize MMA LTD. All rights reserved.
              </p>

              <ul className="flex gap-4 items-center">
                <li>
                  <Button variant="nav" href="/terms">
                    Terms of service
                  </Button>
                </li>
                <li>
                  <Button variant="nav" href="/privacy">
                    Privacy
                  </Button>
                </li>
                <li>
                  <CookieSettingsButton />{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
}
