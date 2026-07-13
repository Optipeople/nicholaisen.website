"use client";
import { useState } from "react";

type Mode = "machine" | "factory";

type Props = {
  modeMachine: string;
  modeFactory: string;
  machineSub: string;
  factorySub: string;
  labels: {
    m1: string;
    m2: string;
    m3: string;
    m4: string;
    orders: string;
    shifts: string;
    energy: string;
    stops: string;
  };
};

const BW = 88, BH = 36;
const HCX = 268, HCY = 66, HR = 36;
const DX = 352, DW = 90, DH = 26;

const MACHINES = [
  { id: "m1", x: 16, y: 18 },
  { id: "m2", x: 16, y: 78 },
  { id: "m3", x: 116, y: 18 },
  { id: "m4", x: 116, y: 78 },
];

const DATA_NODES = [
  { id: "orders", y: 4 },
  { id: "shifts", y: 38 },
  { id: "energy", y: 72 },
  { id: "stops", y: 106 },
];

export function ToggleDiagram({
  modeMachine,
  modeFactory,
  machineSub,
  factorySub,
  labels,
}: Props) {
  const [mode, setMode] = useState<Mode>("machine");
  const factory = mode === "factory";
  const mLabels = [labels.m1, labels.m2, labels.m3, labels.m4];
  const dLabels = [labels.orders, labels.shifts, labels.energy, labels.stops];

  return (
    <div>
      <div className="flex gap-2 mb-8 justify-center">
        {(["machine", "factory"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              mode === m
                ? "bg-[var(--color-navy-900)] text-[var(--color-cream-50)]"
                : "border border-[var(--color-ink-300)] text-[var(--color-ink-700)] hover:border-[var(--color-navy-900)]"
            }`}
          >
            {m === "machine" ? modeMachine : modeFactory}
          </button>
        ))}
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="0 0 460 148"
          className="w-full max-w-2xl mx-auto"
          aria-hidden="true"
        >
          {/* Machine-to-hub lines */}
          {factory &&
            MACHINES.map((m) => (
              <line
                key={`lm-${m.id}`}
                x1={m.x + BW}
                y1={m.y + BH / 2}
                x2={HCX - HR}
                y2={HCY}
                stroke="var(--color-ink-300)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            ))}

          {/* Hub-to-data lines */}
          {factory &&
            DATA_NODES.map((d) => (
              <line
                key={`ld-${d.id}`}
                x1={HCX + HR}
                y1={HCY}
                x2={DX}
                y2={d.y + DH / 2}
                stroke="var(--color-ink-300)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            ))}

          {/* Machine boxes */}
          {MACHINES.map((m, i) => {
            const active = factory || i === 0;
            return (
              <g key={m.id}>
                <rect
                  x={m.x}
                  y={m.y}
                  width={BW}
                  height={BH}
                  rx={6}
                  style={{
                    fill: active
                      ? "var(--color-navy-900)"
                      : "var(--color-paper-dark)",
                    transition: "fill 0.3s",
                  }}
                />
                <text
                  x={m.x + BW / 2}
                  y={m.y + BH / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontWeight="500"
                  style={{
                    fill: active
                      ? "var(--color-cream-50)"
                      : "var(--color-ink-300)",
                    transition: "fill 0.3s",
                  }}
                >
                  {mLabels[i]}
                </text>
              </g>
            );
          })}

          {/* Opticloud hub */}
          {factory && (
            <g>
              <circle
                cx={HCX}
                cy={HCY}
                r={HR}
                style={{ fill: "var(--color-tan-500)" }}
              />
              <text
                x={HCX}
                y={HCY - 6}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontWeight="700"
                fill="white"
              >
                Opti
              </text>
              <text
                x={HCX}
                y={HCY + 8}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontWeight="700"
                fill="white"
              >
                cloud
              </text>
            </g>
          )}

          {/* Data nodes */}
          {factory &&
            DATA_NODES.map((d, i) => (
              <g key={d.id}>
                <rect
                  x={DX}
                  y={d.y}
                  width={DW}
                  height={DH}
                  rx={4}
                  style={{
                    fill: "var(--color-cream-50)",
                    stroke: "var(--color-ink-300)",
                    strokeWidth: 1,
                  }}
                />
                <text
                  x={DX + DW / 2}
                  y={d.y + DH / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fontWeight="500"
                  style={{ fill: "var(--color-ink-700)" }}
                >
                  {dLabels[i]}
                </text>
              </g>
            ))}
        </svg>
      </div>

      <p className="text-center mt-4 text-sm text-[var(--color-ink-500)] italic">
        {factory ? factorySub : machineSub}
      </p>
    </div>
  );
}
