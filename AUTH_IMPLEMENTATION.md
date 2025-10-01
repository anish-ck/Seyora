# Mobile Authentication Implementation

This document outlines the authentication system implemented for the Seyora mobile app, mirroring the web application's login and signup functionality.

## Overview

The mobile app implements a similar authentication flow to the web version:
- Email-based authentication with OTP verification
- Google OAuth integration (ready for implementation)
- Secure token storage using Expo SecureStore
- Context-based state management

## Architecture

### Components Structure
```
app/
├── (auth)/
│   ├── _layout.tsx          # Auth layout wrapper
│   └── login.tsx            # Main authentication screen
├── (tabs)/
│   └── index.tsx            # Protected home screen
├── index.tsx                # App entry point with auth routing
└── _layout.tsx              # Root layout with providers

components/
├── ui/
│   ├── button.tsx           # Reusable button component
│   ├── input.tsx            # Form input component
│   └── otp-input.tsx        # OTP input component
└── otp-modal.tsx            # OTP verification modal

lib/
├── auth-constants.ts        # Validation schemas and constants
├── auth-context.tsx         # Authentication context provider
└── utils.ts                 # Utility functions
```

## Features Implemented

### 1. Email Authentication
- Email validation using Zod schemas
- OTP-based verification
- Automatic sign-in/sign-up flow detection
- Error handling and user feedback

### 2. UI Components
- **Custom Button**: Gradient styling, loading states, variants
- **Custom Input**: Focus states, error handling, validation
- **OTP Input**: 6-digit code input with auto-focus
- **OTP Modal**: Full-screen modal with timer and validation

### 3. Authentication Context
- Secure token storage using Expo SecureStore
- User state management
- Authentication methods (signIn, signUp, signOut, googleSignIn)
- Loading states and error handling

### 4. Visual Design
- Matches web app's purple/pink gradient theme
- Glassmorphism effects with backdrop blur
- Responsive design for mobile screens
- Smooth animations and transitions

## Installation

1. Install required dependencies:
```bash
cd seyora-mobile/Seyora
npm install @clerk/clerk-expo expo-secure-store expo-web-browser react-hook-form @hookform/resolvers zod react-native-toast-message expo-linear-gradient
```

2. The authentication system is ready to use with mock implementations.

## Integration with Clerk

To integrate with Clerk (matching the web app):

1. **Install Clerk Expo SDK**:
```bash
npm install @clerk/clerk-expo
```

2. **Update auth-context.tsx**:
Replace mock functions with actual Clerk methods:
```typescript
import { useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/clerk-expo';
```

3. **Configure Clerk Provider**:
Add Clerk provider to `_layout.tsx`:
```typescript
import { ClerkProvider } from '@clerk/clerk-expo';

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey="your-clerk-publishable-key">
      {/* existing providers */}
    </ClerkProvider>
  );
}
```

## Usage

### Authentication Flow
1. User enters email on login screen
2. System attempts sign-in, falls back to sign-up if needed
3. OTP modal appears for verification
4. Upon successful verification, user is redirected to main app
5. Authentication state is persisted securely

### Protected Routes
The app automatically redirects unauthenticated users to the login screen and authenticated users to the main app.

### Sign Out
Users can sign out from the home screen, which clears stored tokens and redirects to login.

## Customization

### Styling
- Colors and themes are defined in `lib/auth-constants.ts`
- Component styles can be modified in individual component files
- Gradient colors match the web app's design system

### Validation
- Form validation schemas are in `lib/auth-constants.ts`
- Uses Zod for type-safe validation
- Error messages are user-friendly and contextual

## Security Features

- Secure token storage using Expo SecureStore
- Input validation and sanitization
- OTP timeout (5 minutes)
- Automatic session management
- Error handling without exposing sensitive information

## Testing

The implementation includes mock authentication functions for testing:
- Use any email format for testing
- Use OTP code "123456" for successful verification
- All other OTP codes will show error messages

## Next Steps

1. **Replace Mock Functions**: Integrate with actual Clerk authentication
2. **Add Biometric Auth**: Implement fingerprint/face ID for quick access
3. **Offline Support**: Handle authentication state when offline
4. **Push Notifications**: Add OTP delivery via push notifications
5. **Social Logins**: Expand beyond Google to include Apple, Facebook, etc.

## Troubleshooting

### Common Issues
1. **Gradient not showing**: Ensure `expo-linear-gradient` is installed
2. **SecureStore errors**: Check device compatibility and permissions
3. **Navigation issues**: Verify route structure matches file organization
4. **OTP modal not appearing**: Check state management and modal visibility logic

### Debug Mode
Enable console logging in auth-context.tsx to debug authentication flows.