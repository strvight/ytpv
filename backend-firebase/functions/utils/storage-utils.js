const {getStorage} = require("firebase-admin/storage");
const path = require("path");
const os = require("os");
const fs = require("fs");

async function downloadImage(filePath) {
  const bucket = getStorage().bucket("gs://ytpv-1559b.appspot.com");

  const downloadResponse = await bucket.file(filePath).download();
  const [metadata] = await bucket.file(filePath).getMetadata();

  const tempFilePath = path.join(os.tmpdir(), `${metadata.name}`);
  fs.writeFileSync(tempFilePath, downloadResponse[0]);

  return {
    imageFilePath: tempFilePath,
    metadata: metadata,
  };
}

module.exports = {
  downloadImage,
};

// exports.downloadImage = functions.https.onRequest(async (req, res) => {
//   try {
//     // Specify the file path you want to download from Firebase Cloud Storage
//     const bucket = getStorage().bucket("gs://ytpv-1559b.appspot.com");

//     // const filePath = req.body.filePath;
//     const filePath = "huh.png";

//     const downloadResponse = await bucket.file(filePath).download();

//     const [metadata] = await bucket.file(filePath).getMetadata();

//     // Send the file content in the response
//     res.set("Content-Type", metadata.contentType);

//     // Send the file content in the response
//     res.send(downloadResponse[0]);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
