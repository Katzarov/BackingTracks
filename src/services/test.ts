import { getInfo, getFormats, chooseFormatAuto, getDownloadStream } from "./youtubeUtils";
import { convertStream } from "./streamConverterUtils";
import { saveStream } from "./streamIoUtils";

const url = "https://www.youtube.com/watch?v=fRv2Bxbngws";

async function test() {
    const videoInfo = await getInfo(url);

    const formats = getFormats(videoInfo);

    const format = chooseFormatAuto(formats);

    const downloadSteam = getDownloadStream(url, format);

    const convertedStream = convertStream(downloadSteam);

    saveStream(convertedStream);
}

test();
