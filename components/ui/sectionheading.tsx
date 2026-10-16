import { ComponentPropsWithRef } from "react";

type SectionHeadingProps = ComponentPropsWithRef<"h2"> & {
  heading: string;
};
export function SectionHeading({ heading, ...props }: SectionHeadingProps) {
  return (
    <h2
      {...props}
      className="text-5xl uppercase md:text-6xl font-heading leading-none"
    >
      {heading}
    </h2>
  );
}
