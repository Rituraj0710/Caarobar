import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Pressable, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';
import { wp, hp, fontSize, spacing, useSafeArea } from '../utils/responsive';
import SafeAreaView from '../components/SafeAreaView';

type RootStackParamList = {
  BusinessProfile: undefined;
  AdminHome: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'BusinessProfile'>;

const countries = ['INDIA', 'USA', 'UK', 'CANADA'];
const categories = ['Hospital', 'Retail', 'Manufacturing', 'Service', 'Education', 'Technology'];
const states = ['Rajasthan', 'Delhi', 'Maharashtra', 'Gujarat', 'Punjab', 'Haryana', 'Uttar Pradesh'];
const cities = ['Sikar', 'Jaipur', 'Delhi', 'Mumbai', 'Ahmedabad', 'Chandigarh', 'Lucknow'];

export default function BusinessProfileScreen({ navigation }: Props) {
  const [businessName, setBusinessName] = useState('Creative Designers');
  const [ownerName, setOwnerName] = useState('Kamal Kishor Jangid');
  const [gstin, setGstin] = useState('000000000000');
  const [panNo, setPanNo] = useState('ABCDE123F');
  const [email, setEmail] = useState('creativesikar@gmail.com');
  const [companyContact, setCompanyContact] = useState('+919460638554');
  const [alternateNo, setAlternateNo] = useState('+919352738554');
  const [category, setCategory] = useState('Hospital');
  const [address, setAddress] = useState('Radhakishanpura, Sikar');
  const [pincode, setPincode] = useState('332001');
  const [city, setCity] = useState('Sikar');
  const [state, setState] = useState('Rajasthan');
  const [selectedCountry, setSelectedCountry] = useState('INDIA');
  const [selectedAltCountry, setSelectedAltCountry] = useState('INDIA');
  
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showAltCountryModal, setShowAltCountryModal] = useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving business profile...');
    // You can add API call here
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />
      
      {/* Blue Header Bar */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#4285F4' }}>
        <View style={{
          backgroundColor: '#4285F4',
          paddingTop: hp(10),
          paddingBottom: spacing(16),
          paddingHorizontal: spacing(16),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <BackButton color="#FFFFFF" />
          <View style={{ flex: 1, alignItems: 'center', marginRight: wp(32) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#FFFFFF', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
              Bussiness Profile
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing(20), paddingHorizontal: spacing(16) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Upload Sections */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing(20), marginBottom: spacing(24) }}>
          {/* Company Logo */}
          <View style={{ flex: 1, marginRight: spacing(12) }}>
            <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
              Company logo
            </Text>
            <TouchableOpacity style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              height: hp(120),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialIcons name="cloud-upload" size={wp(48)} color="#9E9E9E" />
            </TouchableOpacity>
          </View>

          {/* Owner Image */}
          <View style={{ flex: 1, marginLeft: spacing(12) }}>
            <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
              Owner Image
            </Text>
            <TouchableOpacity style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              height: hp(120),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialIcons name="cloud-upload" size={wp(48)} color="#9E9E9E" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Business Name */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Bussiness Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={businessName}
            onChangeText={setBusinessName}
            placeholder="Enter business name"
            allowFontScaling={false}
          />
        </View>

        {/* Owner Name */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Owner Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={ownerName}
            onChangeText={setOwnerName}
            placeholder="Enter owner name"
            allowFontScaling={false}
          />
        </View>

        {/* GSTIN */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            GSTIN
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: hp(12),
                paddingHorizontal: spacing(16),
                paddingVertical: spacing(12),
                fontSize: fontSize(14),
                color: '#000000',
                fontFamily: 'Poppins',
              }}
              value={gstin}
              onChangeText={setGstin}
              placeholder="Enter GSTIN"
              allowFontScaling={false}
            />
            <View style={{ marginLeft: spacing(12), width: wp(24), height: hp(24), borderRadius: hp(12), backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#FFFFFF', fontSize: fontSize(14), fontWeight: 'bold' }} allowFontScaling={false}>✓</Text>
            </View>
          </View>
        </View>

        {/* Business PAN No. */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Bussiness PAN No.
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={panNo}
            onChangeText={setPanNo}
            placeholder="Enter PAN number"
            allowFontScaling={false}
          />
        </View>

        {/* Business E-mail */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Bussiness E-mail
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            allowFontScaling={false}
          />
        </View>

        {/* Company Contact */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Company Contact
          </Text>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: hp(12),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing(12),
          }}>
            <TouchableOpacity 
              onPress={() => setShowCountryModal(true)}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing(12) }}
            >
              <Text style={{ fontSize: fontSize(16), marginRight: spacing(4) }} allowFontScaling={false}>🇮🇳</Text>
              <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{selectedCountry}</Text>
              <Text style={{ fontSize: fontSize(14), color: '#000000', marginLeft: spacing(4) }} allowFontScaling={false}>▼</Text>
            </TouchableOpacity>
            <View style={{ width: 1, height: hp(24), backgroundColor: '#E0E0E0', marginRight: spacing(12) }} />
            <TextInput
              style={{
                flex: 1,
                paddingVertical: spacing(12),
                fontSize: fontSize(14),
                color: '#000000',
                fontFamily: 'Poppins',
              }}
              value={companyContact}
              onChangeText={setCompanyContact}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
              allowFontScaling={false}
            />
          </View>
        </View>

        {/* Alternate No */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Alternate No
          </Text>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: hp(12),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing(12),
          }}>
            <TouchableOpacity 
              onPress={() => setShowAltCountryModal(true)}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing(12) }}
            >
              <Text style={{ fontSize: fontSize(16), marginRight: spacing(4) }} allowFontScaling={false}>🇮🇳</Text>
              <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{selectedAltCountry}</Text>
              <Text style={{ fontSize: fontSize(14), color: '#000000', marginLeft: spacing(4) }} allowFontScaling={false}>▼</Text>
            </TouchableOpacity>
            <View style={{ width: 1, height: hp(24), backgroundColor: '#E0E0E0', marginRight: spacing(12) }} />
            <TextInput
              style={{
                flex: 1,
                paddingVertical: spacing(12),
                fontSize: fontSize(14),
                color: '#000000',
                fontFamily: 'Poppins',
              }}
              value={alternateNo}
              onChangeText={setAlternateNo}
              placeholder="Enter alternate number"
              keyboardType="phone-pad"
              allowFontScaling={false}
            />
          </View>
        </View>

        {/* Category */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Category
          </Text>
          <TouchableOpacity
            onPress={() => setShowCategoryModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(12),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
              {category || 'Select category'}
            </Text>
            <Text style={{ fontSize: fontSize(14), color: '#000000' }} allowFontScaling={false}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Address */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Address
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            multiline
            allowFontScaling={false}
          />
        </View>

        {/* Pincode */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Pincode
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={pincode}
            onChangeText={setPincode}
            placeholder="Enter pincode"
            keyboardType="number-pad"
            allowFontScaling={false}
          />
        </View>

        {/* City */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            City
          </Text>
          <TouchableOpacity
            onPress={() => setShowCityModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(12),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
              {city || 'Select city'}
            </Text>
            <Text style={{ fontSize: fontSize(14), color: '#000000' }} allowFontScaling={false}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* State */}
        <View style={{ marginBottom: spacing(24) }}>
          <Text style={{ fontSize: fontSize(14), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            State
          </Text>
          <TouchableOpacity
            onPress={() => setShowStateModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(12),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(12),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
              {state || 'Select state'}
            </Text>
            <Text style={{ fontSize: fontSize(14), color: '#000000' }} allowFontScaling={false}>▼</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Save Button */}
      <View style={{
        backgroundColor: '#FFFFFF',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(12),
        paddingBottom: spacing(24),
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
      }}>
        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: '#4285F4',
            borderRadius: hp(12),
            paddingVertical: spacing(16),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: fontSize(16), fontWeight: '700', color: '#FFFFFF', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} onPress={() => setShowCategoryModal(false)}>
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: hp(20), borderTopRightRadius: hp(20), padding: spacing(20), paddingBottom: spacing(32) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>
              Select Category
            </Text>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  setCategory(cat);
                  setShowCategoryModal(false);
                }}
                style={{ paddingVertical: spacing(12), borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* City Modal */}
      <Modal
        visible={showCityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCityModal(false)}
      >
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} onPress={() => setShowCityModal(false)}>
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: hp(20), borderTopRightRadius: hp(20), padding: spacing(20), paddingBottom: spacing(32) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>
              Select City
            </Text>
            {cities.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => {
                  setCity(c);
                  setShowCityModal(false);
                }}
                style={{ paddingVertical: spacing(12), borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{c}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* State Modal */}
      <Modal
        visible={showStateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStateModal(false)}
      >
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} onPress={() => setShowStateModal(false)}>
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: hp(20), borderTopRightRadius: hp(20), padding: spacing(20), paddingBottom: spacing(32) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>
              Select State
            </Text>
            {states.map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => {
                  setState(s);
                  setShowStateModal(false);
                }}
                style={{ paddingVertical: spacing(12), borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{s}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Country Modal */}
      <Modal
        visible={showCountryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} onPress={() => setShowCountryModal(false)}>
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: hp(20), borderTopRightRadius: hp(20), padding: spacing(20), paddingBottom: spacing(32) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>
              Select Country
            </Text>
            {countries.map((country) => (
              <TouchableOpacity
                key={country}
                onPress={() => {
                  setSelectedCountry(country);
                  setShowCountryModal(false);
                }}
                style={{ paddingVertical: spacing(12), borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{country}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Alternate Country Modal */}
      <Modal
        visible={showAltCountryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAltCountryModal(false)}
      >
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} onPress={() => setShowAltCountryModal(false)}>
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: hp(20), borderTopRightRadius: hp(20), padding: spacing(20), paddingBottom: spacing(32) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }}>
              Select Country
            </Text>
            {countries.map((country) => (
              <TouchableOpacity
                key={country}
                onPress={() => {
                  setSelectedAltCountry(country);
                  setShowAltCountryModal(false);
                }}
                style={{ paddingVertical: spacing(12), borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{country}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

