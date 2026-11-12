/**
 * Machines in each "Machinery we deliver" category, from nichomachines.com
 * (industrial machines and robotics). Names and spec values stay as on the
 * product pages; the one-line description (`solutions.machinery.catalog.lines.<id>`),
 * spec labels (`…labels.<label>`) and word values (`…values.<word>`) are translated.
 */
export type Spec = { label: string; value?: string; word?: string };
/**
 * Product sheets from the product page ("View Materials"); a label when a series has several.
 * Left out where the page has none (NCB2808 M, ND612CT, SBU, Titanpress), links another
 * machine's sheet (MF80S, NCG2812E) or the file is gone (ND510S).
 */
export type Pdf = { path: string; label?: string };
export type Machine = { id: string; name: string; image: string; pdfs?: Pdf[]; specs: Spec[] };

/** Product photos and PDFs, loaded from nichomachines.com as the category cut-outs are. */
const img = (path: string) => `https://nichomachines.com/wp-content/uploads/${path}`;

const s = (label: string, value: string): Spec => ({ label, value });
const w = (label: string, word: string): Spec => ({ label, word });

export const machinesByCategory: Record<string, Machine[]> = {
  panelSaws: [
    { id: "npc330", name: "NPC330", image: img("2025/12/NPC330-1024x486.jpg"), pdfs: [{ path: img("2026/01/NPC330.pdf") }], specs: [s("cutLength", "3300 mm"), s("cutHeight", "100 mm"), s("mainSaw", "11 kW")] },
    { id: "npl330hg", name: "NPL330HG", image: img("2025/12/NPL330HG-1024x486.jpg"), pdfs: [{ path: img("2026/01/NPL330HG.pdf") }], specs: [s("cutLength", "3300 mm"), s("cutHeight", "120 mm"), s("carriage", "90/120 m/min")] },
    { id: "npl380d", name: "NPL380D", image: img("2025/12/NPL380D-1024x486.jpg"), pdfs: [{ path: img("2026/01/NPL380D.pdf") }], specs: [s("mainSaw", "18.5 kW"), s("carriage", "120 m/min"), s("feed", "85 m/min")] },
    { id: "mj1138", name: "MJ1138F / MJK1138F1", image: img("2024/05/1280x720-2-1024x576.jpg"), pdfs: [{ label: "MJ1138F", path: img("2024/05/MJ1138F-Panel-Saw.pdf") }, { label: "MJK1138F1", path: img("2024/04/MJK1138F1-Panel-Saw.pdf") }], specs: [s("bladeTilt", "0–45°"), s("slidingTable", "3800 mm"), s("fenceAccuracy", "0.1 mm")] },
  ],
  edgebanders: [
    { id: "nb7pcgm", name: "NB7PCGM-PC", image: img("2025/12/NB7PCGM-1024x486.jpg"), pdfs: [{ path: img("2026/04/NB7PCGM-PC.pdf") }], specs: [s("feed", "18–26 m/min"), s("panelThickness", "9–60 mm"), s("edgeTape", "0.4–3 mm")] },
    { id: "nb870m", name: "NB870M (NB9-Smart)", image: img("2025/12/NB870MNB9-Smart-1024x486.jpg"), pdfs: [{ path: img("2026/01/NB870HMNB9-Smart.pdf") }], specs: [s("feed", "18–26 m/min"), s("panelThickness", "9–60 mm"), s("power", "53 kW")] },
    { id: "nb860ec", name: "NB860EC", image: img("2025/12/NB860EC-1024x486.jpg"), pdfs: [{ path: img("2026/01/NB860EC_8-NB536-PC.pdf") }], specs: [s("feed", "16–24 m/min"), s("panelThickness", "9–60 mm"), s("power", "22 kW")] },
    { id: "nb7cj", name: "NB7CJ", image: img("2025/07/1280x720-6-2-1024x576.jpg"), pdfs: [{ path: img("2026/04/8-NB7CJ.pdf") }], specs: [s("feed", "16–24 m/min"), s("panelThickness", "10–60 mm"), s("power", "27.5 kW")] },
    { id: "mf80s", name: "MF80S", image: img("2024/09/MF80S-1024x1024.jpg"), specs: [s("edgeTape", "0.3–3 mm"), w("operation", "manual"), w("feed", "variable")] },
    { id: "nb5jn", name: "NB5JN", image: img("2025/12/NB5JN-1024x486.jpg"), pdfs: [{ path: img("2026/01/NB650NNB5JN.pdf") }], specs: [s("feed", "16–20 m/min"), s("minWidth", "30 mm"), s("power", "14.4 kW")] },
    { id: "nb7cjmn", name: "NB7CJMN", image: img("2025/12/NB7CJMN-1024x486.jpg"), pdfs: [{ path: img("2026/01/NB671EMNNB7CJMN.pdf") }], specs: [s("feed", "16–24 m/min"), s("minPart", "40 × 200 mm"), s("edgeTape", "0.4–3 mm")] },
    { id: "nb380", name: "NB380", image: img("2025/12/NB875-1024x486.jpg"), pdfs: [{ path: img("2026/01/NB380_NB875A.pdf") }], specs: [s("feed", "8 m/min"), s("panelThickness", "18–25 mm"), s("minPart", "300 × 150 mm")] },
    { id: "nb7x", name: "NB7X (NB370)", image: img("2025/12/NB370-1024x486.jpg"), pdfs: [{ path: img("2026/01/NB7X-NB370.pdf") }], specs: [s("feedStraight", "24 m/min"), s("feedBevel", "14 m/min"), s("panelThickness", "9–25 mm")] },
  ],
  nesting: [
    { id: "ncg3021le", name: "NCG3021LE", image: img("2025/12/NCG3021LE-1024x486.jpg"), pdfs: [{ path: img("2026/04/NCG3021LE-LL-Spec.pdf") }], specs: [s("table", "3100 × 2100 mm"), s("spindle", "12 kW"), s("toolChanger", "12")] },
    { id: "ncg3021lplus", name: "NCG3021L PLUS", image: img("2025/12/NCG3021L-PLUS-1024x486.jpg"), pdfs: [{ path: img("2026/01/NCG3021L-PLUS.pdf") }], specs: [s("table", "3100 × 2100 mm"), s("spindles", "2 × 12 kW"), s("drills", "2 × 21")] },
    { id: "ncg2812e", name: "NCG2812E", image: img("2024/04/1280x720-PC-1024x576.jpg"), specs: [s("table", "2800 × 1220 mm"), s("spindle", "9 kW"), s("spindles", "4")] },
  ],
  cnc: [
    { id: "ncp3312z2", name: "NCP3312Z2", image: img("2026/03/NCP-3312Z2-1024x488.png"), pdfs: [{ path: img("2026/04/NCP3312Z2.new_.pdf") }], specs: [s("spindle", "12 kW · 24000 rpm"), s("toolChanger", "8"), s("power", "29 kW")] },
    { id: "ncg6018", name: "NCG6018", image: img("2025/12/NCG-6018_0.png"), pdfs: [{ path: img("2026/04/NCG6018-Spec.pdf") }], specs: [s("table", "6000 × 1850 mm"), s("spindle", "12 kW"), s("toolChanger", "12 + 8")] },
    { id: "ncb2808m", name: "NCB2808 M", image: img("2025/10/width_1200_height_627_cr3o35fumxl6l1x8a28esxu6yzx3m7mj.webp"), specs: [s("workLength", "2800 mm"), s("spindles", "3"), s("speed", "18000 rpm")] },
  ],
  drilling: [
    { id: "nd712dtl", name: "ND712DTL", image: img("2025/12/ND712DTL-1024x486.jpg"), pdfs: [{ path: img("2026/04/ND712DTL-1200650.pdf") }], specs: [s("panelLength", "250–2800 mm"), s("panelWidth", "250–1200 mm"), s("panelThickness", "10–60 mm")] },
    { id: "nd612dct", name: "ND612DCT", image: img("2025/12/ND612DCT-1024x486.jpg"), pdfs: [{ path: img("2026/01/ND612DCT.pdf") }], specs: [s("panelLength", "200–3000 mm"), s("topDrills", "2 × 19"), s("panelThickness", "10–60 mm")] },
    { id: "nd612dt", name: "ND612DT", image: img("2025/12/ND612DT-1024x486.jpg"), pdfs: [{ path: img("2026/01/ND612DT.pdf") }], specs: [s("panelLength", "200–3000 mm"), s("panelWidth", "30–1200 mm"), s("panelThickness", "10–60 mm")] },
    { id: "nd612ct", name: "ND612CT", image: img("2025/11/ND612DT-1024x486.png"), specs: [s("panelLength", "200–3000 mm"), s("panelWidth", "30–1200 mm"), s("panelThickness", "10–60 mm")] },
    { id: "nd510s", name: "ND510S", image: img("2024/10/1280x720-1-1024x576.jpg"), specs: [s("minPart", "200 × 30 mm"), s("panelWidth", "50–1000 mm"), s("panelThickness", "10–60 mm")] },
  ],
  moulding: [
    { id: "umxp509", name: "UMX-P509", image: img("2026/02/UMX-1024x486.png"), pdfs: [{ path: img("2026/04/Four-Side-Moulder-–-UMX-509.pdf") }], specs: [s("spindles", "5"), s("feed", "6–30 m/min"), s("spindlePower", "7.5–11 kW")] },
    { id: "umxp609", name: "UMX-P609", image: img("2026/02/UMX-1024x486.png"), pdfs: [{ path: img("2026/04/Four-Side-Moulder-–-UMX-609.pdf") }], specs: [s("spindles", "6"), s("feed", "6–30 m/min"), s("speed", "6000–8000 rpm")] },
    { id: "umxp709", name: "UMX-P709", image: img("2026/02/UMX-1024x486.png"), pdfs: [{ path: img("2026/04/Four-Side-Moulder-–-UMX-709.pdf") }], specs: [s("spindles", "7"), s("feed", "6–30 m/min"), s("speed", "6000–8000 rpm")] },
  ],
  sanding: [
    { id: "mt1300", name: "MT1300", image: img("2026/08/Sanding-machine-Photoroom-2-1.png"), pdfs: [{ path: img("2026/08/MT-1300-2.pdf") }], specs: [s("workWidth", "1300 mm"), s("thickness", "5–150 mm"), s("feed", "7–36 m/min")] },
    { id: "rrhg1300", name: "WT RRHG1300", image: img("2026/08/20230615113153926-1024x768.jpg"), pdfs: [{ path: img("2026/08/WT-RRHG1300.pdf") }], specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("feed", "5–26 m/min")] },
    { id: "trhg1300", name: "WT TRHG1300", image: img("2026/08/20230615113153926-1024x768.jpg"), pdfs: [{ path: img("2026/08/WT-TRHG1300.pdf") }], specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("feed", "5–30 m/min")] },
    { id: "rr1300", name: "WT RR1300", image: img("2026/08/Sanding-machine-2-Photoroom-1-1024x724.png"), pdfs: [{ path: img("2026/08/wide-beltWT-RR1300.pdf") }], specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("power", "55 kW")] },
    { id: "rrc1300", name: "WT RRC1300", image: img("2026/08/Sanding-machine-2-Photoroom-1-1024x724.png"), pdfs: [{ path: img("2026/08/WT-RRC1300.pdf") }], specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("feed", "5–24 m/min")] },
    { id: "rr1300v", name: "WT RR1300V", image: img("2026/08/Sanding-machine-3.png"), pdfs: [{ path: img("2026/08/WT-RR1300V.pdf") }], specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("feed", "5–30 m/min")] },
    // Converted from inches on the product page.
    { id: "fr3d", name: "3D FR", image: img("2026/08/Sanding-machine-4.png"), pdfs: [{ path: img("2026/08/3D-Brush-Sander.pdf") }], specs: [s("workWidth", "356 / 635 mm"), s("thickness", "3–100 mm"), s("feed", "3–17 m/min")] },
    { id: "fhdr1300", name: "FHDR 1300", image: img("2026/08/Brush-sander.png"), pdfs: [{ path: img("2026/08/Brush-sander-FHDR1300.pdf") }], specs: [s("workWidth", "1300 mm"), s("thickness", "3–120 mm"), s("feed", "3–17 m/min")] },
  ],
  framePresses: [
    { id: "titanpress", name: "Titanpress TX", image: img("2026/04/TITANPRESS-TX-1024x486.png"), specs: [s("control", "CNC"), w("beams", "selfCentring"), w("positioning", "automatic")] },
    { id: "sbu", name: "SBU Frame Press", image: img("2026/03/SBU-frame_trenperant-1024x486.png"), specs: [w("pressing", "hydraulic"), s("pistons", "2 + 2"), w("control", "pushOrTouch")] },
    { id: "euro", name: "EURO Frame Press", image: img("2026/03/Euro-1024x486.png"), pdfs: [{ path: img("2026/04/Hydraulic-Frame-Press-–-CASOLIN-EURO.pdf") }], specs: [w("pressing", "hydraulic"), w("positioning", "encoder"), w("control", "touchPlc")] },
  ],
  packaging: [
    { id: "nkp16d", name: "NKP16D (DM160)", image: img("2025/12/DM160-1024x486.jpg"), pdfs: [{ path: img("2026/01/DM160.pdf") }], specs: [s("output", "5–8 /min"), s("boardWidth", "110–1600 mm"), s("boardThickness", "2.5–6.5 mm")] },
    { id: "nkp25h", name: "NKP25H (BZX3500)", image: img("2025/12/BZX3500-1024x486.jpg"), pdfs: [{ path: img("2026/01/BZX-3500.pdf") }], specs: [s("boardWidth", "350–2500 mm"), s("boxLength", "250–2800 mm"), s("bins", "6–12")] },
    { id: "nkp2812", name: "NKP2812 (BZL2800)", image: img("2026/02/NKP2812BZL2800-1024x486.png"), pdfs: [{ path: img("2026/02/NKP2812BZL2800.pdf") }], specs: [s("output", "5–8 /min"), s("boxLength", "300–2900 mm"), s("power", "13 kW")] },
  ],
  cobots: [
    { id: "cobot5", name: "Cobot 5 kg", image: img("2025/04/S5-90-PRO.png"), pdfs: [{ path: img("2025/04/COLLABORATIVE-ROBOT-%E2%80%93-S5-90-PRO.pdf") }], specs: [s("payload", "5 kg"), s("reach", "920 mm"), s("repeatability", "±0.03 mm")] },
    { id: "cobot10", name: "Cobot 10 kg", image: img("2025/04/S10-140-Pro（3）-1.png"), pdfs: [{ path: img("2025/04/COLLABORATIVE-ROBOT-%E2%80%93-S10-140-PRO.pdf") }], specs: [s("payload", "10 kg"), s("reach", "1400 mm"), s("repeatability", "±0.03 mm")] },
    { id: "cobot20", name: "Cobot 20 kg", image: img("2025/07/Cobot-03.png"), pdfs: [{ path: img("2025/04/COLLABORATIVE-ROBOT-%E2%80%93-S20-180-PRO.pdf") }], specs: [s("payload", "20 kg"), s("reach", "1800 mm"), s("repeatability", "±0.03 mm")] },
  ],
  robots: [
    { id: "robotBasic", name: "Industrial Basic", image: img("2025/08/image.png"), pdfs: [{ path: img("2025/04/Basic-Robot-Concept-2.pdf") }], specs: [s("payload", "60 kg"), s("reach", "2000 mm"), s("axes", "4")] },
    { id: "robotAdvanced", name: "Industrial Advanced", image: img("2025/08/image.png"), pdfs: [{ path: img("2025/04/Advanced-Robot-Concept-2.pdf") }], specs: [s("payload", "70 kg"), s("reach", "2100 mm"), s("axes", "6")] },
    { id: "robotSpeed", name: "Industrial Speed", image: img("2025/08/image.png"), pdfs: [{ path: img("2025/04/Speed-Robot-Concept-3.pdf") }], specs: [s("payload", "70 kg"), s("reach", "2100 mm"), s("axes", "6")] },
  ],
  palletizing: [
    { id: "s20", name: "Co-Palletizer S20", image: img("2026/02/co-palletizer-0.png"), pdfs: [{ path: img("2026/03/Co-Palletizer_20-Flyer_EN_NM.pdf") }], specs: [s("payload", "20 kg"), s("cycles", "8–12 /min"), s("pallet", "1200 × 1200 mm")] },
  ],
};

/** Decimal comma outside English ("18.5 kW" → "18,5 kW"). Values carry no thousands separators. */
export const localizeValue = (value: string, locale: string) =>
  locale === "en" ? value : value.replace(/(\d)\.(\d)/g, "$1,$2");
