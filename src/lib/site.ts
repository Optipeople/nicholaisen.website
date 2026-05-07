export const site = {
  name: "Nicholaisen",
  legalName: "Nicholaisen A/S",
  tagline: "Engineered precision, told quietly.",
  valueProp: "Optimizing wood production from strategy to shop floor.",
  description:
    "Nicholaisen provides sales, engineering and consulting of innovative machine solutions and service concepts for the wood, plastics and aluminum industries.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nicholaisen.dk",
  email: "info@nicholaisen.dk",
  phone: "+45 8692 4711",
  address: {
    street: "Sønderskovvej 17",
    postal: "8362",
    city: "Hørning",
    country: "Denmark",
  },
  cvr: "19454770",
  social: {
    linkedin: "https://www.linkedin.com/company/nicholaisen-as",
  },
} as const;

export type Site = typeof site;
