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
  ExpenseRequestDetail: { month: string; monthNumber: string; year: string };
  PaymentRequestDetail: { month: string; monthNumber: string; year: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseRequestReport'>;

interface ExpenseRequestData {
  month: string;
  monthNumber: string;
  pending?: number;
  rejected?: number;
  approved?: number;
  amount?: number;
}

const expenseData: ExpenseRequestData[] = [
  { month: 'January', monthNumber: '01', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'February', monthNumber: '02', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'March', monthNumber: '03', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'April', monthNumber: '04', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'May', monthNumber: '05', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'June', monthNumber: '06', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'July', monthNumber: '07', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'August', monthNumber: '08', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'September', monthNumber: '09', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'October', monthNumber: '10', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'November', monthNumber: '11', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'December', monthNumber: '12', pending: 1, rejected: 1, approved: 2, amount: 3500 },
];

export default function ExpenseRequestReportScreen({ navigation }: Props) {
  const [selectedYear] = useState('2025');

  // Calculate grand totals
  const grandTotal = expenseData.reduce((acc, month) => ({
    pending: (acc.pending || 0) + (month.pending || 0),
    rejected: (acc.rejected || 0) + (month.rejected || 0),
    approved: (acc.approved || 0) + (month.approved || 0),
    amount: (acc.amount || 0) + (month.amount || 0),
  }), { pending: 0, rejected: 0, approved: 0, amount: 0 });

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
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee and Company Information Section */}
        <View style={{ marginTop: 12, marginBottom: 24 }}>
          {/* Company Logo and Employee Info Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            {/* Company Logo on Left */}
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: 140, height: 40, resizeMode: 'contain' }} 
              />
            </View>

            {/* Profile Picture in Center */}
            <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 4 }}>
                Kamal Jangid
              </Text>
              <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins' }}>
                Carpenter
              </Text>
            </View>

            {/* Company Info on Right */}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 4 }}>
                Creative Designers
              </Text>
              <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins', marginBottom: 2 }}>
                Radhakishanpura, Sikar
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins' }}>
                  +919460638554
                </Text>
                <TouchableOpacity style={{ marginLeft: 8 }}>
                  <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Expense Report Link and Emp ID Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#FF5252', fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }}>
                EXPENSE REPORT
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
                Emp id - 001
              </Text>
            </View>
          </View>
        </View>

        {/* Year Selector */}
        <View style={{ marginBottom: 16 }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: '#F5F5F5',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 8
          }}>
            <Image 
              source={require('../../assets/calender.png')} 
              style={{ width: 18, height: 18, marginRight: 8, resizeMode: 'contain' }} 
            />
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
              {selectedYear}
            </Text>
          </View>
        </View>

        {/* Expense Request Table */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ borderWidth: 1, borderColor: '#CCCCCC', backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
              <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }} />
              <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, color: '#FFC107', fontFamily: 'Poppins-SemiBold' }}>Pen</Text>
              </View>
              <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, color: '#E53935', fontFamily: 'Poppins-SemiBold' }}>Rej</Text>
              </View>
              <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, color: '#4CAF50', fontFamily: 'Poppins-SemiBold' }}>App</Text>
              </View>
              <View style={{ width: 110, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins-SemiBold' }}>Amount</Text>
              </View>
            </View>

            {expenseData.map((monthData, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('ExpenseRequestDetail', {
                    month: monthData.month,
                    monthNumber: monthData.monthNumber,
                    year: selectedYear
                  });
                }}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                  <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: index === expenseData.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                      {monthData.monthNumber}-{monthData.month}
                    </Text>
                  </View>
                  <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: index === expenseData.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: '#FF9800', fontFamily: 'Poppins' }}>
                      {monthData.pending}
                    </Text>
                  </View>
                  <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: index === expenseData.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins' }}>
                      {monthData.rejected}
                    </Text>
                  </View>
                  <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: index === expenseData.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: '#4CAF50', fontFamily: 'Poppins' }}>
                      {monthData.approved}
                    </Text>
                  </View>
                  <View style={{ width: 110, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderBottomWidth: index === expenseData.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                      {monthData.amount}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
              <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#E53935', fontFamily: 'Poppins-Bold' }}>
                  Grand Total
                </Text>
              </View>
              <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#FF9800', fontFamily: 'Poppins' }}>
                  {grandTotal.pending}
                </Text>
              </View>
              <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins' }}>
                  {grandTotal.rejected}
                </Text>
              </View>
              <View style={{ width: 70, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#4CAF50', fontFamily: 'Poppins' }}>
                  {grandTotal.approved}
                </Text>
              </View>
              <View style={{ width: 110, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                  {grandTotal.amount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

