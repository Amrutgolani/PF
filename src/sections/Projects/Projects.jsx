import { useCallback, useState } from 'react';
import { Section, SectionHeading } from '../../components/AnimatedSection/AnimatedSection';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectModal from '../../components/ProjectCard/ProjectModal';
import { projects } from '../../data/projects';
import './Projects.css';

export default function Projects() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" ariaLabel="Featured projects">
      <SectionHeading
        eyebrow="Featured Projects" index="04"
        title="Backend Systems Built For Real Business Workflows."
        subtitle="Professional project work on real-time communication and business integration platforms, plus the training project where it started."
      />

      <div className="projects__featured">
        {featured.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
        ))}
      </div>

      {others.length > 0 && (
        <div className="projects__others">
          <h3 className="projects__others-title">
            <span className="eyebrow">Training Project</span>
          </h3>
          {others.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
          ))}
        </div>
      )}

      <ProjectModal project={active} onClose={close} />
    </Section>
  );
}
