"use client";

import { useState, useRef, useCallback } from "react";
import ProjectCarousel from "./project-carousel";
import type { Project } from "./project-carousel";

export default function ProjectFilterCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [transitioning, setTransitioning] = useState(false);
  const pendingFilterRef = useRef<string | null>(null);

  const switchFilter = useCallback(
    (slug: string) => {
      if (slug === activeFilter || transitioning) return;

      // Start fade-out
      setTransitioning(true);
      pendingFilterRef.current = slug;

      // After fade-out, swap data + reset, then fade-in
      setTimeout(() => {
        setActiveFilter(slug);
        pendingFilterRef.current = null;

        // Small delay to let React render new cards before fade-in
        requestAnimationFrame(() => {
          setTransitioning(false);
        });
      }, 150);
    },
    [activeFilter, transitioning]
  );

  const tabs = [
    { slug: "all", label: "All" },
    ...projects.map((p) => ({ slug: p.slug, label: p.title })),
  ];

  return (
    <>
      {/* Filter tabs */}
      <div className="px-6 max-w-[1200px] mx-auto mb-8">
        <div
          className="overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label="Filter projects"
        >
          <div className="flex gap-1.5">
            {tabs.map((tab) => {
              const isActive = tab.slug === activeFilter;
              return (
                <button
                  key={tab.slug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => switchFilter(tab.slug)}
                  className={`
                    shrink-0 h-8 px-3.5 rounded-lg text-[13px] transition-colors duration-150
                    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none
                    ${
                      isActive
                        ? "bg-[var(--surface)] font-medium text-[var(--foreground)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div role="tabpanel" aria-label={activeFilter === "all" ? "All projects" : `${activeFilter} project`}>
        <ProjectCarousel
          projects={projects}
          activeFilter={activeFilter}
          transitioning={transitioning}
        />
      </div>
    </>
  );
}
