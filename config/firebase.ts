import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.API_KEY,
  authDomain: "moneymate-8ad4b.firebaseapp.com",
  projectId: "moneymate-8ad4b",
  storageBucket: Constants.expoConfig?.extra?.STORAGE_BUCKET,
  messagingSenderId: "889374708996",
  appId: Constants.expoConfig?.extra?.APP_ID,
  measurementId: "G-6C233NWPZ7",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firestore = getFirestore(app);
