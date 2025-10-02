import { useAuth, useSignIn, useSignUp, useSSO } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OTPModal } from '@/components/otp-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { colors, formSchema, otpSchema } from '@/lib/auth-constants';
import { z } from 'zod';

// Configure WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const {
    signIn,
    isLoaded: signInLoaded,
    setActive: setSignInActive,
  } = useSignIn();
  const {
    signUp,
    isLoaded: signUpLoaded,
    setActive: setSignUpActive,
  } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [authFlow, setAuthFlow] = useState<"sign-in" | "sign-up">("sign-in");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Redirect if already signed in
  React.useEffect(() => {
    if (authLoaded && isSignedIn) {
      router.replace("/(tabs)");
    }
  }, [authLoaded, isSignedIn]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!signInLoaded || !signUpLoaded) return;

    setIsLoading(true);
    setCurrentEmail(data.email);

    try {
      // Try sign-in first
      try {
        const signInResult = await signIn.create({
          identifier: data.email,
          strategy: "email_code",
        });

        console.log("Sign-in attempt result:", signInResult);
        setAuthFlow("sign-in");
        setShowOTPModal(true);
      } catch (signInError: any) {
        console.log("Sign-in failed, trying sign-up:", signInError);

        // If sign-in fails, try sign-up
        try {
          const signUpResult = await signUp.create({
            emailAddress: data.email,
          });

          await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          });

          console.log("Sign-up attempt result:", signUpResult);
          setAuthFlow("sign-up");
          setShowOTPModal(true);
        } catch (signUpError: any) {
          console.log("Sign-up error:", signUpError);
          const errorMessage =
            signUpError.errors?.[0]?.message ||
            "Authentication failed. Please try again.";
          Alert.alert("Error", errorMessage);
        }
      }
    } catch (error: any) {
      console.log("General error:", error);
      Alert.alert(
        "Error",
        error.message || "Network error. Please check your connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (otpData: z.infer<typeof otpSchema>) => {
    if (!signInLoaded || !signUpLoaded) return;

    try {
      if (authFlow === "sign-in" && signIn) {
        const result = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: otpData.otpCode,
        });

        if (result.status === "complete") {
          await setSignInActive({ session: result.createdSessionId });
          setShowOTPModal(false);
          router.replace("/(tabs)");
        }
      } else if (authFlow === "sign-up" && signUp) {
        const result = await signUp.attemptEmailAddressVerification({
          code: otpData.otpCode,
        });

        if (result.status === "complete") {
          await setSignUpActive({ session: result.createdSessionId });
          setShowOTPModal(false);
          router.replace("/(tabs)");
        }
      }
    } catch (error: any) {
      console.log("OTP verification error:", error);
      const errorMessage =
        error.errors?.[0]?.message || "Verification failed. Please try again.";
      throw new Error(errorMessage);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google", // ✅ strategy goes here now
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        console.log("✅ Signed in with Google");
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error("Google sign-in error", err);
      Alert.alert("Error", "Google login failed. Please try again.");
    }
  };

  if (!authLoaded || !signInLoaded || !signUpLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.purple} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          colors.background.darker,
          colors.background.dark,
          colors.primary.purple + "20",
        ]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Background decorative elements */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />

            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Ionicons name="globe" size={32} color={colors.text.white} />
                <Text style={styles.logoText}>Truvenia</Text>
              </View>
              <Text style={styles.title}>Register Account</Text>
              <Text style={styles.subtitle}>
                Begin your secure Web3 adventure today.
              </Text>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
              <LinearGradient
                colors={[
                  colors.primary.purple + "50",
                  colors.primary.pink + "50",
                ]}
                style={styles.formGradientBorder}
              >
                <View style={styles.formContent}>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Email Address"
                        placeholder="Enter your email address"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.email?.message}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                      />
                    )}
                  />

                  <Button
                    title="Sign In"
                    onPress={handleSubmit(onSubmit)}
                    loading={isLoading}
                    style={styles.submitButton}
                    icon={
                      <Ionicons
                        name="arrow-forward"
                        size={20}
                        color={colors.text.white}
                      />
                    }
                  />

                  {/* Divider */}
                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Google Sign In */}
                  <Button
                    title="Continue with Google"
                    onPress={handleGoogleAuth}
                    loading={isGoogleLoading}
                    variant="outline"
                    style={styles.googleButton}
                    icon={
                      <Ionicons
                        name="logo-google"
                        size={20}
                        color={colors.primary.purple}
                      />
                    }
                  />
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* OTP Modal */}
        <OTPModal
          visible={showOTPModal}
          onClose={() => setShowOTPModal(false)}
          onSubmit={handleOTPSubmit}
          email={currentEmail}
          isLoading={isLoading}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.dark,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  decorativeCircle1: {
    position: "absolute",
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary.purple + "20",
    opacity: 0.3,
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -80,
    left: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primary.pink + "20",
    opacity: 0.3,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 60,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.white,
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.white,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.purple200,
    textAlign: "center",
    opacity: 0.8,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  formGradientBorder: {
    padding: 1,
    borderRadius: 24,
  },
  formContent: {
    backgroundColor: colors.background.slate900 + "F0", // 95% opacity
    borderRadius: 23,
    padding: 32,
    borderWidth: 1,
    borderColor: colors.border.purple400 + "33", // 20% opacity
  },
  submitButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.purple500 + "4D", // 30% opacity
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.text.purple300,
    opacity: 0.7,
  },
  googleButton: {
    borderColor: colors.border.purple500,
  },
});
