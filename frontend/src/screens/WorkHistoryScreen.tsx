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
};

type Props = NativeStackScreenProps<RootStackParamList, 'WorkHistory'>;

interface WorkHistoryData {
  month: string;
  monthNumber: string;
  absent?: number;
  present?: number;
  totalHours?: number;
  overtime?: string;
  salary?: number;
}

const workHistoryData: WorkHistoryData[] = [
  { month: 'January', monthNumber: '01' },
  { month: 'February', monthNumber: '02', absent: 27, present: 4, totalHours: 40, overtime: '08', salary: 9202 },
  { month: 'March', monthNumber: '03' },
  { month: 'April', monthNumber: '04' },
  { month: 'May', monthNumber: '05' },
  { month: 'June', monthNumber: '06' },
  { month: 'July', monthNumber: '07' },
  { month: 'August', monthNumber: '08' },
  { month: 'September', monthNumber: '09' },
  { month: 'October', monthNumber: '10' },
  { month: 'November', monthNumber: '11' },
  { month: 'December', monthNumber: '12' },
];

export default function WorkHistoryScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [selectedYear] = useState('2025');

  // Calculate grand total
  const grandTotal = workHistoryData.reduce((acc, month) => ({
    absent: (acc.absent || 0) + (month.absent || 0),
    present: (acc.present || 0) + (month.present || 0),
    totalHours: (acc.totalHours || 0) + (month.totalHours || 0),
    overtime: String((parseInt(acc.overtime || '0') + parseInt(month.overtime || '0'))),
    salary: (acc.salary || 0) + (month.salary || 0),
  }), { absent: 0, present: 0, totalHours: 0, overtime: '0', salary: 0 });

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
            Work History Report
          </Text>
        </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing(40) + insets.bottom, paddingHorizontal: spacing(16) }}
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
                fontSize: fontSize(14), 
                color: '#666666', 
                fontFamily: 'Poppins'
              }} allowFontScaling={false}>
                Carpenter
              </Text>
            </View>

            {/* Emp ID and Phone on Right */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#000000', 
                fontFamily: 'Poppins',
                marginBottom: spacing(6)
              }} allowFontScaling={false}>
                Emp ID - 001
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize(14), color: '#666666', marginRight: spacing(4) }} allowFontScaling={false}>📞</Text>
                <Text style={{ 
                  fontSize: fontSize(13), 
                  color: '#000000', 
                  fontFamily: 'Poppins'
                }} allowFontScaling={false}>
                  9460638554
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Work History Table */}
        <View style={{ marginBottom: spacing(24) }}>
          <View style={{ borderWidth: 1, borderColor: '#CCCCCC', backgroundColor: '#FFFFFF' }}>
            {/* Table Header */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', paddingVertical: spacing(12), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Image 
                  source={require('../../assets/task_calender_icon.png')} 
                  style={{ width: wp(18), height: hp(18), marginRight: spacing(8), resizeMode: 'contain' }} 
                />
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                  {selectedYear}
                </Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Image 
                  source={require('../../assets/Workhistory01.png')} 
                  style={{ width: wp(24), height: hp(24), resizeMode: 'contain' }} 
                />
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Image 
                  source={require('../../assets/Workhistory02.png')} 
                  style={{ width: wp(24), height: hp(24), resizeMode: 'contain' }} 
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>T.Hr</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>O.T</Text>
              </View>
              <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12) }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Salary</Text>
              </View>
            </View>

            {/* Table Rows */}
            {workHistoryData.map((monthData, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('DailyWorkHistory', {
                    month: monthData.month,
                    monthNumber: monthData.monthNumber,
                    year: selectedYear
                  });
                }}
                activeOpacity={0.7}
                style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}
              >
                <View style={{ flex: 2, paddingVertical: spacing(12), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {monthData.monthNumber}-{monthData.month}
                  </Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
                  {monthData.absent !== undefined ? (
                    <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                      {monthData.absent}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: fontSize(13), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>-</Text>
                  )}
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
                  {monthData.present !== undefined ? (
                    <Text style={{ fontSize: fontSize(13), color: '#4CAF50', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                      {monthData.present}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: fontSize(13), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>-</Text>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
                  {monthData.totalHours !== undefined ? (
                    <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                      {monthData.totalHours}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: fontSize(13), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>-</Text>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
                  {monthData.overtime !== undefined ? (
                    <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                      {monthData.overtime}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: fontSize(13), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>-</Text>
                  )}
                </View>
                <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
                  {monthData.salary !== undefined ? (
                    <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                      {monthData.salary}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: fontSize(13), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>-</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            {/* Grand Total Row */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F0F0F0' }}>
              <View style={{ flex: 2, paddingVertical: spacing(12), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(14), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  Grand Total
                </Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#E53935', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  {grandTotal.absent}
                </Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#4CAF50', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  {grandTotal.present}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  {grandTotal.totalHours}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  {grandTotal.overtime}
                </Text>
              </View>
              <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12) }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  {grandTotal.salary}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

