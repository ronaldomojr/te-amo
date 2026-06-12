export const FOTOS = Array.from(
  { length: 14 },
  (_, i) => `/fotos/foto-${String(i + 1).padStart(2, "0")}.jpg`,
);
