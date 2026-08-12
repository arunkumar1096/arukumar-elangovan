import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MerlinAI Copywriter",
  description:
    "Designing an AI copywriter inside MoEngage that cut campaign creation time in half and lifted engagement rates by 24%.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
