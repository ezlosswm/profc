"use client";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/Logo.webp";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navLinks";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-200 ease-out ${
        scrolled || open
          ? "bg-background/95 border-foreground/30"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main menu"
        className="hidden h-16 w-full mx-auto max-w-7xl px-5 md:px-8 md:flex items-center justify-between"
      >
        <div className="flex gap-24 flex-row-reverse justify-between">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Button
                    className={
                      isActive
                        ? "text-white underline underline-offset-6 decoration-primary"
                        : ""
                    }
                    href={link.href}
                    variant="nav"
                  >
                    {link.title}
                  </Button>
                </li>
              );
            })}
          </ul>

          <Link aria-label="PROFC Belize Home" href="/">
            <Image
              src={logo}
              alt="PROFC logo"
              width={150}
              height={50}
              priority
              className="w-37.5 h-12.5"
            />
          </Link>
        </div>

        <Button href="/contact">Get tickets</Button>
      </nav>

      <nav aria-label="Mobile menu" className="flex flex-col md:hidden w-full">
        <div className="flex h-16 w-full px-5 items-center justify-between">
          <Link aria-label="PROFC Belize Home" href="/">
            <Image
              src={logo}
              alt="PROFC logo"
              width={150}
              height={50}
              priority
              className="w-37.5 h-full"
            />
          </Link>

          <div className="flex gap-4">
            <div className="hidden sm:block">
              <Button href="/contact">Get tickets</Button>
            </div>

            <Button
              aria-label={open ? "Close menu" : "Open menu"}
              variant="ghost"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {open && (
          <ul className="w-full bg-background border-t border-foreground/30 flex flex-col gap-3 px-5 py-6 shadow-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`font-heading text-2xl uppercase tracking-wide block ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default SiteHeader;
