import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';
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
  LeaveRequestDetail: undefined;
  ApplyForLeave: undefined;
  PaymentReport: undefined;
  Calendar: undefined;
  Contacts: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LeaveRequestDetail'>;

interface LeaveRequest {
  startDate: string;
  endDate: string;
  duration: string;
  status: 'approved' | 'pending' | 'rejected';
}

const leaveRequests: LeaveRequest[] = [
  { startDate: '06/01/25', endDate: '07/01/25', duration: '2 Hours', status: 'approved' },
  { startDate: '09/01/25', endDate: '10/01/25', duration: 'Half Day', status: 'pending' },
  { startDate: '12/01/25', endDate: '15/01/25', duration: '1 Day', status: 'approved' },
  { startDate: '18/01/25', endDate: '20/01/25', duration: '2 Day', status: 'rejected' },
];

export default function LeaveRequestDetailScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [name, setName] = useState<string>('Kamal Jangid');
  const [empId, setEmpId] = useState<string>('001');
  const [joiningDate] = useState<string>('01/11/23');
  const [leaveTaken] = useState<number>(5);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/users/me');
        setName(data?.name || 'Kamal Jangid');
        setEmpId(data?.employeeId || '001');
      } catch {
        const saved = await AsyncStorage.getItem('@user');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setName(parsed?.name || 'Kamal Jangid');
            setEmpId(parsed?.employeeId || '001');
          } catch {}
        }
      }
    })();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Text style={{ fontSize: fontSize(16), color: '#4CAF50' }} allowFontScaling={false}>✓</Text>;
      case 'pending':
        return <Text style={{ fontSize: fontSize(16), color: '#F59E0B' }} allowFontScaling={false}>−</Text>;
      case 'rejected':
        return <Text style={{ fontSize: fontSize(16), color: '#E53935' }} allowFontScaling={false}>✗</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#248CFF" />
      
      {/* Header - Blue Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(12),
        paddingBottom: spacing(12),
        backgroundColor: '#248CFF'
      }}>
        {/* Left: Back Arrow */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: spacing(4) }}
        >
          <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>

        {/* Center: Title */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ 
            fontSize: fontSize(18), 
            fontWeight: '600', 
            color: '#FFFFFF', 
            fontFamily: 'Poppins-SemiBold' 
          }} allowFontScaling={false}>
            Leave Request
          </Text>
        </View>

        {/* Right: Empty space for alignment */}
        <View style={{ width: wp(32) }} />
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing(120) + insets.bottom, paddingHorizontal: spacing(16) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee Information Card */}
        <View style={{ 
          marginTop: spacing(12), 
          marginBottom: spacing(16),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(12),
          padding: spacing(16),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(2) },
          shadowOpacity: 0.1,
          shadowRadius: spacing(4),
          elevation: 3
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Profile Picture on Left */}
            <Image 
              source={require('../../assets/Profile picture.png')} 
              style={{ 
                width: wp(64), 
                height: hp(64), 
                borderRadius: hp(32), 
                marginRight: spacing(12), 
                resizeMode: 'cover' 
              }}
            />
            
            {/* Employee Info in Middle */}
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ 
                fontSize: fontSize(15), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold',
                marginBottom: spacing(4)
              }} allowFontScaling={false}>
                {name}
              </Text>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#666666', 
                fontFamily: 'Poppins'
              }} allowFontScaling={false}>
                Carpenter
              </Text>
            </View>

            {/* Emp ID and Phone on Right */}
            <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#666666', 
                fontFamily: 'Poppins',
                marginBottom: spacing(6)
              }} allowFontScaling={false}>
                Emp ID - {empId}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: fontSize(14), 
                  color: '#248CFF', 
                  marginRight: spacing(4)
                }} allowFontScaling={false}>
                  📞
                </Text>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#248CFF', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  9460638554
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Leave Request Table */}
        <View style={{ 
          marginTop: spacing(8), 
          marginBottom: spacing(16),
          borderWidth: wp(1), 
          borderColor: '#E6E6E6', 
          borderRadius: hp(8), 
          overflow: 'hidden',
          backgroundColor: '#FFFFFF'
        }}>
          {/* Header Row */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: '#F5F5F5', 
            paddingHorizontal: spacing(12), 
            paddingVertical: spacing(12),
            borderBottomWidth: wp(1),
            borderBottomColor: '#E6E6E6'
          }}>
            <Text style={{ flex: 1, fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Request</Text>
            <Text style={{ flex: 1, fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Requested</Text>
            <Text style={{ flex: 1, fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Leave</Text>
          </View>

          {/* Data Rows */}
          {leaveRequests.map((request, idx) => (
            <View 
              key={idx}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingVertical: spacing(12),
                paddingHorizontal: spacing(12),
                borderTopWidth: idx === 0 ? 0 : wp(1), 
                borderTopColor: '#E6E6E6', 
                backgroundColor: '#FFFFFF',
                minHeight: hp(44)
              }}
            >
              <Text style={{ flex: 1, fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{request.startDate}</Text>
              <Text style={{ flex: 1, fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{request.endDate}</Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins', marginRight: spacing(8) }} allowFontScaling={false}>{request.duration}</Text>
                {getStatusIcon(request.status)}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Create Request Button - Floating */}
      <TouchableOpacity 
        style={{
          position: 'absolute',
          bottom: spacing(60) + insets.bottom,
          right: spacing(16),
          backgroundColor: '#248CFF',
          paddingHorizontal: spacing(24),
          paddingVertical: spacing(14),
          borderRadius: hp(8),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(2) },
          shadowOpacity: 0.3,
          shadowRadius: spacing(4),
          elevation: 5,
        }}
        onPress={() => {
          navigation.navigate('ApplyForLeave');
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: fontSize(15), fontFamily: 'Poppins-Bold', fontWeight: '700' }} allowFontScaling={false}>
          Create Request
        </Text>
      </TouchableOpacity>

      {/* Leave Taken Footer - Fixed */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingVertical: spacing(12),
        paddingHorizontal: spacing(16),
        paddingBottom: spacing(12) + insets.bottom,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderTopWidth: wp(1),
        borderTopColor: '#E6E6E6'
      }}>
        <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins', textAlign: 'right' }} allowFontScaling={false}>
          Leave Taken: <Text style={{ color: '#E53935', fontFamily: 'Poppins-Bold', fontWeight: '700' }} allowFontScaling={false}>{leaveTaken.toString().padStart(2, '0')}</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

