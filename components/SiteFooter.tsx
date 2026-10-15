import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/Logo.webp";
import { navLinks } from "@/data/navLinks";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function SiteFooter() {
  const pathname = usePathname();
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
      </div>

      <div
        className="mx-auto max-w-7xl border-t border-border
       px-5 py-6 md:px-8"
      >
        <p className="text-sm text-foreground/70">
          © {new Date().getFullYear()} PROFC Belize MMA LTD. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;
