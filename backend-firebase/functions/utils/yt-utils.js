// const ytdl = require("ytdl-core");
const ytdl = require("@distube/ytdl-core");

const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const os = require("os");
const fs = require("fs");

const agent = ytdl.createAgent(
    JSON.parse(fs.readFileSync(__dirname + "/cookies.json")),
);

/**
 * Maps YouTube video objects to include the video link based on the video ID.
 *
 * @param {Array<Object>} yt_objs - An array of YouTube objects containing video information.
 * @return {Array<Object>} - An array of YouTube objects with an added 'link' property containing the video link.
 */
function mapYoutubeLinks(yt_objs) {
  return yt_objs.map((yt_obj) => {
    return {
      ...yt_obj,
      link: `https://www.youtube.com/watch?v=${yt_obj.id.videoId}`,
    };
  });
}

// Function to download audio for a given video URL
async function downloadAudio(yt_obj) {
  return new Promise(async (resolve, reject) => {
    const info = await ytdl.getInfo(yt_obj.link, { agent });

    const audioStream = ytdl(yt_obj.link, {
      agent: agent,
      quality: "highestaudio",
      filter: "audioonly",
    });

    const mp3Data = [];

    audioStream
        .on("data", (chunk) => {
          mp3Data.push(chunk);
        })
        .on("end", () => {
          const tempFilePath = path.join(os.tmpdir(), `${yt_obj.id.videoId}.mp3`);
          const mp3Buffer = Buffer.concat(mp3Data);
          fs.writeFileSync(tempFilePath, mp3Buffer);
          resolve({
            order_num: yt_obj.order_num,
            filePath: tempFilePath,
            length: info.videoDetails.lengthSeconds,
            title: info.videoDetails.title,
          });
        })
        .on("error", (err) => {
          reject(err);
        });
  });
}

async function concatenateMP3Files(files, outputFileName) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(os.tmpdir(), outputFileName);
    const command = ffmpeg();

    files.forEach((file) => {
      command.input(file);
    });

    command
        .on("end", () => {
          resolve(outputPath);
        })
        .on("error", (err) => {
          reject(err);
        })
        .mergeToFile(outputPath);
  });
}

// Main function to download audio for each video and then concatenate the MP3 data
async function createFinalMP3(yt_objs, id) {
  // the links also need to have order number/the position of the song overall
  try {
    const downloadPromises = yt_objs.map(downloadAudio);
    const songs = await Promise.all(downloadPromises);

    // Concatenate all MP3 buffers into a single buffer
    // const concatenatedBuffer = concatInOrder(buffers);
    const files = songs.map((song) => song.filePath);
    const outputFileName = `${id}.mp3`;

    const filePath = await concatenateMP3Files(files, outputFileName);

    return { filePath, songs };
  } catch (error) {
    console.error(`Error downloading and concatenating MP3 audio: ${error}`);
  }
}

module.exports = {
  mapYoutubeLinks,
  createFinalMP3,
};
