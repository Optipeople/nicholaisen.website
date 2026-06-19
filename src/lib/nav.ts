export type NavLeaf = {
  title: string;
  href: string;
  description?: string;
  key?: string;
};

export type NavCategory = {
  title: string;
  href: string;
  description?: string;
  key?: string;
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
    key: "businessDevelopment",
    description: "Align direction, sequence investment, plan for growth.",
    items: [
      { title: "Framing Workshops", href: "/services/business-development/framing-workshops", key: "framingWorkshops", description: "Align direction and priorities." },
      { title: "Investment Advisory", href: "/services/business-development/investment-advisory", key: "investmentAdvisory", description: "Secure ROI before you invest." },
      { title: "Strategic Roadmapping", href: "/services/business-development/strategic-roadmapping", key: "strategicRoadmapping", description: "Plan capacity and growth." },
    ],
  },
  {
    title: "Production Optimization",
    href: "/services/production-optimization",
    key: "productionOptimization",
    description: "Throughput, quality, and uptime — without capex.",
    items: [
      { title: "Flow Optimization", href: "/services/production-optimization/flow-optimization", key: "flowOptimization", description: "Remove bottlenecks fast." },
      { title: "Capacity Improvement", href: "/services/production-optimization/capacity-improvement", key: "capacityImprovement", description: "Increase output without capex." },
      { title: "OEE & Efficiency", href: "/services/production-optimization/oee-efficiency", key: "oeeEfficiency", description: "Reduce waste and downtime." },
    ],
  },
  {
    title: "Project Solutions",
    href: "/services/project-solutions",
    key: "projectSolutions",
    description: "From a single line to a turnkey factory.",
    items: [
      { title: "Custom Production Lines", href: "/services/project-solutions/custom-production-lines", key: "customProductionLines", description: "Built for your business goals." },
      { title: "Automation & Integration", href: "/services/project-solutions/automation-integration", key: "automationIntegration", description: "Connect and scale operations." },
      { title: "Turnkey Projects", href: "/services/project-solutions/turnkey-projects", key: "turnkeyProjects", description: "From idea to execution." },
    ],
  },
  {
    title: "Digital Performance",
    href: "/services/digital-performance",
    key: "digitalPerformance",
    description: "Opti — real-time insight from the shop floor.",
    items: [
      { title: "Production Insights", href: "/services/digital-performance/production-insights", key: "productionInsights", description: "Real-time performance visibility." },
      { title: "Predictive Maintenance", href: "/services/digital-performance/predictive-maintenance", key: "predictiveMaintenance", description: "Prevent downtime before it happens." },
      { title: "Continuous Optimization", href: "/services/digital-performance/continuous-optimization", key: "continuousOptimization", description: "Improve performance over time." },
    ],
  },
  {
    title: "Partnership",
    href: "/services/partnership",
    key: "partnership",
    description: "A long-term efficiency partner.",
    items: [
      { title: "Capacity Planning", href: "/services/partnership/capacity-planning", key: "capacityPlanning", description: "Align strategy and investments." },
      { title: "Collaboration", href: "/services/partnership/collaboration", key: "collaboration", description: "Work with shared goals." },
      { title: "Business Development", href: "/services/partnership/business-development", key: "partnershipBd", description: "Strengthen competitiveness." },
    ],
  },
];

export const industries: NavLeaf[] = [
  { title: "Doors & Windows", href: "/industries/doors-windows", key: "doorsWindows", description: "Precision joinery at scale." },
  { title: "Panel & Furniture", href: "/industries/panel-furniture", key: "panelFurniture", description: "Sheet-good throughput and finish." },
  { title: "Solid Wood", href: "/industries/solid-wood", key: "solidWood", description: "Hardwood drying through to assembly." },
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
