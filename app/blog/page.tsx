import NavBar from "../components/nav-bar";
import Link from "next/link";

const posts = [
  {
    slug: "https://arunkumarelangovan.substack.com/p/ai-exploration-segmentation-as-a",
    external: true,
    title: "AI exploration — Segmentation as a drag and drop UI pattern",
    tag: "AI EXPLORATION",
    year: "2025",
    aspect: "aspect-[4/3]",
    image: "/images/blog/Blog 1.png",
    gradient: "linear-gradient(135deg, #f5a623 0%, #f76b1c 50%, #d45a00 100%)",
  },
  {
    slug: "https://arunkumarelangovan.substack.com/p/visualising-color-tokens-in-design",
    external: true,
    title: "Visualising color tokens in design system",
    tag: "DESIGN SYSTEMS",
    year: "2025",
    aspect: "aspect-[944/558]",
    image: "/images/blog/Blog 2.png",
    gradient: "linear-gradient(135deg, #c3b1e1 0%, #9b8ec4 100%)",
  },
  {
    slug: "https://medium.com/hippo-design/dipping-our-toes-in-micro-interactions-bd1e94c4c1bc",
    external: true,
    title: "Dipping our toes in micro-interactions",
    tag: "MOTION",
    year: "2022",
    aspect: "aspect-[954/506]",
    image: "/images/blog/Blog 3.png",
    gradient: "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    slug: "https://medium.com/design-bootcamp/how-i-cracked-a-product-design-interview-using-blitz-design-4d756bbc8296",
    external: true,
    title: "How I cracked a product design interview using Blitz design",
    tag: "CAREER",
    year: "2022",
    aspect: "aspect-[944/534]",
    image: "/images/blog/Blog 4.png",
    gradient: "linear-gradient(135deg, #e0f7fa 0%, #80deea 50%, #26c6da 100%)",
  },
  {
    slug: "https://abounding-mambo-a42.notion.site/Design-Assignment-1-Checkout-for-Instagram-fd8c718df6394c19a488ad13c4943ecf",
    external: true,
    title: "Design Assignment — Checkout for Instagram",
    tag: "CASE STUDY",
    year: "2020",
    aspect: "aspect-[946/320]",
    image: "/images/blog/Blog 5.png",
    gradient: "linear-gradient(135deg, #d4f5d4 0%, #a8e6a3 50%, #f1c26a 100%)",
  },
  {
    slug: "https://www.behance.net/gallery/86628099/Ultra-Fantasy-League-WebApp-(F1-Racing)",
    external: true,
    title: "Ultra Fantasy League — F1 Racing Web App",
    tag: "SIDE PROJECT",
    year: "2019",
    aspect: "aspect-[946/532]",
    image: "/images/blog/Blog 6.png",
    gradient: "linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <NavBar showBack />

      <main className="max-w-[64rem] mx-auto px-6 pt-8 sm:pt-20 pb-24">

        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-[32px] sm:text-[42px] font-[500] leading-[1.1] tracking-[-0.02em] text-[rgba(0,0,0,.85)]"
            style={{ fontFamily: "var(--font-mackinac), serif" }}
          >
            Blog
          </h1>
          <p className="mt-3 text-[14px] text-[rgba(0,0,0,.45)] leading-[1.6]">
            Writing, concepts and experiments — things that didn&apos;t fit in a case study.
          </p>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          {posts.map((post, i) => (
            <div key={i}>
              {/* Image — link wraps image only */}
              <Link
                href={post.slug}
                target={"external" in post && post.external ? "_blank" : undefined}
                rel={"external" in post && post.external ? "noopener noreferrer" : undefined}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] rounded-lg mb-3"
              >
                <div
                  className={`relative w-full rounded-lg overflow-hidden ${post.aspect}`}
                  style={"image" in post && post.image ? undefined : { background: post.gradient }}
                >
                  {"image" in post && post.image && (
                    <>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-40"
                        style={{ background: post.gradient }}
                      />
                    </>
                  )}
                </div>
              </Link>

              {/* Meta row — not clickable */}
              <div className="flex items-start justify-between gap-4">
                <p className="text-[13px] font-[450] leading-[1.5] text-[rgba(0,0,0,.8)]">
                  {post.title}
                </p>
                <p
                  className="text-[10px] font-[550] tracking-[0.08em] uppercase text-[rgba(0,0,0,.35)] whitespace-nowrap pt-[2px]"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {post.tag}&nbsp;•&nbsp;{post.year}
                </p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
