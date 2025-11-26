import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  disabled?: boolean;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 13],
    }),
    color: isFocused ? '#007AFF' : '#999',
  };

  const handleChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    setIsFocused(false);
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            if (!disabled) {
              setIsFocused(true);
              setShow(true);
            }
          }}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.textValue,
              !value && { color: '#999' },
              disabled && { color: '#ccc' },
            ]}
          >
            {value ? value.toDateString() : 'Select date'}
          </Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()} // prevents future DOBs
        />
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'ios' ? 16 : 14,
    paddingBottom: 10,
    position: 'relative',
    minHeight: 52, // ✅ ensures same height as TextInputField
    justifyContent: 'center',
  },
  inputFocused: {
    borderColor: '#007AFF',
  },
  label: {
    position: 'absolute',
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  touchable: {
    justifyContent: 'center',
    paddingVertical: 2,
  },
  textValue: {
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});
