import { PassThrough, Readable } from "stream";

import ffmpeg from "fluent-ffmpeg";
import readline from "readline";

export function convertStream(stream: Readable): PassThrough {
    let start = Date.now();
    //@ts-ignore
    return ffmpeg(stream)
        .format("mp3")
        .audioCodec("libmp3lame")
        .audioBitrate(160)

        .on("progress", (p: { targetSize: any }) => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${p.targetSize}kb converted`);
        })
        .on("end", () => {
            console.log(`\ndone, finished in - ${(Date.now() - start) / 1000}s`);
        })
        .on("error", function (err, _stdout, _stderr) {
            console.log("Cannot process video: " + err.message);
        })
        .pipe();
}
