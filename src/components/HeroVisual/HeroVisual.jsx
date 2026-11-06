import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Database, Radio, Server, Smartphone } from 'lucide-react';
import './HeroVisual.css';

const CODE_LINES = [
  [
    { t: '[ApiController]', c: 'attr' },
  ],
  [
    { t: '[Route(', c: 'attr' },
    { t: '"api/[controller]"', c: 'str' },
    { t: ')]', c: 'attr' },
  ],
  [
    { t: 'public class ', c: 'kw' },
    { t: 'NotificationsController', c: 'type' },
    { t: ' : ', c: 'plain' },
    { t: 'ControllerBase', c: 'type' },
  ],
  [{ t: '{', c: 'plain' }],
  [
    { t: '  private readonly ', c: 'kw' },
    { t: 'IHubContext', c: 'type' },
    { t: '<', c: 'plain' },
    { t: 'NotificationHub', c: 'type' },
    { t: '> _hub;', c: 'plain' },
  ],
  [
    { t: '  private readonly ', c: 'kw' },
    { t: 'IMongoCollection', c: 'type' },
    { t: '<', c: 'plain' },
    { t: 'Session', c: 'type' },
    { t: '> _sessions;', c: 'plain' },
  ],
  [{ t: '', c: 'plain' }],
  [
    { t: '  [HttpPost(', c: 'attr' },
    { t: '"notify"', c: 'str' },
    { t: ')]', c: 'attr' },
  ],
  [
    { t: '  public async ', c: 'kw' },
    { t: 'Task', c: 'type' },
    { t: '<', c: 'plain' },
    { t: 'IActionResult', c: 'type' },
    { t: '> ', c: 'plain' },
    { t: 'Notify', c: 'fn' },
    { t: '(', c: 'plain' },
    { t: 'NotifyRequest', c: 'type' },
    { t: ' req)', c: 'plain' },
  ],
  [{ t: '  {', c: 'plain' }],
  [
    { t: '    await ', c: 'kw' },
    { t: '_sessions.', c: 'plain' },
    { t: 'InsertOneAsync', c: 'fn' },
    { t: '(req.ToSession());', c: 'plain' },
  ],
  [
    { t: '    await ', c: 'kw' },
    { t: '_hub.Clients.User(req.UserId)', c: 'plain' },
  ],
  [
    { t: '          .', c: 'plain' },
    { t: 'SendAsync', c: 'fn' },
    { t: '(', c: 'plain' },
    { t: '"ReceiveNotification"', c: 'str' },
    { t: ', req);', c: 'plain' },
  ],
  [
    { t: '    return ', c: 'kw' },
    { t: 'Ok', c: 'fn' },
    { t: '();', c: 'plain' },
  ],
  [{ t: '  }', c: 'plain' }],
  [{ t: '}', c: 'plain' }],
];

const CHIPS = [
  { label: 'C#', style: { top: '2%', left: '1%' }, delay: 0 },
  { label: 'ASP.NET Core', style: { top: '-2%', right: '10%' }, delay: 1.1 },
  { label: 'REST API', style: { top: '24%', right: '-2%' }, delay: 1.6 },
  { label: 'SignalR', style: { top: '46%', right: '-3%' }, delay: 0.5 },
  { label: 'DynamoDB', style: { bottom: '9%', left: '60%' }, delay: 0.8, mobileHidden: true },
];

const REQUESTS = [
  { m: 'POST', p: '/api/notifications/notify', s: 200, ms: 38 },
  { m: 'GET', p: '/api/astrologers?online=true', s: 200, ms: 24 },
  { m: 'GET', p: '/api/orders/shopify/sync', s: 200, ms: 112 },
  { m: 'PUT', p: '/api/sessions/{id}', s: 204, ms: 31 },
];

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 2 + ((i * 7) % 3),
  dur: 9 + ((i * 3) % 7),
  delay: (i % 5) * -1.8,
}));

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(reduce ? CODE_LINES.length : 0);
  const [reqIndex, setReqIndex] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    if (visibleLines >= CODE_LINES.length) return undefined;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), visibleLines === 0 ? 900 : 140);
    return () => clearTimeout(t);
  }, [visibleLines, reduce]);

  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setReqIndex((i) => (i + 1) % REQUESTS.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);

  const requests = useMemo(() => {
    const list = [];
    for (let i = 0; i < 3; i += 1) list.push(REQUESTS[(reqIndex + i) % REQUESTS.length]);
    return list;
  }, [reqIndex]);

  const floatY = reduce ? {} : { y: [0, -8, 0] };
  const floatT = (delay = 0) => (reduce ? {} : { y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay } });

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-visual__glow" />
      <div className="hero-visual__grid bg-grid" />

      {!reduce &&
        PARTICLES.map((p) => (
          <span
            key={p.id}
            className="hero-visual__particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

      {/* Architecture connection lines */}
      <svg className="hero-visual__lines" viewBox="0 0 520 520" fill="none">
        <defs>
          <linearGradient id="hv-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path id="hv-path-1" d="M 60 470 C 150 470, 170 380, 260 360" stroke="var(--border-strong)" strokeDasharray="4 6" />
        <path id="hv-path-2" d="M 260 360 C 360 340, 400 300, 470 250" stroke="var(--border-strong)" strokeDasharray="4 6" />
        {!reduce && (
          <>
            <circle r="3.5" fill="var(--accent)">
              <animateMotion dur="2.6s" repeatCount="indefinite">
                <mpath href="#hv-path-1" />
              </animateMotion>
            </circle>
            <circle r="3.5" fill="var(--accent)">
              <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite">
                <mpath href="#hv-path-2" />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>

      {/* Code window */}
      <motion.div
        className="code-window"
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <div className="code-window__bar">
          <span className="code-window__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="code-window__file mono">NotificationsController.cs</span>
          <span className="code-window__lang mono">C#</span>
        </div>
        <pre className="code-window__body mono">
          {CODE_LINES.slice(0, visibleLines).map((line, i) => (
            <div className="code-line" key={i}>
              <span className="code-line__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="code-line__content">
                {line.map((tok, j) => (
                  <span key={j} className={`tok tok--${tok.c}`}>
                    {tok.t}
                  </span>
                ))}
                {i === visibleLines - 1 && visibleLines < CODE_LINES.length && <span className="code-cursor" />}
              </span>
            </div>
          ))}
          {visibleLines >= CODE_LINES.length && (
            <div className="code-line">
              <span className="code-line__num">{String(CODE_LINES.length + 1).padStart(2, '0')}</span>
              <span className="code-line__content">
                <span className="code-cursor" />
              </span>
            </div>
          )}
        </pre>
      </motion.div>

      {/* API traffic panel */}
      <motion.div
        className="api-panel"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0, ...floatY }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9, ...floatT(0.6) }}
      >
        <div className="api-panel__head">
          <Server size={14} />
          <span className="mono">Web API · live requests</span>
          <span className="api-panel__pulse" />
        </div>
        <ul className="api-panel__list mono">
          {requests.map((r) => (
            <motion.li
              key={r.p}
              layout
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`api-method api-method--${r.m.toLowerCase()}`}>{r.m}</span>
              <span className="api-path">{r.p}</span>
              <span className="api-status">{r.s}</span>
              <span className="api-ms">{r.ms}ms</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Database stack */}
      <motion.div
        className="db-stack"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, ...(reduce ? { y: 0 } : floatY) }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1, ...floatT(1.4) }}
      >
        <div className="db-stack__cyl">
          <span className="db-stack__disc" />
          <span className="db-stack__disc" />
          <span className="db-stack__disc" />
        </div>
        <div className="db-stack__label">
          <Database size={13} />
          <span className="mono">MongoDB · SQL Server</span>
        </div>
      </motion.div>

      {/* Realtime badge */}
      <motion.div
        className="rt-badge"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, ...floatY }}
        transition={{ duration: 0.6, delay: 1.4, ...floatT(2) }}
      >
        <span className="rt-badge__icon">
          <Radio size={14} />
        </span>
        <div>
          <span className="rt-badge__title">SignalR Hub</span>
          <span className="rt-badge__sub mono">ReceiveNotification → client</span>
        </div>
        <Smartphone size={14} className="rt-badge__device" />
      </motion.div>

      {/* Floating chips */}
      {CHIPS.map((chip, i) => (
        <motion.span
          key={chip.label}
          className={`hero-chip mono ${chip.mobileHidden ? 'hero-chip--mobile-hidden' : ''}`}
          style={chip.style}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 + i * 0.12 }}
        >
          <motion.span
            className="d-inline-flex"
            animate={floatY}
            transition={reduce ? {} : { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
          >
            {chip.label}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}
