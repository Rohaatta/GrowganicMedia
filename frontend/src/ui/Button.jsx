import { cn } from "../lib/utils";

const variants = {
  primary: "bg-moss text-paper hover:bg-moss-light",
  accent: "bg-sprout text-ink hover:brightness-95",
  outline: "border border-ink/20 text-ink hover:border-ink/50",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/**
 * Shared button. Renders an <a> when `href` is provided, otherwise a <button>.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
