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
  ExpenseRequestReport: undefined;
  ExpenseRequestDetail: { month: string; monthNumber: string; year: string };
  PaymentRequestDetail: { month: string; monthNumber: string; year: string };
  ApplyForPayment: undefined;
  ApplyForExpense: undefined;
  AssetsReport: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AssetsReport'>;

interface Asset {
  date: string;
  days: number;
  item: string;
  qty: number;
  amount: number;
}

const assetsData: Asset[] = [
  { date: '01/02/2025', days: 45, item: 'Laptop', qty: 1, amount: 25000 },
  { date: '05/04/2024', days: 365, item: 'Car', qty: 1, amount: 1000000 },
  { date: '10/04/2023', days: 700, item: 'Mobile', qty: 1, amount: 35000 },
  { date: '01/02/2023', days: 800, item: 'House', qty: 1, amount: 3500000 },
  { date: '15/07/2022', days: 1000, item: 'Bike', qty: 1, amount: 90000 },
];

export default function AssetsReportScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const grandTotalQty = assetsData.reduce((sum, asset) => sum + asset.qty, 0);
  const grandTotalAmount = assetsData.reduce((sum, asset) => sum + asset.amount, 0);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#248CFF" />
      
      {/* Header - Blue Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(12),
        paddingBottom: spacing(12),
        backgroundColor: '#248CFF'
      }}>
        {/* Left: Back Arrow */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: spacing(4) }}
        >
          <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>

        {/* Center: Title */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ 
            fontSize: fontSize(18), 
            fontWeight: '600', 
            color: '#FFFFFF', 
            fontFamily: 'Poppins-SemiBold' 
          }} allowFontScaling={false}>
            Assets Report
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
                  color: '#666666', 
                  marginRight: spacing(4)
                }} allowFontScaling={false}>
                  📞
                </Text>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#666666', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  9460638554
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Assets Table */}
        <View style={{ marginBottom: spacing(24) }}>
          <View style={{ 
            borderWidth: wp(1), 
            borderColor: '#CCCCCC', 
            backgroundColor: '#FFFFFF', 
            borderRadius: hp(8),
            overflow: 'hidden'
          }}>
            {/* Table Header */}
            <View style={{ 
              flexDirection: 'row', 
              backgroundColor: '#F5F5F5'
            }}>
              <View style={{ 
                flex: 1.5, 
                paddingVertical: spacing(10), 
                paddingHorizontal: spacing(12), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  fontWeight: '600', 
                  color: '#000000', 
                  fontFamily: 'Poppins-SemiBold' 
                }} allowFontScaling={false}>
                  Date
                </Text>
              </View>
              <View style={{ 
                flex: 2, 
                paddingVertical: spacing(10), 
                paddingHorizontal: spacing(12), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  fontWeight: '600', 
                  color: '#000000', 
                  fontFamily: 'Poppins-SemiBold' 
                }} allowFontScaling={false}>
                  Item
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
                  fontWeight: '600', 
                  color: '#000000', 
                  fontFamily: 'Poppins-SemiBold' 
                }} allowFontScaling={false}>
                  Qty
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
                  fontWeight: '600', 
                  color: '#000000', 
                  fontFamily: 'Poppins-SemiBold' 
                }} allowFontScaling={false}>
                  Amount
                </Text>
              </View>
            </View>

            {assetsData.map((asset, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}
              >
                <View style={{ 
                  flex: 1.5, 
                  paddingVertical: spacing(10), 
                  paddingHorizontal: spacing(12), 
                  borderRightWidth: wp(1), 
                  borderRightColor: '#CCCCCC', 
                  borderBottomWidth: index === assetsData.length - 1 ? 0 : wp(1), 
                  borderBottomColor: '#CCCCCC' 
                }}>
                  <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {asset.date}
                  </Text>
                  <Text style={{ fontSize: fontSize(10), color: '#E53935', fontFamily: 'Poppins', marginTop: spacing(2) }} allowFontScaling={false}>
                    {asset.days} Days
                  </Text>
                </View>
                <View style={{ 
                  flex: 2, 
                  paddingVertical: spacing(10), 
                  paddingHorizontal: spacing(12), 
                  borderRightWidth: wp(1), 
                  borderRightColor: '#CCCCCC', 
                  borderBottomWidth: index === assetsData.length - 1 ? 0 : wp(1), 
                  borderBottomColor: '#CCCCCC' 
                }}>
                  <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {asset.item}
                  </Text>
                </View>
                <View style={{ 
                  flex: 1, 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  paddingVertical: spacing(10), 
                  borderRightWidth: wp(1), 
                  borderRightColor: '#CCCCCC', 
                  borderBottomWidth: index === assetsData.length - 1 ? 0 : wp(1), 
                  borderBottomColor: '#CCCCCC' 
                }}>
                  <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {asset.qty}
                  </Text>
                </View>
                <View style={{ 
                  flex: 1.5, 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  paddingVertical: spacing(10), 
                  borderBottomWidth: index === assetsData.length - 1 ? 0 : wp(1), 
                  borderBottomColor: '#CCCCCC' 
                }}>
                  <Text style={{ fontSize: fontSize(12), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {asset.amount}
                  </Text>
                </View>
              </View>
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
                flex: 2, 
                paddingVertical: spacing(10), 
                paddingHorizontal: spacing(12), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }} />
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
                  color: '#000000', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  {grandTotalQty}
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
                  {grandTotalAmount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

