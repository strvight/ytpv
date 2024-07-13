const path = require("path");
const os = require("os");
const {exec} = require("child_process");

async function overlayImage(inputImagePath, inputAudioPath, outputFileName) {
  const outputVideoPath = path.join(os.tmpdir(), `${outputFileName}.mp4`);

  // use https://stackoverflow.com/questions/42773497/can-you-call-out-to-ffmpeg-in-a-firebase-cloud-function

  const command = `ffmpeg -r 1 -loop 1 -y -i ${inputImagePath} -i ${inputAudioPath} -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" -c:v libx264 -c:a aac -shortest ${outputVideoPath}`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(outputVideoPath);
    });
  });
}

function removeParenthesesAndBrackets(input) {
  const result = input.replace(/[\(\[].*?[\)\]]/g, "");
  return result.trim();
}

function generateFilters(songInfos) {
  let filtersString = "[in]";
  let currentTime = 0;

  songInfos.forEach((songInfo) => {
    const text = removeParenthesesAndBrackets(songInfo.title);
    const duration = parseInt(songInfo.length);

    filtersString += `drawtext=text='${text}':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=24:fontcolor=white:enable='between(t,${currentTime},${
      currentTime + duration - 1
    })', `;

    currentTime += duration;
  });

  filtersString = filtersString.slice(0, -2);

  filtersString += "[out]";

  return filtersString;
}

async function addText(videoPath, songInfos, id) {
  const filters = generateFilters(songInfos);

  const finalOutputVideoPath = path.join(os.tmpdir(), `${id}-final.mp4`);

  const command = `ffmpeg -i ${videoPath} -vf "${filters}"  -codec:a copy ${finalOutputVideoPath}`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(finalOutputVideoPath);
    });
  });
}

module.exports = {
  overlayImage,
  addText,
};
