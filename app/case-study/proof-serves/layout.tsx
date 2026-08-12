import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proof Serves",
  description:
    "Redesigning how thousands of law firms track their serves — the constitutional requirement that someone must be formally notified when they're sued.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
