import axios from "axios";

const variables = {
  firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseUrl: import.meta.env.VITE_DATABASE_URL,
  authApiUrl: import.meta.env.VITE_AUTH_API_URL,
};

const dbInstance = axios.create({
  baseURL: variables.databaseUrl,
  timeout: 1000,
});

const authInstance = axios.create({
  baseURL: variables.authApiUrl,
  timeout: 1000,
  params: {
    // https://identitytoolkit.googleapis.com/v1/accounts:?key=......
    key: variables.firebaseApiKey,
  },
});

export { dbInstance, authInstance };
