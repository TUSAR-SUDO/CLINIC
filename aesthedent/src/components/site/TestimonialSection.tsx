"use client";

import Image from "next/image";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { CLINIC } from "@/lib/clinic";
import { SERVICE_STORIES, type ServiceId } from "@/lib/testimonials";

type Story = (typeof SERVICE_STORIES)[ServiceId][number];

const COPY: Record<
  ServiceId,
  { eyebrow: string; top: string; em: string; caption: string }
> = {
  dental: {
    eyebrow: "Patient voices",
    top: "Said after",
    em: "a visit.",
    caption:
      "A few words from people who have visited the clinic for dental care.",
  },
  skin: {
    eyebrow: "Patient voices",
    top: "In their",
    em: "own words.",
    caption:
      "A few words from people who have visited the clinic for skin care.",
  },
  hair: {
    eyebrow: "Patient voices",
    top: "A few words",
    em: "on hair.",
    caption:
      "A few words from people who have visited the clinic for hair and scalp care.",
  },
  pmu: {
    eyebrow: "Patient voices",
    top: "Said about",
    em: "the detail.",
    caption:
      "A few words from people who have visited the clinic for permanent makeup.",
  },
};

/** Repeat a short pool so a column always has enough cards to loop cleanly. */
function fill(items: Story[], minimum = 4) {
  const out = [...items];
  while (out.length < minimum) {
    out.push(...items.slice(0, minimum - out.length));
  }
  return out;
}

function StoryCard({ story }: { story: Story }) {
  return (
    <figure className="tst__card">
      <span className="tst__mark" aria-hidden="true">
        &rdquo;
      </span>
      <blockquote className="tst__quote">{story.quote}</blockquote>
      <figcaption className="tst__person">
        <Image
          src={story.image}
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          unoptimized
          className="tst__avatar"
        />
        <span className="tst__who">
          <strong>{story.name}</strong>
          <small>
            {story.role} · {story.city}
          </small>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Infinite testimonial columns, after the 21st.dev "testimonials columns"
 * pattern: quote cards drift slowly upward in opposite directions behind a
 * soft edge fade, and every track pauses on hover or keyboard focus so a quote
 * is never pulled away mid-sentence.
 *
 * The motion is pure CSS on `transform`, so it costs nothing on phones and
 * needs no WebGL. Under `prefers-reduced-motion` the drift stops and the
 * column becomes a normal scroll area instead.
 *
 * Pools with fewer than three consented stories render as a single pull quote
 * rather than a loop of the same sentence.
 */
export default function TestimonialSection({
  service,
  theme = "light",
}: {
  service: ServiceId;
  theme?: "light" | "dark";
}) {
  const stories = SERVICE_STORIES[service];
  const copy = COPY[service];

  if (stories.length === 0) return null;

  const sparse = stories.length < 3;
  const columns = sparse
    ? [stories]
    : [stories, [...stories.slice(2), ...stories.slice(0, 2)]];

  return (
    <section
      className={`tst tst--${theme}${sparse ? " tst--sparse" : ""}`}
      aria-label="Patient stories"
    >
      <div className="tst__inner">
        <div className="tst__copy">
          <p className="tst__eyebrow">{copy.eyebrow}</p>
          <h2 className="tst__title">
            {copy.top} <em>{copy.em}</em>
          </h2>
          <p className="tst__caption">{copy.caption}</p>
          <div className="tst__actions">
            <LiquidMetalButton
              label="Book a visit"
              variant={theme === "dark" ? "cream" : "aubergine"}
              width={150}
              height={40}
              href={CLINIC.bookingHref}
            />
          </div>
        </div>

        <div className="tst__stage">
          <div className={`tst__cols${sparse ? " tst__cols--single" : ""}`}>
            {columns.map((items, columnIndex) => {
              const set = sparse ? items : fill(items);
              const passes = sparse ? 1 : 2;

              return (
                <div
                  key={columnIndex}
                  className={`tst__col${columnIndex === 1 ? " tst__col--reverse" : ""}`}
                >
                  <div
                    className="tst__track"
                    style={{
                      animationDuration: columnIndex === 0 ? "52s" : "64s",
                    }}
                  >
                    {Array.from({ length: passes }, (_, pass) => (
                      <div
                        className="tst__set"
                        key={pass}
                        aria-hidden={pass === 1 ? true : undefined}
                      >
                        {set.map((story, index) => (
                          <StoryCard
                            key={`${story.id}-${pass}-${index}`}
                            story={story}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
