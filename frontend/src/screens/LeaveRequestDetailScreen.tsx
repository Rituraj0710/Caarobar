import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';
import BackButton from '../components/BackButton';

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
  { startDate: '08/01/25', endDate: '08/01/25', duration: 'Half Day', status: 'pending' },
  { startDate: '10/01/25', endDate: '10/01/25', duration: '1 Day', status: 'approved' },
  { startDate: '15/01/25', endDate: '16/01/25', duration: '2 Day', status: 'rejected' },
];

export default function LeaveRequestDetailScreen({ navigation }: Props) {
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
        return <Text style={{ fontSize: 16, color: '#4CAF50' }}>✓</Text>;
      case 'pending':
        return <Text style={{ fontSize: 16, color: '#F59E0B' }}>−</Text>;
      case 'rejected':
        return <Text style={{ fontSize: 16, color: '#E53935' }}>✗</Text>;
      default:
        return null;
    }
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
        {/* Left: Back Arrow */}
        <BackButton />

        {/* Center: Logo */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image 
            source={require('../../assets/header carobar.png')} 
            style={{ width: 96, height: 22, resizeMode: 'contain' }} 
          />
        </View>

        {/* Right: Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
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

          {/* Search Icon */}
          <TouchableOpacity style={{ padding: 4 }}>
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
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User and Company Information Section */}
        <View style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: 12, 
          padding: 16, 
          marginTop: 12,
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 }, 
          shadowOpacity: 0.05, 
          shadowRadius: 6, 
          elevation: 2 
        }}>
          {/* Three Column Layout: Logo | Profile | Company Details */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            {/* Left: Company Logo */}
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: 120, height: 30, resizeMode: 'contain' }} 
              />
            </View>

            {/* Center: Employee Profile */}
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8 }}>
              {/* Profile Picture */}
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 8 }} 
              />
              
              {/* Name with menu icon to the right */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginRight: 6 }}>
                  {name}
                </Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                </TouchableOpacity>
              </View>

              {/* Role */}
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }}>
                Carpenter
              </Text>
            </View>

            {/* Right: Company Details (left-aligned within right column) */}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins', textAlign: 'left', lineHeight: 18 }}>
                Creative Designers{'\n'}Radhakishanpura, Sikar{'\n'}+919460638554
              </Text>
            </View>
          </View>

          {/* Report Title and Emp ID Row - Same Line */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            {/* LEAVE REQUEST - Centered */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '700', 
                color: '#E53935', 
                fontFamily: 'Poppins-Bold',
                textDecorationLine: 'underline'
              }}>
                LEAVE REQUEST
              </Text>
            </View>

            {/* Emp ID - Right aligned */}
            <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
              Emp id - {empId}
            </Text>
          </View>

          {/* Joining Date and Year Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 8 }}>
            <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins', marginRight: 16 }}>
              Joining {joiningDate}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/calender.png')} style={{ width: 16, height: 16, marginRight: 6, resizeMode: 'contain' }} />
              <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>2025</Text>
            </View>
          </View>
        </View>

        {/* Leave Request Table */}
        <View style={{ marginTop: 16, borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 8, overflow: 'hidden' }}>
          {/* Header Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 12 }}>
            <Text style={{ flex: 1, fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Request</Text>
            <Text style={{ flex: 1, fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Requested</Text>
            <Text style={{ flex: 1, fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Leave</Text>
          </View>

          {/* Data Rows */}
          {leaveRequests.map((request, idx) => (
            <View 
              key={idx}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderTopWidth: 1, 
                borderTopColor: '#E6E6E6', 
                backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA'
              }}
            >
              <Text style={{ flex: 1, fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>{request.startDate}</Text>
              <Text style={{ flex: 1, fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>{request.endDate}</Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>{request.duration}</Text>
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
          bottom: 50,
          right: 16,
          backgroundColor: '#4285F4',
          paddingHorizontal: 24,
          paddingVertical: 14,
          borderRadius: 28,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        }}
        onPress={() => {
          navigation.navigate('ApplyForLeave');
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 15, fontFamily: 'Poppins-Bold', fontWeight: '700' }}>
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
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E6E6E6'
      }}>
        <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', textAlign: 'right' }}>
          Leave Taken: <Text style={{ color: '#E53935', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>{leaveTaken.toString().padStart(2, '0')}</Text>
        </Text>
      </View>
    </View>
  );
}

