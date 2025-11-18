import React from 'react';
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
};

type Props = NativeStackScreenProps<RootStackParamList, 'DailyWorkHistory'>;

interface DailyWorkEntry {
  date: string;
  day: string;
  dayShort: string;
  inTime: string;
  outTime: string;
  totalHours: number;
  overtime: number;
  kilometers: number;
}

// Generate sample daily entries for one week
const generateDailyEntries = (monthNumber: string, year: string): DailyWorkEntry[] => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat'];
  
  const monthIndex = parseInt(monthNumber) - 1;
  
  const entries: DailyWorkEntry[] = [];
  
  // Generate entries for only one week (7 days)
  for (let day = 1; day <= 7; day++) {
    const date = new Date(parseInt(year), monthIndex, day);
    const dayIndex = date.getDay();
    
    entries.push({
      date: `${day.toString().padStart(2, '0')}/${monthNumber}`,
      day: dayNames[dayIndex],
      dayShort: dayNames[dayIndex],
      inTime: '09:00 Am',
      outTime: '08:00 Pm',
      totalHours: 10,
      overtime: 1,
      kilometers: 11
    });
  }
  
  return entries;
};

export default function DailyWorkHistoryScreen({ navigation, route }: Props) {
  const { month, monthNumber, year } = route.params;
  const dailyEntries = generateDailyEntries(monthNumber, year);
  
  // Calculate grand totals
  const grandTotal = dailyEntries.reduce((acc, entry) => ({
    totalHours: acc.totalHours + entry.totalHours,
    overtime: acc.overtime + entry.overtime,
    kilometers: acc.kilometers + entry.kilometers
  }), { totalHours: 0, overtime: 0, kilometers: 0 });

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
          {/* Company Logo, Profile Photo, and Company Info Row */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: 8
          }}>
            {/* Company Logo on Left */}
            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: 140, height: 40, resizeMode: 'contain' }} 
              />
            </View>

            {/* Profile Picture in Center */}
            <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            </View>

            {/* Company Info on Right */}
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 4, textAlign: 'right' }}>
                Creative Designers
              </Text>
              <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins', marginBottom: 2, textAlign: 'right' }}>
                Radhakishanpura ,Sikar
              </Text>
              <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins', textAlign: 'right' }}>
                +919460638554
              </Text>
            </View>
          </View>

          {/* Employee Name and Role - Centered below profile photo */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 4 }}>
              Kamal Jangid
            </Text>
            <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins' }}>
              Carpenter
            </Text>
          </View>

          {/* Work History Link and Emp ID Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8, position: 'relative' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={require('../../assets/calender.png')} 
                style={{ width: 16, height: 16, marginRight: 6, resizeMode: 'contain' }} 
              />
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
                {year}
              </Text>
            </View>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#E53935', fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }}>
                WORK HISTORY
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
                Emp id - 001
              </Text>
              <TouchableOpacity style={{ marginLeft: 8 }}>
                <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Month Name */}
          <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', marginTop: 8, textAlign: 'left', paddingLeft: 0 }}>
            {month}
          </Text>
        </View>


        {/* Daily Work History Table */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ borderWidth: 1, borderColor: '#CCCCCC', backgroundColor: '#FFFFFF' }}>
            {/* Table Header */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
              <View style={{ flex: 2, paddingVertical: spacing(12), paddingHorizontal: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '700' }}>{year}</Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '700' }}>In</Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '700' }}>Out</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '700' }}>T.Hr</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '700' }}>OT</Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '700' }}>KM</Text>
              </View>
            </View>

            {/* Table Rows */}
            {dailyEntries.map((entry, index) => (
              <View 
                key={index}
                style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}
              >
                <View style={{ flex: 2, paddingVertical: spacing(12), paddingHorizontal: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
                    {entry.date} <Text style={{ color: '#666666' }}>{entry.dayShort}</Text>
                  </Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: fontSize(13), color: '#4CAF50', fontFamily: 'Poppins' }}>
                    {entry.inTime}
                  </Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins' }}>
                    {entry.outTime}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
                    {entry.totalHours}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold' }}>
                    {entry.overtime}
                  </Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
                    {entry.kilometers}
                  </Text>
                </View>
              </View>
            ))}

            {/* Grand Total Row */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
              <View style={{ flex: 2, paddingVertical: spacing(12), paddingHorizontal: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(14), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                  Grand Total
                </Text>
              </View>
              <View style={{ flex: 1.2, paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC' }} />
              <View style={{ flex: 1.2, paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC' }} />
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
                  {grandTotal.totalHours}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12), borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
                  {String(grandTotal.overtime).padStart(2, '0')}
                </Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing(12) }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }}>
                  {grandTotal.kilometers}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

