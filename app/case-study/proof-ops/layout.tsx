import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proof Ops",
  description:
    "Designing the task management system that transformed how ops specialists serve thousands of law firms at Proof.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
