import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

const db = getFirestore();

export const poc = functions.https.onRequest((request, response) => {
  db.collection("poc")
    .get()
    .then((docs) => {
      if (!docs.empty) {
        response.send(docs.docs[0]);
      }
    });
});
