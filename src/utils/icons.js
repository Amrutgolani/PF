import {
  BookOpen,
  Boxes,
  ClipboardList,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Lightbulb,
  MonitorSmartphone,
  Network,
  Plug,
  Radio,
  Server,
  Wrench,
  Sparkles,
} from 'lucide-react';

const icons = {
  BookOpen,
  Boxes,
  ClipboardList,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Lightbulb,
  MonitorSmartphone,
  Network,
  Plug,
  Radio,
  Server,
  Wrench,
  Sparkles,
};

/** Resolve a Lucide icon component by its name used in data files. */
export function getIcon(name) {
  return icons[name] || Sparkles;
}
