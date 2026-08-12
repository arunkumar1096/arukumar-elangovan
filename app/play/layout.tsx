import type { ReactNode } from "react";

/** No route-level viewport — nav uses root `viewport` at 1×; canvas zoom is CSS-only on compact. */
export default function PlayLayout({ children }: { children: ReactNode }) {
  return children;
}
