import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, GraduationCap, MapPin } from 'lucide-react';
import { Section, SectionHeading, Reveal } from '../../components/AnimatedSection/AnimatedSection';
import Timeline from '../../components/Timeline/Timeline';
import { about, personal } from '../../data/personal';
import { getIcon } from '../../utils/icons';
import { fadeUp, viewportOnce } from '../../utils/motion';
import './About.css';

export default function About() {
  return (
    <Section id="about" alt ariaLabel="About Amrut Golani">
      <div className="row gy-5 gx-lg-5 align-items-start">
        {/* Narrative */}
        <div className="col-12 col-lg-7">
          <SectionHeading eyebrow="About Me" index="01" title={about.heading} />

          <motion.div
            className="about__text"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {about.paragraphs.map((p, i) => (
              <motion.p key={i} variants={fadeUp} custom={i}>
                {p}
              </motion.p>
            ))}
          </motion.div>

          <div className="about__highlights">
            {about.highlights.map((h, i) => {
              const Icon = getIcon(h.icon);
              return (
                <motion.div
                  key={h.title}
                  className="about__highlight card-base"
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  whileHover={{ y: -3 }}
                >
                  <span className="about__highlight-icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Profile card */}
        <div className="col-12 col-lg-5">
          <Reveal className="about__card card-base" delay={1}>
            <div className="about__card-head">
              <span className="about__avatar">{personal.initials}</span>
              <div>
                <span className="about__card-name">{personal.name}</span>
                <span className="about__card-role">{personal.title}</span>
              </div>
            </div>

            <ul className="about__facts" role="list">
              <li>
                <Briefcase size={15} />
                <span>{personal.experienceLabel}</span>
              </li>
              <li>
                <GraduationCap size={15} />
                <span>MCA · BCA</span>
              </li>
              <li>
                <MapPin size={15} />
                <span>{personal.location}</span>
              </li>
            </ul>

            <div className="about__expertise">
              <span className="about__card-label">Core expertise</span>
              <ul role="list">
                {about.expertise.map((e, i) => (
                  <motion.li
                    key={e}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                  >
                    <CheckCircle2 size={15} />
                    {e}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="about__journey">
              <span className="about__card-label">Journey</span>
              <Timeline
                compact
                items={about.journey.map((j, i) => ({
                  ...j,
                  id: i,
                  markerClass: i < 2 ? 'timeline__marker--muted' : '',
                }))}
                renderItem={(j) => (
                  <>
                    <span className="about__journey-year mono">{j.year}</span>
                    <h4 className="about__journey-title">{j.title}</h4>
                    <p className="about__journey-text">{j.text}</p>
                  </>
                )}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
