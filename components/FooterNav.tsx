"use client";

import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navLinks";
import { Button } from "./ui/button";

export default function FooterNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Footer">
      <ul className="flex flex-wrap gap-x-8 gap-y-3">
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
                variant="nav"
                href={link.href}
              >
                {link.title}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
