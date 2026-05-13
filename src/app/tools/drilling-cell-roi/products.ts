import { PRODUCT_IMAGES } from "./product-images";

export type DrillingProduct = {
  id: string;
  name: string;
  size: string;
  image: string;
};

const PRODUCT_META: Array<Omit<DrillingProduct, "image"> & { imageIndex: number }> = [
  { id: "BH1-218", name: "Panel", size: "397.5 × 779 × 19 mm", imageIndex: 0 },
  { id: "DH4036BHX", name: "Sliding Door", size: "1051 × 568.5 × 16 mm", imageIndex: 1 },
  { id: "DV4292", name: "Hinge Door", size: "702 × 368 × 17 mm", imageIndex: 2 },
  { id: "FH-B", name: "Fixed Shelf", size: "381 × 387 × 16 mm", imageIndex: 3 },
  { id: "KSI", name: "Tall Cabinet Side", size: "2125 × 560 × 16 mm", imageIndex: 4 },
  { id: "MB0667", name: "Middle Base w/ Groove", size: "667 × 559 × 16 mm", imageIndex: 5 },
  { id: "SH+V40", name: "Cabinet Side", size: "1058 × 419 × 19 mm", imageIndex: 6 },
  { id: "SH+B", name: "Plinth Front", size: "741.6 × 57.3 × 19 mm", imageIndex: 7 },
  { id: "SHV2", name: "Cabinet Side", size: "1104 × 878.5 × 19 mm", imageIndex: 8 },
  { id: "SK45", name: "Drawer Front", size: "368 × 115.3 × 17 mm", imageIndex: 9 },
  { id: "SM 4023", name: "Cabinet Side", size: "1058 × 379.5 × 23 mm", imageIndex: 10 },
];

export const PRODUCTS: readonly DrillingProduct[] = PRODUCT_META.map((p) => ({
  id: p.id,
  name: p.name,
  size: p.size,
  image: PRODUCT_IMAGES[p.imageIndex] ?? "",
}));
