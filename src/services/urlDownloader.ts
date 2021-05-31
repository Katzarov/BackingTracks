import https from "https";
import fs from "fs";
// import path from "path";

// const url =
// "https://www.guitarbackingtrack.com/content/stream?id=11753&hash=32e533e7e568d86ee5be79cc9134867b";

const url = "https://cdn.pixabay.com/audio/2021/02/08/audio_7ac09a1714.mp3";

// const name = path.basename(url) + ".mp3";

const httpReq = https.get(url, function (res) {
    const fileStream = fs.createWriteStream("test.mp3");
    res.pipe(fileStream);

    fileStream.on("error", function (err) {
        console.log(err);
    });

    fileStream.on("finish", function () {
        fileStream.close();
        console.log("Done");
    });
});

httpReq.on("error", function (err) {
    console.log(err);
});
