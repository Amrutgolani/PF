import { motion } from 'framer-motion';
import './Button.css';

/**
 * Polymorphic button: renders <a> when `href` is passed, otherwise <button>.
 * Variants: primary | secondary | ghost. Sizes: sm | md | lg.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  ...rest
}) {
  const classes = `btn-ag btn-ag--${variant} btn-ag--${size} ${className}`.trim();
  const content = (
    <>
      {Icon && <Icon size={size === 'sm' ? 15 : 18} aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && <IconRight size={size === 'sm' ? 15 : 18} aria-hidden="true" className="btn-ag__icon-right" />}
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...rest}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" className={classes} {...motionProps} {...rest}>
      {content}
    </motion.button>
  );
}
