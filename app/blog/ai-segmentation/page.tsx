import NavBar from "../../components/nav-bar";
import Link from "next/link";

export const metadata = {
  title: "AI exploration — Segmentation as a drag and drop UI pattern",
  description: "Was bored over the weekend, so thought of exploring new ways to create a segment.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen">
      <NavBar showBack scrollTitle="AI exploration — Segmentation" />

      <main className="max-w-[48rem] mx-auto px-6 pt-8 sm:pt-20 pb-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-[550] tracking-[0.08em] uppercase text-[rgba(0,0,0,.35)] mb-4">
            AI Exploration&nbsp;•&nbsp;Oct 24, 2025
          </p>
          <h1
            className="text-[28px] sm:text-[38px] font-[500] leading-[1.15] tracking-[-0.02em] text-[rgba(0,0,0,.85)] mb-5"
            style={{ fontFamily: "var(--font-mackinac), serif" }}
          >
            Segmentation as a drag and drop UI pattern
          </h1>
          <p className="text-[15px] leading-[1.65] text-[rgba(0,0,0,.5)]">
            Was bored over the weekend, so thought of exploring new ways to create a segment.
          </p>
        </div>

        {/* Hero image */}
        <div className="mb-10 rounded-lg overflow-hidden">
          <img
            src="https://substackcdn.com/image/fetch/w_1272,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff6b137fc-4673-4d15-8402-e4dc1ee6fb6d_2908x1632.png"
            alt="Drag and drop segment builder interface"
            className="w-full block"
          />
        </div>

        {/* Body */}
        <div className="space-y-5 text-[15px] leading-[1.75] tracking-[-0.003em] text-[rgba(0,0,0,.78)]">
          <p>
            Traditional segmentation involves the user clicking through 10 dropdowns to create a simple query.
            What if it was a drag and drop editor instead?
          </p>
          <p>
            20 prompts later, an MVP is ready. Users build segments by simply dragging and dropping attributes.
            It&apos;s direct, fun, visual, and feels incredibly fast compared to wading through dropdowns.
          </p>
          <p>
            For example — creating a segment where users <em>(who are from India)</em> and <em>(email id is verified)</em> and <em>(cart value is above ₹2,000 or is a VIP customer)</em> becomes a visual, composable block — rather than a series of nested dropdown selections.
          </p>
          <p>
            This is still an experiment. Curious to hear the design trade-offs.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="https://www.figma.com/make/WGUzHlD5Id94do74OOMfXf/Drag-and-Drop-Segment-Builder?node-id=0-4&t=txVslbMovMnbOMRf-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(0,0,0,.05)] hover:bg-[rgba(0,0,0,.08)] transition-colors text-[13px] font-[550] text-[rgba(0,0,0,.75)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Try the prototype on Figma Make
          </Link>
          <Link
            href="https://arunkumarelangovan.substack.com/p/ai-exploration-segmentation-as-a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[rgba(0,0,0,.4)] hover:text-[rgba(0,0,0,.7)] transition-colors"
          >
            Originally published on Substack →
          </Link>
        </div>

      </main>
    </div>
  );
}
