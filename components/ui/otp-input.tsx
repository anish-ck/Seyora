import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { colors } from '@/lib/auth-constants';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  error,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChangeText = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    const updatedValue = newValue.join('').slice(0, length);
    onChange(updatedValue);

    // Move to next input if text is entered
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputPress = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {Array.from({ length }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleInputPress(index)}
            style={[
              styles.inputWrapper,
              focusedIndex === index && styles.focusedWrapper,
              error && styles.errorWrapper,
            ]}
          >
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={styles.input}
              value={value[index] || ''}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  inputWrapper: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: colors.background.slate800,
    borderRadius: 8,
    backgroundColor: colors.background.slate800 + '80', // 50% opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedWrapper: {
    borderColor: colors.primary.cyan,
    backgroundColor: colors.background.slate800 + 'CC', // 80% opacity
    shadowColor: colors.primary.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  errorWrapper: {
    borderColor: '#ef4444',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.white,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    marginTop: 8,
    textAlign: 'center',
  },
});