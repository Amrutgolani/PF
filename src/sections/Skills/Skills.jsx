import { Section, SectionHeading } from '../../components/AnimatedSection/AnimatedSection';
import SkillCard from '../../components/SkillCard/SkillCard';
import { skillCategories } from '../../data/skills';

export default function Skills() {
  return (
    <Section id="skills" alt ariaLabel="Technical skills">
      <SectionHeading
        eyebrow="Technical Skills" index="03"
        title="Technologies I Work With."
        subtitle="A focused .NET-centred toolkit, grounded in the technologies I use in professional projects."
      />
      <div className="skills-grid">
        {skillCategories.map((cat, i) => (
          <SkillCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </Section>
  );
}
