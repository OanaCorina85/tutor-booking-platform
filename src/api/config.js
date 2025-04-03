import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const variables = {
  firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseUrl: import.meta.env.VITE_DATABASE_URL,
  authApiUrl: import.meta.env.VITE_AUTH_API_URL,
};

console.log("Environment Variables:", variables);

const dbInstance = axios.create({
  baseURL: variables.databaseUrl,
  timeout: 1000,
});

const authInstance = axios.create({
  baseURL: variables.authApiUrl,
  timeout: 1000,
  params: {
    key: variables.firebaseApiKey,
  },
});

export { dbInstance, authInstance };
