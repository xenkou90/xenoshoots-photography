import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import WIDTHS from "../lib/image-widths.json" with { type: "json" };

const SOURCE_DIR = "photos";
const OUTPUT_DIR = "public/photos";
const QUALITY = 80;

async function isUpToDate(source: string, output: string): Promise<boolean> {
    try {
        const [sourceInfo, outputInfo] = await Promise.all([
            stat(source),
            stat(output),
        ]);
        return outputInfo.mtimeMs >= sourceInfo.mtimeMs;
    } catch {
        return false;
    }
}

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(SOURCE_DIR)).filter((file) =>
    file.endsWith(".jpg"),
);

let generated = 0;

for (const file of files) {
    const source = path.join(SOURCE_DIR, file);
    const name = path.parse(file).name;

    for (const width of WIDTHS) {
        const output = path.join(OUTPUT_DIR, `${name}-${width}.webp`);

        if (await isUpToDate(source, output)) continue;

        await sharp(source)
            .rotate()
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toFile(output);

        generated++;
    }
}

const total = files.length * WIDTHS.length;
console.log(`Images: ${generated} generated, ${total - generated} up to date.`);
