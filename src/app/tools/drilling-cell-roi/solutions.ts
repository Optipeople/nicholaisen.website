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
    name: "Drilling Cell — Standard",
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

  // Tilføj flere løsningsvarianter herunder:
  // {
  //   name: "Drilling Cell — Premium",
  //   oeePercent: 85,
  //   operators: 1,
  //   investmentEur: 150_000,
  //   processingTimeSec: {
  //     "Special Milling Panel":   35,
  //     "Sliding Door":            45,
  //     "Hinge Door":              42,
  //     "Fixed Shelf":             22,
  //     "Tall Cabinet Side":       70,
  //     "Middle Base w/ Groove":   30,
  //     "Plinth Front":            18,
  //     "Drawer Front":            25,
  //     "Cabinet Side":            38,
  //   },
  // },
];
