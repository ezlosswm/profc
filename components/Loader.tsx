import Image from "next/image";
import logo from "@/public/images/Logo.webp";

export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="relative aspect-2.5/1 w-75 sm:w-112.5">
        <Image
          src={logo}
          alt="PROFC"
          fill
          priority
          fetchPriority="high"
          className="object-contain grayscale contrast-125 opacity-40"
        />
        <Image
          src={logo}
          alt="PROFC"
          fill
          priority
          fetchPriority="high"
          className="object-contain animate-reveal-color"
        />
      </div>
    </div>
  );
}
