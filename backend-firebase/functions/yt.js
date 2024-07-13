const axios = require("axios");
const functions = require("firebase-functions");
const {defineString} = require("firebase-functions/params");
const cors = require("cors")({origin: true});

const apiKey = defineString("YOUTUBE_API_KEY");

exports.query = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const query = request.query.query;
    if (!query) {
      response.status(400).send("Query parameter is required");
      return;
    }

    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${query}&type=video&key=${apiKey.value()}`;

    axios
        .get(url)
        .then((res) => {
          response.send(res.data.items);
        })
        .catch((error) => {
          throw new functions.https.HttpsError("unknown", "YT Query Error", {
            message: error.message,
          });
        });
  });
});
