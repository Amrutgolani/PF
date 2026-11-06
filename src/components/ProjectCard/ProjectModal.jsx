import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import ProjectMockup from './ProjectMockup';
import './ProjectModal.css';

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    previouslyFocused.current = document.activeElement;
    document.body.classList.add('no-scroll');

    const node = dialogRef.current;
    const focusables = node ? node.querySelectorAll(FOCUSABLE) : [];
    focusables[0]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
      previouslyFocused.current?.focus?.();
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="pmodal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            className="pmodal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pmodal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className="pmodal__close" onClick={onClose} aria-label="Close project details">
              <X size={18} />
            </button>

            <div className="pmodal__visual">
              <ProjectMockup variant={project.mockup} title={project.name} />
            </div>

            <div className="pmodal__body">
              <div className="pf__meta mono">
                <span className="pf__index">{project.index}</span>
                <span>{project.category}</span>
              </div>
              <h2 id="pmodal-title" className="pmodal__title">
                {project.name}
              </h2>
              <p className="pmodal__context">{project.context}</p>
              <p className="pmodal__desc">{project.description}</p>

              <div className="pmodal__grid">
                <section aria-labelledby="pmodal-contrib">
                  <h3 id="pmodal-contrib" className="pmodal__h">
                    My Contribution
                  </h3>
                  <ul className="pmodal__list" role="list">
                    {project.contribution.map((c) => (
                      <li key={c}>
                        <CheckCircle2 size={15} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="pmodal-func">
                  <h3 id="pmodal-func" className="pmodal__h">
                    Key Functionalities
                  </h3>
                  <ul className="pmodal__tags" role="list">
                    {project.functionalities.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <section aria-labelledby="pmodal-tech">
                <h3 id="pmodal-tech" className="pmodal__h">
                  Technologies Used
                </h3>
                <ul className="pmodal__tech" role="list">
                  {project.technologies.map((t) => (
                    <li key={t} className="chip chip--accent">
                      {t}
                    </li>
                  ))}
                </ul>
              </section>

              <p className="pmodal__note mono">Private / client project — no public repository or live demo.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
