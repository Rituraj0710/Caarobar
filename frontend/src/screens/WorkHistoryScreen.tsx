import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
  { month: 'February', monthNumber: '02', absent: 27, present: 4, totalHours: 40, overtime: '08', salary: 6202 },
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
          <View style={{ position: 'relative', marginRight: 16 }}>
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
          <TouchableOpacity style={{ padding: 4, marginRight: 16 }}>
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
          {/* Single Row: Logo, Profile Picture, Company Text */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            {/* Company Logo on Left */}
            <View style={{ flex: 1 }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: 140, height: 40, resizeMode: 'contain' }} 
              />
            </View>

            {/* Profile Picture in Center */}
            <View style={{ alignItems: 'center', marginHorizontal: 12 }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            </View>

            {/* Company Info on Right */}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 4, textAlign: 'right' }}>
                Creative Designers
              </Text>
              <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins', marginBottom: 2, textAlign: 'right' }}>
                Radhakishanpura, Sikar
              </Text>
              <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins', textAlign: 'right' }}>
                +919460638554
              </Text>
            </View>
          </View>

          {/* Name and Role Row - Below Profile Picture */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 4 }}>
                Kamal Jangid
              </Text>
              <TouchableOpacity style={{ marginLeft: 8, marginTop: -4 }}>
                <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
              Carpenter
            </Text>
          </View>

          {/* Bottom Row: WORK HISTORY and Emp ID */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#E91E63', fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }}>
                WORK HISTORY
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', position: 'absolute', right: 0 }}>
              Emp id - 001
            </Text>
          </View>
        </View>

        {/* Work History Table */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ borderWidth: 1, borderColor: '#CCCCCC', backgroundColor: '#FFFFFF' }}>
            {/* Table Header */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Image 
                  source={require('../../assets/calender.png')} 
                  style={{ width: 16, height: 16, marginRight: 6, resizeMode: 'contain' }} 
                />
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold' }}>
                  {selectedYear}
                </Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Image 
                  source={require('../../assets/Workhistory01.png')} 
                  style={{ width: 24, height: 24, resizeMode: 'contain' }} 
                />
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Image 
                  source={require('../../assets/Workhistory02.png')} 
                  style={{ width: 24, height: 24, resizeMode: 'contain' }} 
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins-SemiBold' }}>T.Hr</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins-SemiBold' }}>O.T</Text>
              </View>
              <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Salary</Text>
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
                <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                    {monthData.monthNumber}-{monthData.month}
                  </Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  {monthData.absent !== undefined ? (
                    <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins-SemiBold' }}>
                      {monthData.absent}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 13, color: '#9E9E9E', fontFamily: 'Poppins' }}>-</Text>
                  )}
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  {monthData.present !== undefined ? (
                    <Text style={{ fontSize: 13, color: '#4CAF50', fontFamily: 'Poppins-SemiBold' }}>
                      {monthData.present}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 13, color: '#9E9E9E', fontFamily: 'Poppins' }}>-</Text>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  {monthData.totalHours !== undefined ? (
                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                      {monthData.totalHours}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 13, color: '#9E9E9E', fontFamily: 'Poppins' }}>-</Text>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  {monthData.overtime !== undefined ? (
                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                      {monthData.overtime}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 13, color: '#9E9E9E', fontFamily: 'Poppins' }}>-</Text>
                  )}
                </View>
                <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  {monthData.salary !== undefined ? (
                    <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                      {monthData.salary}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 13, color: '#9E9E9E', fontFamily: 'Poppins' }}>-</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            {/* Grand Total Row */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
              <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                  Grand Total
                </Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#E53935', fontFamily: 'Poppins-Bold' }}>
                  {grandTotal.absent}
                </Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#4CAF50', fontFamily: 'Poppins-Bold' }}>
                  {grandTotal.present}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                  {grandTotal.totalHours}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                  {grandTotal.overtime}
                </Text>
              </View>
              <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                  {grandTotal.salary}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

