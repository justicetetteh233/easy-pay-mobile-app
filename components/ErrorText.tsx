import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface ErrorTextProps {
  message: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
  return message ? <Text style={styles.error}>{message}</Text> : null;
};

const styles = StyleSheet.create({
  error: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
  },
});