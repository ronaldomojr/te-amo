import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "fotos", "foto-13.jpg");
const OUT_PNG = path.join(ROOT, "app", "icon.png");
const OUT_APPLE = path.join(ROOT, "app", "apple-icon.png");

// recorta um quadrado centrado no casal e exporta nos tamanhos de ícone
const meta = await sharp(SRC).rotate().metadata();
// foto vertical: os rostos ficam na metade de baixo, então recorto um
// quadrado centrado horizontalmente e deslocado para baixo
const side = meta.width;
const top = Math.round(meta.height * 0.42);
const base = sharp(SRC)
  .rotate()
  .extract({ left: 0, top, width: side, height: Math.min(side, meta.height - top) })
  .resize({ width: 512, height: 512, fit: "cover" });

await base.clone().png().toFile(OUT_PNG);
await base.clone().png().toFile(OUT_APPLE);

console.log("favicon gerado: app/icon.png e app/apple-icon.png");
