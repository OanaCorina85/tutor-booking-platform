import { authInstance } from "./config.js";

const userEntity = {
  // Tip: Register
  signUp: async (payload) => {
    try {
      // Tip: payload example = { email: "john@myemail.com", password: "....." }
      const response = await authInstance.post("/accounts:signUp", {
        ...payload,
        returnSecureToken: true,
      });
      return {
        data: {
          idToken: response.data.idToken,
          email: response.data.email,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          localId: response.data.localId,
        },
        success: true,
      };
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  },
  signIn: async (payload) => {
    try {
      const response = await authInstance.post("/accounts:signInWithPassword", {
        ...payload,
        returnSecureToken: true,
      });
      return {
        data: {
          idToken: response.data.idToken,
          email: response.data.email,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          localId: response.data.localId,
        },
        success: true,
      };
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  },
};

export default userEntity;
