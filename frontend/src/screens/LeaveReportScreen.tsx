import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';

type RootStackParamList = {
  Language: undefined;
  SignIn: undefined;
  OTPVerification: { identifier: string; role?: 'Admin' | 'Employee' };
  Register: undefined;
  Home: undefined;
  AdminHome: undefined;
  LeaveReport: undefined;
  LeaveRequestDetail: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LeaveReport'>;

const months = [
  { label: '01-January', pen: '', rej: '', app: '', percent: '' },
  { label: '02-February', pen: 0, rej: 0, app: 2, percent: '98%' },
  { label: '03-March', pen: 1, rej: 1, app: 2, percent: '98%' },
  { label: '04-April', pen: 0, rej: 1, app: 2, percent: '98%' },
  { label: '05-May', pen: 1, rej: 1, app: 0, percent: '100%' },
  { label: '06-June', pen: 0, rej: 1, app: 2, percent: '98%' },
  { label: '07-July', pen: 1, rej: 1, app: 2, percent: '98%' },
  { label: '08-August', pen: 1, rej: 0, app: 2, percent: '98%' },
  { label: '09-September', pen: 1, rej: 1, app: 0, percent: '100%' },
  { label: '10-October', pen: 0, rej: 1, app: 2, percent: '98%' },
  { label: '11-November', pen: 1, rej: 1, app: 0, percent: '100%' },
  { label: '12-December', pen: '', rej: '', app: '', percent: '' },
];

export default function LeaveReportScreen({ navigation }: Props) {
  const [name, setName] = useState<string>('Kamal Jangid');
  const [empId, setEmpId] = useState<string>('001');

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

  // Calculate grand totals
  const grandTotal = months.reduce((acc, month) => {
    if (typeof month.pen === 'number') acc.pen += month.pen;
    if (typeof month.rej === 'number') acc.rej += month.rej;
    if (typeof month.app === 'number') acc.app += month.app;
    return acc;
  }, { pen: 0, rej: 0, app: 0 });

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Text style={{ fontSize: 20, color: '#000000' }}>←</Text>
        </TouchableOpacity>

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
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 12 }}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            {/* LEAVE REQUEST REPORT - Centered */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity>
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '700', 
                  color: '#E53935', 
                  fontFamily: 'Poppins-Bold',
                  textDecorationLine: 'underline'
                }}>
                  LEAVE REQUEST REPORT
                </Text>
              </TouchableOpacity>
            </View>

            {/* Emp ID - Right aligned */}
            <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
              Emp id - {empId}
            </Text>
          </View>
        </View>

        {/* Year + Headers Row */}
        <View style={{ marginTop: 16 }}>
          <View style={{ borderWidth: 1, borderColor: '#CCCCCC', backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Image source={require('../../assets/calender.png')} style={{ width: 18, height: 18, marginRight: 8, resizeMode: 'contain' }} />
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-Medium' }}>2025</Text>
              </View>
              <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#F59E0B', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Pen</Text>
              </View>
              <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Rej</Text>
              </View>
              <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#4CAF50', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>App</Text>
              </View>
              <View style={{ width: 90, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Percent</Text>
              </View>
            </View>

            {months.map((month, idx) => (
              <TouchableOpacity
                key={month.label}
                onPress={() => navigation.navigate('LeaveRequestDetail')}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                  <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: idx === months.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>{month.label}</Text>
                  </View>
                  <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: idx === months.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: month.pen === '' ? '#000000' : '#F59E0B', fontFamily: 'Poppins' }}>
                      {month.pen === '' ? '' : month.pen}
                    </Text>
                  </View>
                  <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: idx === months.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: month.rej === '' ? '#000000' : '#E53935', fontFamily: 'Poppins' }}>
                      {month.rej === '' ? '' : month.rej}
                    </Text>
                  </View>
                  <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: idx === months.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: month.app === '' ? '#000000' : '#4CAF50', fontFamily: 'Poppins' }}>
                      {month.app === '' ? '' : month.app}
                    </Text>
                  </View>
                  <View style={{ width: 90, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderBottomWidth: idx === months.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                      {month.percent || ''}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => navigation.navigate('LeaveRequestDetail')}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
                <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>Grand Total</Text>
                </View>
                <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: 13, color: '#F59E0B', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>{grandTotal.pen}</Text>
                </View>
                <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>{grandTotal.rej}</Text>
                </View>
                <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: 13, color: '#4CAF50', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>{grandTotal.app}</Text>
                </View>
                <View style={{ width: 90, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}>
                  <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>98.5%</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
