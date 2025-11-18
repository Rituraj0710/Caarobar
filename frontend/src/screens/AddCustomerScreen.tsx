import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH } from '../utils/responsive';
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
  Tasks: undefined;
  TaskDetail: undefined;
  NewTask: undefined;
  AddCustomer: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddCustomer'>;

export default function AddCustomerScreen({ navigation }: Props) {
  const [firmName, setFirmName] = useState('Creative Designers');
  const [customerName, setCustomerName] = useState('Kamal Jangid');
  const [contact, setContact] = useState('+919460638554');
  const [location, setLocation] = useState('Radhakishanpura, Sikar');

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Blue Header Bar */}
      <View style={{
        backgroundColor: '#4285F4',
        paddingTop: hp(44),
        paddingBottom: spacing(16),
        paddingHorizontal: spacing(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: hp(60)
      }}>
        {/* Back Arrow */}
        <BackButton color="#FFFFFF" />

        {/* Title */}
        <View style={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          top: 0,
          bottom: 0,
          alignItems: 'center', 
          justifyContent: 'center',
          paddingTop: hp(44),
          paddingBottom: spacing(16)
        }}>
          <Text style={{
            fontSize: fontSize(18),
            fontWeight: '700',
            color: '#FFFFFF',
            fontFamily: 'Poppins-Bold'
          }}>
            Add Customer
          </Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: spacing(16), paddingBottom: hp(100) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Firm Name */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }}>
            Firm Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter firm name"
            placeholderTextColor="#9E9E9E"
            value={firmName}
            onChangeText={setFirmName}
          />
        </View>

        {/* Customer Name */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }}>
            Customer Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter customer name"
            placeholderTextColor="#9E9E9E"
            value={customerName}
            onChangeText={setCustomerName}
          />
        </View>

        {/* Contact */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }}>
            Contact
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter contact number"
            placeholderTextColor="#9E9E9E"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />
        </View>

        {/* Location */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }}>
            Location
          </Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: 8,
                paddingHorizontal: spacing(16),
                paddingVertical: spacing(14),
                paddingRight: spacing(40),
                fontSize: fontSize(14),
                color: '#000000',
                fontFamily: 'Poppins'
              }}
              placeholder="Enter location"
              placeholderTextColor="#9E9E9E"
              value={location}
              onChangeText={setLocation}
            />
            <View style={{
              position: 'absolute',
              right: spacing(12),
              top: spacing(14),
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: fontSize(16), color: '#9E9E9E' }}>📍</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button - Fixed at Bottom */}
      <View style={{
        position: 'absolute',
        bottom: spacing(20),
        left: 0,
        right: 0,
        padding: spacing(16),
        paddingBottom: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#4285F4',
            borderRadius: 8,
            paddingVertical: spacing(16),
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3
          }}
          onPress={() => {
            // TODO: Handle form submission
            navigation.goBack();
          }}
        >
          <Text style={{
            color: '#FFFFFF',
            fontSize: fontSize(16),
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

