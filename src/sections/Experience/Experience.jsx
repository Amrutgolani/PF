import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, GraduationCap, MapPin } from 'lucide-react';
import { Section, SectionHeading } from '../../components/AnimatedSection/AnimatedSection';
import TechIcon from '../../components/TechIcon/TechIcon';
import { experience } from '../../data/experience';
import { fadeUp, viewportOnce } from '../../utils/motion';
import './Experience.css';

function ExperienceEntry({ entry, index, isLast }) {
  const isTraining = entry.typeKey === 'training';
  const TypeIcon = isTraining ? GraduationCap : Briefcase;

  return (
    <motion.li
      className={`xp ${isTraining ? 'xp--training' : ''} ${isLast ? 'xp--last' : ''}`}
      variants={fadeUp}
      custom={index * 0.5}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* Left rail */}
      <div className="xp__rail">
        <span className="xp__dot">
          <TypeIcon size={14} />
        </span>
        <div className="xp__rail-body">
          <span className="xp__dates mono">
            {entry.start} — {entry.end}
          </span>
          <span className={`xp__type ${isTraining ? 'xp__type--training' : 'xp__type--pro'}`}>{entry.type}</span>
          <span className="xp__loc">
            <MapPin size={12} /> {entry.location}
          </span>
        </div>
      </div>

      {/* Card */}
      <article className="xp__card card-base">
        <header className="xp__head">
          <div>
            <h3 className="xp__company">{entry.company}</h3>
            <p className="xp__role">{entry.role}</p>
          </div>
          <span className="xp__duration mono">{entry.duration}</span>
        </header>

        <p className="xp__summary">{entry.summary}</p>

        <div className="xp__projects">
          {entry.projects.map((p, i) => (
            <motion.div
              key={p.name}
              className="xp__project"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="xp__project-head">
                <span className="xp__project-index mono">0{i + 1}</span>
                <h4>{p.name}</h4>
              </div>
              <ul className="xp__stack" role="list">
                {p.stack.map((s) => (
                  <li key={s} className="xp__stack-item">
                    <TechIcon name={s} size="sm" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <ul className="xp__points" role="list">
                {p.points.map((pt) => (
                  <li key={pt}>
                    <CheckCircle2 size={14} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </article>
    </motion.li>
  );
}

export default function Experience() {
  return (
    <Section id="experience" ariaLabel="Professional experience">
      <SectionHeading
        eyebrow="Experience"
        index="02"
        title="Professional Experience & Training."
        subtitle="Professional employment is clearly separated from the training period that preceded it."
      />
      <ol className="xp-list" role="list">
        {experience.map((e, i) => (
          <ExperienceEntry key={e.id} entry={e} index={i} isLast={i === experience.length - 1} />
        ))}
      </ol>
    </Section>
  );
}
