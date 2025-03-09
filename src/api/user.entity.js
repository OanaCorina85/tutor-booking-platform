import { authInstance } from "./config";

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
      console.log(`[API]: Failed to register user. Error: ${error.message}`);
      return {
        data: null,
        success: false,
      };
    }
  },
  // Tip: Login
  signIn: async (payload) => {
    try {
      //   Tip: payload example = { email: "john@myemail.com", password: "....." }
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
          registered: response.data.registered,
        },
        success: true,
      };
    } catch (error) {
      console.log(`[API]: Failed to login user. Error: ${error.message}`);
      return {
        data: null,
        success: false,
      };
    }
  },
};

export default userEntity;
