export type NavLeaf = {
  title: string;
  href: string;
  description?: string;
};

export type NavCategory = {
  title: string;
  href: string;
  description?: string;
  items: NavLeaf[];
};

export type NavSection = {
  title: string;
  href: string;
  categories?: NavCategory[];
  items?: NavLeaf[];
};

export const services: NavCategory[] = [
  {
    title: "Business Development",
    href: "/services/business-development",
    description: "Align direction, sequence investment, plan for growth.",
    items: [
      {
        title: "Framing Workshops",
        href: "/services/business-development/framing-workshops",
        description: "Align direction and priorities.",
      },
      {
        title: "Investment Advisory",
        href: "/services/business-development/investment-advisory",
        description: "Secure ROI before you invest.",
      },
      {
        title: "Strategic Roadmapping",
        href: "/services/business-development/strategic-roadmapping",
        description: "Plan capacity and growth.",
      },
    ],
  },
  {
    title: "Production Optimization",
    href: "/services/production-optimization",
    description: "Throughput, quality, and uptime — without capex.",
    items: [
      {
        title: "Flow Optimization",
        href: "/services/production-optimization/flow-optimization",
        description: "Remove bottlenecks fast.",
      },
      {
        title: "Capacity Improvement",
        href: "/services/production-optimization/capacity-improvement",
        description: "Increase output without capex.",
      },
      {
        title: "OEE & Efficiency",
        href: "/services/production-optimization/oee-efficiency",
        description: "Reduce waste and downtime.",
      },
    ],
  },
  {
    title: "Project Solutions",
    href: "/services/project-solutions",
    description: "From a single line to a turnkey factory.",
    items: [
      {
        title: "Custom Production Lines",
        href: "/services/project-solutions/custom-production-lines",
        description: "Built for your business goals.",
      },
      {
        title: "Automation & Integration",
        href: "/services/project-solutions/automation-integration",
        description: "Connect and scale operations.",
      },
      {
        title: "Turnkey Projects",
        href: "/services/project-solutions/turnkey-projects",
        description: "From idea to execution.",
      },
    ],
  },
  {
    title: "Digital Performance",
    href: "/services/digital-performance",
    description: "Opti — real-time insight from the shop floor.",
    items: [
      {
        title: "Production Insights",
        href: "/services/digital-performance/production-insights",
        description: "Real-time performance visibility.",
      },
      {
        title: "Predictive Maintenance",
        href: "/services/digital-performance/predictive-maintenance",
        description: "Prevent downtime before it happens.",
      },
      {
        title: "Continuous Optimization",
        href: "/services/digital-performance/continuous-optimization",
        description: "Improve performance over time.",
      },
    ],
  },
  {
    title: "Partnership",
    href: "/services/partnership",
    description: "A long-term efficiency partner.",
    items: [
      {
        title: "Capacity Planning",
        href: "/services/partnership/capacity-planning",
        description: "Align strategy and investments.",
      },
      {
        title: "Collaboration",
        href: "/services/partnership/collaboration",
        description: "Work with shared goals.",
      },
      {
        title: "Business Development",
        href: "/services/partnership/business-development",
        description: "Strengthen competitiveness.",
      },
    ],
  },
];

export const industries: NavLeaf[] = [
  {
    title: "Doors & Windows",
    href: "/industries/doors-windows",
    description: "Precision joinery at scale.",
  },
  {
    title: "Panel & Furniture",
    href: "/industries/panel-furniture",
    description: "Sheet-good throughput and finish.",
  },
  {
    title: "Solid Wood",
    href: "/industries/solid-wood",
    description: "Hardwood drying through to assembly.",
  },
];

export const primaryNav: NavSection[] = [
  { title: "Services", href: "/services", categories: services },
  { title: "Industries", href: "/industries", items: industries },
  { title: "Cases", href: "/cases" },
  { title: "Insights", href: "/insights" },
  { title: "About", href: "/about" },
];

export const footerNav = {
  Solutions: services.map(({ title, href }) => ({ title, href })),
  Industries: industries.map(({ title, href }) => ({ title, href })),
  Company: [
    { title: "About", href: "/about" },
    { title: "Cases", href: "/cases" },
    { title: "Insights", href: "/insights" },
    { title: "Contact", href: "/contact" },
  ],
  Legal: [
    { title: "Privacy", href: "/legal/privacy" },
    { title: "Cookies", href: "/legal/cookies" },
  ],
};
