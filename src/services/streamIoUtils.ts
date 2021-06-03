import { PassThrough } from "stream";
import fs from "fs";

export function saveStream(stream: PassThrough) {
    stream.pipe(fs.createWriteStream(`public/test.mp3`));
}
