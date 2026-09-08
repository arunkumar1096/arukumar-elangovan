import NavBar from "../../components/nav-bar";
import Link from "next/link";

export const metadata = {
  title: "The Best Design System I Built Was One I Gave Away",
  description: "How I built a mascot system that ships itself — and why giving up control was the whole point.",
};

/* ── Shared primitives ─────────────────────────────────── */

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 pt-14">
      <span className="text-[18px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" />
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] font-[450] leading-[1.75] tracking-[-0.003em] text-[rgba(0,0,0,.78)] mb-5">
      {children}
    </p>
  );
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 pl-5 border-l-2 border-[rgba(0,0,0,.12)]">
      <p className="text-[17px] font-[450] leading-[1.75] tracking-[-0.003em] text-[rgba(0,0,0,.78)]">
        {children}
      </p>
    </blockquote>
  );
}

function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="my-6 rounded-lg overflow-hidden">
      <img src={src} alt={alt} className="w-full block" />
    </div>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="my-6 aspect-[16/9] rounded-lg bg-[var(--surface)] flex items-center justify-center">
      <span className="text-[12px] text-[rgba(0,0,0,.3)] font-[450]">{label}</span>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function BlogPost() {
  return (
    <div className="min-h-screen">
      <NavBar showBack scrollTitle="The Best Design System I Built Was One I Gave Away" />

      <main className="max-w-[48rem] mx-auto px-6 pt-8 sm:pt-20 pb-24">

        {/* Header */}
        <div className="mb-10">
          <p
            className="text-[11px] font-[550] tracking-[0.08em] uppercase text-[rgba(0,0,0,.35)] mb-4"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Design Systems&nbsp;•&nbsp;2025
          </p>
          <h1
            className="text-[28px] sm:text-[38px] font-[500] leading-[1.15] tracking-[-0.02em] text-[rgba(0,0,0,.85)] mb-5"
            style={{ fontFamily: "var(--font-mackinac), serif" }}
          >
            The Best Design System I Built Was One I Gave Away
          </h1>
        </div>

        {/* Opening */}
        <P>
          A few days ago a hiring post went out on linkedin with our mascot(Reon) in it.
        </P>

        <figure className="my-6">
          <div className="rounded-lg overflow-hidden bg-[var(--surface)] flex items-center justify-center p-4 sm:p-8">
            <img
              src="/images/blog/reonblog/Hiring-post.jpeg"
              alt="Hiring post featuring Reon the mascot"
              className="block max-h-[420px] w-auto mx-auto rounded"
              style={{ boxShadow: "var(--shadow-floating)" }}
            />
          </div>
          <figcaption className="text-[12px] text-[rgba(0,0,0,.5)] mt-2">
            Actual LinkedIn post from HR team
          </figcaption>
        </figure>

        <P>
          Reon was right on propotions, colours, expression and exactly how i would have designed it. But i
          didnt. I have never seen this version of reon. Someone from the HR team made it. No jira ticket,
          no design ideations, no can we make it pop?. For any designer this would have triggered a panic
          attack. For me, it made my day. It was a system working, the exact way i designed it to work. Let
          me backup and expain it in detail.
        </P>

        {/* Section 1 */}
        <SectionHeader label="What does reo do?" />

        <P>
          I am the founding designer at{" "}
          <Link
            href="https://www.reo.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-blue-600 decoration-blue-400 hover:decoration-blue-600 transition-colors"
          >
            reo.dev
          </Link>
          . Reo generates leads for sales and marketing teams of dev tool companies (imagine cursor, N8N,
          vercel etc..). We track signals like github, jobposts, team size of many companies and give our
          users a curated list of leads. And yes we have agents, multiple agents actually.
        </P>
        <P>
          Each agent does a specific task flawlessly. For example, we have a agent called champion job
          switch. When a power user(champion) of your product swtiches job he/she is likely to pitch your
          product to the new company too. Our agent tracks that and gives you that information.
        </P>

        {/* Section 2 */}
        <SectionHeader label="So why a mascot?" />

        <P>
          End users of reo are SDR's, AE's and GTM teams. They have seen every gradient, every version of
          the star AI icon. Frankly, another AI feature just bounces of their head. When that happens so
          does our product. I started exploring what could make us stand out?
        </P>
        <P>
          A similar looking AI icon gives you familarity and consistency across a SAAS eco system. When you
          are a small dog, fighting a big fight you need to standout. You need to be memorable, and cant be
          on in 10 products. that when the idea of a mascot sparked.
        </P>
        <P>
          Yes, we all know clippy failed. But McDonnalds or KFC didnt. There are mascot's we relate to
          around us. I stared reading on what makes a mascot worthy? i dont want to bore anyone with gyan so
          here is the shot summary. For a moscot to win, it needs 3 importsnt aspects
        </P>

        <ul className="mb-5 pl-5 space-y-2 list-disc marker:text-[rgba(0,0,0,.35)]">
          {[
            { text: "Authentic and consistent.", color: "highlight-blue" },
            { text: "Relatable and natural.", color: "highlight-yellow" },
            { text: "Should carry genuine human warmth.", color: "highlight-green" },
          ].map(({ text, color }) => (
            <li key={text} className="text-[15px] font-[450] leading-[1.75] tracking-[-0.003em] text-[rgba(0,0,0,.78)]">
              <span className={`highlight ${color}`}>{text}</span>
            </li>
          ))}
        </ul>

        <P>
          Here are some examples of mascots in the SaaS industry currently.
        </P>
        <figure className="my-6">
          <div className="relative rounded-lg overflow-hidden bg-[var(--surface)] px-3 pt-4 pb-4 sm:px-6 sm:pt-8 sm:pb-8 flex items-center justify-center">
            <img
              src="/images/blog/reonblog/Mascots.png"
              alt="Examples of mascots in the SaaS industry"
              className="w-full block"
            />
            <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
          </div>
        </figure>
        <P>
          And as reo also operates on the devtool market, It was worth a shot to try it. But one thing i
          was clear with was, our mascot shouldnt be something that was bolted on to marketing, but the
          inverse.
        </P>

        {/* Section 3 */}
        <SectionHeader label="Problem statement" />

        <P>Here is something no one tells you about designing a mascot.</P>

        <Blockquote>
          "The mascot isnt the deliverable the{" "}
          <span className="highlight highlight-yellow">hundreth mascot</span> it."
        </Blockquote>

        <P>
          Creating a single asset would have been walk in the park. If we are committed to the idea of a mascot, we had to do it right. We would need so many assets, which inturn means so many hours
          spent on illutrator or figma drawing each line in the right stroke width. If you look at our
          product today, you will see reon in 100 places.
        </P>
        <figure className="my-6">
          <div className="relative rounded-lg overflow-hidden bg-[var(--surface)] px-3 pt-4 pb-4 sm:px-6 sm:pt-8 sm:pb-8 flex items-center justify-center">
            <img
              src="/images/blog/reonblog/Reon_examples.png"
              alt="Reon across the product"
              className="w-full block"
            />
            <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
          </div>
        </figure>
        <P>
          Every single one of them is an indvidual asset. In the old world, i would have created each and every
          one of it. That ment i had to swtich my brain from product design to visual design everytime.
          Also, if everything goes through me, i become the bottleneck for a queue that never ends.
        </P>
        <P>
          To summarize, the problem statement is not to design a mascot. Its to design a way to produce
          infinte mascots on brand without me. Now that we have our problem statement, lets get into the
          details.
        </P>

        {/* Section 4 */}
        <SectionHeader label="How to design a mascot?" />

        <P>
          Back to basics of visual design. It all starts with a moodboard. After hours of sourcing through
          the web and collecting every vibe i wanted for reon this is how my moodboard looked like.
        </P>

        <div className="my-6 rounded-lg overflow-hidden aspect-[16/9]">
          <iframe
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/jjPIYlcmeR7zIGWwNMACcl/Reon-Moodboard?node-id=1-2"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>

        <P>
          One thing to note here is we already has reon as a real-life figure for one of the tech
          confrences. I know reon has to be an blue octopus. The physics and style of reon is what i have
          to nail. With this and the moodboard in place i started to draw a rough sketch of reon.
        </P>
        <figure className="my-6">
          <div className="relative rounded-lg overflow-hidden bg-[var(--surface)] px-3 pt-4 pb-4 sm:px-6 sm:pt-8 sm:pb-8 flex items-center justify-center">
            <img
              src="/images/blog/reonblog/sketch.png"
              alt="Rough sketch of Reon"
              className="w-3/4 block mx-auto rounded-2xl"
            />
            <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
          </div>
        </figure>
        <P>
          The idea was not to be perfect but to find a vibe for the visual style. Here are some initial ideas i explored using illustrator and some generated using AI.
        </P>
        <figure className="my-6">
          <div className="relative rounded-lg overflow-hidden bg-[var(--surface)] px-3 pt-4 pb-4 sm:px-6 sm:pt-8 sm:pb-8 flex items-center justify-center">
            <img
              src="/images/blog/reonblog/explorations.png"
              alt="Reon style explorations"
              className="w-full block"
            />
            <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
          </div>
        </figure>
        <P>
          Of all the explorations i personally liked the isomorphic style. It became my reference point i kept coming
          back to. It was cute but had context. Can be fit in a sqare aspect ratio, which meant it can also
          be used as a icon of needed. It was colourfull and intresting without much visual load to look at.
          Also it looked like my math teacher from 12th grade who helped me understand complex qudratic
          equtions. Which is what i hope reon does for our users in the product, to make sense of the data
          presents before them.
        </P>

        <P>
          Now that i had a reon lets make more. I had to choose a model to train on. With the basic
          understanding i had i knew, gemini was the best in image genration. Claude is really good and
          coding. ChatGPT is good at maybe playing chess? Also Reo had a enterprise account with google and
          gemini was free. Thus gemini.
        </P>
        <P>
          With refrence image in place i started to playaround in gemini. My initial prompts looked like.
        </P>
        <Blockquote>
          "Assume you are a visual designer with 10 years of experince in designing mascots. Attached is an
          image of Reo's macot Reon. Train yourself of this image as a reference image. Create a image with
          reon holding a wrench"
        </Blockquote>
        <P>
          Then, i went on chating in gemini inside the same chat so i create a context window, till i felt comfortable with the designs gemini was reponding
          with. Few things i was looking at the output and changing were
        </P>

        <ul className="mb-5 pl-5 space-y-2 list-disc marker:text-[rgba(0,0,0,.35)]">
          {[
            { text: "Colour pallete", color: "highlight-blue" },
            { text: "No texts in the images", color: "highlight-yellow" },
            { text: "Aspect ratio", color: "highlight-green" },
            { text: "Propotions", color: "highlight-blue" },
            { text: "Exppression of reon", color: "highlight-yellow" },
            { text: "Basic physics", color: "highlight-green" },
          ].map(({ text, color }) => (
            <li key={text} className="text-[15px] font-[450] leading-[1.75] tracking-[-0.003em] text-[rgba(0,0,0,.78)]">
              <span className={`highlight ${color}`}>{text}</span>
            </li>
          ))}
        </ul>

        <P>
          Once i was happy with the output, came the most important step. i wanted to create a gemini gem.
          Gem's are like .md files for gemini. So when you ask gemini to create an image in a chat with a
          gem, AI goes through the instructions in the gem and combines that with the prompt to gove you an
          output. I wanted to write the instructions for this gem.
        </P>
        <figure className="my-6">
          <div className="relative rounded-lg overflow-hidden bg-[var(--surface)] px-3 pt-4 pb-4 sm:px-6 sm:pt-8 sm:pb-8 flex items-center justify-center">
            <img
              src="/images/blog/reonblog/initaldesigns.png"
              alt="Initial Reon design output"
              className="w-full block"
            />
            <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
          </div>
        </figure>
        <P>
          The million dollar idea moment: I asked gemini to write instructions for itself, to create a gem.
          This was the exact prompt
        </P>

        <Blockquote>
          "If you had to describe the image that we created as a gem how would you write the instructions?
          Go as detailed as possible, build guardrails, Analyse where it could fail and write rules. Give
          me the output as a txt file"
        </Blockquote>

        <P>
          I took those intrustions and build my gem around it. It failed so many times than i could count.
        </P>
        <figure className="my-6">
          <div className="relative rounded-lg overflow-hidden bg-[var(--surface)] px-3 pt-4 pb-4 sm:px-6 sm:pt-8 sm:pb-8 flex items-center justify-center">
            <img
              src="/images/blog/reonblog/creating a gem.png"
              alt="Creating a Gemini gem"
              className="w-full block rounded-xl"
            />
            <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
          </div>
        </figure>
        <P>
          Here are a few that felt funny as i was tweaking the prompt to "Reon with a smirk, holding a wrench"
        </P>

        <div className="grid grid-cols-2 gap-3 my-8">
          {[
            { src: "/images/blog/reonblog/funnyreon1.png", alt: "Funny Reon generation 1" },
            { src: "/images/blog/reonblog/Failure 2.png",  alt: "Reon generation failure 2" },
            { src: "/images/blog/reonblog/funnyreon2.png", alt: "Funny Reon generation 2" },
            { src: "/images/blog/reonblog/funnyreon3.png", alt: "Funny Reon generation 3" },
            { src: "/images/blog/reonblog/funnyreon4.png", alt: "Funny Reon generation 4" },
            { src: "/images/blog/reonblog/funnyreon5.png", alt: "Funny Reon generation 5" },
          ].map(({ src, alt }) => (
            <div key={src} className="rounded-lg overflow-hidden">
              <img src={src} alt={alt} className="w-full block" />
            </div>
          ))}
        </div>

        <P>
          I kept tweaking the instructions till i was happy with the outputs it created. This was a
          rewriting the instructions again and again, understanding what more can i write so the drift
          between the output and what i wanted was minimal. At this point i realised, just words maynot be
          enough.
        </P>
        <P>
          I attached my reference image to the instruction. The diffrence this made was huge. Text
          carried the variations, pose and context, reference image carried the identity. And the gem has
          been created.
        </P>
        <div className="grid grid-cols-2 gap-3 my-6">
          {[
            { src: "/images/blog/reonblog/Prompt sample 1.png", alt: "Sample prompt 1" },
            { src: "/images/blog/reonblog/Prompt sample 2.png", alt: "Sample prompt 2" },
          ].map(({ src, alt }) => (
            <div key={src} className="relative rounded-lg overflow-hidden bg-[var(--surface)] p-3 sm:p-5 flex items-center justify-center">
              <img src={src} alt={alt} className="w-full block rounded-lg" />
              <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
            </div>
          ))}
        </div>

        {/* Section 5 */}
        <SectionHeader label="Handoff: Giving up the control, not the purpose." />

        <P>
          This is my personal take, your opinions may defer and i respect them. Normally, a designer's
          instict is to protect thier companies brand guildelines. Every asset goes through a deigner. When
          you work as a founding designer in a fast moving startup, you working on each asset cosumes a lot
          of time. Time which can actually be put in designing a feature and making the user experience of
          the product better.
        </P>
        <P>
          I onboarded the entire marketing and GTM team to create theor own reon. I trusted the gaurdrails
          i built in the gem. For the mascot to be onbrand became the path of least resistance. To break my
          gaurdrails and push gemini to create something offbrand took real effort and time. In a sense, i
          protected reon not by being the only one who could create it, but by making it almost impossible
          to break.
        </P>
        <P>
          This meant giving up my control as a designer, but not my purpose. I no longer see reons when
          they ship. Me being out of the loop, was the carefully designed feature baked into reon. Measure
          of sucess has shifted from how many reon's i could create to how many reon's my team could create
          without me.
        </P>

        {/* Section 6 */}
        <SectionHeader label="Whats next for reon?" />

        <P>
          Right now, reon lives in a system anyone can drive. My gaurdrails still hold. The logical next
          step would be to fine tune the model for expersions, feel and emotions. That's training a LoRA on
          a set of refernce images. Today, as i opened the system its not a problem. We have hundreds of
          images generated by the marketing team to train the model on. This could solve a lot of
          bottlenecks, maybe even make videos of reon.
        </P>
        <P>
          So why havent i? With experience i have learnt the best part of design i knowing when to stop
          designing. Marketing team produces On-brand reon's in a no-code tool without me in the loop. A
          fine tuned model in LoRA needs a interface with a API backend for non technical people to use. It
          means maintainece to keeping the infrastuctre up and running. I have basically put myself back
          into this process. So nope.
        </P>
        <P>
          I will climb it, when we hit a ceiling in consistency. Not a day sooner. Right now, the self
          serve system with the gaurdrails is winning. When reon gets a 3rd eye by mistake, i will be back.
        </P>

        {/* FIN */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <p
            className="text-[12px] font-[550] tracking-[0.08em] uppercase text-[rgba(0,0,0,.25)]"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            fin
          </p>
        </div>

      </main>
    </div>
  );
}
