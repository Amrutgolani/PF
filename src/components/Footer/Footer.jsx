import { ArrowUp, Linkedin, Mail } from 'lucide-react';
import { personal } from '../../data/personal';
import { navLinks } from '../../data/navigation';
import { scrollToSection, scrollToTop } from '../../utils/helpers';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (e, id) => {
    e.preventDefault();
    if (id === 'home') scrollToTop();
    else scrollToSection(id);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="footer__logo" onClick={(e) => handleNav(e, 'home')}>
              A<span>G</span>
            </a>
            <p className="footer__tagline">Building reliable software. Creating meaningful digital experiences.</p>
            <div className="footer__social">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="footer__social-link"
              >
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${personal.email}`} aria-label="Send email" className="footer__social-link">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <h3 className="footer__heading">Navigate</h3>
            <ul role="list">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={(e) => handleNav(e, l.id)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__contact">
            <h3 className="footer__heading">Contact</h3>
            <ul role="list">
              <li>
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
              </li>
              <li>
                <a href={personal.phoneHref}>{personal.phone}</a>
              </li>
              <li>
                <span>{personal.location}</span>
              </li>
              <li>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} Amrut Golani. Designed &amp; Developed by <strong>Amrut Golani</strong>.
          </p>
          <button type="button" className="footer__top-btn" onClick={scrollToTop}>
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
