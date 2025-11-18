import React from 'react';
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
  const grandTotalQty = assetsData.reduce((sum, asset) => sum + asset.qty, 0);
  const grandTotalAmount = assetsData.reduce((sum, asset) => sum + asset.amount, 0);

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
          {/* Top Row: Logo, Profile, Company Info */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
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
            </View>

            {/* Company Info on Right */}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>
                  Creative Designers
                </Text>
                <TouchableOpacity style={{ marginLeft: 8 }}>
                  <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins', marginBottom: 2 }}>
                Radhakishanpura ,Sikar
              </Text>
              <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins' }}>
                +919460638554
              </Text>
            </View>
          </View>

          {/* ASSETS REPORT and Emp ID Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FF5252', fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }}>
              ASSETS REPORT
            </Text>
            <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
              Emp id - 001
            </Text>
          </View>
        </View>

        {/* Assets Table */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ borderWidth: 1, borderColor: '#CCCCCC', backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
              <View style={{ flex: 1.5, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Date</Text>
              </View>
              <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Item</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Qty</Text>
              </View>
              <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Amount</Text>
              </View>
            </View>

            {assetsData.map((asset, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}
              >
                <View style={{ flex: 1.5, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: index === assetsData.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                    {asset.date}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#FF5252', fontFamily: 'Poppins', marginTop: 2 }}>
                    {asset.days} Days
                  </Text>
                </View>
                <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: index === assetsData.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                    {asset.item}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: index === assetsData.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                    {asset.qty}
                  </Text>
                </View>
                <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderBottomWidth: index === assetsData.length - 1 ? 0 : 1, borderBottomColor: '#CCCCCC' }}>
                  <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                    {asset.amount}
                  </Text>
                </View>
              </View>
            ))}

            <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
              <View style={{ flex: 1.5, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#FF5252', fontFamily: 'Poppins-Bold' }}>
                  Grand Total
                </Text>
              </View>
              <View style={{ flex: 2, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }} />
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                  {grandTotalQty}
                </Text>
              </View>
              <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
                  {grandTotalAmount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

