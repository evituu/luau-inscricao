import confetti from "canvas-confetti";

/** Cores pastéis suaves (marshmallow / confete fofo) */
const MARSHMALLOW_COLORS = [
  "#ffffff",
  "#faf5ff",
  "#fce7f3",
  "#fbcfe8",
  "#e9d5ff",
  "#fef9c3",
  "#f5f5f4",
  "#ddd6fe",
];

function clampOrigin(x: number, y: number): { x: number; y: number } {
  return {
    x: Math.min(0.99, Math.max(0.02, x)),
    y: Math.min(0.99, Math.max(0.02, y)),
  };
}

/** Origem normalizada (0–1) perto do topo do card */
function originFromCard(el: HTMLElement | null): { x: number; y: number } {
  if (!el || typeof window === "undefined") return { x: 0.5, y: 0.72 };
  const r = el.getBoundingClientRect();
  const x = (r.left + r.width / 2) / window.innerWidth;
  const y = (r.top + Math.min(r.height * 0.22, 120)) / window.innerHeight;
  return clampOrigin(x, y);
}

/**
 * Rajadas de “marshmallows” (círculos claros) ao confirmar envio.
 */
export function fireMarshmallowConfetti(originEl: HTMLElement | null) {
  const base = originFromCard(originEl);

  const puff = (partial: Parameters<typeof confetti>[0]) => {
    void confetti({
      particleCount: 50,
      spread: 85,
      startVelocity: 36,
      gravity: 0.52,
      decay: 0.92,
      drift: 0.06,
      ticks: 300,
      scalar: 1.12,
      shapes: ["circle"],
      colors: MARSHMALLOW_COLORS,
      zIndex: 9999,
      disableForReducedMotion: true,
      ...partial,
    });
  };

  puff({ origin: base, angle: 90 });
  puff({
    particleCount: 38,
    spread: 52,
    angle: 118,
    origin: clampOrigin(base.x - 0.1, base.y + 0.04),
  });
  puff({
    particleCount: 38,
    spread: 52,
    angle: 62,
    origin: clampOrigin(base.x + 0.1, base.y + 0.04),
  });

  window.setTimeout(() => {
    puff({
      particleCount: 42,
      spread: 105,
      startVelocity: 26,
      gravity: 0.62,
      origin: clampOrigin(base.x, base.y + 0.1),
    });
  }, 240);

  window.setTimeout(() => {
    puff({
      particleCount: 28,
      spread: 70,
      startVelocity: 18,
      scalar: 0.95,
      origin: clampOrigin(base.x, base.y + 0.05),
    });
  }, 520);
}
