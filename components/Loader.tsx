import Image from "next/image";
import logo from "@/public/images/Logo.webp";

export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="relative aspect-2.5/1 w-75 sm:w-112.5">
        {/* Grayscale logo */}
        <Image
          src={logo}
          alt="PROFC Logo"
          fill
          priority
          className="object-contain grayscale contrast-125 opacity-40"
        />

        {/* Full-color logo revealed with clip-path */}
        <Image
          src={logo}
          alt=""
          fill
          priority
          className="object-contain animate-reveal-color"
        />
      </div>
    </div>
  );
}
