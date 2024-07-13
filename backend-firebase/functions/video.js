const functions = require("firebase-functions");
const {mapYoutubeLinks, createFinalMP3} = require("./utils/yt-utils");
const {downloadImage} = require("./utils/storage-utils");
const {overlayImage, addText} = require("./utils/video-utils");
const fs = require("fs");
const crypto = require("crypto");
const cors = require("cors")({origin: true});

exports.createVideo = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    const body = request.body;
    const songs = body.songs;
    const image = body.image;

    if (!image) {
      response.status(400).send("Image is required");
      return;
    }

    if (!songs) {
      response.status(400).send("Songs list is required");
      return;
    }

    const yt_objs = mapYoutubeLinks(songs);

    const id = crypto.randomUUID();

    const song = await createFinalMP3(yt_objs, id);

    const img = await downloadImage(image);

    const videoPath = await overlayImage(img.imageFilePath, song.filePath, id);

    const finalVideoPath = await addText(videoPath, song.songs, id);

    const video = fs.readFileSync(finalVideoPath);
    response.set("Content-Type", "video/mp4");
    response.send(video);
  });
});
