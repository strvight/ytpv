/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { initializeApp } = require("firebase-admin/app");

initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const yt = require("./yt");
exports.ytQuery = yt.query;

const storage = require("./utils/storage-utils");
exports.downloadImage = storage.downloadImage;

const video = require("./video");
exports.createVideo = video.createVideo;
