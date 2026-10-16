import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
};

export default function Section({
  children,
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={`mx-auto max-w-7xl px-5 md:px-8 ${className}`}
    >
      {children}
    </section>
  );
}
