import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing } from '../utils/responsive';
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
  const { month, monthNumber, year } = route.params;

  const totalExpense = expenseRequests.reduce((sum, req) => sum + req.payment, 0);

  const getApprovalIcon = (status: string) => {
    if (status === 'approved') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
          </View>
        </View>
      );
    } else if (status === 'pending') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFC107', alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>−</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#E53935', alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>×</Text>
          </View>
        </View>
      );
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
          {/* Top Row: Logo, Profile, Company Info */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
            {/* Left: Company Logo */}
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: 140, height: 40, resizeMode: 'contain', marginBottom: 8 }} 
              />
              {/* Calendar Icon with Year */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Image 
                  source={require('../../assets/calender.png')} 
                  style={{ width: 18, height: 18, marginRight: 4, resizeMode: 'contain' }} 
                />
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>{year}</Text>
              </View>
              {/* Joining Date */}
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
                Joining 01/11/23
              </Text>
            </View>

            {/* Center: Profile Picture */}
            <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                  Kamal Jangid
                </Text>
                <TouchableOpacity style={{ marginLeft: 8 }}>
                  <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins', marginBottom: 8 }}>
                Carpenter
              </Text>
              {/* Expense Request Link */}
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#FF5252', fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }}>
                EXPENSE REQUEST
              </Text>
              {/* Emp ID below EXPENSE REQUEST */}
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', marginTop: 8 }}>
                Emp id - 001
              </Text>
            </View>

            {/* Right: Company Info */}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 4 }}>
                Creative Designers
              </Text>
              <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins', marginBottom: 2 }}>
                Radhakishanpura ,Sikar
              </Text>
              <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins' }}>
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
            borderRadius: 12,
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
                <Text style={{ fontSize: fontSize(12), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Request</Text>
              </View>
              <View style={{ flex: 1.5 }}>
                <Text style={{ fontSize: fontSize(12), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Type</Text>
              </View>
              <View style={{ flex: 1.5 }}>
                <Text style={{ fontSize: fontSize(12), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Payment</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: fontSize(12), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Approved</Text>
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
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
                    {request.date}
                  </Text>
                </View>
                
                {/* Type */}
                <View style={{ flex: 1.5 }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
                    {request.type}
                  </Text>
                </View>
                
                {/* Payment */}
                <View style={{ flex: 1.5 }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
                    {request.payment}
                  </Text>
                </View>
                
                {/* Approved */}
                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                  {getApprovalIcon(request.approved)}
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
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
              borderRadius: 8 
            }}
          >
            <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins-SemiBold' }}>
              Create Request
            </Text>
          </TouchableOpacity>
        </View>

        {/* Expense Total */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }}>Expense</Text>
          <Text style={{ fontSize: fontSize(14), fontWeight: '700', color: '#FF5252', fontFamily: 'Poppins-Bold' }}>
            {totalExpense}
          </Text>
        </View>
      </View>
    </View>
  );
}

