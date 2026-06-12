import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import heicConvert from "heic-convert";

const ROOT = path.resolve(import.meta.dirname, "..");
const FOTOS_SRC = path.join(ROOT, "arquivos", "Fotos");
const FOTOS_OUT = path.join(ROOT, "public", "fotos");
const MUSICAS_SRC = path.join(ROOT, "arquivos", "Musicas");
const MUSICAS_OUT = path.join(ROOT, "public", "musicas");
const VIDEO_OUT = path.join(ROOT, "public", "video");

fs.mkdirSync(FOTOS_OUT, { recursive: true });
fs.mkdirSync(MUSICAS_OUT, { recursive: true });
fs.mkdirSync(VIDEO_OUT, { recursive: true });

const MAX_DIM = 1600;

async function writeWebJpg(inputBuffer, outName) {
  const out = path.join(FOTOS_OUT, outName);
  const img = sharp(inputBuffer, { failOn: "none" }).rotate();
  const meta = await img.metadata();
  await img
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log(`OK  ${outName}  (${meta.width}x${meta.height})`);
}

// Extract the largest embedded JPEG preview from a DNG by scanning for
// SOI/EOI markers — DNGs carry full-size JPEG previews and we have no raw decoder.
function extractJpegFromDng(buf) {
  const candidates = [];
  let i = 0;
  while (i < buf.length - 1) {
    if (buf[i] === 0xff && buf[i + 1] === 0xd8 && buf[i + 2] === 0xff) {
      // find matching EOI
      let j = i + 2;
      while (j < buf.length - 1) {
        if (buf[j] === 0xff && buf[j + 1] === 0xd9) {
          candidates.push(buf.subarray(i, j + 2));
          break;
        }
        j++;
      }
      i = j + 2;
    } else {
      i++;
    }
  }
  candidates.sort((a, b) => b.length - a.length);
  return candidates;
}

const files = fs.readdirSync(FOTOS_SRC);
let n = 0;

for (const f of files) {
  const full = path.join(FOTOS_SRC, f);
  const ext = path.extname(f).toLowerCase();
  try {
    if (ext === ".jpg" || ext === ".jpeg") {
      n++;
      await writeWebJpg(fs.readFileSync(full), `foto-${String(n).padStart(2, "0")}.jpg`);
    } else if (ext === ".heic") {
      n++;
      const jpegBuf = await heicConvert({
        buffer: fs.readFileSync(full),
        format: "JPEG",
        quality: 0.9,
      });
      await writeWebJpg(Buffer.from(jpegBuf), `foto-${String(n).padStart(2, "0")}.jpg`);
    } else if (ext === ".dng") {
      const candidates = extractJpegFromDng(fs.readFileSync(full));
      let done = false;
      for (const c of candidates) {
        try {
          const meta = await sharp(c).metadata();
          if (meta.width >= 800) {
            n++;
            await writeWebJpg(c, `foto-${String(n).padStart(2, "0")}.jpg`);
            done = true;
            break;
          }
        } catch {
          // not a valid JPEG stream, try next candidate
        }
      }
      if (!done) console.log(`SKIP ${f} — nenhum preview JPEG utilizável`);
    }
  } catch (err) {
    console.log(`ERRO ${f}: ${err.message}`);
  }
}

// video bonitinho
const video = path.join(FOTOS_SRC, "video bonitinho.mp4");
fs.copyFileSync(video, path.join(VIDEO_OUT, "video-bonitinho.mp4"));
console.log("OK  video-bonitinho.mp4");

// músicas, na ordem da playlist
const musicas = [
  ["Jorge & Mateus", "01-jorge-e-mateus-um-dia-te-levo-comigo.mp3"],
  ["Luan Santana", "02-luan-santana-garotas-nao-merecem-chorar.mp3"],
  ["Cazuza", "03-cazuza-boa-vida.mp3"],
  ["Charlie Brown", "04-charlie-brown-jr-como-tudo-deve-ser.mp3"],
];
const mp3s = fs.readdirSync(MUSICAS_SRC);
for (const [match, outName] of musicas) {
  const src = mp3s.find((m) => m.toLowerCase().includes(match.toLowerCase().split(" ")[0]));
  if (!src) {
    console.log(`ERRO música não encontrada: ${match}`);
    continue;
  }
  fs.copyFileSync(path.join(MUSICAS_SRC, src), path.join(MUSICAS_OUT, outName));
  console.log(`OK  ${outName}`);
}

console.log("Concluído.");
