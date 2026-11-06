import { motion, useReducedMotion } from 'framer-motion';
import { Bell, Boxes, Package, ShieldCheck, Sparkles, Store, Users } from 'lucide-react';
import './ProjectMockup.css';

/* ------------------------------------------------------------------------ */
/* Astrology: live session + real-time notification                          */
/* ------------------------------------------------------------------------ */
function AstrologyMockup({ reduce }) {
  const astrologers = [
    { n: 'R. Sharma', s: 'Online', on: true },
    { n: 'M. Desai', s: 'In session', on: true },
    { n: 'K. Patel', s: 'Offline', on: false },
  ];
  return (
    <div className="mk mk--astro">
      <div className="mk-astro__side">
        <div className="mk-astro__side-head">
          <Users size={12} />
          <span>Astrologers</span>
        </div>
        {astrologers.map((a) => (
          <div className="mk-astro__person" key={a.n}>
            <span className="mk-avatar" />
            <div>
              <span className="mk-astro__name">{a.n}</span>
              <span className={`mk-astro__status ${a.on ? 'is-on' : ''}`}>{a.s}</span>
            </div>
          </div>
        ))}
        <div className="mk-astro__side-head mk-astro__side-head--mt">
          <Bell size={12} />
          <span>Notifications</span>
        </div>
        <div className="mk-astro__notif">
          <span className="mk-astro__notif-dot" />
          <span>Session #AS-2041 started</span>
        </div>
        <div className="mk-astro__notif">
          <span className="mk-astro__notif-dot" />
          <span>Payment confirmed</span>
        </div>
      </div>
      <div className="mk-astro__chat">
        <div className="mk-astro__chat-head">
          <span className="mk-avatar mk-avatar--sm" />
          <span>Live session · #AS-2041</span>
          <span className="mk-pill mk-pill--green">SignalR connected</span>
        </div>
        <div className="mk-astro__bubbles">
          <span className="mk-bubble mk-bubble--in" />
          <span className="mk-bubble mk-bubble--out" />
          <span className="mk-bubble mk-bubble--in mk-bubble--long" />
          <span className="mk-bubble mk-bubble--out mk-bubble--short" />
          <span className="mk-bubble mk-bubble--in mk-bubble--short" />
          <span className="mk-bubble mk-bubble--out" />
        </div>
        <div className="mk-astro__composer">
          <span>Type a message…</span>
          <span className="mk-astro__send" />
        </div>
        <motion.div
          className="mk-toast"
          initial={{ opacity: 0, y: 10 }}
          animate={reduce ? { opacity: 1, y: 0 } : { opacity: [0, 1, 1, 0], y: [10, 0, 0, -6] }}
          transition={reduce ? {} : { duration: 4.5, times: [0, 0.12, 0.85, 1], repeat: Infinity, repeatDelay: 1.5 }}
        >
          <Bell size={12} />
          <div>
            <strong>New consultation request</strong>
            <span>Pushed via NotificationHub · MongoDB saved</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Voyado: integration flow                                                   */
/* ------------------------------------------------------------------------ */
function VoyadoMockup({ reduce }) {
  const logs = [
    ['Shopify', 'orders/sync', 'OK'],
    ['DynamoDB', 'PutItem · customers', 'OK'],
    ['Elevate', 'push · product feed', 'OK'],
    ['MVC', 'controller → api', 'OK'],
    ['Shopify', 'customers/sync', 'OK'],
    ['DynamoDB', 'Query · orders by date', 'OK'],
  ];
  const nodes = [
    { label: 'Shopify', icon: Store },
    { label: 'ASP.NET MVC', icon: Boxes },
    { label: 'DynamoDB', icon: Package },
    { label: 'Voyado Elevate', icon: Sparkles },
  ];
  return (
    <div className="mk mk--voyado">
      <div className="mk-voyado__flow">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div className="mk-voyado__node-wrap" key={node.label}>
              <div className={`mk-voyado__node ${i === 1 ? 'is-core' : ''}`}>
                <Icon size={13} />
                <span>{node.label}</span>
              </div>
              {i < nodes.length - 1 && (
                <span className="mk-voyado__link">
                  {!reduce && (
                    <motion.span
                      className="mk-voyado__packet"
                      animate={{ x: ['0%', '100%'] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: i * 0.45 }}
                    />
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mk-voyado__log">
        <div className="mk-voyado__log-head">
          <span>Integration log</span>
          <span className="mk-pill mk-pill--blue">DynamoDB · eu-west</span>
        </div>
        {logs.map((l, i) => (
          <motion.div
            className="mk-voyado__row"
            key={l[1]}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span className="mk-voyado__src">{l[0]}</span>
            <span className="mk-voyado__msg">{l[1]}</span>
            <span className="mk-voyado__ok">{l[2]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Inventory: admin table                                                     */
/* ------------------------------------------------------------------------ */
function InventoryMockup() {
  const rows = [
    ['SKU-1042', 'Wireless Mouse', 128, 0.8],
    ['SKU-2210', 'USB-C Hub', 36, 0.3],
    ['SKU-3380', 'Mechanical Keyboard', 72, 0.55],
    ['SKU-4007', '27" Monitor', 12, 0.12],
  ];
  return (
    <div className="mk mk--inv">
      <div className="mk-inv__side">
        <span className="mk-inv__brand">Inventory</span>
        {['Dashboard', 'Items', 'Stock', 'Users'].map((n, i) => (
          <span className={`mk-inv__nav ${i === 1 ? 'is-active' : ''}`} key={n}>
            {n}
          </span>
        ))}
        <span className="mk-pill mk-pill--blue mk-inv__role">
          <ShieldCheck size={11} /> Admin
        </span>
      </div>
      <div className="mk-inv__main">
        <div className="mk-inv__head">
          <span>Items · 4 of 184</span>
          <span className="mk-inv__btn">+ Add item</span>
        </div>
        <div className="mk-inv__stats">
          <div>
            <span>Total items</span>
            <strong>184</strong>
          </div>
          <div>
            <span>Low stock</span>
            <strong className="is-warn">7</strong>
          </div>
          <div>
            <span>Categories</span>
            <strong>12</strong>
          </div>
        </div>
        <div className="mk-inv__table">
          <div className="mk-inv__tr mk-inv__tr--head">
            <span>SKU</span>
            <span>Product</span>
            <span>Qty</span>
            <span>Level</span>
          </div>
          {rows.map((r) => (
            <div className="mk-inv__tr" key={r[0]}>
              <span className="mk-inv__sku">{r[0]}</span>
              <span>{r[1]}</span>
              <span>{r[2]}</span>
              <span className="mk-inv__bar">
                <motion.i
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: r[3] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className={r[3] < 0.2 ? 'is-low' : ''}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VARIANTS = {
  astrology: AstrologyMockup,
  voyado: VoyadoMockup,
  inventory: InventoryMockup,
};

/** Custom UI preview for a project, rendered inside a browser-like frame. */
export default function ProjectMockup({ variant, title }) {
  const reduce = useReducedMotion();
  const Component = VARIANTS[variant] || InventoryMockup;
  return (
    <div className="mockup-frame" role="img" aria-label={`${title} interface preview`}>
      <div className="mockup-frame__bar">
        <span className="mockup-frame__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="mockup-frame__url mono">localhost:5001 / {variant}</span>
      </div>
      <div className="mockup-frame__body">
        <Component reduce={reduce} />
      </div>
    </div>
  );
}
