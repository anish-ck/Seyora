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

const registrationSchema = z
    .object({
        fullName: z.string().min(3, 'Full name is required'),
        DOB: z.date({ required_error: 'Date of birth is required' }),
        idType: z.enum(['adhaarCard', 'panCard']),
        adhaarCardValue: z.number().optional(),
        panCardValue: z
            .object({
                panNo: z.string().optional(),
                dateOfBirth: z.string().optional(),
                name: z.string().optional(),
            })
            .optional(),
        phoneNumber: z.string().min(8, 'Phone number is required'),
        email: z.string().email('Valid email is required'),
        emergencyContactOne: z.object({
            phoneNumber: z.string().min(8, 'Contact phone number is required'),
            name: z.string().min(3, 'Minimum three letters required'),
            relation: z.string().min(3, 'Minimum three letters required'),
        }),
        emergencyContactTwo: z
            .object({
                phoneNumber: z.string().optional(),
                name: z.string().optional(),
                relation: z.string().optional(),
            })
            .optional(),
        tripStart: z.date({ required_error: 'Trip start date is required' }),
        tripEnd: z.date({ required_error: 'Trip end date is required' }),
        accomodation: z.string().optional(),
        tripPurpose: z.enum(['travel', 'buisness', 'other']),
        tripDetails: z.string().optional(),
        tripState: z.string().min(2, 'State is required'),
        tripCity: z.string().min(1, 'City is required'),
        healthInfo: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.idType === 'adhaarCard') {
            if (!data.adhaarCardValue) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Aadhaar Card number is required',
                    path: ['adhaarCardValue'],
                });
            }
        }
        if (data.idType === 'panCard') {
            if (!data.panCardValue?.panNo || data.panCardValue.panNo.length < 1) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'PAN number is required',
                    path: ['panCardValue.panNo'],
                });
            }
            if (!data.panCardValue?.name || data.panCardValue.name.length < 1) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Name on PAN Card is required',
                    path: ['panCardValue.name'],
                });
            }
            if (
                !data.panCardValue?.dateOfBirth ||
                data.panCardValue.dateOfBirth.length < 1
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Date of Birth on PAN Card is required',
                    path: ['panCardValue.dateOfBirth'],
                });
            }
        }
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
            DOB: new Date(),
            idType: 'panCard',
            adhaarCardValue: undefined,
            panCardValue: {
                panNo: '',
                dateOfBirth: '',
                name: '',
            },
            phoneNumber: '',
            email: '',
            emergencyContactOne: {
                phoneNumber: '',
                name: '',
                relation: '',
            },
            emergencyContactTwo: {
                phoneNumber: '',
                name: '',
                relation: '',
            },
            tripStart: new Date(),
            tripEnd: new Date(),
            accomodation: '',
            tripPurpose: 'travel',
            tripDetails: '',
            tripState: '',
            tripCity: '',
            healthInfo: '',
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
                return ['fullName', 'email', 'phoneNumber', 'DOB'];
            case 2:
                return ['idType', 'adhaarCardValue', 'panCardValue', 'tripStart', 'tripEnd', 'tripPurpose', 'tripState', 'tripCity'];
            case 3:
                return ['emergencyContactOne'];
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

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date of Birth</Text>
                <Controller
                    control={control}
                    name="DOB"
                    render={({ field: { onChange, value } }) => (
                        <TouchableOpacity
                            style={[styles.dateInput, errors.DOB && styles.inputError]}
                            onPress={() => {
                                // You can implement a date picker here
                                Alert.alert('Date Picker', 'Date picker implementation needed');
                            }}
                        >
                            <Text style={styles.dateText}>
                                {value ? value.toLocaleDateString() : 'Select date of birth'}
                            </Text>
                            <Ionicons name="calendar" size={20} color={colors.text.slate400} />
                        </TouchableOpacity>
                    )}
                />
                {errors.DOB && (
                    <Text style={styles.errorText}>{errors.DOB.message}</Text>
                )}
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>ID Verification & Trip Details</Text>
            <Text style={styles.stepDescription}>
                Please provide your identification and travel details
            </Text>

            {/* ID Type Selection */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>ID Type</Text>
                <Controller
                    control={control}
                    name="idType"
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.radioContainer}>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => onChange('panCard')}
                            >
                                <View style={[styles.radioCircle, value === 'panCard' && styles.radioSelected]}>
                                    {value === 'panCard' && <View style={styles.radioInner} />}
                                </View>
                                <Text style={styles.radioText}>PAN Card</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => onChange('adhaarCard')}
                            >
                                <View style={[styles.radioCircle, value === 'adhaarCard' && styles.radioSelected]}>
                                    {value === 'adhaarCard' && <View style={styles.radioInner} />}
                                </View>
                                <Text style={styles.radioText}>Aadhaar Card</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            {/* Conditional ID Fields */}
            <Controller
                control={control}
                name="idType"
                render={({ field: { value: idType } }) => (
                    <>
                        {idType === 'panCard' && (
                            <>
                                <Controller
                                    control={control}
                                    name="panCardValue.panNo"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label="PAN Number"
                                            placeholder="Enter PAN number"
                                            value={value || ''}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            error={errors.panCardValue?.panNo?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="panCardValue.name"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label="Name on PAN Card"
                                            placeholder="Enter name as on PAN card"
                                            value={value || ''}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            error={errors.panCardValue?.name?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="panCardValue.dateOfBirth"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label="Date of Birth on PAN Card"
                                            placeholder="DD/MM/YYYY"
                                            value={value || ''}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            error={errors.panCardValue?.dateOfBirth?.message}
                                        />
                                    )}
                                />
                            </>
                        )}
                        {idType === 'adhaarCard' && (
                            <Controller
                                control={control}
                                name="adhaarCardValue"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        label="Aadhaar Number"
                                        placeholder="Enter 12-digit Aadhaar number"
                                        value={value?.toString() || ''}
                                        onChangeText={(text) => onChange(parseInt(text) || undefined)}
                                        onBlur={onBlur}
                                        error={errors.adhaarCardValue?.message}
                                        keyboardType="numeric"
                                    />
                                )}
                            />
                        )}
                    </>
                )}
            />

            {/* Trip Dates */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Trip Start Date</Text>
                <Controller
                    control={control}
                    name="tripStart"
                    render={({ field: { onChange, value } }) => (
                        <TouchableOpacity
                            style={[styles.dateInput, errors.tripStart && styles.inputError]}
                            onPress={() => {
                                Alert.alert('Date Picker', 'Date picker implementation needed');
                            }}
                        >
                            <Text style={styles.dateText}>
                                {value ? value.toLocaleDateString() : 'Select trip start date'}
                            </Text>
                            <Ionicons name="calendar" size={20} color={colors.text.slate400} />
                        </TouchableOpacity>
                    )}
                />
                {errors.tripStart && (
                    <Text style={styles.errorText}>{errors.tripStart.message}</Text>
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Trip End Date</Text>
                <Controller
                    control={control}
                    name="tripEnd"
                    render={({ field: { onChange, value } }) => (
                        <TouchableOpacity
                            style={[styles.dateInput, errors.tripEnd && styles.inputError]}
                            onPress={() => {
                                Alert.alert('Date Picker', 'Date picker implementation needed');
                            }}
                        >
                            <Text style={styles.dateText}>
                                {value ? value.toLocaleDateString() : 'Select trip end date'}
                            </Text>
                            <Ionicons name="calendar" size={20} color={colors.text.slate400} />
                        </TouchableOpacity>
                    )}
                />
                {errors.tripEnd && (
                    <Text style={styles.errorText}>{errors.tripEnd.message}</Text>
                )}
            </View>

            {/* Trip Purpose */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Trip Purpose</Text>
                <Controller
                    control={control}
                    name="tripPurpose"
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.radioContainer}>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => onChange('travel')}
                            >
                                <View style={[styles.radioCircle, value === 'travel' && styles.radioSelected]}>
                                    {value === 'travel' && <View style={styles.radioInner} />}
                                </View>
                                <Text style={styles.radioText}>Travel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => onChange('buisness')}
                            >
                                <View style={[styles.radioCircle, value === 'buisness' && styles.radioSelected]}>
                                    {value === 'buisness' && <View style={styles.radioInner} />}
                                </View>
                                <Text style={styles.radioText}>Business</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => onChange('other')}
                            >
                                <View style={[styles.radioCircle, value === 'other' && styles.radioSelected]}>
                                    {value === 'other' && <View style={styles.radioInner} />}
                                </View>
                                <Text style={styles.radioText}>Other</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            <Controller
                control={control}
                name="tripState"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Trip State"
                        placeholder="Enter destination state"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.tripState?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="tripCity"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Trip City"
                        placeholder="Enter destination city"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.tripCity?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="tripDetails"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Trip Details (Optional)"
                        placeholder="Additional trip information"
                        value={value || ''}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.tripDetails?.message}
                        multiline
                        numberOfLines={3}
                    />
                )}
            />

            <Controller
                control={control}
                name="accomodation"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Accommodation (Optional)"
                        placeholder="Hotel name or address"
                        value={value || ''}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.accomodation?.message}
                    />
                )}
            />
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Emergency Contacts & Health Info</Text>
            <Text style={styles.stepDescription}>
                Please provide emergency contact information and health details
            </Text>

            {/* Primary Emergency Contact */}
            <Text style={styles.sectionTitle}>Primary Emergency Contact</Text>
            <Controller
                control={control}
                name="emergencyContactOne.name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Contact Name"
                        placeholder="Enter contact name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactOne?.name?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="emergencyContactOne.phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Contact Phone"
                        placeholder="Enter contact phone number"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactOne?.phoneNumber?.message}
                        keyboardType="phone-pad"
                    />
                )}
            />

            <Controller
                control={control}
                name="emergencyContactOne.relation"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Relationship"
                        placeholder="e.g., Father, Mother, Spouse"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactOne?.relation?.message}
                    />
                )}
            />

            {/* Secondary Emergency Contact */}
            <Text style={styles.sectionTitle}>Secondary Emergency Contact (Optional)</Text>
            <Controller
                control={control}
                name="emergencyContactTwo.name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Contact Name"
                        placeholder="Enter contact name"
                        value={value || ''}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactTwo?.name?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="emergencyContactTwo.phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Contact Phone"
                        placeholder="Enter contact phone number"
                        value={value || ''}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactTwo?.phoneNumber?.message}
                        keyboardType="phone-pad"
                    />
                )}
            />

            <Controller
                control={control}
                name="emergencyContactTwo.relation"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Relationship"
                        placeholder="e.g., Brother, Sister, Friend"
                        value={value || ''}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.emergencyContactTwo?.relation?.message}
                    />
                )}
            />

            {/* Health Information */}
            <Controller
                control={control}
                name="healthInfo"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Health Information (Optional)"
                        placeholder="Any medical conditions, allergies, or important health information"
                        value={value || ''}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.healthInfo?.message}
                        multiline
                        numberOfLines={4}
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
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.white,
        marginBottom: 8,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.background.slate800,
        borderWidth: 1,
        borderColor: colors.border.purple500 + '40',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        minHeight: 50,
    },
    dateText: {
        fontSize: 16,
        color: colors.text.white,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        fontSize: 14,
        color: '#ef4444',
        marginTop: 4,
    },
    radioContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 8,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.border.purple500 + '40',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        borderColor: colors.primary.purple,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary.purple,
    },
    radioText: {
        fontSize: 16,
        color: colors.text.white,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.white,
        marginTop: 24,
        marginBottom: 16,
    },
});