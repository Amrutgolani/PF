import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import './EmailFallback.css';

/**
 * Shown when a mailto: link did not open a mail client. Offers web-mail
 * compose links and a copy-address action so the visitor is never stuck.
 */
export default function EmailFallback({ open, onClose, email, links }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="email-fb"
          role="dialog"
          aria-label="Email options"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
        >
          <div className="email-fb__head">
            <span>No email app opened? Use one of these instead:</span>
            <button type="button" className="email-fb__close" onClick={onClose} aria-label="Close">
              <X size={14} />
            </button>
          </div>
          <div className="email-fb__actions">
            <a href={links.gmail} target="_blank" rel="noopener noreferrer" className="email-fb__btn">
              Open in Gmail <ExternalLink size={13} />
            </a>
            <a href={links.outlook} target="_blank" rel="noopener noreferrer" className="email-fb__btn">
              Open in Outlook <ExternalLink size={13} />
            </a>
            <button type="button" className={`email-fb__btn ${copied ? 'is-copied' : ''}`} onClick={() => copy(email)}>
              {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied!' : 'Copy address'}
            </button>
          </div>
          <span className="email-fb__addr mono">{email}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
