import { ButtonPrimary } from '@/components/ButtonPrimary';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

interface LoanFirm {
  id: number;
  name: string;
  logo: string;
  interestRate: string;
}

const loanFirms: LoanFirm[] = [
  {
    id: 1,
    name: 'Fidelity Bank Ghana',
    logo: '🏦',
    interestRate: '12% p.a.',
  },
  {
    id: 2,
    name: 'CalBank',
    logo: '🏛️',
    interestRate: '10% p.a.',
  },
  {
    id: 3,
    name: 'Ecobank Ghana',
    logo: '💳',
    interestRate: '11.5% p.a.',
  },
  {
    id: 4,
    name: 'Absa Bank Ghana',
    logo: '🏪',
    interestRate: '13% p.a.',
  },
  {
    id: 5,
    name: 'Stanbic Bank',
    logo: '🏢',
    interestRate: '9.5% p.a.',
  },
];

const depositOptions = [
  { label: '10%', value: 0.1 },
  { label: '20%', value: 0.2 },
  { label: '30%', value: 0.3 },
  { label: '40%', value: 0.4 },
  { label: '50%', value: 0.5 },
];

export default function CheckoutScreen() {
  const params = useLocalSearchParams();
  const productName = params.name as string;
  const productPrice = params.price as string;
  const productImage = params.image as string;
  const productDescription = params.description as string;

  const [selectedDeposit, setSelectedDeposit] = useState<number | null>(null);
  const [selectedLoanFirm, setSelectedLoanFirm] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Extract numeric price from string (e.g., "GH₵ 15,999" -> 15999)
  const numericPrice = parseFloat(productPrice?.replace(/[^0-9.]/g, '') || '0');

  const calculateAmounts = () => {
    if (selectedDeposit === null) return { deposit: 0, remaining: 0 };
    const depositPercent = depositOptions.find(opt => opt.value === selectedDeposit)?.value || 0;
    const deposit = numericPrice * depositPercent;
    const remaining = numericPrice - deposit;
    return { deposit, remaining };
  };

  const { deposit, remaining } = calculateAmounts();

  const handlePlaceOrder = () => {
    if (selectedDeposit === null) {
      Alert.alert('Error', 'Please select an initial deposit amount');
      return;
    }
    if (selectedLoanFirm === null) {
      Alert.alert('Error', 'Please select a loan firm');
      return;
    }

    setLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Order Placed Successfully! 🎉',
        `Your order for ${productName} has been placed.\n\nInitial Deposit: GH₵ ${deposit.toLocaleString()}\nLoan Amount: GH₵ ${remaining.toLocaleString()}`,
        [
          {
            text: 'OK',
            onPress: () => router.push('/products'),
          },
        ]
      );
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.demoText}>
          📱 Demo: Flexible Payment Options
        </ThemedText>

        {/* Product Summary */}
        <View style={styles.productSummary}>
          <Image
            source={{ uri: productImage }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.productDetails}>
            <ThemedText style={styles.productName}>{productName}</ThemedText>
            <ThemedText style={styles.productDescription}>
              {productDescription}
            </ThemedText>
            <ThemedText style={styles.productPrice}>{productPrice}</ThemedText>
          </View>
        </View>

        {/* Initial Deposit Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Select Initial Deposit
          </ThemedText>
          <View style={styles.depositOptions}>
            {depositOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.depositOption,
                  selectedDeposit === option.value && styles.depositOptionSelected,
                ]}
                onPress={() => setSelectedDeposit(option.value)}
              >
                <ThemedText
                  style={[
                    styles.depositOptionText,
                    selectedDeposit === option.value && styles.depositOptionTextSelected,
                  ]}
                >
                  {option.label}
                </ThemedText>
                {selectedDeposit === option.value && (
                  <ThemedText style={styles.depositAmount}>
                    GH₵ {(numericPrice * option.value).toLocaleString()}
                  </ThemedText>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Summary */}
        {selectedDeposit !== null && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Initial Deposit:</ThemedText>
              <ThemedText style={styles.summaryValue}>
                GH₵ {deposit.toLocaleString()}
              </ThemedText>
            </View>
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Loan Amount:</ThemedText>
              <ThemedText style={styles.summaryValue}>
                GH₵ {remaining.toLocaleString()}
              </ThemedText>
            </View>
          </View>
        )}

        {/* Loan Firm Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Choose Loan Firm</ThemedText>
          {loanFirms.map((firm) => (
            <TouchableOpacity
              key={firm.id}
              style={[
                styles.loanFirmCard,
                selectedLoanFirm === firm.id && styles.loanFirmCardSelected,
              ]}
              onPress={() => setSelectedLoanFirm(firm.id)}
            >
              <View style={styles.loanFirmInfo}>
                <ThemedText style={styles.loanFirmLogo}>{firm.logo}</ThemedText>
                <View style={styles.loanFirmDetails}>
                  <ThemedText style={styles.loanFirmName}>{firm.name}</ThemedText>
                  <ThemedText style={styles.loanFirmRate}>
                    Interest: {firm.interestRate}
                  </ThemedText>
                </View>
              </View>
              {selectedLoanFirm === firm.id && (
                <ThemedText style={styles.checkMark}>✓</ThemedText>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Place Order Button */}
        <View style={styles.buttonContainer}>
          <ButtonPrimary
            title="Place Order"
            onPress={handlePlaceOrder}
            loading={loading}
            disabled={selectedDeposit === null || selectedLoanFirm === null}
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
  demoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#007AFF',
  },
  productSummary: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  productDescription: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 4,
    color: '#000',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  depositOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  depositOption: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  depositOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E8F4FF',
  },
  depositOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  depositOptionTextSelected: {
    color: '#007AFF',
  },
  depositAmount: {
    fontSize: 12,
    marginTop: 4,
    color: '#007AFF',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  loanFirmCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  loanFirmCardSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E8F4FF',
  },
  loanFirmInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  loanFirmLogo: {
    fontSize: 32,
    marginRight: 12,
  },
  loanFirmDetails: {
    flex: 1,
  },
  loanFirmName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  loanFirmRate: {
    fontSize: 14,
    color: '#666',
  },
  checkMark: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
});
