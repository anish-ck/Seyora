import { createThirdwebClient } from "thirdweb";
import { inAppWallet } from "thirdweb/wallets";
export const client = createThirdwebClient({
  clientId: "eb8716a3a1450e10a39ffbdbca5f9e65",
  secretKey: "hDUBmqNkyN0qo5hxXGhdcYTBOxgD15sTdSVN7TtcQBp_1bEAZSFLYV96WIudLSq-YGRvtOWmuq3Ynx-uvH467A"
});

export const wallet = inAppWallet();

