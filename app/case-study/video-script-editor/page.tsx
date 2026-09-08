"use client";

import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  Stats,
  Quote,
  Highlight,
} from "../components";

const IMG = "/images/userwise";

const IMGS = {
  hero:         `${IMG}/hero.avif`,
  challenge:    `${IMG}/challenge.avif`,
  persona:      `${IMG}/persona.avif`,
  brainstorm1:  `${IMG}/brainstorm-1.png`,
  brainstorm2:  `${IMG}/brainstorm-2.png`,
  howItWorks:   `${IMG}/how-it-works-1.png`,
  sketches:     `${IMG}/sketches.avif`,
  uiDesign:     `${IMG}/ui-design-1.png`,
  results:      `${IMG}/results-1.png`,
};

const sections = [
  { id: "challenge",    label: "The Challenge" },
  { id: "persona",      label: "User Persona" },
  { id: "brainstorm",   label: "Brainstorming" },
  { id: "how-it-works", label: "How It Works" },
  { id: "sketches",     label: "Sketches" },
  { id: "ui-design",    label: "UI Design" },
  { id: "poc",          label: "POC Demo" },
  { id: "results",      label: "Results" },
];

export default function HippoVideoPage() {
  return (
    <CaseStudyLayout
      breadcrumb="Hippo Video"
      navTitle="Video Script Editor"
      title="Reimagining video editing so sales reps can create professional videos in minutes."
      description={
        <>
          Hippo Video&apos;s primary users are sales reps who use video to pitch
          and close deals. The existing editor was complex and intimidating — the
          ROI wasn&apos;t worth the effort. I reimagined the editing experience
          from scratch: combining AI-generated transcripts with a{" "}
          <Highlight color="green">word-processor interface</Highlight> to create
          the Script Editor, turning non-editors into confident video creators.
        </>
      }
      meta={[
        { label: "Role",     value: "Solo Designer" },
        { label: "Company",  value: "Hippo Video" },
        { label: "Timeline", value: "2023 – 2024" },
        { label: "Platform", value: "Web" },
      ]}
      sections={sections}
      heroFirst
      heroContent={
        <ImageBlock
          src={IMGS.hero}
          alt="Hippo Video Script Editor — hero banner"
          flush
        />
      }
    >

      {/* ── The Challenge ─────────────────────────────────────────── */}

      <Section
        id="challenge"
        sectionTitle="The Challenge"
        chapterTitle="Sales reps aren't video editors — but the tool expected them to be."
        noPaddingTop
      >
        <Paragraph>
          Primary users of Hippo Video are sales and marketing teams using video
          to pitch and sell. But the existing editor was built for professionals.
          For non-editors, the learning curve was steep and the time investment
          didn&apos;t pay off.
        </Paragraph>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Sales and marketing teams are not professional video editors",
            "The editor interface was intimidating and difficult to use",
            "Time spent on video editing ≠ ROI gained",
            "The learning curve to make a professional-looking video was steep",
          ].map((text, i) => (
            <div
              key={i}
              className="rounded-lg p-4 bg-[var(--surface)]"
              style={{ boxShadow: "var(--shadow-flush)" }}
            >
              <span className="block text-[11px] font-[600] tracking-[0.06em] uppercase text-[rgba(0,0,0,.3)] mb-1.5">
                0{i + 1}
              </span>
              <p className="text-[13px] font-[450] leading-[1.5] text-[rgba(0,0,0,.75)]">
                {text}
              </p>
            </div>
          ))}
        </div>
        <Paragraph>
          The answer wasn&apos;t to patch the existing editor. It was to
          reimagine it entirely — a new interface where anyone can add graphic
          elements, trim mistakes, and produce polished videos, all through a
          self-explanatory flow that drastically reduces the learning curve.
        </Paragraph>
      </Section>

      {/* ── User Persona ──────────────────────────────────────────── */}

      <Section
        id="persona"
        sectionTitle="User Persona"
        chapterTitle="Meet Candice — the person we designed for."
      >
        <ImageBlock
          src={IMGS.persona}
          alt="User persona: Candice, 21, Sales Development Representative, New York"
          flush
        />
        <Paragraph>
          Candice is a Sales Development Representative based in New York. She
          wants to stand out in a crowded inbox, personalise her outreach with
          video, and book more meetings — but she doesn&apos;t have the time or
          skills to produce professional-looking content. Her core frustration:
          the existing tools are complex, the output looks tacky, and
          professional editing feels out of reach.
        </Paragraph>
      </Section>

      {/* ── Brainstorming ─────────────────────────────────────────── */}

      <Section
        id="brainstorm"
        sectionTitle="Brainstorming"
        chapterTitle="The question that changed our direction."
      >
        <Quote>
          How can Candice, with no video editing experience, create professional
          videos?
        </Quote>
        <Paragraph>
          Quick fixes — adding guides to the editor, improving the existing UI —
          weren&apos;t going to solve the problem. We needed to reimagine a whole
          new editor. When we mapped user behaviour using the{" "}
          <strong>Fogg Behaviour Model</strong>, we found motivation and triggers
          were already in place. The missing piece was{" "}
          <Highlight color="yellow">ability</Highlight>.
        </Paragraph>
        <ImageBlock
          src={IMGS.brainstorm1}
          alt="Brainstorming: Fogg Behaviour Model"
          flush
        />
        <Paragraph>
          The eureka moment came from a simple observation: Candice is already an
          expert at making Word files look professional. What if she could edit
          her videos the same way? An AI-generated transcript turns the video
          into an editable document. Delete a word — that moment is trimmed. Tag
          a sentence — a title card appears.
        </Paragraph>
        <p className="text-[20px] font-[500] leading-[1.4] tracking-[-0.01em] text-[rgba(0,0,0,.85)]">
          Video editor + Word processor = Script Editor.
        </p>
        <ImageBlock
          src={IMGS.brainstorm2}
          alt="The eureka moment — Video Editor + Word Processor = Script Editor"
          flush
        />
      </Section>

      {/* ── How It Works ──────────────────────────────────────────── */}

      <Section
        id="how-it-works"
        sectionTitle="How It Works"
      >
        <ImageBlock
          src={IMGS.howItWorks}
          alt="How the Script Editor works: 6-step flow from recording to rendering"
          flush
        />
        <Paragraph>
          The Script Editor inserts graphical elements — lower thirds, interlude
          slides, title cards, and end cards — inline with the AI-generated
          transcript. Editing a video like a word file enables Candice to create
          a polished, professional video in minutes, with no prior editing
          experience.
        </Paragraph>
      </Section>

      {/* ── Initial Sketches ──────────────────────────────────────── */}

      <Section
        id="sketches"
        sectionTitle="Initial Sketches"
      >
        <ImageBlock
          src={IMGS.sketches}
          alt="Hand-drawn sketches covering the overall flow, script behaviour, and set theme and preview screens"
          flush
        />
        <Paragraph>
          Early sketches covered three areas: overall flow, script behaviour, and
          theme selection and preview. Working closely with engineering upfront
          revealed constraints that shaped the design early — side-by-side
          preview wasn&apos;t feasible with the current tech stack, and the AI
          model was only 45% accurate at the time. These weren&apos;t blockers;
          they were inputs.
        </Paragraph>
      </Section>

      {/* ── UI Design ─────────────────────────────────────────────── */}

      <Section
        id="ui-design"
        sectionTitle="UI Design — Phase 1"
      >
        <ImageBlock
          src={IMGS.uiDesign}
          alt="UI Design Phase 1: main script editor"
          flush
        />
        <Paragraph>
          The script editor renders the AI transcript word by word. Clicking a
          word surfaces contextual options — mark it as a title card, lower
          third, or interlude. A theme picker offers four pre-built visual
          styles. An onboarding video inside the panel guides first-time users,
          cutting time-to-first-edit dramatically.
        </Paragraph>
      </Section>

      {/* ── POC Demo ──────────────────────────────────────────────── */}

      <Section
        id="poc"
        sectionTitle="POC Demo"
        chapterTitle="A working proof of concept, shipped in one month."
      >
        <Paragraph>
          Rather than waiting for a fully polished product, we moved fast — built
          a working POC and got it in front of real users immediately.
        </Paragraph>
        <figure className="my-1">
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <iframe
              src="https://player.vimeo.com/video/712837778?h=f91ed1e1d4"
              title="Video Script Editor — POC Demo"
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </figure>
      </Section>

      {/* ── Results ───────────────────────────────────────────────── */}

      <Section
        id="results"
        sectionTitle="Results"
      >
        <ImageBlock
          src={IMGS.results}
          alt="Results: Initial reactions, release plan, and feedback and takeaways"
          flush
        />
        <Stats
          stats={[
            {
              value: "30%",
              label:
                "More video engagement (watch rate) reported by British Airways after adopting the Script Editor",
            },
            {
              value: "10%",
              label:
                "Increase in CTA clicks reported by British Airways",
            },
            {
              value: "1 month",
              label:
                "From brainstorm to working POC — shipped fast, iterated with real users",
            },
          ]}
        />
        <Paragraph>
          The POC was released to a small group of beta users, most notably
          British Airways and Atrium Hospitality. Both adopted it into their
          day-to-day sales workflows immediately. British Airways reported 30%
          more engagement in terms of watch rate and a 10% increase in CTA
          clicks.
        </Paragraph>
        <Paragraph>
          <strong>The key takeaways:</strong> move fast and test early, don&apos;t be afraid to
          challenge the status quo, and work closely with engineers — empathy
          towards technical constraints makes for better design decisions.
        </Paragraph>
      </Section>

    </CaseStudyLayout>
  );
}
