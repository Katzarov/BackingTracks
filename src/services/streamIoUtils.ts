import { Transform, Readable, Writable } from "stream";
import fs from "fs";

export function saveStream(stream: Transform | Readable) {
    stream.pipe(fs.createWriteStream(`public/test.mp3`));
}

export function getSaveStream(title?: string): Writable {
    return fs.createWriteStream(`public/${title}.mp3`);
}
