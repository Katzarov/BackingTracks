import { Transform, Readable } from "stream";
import fs from "fs";

export function saveStream(stream: Transform | Readable) {
    stream.pipe(fs.createWriteStream(`public/test.mp3`));
}
