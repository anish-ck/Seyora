import { colors, otpSchema } from '@/lib/auth-constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { Button } from './ui/button';
import { OTPInput } from './ui/otp-input';

interface OTPModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: z.infer<typeof otpSchema>) => Promise<void>;
  email?: string;
  isLoading?: boolean;
}

export const OTPModal: React.FC<OTPModalProps> = ({
  visible,
  onClose,
  onSubmit,
  email,
  isLoading = false,
}) => {
  const [otpValue, setOtpValue] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    if (visible) {
      setOtpValue('');
      setError('');
      setTimeLeft(300);
    }
  }, [visible]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (visible && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setError('OTP has expired. Please request a new code.');
    }
    return () => clearTimeout(timer);
  }, [visible, timeLeft]);

  const handleSubmit = async () => {
    if (otpValue.length !== 6) {
      setError('Please enter a complete 6-digit code');
      return;
    }

    if (timeLeft === 0) {
      setError('OTP has expired. Please request a new code.');
      return;
    }

    setError('');
    try {
      await onSubmit({ otpCode: otpValue });
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setOtpValue('');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.6)" barStyle="light-content" />
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.modal}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text.white} />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Ionicons name="shield-checkmark" size={48} color={colors.primary.cyan} />
              </View>

              <Text style={styles.title}>Verify Your Email</Text>

              <View style={styles.emailContainer}>
                <Text style={styles.subtitle}>
                  We've sent a 6-digit verification code to
                </Text>
                <View style={styles.emailRow}>
                  <Ionicons name="mail" size={16} color={colors.primary.cyan} />
                  <Text style={styles.email}>{email || 'your email'}</Text>
                </View>
              </View>

              {/* Timer */}
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>
                  Code expires in: {formatTime(timeLeft)}
                </Text>
              </View>

              {/* OTP Input */}
              <View style={styles.otpContainer}>
                <OTPInput
                  value={otpValue}
                  onChange={setOtpValue}
                  error={error}
                />
              </View>

              {/* Submit Button */}
              <Button
                title="Verify Code"
                onPress={handleSubmit}
                disabled={otpValue.length !== 6 || isLoading || timeLeft === 0}
                loading={isLoading}
                style={styles.submitButton}
                icon={<Ionicons name="arrow-forward" size={20} color={colors.text.white} />}
              />

              {/* Resend */}
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Didn't receive the code?{' '}
                  <Text style={styles.resendLink}>Resend</Text>
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.background.slate900,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.text.white + '1A', // 10% opacity
    shadowColor: colors.primary.purple,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.text.white + '1A', // 10% opacity
  },
  content: {
    padding: 24,
    paddingTop: 0,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.cyan + '20', // 20% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  emailContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.slate400,
    textAlign: 'center',
    marginBottom: 8,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  email: {
    fontSize: 14,
    color: colors.primary.cyan,
    fontWeight: '500',
  },
  timerContainer: {
    marginBottom: 24,
  },
  timerText: {
    fontSize: 12,
    color: colors.text.slate500,
    textAlign: 'center',
  },
  otpContainer: {
    marginBottom: 32,
  },
  submitButton: {
    width: '100%',
    marginBottom: 16,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 12,
    color: colors.text.slate500,
  },
  resendLink: {
    color: colors.primary.cyan,
    textDecorationLine: 'underline',
  },
});