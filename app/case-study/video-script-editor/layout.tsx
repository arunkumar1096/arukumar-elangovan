import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Script Editor",
  description:
    "Redesigning video editing for sales reps at Hippo Video — a Script Editor that turns AI-generated transcripts into a word-processor interface, so non-editors can create professional videos in minutes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
