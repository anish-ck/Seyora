import React, { useState } from 'react';
import { 
  TextInput, 
  View, 
  Text, 
  StyleSheet, 
  TextInputProps 
} from 'react-native';
import { colors } from '@/lib/auth-constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        isFocused && styles.focusedContainer,
        error && styles.errorContainer
      ]}>
        <TextInput
          style={[styles.input, style]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.text.slate400}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.purple100,
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.border.purple500 + '4D', // 30% opacity
    borderRadius: 12,
    backgroundColor: colors.background.slate900 + 'CC', // 80% opacity
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  focusedContainer: {
    borderColor: colors.primary.purple,
    shadowColor: colors.primary.purple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  errorContainer: {
    borderColor: '#ef4444',
  },
  input: {
    fontSize: 16,
    color: colors.text.white,
    paddingVertical: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    marginTop: 4,
  },
});