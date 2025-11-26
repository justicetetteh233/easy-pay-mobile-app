import { ButtonPrimary } from '@/components/ButtonPrimary';
import { ErrorText } from '@/components/ErrorText';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { TextInputField } from '@/components/TextInputField';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

interface SecurityInfo {
  username: string;
  password: string;
  fingerprint: string;
  image: string;
}

export default function SecurityInfoScreen() {
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  
  const [securityInfo, setSecurityInfo] = useState<SecurityInfo>({
    username: '',
    password: '',
    fingerprint: '', // Mock data
    image: '', // Mock data
  });
  
  const [errors, setErrors] = useState<Partial<SecurityInfo>>({});

  const validateForm = () => {
    const newErrors: Partial<SecurityInfo> = {};
    if (!securityInfo.username) newErrors.username = 'Username is required';
    if (!securityInfo.password) {
      newErrors.password = 'Password is required';
    } else if (securityInfo.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setGeneralError('');

    try {
      // Navigate to products page without validation
      Alert.alert(
        'Success',
        'Registration complete!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/products'),
          },
        ]
      );
    } catch (error) {
      setGeneralError('An error occurred during registration. Please try again.');
      Alert.alert('Error', 'Failed to complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ProgressIndicator currentStep={2} totalSteps={2} />
        
        <ThemedText style={styles.title}>
          Security Information
        </ThemedText>

        <TextInputField
          label="Username"
          value={securityInfo.username}
          onChangeText={(text) => setSecurityInfo({ ...securityInfo, username: text })}
          error={errors.username}
        />

        <TextInputField
          label="Password"
          value={securityInfo.password}
          onChangeText={(text) => setSecurityInfo({ ...securityInfo, password: text })}
          secureTextEntry
          error={errors.password}
        />

        {/* Mock Fingerprint Input */}
        <TextInputField
          label="Fingerprint Data"
          value="Fingerprint captured"
          onChangeText={() => {}}
          placeholder="Place your finger on the sensor"
          error={errors.fingerprint}
          disabled
        />

        {/* Mock Image Capture */}
        <TextInputField
          label="Image Capture"
          value="Image captured"
          onChangeText={() => {}}
          placeholder="Click to capture image"
          error={errors.image}
          disabled
        />

        {generalError ? <ErrorText message={generalError} /> : null}

        <View style={styles.buttonContainer}>
          <ButtonPrimary
            title="Submit"
            onPress={handleSubmit}
            loading={loading}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
});