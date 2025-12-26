import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Pressable, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { wp, hp, fontSize, spacing, useSafeArea } from '../utils/responsive';
import SafeAreaView from '../components/SafeAreaView';
import Button from '../components/ui/Button';

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
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6EFF" />
      
      {/* Blue Header Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: spacing(16),
        paddingTop: spacing(8),
        paddingBottom: spacing(8),
        backgroundColor: '#2D6EFF'
      }}>
        {/* Left: Back Arrow */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: spacing(4) }}
        >
          <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>

        {/* Left: Business Profile Title */}
        <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: spacing(12) }}>
          <Text style={{ 
            fontSize: fontSize(18), 
            fontWeight: '500', 
            color: '#FFFFFF', 
            fontFamily: 'Inter' 
          }} allowFontScaling={false}>
            Bussiness Profile
          </Text>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        contentContainerStyle={{ paddingHorizontal: spacing(16), paddingTop: spacing(16) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Upload Sections */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing(20) }}>
          {/* Company Logo */}
          <View style={{ flex: 1, marginRight: spacing(8) }}>
            <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
              Company logo
            </Text>
            <TouchableOpacity style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1.5,
              borderColor: '#D0D0D0',
              borderStyle: 'dashed',
              borderRadius: spacing(8),
              height: hp(110),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialIcons name="cloud-upload" size={wp(40)} color="#9E9E9E" />
            </TouchableOpacity>
          </View>

          {/* Owner Image */}
          <View style={{ flex: 1, marginLeft: spacing(8) }}>
            <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
              Owner Image
            </Text>
            <TouchableOpacity style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1.5,
              borderColor: '#D0D0D0',
              borderStyle: 'dashed',
              borderRadius: spacing(8),
              height: hp(110),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialIcons name="cloud-upload" size={wp(40)} color="#9E9E9E" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Business Name */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Bussiness Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingHorizontal: spacing(14),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={businessName}
            onChangeText={setBusinessName}
            placeholder="Enter business name"
            placeholderTextColor="#999999"
            allowFontScaling={false}
          />
        </View>

        {/* Owner Name */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Owner Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingHorizontal: spacing(14),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={ownerName}
            onChangeText={setOwnerName}
            placeholder="Enter owner name"
            placeholderTextColor="#999999"
            allowFontScaling={false}
          />
        </View>

        {/* GSTIN */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            GSTIN
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: spacing(8),
                paddingHorizontal: spacing(14),
                paddingVertical: spacing(12),
                fontSize: fontSize(14),
                color: '#000000',
                fontFamily: 'Poppins',
              }}
              value={gstin}
              onChangeText={setGstin}
              placeholder="Enter GSTIN"
              placeholderTextColor="#999999"
              allowFontScaling={false}
            />
            <View style={{ marginLeft: spacing(10), width: spacing(24), height: spacing(24), borderRadius: spacing(12), backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#FFFFFF', fontSize: fontSize(12), fontWeight: 'bold' }} allowFontScaling={false}>✓</Text>
            </View>
          </View>
        </View>

        {/* Business PAN No. */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Bussiness PAN No.
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingHorizontal: spacing(14),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={panNo}
            onChangeText={setPanNo}
            placeholder="Enter PAN number"
            placeholderTextColor="#999999"
            allowFontScaling={false}
          />
        </View>

        {/* Business E-mail */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Bussiness E-mail
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingHorizontal: spacing(14),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor="#999999"
            keyboardType="email-address"
            autoCapitalize="none"
            allowFontScaling={false}
          />
        </View>

        {/* Company Contact */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Company Contact
          </Text>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: spacing(8),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing(12),
          }}>
            <TouchableOpacity 
              onPress={() => setShowCountryModal(true)}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing(8) }}
            >
              <Text style={{ fontSize: fontSize(18), marginRight: spacing(6) }} allowFontScaling={false}>🇮🇳</Text>
              <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{selectedCountry}</Text>
              <Text style={{ fontSize: fontSize(10), color: '#666666', marginLeft: spacing(4) }} allowFontScaling={false}>▼</Text>
            </TouchableOpacity>
            <View style={{ width: 1, height: spacing(24), backgroundColor: '#E0E0E0', marginRight: spacing(10) }} />
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
              placeholderTextColor="#999999"
              keyboardType="phone-pad"
              allowFontScaling={false}
            />
          </View>
        </View>

        {/* Alternate No */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Alternate No
          </Text>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: spacing(8),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing(12),
          }}>
            <TouchableOpacity 
              onPress={() => setShowAltCountryModal(true)}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: spacing(8) }}
            >
              <Text style={{ fontSize: fontSize(18), marginRight: spacing(6) }} allowFontScaling={false}>🇮🇳</Text>
              <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{selectedAltCountry}</Text>
              <Text style={{ fontSize: fontSize(10), color: '#666666', marginLeft: spacing(4) }} allowFontScaling={false}>▼</Text>
            </TouchableOpacity>
            <View style={{ width: 1, height: spacing(24), backgroundColor: '#E0E0E0', marginRight: spacing(10) }} />
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
              placeholderTextColor="#999999"
              keyboardType="phone-pad"
              allowFontScaling={false}
            />
          </View>
        </View>

        {/* Category */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Category
          </Text>
          <TouchableOpacity
            onPress={() => setShowCategoryModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingHorizontal: spacing(14),
              paddingVertical: spacing(12),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: fontSize(14), color: category ? '#000000' : '#999999', fontFamily: 'Poppins' }} allowFontScaling={false}>
              {category || 'Select category'}
            </Text>
            <Text style={{ fontSize: fontSize(10), color: '#666666' }} allowFontScaling={false}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Address */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Address
          </Text>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: spacing(8),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing(14),
            paddingVertical: spacing(12),
          }}>
            <TextInput
              style={{
                flex: 1,
                fontSize: fontSize(14),
                color: '#000000',
                fontFamily: 'Poppins',
              }}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter address"
              placeholderTextColor="#999999"
              multiline
              allowFontScaling={false}
            />
            <MaterialIcons name="location-on" size={spacing(20)} color="#4285F4" style={{ marginLeft: spacing(8) }} />
          </View>
        </View>

        {/* Pincode */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            Pincode
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingHorizontal: spacing(14),
              paddingVertical: spacing(12),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
            }}
            value={pincode}
            onChangeText={setPincode}
            placeholder="Enter pincode"
            placeholderTextColor="#999999"
            keyboardType="number-pad"
            allowFontScaling={false}
          />
        </View>

        {/* City */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            City
          </Text>
          <TouchableOpacity
            onPress={() => setShowCityModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingHorizontal: spacing(14),
              paddingVertical: spacing(12),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: fontSize(14), color: city ? '#000000' : '#999999', fontFamily: 'Poppins' }} allowFontScaling={false}>
              {city || 'Select city'}
            </Text>
            <Text style={{ fontSize: fontSize(10), color: '#666666' }} allowFontScaling={false}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* State */}
        <View style={{ marginBottom: spacing(16) }}>
          <Text style={{ fontSize: fontSize(13), color: '#4285F4', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(8) }} allowFontScaling={false}>
            State
          </Text>
          <TouchableOpacity
            onPress={() => setShowStateModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingHorizontal: spacing(14),
              paddingVertical: spacing(12),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: fontSize(14), color: state ? '#000000' : '#999999', fontFamily: 'Poppins' }} allowFontScaling={false}>
              {state || 'Select state'}
            </Text>
            <Text style={{ fontSize: fontSize(10), color: '#666666' }} allowFontScaling={false}>▼</Text>
          </TouchableOpacity>
        </View>
        {/* Save Button - Inside ScrollView */}
        <View style={{ marginTop: spacing(4), marginBottom: spacing(20) }}>
          <Button
            title="Save"
            onPress={handleSave}
            variant="primary"
          />
        </View>
      </ScrollView>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} onPress={() => setShowCategoryModal(false)}>
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: spacing(20), borderTopRightRadius: spacing(20), padding: spacing(20), paddingBottom: spacing(20) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>
              Select Category
            </Text>
            <ScrollView style={{ maxHeight: hp(300) }}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategoryModal(false);
                  }}
                  style={{ paddingVertical: spacing(14), borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                >
                  <Text style={{ fontSize: fontSize(15), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: spacing(20), borderTopRightRadius: spacing(20), padding: spacing(20), paddingBottom: spacing(20) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>
              Select City
            </Text>
            <ScrollView style={{ maxHeight: hp(300) }}>
              {cities.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => {
                    setCity(c);
                    setShowCityModal(false);
                  }}
                  style={{ paddingVertical: spacing(14), borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                >
                  <Text style={{ fontSize: fontSize(15), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: spacing(20), borderTopRightRadius: spacing(20), padding: spacing(20), paddingBottom: spacing(20) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>
              Select State
            </Text>
            <ScrollView style={{ maxHeight: hp(300) }}>
              {states.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => {
                    setState(s);
                    setShowStateModal(false);
                  }}
                  style={{ paddingVertical: spacing(14), borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                >
                  <Text style={{ fontSize: fontSize(15), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: spacing(20), borderTopRightRadius: spacing(20), padding: spacing(20), paddingBottom: spacing(20) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>
              Select Country
            </Text>
            <ScrollView style={{ maxHeight: hp(300) }}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country}
                  onPress={() => {
                    setSelectedCountry(country);
                    setShowCountryModal(false);
                  }}
                  style={{ paddingVertical: spacing(14), borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                >
                  <Text style={{ fontSize: fontSize(15), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{country}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
          <Pressable style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: spacing(20), borderTopRightRadius: spacing(20), padding: spacing(20), paddingBottom: spacing(20) + (useSafeArea().bottom || 0) }}>
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>
              Select Country
            </Text>
            <ScrollView style={{ maxHeight: hp(300) }}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country}
                  onPress={() => {
                    setSelectedAltCountry(country);
                    setShowAltCountryModal(false);
                  }}
                  style={{ paddingVertical: spacing(14), borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}
                >
                  <Text style={{ fontSize: fontSize(15), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{country}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

