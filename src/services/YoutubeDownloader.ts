import fs from "fs";
import ytdl from "ytdl-core";

// const url = "https://www.youtube.com/watch?v=0KPt32SuHOs";
const url = "https://www.youtube.com/watch?v=fRv2Bxbngws";

const stream = ytdl(url, { quality: "highestaudio" });

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

stream.on("end", () => {
    console.log("end");
});

stream.pipe(fs.createWriteStream(`public/video.mp4`));

// ytdl.getInfo(url).then(info =>
//     info.formats.map(format => console.log(format.audioBitrate, format.mimeType))
// );
