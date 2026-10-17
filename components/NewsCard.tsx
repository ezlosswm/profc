import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

type NewsCardProps = {
  slug: string;
  title: string;
  dateLabel: string;
  excerpt: string;
  image: string;
};
export function NewsCard({
  slug,
  title,
  dateLabel,
  excerpt,
  image,
}: NewsCardProps) {
  return (
    <article id={slug} className="group flex h-full scroll-mt-24 flex-col">
      <div className="w-full">
        <Image
          src={image}
          alt={title}
          className="object-cover w-full aspect-16/10"
          loading="lazy"
          width={200}
          height={200}
        />
      </div>

      <span className="mt-5 text-xs font-medium text-muted-foreground">
        {dateLabel}
      </span>
      <h3 className="mt-2 font-heading text-2xl uppercase leading-tight md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 text-foreground/75">{excerpt}</p>

      <Button
        href={`/${slug}`}
        variant="link"
        className="mt-auto pt-5 justify-start px-0! group"
      >
        Read article
        <ArrowRightIcon
          aria-hidden="true"
          className="group-hover:translate-x-0.5 ease-out size-4"
        />
      </Button>
    </article>
  );
}
