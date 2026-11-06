import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import ProjectMockup from './ProjectMockup';
import Button from '../Buttons/Button';
import TechIcon from '../TechIcon/TechIcon';
import { fadeUp, viewportOnce } from '../../utils/motion';
import './ProjectCard.css';

function TechList({ items, limit }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <ul className="pc-tech" role="list">
      {list.map((t) => (
        <li key={t} className="pc-tech__item">
          <TechIcon name={t} size="sm" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Featured project card. `featured` projects render as a full-width split
 * layout (mockup + narrative) with alternating direction; others render as a
 * compact card.
 */
export default function ProjectCard({ project, index, onOpen }) {
  const reversed = project.featured && index % 2 === 1;

  if (project.featured) {
    return (
      <motion.article
        className={`pf ${reversed ? 'pf--reversed' : ''}`}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.div
          className="pf__visual"
          whileHover={{ y: -6, rotateX: 1.5, rotateY: reversed ? 2 : -2 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          onClick={() => onOpen(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(project)}
          aria-label={`Open details for ${project.name}`}
        >
          <div className="pf__glow" />
          <ProjectMockup variant={project.mockup} title={project.name} />
          <span className="pf__visual-hint mono">Click to view details</span>
        </motion.div>

        <div className="pf__content">
          <div className="pf__meta mono">
            <span className="pf__index">{project.index}</span>
            <span className="pf__category">{project.category}</span>
          </div>

          <h3 className="pf__title">{project.name}</h3>
          <p className="pf__context">{project.context}</p>
          <p className="pf__desc">{project.description}</p>

          <div className="pf__role">
            <span className="pf__role-label">What I built</span>
            <ul role="list">
              {project.contribution.slice(0, 3).map((c) => (
                <li key={c}>
                  <CheckCircle2 size={15} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <TechList items={project.technologies} />

          <div className="pf__actions">
            <Button variant="secondary" iconRight={ArrowUpRight} onClick={() => onOpen(project)}>
              View Details
            </Button>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="pc card-base"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className="pc__visual">
        <ProjectMockup variant={project.mockup} title={project.name} />
      </div>
      <div className="pc__content">
        <div className="pf__meta mono">
          <span className="pf__index">{project.index}</span>
          <span className="pf__category">{project.category}</span>
        </div>
        <h3 className="pc__title">{project.name}</h3>
        <p className="pf__context">{project.context}</p>
        <p className="pc__desc">{project.description}</p>
        <TechList items={project.technologies} limit={5} />
        <button type="button" className="pc__link" onClick={() => onOpen(project)}>
          View Details <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.article>
  );
}
