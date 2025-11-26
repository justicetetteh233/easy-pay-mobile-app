import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
} from 'react-native';

interface TextInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  placeholder,
  disabled = false,
}) => {
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

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          placeholder={isFocused ? placeholder : ''}
          placeholderTextColor="#aaa"
        />
      </View>
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
  input: {
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
