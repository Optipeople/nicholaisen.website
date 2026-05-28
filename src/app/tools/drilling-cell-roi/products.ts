export type DrillingProduct = {
  id: string;
  name: string;
  size: string;
  image: string;
};

const MACHINE_IMAGE = "/images/workshop/precision-machining.jpg";

export const PRODUCTS: readonly DrillingProduct[] = [
  { id: "Special Milling Panel",  name: "", size: "397.5 × 779 × 19 mm",   image: MACHINE_IMAGE },
  { id: "Sliding Door",           name: "", size: "1051 × 568.5 × 16 mm",  image: MACHINE_IMAGE },
  { id: "Hinge Door",             name: "", size: "702 × 368 × 17 mm",      image: MACHINE_IMAGE },
  { id: "Fixed Shelf",            name: "", size: "381 × 387 × 16 mm",      image: MACHINE_IMAGE },
  { id: "Tall Cabinet Side",      name: "", size: "2125 × 560 × 16 mm",     image: MACHINE_IMAGE },
  { id: "Middle Base w/ Groove",  name: "", size: "667 × 559 × 16 mm",      image: MACHINE_IMAGE },
  { id: "Plinth Front",           name: "", size: "741.6 × 57.3 × 19 mm",   image: MACHINE_IMAGE },
  { id: "Drawer Front",           name: "", size: "368 × 115.3 × 17 mm",    image: MACHINE_IMAGE },
  { id: "Cabinet Side",           name: "", size: "1058 × 379.5 × 23 mm",   image: MACHINE_IMAGE },
];
