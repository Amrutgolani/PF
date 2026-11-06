import {
  Blocks,
  Boxes,
  Braces,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Github,
  Globe,
  Layers,
  LayoutTemplate,
  MonitorCog,
  Network,
  Palette,
  Radio,
  Send,
  Server,
  Table2,
  Terminal,
  Workflow,
} from 'lucide-react';
import './TechIcon.css';

/**
 * Consistent, trademark-free technology icons. Each entry is either a
 * monogram (short text mark) or a Lucide glyph, plus an accent hue so the
 * set reads like a designed icon family rather than a list of logos.
 */
const TECH = {
  'C#': { mono: 'C#', hue: 268 },
  'ASP.NET Core': { mono: '.NET', hue: 262 },
  'ASP.NET MVC': { icon: LayoutTemplate, hue: 250 },
  'ASP.NET Web API': { icon: Network, hue: 205 },
  'Web API': { icon: Network, hue: 205 },
  'ADO.NET': { icon: Table2, hue: 230 },
  'Object-Oriented Programming': { icon: Blocks, hue: 215 },
  'REST API Development': { icon: Workflow, hue: 195 },
  'REST APIs': { icon: Workflow, hue: 195 },
  SignalR: { icon: Radio, hue: 185 },
  HTML5: { mono: 'H5', hue: 18 },
  CSS3: { icon: Palette, hue: 212 },
  Bootstrap: { mono: 'B', hue: 266 },
  JavaScript: { mono: 'JS', hue: 48 },
  TypeScript: { mono: 'TS', hue: 211 },
  AJAX: { icon: Globe, hue: 160 },
  jQuery: { mono: 'jQ', hue: 206 },
  MongoDB: { icon: Database, hue: 142 },
  DynamoDB: { icon: Boxes, hue: 215 },
  'Amazon DynamoDB': { icon: Boxes, hue: 215 },
  'SQL Server': { icon: Server, hue: 0 },
  MySQL: { icon: Database, hue: 200 },
  Git: { icon: GitBranch, hue: 14 },
  GitHub: { icon: Github, hue: 220 },
  'Visual Studio': { icon: MonitorCog, hue: 262 },
  Postman: { icon: Send, hue: 22 },
  '.NET Core': { mono: '.NET', hue: 262 },
  'ASP.NET Identity': { icon: Layers, hue: 250 },
  Shopify: { icon: Braces, hue: 120 },
  'Voyado Elevate': { icon: Code2, hue: 330 },
};

export default function TechIcon({ name, size = 'md', className = '' }) {
  const def = TECH[name] || { icon: FileCode2, hue: 210 };
  const Icon = def.icon || Terminal;
  const style = { '--tech-hue': def.hue };
  return (
    <span className={`tech-icon tech-icon--${size} ${className}`.trim()} style={style} aria-hidden="true">
      {def.mono ? <span className="tech-icon__mono">{def.mono}</span> : <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 17} />}
    </span>
  );
}
