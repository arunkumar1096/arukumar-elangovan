"use client";

import { useState } from "react";
import {
  CaseStudyLayout,
  Section,
  Paragraph,
  ImageBlock,
  Stats,
  Quote,
  PillTabs,
  Highlight,
} from "../components";

const IMG = "/images/merlinai";

const LOFI_IDEAS = [
  { src: `${IMG}/Idea 1.png`, alt: "Lo-fi concept exploration, idea 1" },
  { src: `${IMG}/Idea 2.png`, alt: "Lo-fi concept exploration, idea 2" },
  { src: `${IMG}/Idea 3.png`, alt: "Lo-fi concept exploration, idea 3" },
];

function IdeaCarousel() {
  const [idx, setIdx] = useState(0);
  const total = LOFI_IDEAS.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous idea"
          className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface)] transition-colors flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M8.5 10.5L5.5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <ImageBlock
            src={LOFI_IDEAS[idx].src}
            alt={LOFI_IDEAS[idx].alt}
            contained
          />
        </div>
        <button
          onClick={next}
          aria-label="Next idea"
          className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface)] transition-colors flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5.5 3.5L8.5 7L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {LOFI_IDEAS.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-150"
            style={{ backgroundColor: i === idx ? "rgba(0,0,0,.5)" : "rgba(0,0,0,.15)" }}
          />
        ))}
      </div>
    </div>
  );
}

const sections = [
  { id: "brief", label: "How it started" },
  { id: "research", label: "Primary research" },
  { id: "competitive", label: "Competitor research" },
  { id: "scope", label: "Scope" },
  { id: "design-process", label: "Design Process" },
  { id: "user-journey", label: "User Journey" },
  { id: "lo-fi", label: "Lo-fi Designs" },
  { id: "detailed-design", label: "Key Highlights" },
  { id: "figma", label: "Detailed design" },
  { id: "launch", label: "Launch" },
  { id: "impact", label: "Impact" },
  { id: "further", label: "Further Iterations" },
  { id: "what-next", label: "What Next" },
];

export default function MerlinAIPage() {
  return (
    <CaseStudyLayout
      breadcrumb="MoEngage / MerlinAI"
      navTitle="MerlinAI Copywriter"
      title="I designed an AI copywriter that cut campaign creation time in half."
      description={
        <>
          MerlinAI is an AI-powered copywriting tool built inside MoEngage to
          help marketers create push notification campaigns faster. The problem
          was clear: it takes 4–6 days to publish a campaign, and marketers
          consistently get stuck at the content stage.{" "}
          <Highlight color="yellow">I led the end-to-end design</Highlight>,
          from research and scope through launch, building a tool that reduced
          that time by ~2 days and lifted engagement rates by 21%.
        </>
      }
      meta={[
        { label: "Role", value: "Senior product designer" },
        { label: "Company", value: "MoEngage" },
        { label: "Timeline", value: "2024 - 2025" },
        { label: "Channel", value: "Push Notifications" },
      ]}
      sections={sections}
      heroFirst
      heroContent={
        <ImageBlock
          src={`${IMG}/hero.png`}
          alt="MerlinAI Copywriter hero cover showing the product and key metrics"
          flush
        />
      }
    >
      {/* ── Brief ─────────────────────────────────────────────────── */}

      <Section
        id="brief"
        sectionTitle="How it started"
        noPaddingTop
      >
        <Quote attribution="Universal question across Martech platforms">
          How can we minimise the <Highlight color="yellow">time</Highlight> and{" "}
          <Highlight color="yellow">effort</Highlight> taken by the marketer to
          create a campaign?
        </Quote>
        <Paragraph>
          When I had a conversation with Nalin, our head of product, and looked
          at our analytics, I found three recurring problems:
        </Paragraph>
        <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[14px] font-[450] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)]">
          <li><Highlight color="blue">Campaigns take <strong>4–6 days</strong> to publish</Highlight></li>
          <li><Highlight color="yellow">Marketers get stuck at the <strong>content stage</strong>, leading to delays</Highlight></li>
          <li><Highlight color="green">Marketing teams rely on AI tools like ChatGPT and A/B testing just to finalise copy</Highlight></li>
        </ul>
      </Section>

      {/* ── Research ──────────────────────────────────────────────── */}

      <Section
        id="research"
        sectionTitle="Primary research"
      >
        <Paragraph>
          MoEngage is a cross-channel marketing platform, but push was the most
          used channel. When we looked at Pendo tickets and Mixpanel analysis from customers using
          push, our hypothesis was further validated.
        </Paragraph>
        <Paragraph>
          I also went on calls with marketers from Tata Digital, Tira Beauty,
          Giva, Wynk Music, Tata Capital, Airtel, Blibli, Adda247, Park+,
          Amazon mini_tv, Alfagift, and Soundcloud, and confirmed four key
          findings.
        </Paragraph>
        <Stats
          stats={[
            {
              value: "01",
              label: "Finding inspiration for new content is time-consuming",
            },
            {
              value: "02",
              label: "Marketers refer to previous campaigns for keyword ideas",
            },
            {
              value: "03",
              label:
                "Struggle to find catchy, balanced content to engage end users",
            },
            {
              value: "04",
              label:
                "A/B testing is done when marketers are not confident on the content",
            },
          ]}
        />
      </Section>

      {/* ── Competitive Research ──────────────────────────────────── */}

      <Section
        id="competitive"
        sectionTitle="Competitor research"
      >
        <Paragraph>
          I analysed four tools (Braze and CleverTap as direct competitors, and
          Copy.ai, Grammarly, and OpenAI as indirect ones) across strength,
          weakness, opportunity, and threat.
        </Paragraph>
        <Paragraph>
          Braze places AI near message composers which feels intuitive, but the
          experience feels like ChatGPT in the same tab, and brand guidelines
          are hard to configure. CleverTap generates copy across emotional tones
          but content has to be created before the campaign, making the flow
          counterintuitive and not channel-specific. Copy.ai supports multiple
          AI models and can pull from diverse sources, but it&apos;s not a
          martech platform, so users have to switch tools. Grammarly excels at
          accessibility and placement but is primarily a proofreading tool, not
          a content creator. OpenAI is the most flexible but demands prompt
          engineering skills most marketers don&apos;t have, and it opens in
          another tab entirely.
        </Paragraph>
        <Paragraph>
          The opportunity:{" "}
          <Highlight color="blue">
            build a contextually aware AI copywriter
          </Highlight>{" "}
          that uses workspace campaign history, respects channel-level character
          limits, and structures the prompting experience so users never have to
          think about prompt engineering.
        </Paragraph>
      </Section>

      {/* ── Scope ─────────────────────────────────────────────────── */}

      <Section
        id="scope"
        sectionTitle="Defining the scope"
      >
        <Paragraph>
          To prioritise and define the scope we used the MoSCoW method:
        </Paragraph>
        <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[14px] font-[450] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)]">
          <li><Highlight color="green">Must have:</Highlight> a new product inside MoEngage to create AI-powered content at the channel level</li>
          <li><Highlight color="yellow">Should have:</Highlight> intelligent keyword suggestions and brand/tone controls</li>
          <li><Highlight color="blue">Could have:</Highlight> image generation and multimodal experiences via audio or reference images</li>
          <li><Highlight color="pink">Won&apos;t have this phase:</Highlight> a chat-based prompt interface or third-party tool integrations</li>
        </ul>
        <Paragraph>
          As push was the most used channel, we focused there first, with
          scalability in mind. AI-generated push messages would cover Subject,
          Title, Summary, and Body. Keyword suggestions would draw on the
          workspace&apos;s legacy campaign data, and marketers could tune voice
          and tone directly in the UI.
        </Paragraph>
      </Section>

      {/* ── Design Process ────────────────────────────────────────── */}

      <Section
        id="design-process"
        sectionTitle="Design Process"
        chapterTitle="Designing for a probabilistic system."
      >
        <ImageBlock
          src={`${IMG}/Designprocess.png`}
          alt="Design process diagram: Don't Know → Know How → Solution → Improve, spanning Problem Space, Solution Space, and Concrete Space"
          flush
          noBorder
        />
        <Paragraph>
          In addition to what I already knew, I needed to understand how the
          feature was built (OpenAI GPT-3, with workspace campaign data fed into
          the prompt as context), what output accuracy to expect (60–70%), what
          workspace data was available and how reliable it was, and how outputs
          could degrade when prompts aren&apos;t well structured.
        </Paragraph>
        <Paragraph>
          The most important edge case: if the AI doesn&apos;t generate good
          content, it must not block the marketer from creating their campaign.
          The entire flow had to be easy to exit at any point.
        </Paragraph>
        <Quote>
          While designing a probabilistic system where outputs change based on
          real-time user inputs, I had to predict surprises and design around
          them.
        </Quote>
        <Paragraph>
          The standard SaaS design process (<a href="https://www.uxdesigninstitute.com/blog/5-elements-of-ux-design/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-blue-600 decoration-blue-400 hover:decoration-blue-600 transition-colors">James Garrett&apos;s 5-layer model</a>)
          works well for deterministic systems. It doesn&apos;t capture the
          additional considerations needed for a probabilistic system like GenAI,
          which affect UX decisions downstream.
        </Paragraph>
      </Section>

      {/* ── User Journey ──────────────────────────────────────────── */}

      <Section
        id="user-journey"
        sectionTitle="User Journey"
      >
        <Paragraph>
          I mapped both the current journey and the expected journey, showing
          exactly where AI assistance would reduce friction across the Creation
          and Ideation phases of campaign building.
        </Paragraph>
        <div>
          <p className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] mb-2">Current journey</p>
          <ImageBlock
            src={`${IMG}/current-journey.png`}
            alt="Current user journey map showing the Creation and Ideation phases"
            flush
          />
        </div>
        <div>
          <p className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] mb-2">Expected journey with MerlinAI</p>
          <ImageBlock
            src={`${IMG}/expected-journey.png`}
            alt="Expected user journey with MerlinAI assistance across Creation and Ideation phases"
            flush
          />
        </div>
      </Section>

      {/* ── Lo-fi Designs ─────────────────────────────────────────── */}

      <Section
        id="lo-fi"
        sectionTitle="Lo-fi Designs"
      >
        <Paragraph>
          In school, fill-in-the-blank questions were always easier than
          long-answer questions: the structure is predefined, you just supply
          the keywords. Starting from a blank prompt is the hardest part of
          using AI. So I applied the same UX paradigm here: a UI that mimics
          fill-in-the-blank, where the blanks are dropdowns and input boxes
          rather than free text.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/Fillintheblank.png`}
          alt="Lo-fi wireframe showing fill-in-the-blank prompt UI for MerlinAI"
          flush
        />
        <Paragraph>
          With this UX paradigm and user journey in mind, I created Lo-Fi
          designs of the hero screen. Below are 3 ideas I explored.
        </Paragraph>
        <IdeaCarousel />
        <Paragraph>
          We settled on a{" "}
          <Highlight color="yellow">modal slider pattern</Highlight> because
          it&apos;s non-intrusive but intuitive. The marketer can exit at any
          point by closing the modal if the AI output isn&apos;t good, preview
          content before pasting, and iterate easily. The pattern is also
          familiar from the segmentation module.
        </Paragraph>
      </Section>

      {/* ── Detailed Design ───────────────────────────────────────── */}

      <Section
        id="detailed-design"
        sectionTitle="Key Highlights"
        chapterTitle="Key highlights from the final designs."
      >
        <PillTabs
          tabs={[
            {
              id: "structured-input",
              label: "Structured Input",
              content: (
                <>
                  <Paragraph>
                    Many users don&apos;t know how to write effective AI prompts,
                    and they shouldn&apos;t have to. A blank text box is
                    overwhelming. Instead of forcing manual typing, I introduced
                    Madlibs-style structured input fields: dropdowns to define
                    output type, auto-suggestions for keywords based on previous
                    campaign data, and toggles for emojis. Context-aware
                    adjustments let users tweak specific parts rather than
                    rewriting the entire prompt. Users don&apos;t have to
                    struggle with the &ldquo;right&rdquo; way to phrase
                    something. They just select what they need and MerlinAI
                    does the rest.
                  </Paragraph>
                  <ImageBlock
                    src={`${IMG}/feature-structured-input.png`}
                    alt="Structured input fields with dropdowns for prompt type, keywords, tone, style and emoji toggle"
                    contained
                    maxWidth="50%"
                  />
                </>
              ),
            },
            {
              id: "preset-templates",
              label: "Preset Templates",
              content: (
                <>
                  <Paragraph>
                    Instead of trial and error, MerlinAI provides predefined
                    templates for common tasks (Black Friday sales, flash sale,
                    clearance) and example prompts that adjust dynamically to
                    the client&apos;s industry. By reducing guesswork,
                    interactions are smoother and the generated output is more
                    effective in fewer iterations.
                  </Paragraph>
                  <ImageBlock
                    src={`${IMG}/feature-preset-templates.png`}
                    alt="Preset templates dropdown showing Black Friday sales, Flash sales, Electronics sales"
                    contained
                    maxWidth="50%"
                  />
                </>
              ),
            },
            {
              id: "iterative",
              label: "Iterative Adjustments",
              content: (
                <>
                  <Paragraph>
                    One of the biggest frustrations with AI tools is rewriting
                    an entire prompt just to make a small change. MerlinAI is
                    built ground-up for an iterative workflow: a preview with
                    pagination so users can tune each variation, plus one-click
                    regenerate with the same context for more suggestions. This
                    makes MerlinAI a collaborative process, not a one-time
                    shot.
                  </Paragraph>
                  <ImageBlock
                    src={`${IMG}/feature-iterative.png`}
                    alt="Push notification preview card with pagination showing 2 of 2 iterations"
                    contained
                    maxWidth="50%"
                  />
                </>
              ),
            },
            {
              id: "quick-controls",
              label: "Quick Controls",
              content: (
                <>
                  <Paragraph>
                    For users who want to generate variations without reopening
                    the full panel, quick controls surface directly in the
                    campaign composer, with one button to create an AI variant,
                    another to start fresh. Speed and accessibility, without
                    friction.
                  </Paragraph>
                  <ImageBlock
                    src={`${IMG}/feature-quick-controls.png`}
                    alt="MerlinAI quick control bar with Create AI Variant and Create new buttons"
                    contained
                    maxWidth="50%"
                  />
                </>
              ),
            },
          ]}
        />
      </Section>

      {/* ── Figma ─────────────────────────────────────────────────── */}

      <Section
        id="figma"
        sectionTitle="Detailed design"
        chapterTitle="Detailed design + Figma."
      >
        <Paragraph>
          Explore the full interactive design file, with every screen, state, and
          annotation.
        </Paragraph>
        <figure className="my-1">
          <div
            className="relative rounded-lg overflow-hidden"
            style={{ height: 560 }}
          >
            <iframe
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fqd6h8roOOg0MXhma7K5eyR%2FPortfolio-2024%3Fnode-id%3D661-2255%26m%3Ddev"
              title="MerlinAI Final design screens"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </figure>
      </Section>

      {/* ── Launch ────────────────────────────────────────────────── */}

      <Section id="launch" sectionTitle="Launch">
        <Paragraph>
          The final product shipped inside MoEngage. Watch the full walkthrough
          of MerlinAI Copywriter in action.
        </Paragraph>
        <figure className="my-1">
          <div className="relative rounded-lg overflow-hidden aspect-video">
            <iframe
              src="https://www.youtube.com/embed/BiAZyia1HM4"
              title="MerlinAI Copywriter Product walkthrough"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </figure>
      </Section>

      {/* ── Impact ────────────────────────────────────────────────── */}

      <Section
        id="impact"
        sectionTitle="Impact & Results"
      >
        <Paragraph>
          Outcomes tracked across the first quarter post-launch. We set
          conservative targets, and beat all three.
        </Paragraph>
        <Stats
          stats={[
            {
              value: "273",
              label:
                "Unique accounts using the feature, against a target of 100 accounts",
            },
            {
              value: "~2 days",
              label:
                "Reduction in campaign creation time, against a target of 30%. Achieved 50% reduction",
            },
            {
              value: "24%",
              label:
                "Engagement uplift on MerlinAI campaigns, against a target of 10%",
            },
          ]}
        />
        <Paragraph>
          Glance, a subsidiary of InMobi, saw{" "}
          <strong>50% faster campaign go-live times</strong> and a{" "}
          <strong>38% uplift in push notification CTRs</strong> after adopting
          MerlinAI.{" "}
          <a
            href="https://www.moengage.com/casestudy/glance-achieves-faster-go-live-times-with-merlin-ai-moengage/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-[rgba(0,0,0,.8)] hover:text-[var(--accent)] transition-colors"
          >
            Read case study →
          </a>
        </Paragraph>
        <Paragraph>
          Telekom Romania, a Deutsche Telekom subsidiary, improved their
          prepaid activation campaign CTR by a{" "}
          <strong>staggering 65%</strong>.{" "}
          <a
            href="https://www.moengage.com/casestudy/merlin-genai-boosts-deutsche-telekoms-campaign-ctr-by-an-impressive-65/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-[rgba(0,0,0,.8)] hover:text-[var(--accent)] transition-colors"
          >
            Read case study →
          </a>
        </Paragraph>
      </Section>

      {/* ── Further Iterations ────────────────────────────────────── */}

      <Section
        id="further"
        sectionTitle="Further Iterations"
        chapterTitle="Further ideations"
      >
        <Paragraph>
          Though we were happy with the results, I noticed MerlinAI wasn&apos;t
          performing as well in a few demographics, especially in SEA regions.
          Calls with users revealed they needed content in their native language.
          We solved this by adding a language dropdown, letting marketers specify
          language alongside their prompt.
        </Paragraph>
        <ImageBlock
          src={`${IMG}/further-language.jpg`}
          alt="Language selector added to MerlinAI, supporting English, Tamil, Balinese, Hindi, Telugu and Kannada"
          contained
          maxWidth="50%"
        />
        <Paragraph>
          After the release of ChatGPT 4.0, we tested internally and found
          meaningfully better output quality, so we updated MerlinAI&apos;s
          underlying model to GPT 4.0.
        </Paragraph>
        <Paragraph>
          Once we saw stable retention results, we expanded MerlinAI beyond push
          notifications to Email, WhatsApp, and other channels, making the
          feature scalable across the full MoEngage suite.
        </Paragraph>
      </Section>

      {/* ── What Next ─────────────────────────────────────────────── */}

      <Section
        id="what-next"
        sectionTitle="What Next"
        chapterTitle="The roadmap ahead."
      >
        <Paragraph>
          Looking at the advantages of leveraging AI in the campaign workflow,
          we are releasing more products that follow the same UX patterns. These
          new features may eventually be packaged and sold as MerlinAI Studio.
        </Paragraph>
        <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[14px] font-[450] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)]">
          <li>
            <strong>MerlinAI Designer (Live):</strong> generates images based
            on prompts provided by the user. Released to a few customers as
            beta.
          </li>
          <li>
            <strong>MerlinAI for Segmentation (Live):</strong> input
            a sentence in natural language describing your segment and MerlinAI
            will automatically check the metadata of existing event attributes
            to create the exact segment.
          </li>
        </ul>
      </Section>
    </CaseStudyLayout>
  );
}
