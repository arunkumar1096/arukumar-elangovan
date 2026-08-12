import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Arunkumar Elangovan",
  description: "Writing, concepts and side projects by Arunkumar Elangovan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
