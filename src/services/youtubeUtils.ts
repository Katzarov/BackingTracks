import { Readable } from "stream";
import ytdl, { videoFormat, chooseFormat, videoInfo, filterFormats } from "ytdl-core";

// const url = "https://www.youtube.com/watch?v=fRv2Bxbngws";
// const url = "https://www.youtube.com/watch?v=J2npVg9ONFo";

// ytdl.getInfo(url).then(info => {
//     const formats = info.formats;
//     // info.formats.map(format => console.log(format.audioBitrate, format.mimeType))

//     const format = ytdl.chooseFormat(formats, { quality: "highestaudio" });
//     // console.log(format);
// });

// const format = ytdl.chooseFormat(formats, { quality: 251 });

// const stream = ytdl(url, { format: { itag: 251 } });
// stream.on("info", function secondListener(arg1, arg2) {
//     console.log(arg2);
// });
// stream.pipe(fs.createWriteStream(`public/video.mp4`));

// ytdl.chooseFormat(url, { quality: "highestaudio" }).then(info => console.log(info));

// const stream = ytdl(url, { quality: "highestaudio" });

// stream.on("info", function secondListener(arg1, arg2) {
//     console.log(arg2);
//     stream.destroy();
// });

// stream.on("end", () => {
//     console.log("endGere");
// });

// stream.pipe(fs.createWriteStream(`public/video.mp4`));

// async function getFormats(url) {
//     ytdl.getInfo(url).then(info => {
//         const formats = info.formats;
//         formats.map(format => console.log(format.itag, format.audioBitrate, format.mimeType));

//         return Promise.resolve(formats);
//     });
// }

export async function getInfo(url: string): Promise<videoInfo> {
    return new Promise(function (resolve, reject) {
        ytdl.getInfo(url)
            .then(info => {
                resolve(info);
            })
            .catch(err => reject(err));
    });
}

export function getMetadata(info: videoInfo) {
    return { title: info.videoDetails.title, rating: info.videoDetails.averageRating };
}

export function getFormats(info: videoInfo): videoFormat[] {
    return filterFormats(info.formats, "audio");
}

export function getFormatsForClient(formats: videoFormat[]) {
    return formats.map(format => ({
        itag: format.itag,
        audioBitrate: format.audioBitrate,
        mimeType: format.mimeType
    }));
}

export function consoleLogFormats(formats: videoFormat[]): videoFormat[] {
    formats.map(format => console.log(format.itag, format.audioBitrate, format.mimeType));
    return formats;
}

export function chooseFormatAuto(formats: videoFormat[]): videoFormat {
    return chooseFormat(formats, { quality: "highestaudio" });
}

export function chooseFormatManually(formats: videoFormat[], itag: number): videoFormat {
    return chooseFormat(formats, { quality: itag });
}

export function getDownloadStream(url: string, format: videoFormat): Readable {
    return ytdl(url, { format: format });
}

// async function main() {
//     const formats = await getFormats(url);
//     logFormats(formats);
//     const formatAuto = chooseFormatAuto(formats);
//     console.log(formatAuto);
//     const itag = 251;
//     const formatManual = chooseFormatManually(formats, itag);
//     console.log(formatManual);
//     downloadFromFormat(url, formatManual);
// }

// main();
