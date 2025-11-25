import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, useSafeArea } from '../utils/responsive';
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
  const insets = useSafeArea();
  const { month, monthNumber, year } = route.params;
  const paymentRequests = generatePaymentRequests(monthNumber, year);
  const [activeTab, setActiveTab] = useState<'Request' | 'Requested' | 'Leave'>('Request');
  
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
        width: wp(20),
        height: hp(20),
        borderRadius: hp(10),
        backgroundColor: iconColor,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{ fontSize: fontSize(12), color: '#FFFFFF', fontWeight: '700' }} allowFontScaling={false}>
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
      <StatusBar barStyle="light-content" backgroundColor="#248CFF" />
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
          
          {/* Center: Title */}
          <Text style={{ 
            fontSize: fontSize(20), 
            fontWeight: '700', 
            color: '#FFFFFF', 
            fontFamily: 'Poppins-Bold',
            flex: 1
          }} allowFontScaling={false}>
            Payment Request
          </Text>
        </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing(100) + insets.bottom, paddingHorizontal: spacing(16) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee Information Card */}
        <View style={{ 
          marginTop: spacing(16), 
          marginBottom: spacing(20),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(12),
          padding: spacing(16),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(2) },
          shadowOpacity: 0.1,
          shadowRadius: hp(4),
          elevation: 2,
          borderWidth: wp(1),
          borderColor: '#E0E0E0'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Profile Picture on Left */}
            <Image 
              source={require('../../assets/Profile picture.png')} 
              style={{ 
                width: wp(64), 
                height: hp(64), 
                borderRadius: hp(32), 
                resizeMode: 'cover',
                marginRight: spacing(12)
              }}
            />

            {/* Name and Role in Middle */}
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: fontSize(16), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold',
                marginBottom: spacing(4)
              }} allowFontScaling={false}>
                Kamal Jangid
              </Text>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#9E9E9E', 
                fontFamily: 'Poppins'
              }} allowFontScaling={false}>
                Carpenter
              </Text>
            </View>

            {/* Emp ID and Phone on Right */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#9E9E9E', 
                fontFamily: 'Poppins',
                marginBottom: spacing(6)
              }} allowFontScaling={false}>
                Emp ID - 001
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize(14), color: '#4285F4', marginRight: spacing(4) }} allowFontScaling={false}>📞</Text>
                <Text style={{ 
                  fontSize: fontSize(13), 
                  color: '#4285F4', 
                  fontFamily: 'Poppins'
                }} allowFontScaling={false}>
                  9460638554
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={{ 
          flexDirection: 'row', 
          marginBottom: spacing(16),
          borderBottomWidth: wp(1),
          borderBottomColor: '#E0E0E0'
        }}>
          <TouchableOpacity 
            onPress={() => setActiveTab('Request')}
            style={{ 
              flex: 1, 
              paddingBottom: spacing(12),
              borderBottomWidth: activeTab === 'Request' ? wp(2) : 0,
              borderBottomColor: '#248CFF',
              alignItems: 'center'
            }}
          >
            <Text style={{ 
              fontSize: fontSize(14), 
              fontWeight: activeTab === 'Request' ? '700' : '400',
              color: '#000000', 
              fontFamily: activeTab === 'Request' ? 'Poppins-Bold' : 'Poppins'
            }} allowFontScaling={false}>
              Request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('Requested')}
            style={{ 
              flex: 1, 
              paddingBottom: spacing(12),
              borderBottomWidth: activeTab === 'Requested' ? wp(2) : 0,
              borderBottomColor: '#248CFF',
              alignItems: 'center'
            }}
          >
            <Text style={{ 
              fontSize: fontSize(14), 
              fontWeight: activeTab === 'Requested' ? '700' : '400',
              color: '#000000', 
              fontFamily: activeTab === 'Requested' ? 'Poppins-Bold' : 'Poppins'
            }} allowFontScaling={false}>
              Requested
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('Leave')}
            style={{ 
              flex: 1, 
              paddingBottom: spacing(12),
              borderBottomWidth: activeTab === 'Leave' ? wp(2) : 0,
              borderBottomColor: '#248CFF',
              alignItems: 'center'
            }}
          >
            <Text style={{ 
              fontSize: fontSize(14), 
              fontWeight: activeTab === 'Leave' ? '700' : '400',
              color: '#000000', 
              fontFamily: activeTab === 'Leave' ? 'Poppins-Bold' : 'Poppins'
            }} allowFontScaling={false}>
              Leave
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payment Request Table Header */}
        <View style={{ 
          flexDirection: 'row',
          paddingVertical: spacing(12),
          paddingHorizontal: spacing(16),
          marginBottom: spacing(8)
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: fontSize(13), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>
              Request
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: fontSize(13), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>
              Requested
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: fontSize(13), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>
              Leave
            </Text>
          </View>
        </View>

        {/* Payment Request Table Rows */}
        {paymentRequests.length > 0 ? (
          paymentRequests.map((item, index) => (
            <View 
              key={index}
              style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16),
                paddingHorizontal: spacing(16),
                borderBottomWidth: index < paymentRequests.length - 1 ? wp(1) : 0,
                borderBottomColor: '#E0E0E0',
                backgroundColor: '#FFFFFF'
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  {item.requestDate}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  {item.requestedDate}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins', marginRight: spacing(8) }} allowFontScaling={false}>
                  {item.amount}
                </Text>
                {renderStatusIcon(item.status)}
              </View>
            </View>
          ))
        ) : (
          <View style={{ paddingVertical: spacing(40), alignItems: 'center' }}>
            <Text style={{ fontSize: fontSize(14), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>
              No payment requests found for this month
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Payment Taken Summary */}
      <View style={{
        position: 'absolute',
        bottom: spacing(80) + insets.bottom,
        right: spacing(16)
      }}>
        <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
          Payment Taken: <Text style={{ color: '#E53935', fontWeight: '700', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>{paymentTaken}</Text>
        </Text>
      </View>

      {/* Create Request Button - Pill Shape */}
      <View style={{
        position: 'absolute',
        bottom: spacing(20) + insets.bottom,
        right: spacing(16)
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#248CFF',
            paddingVertical: spacing(12),
            paddingHorizontal: spacing(24),
            borderRadius: hp(25),
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: spacing(2) },
            shadowOpacity: 0.25,
            shadowRadius: spacing(4),
            elevation: 4,
            borderTopWidth: wp(1),
            borderTopColor: '#4A9EFF'
          }}
          onPress={() => {
            navigation.navigate('ApplyForPayment');
          }}
        >
          <Text style={{ 
            fontSize: fontSize(14), 
            fontWeight: '700', 
            color: '#FFFFFF', 
            fontFamily: 'Poppins-Bold'
          }} allowFontScaling={false}>
            Create Request
          </Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </View>
  );
}

