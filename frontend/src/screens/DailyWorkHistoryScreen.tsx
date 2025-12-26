import React from 'react';
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
  DailyWorkHistoryInDetail: { month: string; monthNumber: string; year: string };
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
  const insets = useSafeArea();
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
      <StatusBar barStyle="light-content" backgroundColor="#2D6EFF" />
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        {/* Blue Header Bar */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingHorizontal: spacing(16),
          paddingTop: spacing(12),
          paddingBottom: spacing(12),
          backgroundColor: '#2D6EFF'
        }}>
          {/* Left: Back Arrow */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={{ marginRight: spacing(12) }}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          >
            <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
          </TouchableOpacity>
          
          {/* Left: Title */}
          <Text style={{ 
            fontSize: fontSize(20), 
            fontWeight: '600', 
            color: '#FFFFFF', 
            fontFamily: 'Inter',
            flex: 1
          }} allowFontScaling={false}>
            Work History
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
                fontSize: fontSize(13), 
                color: '#9E9E9E', 
                fontFamily: 'Poppins'
              }} allowFontScaling={false}>
                Carpenter
              </Text>
            </View>

            {/* Emp ID and Phone on Right */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#9E9E9E', 
                fontFamily: 'Poppins',
                marginBottom: spacing(6)
              }} allowFontScaling={false}>
                Emp ID - 001
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize(14), color: '#4285F4', marginRight: spacing(4) }} allowFontScaling={false}>📞</Text>
                <Text style={{ 
                  fontSize: fontSize(13), 
                  color: '#9E9E9E', 
                  fontFamily: 'Poppins'
                }} allowFontScaling={false}>
                  9460638554
                </Text>
              </View>
            </View>
          </View>
        </View>


        {/* Daily Work History Table */}
        <View style={{ marginBottom: spacing(20) }}>
          <View style={{ borderWidth: wp(1), borderColor: '#CCCCCC', backgroundColor: '#FFFFFF', borderRadius: hp(8) }}>
            {/* Table Header */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5', borderTopLeftRadius: hp(8), borderTopRightRadius: hp(8), borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
              <View style={{ flex: 2, paddingVertical: hp(10), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>{year}</Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>In</Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Out</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Hour</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>OT</Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>KM</Text>
              </View>
            </View>

            {/* Table Rows */}
            {dailyEntries.map((entry, index) => (
              <TouchableOpacity 
                key={index}
                style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('DailyWorkHistoryInDetail', {
                    month: month,
                    monthNumber: monthNumber,
                    year: year
                  });
                }}
              >
                <View style={{ flex: 2, paddingVertical: hp(10), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40), justifyContent: 'center' }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {entry.date} <Text style={{ color: '#666666' }}>{entry.dayShort}</Text>
                  </Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                  <Text style={{ fontSize: fontSize(13), color: '#4CAF50', fontFamily: 'Poppins', fontWeight: '600', textTransform: 'none' }} allowFontScaling={false}>
                    {entry.inTime}
                  </Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                  <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins', fontWeight: '600', textTransform: 'none' }} allowFontScaling={false}>
                    {entry.outTime}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {entry.totalHours}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                  <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                    {entry.overtime}
                  </Text>
                </View>
                <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                  <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {entry.kilometers}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Summary Table */}
        <View style={{ marginBottom: spacing(20) }}>
          <View style={{ borderWidth: wp(1), borderColor: '#CCCCCC', backgroundColor: '#FFFFFF', borderRadius: hp(8) }}>
            {/* Grand Total Row */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F0F0F0', borderTopLeftRadius: hp(8), borderTopRightRadius: hp(8), borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
              <View style={{ flex: 2, paddingVertical: hp(10), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40), justifyContent: 'center' }}>
                <Text style={{ fontSize: fontSize(14), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  Grand Total
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  50
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#E53935', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  8
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  101
                </Text>
              </View>
            </View>

            {/* Price Per Hours Row */}
            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
              <View style={{ flex: 2, paddingVertical: hp(10), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40), justifyContent: 'center' }}>
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  Price Per Hours
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  100
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  125
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  2
                </Text>
              </View>
            </View>

            {/* Total Payment Row */}
            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
              <View style={{ flex: 2, paddingVertical: hp(10), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(50), justifyContent: 'center' }}>
                <View>
                  <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    Total Payment
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: spacing(4), flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: fontSize(12), color: '#666666', fontFamily: 'Poppins' }} allowFontScaling={false}>
                      Food Exp <Text style={{ color: '#000000', fontWeight: '600' }}>2000</Text>
                    </Text>
                    <Text style={{ fontSize: fontSize(12), color: '#666666', fontFamily: 'Poppins', marginLeft: spacing(8) }} allowFontScaling={false}>
                      Room Rent <Text style={{ color: '#000000', fontWeight: '600' }}>1000</Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(50) }}>
                <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                  5000
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(50) }}>
                <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                  1000
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), minHeight: hp(50) }}>
                <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                  202
                </Text>
              </View>
            </View>

            {/* G.T. Payment Row */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F0F0F0', borderBottomLeftRadius: hp(8), borderBottomRightRadius: hp(8) }}>
              <View style={{ flex: 2, paddingVertical: hp(10), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40), justifyContent: 'center' }}>
                <Text style={{ fontSize: fontSize(14), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  G.T. Payment
                </Text>
              </View>
              <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center', paddingVertical: hp(10), paddingHorizontal: spacing(12), minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(14), fontWeight: '700', color: '#E53935', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  9202 Credit
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

