import { Award, CalendarDays, GraduationCap } from 'lucide-react';
import { Section, SectionHeading } from '../../components/AnimatedSection/AnimatedSection';
import Timeline from '../../components/Timeline/Timeline';
import { education } from '../../data/education';
import './Education.css';

export default function Education() {
  return (
    <Section id="education" alt ariaLabel="Education">
      <div className="row gy-5">
        <div className="col-12 col-lg-5">
          <SectionHeading
            eyebrow="Education" index="05"
            title="Academic Background."
            subtitle="A computer applications foundation — BCA followed by MCA — that supports my day-to-day engineering work."
          />
        </div>
        <div className="col-12 col-lg-7">
          <Timeline
            items={education.map((e, i) => ({ ...e, markerClass: i === 0 ? '' : 'timeline__marker--muted' }))}
            renderItem={(e) => (
              <article className="edu card-base">
                <div className="edu__icon">
                  <GraduationCap size={20} />
                </div>
                <div className="edu__body">
                  <div className="edu__top">
                    <span className="edu__short mono">{e.short}</span>
                    <span className={`edu__status ${e.status === 'Pursuing' ? 'is-current' : ''}`}>{e.status}</span>
                  </div>
                  <h3 className="edu__degree">{e.degree}</h3>
                  <p className="edu__institute">{e.institute}</p>
                  <div className="edu__meta">
                    <span>
                      <CalendarDays size={14} /> {e.duration}
                    </span>
                    <span className="edu__cgpa">
                      <Award size={14} /> CGPA <b>{e.cgpa}</b>
                    </span>
                  </div>
                </div>
              </article>
            )}
          />
        </div>
      </div>
    </Section>
  );
}
