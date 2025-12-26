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
  ApplyForPayment: undefined;
  ApplyForExpense: undefined;
  AssetsReport: undefined;
  Agreements: undefined;
  Resignation: undefined;
  IDCard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'IDCard'>;

export default function IDCardScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6EFF" />
      
      {/* Blue Header Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: spacing(16),
        paddingTop: spacing(8),
        paddingBottom: spacing(8),
        backgroundColor: '#2D6EFF'
      }}>
        {/* Left: Back Arrow */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ 
            marginRight: spacing(12),
            justifyContent: 'center',
            alignItems: 'center'
          }}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
        >
          <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>
        
        {/* ID Card Title */}
        <Text style={{ 
          fontSize: fontSize(20), 
          fontWeight: '600', 
          color: '#FFFFFF', 
          fontFamily: 'Inter',
          textAlignVertical: 'center',
          includeFontPadding: false,
          flex: 1
        }} allowFontScaling={false}>
          ID Card
        </Text>

        {/* Right: Three Dots Menu */}
        <TouchableOpacity style={{ padding: spacing(4), marginLeft: spacing(8) }}>
          <Text style={{ fontSize: fontSize(20), color: '#FFFFFF' }} allowFontScaling={false}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          paddingTop: spacing(20), 
          paddingBottom: spacing(120) + insets.bottom, 
          paddingHorizontal: spacing(16), 
          alignItems: 'center' 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* ID Card */}
        {orientation === 'vertical' ? (
          /* Vertical Orientation - Portrait Style */
          <View style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: spacing(12),
            padding: spacing(24),
            marginBottom: spacing(18),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: spacing(2) },
            shadowOpacity: 0.1,
            shadowRadius: spacing(4),
            elevation: 3,
            borderWidth: wp(1),
            borderColor: '#E0E0E0',
            width: '100%',
            maxWidth: wp(320),
            alignSelf: 'center'
          }}>
            {/* Top Section: Company Logo and Details */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing(20) }}>
              {/* Company Logo on Left */}
              <View style={{ flex: 1, paddingRight: spacing(8) }}>
                <Image 
                  source={require('../../assets/creative designers.png')} 
                  style={{ width: wp(130), height: hp(37), resizeMode: 'contain' }} 
                />
              </View>

              {/* Company Details on Right */}
              <View style={{ flex: 1, alignItems: 'flex-end', paddingLeft: spacing(8) }}>
                <Text style={{ fontSize: fontSize(11), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(2), textAlign: 'right' }} allowFontScaling={false}>
                  Creative Designers
                </Text>
                <Text style={{ fontSize: fontSize(10), color: '#000000', fontFamily: 'Poppins', marginBottom: spacing(1), textAlign: 'right' }} allowFontScaling={false}>
                  Radhakishanpura, Sikar
                </Text>
                <Text style={{ fontSize: fontSize(10), color: '#000000', fontFamily: 'Poppins', textAlign: 'right' }} allowFontScaling={false}>
                  +919460638554
                </Text>
              </View>
            </View>

            {/* Profile Picture Centered */}
            <View style={{ alignItems: 'center', marginBottom: spacing(16) }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: wp(100), height: hp(100), borderRadius: hp(50), marginBottom: spacing(8), resizeMode: 'cover' }}
              />
              <Text style={{ fontSize: fontSize(16), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(2), textAlign: 'center' }} allowFontScaling={false}>
                Kamal Jangid
              </Text>
              <Text style={{ fontSize: fontSize(12), color: '#666666', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                Carpenter
              </Text>
            </View>

            {/* Employee Details - Vertical Stack - Centered */}
            <View style={{ marginBottom: spacing(16), alignItems: 'center' }}>
              <View style={{ marginBottom: spacing(8) }}>
                <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                  Employee ID : <Text style={{ color: '#666666' }} allowFontScaling={false}>001</Text>
                </Text>
              </View>
              <View style={{ marginBottom: spacing(8) }}>
                <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                  Joning Date : <Text style={{ color: '#666666' }} allowFontScaling={false}>01/01/2023</Text>
                </Text>
              </View>
              <View style={{ marginBottom: spacing(8) }}>
                <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                  Date Of Birth : <Text style={{ color: '#666666' }} allowFontScaling={false}>18/01/1985</Text>
                </Text>
              </View>
              <View style={{ marginBottom: spacing(8) }}>
                <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                  Phone : <Text style={{ color: '#666666' }} allowFontScaling={false}>9460638554</Text>
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                  City : <Text style={{ color: '#666666' }} allowFontScaling={false}>Sikar</Text>
                </Text>
              </View>
            </View>

            {/* Bottom: Powered by */}
            <View style={{ alignItems: 'center', marginTop: spacing(12), paddingTop: spacing(12), borderTopWidth: wp(1), borderTopColor: '#E0E0E0' }}>
              <Text style={{ fontSize: fontSize(10), color: '#666666', fontFamily: 'Poppins' }} allowFontScaling={false}>
                Powered by - <Text style={{ fontWeight: '600', color: '#000000' }} allowFontScaling={false}>Caar</Text><Text style={{ fontWeight: '600', color: '#FF6B6B' }} allowFontScaling={false}>o</Text><Text style={{ fontWeight: '600', color: '#000000' }} allowFontScaling={false}>bar</Text>
              </Text>
            </View>
          </View>
        ) : (
          /* Horizontal Orientation - Landscape Style */
          <View style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: hp(12),
            padding: spacing(20),
            marginBottom: spacing(18),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: hp(2) },
            shadowOpacity: 0.1,
            shadowRadius: spacing(4),
            elevation: 3,
            borderWidth: wp(1),
            borderColor: '#E0E0E0',
            width: '100%',
            maxWidth: wp(600),
            alignSelf: 'center'
          }}>
            {/* Top Section: Company Logo and Details */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing(16) }}>
              {/* Company Logo on Left */}
              <View style={{ flex: 1, paddingRight: spacing(12) }}>
                <Image 
                  source={require('../../assets/creative designers.png')} 
                  style={{ width: wp(130), height: hp(37), resizeMode: 'contain' }} 
                />
              </View>

              {/* Company Details on Right */}
              <View style={{ flex: 1, alignItems: 'flex-end', paddingLeft: spacing(12) }}>
                <Text style={{ fontSize: fontSize(11), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(2), textAlign: 'right' }} allowFontScaling={false}>
                  Creative Designers
                </Text>
                <Text style={{ fontSize: fontSize(10), color: '#000000', fontFamily: 'Poppins', marginBottom: spacing(1), textAlign: 'right' }} allowFontScaling={false}>
                  Radhakishanpura, Sikar
                </Text>
                <Text style={{ fontSize: fontSize(10), color: '#000000', fontFamily: 'Poppins', textAlign: 'right' }} allowFontScaling={false}>
                  +919460638554
                </Text>
              </View>
            </View>

            {/* Middle Section: Profile and Details in Horizontal Layout - Centered */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing(16), justifyContent: 'center' }}>
              {/* Profile Picture and Name on Left */}
              <View style={{ marginRight: spacing(24), alignItems: 'center', width: wp(110) }}>
                <Image 
                  source={require('../../assets/Profile picture.png')} 
                  style={{ width: wp(85), height: hp(85), borderRadius: hp(42.5), marginBottom: spacing(10), resizeMode: 'cover' }}
                />
                <Text style={{ fontSize: fontSize(14), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(3), textAlign: 'center' }} allowFontScaling={false}>
                  Kamal Jangid
                </Text>
                <Text style={{ fontSize: fontSize(11), color: '#666666', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                  Carpenter
                </Text>
              </View>

              {/* Employee Details in Two Columns - Centered */}
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '48%', marginBottom: spacing(8), alignItems: 'center' }}>
                  <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                    Employee ID : <Text style={{ color: '#666666' }} allowFontScaling={false}>001</Text>
                  </Text>
                </View>
                <View style={{ width: '48%', marginBottom: spacing(8), alignItems: 'center' }}>
                  <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                    Joning Date : <Text style={{ color: '#666666' }} allowFontScaling={false}>01/01/2023</Text>
                  </Text>
                </View>
                <View style={{ width: '48%', marginBottom: spacing(8), alignItems: 'center' }}>
                  <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                    Date Of Birth : <Text style={{ color: '#666666' }} allowFontScaling={false}>18/01/1985</Text>
                  </Text>
                </View>
                <View style={{ width: '48%', marginBottom: spacing(8), alignItems: 'center' }}>
                  <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                    Phone : <Text style={{ color: '#666666' }} allowFontScaling={false}>9460638554</Text>
                  </Text>
                </View>
                <View style={{ width: '48%', alignItems: 'center' }}>
                  <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }} allowFontScaling={false}>
                    City : <Text style={{ color: '#666666' }} allowFontScaling={false}>Sikar</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Bottom: Powered by */}
            <View style={{ alignItems: 'center', marginTop: spacing(12), paddingTop: spacing(12), borderTopWidth: wp(1), borderTopColor: '#E0E0E0' }}>
              <Text style={{ fontSize: fontSize(10), color: '#666666', fontFamily: 'Poppins' }} allowFontScaling={false}>
                Powered by - <Text style={{ fontWeight: '600', color: '#000000' }} allowFontScaling={false}>Caar</Text><Text style={{ fontWeight: '600', color: '#FF6B6B' }} allowFontScaling={false}>o</Text><Text style={{ fontWeight: '600', color: '#000000' }} allowFontScaling={false}>bar</Text>
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Action Buttons */}
      <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: '#FFFFFF',
        paddingHorizontal: spacing(16),
        paddingVertical: spacing(16),
        paddingBottom: spacing(16) + insets.bottom,
        borderTopWidth: wp(1),
        borderTopColor: '#E0E0E0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Vertical Button */}
        <TouchableOpacity 
          onPress={() => setOrientation('vertical')}
          style={{
            backgroundColor: orientation === 'vertical' ? '#248CFF' : '#FFFFFF',
            borderWidth: wp(1),
            borderColor: '#248CFF',
            paddingVertical: spacing(12),
            paddingHorizontal: spacing(24),
            borderRadius: hp(20),
            flex: 1,
            marginRight: spacing(12),
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ 
            fontSize: fontSize(14), 
            fontWeight: '600', 
            color: orientation === 'vertical' ? '#FFFFFF' : '#248CFF', 
            fontFamily: 'Poppins-SemiBold' 
          }} allowFontScaling={false}>
            Vertical
          </Text>
        </TouchableOpacity>

        {/* Printer Button */}
        <TouchableOpacity 
          style={{
            width: wp(50),
            height: hp(50),
            borderRadius: hp(25),
            backgroundColor: '#248CFF',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing(12)
          }}
        >
          <Text style={{ fontSize: fontSize(20), color: '#FFFFFF' }} allowFontScaling={false}>🖨️</Text>
        </TouchableOpacity>

        {/* Horizontal Button */}
        <TouchableOpacity 
          onPress={() => setOrientation('horizontal')}
          style={{
            backgroundColor: orientation === 'horizontal' ? '#248CFF' : '#FFFFFF',
            borderWidth: wp(1),
            borderColor: '#248CFF',
            paddingVertical: spacing(12),
            paddingHorizontal: spacing(24),
            borderRadius: hp(20),
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ 
            fontSize: fontSize(14), 
            fontWeight: '600', 
            color: orientation === 'horizontal' ? '#FFFFFF' : '#248CFF', 
            fontFamily: 'Poppins-SemiBold' 
          }} allowFontScaling={false}>
            Horizontal
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

