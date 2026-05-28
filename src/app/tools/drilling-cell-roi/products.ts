export type DrillingProduct = {
  id: string;
  name: string;
  size: string;
  image: string;
};

export const PRODUCTS: readonly DrillingProduct[] = [
  { id: "Special Milling Panel",  name: "", size: "397.5 × 779 × 19 mm",   image: "/images/workshop/six-sided-drilling.jpg" },
  { id: "Sliding Door",           name: "", size: "1051 × 568.5 × 16 mm",  image: "/images/workshop/softforming.jpg" },
  { id: "Hinge Door",             name: "", size: "702 × 368 × 17 mm",      image: "/images/industries/doors-windows.jpg" },
  { id: "Fixed Shelf",            name: "", size: "381 × 387 × 16 mm",      image: "/images/industries/panel-furniture.jpg" },
  { id: "Tall Cabinet Side",      name: "", size: "2125 × 560 × 16 mm",     image: "/images/workshop/cnc-machining.jpg" },
  { id: "Middle Base w/ Groove",  name: "", size: "667 × 559 × 16 mm",      image: "/images/workshop/panel-saw-2.jpg" },
  { id: "Plinth Front",           name: "", size: "741.6 × 57.3 × 19 mm",   image: "/images/workshop/narrow-parts.jpg" },
  { id: "Drawer Front",           name: "", size: "368 × 115.3 × 17 mm",    image: "/images/workshop/precision-machining.jpg" },
  { id: "Cabinet Side",           name: "", size: "1058 × 379.5 × 23 mm",   image: "/images/hero-planks.jpg" },
];
