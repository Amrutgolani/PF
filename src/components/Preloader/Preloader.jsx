import { motion } from 'framer-motion';
import './Preloader.css';

export default function Preloader() {
  return (
    <motion.div
      className="preloader"
      role="status"
      aria-label="Loading portfolio"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    >
      <div className="preloader__mark">
        <motion.span
          className="preloader__logo"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          A<span>G</span>
        </motion.span>
        <div className="preloader__bar">
          <motion.div
            className="preloader__bar-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </div>
        <motion.span
          className="preloader__text mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          dotnet run --portfolio
        </motion.span>
      </div>
    </motion.div>
  );
}
