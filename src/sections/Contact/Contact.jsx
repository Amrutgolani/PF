import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check, Copy, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Section, SectionHeading, Reveal } from '../../components/AnimatedSection/AnimatedSection';
import Button from '../../components/Buttons/Button';
import EmailFallback from '../../components/EmailFallback/EmailFallback';
import { personal } from '../../data/personal';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { useEmailAction } from '../../hooks/useEmailAction';
import { fadeUp, viewportOnce } from '../../utils/motion';
import './Contact.css';

// Optional email integration (e.g. Formspree / Getform). When not configured the
// form falls back to opening the visitor's email client — no fake "sent" state.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '';

const INITIAL = { name: '', email: '', subject: '', message: '', company: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Please add a subject.';
  if (values.message.trim().length < 10) errors.message = 'Please write at least 10 characters.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const { copied, copy } = useCopyToClipboard();
  const quickEmail = useEmailAction(personal.email);
  const formEmail = useEmailAction(personal.email);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.company) return; // honeypot
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (!ENDPOINT) {
      formEmail.send({
        subject: values.subject || `Portfolio enquiry from ${values.name}`,
        body: `${values.message}\n\n— ${values.name}\n${values.email}`,
      });
      setStatus({
        type: 'info',
        message: `Your email app should open with the message pre-filled. If it didn't, use the options below or write to ${personal.email} directly.`,
      });
      return;
    }

    try {
      setStatus({ type: 'loading', message: 'Sending…' });
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus({ type: 'success', message: 'Thanks — your message has been sent. I will reply soon.' });
      setValues(INITIAL);
    } catch {
      setStatus({
        type: 'error',
        message: `Something went wrong while sending. Please email me directly at ${personal.email}.`,
      });
    }
  };

  const details = [
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: 'Phone', value: personal.phone, href: personal.phoneHref },
    { icon: MapPin, label: 'Location', value: personal.location },
    { icon: Linkedin, label: 'LinkedIn', value: 'amrut-golani-b84130226', href: personal.linkedin, external: true },
  ];

  return (
    <Section id="contact" ariaLabel="Contact">
      <div className="row gy-5">
        <div className="col-12 col-lg-5">
          <SectionHeading
            eyebrow="Contact" index="08"
            title="Let's Build Something Meaningful Together."
            subtitle="I'm interested in connecting with developers, engineering teams, and organizations working on meaningful software products and challenging technical problems."
          />

          <motion.ul
            className="contact__details"
            role="list"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            <motion.li className="contact__detail" variants={fadeUp}>
              <span className="contact__detail-icon">
                <span className="contact__initials">{personal.initials}</span>
              </span>
              <div>
                <span className="contact__detail-label">Name</span>
                <span className="contact__detail-value">{personal.name}</span>
              </div>
            </motion.li>
            {details.map((d) => {
              const Icon = d.icon;
              return (
                <motion.li className="contact__detail" key={d.label} variants={fadeUp}>
                  <span className="contact__detail-icon">
                    <Icon size={17} />
                  </span>
                  <div className="contact__detail-text">
                    <span className="contact__detail-label">{d.label}</span>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="contact__detail-value"
                        target={d.external ? '_blank' : undefined}
                        rel={d.external ? 'noopener noreferrer' : undefined}
                      >
                        {d.value}
                      </a>
                    ) : (
                      <span className="contact__detail-value">{d.value}</span>
                    )}
                  </div>
                  {d.label === 'Email' && (
                    <button
                      type="button"
                      className={`contact__copy ${copied ? 'is-copied' : ''}`}
                      onClick={() => copy(personal.email)}
                      aria-label={copied ? 'Email copied' : 'Copy email address'}
                      title={copied ? 'Copied!' : 'Copy email'}
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>

          <Reveal className="contact__quick" delay={3}>
            <Button variant="secondary" icon={Mail} onClick={() => quickEmail.send()}>
              Email Me
            </Button>
            <Button href={personal.linkedin} target="_blank" rel="noopener noreferrer" variant="ghost" icon={Linkedin}>
              LinkedIn Profile
            </Button>
          </Reveal>
          <EmailFallback
            open={quickEmail.fallbackOpen}
            onClose={quickEmail.close}
            email={personal.email}
            links={quickEmail.links}
          />
        </div>

        <div className="col-12 col-lg-7">
          <Reveal className="contact__form-wrap card-base" delay={1}>
            <form className="contact__form" onSubmit={onSubmit} noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="cf-name" className="form-label">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Your name"
                    value={values.name}
                    onChange={onChange}
                    autoComplete="name"
                    required
                  />
                  {errors.name && <div className="contact__error">{errors.name}</div>}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="cf-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={onChange}
                    autoComplete="email"
                    required
                  />
                  {errors.email && <div className="contact__error">{errors.email}</div>}
                </div>
                <div className="col-12">
                  <label htmlFor="cf-subject" className="form-label">
                    Subject
                  </label>
                  <input
                    id="cf-subject"
                    name="subject"
                    className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                    placeholder=".NET developer role / project collaboration"
                    value={values.subject}
                    onChange={onChange}
                    required
                  />
                  {errors.subject && <div className="contact__error">{errors.subject}</div>}
                </div>
                <div className="col-12">
                  <label htmlFor="cf-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={6}
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    placeholder="Tell me about the role, team, or problem you're working on."
                    value={values.message}
                    onChange={onChange}
                    required
                  />
                  {errors.message && <div className="contact__error">{errors.message}</div>}
                </div>

                {/* Honeypot — hidden from users, catches naive bots */}
                <div className="contact__hp" aria-hidden="true">
                  <label htmlFor="cf-company">Company</label>
                  <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} />
                </div>

                <div className="col-12 contact__submit">
                  <Button type="submit" variant="primary" size="lg" icon={Send} disabled={status.type === 'loading'}>
                    {status.type === 'loading' ? 'Sending…' : 'Send Message'}
                  </Button>
                  <span className="contact__hint mono">
                    {ENDPOINT ? 'Delivered securely to my inbox.' : 'Opens your email app with the message pre-filled.'}
                  </span>
                </div>

                {status.type !== 'idle' && status.type !== 'loading' && (
                  <div className="col-12">
                    <div className={`contact__status contact__status--${status.type}`} role="status" aria-live="polite">
                      {status.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                      <span>{status.message}</span>
                    </div>
                    <EmailFallback
                      open={formEmail.fallbackOpen}
                      onClose={formEmail.close}
                      email={personal.email}
                      links={formEmail.links}
                    />
                  </div>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
