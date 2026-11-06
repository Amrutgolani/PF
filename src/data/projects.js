/**
 * Featured projects. No GitHub or live URLs are included because none exist
 * publicly for these projects. `mockup` selects a custom UI preview variant.
 */
export const projects = [
  {
    id: 'astrology',
    index: '01',
    name: 'Astrology Platform',
    category: 'Real-Time Communication Platform',
    featured: true,
    context: 'Professional project · Alvi Software Pvt Ltd',
    mockup: 'astrology',
    description:
      'A web-based astrology platform involving backend development, API integrations, database management, and real-time communication between users and astrologers.',
    highlight:
      'Developing backend services and real-time communication functionality to support an interactive astrology platform.',
    technologies: ['ASP.NET Core', 'Web API', 'C#', 'SignalR', 'MongoDB', 'REST APIs'],
    contribution: [
      'Developed and integrated multiple RESTful APIs for platform features.',
      'Implemented real-time notification delivery using SignalR hubs.',
      'Designed MongoDB storage and retrieval for unstructured data.',
      'Implemented backend business logic and optimized API workflows.',
    ],
    functionalities: [
      'RESTful API development',
      'ASP.NET Core backend development',
      'Real-time notifications using SignalR',
      'MongoDB integration',
      'Backend business logic',
      'API workflow optimization',
      'Data storage and retrieval',
      'Integration of application features',
    ],
  },
  {
    id: 'voyado',
    index: '02',
    name: 'Voyado (MVC)',
    category: 'Business Integration & Backend Application',
    featured: true,
    context: 'Professional project · Alvi Software Pvt Ltd',
    mockup: 'voyado',
    description:
      'A business-oriented application involving ASP.NET MVC development, database integration, external platform communication, and backend workflow management.',
    highlight:
      'Building backend workflows and integrating external business platforms through reliable API and database integrations.',
    technologies: ['ASP.NET MVC', 'C#', 'Web API', 'Amazon DynamoDB', 'Shopify', 'Voyado Elevate'],
    contribution: [
      'Developed and exposed custom APIs consumed by MVC controllers.',
      'Integrated Amazon DynamoDB for application data storage.',
      'Built Shopify and Voyado Elevate data integration workflows.',
      'Processed and transformed retrieved business data; troubleshot API and integration issues.',
    ],
    functionalities: [
      'ASP.NET MVC development',
      'Custom API development',
      'Amazon DynamoDB integration',
      'Shopify data integration',
      'External platform integrations',
      'Data processing and transformation',
      'Backend business logic',
      'API troubleshooting',
      'Voyado Elevate integration',
    ],
  },
  {
    id: 'inventory',
    index: '03',
    name: 'Inventory Management System',
    category: 'Inventory & Business Management',
    featured: false,
    context: 'Training project · Omex Info Tech',
    mockup: 'inventory',
    description:
      'A full-featured inventory management application developed during training using ASP.NET MVC and ADO.NET, with additional .NET Core and Web API integration.',
    highlight:
      'Developed a business-oriented inventory management application with product tracking, authentication, and database-driven workflows.',
    technologies: ['ASP.NET MVC', 'ADO.NET', '.NET Core', 'Web API', 'ASP.NET Identity', 'SQL Server'],
    contribution: [
      'Built item and product management modules with full CRUD operations.',
      'Developed stock tracking and inventory monitoring features.',
      'Implemented authentication and role-based access control with ASP.NET Identity.',
      'Extended the MVC application with .NET Core Web API integration.',
    ],
    functionalities: [
      'Item management',
      'Product creation and updating',
      'Stock tracking',
      'Inventory monitoring',
      'CRUD operations',
      'User authentication',
      'Role-based access control',
      'Database operations',
    ],
  },
];
