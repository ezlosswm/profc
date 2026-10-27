import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "default" | "nav" | "outline" | "ghost" | "link";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type LinkProps = BaseProps &
  Omit<ComponentProps<typeof Link>, "children" | "className"> & {
    href: string;
    type?: never;
    onClick?: never;
    disabled?: never;
  };

type NativeButtonProps = BaseProps &
  Omit<ComponentProps<"button">, "children" | "className"> & {
    href?: undefined;
  };

type Props = LinkProps | NativeButtonProps;

const variants: Record<ButtonVariant, string> = {
  default: "bg-primary text-foreground hover:bg-primary-hover",
  nav: "text-sm text-muted-foreground hover:text-foreground",
  link: "font-semibold hover:text-primary",
  ghost: "p-4 hover:bg-foreground/5",
  outline:
    "border border-white/40 hover:border-white hover:bg-white/10 bg-background",
};

const baseStyles =
  "inline-flex cursor-pointer leading-5 [&_svg]:gap-2 [&_svg]:shrink-0 items-center justify-center px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

export function Button(props: Props) {
  const { children, type = "button", variant = "default" } = props;

  const className = [baseStyles, variants[variant], props.className]
    .filter(Boolean)
    .join(" ");

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={className}>
        {children}
      </Link>
    );
  }

  const {
    href,
    type: _type,
    variant: _variant,
    className: _className,
    children: _children,
    ...buttonProps
  } = props;

  return (
    <button type={type} className={className} {...buttonProps}>
      {children}
    </button>
  );
}
