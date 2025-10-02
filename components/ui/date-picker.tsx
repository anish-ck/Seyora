import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/lib/auth-constants';

interface DatePickerProps {
    label: string;
    value: Date | undefined | null;
    onChange: (date: Date) => void;
    error?: string;
    placeholder?: string;
    minimumDate?: Date;
    maximumDate?: Date;
    mode?: 'date' | 'time' | 'datetime';
}

export function DatePicker({
    label,
    value,
    onChange,
    error,
    placeholder = 'Select date',
    minimumDate,
    maximumDate,
    mode = 'date'
}: DatePickerProps) {
    const [show, setShow] = useState(false);
    
    // Ensure we have a valid date for the picker
    const getValidDate = (date: Date | undefined | null): Date => {
        if (!date) return new Date();
        if (!(date instanceof Date)) return new Date();
        if (isNaN(date.getTime())) return new Date();
        return date;
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShow(Platform.OS === 'ios');
        if (event.type === 'dismissed') {
            return;
        }
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const formatDate = (date: Date) => {
        // Check if date exists and is a valid Date object
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            return placeholder;
        }
        
        try {
            if (mode === 'date') {
                return date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            } else if (mode === 'time') {
                return date.toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } else {
                return date.toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        } catch (error) {
            console.warn('Date formatting error:', error);
            return placeholder;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={[styles.dateInput, error && styles.inputError]}
                onPress={showDatepicker}
            >
                <Text style={[
                    styles.dateText, 
                    (!value || !(value instanceof Date) || isNaN(value.getTime())) && styles.placeholderText
                ]}>
                    {formatDate(value as Date)}
                </Text>
                <Ionicons 
                    name={mode === 'time' ? 'time' : 'calendar'} 
                    size={20} 
                    color={colors.text.slate400} 
                />
            </TouchableOpacity>
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={getValidDate(value)}
                    mode={mode}
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
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
    placeholderText: {
        color: colors.text.slate400,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        fontSize: 14,
        color: '#ef4444',
        marginTop: 4,
    },
});