import { motion } from 'framer-motion';
import { getIcon } from '../../utils/icons';
import { fadeUp, viewportOnce } from '../../utils/motion';
import TechIcon from '../TechIcon/TechIcon';
import './SkillCard.css';

/** Bento-grid card for one skill category. */
export default function SkillCard({ category, index = 0 }) {
  const Icon = getIcon(category.icon);
  return (
    <motion.article
      className={`skill-card card-base skill-card--${category.size}`}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className="skill-card__head">
        <span className="skill-card__icon">
          <Icon size={20} />
        </span>
        <div className="skill-card__head-text">
          <h3 className="skill-card__title">{category.title}</h3>
          <p className="skill-card__desc">{category.description}</p>
        </div>
        <span className="skill-card__count mono">{category.skills.length}</span>
      </div>

      <ul className="skill-card__list" role="list">
        {category.skills.map((skill, i) => (
          <motion.li
            key={skill.name}
            className="skill-item"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
            whileHover={{ x: 3 }}
          >
            <TechIcon name={skill.name} />
            <span className="skill-item__text">
              <span className="skill-item__name">{skill.name}</span>
              <span className="skill-item__note">{skill.note}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}
