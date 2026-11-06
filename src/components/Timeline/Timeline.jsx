import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/motion';
import './Timeline.css';

/**
 * Vertical timeline with an animated progress line. Each item renders a
 * marker and the provided content. Used for Experience, Education, and About.
 */
export default function Timeline({ items, renderItem, compact = false }) {
  return (
    <div className={`timeline ${compact ? 'timeline--compact' : ''}`}>
      <motion.span
        className="timeline__line"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {items.map((item, i) => (
        <motion.div
          key={item.id || i}
          className="timeline__item"
          variants={fadeUp}
          custom={i * 0.6}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className={`timeline__marker ${item.markerClass || ''}`}>
            <span className="timeline__marker-dot" />
          </span>
          <div className="timeline__content">{renderItem(item, i)}</div>
        </motion.div>
      ))}
    </div>
  );
}
