import { useCallback, useEffect, useRef, useState } from 'react';

/** Build web-mail compose URLs that work in any browser without a mail app. */
export function webmailLinks(to, { subject = '', body = '' } = {}) {
  const su = encodeURIComponent(subject);
  const bd = encodeURIComponent(body);
  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${su}&body=${bd}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(to)}&subject=${su}&body=${bd}`,
  };
}

/**
 * Opens a mailto: link and detects whether a mail client actually handled it.
 * If the page is still focused/visible after a short delay, nothing opened —
 * `fallbackOpen` becomes true so the UI can offer web-mail alternatives.
 */
export function useEmailAction(to, timeout = 1200) {
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const [draft, setDraft] = useState({ subject: '', body: '' });
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const send = useCallback(
    ({ subject = '', body = '' } = {}) => {
      setDraft({ subject, body });
      const params = new URLSearchParams();
      if (subject) params.set('subject', subject);
      if (body) params.set('body', body);
      const qs = params.toString().replace(/\+/g, '%20');
      const href = `mailto:${to}${qs ? `?${qs}` : ''}`;

      const startedAt = Date.now();
      let handled = false;
      const markHandled = () => {
        handled = true;
      };
      window.addEventListener('blur', markHandled, { once: true });
      document.addEventListener('visibilitychange', markHandled, { once: true });

      window.location.href = href;

      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        window.removeEventListener('blur', markHandled);
        document.removeEventListener('visibilitychange', markHandled);
        const stillHere = !handled && document.hasFocus() && !document.hidden;
        // Also treat an unusually long tick as "handled" (OS dialog paused the page).
        if (stillHere && Date.now() - startedAt < timeout + 800) setFallbackOpen(true);
      }, timeout);
    },
    [to, timeout],
  );

  const close = useCallback(() => setFallbackOpen(false), []);

  return { send, fallbackOpen, close, links: webmailLinks(to, draft) };
}
