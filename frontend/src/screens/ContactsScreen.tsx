import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking, Modal, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing } from '../utils/responsive';
import BackButton from '../components/BackButton';

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
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Top Navigation Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 44,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF'
      }}>
        {/* Left: Back Arrow and Logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ marginRight: 8 }}>
            <BackButton />
          </View>
          <Image 
            source={require('../../assets/header carobar.png')} 
            style={{ width: 96, height: 22, resizeMode: 'contain' }} 
          />
        </View>

        {/* Right: Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Bell with notification dot */}
          <View style={{ position: 'relative', marginRight: 16 }}>
            <TouchableOpacity style={{ padding: 4 }}>
              <Image 
                source={require('../../assets/Frame.png')} 
                style={{ width: 22, height: 22, resizeMode: 'contain' }} 
              />
            </TouchableOpacity>
            <View style={{ 
              position: 'absolute', 
              right: 2, 
              top: 4, 
              width: 8, 
              height: 8, 
              borderRadius: 4, 
              backgroundColor: '#4CAF50' 
            }} />
          </View>

          {/* Search Icon */}
          <TouchableOpacity style={{ padding: 4, marginRight: 16 }}>
            <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#000000' }}>🔍</Text>
            </View>
          </TouchableOpacity>

          {/* Menu (three dots) */}
          <TouchableOpacity style={{ padding: 4 }}>
            <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#000000', lineHeight: 16 }}>⋮</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        <View style={{ paddingHorizontal: spacing(16), paddingTop: spacing(20), paddingBottom: spacing(12) }}>
          <Text style={{ 
            fontSize: fontSize(24), 
            fontWeight: '700', 
            color: '#000000', 
            fontFamily: 'Poppins-Bold',
            marginBottom: spacing(4)
          }}>
            Contacts
          </Text>
          <View style={{ 
            height: 1, 
            backgroundColor: '#000000', 
            width: '100%',
            marginTop: spacing(4)
          }} />
        </View>

        {/* Table Header */}
        <View style={{ 
          backgroundColor: '#F5F5F5', 
          paddingHorizontal: spacing(16),
          paddingVertical: spacing(12),
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: spacing(8)
        }}>
          <View style={{ flex: 2, alignItems: 'flex-start' }}>
            <Text style={{ 
              fontSize: fontSize(14), 
              fontWeight: '600', 
              color: '#333333', 
              fontFamily: 'Poppins-SemiBold'
            }}>
              Photo
            </Text>
          </View>
          <View style={{ flex: 3.5, paddingLeft: spacing(8) }}>
            <Text style={{ 
              fontSize: fontSize(14), 
              fontWeight: '600', 
              color: '#333333', 
              fontFamily: 'Poppins-SemiBold'
            }}>
              Name
            </Text>
          </View>
          <View style={{ flex: 3, paddingLeft: spacing(4) }}>
            <Text style={{ 
              fontSize: fontSize(14), 
              fontWeight: '600', 
              color: '#333333', 
              fontFamily: 'Poppins-SemiBold'
            }}>
              Number
            </Text>
          </View>
          <View style={{ flex: 1.5, alignItems: 'flex-end' }}>
            <Text style={{ 
              fontSize: fontSize(14), 
              fontWeight: '600', 
              color: '#333333', 
              fontFamily: 'Poppins-SemiBold'
            }}>
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
              borderBottomWidth: 1,
              borderBottomColor: '#E5E5E5'
            }}>
              {/* Photo */}
              <View style={{ flex: 2, alignItems: 'flex-start' }}>
                <Image 
                  source={require('../../assets/Profile picture.png')} 
                  style={{ 
                    width: wp(48), 
                    height: hp(48), 
                    borderRadius: 24,
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
                  marginBottom: spacing(2)
                }}>
                  {contact.name}
                </Text>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  fontWeight: '400', 
                  color: '#888888', 
                  fontFamily: 'Poppins'
                }}>
                  ({contact.role})
                </Text>
              </View>

              {/* Number */}
              <View style={{ flex: 3, paddingLeft: spacing(4) }}>
                <Text style={{ 
                  fontSize: fontSize(13), 
                  fontWeight: '400', 
                  color: '#333333', 
                  fontFamily: 'Poppins'
                }}>
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
                >
                  <Text style={{ fontSize: fontSize(18), color: '#333333' }}>📞</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              paddingBottom: 32,
              maxHeight: '70%'
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={{
                width: 40,
                height: 4,
                backgroundColor: '#D0D0D0',
                borderRadius: 2,
                marginBottom: 4
              }} />
            </View>

            {/* Contact Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
              {/* Profile Picture */}
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ 
                  width: 70, 
                  height: 70, 
                  borderRadius: 35,
                  marginRight: 16,
                  resizeMode: 'cover'
                }} 
              />
              
              {/* Name and Location */}
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#000000',
                  fontFamily: 'Poppins-Bold',
                  marginBottom: 4
                }}>
                  {selectedContact?.name}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#666666',
                  fontFamily: 'Poppins'
                }}>
                  {selectedContact?.location || 'Sec 24, chandigarh'}
                </Text>
              </View>
            </View>

            {/* Contact Details */}
            <View style={{ marginBottom: 24 }}>
              {/* Phone */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}>
                <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins' }}>Phone</Text>
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', fontWeight: '500' }}>
                  {selectedContact ? formatPhoneNumber(selectedContact.number) : ''}
                </Text>
              </View>

              {/* E-Mail */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}>
                <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins' }}>E-Mail</Text>
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', fontWeight: '500', flex: 1, textAlign: 'right', paddingLeft: 16 }}>
                  {selectedContact?.email || 'N/A'}
                </Text>
              </View>

              {/* Post */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}>
                <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins' }}>Post</Text>
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', fontWeight: '500' }}>
                  {selectedContact?.role || 'N/A'}
                </Text>
              </View>

              {/* Date of joining */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}>
                <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins' }}>Date of joining</Text>
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', fontWeight: '500' }}>
                  {selectedContact?.dateOfJoining || 'N/A'}
                </Text>
              </View>

              {/* Emp ID */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
                <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins' }}>Emp ID</Text>
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', fontWeight: '500' }}>
                  {selectedContact?.empId || 'N/A'}
                </Text>
              </View>
            </View>

            {/* Done Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#4285F4',
                borderRadius: 8,
                paddingVertical: 16,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3
              }}
              onPress={() => setShowDetailModal(false)}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                fontWeight: '700'
              }}>
                Done
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
