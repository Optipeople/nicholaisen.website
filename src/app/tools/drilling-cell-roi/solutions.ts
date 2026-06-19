/**
 * ROI Calculator — Solution Variants
 *
 * Add one entry per løsningsforslag i SOLUTIONS-arrayet.
 * Hvert produkt-id matcher id-feltet i products.ts.
 * processingTimeSec: maskintid i sekunder pr. emne (0 = produktet bearbejdes ikke i denne løsning).
 *
 * automationOptions: valgfrie tilkøb der forbedrer OEE og/eller reducerer operatørbehov.
 * Hvert option summeres til investering og OEE, når kunden vælger det i trin 3.
 */

export type AutomationOption = {
  /** Kort navn vist i UI */
  name: string;
  /** Beskrivelse vist under navnet */
  description: string;
  /** Merpris i EUR */
  priceEur: number;
  /** OEE-forbedring i procentpoint (f.eks. 8 = +8 pp) */
  oeeBoostPct: number;
  /** Reduktion i antal operatører (f.eks. 0.5 = halvt årsværk) */
  operatorReduction: number;
};

export type SolutionVariant = {
  /** Løsningens navn, f.eks. "Drilling Cell Standard" */
  name: string;

  /** Kort beskrivelse vist i trin 3 — hvad kendetegner løsningen */
  description: string;

  /** Forventet OEE i procent (0–100) */
  oeePercent: number;

  /** Antal operatører nødvendigt for at køre maskinen */
  operators: number;

  /** Investeringspris i EUR (ekskl. automatisering) */
  investmentEur: number;

  /** Maskintid i sekunder pr. emne for hvert produkt-id */
  processingTimeSec: Record<string, number>;

  /** Valgfrie automatiseringstilkøb */
  automationOptions?: AutomationOption[];
};

export const SOLUTIONS: SolutionVariant[] = [
  {
    name: "Single Machine - Single Side Drilling",
    description: "A single machine with one drilling unita and manual in/outfeed.",
    oeePercent: 60,
    operators: 1,
    investmentEur: 68_000,
    processingTimeSec: {
      "Special Milling Panel":   80,
      "Sliding Door":            90,
      "Hinge Door":              75,
      "Fixed Shelf":             17,
      "Tall Cabinet Side":       120,
      "Middle Base w/ Groove":   75,
      "Plinth Front":            20,
      "Drawer Front":            35,
      "Cabinet Side":            60,
    },
    automationOptions: [
      {
        name: "Automatic Loading / Unloading",
        description: "Conveyor-based panel feed and discharge — eliminates manual handling between operations.",
        priceEur: 25_000,
        oeeBoostPct: 10,
        operatorReduction: 0.5,
      },
      {
        name: "Real-time Production Monitoring",
        description: "OPC-UA integration with live dashboard for cycle times, downtime, and throughput.",
        priceEur: 8_000,
        oeeBoostPct: 5,
        operatorReduction: 0,
      },
    ],
  },

  {
    name: "Single Machine - Double Side Drilling",
    description: "One machine with double drilling units for increased capacity. Comes with manual in/outfeed",
    oeePercent: 60,
    operators: 1,
    investmentEur: 98_000,
    processingTimeSec: {
      "Special Milling Panel":   60,
      "Sliding Door":            70,
      "Hinge Door":              60,
      "Fixed Shelf":             17,
      "Tall Cabinet Side":       120,
      "Middle Base w/ Groove":   65,
      "Plinth Front":            20,
      "Drawer Front":            35,
      "Cabinet Side":            50,
    },
    automationOptions: [
      {
        name: "Automatic Loading / Unloading",
        description: "Conveyor-based panel feed and discharge — eliminates manual handling between operations.",
        priceEur: 25_000,
        oeeBoostPct: 10,
        operatorReduction: 0.5,
      },
      {
        name: "Real-time Production Monitoring",
        description: "OPC-UA integration with live dashboard for cycle times, downtime, and throughput.",
        priceEur: 8_000,
        oeeBoostPct: 5,
        operatorReduction: 0,
      },
    ],
  },

  {
    name: "Double Machine - Double Side Drilling",
    description: "Two parallel double-side drilling units running simultaneously. Manual In/outfeed.",
    oeePercent: 60,
    operators: 2,
    investmentEur: 140_000,
    processingTimeSec: {
      "Special Milling Panel":   60,
      "Sliding Door":            70,
      "Hinge Door":              75,
      "Fixed Shelf":             17,
      "Tall Cabinet Side":       100,
      "Middle Base w/ Groove":   65,
      "Plinth Front":            20,
      "Drawer Front":            35,
      "Cabinet Side":            50,
    },
    automationOptions: [
      {
        name: "Automatic Loading / Unloading",
        description: "Conveyor-based panel feed and discharge — eliminates manual handling between operations.",
        priceEur: 35_000,
        oeeBoostPct: 10,
        operatorReduction: 1,
      },
      {
        name: "Real-time Production Monitoring",
        description: "OPC-UA integration with live dashboard for cycle times, downtime, and throughput.",
        priceEur: 8_000,
        oeeBoostPct: 5,
        operatorReduction: 0,
      },
    ],
  },

   {
     name: "Double Machine - Double Side Drilling, Full Automation",
     description: "Two parallel double-side drilling units running simultaneously. With full automized return transportation and robot in/outfeed",
     oeePercent: 80,
     operators: 1,
     investmentEur: 220_000,
     processingTimeSec: {
       "Special Milling Panel":   60,
       "Sliding Door":            70,
       "Hinge Door":              75,
       "Fixed Shelf":             17,
       "Tall Cabinet Side":       100,
       "Middle Base w/ Groove":   65,
       "Plinth Front":            20,
       "Drawer Front":            35,
       "Cabinet Side":            50,
     },
     automationOptions: [],
   },
];
