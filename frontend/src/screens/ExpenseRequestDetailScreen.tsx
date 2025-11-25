import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, useSafeArea } from '../utils/responsive';
import BackButton from '../components/BackButton';
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
  ExpenseRequestDetail: { month: string; monthNumber: string; year: string };
  PaymentRequestDetail: { month: string; monthNumber: string; year: string };
  ApplyForPayment: undefined;
  ApplyForExpense: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseRequestDetail'>;

interface ExpenseRequest {
  date: string;
  type: string;
  payment: number;
  approved: 'approved' | 'pending' | 'rejected';
  approver: string;
}

const expenseRequests: ExpenseRequest[] = [
  { date: '06/01/25', type: 'Office', payment: 2000, approved: 'approved', approver: 'Manager' },
  { date: '09/01/25', type: 'Transport', payment: 1000, approved: 'pending', approver: 'Admin' },
  { date: '12/01/25', type: 'Travel', payment: 1500, approved: 'approved', approver: 'Supervisor' },
  { date: '18/01/25', type: 'Factory', payment: 500, approved: 'rejected', approver: 'Supervisor - 2' },
];

export default function ExpenseRequestDetailScreen({ navigation, route }: Props) {
  const insets = useSafeArea();
  const { month, monthNumber, year } = route.params;

  const totalExpense = expenseRequests.reduce((sum, req) => sum + req.payment, 0);

  const getApprovalIcon = (status: string) => {
    if (status === 'approved') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: wp(20), height: hp(20), borderRadius: hp(10), backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center', marginRight: spacing(6) }}>
            <Text style={{ color: '#FFFFFF', fontSize: fontSize(12), fontWeight: 'bold' }} allowFontScaling={false}>✓</Text>
          </View>
        </View>
      );
    } else if (status === 'pending') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: wp(20), height: hp(20), borderRadius: hp(10), backgroundColor: '#FFC107', alignItems: 'center', justifyContent: 'center', marginRight: spacing(6) }}>
            <Text style={{ color: '#FFFFFF', fontSize: fontSize(12), fontWeight: 'bold' }} allowFontScaling={false}>−</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: wp(20), height: hp(20), borderRadius: hp(10), backgroundColor: '#E53935', alignItems: 'center', justifyContent: 'center', marginRight: spacing(6) }}>
            <Text style={{ color: '#FFFFFF', fontSize: fontSize(12), fontWeight: 'bold' }} allowFontScaling={false}>×</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Top Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(12),
        paddingBottom: spacing(12),
        backgroundColor: '#FFFFFF'
      }}>
        {/* Left: Back Arrow and Logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ marginRight: spacing(8) }}>
            <BackButton />
          </View>
          <Image 
            source={require('../../assets/header carobar.png')} 
            style={{ width: wp(96), height: hp(22), resizeMode: 'contain' }} 
          />
        </View>

        {/* Right: Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(16) }}>
          {/* Bell with notification dot */}
          <View style={{ position: 'relative' }}>
            <TouchableOpacity style={{ padding: spacing(4) }}>
              <Image 
                source={require('../../assets/Frame.png')} 
                style={{ width: wp(22), height: hp(22), resizeMode: 'contain' }} 
              />
            </TouchableOpacity>
            <View style={{ 
              position: 'absolute', 
              right: spacing(2), 
              top: spacing(4), 
              width: wp(8), 
              height: hp(8), 
              borderRadius: hp(4), 
              backgroundColor: '#4CAF50' 
            }} />
          </View>
          <TouchableOpacity style={{ padding: spacing(4) }}>
            <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: spacing(4) }}>
            <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing(100) + insets.bottom, paddingHorizontal: spacing(16) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee and Company Information Section */}
        <View style={{ marginTop: spacing(12), marginBottom: spacing(24) }}>
          {/* Top Row: Logo, Profile, Company Info */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing(16) }}>
            {/* Left: Company Logo */}
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: wp(140), height: hp(40), resizeMode: 'contain', marginBottom: spacing(8) }} 
              />
              {/* Calendar Icon with Year */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing(8) }}>
                <Image 
                  source={require('../../assets/calender.png')} 
                  style={{ width: wp(18), height: hp(18), marginRight: spacing(4), resizeMode: 'contain' }} 
                />
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{year}</Text>
              </View>
              {/* Joining Date */}
              <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                Joining 01/11/23
              </Text>
            </View>

            {/* Center: Profile Picture */}
            <View style={{ alignItems: 'center', marginHorizontal: spacing(16) }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: wp(80), height: hp(80), borderRadius: hp(40), marginBottom: spacing(8), resizeMode: 'cover' }}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing(4) }}>
                <Text style={{ fontSize: fontSize(16), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  Kamal Jangid
                </Text>
                <TouchableOpacity style={{ marginLeft: spacing(8) }}>
                  <Text style={{ fontSize: fontSize(16), color: '#000000' }} allowFontScaling={false}>⋮</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: fontSize(14), color: '#666666', fontFamily: 'Poppins', marginBottom: spacing(8) }} allowFontScaling={false}>
                Carpenter
              </Text>
              {/* Expense Request Link */}
              <Text style={{ fontSize: fontSize(16), fontWeight: '700', color: '#FF5252', fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }} allowFontScaling={false}>
                EXPENSE REQUEST
              </Text>
              {/* Emp ID below EXPENSE REQUEST */}
              <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins', marginTop: spacing(8) }} allowFontScaling={false}>
                Emp id - 001
              </Text>
            </View>

            {/* Right: Company Info */}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(4) }} allowFontScaling={false}>
                Creative Designers
              </Text>
              <Text style={{ fontSize: fontSize(12), color: '#666666', fontFamily: 'Poppins', marginBottom: spacing(2) }} allowFontScaling={false}>
                Radhakishanpura ,Sikar
              </Text>
              <Text style={{ fontSize: fontSize(12), color: '#666666', fontFamily: 'Poppins' }} allowFontScaling={false}>
                +919460638554
              </Text>
            </View>
          </View>
        </View>

        {/* Expense Request Table */}
        <View style={{ marginBottom: spacing(24) }}>
          {/* Table Container */}
          <View style={{ 
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: hp(12),
            overflow: 'hidden'
          }}>
            {/* Table Header */}
            <View style={{ 
              flexDirection: 'row', 
              backgroundColor: '#F5F5F5',
              borderBottomWidth: 1,
              borderBottomColor: '#E0E0E0',
              paddingVertical: spacing(12),
              paddingHorizontal: spacing(12)
            }}>
              <View style={{ flex: 1.5 }}>
                <Text style={{ fontSize: fontSize(12), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>Request</Text>
              </View>
              <View style={{ flex: 1.5 }}>
                <Text style={{ fontSize: fontSize(12), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>Type</Text>
              </View>
              <View style={{ flex: 1.5 }}>
                <Text style={{ fontSize: fontSize(12), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>Payment</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: fontSize(12), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>Approved</Text>
              </View>
            </View>

            {/* Table Rows */}
            {expenseRequests.map((request, index) => (
              <View
                key={index}
                style={{ 
                  flexDirection: 'row',
                  borderBottomWidth: index < expenseRequests.length - 1 ? 1 : 0,
                  borderBottomColor: '#E0E0E0',
                  paddingVertical: spacing(12),
                  paddingHorizontal: spacing(12),
                  backgroundColor: '#FFFFFF'
                }}
              >
                {/* Request Date */}
                <View style={{ flex: 1.5 }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {request.date}
                  </Text>
                </View>
                
                {/* Type */}
                <View style={{ flex: 1.5 }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {request.type}
                  </Text>
                </View>
                
                {/* Payment */}
                <View style={{ flex: 1.5 }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {request.payment}
                  </Text>
                </View>
                
                {/* Approved */}
                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                  {getApprovalIcon(request.approved)}
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {request.approver}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: '#FFFFFF',
        paddingHorizontal: spacing(16),
        paddingVertical: spacing(12),
        paddingBottom: spacing(12) + insets.bottom,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
        {/* Create Request Button */}
        <View style={{ alignItems: 'flex-end', marginBottom: spacing(12) }}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('ApplyForExpense')}
            style={{ 
              backgroundColor: '#2196F3', 
              paddingVertical: spacing(12), 
              paddingHorizontal: spacing(24), 
              borderRadius: hp(8) 
            }}
          >
            <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>
              Create Request
            </Text>
          </TouchableOpacity>
        </View>

        {/* Expense Total */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>Expense</Text>
          <Text style={{ fontSize: fontSize(14), fontWeight: '700', color: '#FF5252', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
            {totalExpense}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

