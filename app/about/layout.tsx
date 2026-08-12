import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Andrea Vollendorf is a product designer based in coastal Maine and Director of Product Design at Proof.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
