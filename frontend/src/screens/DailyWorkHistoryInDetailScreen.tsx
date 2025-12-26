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

type Props = NativeStackScreenProps<RootStackParamList, 'DailyWorkHistoryInDetail'>;

interface WorkEntry {
  location?: string;
  inTime?: string;
  outTime?: string;
  totalHours?: number;
  overtime?: number;
  kilometers?: number;
}

interface DailyWorkEntry {
  date: string;
  day: string;
  dayShort: string;
  status: 'work' | 'absent' | 'weeklyOff';
  entries: WorkEntry[];
}

// Generate sample daily entries for the entire month
const generateDailyEntries = (monthNumber: string, year: string): DailyWorkEntry[] => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthIndex = parseInt(monthNumber) - 1;
  const daysInMonth = new Date(parseInt(year), monthIndex + 1, 0).getDate();
  
  const entries: DailyWorkEntry[] = [];
  
  // Sample data based on the images
  const sampleData: { [key: number]: DailyWorkEntry } = {
    1: {
      date: '01/02',
      day: 'Saturday',
      dayShort: 'Sat',
      status: 'work',
      entries: [
        { location: 'Creative Designers', inTime: '09:00 Am', outTime: '12:00 Pm', totalHours: 3, kilometers: 11 },
        { location: 'La Nature', inTime: '12:00 Pm', outTime: '08:00 Pm', totalHours: 7, overtime: 1, kilometers: 11 }
      ]
    },
    2: {
      date: '02/02',
      day: 'Sunday',
      dayShort: 'Sun',
      status: 'weeklyOff',
      entries: [{ totalHours: 10 }]
    },
    3: {
      date: '03/02',
      day: 'Monday',
      dayShort: 'Mon',
      status: 'work',
      entries: [
        { location: 'Janki Ji', inTime: '09:00 Am', outTime: '08:00 Pm', totalHours: 10, overtime: 1, kilometers: 18 },
        { location: 'Sagar Showroom', inTime: '09:00 Am', outTime: '12:00 Pm', totalHours: 3, kilometers: 55 }
      ]
    },
    4: {
      date: '04/02',
      day: 'Tuesday',
      dayShort: 'Tue',
      status: 'absent',
      entries: []
    },
    5: {
      date: '05/02',
      day: 'Wednesday',
      dayShort: 'Wed',
      status: 'absent',
      entries: []
    },
    6: {
      date: '06/02',
      day: 'Thursday',
      dayShort: 'Thu',
      status: 'absent',
      entries: []
    },
    7: {
      date: '07/02',
      day: 'Friday',
      dayShort: 'Fri',
      status: 'absent',
      entries: []
    },
    8: {
      date: '08/02',
      day: 'Saturday',
      dayShort: 'Sat',
      status: 'absent',
      entries: []
    },
    9: {
      date: '09/02',
      day: 'Sunday',
      dayShort: 'Sun',
      status: 'weeklyOff',
      entries: [
        { totalHours: 10 },
        { location: 'Creative Designers', inTime: '09:00 Am', outTime: '07:00 Pm', totalHours: 10, kilometers: 6 }
      ]
    },
    10: {
      date: '10/02',
      day: 'Monday',
      dayShort: 'Mon',
      status: 'absent',
      entries: []
    }
  };
  
  // Generate entries for all days in the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(parseInt(year), monthIndex, day);
    const dayIndex = date.getDay();
    
    if (sampleData[day]) {
      entries.push({
        ...sampleData[day],
        date: `${day.toString().padStart(2, '0')}/${monthNumber}`,
        dayShort: dayNames[dayIndex]
      });
    } else {
      // Default entries for days not in sample data
      if (dayIndex === 0) {
        // Sunday - Weekly off
        entries.push({
          date: `${day.toString().padStart(2, '0')}/${monthNumber}`,
          day: dayNames[dayIndex],
          dayShort: dayNames[dayIndex],
          status: 'weeklyOff',
          entries: [{ totalHours: 10 }]
        });
      } else {
        // Regular work day or absent
        entries.push({
          date: `${day.toString().padStart(2, '0')}/${monthNumber}`,
          day: dayNames[dayIndex],
          dayShort: dayNames[dayIndex],
          status: day > 10 ? 'absent' : 'work',
          entries: day > 10 ? [] : [
            { location: 'Work Location', inTime: '09:00 Am', outTime: '08:00 Pm', totalHours: 10, overtime: 1, kilometers: 11 }
          ]
        });
      }
    }
  }
  
  return entries;
};

export default function DailyWorkHistoryInDetailScreen({ navigation, route }: Props) {
  const insets = useSafeArea();
  const { month, monthNumber, year } = route.params;
  const dailyEntries = generateDailyEntries(monthNumber, year);
  
  // Calculate grand totals
  const grandTotal = dailyEntries.reduce((acc, dayEntry) => {
    dayEntry.entries.forEach(entry => {
      acc.totalHours += entry.totalHours || 0;
      acc.overtime += entry.overtime || 0;
      acc.kilometers += entry.kilometers || 0;
    });
    return acc;
  }, { totalHours: 0, overtime: 0, kilometers: 0 });

  // Price per unit
  const pricePerHour = 100;
  const pricePerOT = 125;
  const pricePerKM = 2;

  // Calculate total payment
  const totalHourPayment = grandTotal.totalHours * pricePerHour;
  const totalOTPayment = grandTotal.overtime * pricePerOT;
  const totalKMPayment = grandTotal.kilometers * pricePerKM;
  const foodExp = 2000;
  const roomRent = 1000;
  const grandTotalPayment = totalHourPayment + totalOTPayment + totalKMPayment + foodExp + roomRent;

  const renderWorkEntry = (entry: WorkEntry, index: number, isLast: boolean) => {
    if (entry.location) {
      return (
        <View key={index} style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
          <View style={{ flex: 2, paddingVertical: hp(8), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: isLast ? wp(1) : 0, borderBottomColor: '#CCCCCC', minHeight: hp(40), justifyContent: 'center' }}>
            <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
              {entry.location}
            </Text>
          </View>
          <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(8), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: isLast ? wp(1) : 0, borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
            <Text style={{ fontSize: fontSize(12), color: '#4CAF50', fontFamily: 'Poppins', fontWeight: '600' }} allowFontScaling={false}>
              {entry.inTime || ''}
            </Text>
          </View>
          <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(8), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: isLast ? wp(1) : 0, borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
            <Text style={{ fontSize: fontSize(12), color: '#E53935', fontFamily: 'Poppins', fontWeight: '600' }} allowFontScaling={false}>
              {entry.outTime || ''}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(8), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: isLast ? wp(1) : 0, borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
            <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
              {entry.totalHours || ''}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(8), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: isLast ? wp(1) : 0, borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
            <Text style={{ fontSize: fontSize(12), color: entry.overtime ? '#E53935' : '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
              {entry.overtime || ''}
            </Text>
          </View>
          <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(8), borderBottomWidth: isLast ? wp(1) : 0, borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
            <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
              {entry.kilometers ? entry.kilometers.toString().padStart(2, '0') : ''}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

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
            {dailyEntries.map((dayEntry, dayIndex) => {
              const hasEntries = dayEntry.entries.length > 0;
              const isWeeklyOff = dayEntry.status === 'weeklyOff';
              const isAbsent = dayEntry.status === 'absent';
              
              return (
                <View key={dayIndex}>
                  {/* Date Row */}
                  <View style={{ 
                    flexDirection: 'row', 
                    backgroundColor: isWeeklyOff ? '#E3F2FD' : '#FFFFFF' 
                  }}>
                    <View style={{ flex: 2, paddingVertical: hp(10), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: hasEntries ? 0 : wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40), justifyContent: 'center' }}>
                      <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                        {dayEntry.date} <Text style={{ color: dayEntry.dayShort === 'Sun' ? '#E53935' : '#248CFF' }}>{dayEntry.dayShort}</Text>
                      </Text>
                    </View>
                    <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: hasEntries ? 0 : wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                      {isAbsent ? (
                        <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins', fontWeight: '600' }} allowFontScaling={false}>
                          Absent
                        </Text>
                      ) : isWeeklyOff ? (
                        <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins', fontWeight: '600' }} allowFontScaling={false}>
                          Weekly Full Day off
                        </Text>
                      ) : null}
                    </View>
                    <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: hasEntries ? 0 : wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: hasEntries ? 0 : wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                      {isWeeklyOff && dayEntry.entries[0]?.totalHours ? (
                        <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                          {dayEntry.entries[0].totalHours}
                        </Text>
                      ) : null}
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: hasEntries ? 0 : wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                    </View>
                    <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderBottomWidth: hasEntries ? 0 : wp(1), borderBottomColor: '#CCCCCC', minHeight: hp(40) }}>
                    </View>
                  </View>
                  
                  {/* Work Entries for this day */}
                  {dayEntry.entries.map((entry, entryIndex) => {
                    if (entry.location) {
                      return renderWorkEntry(entry, entryIndex, entryIndex === dayEntry.entries.length - 1);
                    }
                    return null;
                  })}
                </View>
              );
            })}
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
                  {grandTotal.totalHours}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#E53935', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  {grandTotal.overtime}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                  {grandTotal.kilometers}
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
                  {pricePerHour}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  {pricePerOT}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), minHeight: hp(40) }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  {pricePerKM}
                </Text>
              </View>
            </View>

            {/* Total Payment Row */}
            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC' }}>
              <View style={{ flex: 2, paddingVertical: hp(10), paddingHorizontal: spacing(12), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(50), justifyContent: 'center' }}>
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  Total Payment
                </Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(50) }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: fontSize(10), color: '#666666', fontFamily: 'Poppins', marginBottom: spacing(2) }} allowFontScaling={false}>
                    Food Exp.
                  </Text>
                  <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                    {foodExp}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(50) }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: fontSize(10), color: '#666666', fontFamily: 'Poppins', marginBottom: spacing(2) }} allowFontScaling={false}>
                    Room Rent
                  </Text>
                  <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                    {roomRent}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(50) }}>
                <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                  {totalHourPayment}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', minHeight: hp(50) }}>
                <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                  {totalOTPayment}
                </Text>
              </View>
              <View style={{ flex: 1.2, alignItems: 'center', justifyContent: 'center', paddingVertical: hp(10), minHeight: hp(50) }}>
                <Text style={{ fontSize: fontSize(13), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>
                  {totalKMPayment}
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
                  {Math.abs(grandTotalPayment)} {grandTotalPayment >= 0 ? 'Credit' : 'Debit'}
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

