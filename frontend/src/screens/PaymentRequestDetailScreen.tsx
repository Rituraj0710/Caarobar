import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
  WorkHistory: undefined;
  DailyWorkHistory: { month: string; monthNumber: string; year: string };
  ExpenseRequestReport: undefined;
  PaymentRequestDetail: { month: string; monthNumber: string; year: string };
  ApplyForPayment: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentRequestDetail'>;

interface PaymentRequestItem {
  requestDate: string;
  requestedDate: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
}

// Generate sample payment requests for the selected month
const generatePaymentRequests = (monthNumber: string, year: string): PaymentRequestItem[] => {
  // Generate sample data for all months
  // For January, show the exact data from the image
  if (monthNumber === '01') {
    return [
      { requestDate: '06/01/25', requestedDate: '07/01/25', amount: 2000, status: 'approved' },
      { requestDate: '09/01/25', requestedDate: '10/01/25', amount: 1000, status: 'pending' },
      { requestDate: '12/01/25', requestedDate: '15/01/25', amount: 1500, status: 'approved' },
      { requestDate: '18/01/25', requestedDate: '20/01/25', amount: 500, status: 'rejected' },
    ];
  }
  
  // For other months, generate sample data based on month number
  const requests: PaymentRequestItem[] = [];
  const yearShort = year.slice(-2);
  
  // Generate 2-4 requests per month with varying dates
  const numRequests = [2, 3, 4, 3, 2, 4, 3, 2, 4, 3, 2, 3][parseInt(monthNumber) - 1] || 3;
  
  for (let i = 0; i < numRequests; i++) {
    const requestDay = 5 + (i * 6);
    const requestedDay = requestDay + 1 + (i % 3);
    
    // Cycle through statuses
    const statuses: ('approved' | 'pending' | 'rejected')[] = ['approved', 'pending', 'rejected', 'approved'];
    const amounts = [2000, 1000, 1500, 500, 2500, 1200];
    
    requests.push({
      requestDate: `${requestDay.toString().padStart(2, '0')}/${monthNumber}/${yearShort}`,
      requestedDate: `${requestedDay.toString().padStart(2, '0')}/${monthNumber}/${yearShort}`,
      amount: amounts[i % amounts.length],
      status: statuses[i % statuses.length]
    });
  }
  
  return requests;
};

export default function PaymentRequestDetailScreen({ navigation, route }: Props) {
  const { month, monthNumber, year } = route.params;
  const paymentRequests = generatePaymentRequests(monthNumber, year);
  
  // Calculate payment taken (sum of approved amounts)
  const paymentTaken = paymentRequests
    .filter(item => item.status === 'approved')
    .reduce((sum, item) => sum + item.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return '✓';
      case 'pending':
        return '—';
      case 'rejected':
        return '✗';
      default:
        return '';
    }
  };

  const renderStatusIcon = (status: string) => {
    const iconColor = getStatusColor(status);
    const iconText = getStatusIcon(status);
    
    return (
      <View style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: iconColor,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: '700' }}>
          {iconText}
        </Text>
      </View>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'rejected':
        return '#E53935';
      default:
        return '#000000';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Top Header */}
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {/* Bell with notification dot */}
          <View style={{ position: 'relative' }}>
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
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 18, color: '#000000' }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 18, color: '#000000' }}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee and Company Information Section */}
        <View style={{ marginTop: 12, marginBottom: 24 }}>
          {/* Three Column Layout: Left (Company) | Center (Profile) | Right (Company Details) */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
            {/* Left Column: Company Logo and Info */}
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: 140, height: 40, resizeMode: 'contain', marginBottom: 12 }} 
              />
              {/* Year */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Image 
                  source={require('../../assets/calender.png')} 
                  style={{ width: 16, height: 16, marginRight: 6, resizeMode: 'contain' }} 
                />
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
                  {year}
                </Text>
              </View>
              <Text style={{ fontSize: 13, color: '#666666', fontFamily: 'Poppins' }}>
                Joining 01/11/23
              </Text>
            </View>

            {/* Center Column: Profile Picture */}
            <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 16 }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginRight: 4 }}>
                  Kamal Jangid
                </Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins', marginBottom: 8 }}>
                Carpenter
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#E53935', fontFamily: 'Poppins-Bold', textTransform: 'uppercase', textDecorationLine: 'underline' }}>
                PAYMENT REQUEST
              </Text>
            </View>

            {/* Right Column: Company Details and Emp ID */}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <View style={{ alignItems: 'flex-end', marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginRight: 4 }}>
                    Creative Designers
                  </Text>
                  <TouchableOpacity>
                    <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins', marginBottom: 2 }}>
                  Radhakishanpura, Sikar
                </Text>
                <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins', marginBottom: 8 }}>
                  +919460638554
                </Text>
              </View>
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
                Emp id - 001
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Request List Header */}
        <View style={{ 
          backgroundColor: '#F5F5F5',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          marginBottom: 12
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#666666', fontFamily: 'Poppins-SemiBold' }}>
                Request
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#666666', fontFamily: 'Poppins-SemiBold' }}>
                Requested
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#666666', fontFamily: 'Poppins-SemiBold' }}>
                Payment
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Request Items */}
        {paymentRequests.length > 0 ? (
          paymentRequests.map((item, index) => (
            <View 
              key={index}
              style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                paddingHorizontal: 16,
                borderBottomWidth: index < paymentRequests.length - 1 ? 1 : 0,
                borderBottomColor: '#E0E0E0',
                backgroundColor: '#FFFFFF'
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                  {item.requestDate}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                  {item.requestedDate}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                  {item.amount}
                </Text>
                {renderStatusIcon(item.status)}
              </View>
            </View>
          ))
        ) : (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#9E9E9E', fontFamily: 'Poppins' }}>
              No payment requests found for this month
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Payment Taken Summary */}
      <View style={{
        position: 'absolute',
        bottom: 80,
        left: 16,
        right: 16
      }}>
        <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
          Payment Taken: <Text style={{ color: '#E53935', fontWeight: '700', fontFamily: 'Poppins-Bold' }}>{paymentTaken}</Text>
        </Text>
      </View>

      {/* Create Request Button */}
      <View style={{
        position: 'absolute',
        bottom: 20,
        right: 16
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#2196F3',
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 24,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5
          }}
          onPress={() => {
            navigation.navigate('ApplyForPayment');
          }}
        >
          <Text style={{ 
            fontSize: 16, 
            fontWeight: '700', 
            color: '#FFFFFF', 
            fontFamily: 'Poppins-Bold' 
          }}>
            Create Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

