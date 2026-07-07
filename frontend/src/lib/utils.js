// Combines class strings, skipping any falsy values.
// Usage: cn("base-class", isActive && "active-class", className)
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Formats a number with a "+" suffix for stat displays, e.g. 300 -> "300+"
export function formatStat(value) {
  return typeof value === "number" ? `${value}+` : value;
}
