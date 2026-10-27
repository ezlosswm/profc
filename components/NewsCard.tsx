import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { NewsArticle } from "@/types/types";
import { formatNewsPublicationdate } from "@/lib/formatter";
import Link from "next/link";

type NewsCardProps = {
  article: NewsArticle;
};

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      id={article.slug.current}
      href={`news/${article.slug.current}`}
      className="group flex h-full scroll-mt-24 flex-col"
    >
      <div className="w-full overflow-hidden">
        <Image
          src={urlFor(article.headlineImage).width(1920).height(1080).url()}
          alt={`${article.headline} headliner`}
          className="group-hover:scale-105 object-cover w-full aspect-16/10 transition-transform ease-in-out duration-500"
          loading="lazy"
          width={1920}
          height={1080}
        />
      </div>

      <span className="mt-5 text-xs font-medium text-muted-foreground">
        {formatNewsPublicationdate(article.publicationDate)}
      </span>
      <h3 className="mt-2 font-heading text-2xl uppercase leading-tight md:text-3xl">
        {article.headline}
      </h3>
      <p className="mt-3 text-foreground/75">{article.summary}</p>

      <Button
        variant="link"
        className="mt-auto pt-5 justify-start group-hover:text-primary px-0! gap-2"
      >
        <span>Read article</span>
        <ArrowRightIcon
          aria-hidden="true"
          className="group-hover:translate-x-0.5 ease-out size-4"
        />
      </Button>
    </Link>
  );
}
