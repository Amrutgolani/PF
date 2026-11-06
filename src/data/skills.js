/**
 * Skill categories. `icon` refers to a Lucide icon name resolved in SkillCard.
 * No proficiency percentages — only the technologies listed in the CV.
 */
export const skillCategories = [
  {
    id: 'backend',
    title: 'Backend Development',
    icon: 'Server',
    size: 'large',
    description:
      'Core of my day-to-day work — designing and implementing APIs, services, and business logic on the .NET platform.',
    skills: [
      { name: 'C#', note: 'Primary language' },
      { name: 'ASP.NET Core', note: 'Web APIs' },
      { name: 'ASP.NET MVC', note: 'Server views' },
      { name: 'ASP.NET Web API', note: 'RESTful endpoints' },
      { name: 'ADO.NET', note: 'Data access' },
      { name: 'Object-Oriented Programming', note: 'Design principles' },
      { name: 'REST API Development', note: 'Endpoint design' },
      { name: 'SignalR', note: 'Real-time hubs' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'MonitorSmartphone',
    size: 'medium',
    description: 'Building responsive views and interactive UI that connect to backend APIs.',
    skills: [
      { name: 'HTML5', note: 'Semantic markup' },
      { name: 'CSS3', note: 'Responsive styling' },
      { name: 'Bootstrap', note: 'UI framework' },
      { name: 'JavaScript', note: 'ES6+' },
      { name: 'TypeScript', note: 'Typed JavaScript' },
      { name: 'AJAX', note: 'Async requests' },
      { name: 'jQuery', note: 'DOM & AJAX helpers' },
    ],
  },
  {
    id: 'database',
    title: 'Database Technologies',
    icon: 'Database',
    size: 'medium',
    description: 'Relational and NoSQL stores used for structured and unstructured application data.',
    skills: [
      { name: 'MongoDB', note: 'Document store' },
      { name: 'DynamoDB', note: 'AWS NoSQL' },
      { name: 'SQL Server', note: 'Relational DB' },
      { name: 'MySQL', note: 'Relational DB' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    icon: 'Wrench',
    size: 'large',
    description: 'Everyday tooling for development, versioning, and API testing.',
    skills: [
      { name: 'Git', note: 'Version control' },
      { name: 'GitHub', note: 'Collaboration' },
      { name: 'Visual Studio', note: 'Primary IDE' },
      { name: 'Postman', note: 'API testing' },
    ],
  },
];
