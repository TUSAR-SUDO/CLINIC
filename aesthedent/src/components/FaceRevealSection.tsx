import FaceReveal from "./FaceReveal";
import { Reveal } from "@/components/motion/Reveal";

export default function FaceRevealSection() {
  return (
    <section className="fr-section" aria-labelledby="fr-section-heading">
      <div className="fr-section__inner">
        {/* Text side */}
        <Reveal className="fr-section__text">
          <p className="fr-section__eyebrow">One face, four services</p>
          <h2 id="fr-section-heading" className="fr-section__heading">
            Art and science of natural aesthetics
          </h2>
          <p className="fr-section__body">
            Aesthedent is a multi-speciality clinic for dental, skin, hair and
            PMU care in Old Town, Bhubaneswar — bringing thoughtful clinical
            precision and calm, personalised care together under one roof.
          </p>

          <ul className="fr-section__services" aria-label="Our services">
            <li className="fr-section__service">
              <span className="fr-section__service-dot" aria-hidden="true" />
              <a href="/dental" className="fr-section__service-link">Dental</a>
            </li>
            <li className="fr-section__service">
              <span className="fr-section__service-dot" aria-hidden="true" />
              <a href="/skin" className="fr-section__service-link">Skin</a>
            </li>
            <li className="fr-section__service">
              <span className="fr-section__service-dot" aria-hidden="true" />
              <span className="fr-section__service-link">Hair</span>
            </li>
            <li className="fr-section__service">
              <span className="fr-section__service-dot" aria-hidden="true" />
              <span className="fr-section__service-link">PMU</span>
            </li>
          </ul>
        </Reveal>

        {/* Image / face side */}
        <Reveal className="fr-section__image-col" delay={0.12} y={18}>
          <FaceReveal />
        </Reveal>
      </div>
    </section>
  );
}

