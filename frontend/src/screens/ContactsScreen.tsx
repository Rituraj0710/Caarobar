import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking, Modal, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, useSafeArea } from '../utils/responsive';
import BackButton from '../components/BackButton';
import SafeAreaView from '../components/SafeAreaView';

type RootStackParamList = {
  Language: undefined;
  SignIn: undefined;
  OTPVerification: { identifier: string; role?: 'Admin' | 'Employee' };
  Register: undefined;
  Home: undefined;
  AdminHome: undefined;
  LeaveReport: undefined;
  PaymentReport: undefined;
  Calendar: undefined;
  Contacts: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

interface Contact {
  name: string;
  role: string;
  number: string;
  email?: string;
  location?: string;
  dateOfJoining?: string;
  empId?: string;
}

const contacts: Contact[] = [
  { 
    name: 'Kamal Jangid', 
    role: 'Carpenter', 
    number: '+919460638554',
    email: 'kamaljangid1979@gmail.com',
    location: 'Sec 24, chandigarh',
    dateOfJoining: '01/01/2025',
    empId: '001'
  },
  { 
    name: 'Nikhil Jangid', 
    role: 'Manager', 
    number: '+919460638554',
    email: 'nikhiljangid@gmail.com',
    location: 'Sec 24, chandigarh',
    dateOfJoining: '01/01/2025',
    empId: '002'
  },
  { 
    name: 'Lucky Jangid', 
    role: 'Supervisor', 
    number: '+919460638554',
    email: 'luckyjangid@gmail.com',
    location: 'Sec 24, chandigarh',
    dateOfJoining: '01/01/2025',
    empId: '003'
  },
  { 
    name: 'Chiku Soni', 
    role: 'Accountant', 
    number: '+919460638554',
    email: 'chikusoni@gmail.com',
    location: 'Sec 24, chandigarh',
    dateOfJoining: '01/01/2025',
    empId: '004'
  },
  { 
    name: 'Ramgopal', 
    role: 'Helper', 
    number: '+919460638554',
    email: 'ramgopal@gmail.com',
    location: 'Sec 24, chandigarh',
    dateOfJoining: '01/01/2025',
    empId: '005'
  },
];

const handleCall = (phoneNumber: string) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

export default function ContactsScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleContactPress = (contact: Contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
  };

  const formatPhoneNumber = (phone: string) => {
    // Format: +91 9460638554
    if (phone.length === 13 && phone.startsWith('+91')) {
      return `${phone.substring(0, 3)} ${phone.substring(3)}`;
    }
    return phone;
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Blue Header Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: spacing(16),
        paddingTop: spacing(12),
        paddingBottom: spacing(12),
        backgroundColor: '#248CFF'
      }}>
        {/* Left: Back Arrow */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ marginRight: spacing(12) }}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        >
          <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>
        
        {/* Contacts Title */}
        <Text style={{ 
          fontSize: fontSize(20), 
          fontWeight: '700', 
          color: '#FFFFFF', 
          fontFamily: 'Poppins-Bold'
        }} allowFontScaling={false}>
          Contacts
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        contentContainerStyle={{ paddingBottom: spacing(20) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >

        {/* White Card Container */}
        <View style={{ 
          backgroundColor: '#FFFFFF', 
          marginTop: spacing(8),
          borderRadius: hp(12),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(2) },
          shadowOpacity: 0.1,
          shadowRadius: spacing(8),
          elevation: 3,
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <View style={{ 
            backgroundColor: '#F5F5F5', 
            paddingHorizontal: spacing(16),
            paddingVertical: spacing(12),
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: wp(1),
            borderBottomColor: '#E5E5E5'
          }}>
            <View style={{ flex: 2, alignItems: 'flex-start' }}>
              <Text style={{ 
                fontSize: fontSize(14), 
                fontWeight: '600', 
                color: '#333333', 
                fontFamily: 'Poppins-SemiBold'
              }} allowFontScaling={false}>
                Photo
              </Text>
            </View>
            <View style={{ flex: 3.5, paddingLeft: spacing(8) }}>
              <Text style={{ 
                fontSize: fontSize(14), 
                fontWeight: '600', 
                color: '#333333', 
                fontFamily: 'Poppins-SemiBold'
              }} allowFontScaling={false}>
                Name
              </Text>
            </View>
            <View style={{ flex: 3, paddingLeft: spacing(4) }}>
              <Text style={{ 
                fontSize: fontSize(14), 
                fontWeight: '600', 
                color: '#333333', 
                fontFamily: 'Poppins-SemiBold'
              }} allowFontScaling={false}>
                Number
              </Text>
            </View>
            <View style={{ flex: 1.5, alignItems: 'flex-end' }}>
              <Text style={{ 
                fontSize: fontSize(14), 
                fontWeight: '600', 
                color: '#333333', 
                fontFamily: 'Poppins-SemiBold'
              }} allowFontScaling={false}>
                Call
              </Text>
            </View>
          </View>

          {/* Contact List */}
          {contacts.map((contact, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => handleContactPress(contact)}
              activeOpacity={0.7}
            >
              <View style={{ 
                backgroundColor: '#FFFFFF',
                paddingHorizontal: spacing(16),
                paddingVertical: spacing(12),
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: index < contacts.length - 1 ? wp(1) : 0,
                borderBottomColor: '#E5E5E5'
              }}>
                {/* Photo */}
                <View style={{ flex: 2, alignItems: 'flex-start' }}>
                  <Image 
                    source={require('../../assets/Profile picture.png')} 
                    style={{ 
                      width: wp(48), 
                      height: hp(48), 
                      borderRadius: hp(24),
                      resizeMode: 'cover'
                    }} 
                  />
                </View>

                {/* Name and Role */}
                <View style={{ flex: 3.5, paddingLeft: spacing(8) }}>
                  <Text style={{ 
                    fontSize: fontSize(14), 
                    fontWeight: '500', 
                    color: '#333333', 
                    fontFamily: 'Poppins-Medium',
                    marginBottom: spacing(2),
                    lineHeight: fontSize(18)
                  }} allowFontScaling={false}>
                    {contact.name}
                  </Text>
                  <Text style={{ 
                    fontSize: fontSize(12), 
                    fontWeight: '400', 
                    color: '#888888', 
                    fontFamily: 'Poppins',
                    lineHeight: fontSize(16)
                  }} allowFontScaling={false}>
                    ({contact.role})
                  </Text>
                </View>

                {/* Number */}
                <View style={{ flex: 3, paddingLeft: spacing(4) }}>
                  <Text style={{ 
                    fontSize: fontSize(13), 
                    fontWeight: '400', 
                    color: '#333333', 
                    fontFamily: 'Poppins',
                    lineHeight: fontSize(18)
                  }} allowFontScaling={false}>
                    {contact.number}
                  </Text>
                </View>

                {/* Call Icon */}
                <View style={{ flex: 1.5, alignItems: 'flex-end' }}>
                  <TouchableOpacity 
                    onPress={(e) => {
                      e.stopPropagation();
                      handleCall(contact.number);
                    }}
                    style={{ padding: spacing(8) }}
                    activeOpacity={0.7}
                    hitSlop={{ top: hp(10), left: wp(10), bottom: hp(10), right: wp(10) }}
                  >
                    <Text style={{ fontSize: fontSize(20), color: '#666666' }} allowFontScaling={false}>📞</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Contact Detail Modal - Slides up from bottom */}
      <Modal
        visible={showDetailModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'flex-end'
          }}
          onPress={() => setShowDetailModal(false)}
        >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: hp(24),
              borderTopRightRadius: hp(24),
              padding: spacing(24),
              paddingBottom: spacing(32) + insets.bottom,
              maxHeight: '70%'
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <View style={{ alignItems: 'center', marginBottom: spacing(20) }}>
              <View style={{
                width: wp(40),
                height: hp(4),
                backgroundColor: '#D0D0D0',
                borderRadius: hp(2),
                marginBottom: spacing(4)
              }} />
            </View>

            {/* Contact Header */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing(24) }}>
              {/* Profile Picture */}
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ 
                  width: wp(70), 
                  height: hp(70), 
                  borderRadius: hp(35),
                  marginRight: spacing(16),
                  resizeMode: 'cover'
                }} 
              />
              
              {/* Name, Location, and Social Icons */}
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: fontSize(20),
                  fontWeight: '700',
                  color: '#000000',
                  fontFamily: 'Poppins-Bold',
                  marginBottom: spacing(4),
                  lineHeight: fontSize(28)
                }} allowFontScaling={false}>
                  {selectedContact?.name === 'Kamal Jangid' ? 'Kamal Kishor Jangid' : selectedContact?.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: spacing(8) }}>
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#666666',
                    fontFamily: 'Poppins',
                    lineHeight: fontSize(20),
                    marginRight: spacing(8)
                  }} allowFontScaling={false}>
                    {selectedContact?.location || 'Sec 24, chandigarh'}
                  </Text>
                  {/* Social Media Icons */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* WhatsApp - Green */}
                    <TouchableOpacity 
                      hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
                      style={{ marginRight: spacing(8) }}
                    >
                      <Image 
                        source={require('../../assets/whastapp icon.png')} 
                        style={{ 
                          width: wp(24), 
                          height: hp(24), 
                          resizeMode: 'contain' 
                        }} 
                      />
                    </TouchableOpacity>
                    {/* Chat Bubble - Yellow */}
                    <TouchableOpacity 
                      hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
                      style={{ marginRight: spacing(8) }}
                    >
                      <Image 
                        source={require('./msg icon.png')} 
                        style={{ 
                          width: wp(24), 
                          height: hp(24), 
                          resizeMode: 'contain' 
                        }} 
                      />
                    </TouchableOpacity>
                    {/* Star - Blue */}
                    <TouchableOpacity 
                      hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
                      style={{ marginRight: spacing(8) }}
                    >
                      <Image 
                        source={require('./imp icon.png')} 
                        style={{ 
                          width: wp(24), 
                          height: hp(24), 
                          resizeMode: 'contain' 
                        }} 
                      />
                    </TouchableOpacity>
                    {/* Email - Gray */}
                    <TouchableOpacity 
                      hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
                    >
                      <Image 
                        source={require('./msg icon (2).png')} 
                        style={{ 
                          width: wp(24), 
                          height: hp(24), 
                          resizeMode: 'contain' 
                        }} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Contact Details */}
            <View style={{ marginBottom: spacing(24) }}>
              {/* Phone */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing(12), borderBottomWidth: wp(1), borderBottomColor: '#E5E5E5' }}>
                <Text style={{ fontSize: fontSize(14), color: '#666666', fontFamily: 'Poppins' }} allowFontScaling={false}>Phone</Text>
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins', fontWeight: '500' }} allowFontScaling={false}>
                  {selectedContact ? formatPhoneNumber(selectedContact.number) : ''}
                </Text>
              </View>

              {/* E-Mail */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing(12), borderBottomWidth: wp(1), borderBottomColor: '#E5E5E5' }}>
                <Text style={{ fontSize: fontSize(14), color: '#666666', fontFamily: 'Poppins' }} allowFontScaling={false}>E-Mail</Text>
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins', fontWeight: '500', flex: 1, textAlign: 'right', paddingLeft: spacing(16) }} allowFontScaling={false}>
                  {selectedContact?.email || 'N/A'}
                </Text>
              </View>

              {/* Post */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing(12), borderBottomWidth: wp(1), borderBottomColor: '#E5E5E5' }}>
                <Text style={{ fontSize: fontSize(14), color: '#666666', fontFamily: 'Poppins' }} allowFontScaling={false}>Post</Text>
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins', fontWeight: '500' }} allowFontScaling={false}>
                  {selectedContact?.role === 'Carpenter' ? 'Carpainter' : selectedContact?.role || 'N/A'}
                </Text>
              </View>

              {/* Date of joining */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing(12), borderBottomWidth: wp(1), borderBottomColor: '#E5E5E5' }}>
                <Text style={{ fontSize: fontSize(14), color: '#666666', fontFamily: 'Poppins' }} allowFontScaling={false}>Date of joining</Text>
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins', fontWeight: '500' }} allowFontScaling={false}>
                  {selectedContact?.dateOfJoining || 'N/A'}
                </Text>
              </View>

              {/* Emp ID */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing(12) }}>
                <Text style={{ fontSize: fontSize(14), color: '#666666', fontFamily: 'Poppins' }} allowFontScaling={false}>Emp ID</Text>
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins', fontWeight: '500' }} allowFontScaling={false}>
                  {selectedContact?.empId || '001'}
                </Text>
              </View>
            </View>

            {/* Done Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#4285F4',
                borderRadius: hp(12), // More rounded
                paddingVertical: spacing(16),
                paddingHorizontal: spacing(24),
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: hp(2) },
                shadowOpacity: 0.2,
                shadowRadius: spacing(4),
                elevation: 3
              }}
              onPress={() => setShowDetailModal(false)}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: fontSize(16),
                fontFamily: 'Poppins-Bold',
                fontWeight: '700',
                lineHeight: fontSize(22)
              }} allowFontScaling={false}>
                Done
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
