import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { colors } from '@/lib/auth-constants';

const registrationSchema = z.object({
    fullName: z.string().min(3, 'Full name is required'),
    email: z.string().email('Valid email is required'),
    phoneNumber: z.string().min(8, 'Phone number is required'),
    country: z.string().min(2, 'Country is required'),
    passportNumber: z.string().min(6, 'Passport number is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    tripStartDate: z.string().min(1, 'Trip start date is required'),
    tripEndDate: z.string().min(1, 'Trip end date is required'),
    accommodation: z.string().optional(),
    emergencyContactName: z.string().min(3, 'Emergency contact name is required'),
    emergencyContactPhone: z.string().min(8, 'Emergency contact phone is required'),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function RegisterTouristScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm<RegistrationForm>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            country: '',
            passportNumber: '',
            dateOfBirth: '',
            tripStartDate: '',
            tripEndDate: '',
            accommodation: '',
            emergencyContactName: '',
            emergencyContactPhone: '',
        },
    });

    const onSubmit = async (data: RegistrationForm) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            Alert.alert(
                'Success!',
                'Tourist registered successfully. NFT ID will be generated shortly.',
                [{ text: 'OK', onPress: () => console.log('Registration completed') }]
            );

            console.log('Registration data:', data);
        } catch (error) {
            Alert.alert('Error', 'Failed to register tourist. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = async () => {
        const fieldsToValidate = getFieldsForStep(currentStep);
        const isValid = await trigger(fieldsToValidate);

        if (isValid && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const getFieldsForStep = (step: number): (keyof RegistrationForm)[] => {
        switch (step) {
            case 1:
                return ['fullName', 'email', 'phoneNumber', 'country'];
            case 2:
                return ['passportNumber', 'dateOfBirth', 'tripStartDate', 'tripEndDate'];
            case 3:
                return ['emergencyContactName', 'emergencyContactPhone'];
            default:
                return [];
        }
    };

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
            {Array.from({ length: totalSteps }, (_, index) => (
                <View key={index} style={styles.stepContainer}>
                    <View style={[
                        styles.stepCircle,
                        index + 1 <= currentStep && styles.activeStepCircle
                    ]}>
                        {index + 1 < currentStep ? (
                            <Ionicons name="checkmark" size={16} color={colors.text.white} />
                        ) : (
                            <Text style={[
                                styles.stepNumber,
                                index + 1 <= currentStep && styles.activeStepNumber
                            ]}>
                                {index + 1}
                            </Text>
                        )}
                    </View>
                    {index < totalSteps - 1 && (
                        <View style={[
                            styles.stepLine,
                            index + 1 < currentStep && styles.activeStepLine
                        ]} />
                    )}
                </View>
            ))}
        </View>
    );

    const renderStep1 = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Personal Information</Text>
            <Text style={styles.stepDescription}>
                Please provide your basic personal details
            </Text>

            <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.fullName?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.email?.message}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                )}
            />

            <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.phoneNumber?.message}
                        keyboardType="phone-pad"
                    />
                )}
            />

            <Controller
                control={control}
                name="country"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Country"
                        placeholder="Enter your country"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.country?.message}
                    />
                )}
            />
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Travel Information</Text>
            <Text style={styles.stepDescription}>
                Please provide your travel and identification details
            </Text>

            <Controller
                control={control}
                name="passportNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Passport Number"
                        placeholder="Enter your passport number"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.passportNumber?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Date of Birth"
                        placeholder="YYYY-MM-DD"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.dateOfBirth?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="tripStartDate"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Trip Start Date"
                        placeholder="YYYY-MM-DD"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.tripStartDate?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="tripEndDate"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Trip End Date"
                        placeholder="YYYY-MM-DD"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.tripEndDate?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="accommodation"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Accommodation (Optional)"
                        placeholder="Hotel name or address"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.accommodation?.message}
                    />
                )}
            />
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Emergency Contact</Text>
            <Text style={styles.stepDescription}>
                Please provide emergency contact information
            </Text>

            <Controller
                control={control}
                name="emergencyContactName"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Emergency Contact Name"
                        placeholder="Enter contact name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactName?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="emergencyContactPhone"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Emergency Contact Phone"
                        placeholder="Enter contact phone number"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactPhone?.message}
                        keyboardType="phone-pad"
                    />
                )}
            />

            <LinearGradient
                colors={[colors.primary.purple + '20', colors.primary.cyan + '20']}
                style={styles.summaryCard}
            >
                <View style={styles.summaryHeader}>
                    <Ionicons name="information-circle" size={24} color={colors.primary.cyan} />
                    <Text style={styles.summaryTitle}>What happens next?</Text>
                </View>
                <Text style={styles.summaryText}>
                    • Your information will be verified{'\n'}
                    • A unique NFT tourist ID will be generated{'\n'}
                    • You'll receive a QR code for verification{'\n'}
                    • Tourist status will be activated
                </Text>
            </LinearGradient>
        </View>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            default:
                return renderStep1();
        }
    };

    return (
        <DashboardLayout
            title="Register Tourist"
            rightAction={{
                icon: 'help-circle',
                onPress: () => Alert.alert('Help', 'Fill out all required fields to register a new tourist.')
            }}
        >
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Step Indicator */}
                <View style={styles.header}>
                    {renderStepIndicator()}
                </View>

                {/* Form Content */}
                <View style={styles.formContainer}>
                    {renderCurrentStep()}
                </View>

                {/* Navigation Buttons */}
                <View style={styles.navigationContainer}>
                    <View style={styles.buttonRow}>
                        {currentStep > 1 && (
                            <Button
                                title="Previous"
                                onPress={prevStep}
                                variant="outline"
                                style={styles.navButton}
                                icon={<Ionicons name="chevron-back" size={20} color={colors.primary.purple} />}
                            />
                        )}

                        {currentStep < totalSteps ? (
                            <Button
                                title="Next"
                                onPress={nextStep}
                                style={currentStep === 1 ? styles.fullWidthButton : styles.navButton}
                                icon={<Ionicons name="chevron-forward" size={20} color={colors.text.white} />}
                            />
                        ) : (
                            <Button
                                title="Register Tourist"
                                onPress={handleSubmit(onSubmit)}
                                loading={isLoading}
                                style={styles.navButton}
                                icon={<Ionicons name="checkmark" size={20} color={colors.text.white} />}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </DashboardLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.dark,
    },
    header: {
        padding: 20,
        paddingBottom: 16,
    },
    stepIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.background.slate800,
        borderWidth: 2,
        borderColor: colors.border.purple500 + '40',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeStepCircle: {
        backgroundColor: colors.primary.purple,
        borderColor: colors.primary.purple,
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text.slate400,
    },
    activeStepNumber: {
        color: colors.text.white,
    },
    stepLine: {
        width: 40,
        height: 2,
        backgroundColor: colors.border.purple500 + '40',
        marginHorizontal: 8,
    },
    activeStepLine: {
        backgroundColor: colors.primary.purple,
    },
    formContainer: {
        paddingHorizontal: 20,
    },
    stepContent: {
        marginBottom: 24,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text.white,
        marginBottom: 8,
    },
    stepDescription: {
        fontSize: 16,
        color: colors.text.slate400,
        marginBottom: 24,
        lineHeight: 22,
    },
    summaryCard: {
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border.purple500 + '20',
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.white,
    },
    summaryText: {
        fontSize: 14,
        color: colors.text.slate400,
        lineHeight: 20,
    },
    navigationContainer: {
        padding: 20,
        paddingTop: 0,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    navButton: {
        flex: 1,
    },
    fullWidthButton: {
        flex: 1,
        width: '100%',
    },
});