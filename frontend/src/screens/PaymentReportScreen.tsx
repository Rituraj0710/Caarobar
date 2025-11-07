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
  PaymentReport: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentReport'>;

interface Transaction {
  date: string;
  description: string;
  credit: string;
  debit: string;
  balance: string;
}

const transactions: Transaction[] = [
  { date: '01/04/24', description: 'Opening BL', credit: '', debit: '', balance: 'Nill' },
  { date: '31/07/24', description: '07 - Salary', credit: '15000', debit: '', balance: '15000 Cr' },
  { date: '07/08/24', description: 'PhonePe', credit: '', debit: '15000', balance: 'Nill' },
  { date: '31/08/24', description: '08 - Salary', credit: '14000', debit: '', balance: '14000 Cr' },
  { date: '07/09/24', description: 'Gpay', credit: '', debit: '13000', balance: '1000 Cr' },
  { date: '31/08/24', description: '08 - Expense', credit: '1500', debit: '', balance: '2500 Cr' },
  { date: '07/10/24', description: 'Cash', credit: '', debit: '1000', balance: '1500 Cr' },
];

export default function PaymentReportScreen({ navigation }: Props) {
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

  // Calculate totals
  const totals = transactions.reduce((acc, txn) => {
    const credit = parseInt(txn.credit) || 0;
    const debit = parseInt(txn.debit) || 0;
    acc.credit += credit;
    acc.debit += debit;
    return acc;
  }, { credit: 0, debit: 0 });

  const finalBalance = totals.credit - totals.debit;

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
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginRight: 8 }}>
            <Text style={{ fontSize: 20, color: '#000000' }}>←</Text>
          </TouchableOpacity>
          <Image 
            source={require('../../assets/header carobar.png')} 
            style={{ width: 96, height: 22, resizeMode: 'contain' }} 
          />
        </View>

        {/* Right: Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Bell with notification dot */}
          <View style={{ position: 'relative', marginRight: 12 }}>
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
          <TouchableOpacity style={{ padding: 4, marginRight: 12 }}>
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
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins', textAlign: 'left', lineHeight: 18 }}>
                  Creative Designers{'\n'}Radhakishanpura, Sikar{'\n'}+919460638554
                </Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Joining Date and Report Title Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 8 }}>
            {/* Joining Date - Left */}
            <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
              Joining 01/11/23
            </Text>

            {/* PAYMENT REPORT - Centered */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '700', 
                color: '#E53935', 
                fontFamily: 'Poppins-Bold',
                textDecorationLine: 'underline'
              }}>
                PAYMENT REPORT
              </Text>
            </View>

            {/* Emp ID - Right aligned */}
            <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
              Emp id - {empId}
            </Text>
          </View>
        </View>

        {/* Date Range Header */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginTop: 16,
          marginBottom: 12,
          paddingHorizontal: 4
        }}>
          <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
            From Date 01/04/2024
          </Text>
          <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
            To Date 31/07/2024
          </Text>
        </View>

        {/* Payment Report Table */}
        <View style={{ 
          marginTop: 8, 
          borderWidth: 1, 
          borderColor: '#CCCCCC', 
          backgroundColor: '#FFFFFF'
        }}>
          {/* Header Row */}
          <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Date</Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Description</Text>
            </View>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Cr</Text>
            </View>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#4CAF50', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Dr</Text>
            </View>
            <View style={{ width: 90, paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Balance</Text>
            </View>
          </View>

          {/* Transaction Rows */}
          {transactions.map((txn, idx) => (
            <View 
              key={idx}
              style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}
            >
              <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>{txn.date}</Text>
              </View>
              <View style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>{txn.description}</Text>
              </View>
              <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
                <Text style={{ fontSize: 13, color: txn.credit ? '#E53935' : '#000000', fontFamily: 'Poppins' }}>{txn.credit || ''}</Text>
              </View>
              <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
                <Text style={{ fontSize: 13, color: txn.debit ? '#4CAF50' : '#000000', fontFamily: 'Poppins' }}>{txn.debit || ''}</Text>
              </View>
              <View style={{ width: 90, paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>{txn.balance}</Text>
              </View>
            </View>
          ))}

          {/* Collected Payment Summary Row */}
          <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-Bold' }}></Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
              <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>Collected Payment</Text>
            </View>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>{totals.credit}</Text>
            </View>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>{totals.debit}</Text>
            </View>
            <View style={{ width: 90, paddingVertical: 12, paddingHorizontal: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>
                {finalBalance > 0 ? `${finalBalance} Cr` : finalBalance < 0 ? `${Math.abs(finalBalance)} Dr` : 'Nill'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
