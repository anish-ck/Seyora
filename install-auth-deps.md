# Authentication Dependencies Installation

Run the following commands to install the required dependencies for authentication:

```bash
cd seyora-mobile/Seyora
npm install @clerk/clerk-expo expo-secure-store expo-web-browser react-hook-form @hookform/resolvers zod react-native-toast-message expo-linear-gradient
```

These dependencies provide:
- @clerk/clerk-expo: Clerk authentication for React Native/Expo
- expo-secure-store: Secure storage for tokens
- expo-web-browser: For OAuth flows
- react-hook-form: Form handling
- @hookform/resolvers: Zod integration for forms
- zod: Schema validation (already installed)
- react-native-toast-message: Toast notifications
- expo-linear-gradient: Gradient backgrounds