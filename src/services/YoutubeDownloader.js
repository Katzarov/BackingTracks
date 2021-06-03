const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const readline = require("readline");

const name = process.argv[2];
console.log(name);
// const url = "https://www.youtube.com/watch?v=0KPt32SuHOs";
const url = "https://www.youtube.com/watch?v=fRv2Bxbngws";

// const url = "https://www.youtube.com/watch?v=J2npVg9ONFo";

const stream = ytdl(url, { quality: "highestaudio" });
stream.id = name;

stream.on("info", info => {
    console.log("title:", info.videoDetails.title);
    console.log("rating:", info.player_response.videoDetails.averageRating);
    console.log("uploaded by:", info.videoDetails.author.name);
});

stream.on("info", function secondListener(arg1, arg2) {
    console.log(arg2);
});

// stream.on("progress", (downloaded, total) => {
//     const percent = downloaded / total;
//     console.log("downloading", `${(percent * 100).toFixed(1)}%`);
// });
stream.pipe(fs.createWriteStream(`public/${name}.mp4`));

stream.on("end", () => {
    console.log(stream.id);

    let id = name;

    let start = Date.now();
    ffmpeg(`public/${name}.mp4`)
        .audioCodec("libmp3lame")
        .audioBitrate(160)
        .save(`${__dirname}/${id}.mp3`)
        // .on("progress", p => {
        //     console.log(p);
        //     readline.cursorTo(process.stdout, 0);
        //     process.stdout.write(`${p.targetSize}kb downloaded`);
        // })
        .on("progress", p => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${p.targetSize}kb converted`);
        })
        .on("end", () => {
            console.log(`\ndone, finished in - ${(Date.now() - start) / 1000}s`);
        });
});

// stream.pipe(fs.createWriteStream(`public/video.mp4`));

// ytdl.getInfo(url).then(info =>
//     info.formats.map(format => console.log(format.audioBitrate, format.mimeType))
// );
