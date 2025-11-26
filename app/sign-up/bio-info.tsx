import { ButtonPrimary } from '@/components/ButtonPrimary';
import { DatePickerField } from '@/components/DatePickerField';
import { ErrorText } from '@/components/ErrorText';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { TextInputField } from '@/components/TextInputField';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BioInfo {
  firstName: string;
  lastName: string;
  ghanaCard: string;
  dateOfBirth: string;
  hometown: string;
  email: string;
}

export default function BioInfoScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [bioInfo, setBioInfo] = useState<BioInfo>({
    firstName: '',
    lastName: '',
    ghanaCard: '',
    dateOfBirth: '',
    hometown: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<BioInfo>>({});

  const validateForm = () => {
    const newErrors: Partial<BioInfo> = {};
    if (!bioInfo.firstName) newErrors.firstName = 'First name is required';
    if (!bioInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!bioInfo.ghanaCard) newErrors.ghanaCard = 'Ghana Card number is required';
    if (!bioInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!bioInfo.hometown) newErrors.hometown = 'Hometown is required';
    if (!bioInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bioInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    setLoading(true);
    setGeneralError('');

    try {
      // Navigate directly without validation
      router.push('/sign-up/security-info');
    } catch (error) {
      setGeneralError('An error occurred. Please try again.');
      Alert.alert('Error', 'Failed to proceed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 40 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.contentContainer,
              { paddingBottom: insets.bottom + 100 }, // 👈 Extra bottom space
            ]}
            keyboardShouldPersistTaps="handled"
          >
            <ProgressIndicator currentStep={1} totalSteps={2} />

            <ThemedText style={styles.title}>
              Welcome To EasyPay!{'\n'}
              Please provide your bio information.
            </ThemedText>

            <TextInputField
              label="First Name"
              value={bioInfo.firstName}
              onChangeText={(text) => setBioInfo({ ...bioInfo, firstName: text })}
              error={errors.firstName}
            />

            <TextInputField
              label="Last Name"
              value={bioInfo.lastName}
              onChangeText={(text) => setBioInfo({ ...bioInfo, lastName: text })}
              error={errors.lastName}
            />

            <TextInputField
              label="Ghana Card Number"
              value={bioInfo.ghanaCard}
              onChangeText={(text) => setBioInfo({ ...bioInfo, ghanaCard: text })}
              error={errors.ghanaCard}
            />

            <DatePickerField
                label="Date of Birth"
                value={bioInfo.dateOfBirth ? new Date(bioInfo.dateOfBirth) : null}
                onChange={(date) =>
                    setBioInfo({ ...bioInfo, dateOfBirth: date.toISOString() })
                }
                error={errors.dateOfBirth}
            />

            <TextInputField
              label="Hometown"
              value={bioInfo.hometown}
              onChangeText={(text) => setBioInfo({ ...bioInfo, hometown: text })}
              error={errors.hometown}
            />

            <TextInputField
              label="Email"
              value={bioInfo.email}
              onChangeText={(text) => setBioInfo({ ...bioInfo, email: text })}
              error={errors.email}
            />

            {generalError ? <ErrorText message={generalError} /> : null}

            <View style={styles.buttonContainer}>
              <ButtonPrimary title="Next" onPress={handleNext} loading={loading} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingVertical: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 20, // Keeps spacing above keyboard even before adjustment
  },
});
