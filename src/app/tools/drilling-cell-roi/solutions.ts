/**
 * ROI Calculator — Solution Variants
 *
 * Add one entry per løsningsforslag i SOLUTIONS-arrayet.
 * Hvert produkt-id matcher id-feltet i products.ts.
 * processingTimeSec: maskintid i sekunder pr. emne (0 = produktet bearbejdes ikke i denne løsning).
 */

export type SolutionVariant = {
  /** Løsningens navn, f.eks. "Drilling Cell Standard" */
  name: string;

  /** Forventet OEE i procent (0–100) */
  oeePercent: number;

  /** Antal operatører nødvendigt for at køre maskinen */
  operators: number;

  /** Investeringspris i EUR */
  investmentEur: number;

  /** Maskintid i sekunder pr. emne for hvert produkt-id */
  processingTimeSec: Record<string, number>;
};

export const SOLUTIONS: SolutionVariant[] = [
  {
    name: "Single Machine - Single Side Drilling",
    oeePercent: 75,
    operators: 1,
    investmentEur: 110_000,
    processingTimeSec: {
      "Special Milling Panel":   45,
      "Sliding Door":            60,
      "Hinge Door":              55,
      "Fixed Shelf":             30,
      "Tall Cabinet Side":       90,
      "Middle Base w/ Groove":   40,
      "Plinth Front":            25,
      "Drawer Front":            35,
      "Cabinet Side":            50,
    },
  },

  {
    name: "Double Machine - Double Side Drilling",
    oeePercent: 85,
    operators: 1,
    investmentEur: 150_000,
    processingTimeSec: {
      "Special Milling Panel":   23,
      "Sliding Door":            30,
      "Hinge Door":              28,
      "Fixed Shelf":             15,
      "Tall Cabinet Side":       45,
      "Middle Base w/ Groove":   20,
      "Plinth Front":            13,
      "Drawer Front":            18,
      "Cabinet Side":            25,
    },
  },

  // {
  //   name: "",
  //   oeePercent: 0,
  //   operators: 1,
  //   investmentEur: 0,
  //   processingTimeSec: {
  //     "Special Milling Panel":   0,
  //     "Sliding Door":            0,
  //     "Hinge Door":              0,
  //     "Fixed Shelf":             0,
  //     "Tall Cabinet Side":       0,
  //     "Middle Base w/ Groove":   0,
  //     "Plinth Front":            0,
  //     "Drawer Front":            0,
  //     "Cabinet Side":            0,
  //   },
  // },

  // {
  //   name: "",
  //   oeePercent: 0,
  //   operators: 1,
  //   investmentEur: 0,
  //   processingTimeSec: {
  //     "Special Milling Panel":   0,
  //     "Sliding Door":            0,
  //     "Hinge Door":              0,
  //     "Fixed Shelf":             0,
  //     "Tall Cabinet Side":       0,
  //     "Middle Base w/ Groove":   0,
  //     "Plinth Front":            0,
  //     "Drawer Front":            0,
  //     "Cabinet Side":            0,
  //   },
  // },
];
