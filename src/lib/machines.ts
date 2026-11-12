/**
 * Machines in each "Machinery we deliver" category, from nichomachines.com
 * (industrial machines and robotics). Names and spec values stay as on the
 * product pages; the one-line description (`solutions.machinery.catalog.lines.<id>`),
 * spec labels (`…labels.<label>`) and word values (`…values.<word>`) are translated.
 */
export type Spec = { label: string; value?: string; word?: string };
export type Machine = { id: string; name: string; specs: Spec[] };

const s = (label: string, value: string): Spec => ({ label, value });
const w = (label: string, word: string): Spec => ({ label, word });

export const machinesByCategory: Record<string, Machine[]> = {
  panelSaws: [
    { id: "npc330", name: "NPC330", specs: [s("cutLength", "3300 mm"), s("cutHeight", "100 mm"), s("mainSaw", "11 kW")] },
    { id: "npl330hg", name: "NPL330HG", specs: [s("cutLength", "3300 mm"), s("cutHeight", "120 mm"), s("carriage", "90/120 m/min")] },
    { id: "npl380d", name: "NPL380D", specs: [s("mainSaw", "18.5 kW"), s("carriage", "120 m/min"), s("feed", "85 m/min")] },
    { id: "mj1138", name: "MJ1138 series", specs: [s("bladeTilt", "0–45°"), s("slidingTable", "3800 mm"), s("fenceAccuracy", "0.1 mm")] },
  ],
  edgebanders: [
    { id: "nb7pcgm", name: "NB7PCGM-PC", specs: [s("feed", "18–26 m/min"), s("panelThickness", "9–60 mm"), s("edgeTape", "0.4–3 mm")] },
    { id: "nb870m", name: "NB870M (NB9-Smart)", specs: [s("feed", "18–26 m/min"), s("panelThickness", "9–60 mm"), s("power", "53 kW")] },
    { id: "nb860ec", name: "NB860EC", specs: [s("feed", "16–24 m/min"), s("panelThickness", "9–60 mm"), s("power", "22 kW")] },
    { id: "nb7cj", name: "NB7CJ", specs: [s("feed", "16–24 m/min"), s("panelThickness", "10–60 mm"), s("power", "27.5 kW")] },
    { id: "mf80s", name: "MF80S", specs: [s("edgeTape", "0.3–3 mm"), w("operation", "manual"), w("feed", "variable")] },
    { id: "nb5jn", name: "NB5JN", specs: [s("feed", "16–20 m/min"), s("minWidth", "30 mm"), s("power", "14.4 kW")] },
    { id: "nb7cjmn", name: "NB7CJMN", specs: [s("feed", "16–24 m/min"), s("minPart", "40 × 200 mm"), s("edgeTape", "0.4–3 mm")] },
    { id: "nb380", name: "NB380", specs: [s("feed", "8 m/min"), s("panelThickness", "18–25 mm"), s("minPart", "300 × 150 mm")] },
    { id: "nb7x", name: "NB7X (NB370)", specs: [s("feedStraight", "24 m/min"), s("feedBevel", "14 m/min"), s("panelThickness", "9–25 mm")] },
  ],
  nesting: [
    { id: "ncg3021le", name: "NCG3021LE", specs: [s("table", "3100 × 2100 mm"), s("spindle", "12 kW"), s("toolChanger", "12")] },
    { id: "ncg3021lplus", name: "NCG3021L PLUS", specs: [s("table", "3100 × 2100 mm"), s("spindles", "2 × 12 kW"), s("drills", "2 × 21")] },
    { id: "ncg2812e", name: "NCG2812E", specs: [s("table", "2800 × 1220 mm"), s("spindle", "9 kW"), s("spindles", "4")] },
  ],
  cnc: [
    { id: "ncp3312z2", name: "NCP3312Z2", specs: [s("spindle", "12 kW · 24000 rpm"), s("toolChanger", "8"), s("power", "29 kW")] },
    { id: "ncg6018", name: "NCG6018", specs: [s("table", "6000 × 1850 mm"), s("spindle", "12 kW"), s("toolChanger", "12 + 8")] },
    { id: "ncb2808m", name: "NCB2808 M", specs: [s("workLength", "2800 mm"), s("spindles", "3"), s("speed", "18000 rpm")] },
  ],
  drilling: [
    { id: "nd712dtl", name: "ND712DTL", specs: [s("panelLength", "250–2800 mm"), s("panelWidth", "250–1200 mm"), s("panelThickness", "10–60 mm")] },
    { id: "nd612dct", name: "ND612DCT", specs: [s("panelLength", "200–3000 mm"), s("topDrills", "2 × 19"), s("panelThickness", "10–60 mm")] },
    { id: "nd612dt", name: "ND612DT", specs: [s("panelLength", "200–3000 mm"), s("panelWidth", "30–1200 mm"), s("panelThickness", "10–60 mm")] },
    { id: "nd612ct", name: "ND612CT", specs: [s("panelLength", "200–3000 mm"), s("panelWidth", "30–1200 mm"), s("panelThickness", "10–60 mm")] },
    { id: "nd510s", name: "ND510S", specs: [s("minPart", "200 × 30 mm"), s("panelWidth", "50–1000 mm"), s("panelThickness", "10–60 mm")] },
  ],
  moulding: [
    { id: "umxp509", name: "UMX-P509", specs: [s("spindles", "5"), s("feed", "6–30 m/min"), s("spindlePower", "7.5–11 kW")] },
    { id: "umxp609", name: "UMX-P609", specs: [s("spindles", "6"), s("feed", "6–30 m/min"), s("speed", "6000–8000 rpm")] },
    { id: "umxp709", name: "UMX-P709", specs: [s("spindles", "7"), s("feed", "6–30 m/min"), s("speed", "6000–8000 rpm")] },
  ],
  sanding: [
    { id: "mt1300", name: "MT1300", specs: [s("workWidth", "1300 mm"), s("thickness", "5–150 mm"), s("feed", "7–36 m/min")] },
    { id: "rrhg1300", name: "WT RRHG1300", specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("feed", "5–26 m/min")] },
    { id: "trhg1300", name: "WT TRHG1300", specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("feed", "5–30 m/min")] },
    { id: "rr1300", name: "WT RR1300", specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("power", "55 kW")] },
    { id: "rrc1300", name: "WT RRC1300", specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("feed", "5–24 m/min")] },
    { id: "rr1300v", name: "WT RR1300V", specs: [s("workWidth", "1300 mm"), s("thickness", "3–150 mm"), s("feed", "5–30 m/min")] },
    // Converted from inches on the product page.
    { id: "fr3d", name: "3D FR", specs: [s("workWidth", "356 / 635 mm"), s("thickness", "3–100 mm"), s("feed", "3–17 m/min")] },
    { id: "fhdr1300", name: "FHDR 1300", specs: [s("workWidth", "1300 mm"), s("thickness", "3–120 mm"), s("feed", "3–17 m/min")] },
  ],
  framePresses: [
    { id: "titanpress", name: "Titanpress TX", specs: [s("control", "CNC"), w("beams", "selfCentring"), w("positioning", "automatic")] },
    { id: "sbu", name: "SBU Frame Press", specs: [w("pressing", "hydraulic"), s("pistons", "2 + 2"), w("control", "pushOrTouch")] },
    { id: "euro", name: "EURO Frame Press", specs: [w("pressing", "hydraulic"), w("positioning", "encoder"), w("control", "touchPlc")] },
  ],
  packaging: [
    { id: "nkp16d", name: "NKP16D (DM160)", specs: [s("output", "5–8 /min"), s("boardWidth", "110–1600 mm"), s("boardThickness", "2.5–6.5 mm")] },
    { id: "nkp25h", name: "NKP25H (BZX3500)", specs: [s("boardWidth", "350–2500 mm"), s("boxLength", "250–2800 mm"), s("bins", "6–12")] },
    { id: "nkp2812", name: "NKP2812 (BZL2800)", specs: [s("output", "5–8 /min"), s("boxLength", "300–2900 mm"), s("power", "13 kW")] },
  ],
  cobots: [
    { id: "cobot5", name: "Cobot 5 kg", specs: [s("payload", "5 kg"), s("reach", "920 mm"), s("repeatability", "±0.03 mm")] },
    { id: "cobot10", name: "Cobot 10 kg", specs: [s("payload", "10 kg"), s("reach", "1400 mm"), s("repeatability", "±0.03 mm")] },
    { id: "cobot20", name: "Cobot 20 kg", specs: [s("payload", "20 kg"), s("reach", "1800 mm"), s("repeatability", "±0.03 mm")] },
  ],
  robots: [
    { id: "robotBasic", name: "Industrial Basic", specs: [s("payload", "60 kg"), s("reach", "2000 mm"), s("axes", "4")] },
    { id: "robotAdvanced", name: "Industrial Advanced", specs: [s("payload", "70 kg"), s("reach", "2100 mm"), s("axes", "6")] },
    { id: "robotSpeed", name: "Industrial Speed", specs: [s("payload", "70 kg"), s("reach", "2100 mm"), s("axes", "6")] },
  ],
  palletizing: [
    { id: "s20", name: "Co-Palletizer S20", specs: [s("payload", "20 kg"), s("cycles", "8–12 /min"), s("pallet", "1200 × 1200 mm")] },
  ],
};

/** Decimal comma outside English ("18.5 kW" → "18,5 kW"). Values carry no thousands separators. */
export const localizeValue = (value: string, locale: string) =>
  locale === "en" ? value : value.replace(/(\d)\.(\d)/g, "$1,$2");
