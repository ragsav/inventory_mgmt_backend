require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("../firebase-key.json");
const Logger = require("../utils/logger");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore(firebaseApp);
const messaging = admin.messaging(firebaseApp);

Logger.log("success", { message: "configureFirebase : firebase app configured", params: { firebaseApp: firebaseApp.options.credential.projectId } });

module.exports = { firebaseApp, firestore, messaging };
