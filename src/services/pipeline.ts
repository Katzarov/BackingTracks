import { getInfo, getFormats, chooseFormatAuto, getDownloadStream } from "./youtubeUtils";
import { convertStream } from "./streamConverterUtils";
import { getSaveStream } from "./streamIoUtils";

const url = "https://www.youtube.com/watch?v=12KbOAc8vmk";

import stream from "stream";

import util from "util";

const pipeline = util.promisify(stream.pipeline);

async function run() {
    const videoInfo = await getInfo(url);

    const formats = getFormats(videoInfo);

    const format = chooseFormatAuto(formats);

    // const downloadSteam = getDownloadStream(url, format);

    // const convertedStream = convertStream(downloadSteam);

    // saveStream(convertedStream);

    // const write = fs.createWriteStream(`public/test.mp3`);
    // const write2 = getSaveStream();

    try {
        await pipeline(getDownloadStream(url, format), convertStream, getSaveStream());
        console.log("Pipeline succeeded");
    } catch (err) {
        console.error("Pipeline failed", err);
    }
}

run();
