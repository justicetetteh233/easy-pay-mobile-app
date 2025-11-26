import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 'GH₵ 15,999',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80',
    description: 'Latest iPhone with titanium design',
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    price: 'GH₵ 25,500',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    description: 'Powerful laptop for professionals',
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 'GH₵ 3,499',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&q=80',
    description: 'Active noise cancellation',
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24',
    price: 'GH₵ 12,999',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
    description: 'Flagship Android smartphone',
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    price: 'GH₵ 18,999',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
    description: 'Ultimate creative tool',
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    price: 'GH₵ 4,899',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80',
    description: 'Premium wireless headphones',
  },
  {
    id: 7,
    name: 'Dell XPS 15',
    price: 'GH₵ 22,000',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80',
    description: 'High-performance laptop',
  },
  {
    id: 8,
    name: 'Apple Watch Ultra',
    price: 'GH₵ 9,999',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&q=80',
    description: 'Rugged smartwatch',
  },
];

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  
  // Profile data
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+233 24 123 4567',
    dateOfBirth: '15/03/1990',
    hometown: 'Accra',
    ghanaCard: 'GHA-123456789-0',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '**** **** **** 1234',
    bankName: 'Fidelity Bank Ghana',
    accountType: 'Savings',
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (activeTab === 'profile') {
      return (
        <View style={styles.profileContainer}>
          {/* Profile Picture Section */}
          <View style={styles.profilePictureSection}>
            <View style={styles.profilePicture}>
              <ThemedText style={styles.profileInitials}>JD</ThemedText>
            </View>
            <ThemedText style={styles.profileName}>{profileData.name}</ThemedText>
            <ThemedText style={styles.profileEmail}>{profileData.email}</ThemedText>
          </View>

          {/* Bio Data Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>📋 Bio Data</ThemedText>
              <TouchableOpacity onPress={() => setIsEditingBio(!isEditingBio)}>
                <ThemedText style={styles.editButton}>
                  {isEditingBio ? '✓ Save' : '✏️ Edit'}
                </ThemedText>
              </TouchableOpacity>
            </View>
            <View style={styles.dataCard}>
              <View style={styles.dataRow}>
                <ThemedText style={styles.dataLabel}>Full Name</ThemedText>
                <ThemedText style={styles.dataValue}>{profileData.name}</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText style={styles.dataLabel}>Phone</ThemedText>
                <ThemedText style={styles.dataValue}>{profileData.phone}</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText style={styles.dataLabel}>Date of Birth</ThemedText>
                <ThemedText style={styles.dataValue}>{profileData.dateOfBirth}</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText style={styles.dataLabel}>Hometown</ThemedText>
                <ThemedText style={styles.dataValue}>{profileData.hometown}</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText style={styles.dataLabel}>Ghana Card</ThemedText>
                <ThemedText style={styles.dataValue}>{profileData.ghanaCard}</ThemedText>
              </View>
            </View>
          </View>

          {/* Payment Data Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>💳 Payment Data</ThemedText>
              <TouchableOpacity onPress={() => setIsEditingPayment(!isEditingPayment)}>
                <ThemedText style={styles.editButton}>
                  {isEditingPayment ? '✓ Save' : '✏️ Edit'}
                </ThemedText>
              </TouchableOpacity>
            </View>
            <View style={styles.dataCard}>
              <View style={styles.dataRow}>
                <ThemedText style={styles.dataLabel}>Card Number</ThemedText>
                <ThemedText style={styles.dataValue}>{paymentData.cardNumber}</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText style={styles.dataLabel}>Bank Name</ThemedText>
                <ThemedText style={styles.dataValue}>{paymentData.bankName}</ThemedText>
              </View>
              <View style={styles.dataRow}>
                <ThemedText style={styles.dataLabel}>Account Type</ThemedText>
                <ThemedText style={styles.dataValue}>{paymentData.accountType}</ThemedText>
              </View>
            </View>
          </View>

          {/* Biometric Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>🔐 Security & Biometrics</ThemedText>
            
            <TouchableOpacity style={styles.biometricCard}>
              <View style={styles.biometricIcon}>
                <ThemedText style={styles.biometricEmoji}>👤</ThemedText>
              </View>
              <View style={styles.biometricInfo}>
                <ThemedText style={styles.biometricTitle}>Update Face Profile</ThemedText>
                <ThemedText style={styles.biometricSubtitle}>Last updated 2 days ago</ThemedText>
              </View>
              <ThemedText style={styles.biometricArrow}>›</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.biometricCard}>
              <View style={styles.biometricIcon}>
                <ThemedText style={styles.biometricEmoji}>👆</ThemedText>
              </View>
              <View style={styles.biometricInfo}>
                <ThemedText style={styles.biometricTitle}>Update Fingerprint</ThemedText>
                <ThemedText style={styles.biometricSubtitle}>Last updated 5 days ago</ThemedText>
              </View>
              <ThemedText style={styles.biometricArrow}>›</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (activeTab === 'transactions') {
      return (
        <View style={styles.tabContent}>
          <ThemedText style={styles.tabTitle}>💳 Transactions</ThemedText>
          <ThemedText style={styles.tabText}>Transaction history coming soon...</ThemedText>
        </View>
      );
    }

    if (activeTab === 'settings') {
      return (
        <View style={styles.tabContent}>
          <ThemedText style={styles.tabTitle}>⚙️ Settings</ThemedText>
          <ThemedText style={styles.tabText}>Settings coming soon...</ThemedText>
        </View>
      );
    }

    return (
      <>
        <ThemedText style={styles.subheader}>
          Shop the latest tech with flexible payment options
        </ThemedText>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[styles.productCard, { width: cardWidth }]}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <ThemedText style={styles.productName} numberOfLines={2}>
                  {product.name}
                </ThemedText>
                <ThemedText style={styles.productDescription} numberOfLines={2}>
                  {product.description}
                </ThemedText>
                <ThemedText style={styles.productPrice}>{product.price}</ThemedText>
                <TouchableOpacity 
                  style={styles.buyButton}
                  onPress={() => router.push({
                    pathname: '/checkout',
                    params: {
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      description: product.description,
                    }
                  })}
                >
                  <ThemedText style={styles.buyButtonText}>Buy Now</ThemedText>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  };
  return (
    <ThemedView style={styles.container}>
      {/* Static Header with Search - Only show on products tab */}
      {activeTab === 'products' && (
        <View style={styles.staticHeader}>
          <ThemedText style={styles.headerTitle}>EasyPay</ThemedText>
          <View style={styles.searchContainer}>
            <ThemedText style={styles.searchIcon}>🔍</ThemedText>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      )}

      <ScrollView style={[
        styles.scrollView,
        activeTab !== 'products' && styles.scrollViewWithPadding
      ]}>
        {renderContent()}
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'profile' && styles.tabItemActive]}
          onPress={() => setActiveTab('profile')}
        >
          <View style={[
            styles.iconContainer,
            activeTab === 'profile' && styles.iconContainerActive
          ]}>
            <ThemedText style={styles.tabIcon}>👤</ThemedText>
          </View>
          <ThemedText style={[
            styles.tabLabel,
            activeTab === 'profile' && styles.tabLabelActive
          ]}>
            Profile
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'products' && styles.tabItemActive]}
          onPress={() => setActiveTab('products')}
        >
          <View style={[
            styles.iconContainer,
            activeTab === 'products' && styles.iconContainerActive
          ]}>
            <ThemedText style={styles.tabIcon}>🛍️</ThemedText>
          </View>
          <ThemedText style={[
            styles.tabLabel,
            activeTab === 'products' && styles.tabLabelActive
          ]}>
            Products
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'transactions' && styles.tabItemActive]}
          onPress={() => setActiveTab('transactions')}
        >
          <View>
            <View style={[
              styles.iconContainer,
              activeTab === 'transactions' && styles.iconContainerActive
            ]}>
              <ThemedText style={styles.tabIcon}>💳</ThemedText>
            </View>
            {/* Badge */}
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>4</ThemedText>
            </View>
          </View>
          <ThemedText style={[
            styles.tabLabel,
            activeTab === 'transactions' && styles.tabLabelActive
          ]}>
            Transactions
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'settings' && styles.tabItemActive]}
          onPress={() => setActiveTab('settings')}
        >
          <View style={[
            styles.iconContainer,
            activeTab === 'settings' && styles.iconContainerActive
          ]}>
            <ThemedText style={styles.tabIcon}>⚙️</ThemedText>
          </View>
          <ThemedText style={[
            styles.tabLabel,
            activeTab === 'settings' && styles.tabLabelActive
          ]}>
            Settings
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  staticHeader: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  scrollView: {
    flex: 1,
    padding: 16,
    marginBottom: 70, // Space for tab bar
  },
  scrollViewWithPadding: {
    paddingTop: 60, // Add top padding when header is not shown
  },
  subheader: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  productDescription: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 8,
    color: '#000',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // Tab Bar Styles
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderTopWidth: 3,
    borderTopColor: 'transparent',
  },
  tabItemActive: {
    borderTopColor: '#000',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconContainerActive: {
    backgroundColor: '#000',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#000',
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  // Tab Content Styles
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  tabTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabText: {
    fontSize: 16,
    opacity: 0.7,
  },
  // Profile Styles
  profileContainer: {
    paddingBottom: 20,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  profileInitials: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    opacity: 0.6,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  dataCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dataLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'right',
  },
  biometricCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  biometricIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  biometricEmoji: {
    fontSize: 28,
  },
  biometricInfo: {
    flex: 1,
  },
  biometricTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  biometricSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  biometricArrow: {
    fontSize: 24,
    color: '#ccc',
  },
});
