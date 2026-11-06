import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="nf" id="main">
      <div className="nf__grid bg-grid" aria-hidden="true" />
      <motion.div
        className="nf__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <pre className="nf__code mono" aria-hidden="true">
          {`HTTP/1.1 404 Not Found
Content-Type: application/problem+json

{ "title": "Route not found", "status": 404 }`}
        </pre>
        <h1 className="nf__title">This page doesn&apos;t exist.</h1>
        <p className="nf__text">The endpoint you requested returned 404. Let&apos;s route you back to the portfolio.</p>
        <div className="nf__actions">
          <Link to="/" className="btn-ag btn-ag--primary btn-ag--md">
            <Home size={18} aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          <button type="button" className="btn-ag btn-ag--ghost btn-ag--md" onClick={() => window.history.back()}>
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}
