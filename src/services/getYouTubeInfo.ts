import fs from "fs";
import ytdl from "ytdl-core";

const url = "https://www.youtube.com/watch?v=fRv2Bxbngws";

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

async function getFormats(url: string): Promise<ytdl.videoFormat[]> {
    return new Promise(function (resolve, _reject) {
        ytdl.getInfo(url).then(info => {
            resolve(info.formats);
        });
    });
}

function logFormats(formats: ytdl.videoFormat[]) {
    formats.map(format => console.log(format.itag, format.audioBitrate, format.mimeType));
}

function chooseFormatAuto(formats: ytdl.videoFormat[]): ytdl.videoFormat {
    const format = ytdl.chooseFormat(formats, { quality: "highestaudio" });
    return format;
}

function chooseFormatManually(formats: ytdl.videoFormat[]): ytdl.videoFormat {
    const format = ytdl.chooseFormat(formats, { quality: 251 });
    return format;
}

function downloadFromFormat(url: string, format: ytdl.videoFormat): void {
    const stream = ytdl(url, { format: format });

    stream.pipe(fs.createWriteStream(`public/test3.mp4`));
}

async function main() {
    const formats = await getFormats(url);
    logFormats(formats);
    const formatAuto = chooseFormatAuto(formats);
    console.log(formatAuto);
    const formatManual = chooseFormatManually(formats);
    console.log(formatManual);
    downloadFromFormat(url, formatManual);
}
main();
