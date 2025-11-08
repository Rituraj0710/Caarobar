import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
        paddingTop: 44,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 60
      }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Text style={{ fontSize: 20, color: '#FFFFFF' }}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          top: 0,
          bottom: 0,
          alignItems: 'center', 
          justifyContent: 'center',
          paddingTop: 44,
          paddingBottom: 16
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#FFFFFF',
            fontFamily: 'Poppins-Bold'
          }}>
            Add Customer
          </Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Firm Name */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Firm Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 14,
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
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Customer Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 14,
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
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Contact
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 14,
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
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
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
                paddingHorizontal: 16,
                paddingVertical: 14,
                paddingRight: 40,
                fontSize: 14,
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
              right: 12,
              top: 14,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: 16, color: '#9E9E9E' }}>📍</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button - Fixed at Bottom */}
      <View style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        padding: 16,
        paddingBottom: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
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
          onPress={() => {
            // TODO: Handle form submission
            navigation.goBack();
          }}
        >
          <Text style={{
            color: '#FFFFFF',
            fontSize: 16,
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

