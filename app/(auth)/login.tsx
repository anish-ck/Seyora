import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OTPModal } from '@/components/otp-modal';
import { formSchema, otpSchema, colors } from '@/lib/auth-constants';
import { useAuth } from '@/lib/auth-context';
import { z } from 'zod';

export default function LoginScreen() {
    const router = useRouter();
    const { signIn, signUp, googleSignIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [authFlow, setAuthFlow] = useState<'sign-in' | 'sign-up'>('sign-in');

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setCurrentEmail(data.email);

        try {
            // For demo purposes, we'll always show OTP modal
            // In real implementation, you'd call your auth service here
            setAuthFlow('sign-in');
            setShowOTPModal(true);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPSubmit = async (otpData: z.infer<typeof otpSchema>) => {
        try {
            if (authFlow === 'sign-in') {
                await signIn(currentEmail, otpData.otpCode);
            } else {
                await signUp(currentEmail, otpData.otpCode);
            }

            setShowOTPModal(false);
            router.replace('/(tabs)');
        } catch (error: any) {
            throw error; // Let OTPModal handle the error display
        }
    };

    const handleGoogleAuth = async () => {
        setIsGoogleLoading(true);
        try {
            await googleSignIn();
            router.replace('/(tabs)');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Google authentication failed. Please try again.');
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[colors.background.darker, colors.background.dark, colors.primary.purple + '20']}
                style={styles.gradient}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                            <Text style={styles.subtitle}>Begin your secure Web3 adventure today.</Text>
                        </View>

                        {/* Form Container */}
                        <View style={styles.formContainer}>
                            <LinearGradient
                                colors={[colors.primary.purple + '50', colors.primary.pink + '50']}
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
                                        icon={<Ionicons name="arrow-forward" size={20} color={colors.text.white} />}
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
                                        icon={<Ionicons name="logo-google" size={20} color={colors.primary.purple} />}
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
        position: 'absolute',
        top: -100,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.primary.purple + '20',
        opacity: 0.3,
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: -80,
        left: -60,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: colors.primary.pink + '20',
        opacity: 0.3,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 60,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.text.white,
        letterSpacing: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text.white,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: colors.text.purple200,
        textAlign: 'center',
        opacity: 0.8,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    formGradientBorder: {
        padding: 1,
        borderRadius: 24,
    },
    formContent: {
        backgroundColor: colors.background.slate900 + 'F0', // 95% opacity
        borderRadius: 23,
        padding: 32,
        borderWidth: 1,
        borderColor: colors.border.purple400 + '33', // 20% opacity
    },
    submitButton: {
        marginBottom: 24,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border.purple500 + '4D', // 30% opacity
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