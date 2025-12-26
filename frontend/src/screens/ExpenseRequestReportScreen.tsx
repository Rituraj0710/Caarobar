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
  { month: 'January', monthNumber: '01' },
  { month: 'February', monthNumber: '02', pending: 0, rejected: 0, approved: 2, amount: 3500 },
  { month: 'March', monthNumber: '03', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'April', monthNumber: '04', pending: 0, rejected: 1, approved: 2, amount: 3500 },
  { month: 'May', monthNumber: '05', pending: 1, rejected: 1, approved: 0, amount: 0 },
  { month: 'June', monthNumber: '06', pending: 0, rejected: 1, approved: 2, amount: 3500 },
  { month: 'July', monthNumber: '07', pending: 1, rejected: 1, approved: 2, amount: 3500 },
  { month: 'August', monthNumber: '08', pending: 1, rejected: 0, approved: 2, amount: 3500 },
  { month: 'September', monthNumber: '09', pending: 1, rejected: 1, approved: 0, amount: 0 },
  { month: 'October', monthNumber: '10', pending: 0, rejected: 1, approved: 2, amount: 3500 },
  { month: 'November', monthNumber: '11', pending: 1, rejected: 1, approved: 0, amount: 0 },
  { month: 'December', monthNumber: '12' },
];

export default function ExpenseRequestReportScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [selectedYear] = useState('2025');

  // Calculate grand totals
  const grandTotal = expenseData.reduce((acc, month) => ({
    pending: (acc.pending || 0) + (month.pending || 0),
    rejected: (acc.rejected || 0) + (month.rejected || 0),
    approved: (acc.approved || 0) + (month.approved || 0),
    amount: (acc.amount || 0) + (month.amount || 0),
  }), { pending: 0, rejected: 0, approved: 0, amount: 0 });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6EFF" />
      
      {/* Header - Blue Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(8),
        paddingBottom: spacing(8),
        backgroundColor: '#2D6EFF'
      }}>
        {/* Left: Back Arrow */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: spacing(4) }}
        >
          <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>

        {/* Left: Title */}
        <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: spacing(12) }}>
          <Text style={{ 
            fontSize: fontSize(18), 
            fontWeight: '500', 
            color: '#FFFFFF', 
            fontFamily: 'Inter' 
          }} allowFontScaling={false}>
            Expense Request Report
          </Text>
        </View>

        {/* Right: Empty space for alignment */}
        <View style={{ width: wp(32) }} />
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing(40) + insets.bottom, paddingHorizontal: spacing(16) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee Information Card */}
        <View style={{ 
          marginTop: spacing(12), 
          marginBottom: spacing(16),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(12),
          padding: spacing(16),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(2) },
          shadowOpacity: 0.1,
          shadowRadius: spacing(4),
          elevation: 3
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Profile Picture on Left */}
            <Image 
              source={require('../../assets/Profile picture.png')} 
              style={{ 
                width: wp(64), 
                height: hp(64), 
                borderRadius: hp(32), 
                marginRight: spacing(12), 
                resizeMode: 'cover' 
              }}
            />
            
            {/* Employee Info in Middle */}
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ 
                fontSize: fontSize(15), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold',
                marginBottom: spacing(4)
              }} allowFontScaling={false}>
                Kamal Jangid
              </Text>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#666666', 
                fontFamily: 'Poppins'
              }} allowFontScaling={false}>
                Carpenter
              </Text>
            </View>

            {/* Emp ID and Phone on Right */}
            <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#666666', 
                fontFamily: 'Poppins',
                marginBottom: spacing(6)
              }} allowFontScaling={false}>
                Emp ID - 001
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: fontSize(14), 
                  color: '#248CFF', 
                  marginRight: spacing(4)
                }} allowFontScaling={false}>
                  📞
                </Text>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#248CFF', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  9460638554
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Year Selector and Column Headers Card */}
        <View style={{ 
          marginBottom: spacing(16),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(12),
          padding: spacing(12),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(1) },
          shadowOpacity: 0.1,
          shadowRadius: spacing(2),
          elevation: 2,
          borderWidth: wp(1),
          borderColor: '#E0E0E0'
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}>
            {/* Year Selector on Left */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={require('../../assets/calender.png')} 
                style={{ width: wp(18), height: hp(18), marginRight: spacing(8), resizeMode: 'contain' }} 
              />
              <Text style={{ 
                fontSize: fontSize(15), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold' 
              }} allowFontScaling={false}>
                {selectedYear}
              </Text>
            </View>

            {/* Column Headers on Right */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ 
                fontSize: fontSize(12), 
                fontWeight: '600', 
                color: '#000000', 
                fontFamily: 'Poppins-SemiBold',
                marginRight: spacing(12)
              }} allowFontScaling={false}>
                Pen
              </Text>
              <Text style={{ 
                fontSize: fontSize(12), 
                fontWeight: '600', 
                color: '#E53935', 
                fontFamily: 'Poppins-SemiBold',
                marginRight: spacing(12)
              }} allowFontScaling={false}>
                Rej
              </Text>
              <Text style={{ 
                fontSize: fontSize(12), 
                fontWeight: '600', 
                color: '#4CAF50', 
                fontFamily: 'Poppins-SemiBold',
                marginRight: spacing(12)
              }} allowFontScaling={false}>
                App
              </Text>
              <Text style={{ 
                fontSize: fontSize(12), 
                fontWeight: '600', 
                color: '#000000', 
                fontFamily: 'Poppins-SemiBold'
              }} allowFontScaling={false}>
                Amount
              </Text>
            </View>
          </View>
        </View>

        {/* Expense Request Table */}
        <View style={{ marginBottom: spacing(24) }}>
          <View style={{ 
            borderWidth: wp(1), 
            borderColor: '#CCCCCC', 
            backgroundColor: '#FFFFFF', 
            borderRadius: hp(8),
            overflow: 'hidden'
          }}>

            {expenseData.map((monthData, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (monthData.pending !== undefined || monthData.rejected !== undefined || monthData.approved !== undefined) {
                    navigation.navigate('ExpenseRequestDetail', {
                      month: monthData.month,
                      monthNumber: monthData.monthNumber,
                      year: selectedYear
                    });
                  }
                }}
                activeOpacity={0.7}
                disabled={monthData.pending === undefined && monthData.rejected === undefined && monthData.approved === undefined}
              >
                <View style={{ 
                  flexDirection: 'row', 
                  backgroundColor: '#FFFFFF',
                  minHeight: hp(40),
                  alignItems: 'center'
                }}>
                  <View style={{ 
                    flex: 1.5, 
                    paddingVertical: spacing(10), 
                    paddingHorizontal: spacing(12), 
                    borderRightWidth: wp(1), 
                    borderRightColor: '#CCCCCC', 
                    borderBottomWidth: index === expenseData.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC'
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {monthData.monthNumber}-{monthData.month}
                    </Text>
                  </View>
                  <View style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    paddingVertical: spacing(10), 
                    borderRightWidth: wp(1), 
                    borderRightColor: '#CCCCCC', 
                    borderBottomWidth: index === expenseData.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: monthData.pending !== undefined ? '#FFC107' : '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {monthData.pending !== undefined ? monthData.pending : '-'}
                    </Text>
                  </View>
                  <View style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    paddingVertical: spacing(10), 
                    borderRightWidth: wp(1), 
                    borderRightColor: '#CCCCCC', 
                    borderBottomWidth: index === expenseData.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: monthData.rejected !== undefined ? '#E53935' : '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {monthData.rejected !== undefined ? monthData.rejected : '-'}
                    </Text>
                  </View>
                  <View style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    paddingVertical: spacing(10), 
                    borderRightWidth: wp(1), 
                    borderRightColor: '#CCCCCC', 
                    borderBottomWidth: index === expenseData.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: monthData.approved !== undefined ? '#4CAF50' : '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {monthData.approved !== undefined ? monthData.approved : '-'}
                    </Text>
                  </View>
                  <View style={{ 
                    flex: 1.5, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    paddingVertical: spacing(10), 
                    borderBottomWidth: index === expenseData.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {monthData.amount !== undefined ? monthData.amount : '-'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Grand Total Row */}
            <View style={{ 
              flexDirection: 'row', 
              backgroundColor: '#F0F0F0',
              borderBottomLeftRadius: hp(8),
              borderBottomRightRadius: hp(8)
            }}>
              <View style={{ 
                flex: 1.5, 
                paddingVertical: spacing(10), 
                paddingHorizontal: spacing(12), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(13), 
                  fontWeight: '700', 
                  color: '#E53935', 
                  fontFamily: 'Poppins-Bold' 
                }} allowFontScaling={false}>
                  Grand Total
                </Text>
              </View>
              <View style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingVertical: spacing(10), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#FFC107', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  {grandTotal.pending}
                </Text>
              </View>
              <View style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingVertical: spacing(10), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#E53935', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  {grandTotal.rejected}
                </Text>
              </View>
              <View style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingVertical: spacing(10), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#4CAF50', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  {grandTotal.approved}
                </Text>
              </View>
              <View style={{ 
                flex: 1.5, 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingVertical: spacing(10) 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#000000', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  {grandTotal.amount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

