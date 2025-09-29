import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv({path: ".env.local"});
const sandBoxHost = "https://api.sandbox.co.in"; // replace if diff

const getSandboxAccessToken = async () => {
  try {
    const sessionResponse = await axios.post(
      `${sandBoxHost}/authenticate`,
      {}, // empty body
      {
        headers: {
          "x-api-key": "key_live_86bff558c61746408c3c6b924151b268",
          "x-api-secret": "secret_live_e8f2872e3ac5480fbcc8cc94d57d67f2", // replace with actual secret
          "x-api-version": "1.0.0",
          accept: "application/json",
        },
      }
    );

    return sessionResponse.data?.data?.access_token;
  } catch (error) {
    if (error.response) {
      console.error(
        "❌ Sandbox auth failed:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("❌ Sandbox auth failed:", error.message);
    }
  }
};

const getAdhharOtp = async () => {
  const data = {
    "@entity": "in.co.sandbox.kyc.aadhaar.okyc.otp.request",
    "aadhaar_number": "942316904142",
    "consent": "Y",
    "reason": "we are making a web3 based tourist app",
  };

  // Step 1: Authenticate and get access token
  const accessToken = await getSandboxAccessToken();
  try {
    const result = await axios.post(
      `${sandBoxHost}/kyc/aadhaar/okyc/otp`,
      data,
      {
        headers: {
            "content-type": "application/json",
            "Authorization": accessToken,
            "x-api-key": process.env.DIGILOKER_API_KEY,
            "x-api-version": "1.0.0",
            accept: "application/json",
        },
      }
    );
    const refernceId = result.data.data.reference_id;
    return refernceId;
  } catch (error) {
    console.error("Aadhaar OTP request failed:", error);
    
  }
};
getAdhharOtp();