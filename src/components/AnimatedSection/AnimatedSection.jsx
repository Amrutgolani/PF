import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/motion';

/**
 * Section wrapper that provides the semantic <section>, id for nav anchoring,
 * and consistent spacing. Children decide their own animations.
 */
export function Section({ id, className = '', alt = false, children, ariaLabel }) {
  return (
    <section
      id={id}
      className={`section ${alt ? 'section--alt' : ''} ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div className="container">{children}</div>
    </section>
  );
}

/** Scroll-revealed heading block with eyebrow, title and optional subtitle. */
export function SectionHeading({ eyebrow, index, title, subtitle, align = 'left', as: Tag = 'h2' }) {
  const isCenter = align === 'center';
  return (
    <motion.div
      className={`section-heading ${isCenter ? 'text-center mx-auto' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {eyebrow && (
        <motion.span className="eyebrow" variants={fadeUp} custom={0}>
          {index && <b className="eyebrow__index">{index}</b>}
          {eyebrow}
        </motion.span>
      )}
      <motion.div variants={fadeUp} custom={1}>
        <Tag className={`section-title ${isCenter ? 'mx-auto' : ''}`}>{title}</Tag>
      </motion.div>
      {subtitle && (
        <motion.p className={`section-subtitle ${isCenter ? 'mx-auto' : ''}`} variants={fadeUp} custom={2}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

/** Generic reveal wrapper for any block. */
export function Reveal({ children, delay = 0, className = '', variants = fadeUp, as = 'div', ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
