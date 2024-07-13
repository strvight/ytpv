// const ytdl = require("ytdl-core");
const ytdl = require("@distube/ytdl-core");

const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const os = require("os");
const fs = require("fs");

const COOKIES = [
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.627599,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value: "neFc74pzH6P7xO0n/AZRzl1ytC7QBHyNyT",
    id: 1,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.628151,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSID",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "g.a000lwi-T-Jd1DRajFF4pUOyksmmj-AsL643sD0tvGJMOhEsnSD6sGqhPxnHBgNNj8oEP5JnlQACgYKAWUSARISFQHGX2MiL7NOYVusj1AHoZrBmCRKvBoVAUF8yKqYfa7-vxNs218CcbuWOcJb0076",
    id: 2,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1752342681.65129,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDCC",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "AKEyXzW3sLMRUULobliqQlUN9dF46M5XDOLnrv8aM0Wdwf-bjDAVFQZ2Asr4f0yreBzwbsRyhII",
    id: 3,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1752342667.241498,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-1PSIDTS",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "sidts-CjEB4E2dkdQNBnkrbaS05fNd_ujX1Mfi1QprDNtUE95L48S3vDE8bo8pcPFSNovw6JGmEAA",
    id: 4,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.627668,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-3PAPISID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value: "neFc74pzH6P7xO0n/AZRzl1ytC7QBHyNyT",
    id: 5,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.628219,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSID",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "g.a000lwi-T-Jd1DRajFF4pUOyksmmj-AsL643sD0tvGJMOhEsnSD6paTfzrygTyKt0C_H_0XRKQACgYKASYSARISFQHGX2MiPc5XKa5Z2l1Nbr51jLPj9xoVAUF8yKqi8vvZfNK9P-FEktbFclJA0076",
    id: 6,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1752342681.651322,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDCC",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "AKEyXzUGgbHbcALcjdyaibUTH0fxPq72d8k3on8Kb80pHuwhtNbP17A-aEZbk4xc788ecMBKqG-T",
    id: 7,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1752342667.24199,
    hostOnly: false,
    httpOnly: true,
    name: "__Secure-3PSIDTS",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "sidts-CjEB4E2dkdQNBnkrbaS05fNd_ujX1Mfi1QprDNtUE95L48S3vDE8bo8pcPFSNovw6JGmEAA",
    id: 8,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.627455,
    hostOnly: false,
    httpOnly: false,
    name: "APISID",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: false,
    storeId: "0",
    value: "GkoQpgLFGW8xiSIs/Ami0r1Bf7h157oTvS",
    id: 9,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.627183,
    hostOnly: false,
    httpOnly: true,
    name: "HSID",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: false,
    storeId: "0",
    value: "A6sYB5SQihBMSUwh-",
    id: 10,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.523004,
    hostOnly: false,
    httpOnly: true,
    name: "LOGIN_INFO",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "AFmmF2swRQIhAKDZgw2ELEgHu8bE3KhN77lclK3Mgxu_ZtA3FQrMgikqAiBf7nJqYNIeVYlwrcMxOVWDYuzAIDv9e3moBO1ylrROrQ:QUQ3MjNmek5UdGk3NE81NnBKZFBZMEt3UGJDSU5QM2ZGcFk3U3NNeExkMkJJblFWSUp5bDVqZHZ4Q2ZCVTZxM1RSR3ljLXo1NWtobjJHcGg5dDhmRnZMRDRqS0IzM1lfdXVDbHlfMkhvaTJUemZwUDZRWGJOU2trQW5wVFNmaVIwMHlwTkJRS0ZlaEMtS25HbkJ1ZTdtRUlaSlJzTWdieDh3",
    id: 11,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366676.628508,
    hostOnly: false,
    httpOnly: false,
    name: "PREF",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value: "f7=4100&tz=America.Vancouver&f4=4000000",
    id: 12,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.627533,
    hostOnly: false,
    httpOnly: false,
    name: "SAPISID",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value: "neFc74pzH6P7xO0n/AZRzl1ytC7QBHyNyT",
    id: 13,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.62808,
    hostOnly: false,
    httpOnly: false,
    name: "SID",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: false,
    storeId: "0",
    value:
      "g.a000lwi-T-Jd1DRajFF4pUOyksmmj-AsL643sD0tvGJMOhEsnSD6VFil_2UzCF75L9NRwrcmzAACgYKAQgSARISFQHGX2MiX8TRkrh9zgL5JfDt14wTgxoVAUF8yKrOAaxTE-a2TeCMcJeBtQ-P0076",
    id: 14,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1752342681.651215,
    hostOnly: false,
    httpOnly: false,
    name: "SIDCC",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: false,
    storeId: "0",
    value:
      "AKEyXzVHztS0XbPUSQKvtMpu5JTE2xO69XOCsaCxVwEiHjoGTKDotaQkl3dq4BswqDwtBh5nHdXR",
    id: 15,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1755366668.627375,
    hostOnly: false,
    httpOnly: true,
    name: "SSID",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value: "AV6jkoXD5v-irBOAY",
    id: 16,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1720806686,
    hostOnly: false,
    httpOnly: false,
    name: "ST-183jmdn",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: false,
    storeId: "0",
    value:
      "session_logininfo=AFmmF2swRQIhAOzI0xd7Rg64GNzzmX7lBiHMColIqYJOw_NguRvM5wP5AiBl2TG0vMpWy10P7BnhWUfSBoitL2RO90yqjOMoNBry9w%3AQUQ3MjNmekxud0xOblhSa3hOOEdjUTNMX0kzRnplbmNzd01vX0VuSy1ZZGtQUHpmQ2c0U1lFLVE0WGJfcTV2Sy0xMWdPSHZ2cjJiWFZPODJQX0hGaWt4am9NLUZqc1Q0TkhneDRMUEIwejVueGExSFp0RFdqaVMzVXhYQUJwdWwxYVBWNlNjWDRrY1pwdTVNRkNkYW5JM2RQWjZKQ08yYndB",
    id: 17,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1729837139.01373,
    hostOnly: false,
    httpOnly: true,
    name: "VISITOR_PRIVACY_METADATA",
    path: "/",
    sameSite: "no_restriction",
    secure: true,
    session: false,
    storeId: "0",
    value: "CgJDQRIEGgAgZA%3D%3D",
    id: 18,
  },
  {
    domain: ".youtube.com",
    hostOnly: false,
    httpOnly: false,
    name: "wide",
    path: "/",
    sameSite: "unspecified",
    secure: false,
    session: true,
    storeId: "0",
    value: "1",
    id: 19,
  },
  {
    domain: ".youtube.com",
    expirationDate: 1720806788.523074,
    hostOnly: false,
    httpOnly: true,
    name: "YTSESSION-1b",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    storeId: "0",
    value:
      "ANPz9KgJA1BrJBUJmkwMGgz2e4pdr8+5L9w9U4bLgv3+rQrHQLw8v3OzTZOBgZ5LdWLHB3O06osJzOEtLDVrRRLZoSGXOluYMVHIBaU=",
    id: 20,
  },
];

const agent = ytdl.createAgent(COOKIES);

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
    const info = await ytdl.getInfo(yt_obj.link, {agent});

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

    return {filePath, songs};
  } catch (error) {
    console.error(`Error downloading and concatenating MP3 audio: ${error}`);
  }
}

module.exports = {
  mapYoutubeLinks,
  createFinalMP3,
};
