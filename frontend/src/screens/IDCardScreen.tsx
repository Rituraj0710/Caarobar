import React, { useState } from 'react';
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
  Agreements: undefined;
  Resignation: undefined;
  IDCard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'IDCard'>;

export default function IDCardScreen({ navigation }: Props) {
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

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
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 120, paddingHorizontal: 16, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title */}
        <View style={{ marginTop: 6, marginBottom: 18, width: '100%', alignItems: 'flex-start' }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '700', 
            color: '#000000', 
            fontFamily: 'Poppins-Bold',
            textDecorationLine: 'underline'
          }}>
            ID Card
          </Text>
        </View>

        {/* ID Card */}
        {orientation === 'vertical' ? (
          /* Vertical Orientation - Portrait Style */
          <View style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 24,
            marginBottom: 18,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            width: '100%',
            maxWidth: 320,
            alignSelf: 'center'
          }}>
            {/* Top Section: Company Logo and Details */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              {/* Company Logo on Left */}
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Image 
                  source={require('../../assets/creative designers.png')} 
                  style={{ width: 110, height: 32, resizeMode: 'contain' }} 
                />
              </View>

              {/* Company Details on Right */}
              <View style={{ flex: 1, alignItems: 'flex-end', paddingLeft: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 3, textAlign: 'right' }}>
                  Creative Designers
                </Text>
                <Text style={{ fontSize: 10, color: '#000000', fontFamily: 'Poppins', marginBottom: 2, textAlign: 'right' }}>
                  Radhakishanpura, Sikar
                </Text>
                <Text style={{ fontSize: 10, color: '#000000', fontFamily: 'Poppins', textAlign: 'right' }}>
                  +919460638554
                </Text>
              </View>
            </View>

            {/* Profile Picture Centered */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 110, height: 110, borderRadius: 55, marginBottom: 12 }}
              />
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 4, textAlign: 'center' }}>
                Kamal Jangid
              </Text>
              <Text style={{ fontSize: 13, color: '#666666', fontFamily: 'Poppins', textAlign: 'center' }}>
                Carpenter
              </Text>
            </View>

            {/* Employee Details - Vertical Stack */}
            <View style={{ marginBottom: 20 }}>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
                  Employee ID : <Text style={{ color: '#666666' }}>001</Text>
                </Text>
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
                  Joning Date : <Text style={{ color: '#666666' }}>01/01/2023</Text>
                </Text>
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
                  Date Of Birth : <Text style={{ color: '#666666' }}>18/01/1985</Text>
                </Text>
              </View>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
                  Phone : <Text style={{ color: '#666666' }}>9460638554</Text>
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
                  City : <Text style={{ color: '#666666' }}>Sikar</Text>
                </Text>
              </View>
            </View>

            {/* Bottom: Powered by */}
            <View style={{ alignItems: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E0E0E0' }}>
              <Text style={{ fontSize: 10, color: '#666666', fontFamily: 'Poppins' }}>
                Powered by - Caarobar
              </Text>
            </View>
          </View>
        ) : (
          /* Horizontal Orientation - Landscape Style */
          <View style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 20,
            marginBottom: 18,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            width: '100%',
            maxWidth: 600,
            alignSelf: 'center'
          }}>
            {/* Top Section: Company Logo and Details */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              {/* Company Logo on Left */}
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Image 
                  source={require('../../assets/creative designers.png')} 
                  style={{ width: 130, height: 37, resizeMode: 'contain' }} 
                />
              </View>

              {/* Company Details on Right */}
              <View style={{ flex: 1, alignItems: 'flex-end', paddingLeft: 12 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 4, textAlign: 'right' }}>
                  Creative Designers
                </Text>
                <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'Poppins', marginBottom: 2, textAlign: 'right' }}>
                  Radhakishanpura, Sikar
                </Text>
                <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'Poppins', textAlign: 'right' }}>
                  +919460638554
                </Text>
              </View>
            </View>

            {/* Middle Section: Profile and Details in Horizontal Layout */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
              {/* Profile Picture and Name on Left */}
              <View style={{ marginRight: 24, alignItems: 'center', width: 110 }}>
                <Image 
                  source={require('../../assets/Profile picture.png')} 
                  style={{ width: 85, height: 85, borderRadius: 42.5, marginBottom: 10 }}
                />
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 3, textAlign: 'center' }}>
                  Kamal Jangid
                </Text>
                <Text style={{ fontSize: 11, color: '#666666', fontFamily: 'Poppins', textAlign: 'center' }}>
                  Carpenter
                </Text>
              </View>

              {/* Employee Details in Two Columns */}
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <View style={{ width: '48%', marginBottom: 8 }}>
                  <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'Poppins' }}>
                    Employee ID : <Text style={{ color: '#666666' }}>001</Text>
                  </Text>
                </View>
                <View style={{ width: '48%', marginBottom: 8 }}>
                  <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'Poppins' }}>
                    Joning Date : <Text style={{ color: '#666666' }}>01/01/2023</Text>
                  </Text>
                </View>
                <View style={{ width: '48%', marginBottom: 8 }}>
                  <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'Poppins' }}>
                    Date Of Birth : <Text style={{ color: '#666666' }}>18/01/1985</Text>
                  </Text>
                </View>
                <View style={{ width: '48%', marginBottom: 8 }}>
                  <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'Poppins' }}>
                    Phone : <Text style={{ color: '#666666' }}>9460638554</Text>
                  </Text>
                </View>
                <View style={{ width: '48%' }}>
                  <Text style={{ fontSize: 11, color: '#000000', fontFamily: 'Poppins' }}>
                    City : <Text style={{ color: '#666666' }}>Sikar</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Bottom: Powered by */}
            <View style={{ alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E0E0E0' }}>
              <Text style={{ fontSize: 10, color: '#666666', fontFamily: 'Poppins' }}>
                Powered by - Caarobar
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
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Vertical Button */}
        <TouchableOpacity 
          onPress={() => setOrientation('vertical')}
          style={{
            backgroundColor: orientation === 'vertical' ? '#2196F3' : '#FFFFFF',
            borderWidth: 2,
            borderColor: '#2196F3',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            flex: 1,
            marginRight: 12,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ 
            fontSize: 14, 
            fontWeight: '600', 
            color: orientation === 'vertical' ? '#FFFFFF' : '#2196F3', 
            fontFamily: 'Poppins-SemiBold' 
          }}>
            Vertical
          </Text>
        </TouchableOpacity>

        {/* Printer Button */}
        <TouchableOpacity 
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#2196F3',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12
          }}
        >
          <Text style={{ fontSize: 20, color: '#FFFFFF' }}>🖨️</Text>
        </TouchableOpacity>

        {/* Horizontal Button */}
        <TouchableOpacity 
          onPress={() => setOrientation('horizontal')}
          style={{
            backgroundColor: orientation === 'horizontal' ? '#2196F3' : '#FFFFFF',
            borderWidth: 2,
            borderColor: '#2196F3',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ 
            fontSize: 14, 
            fontWeight: '600', 
            color: orientation === 'horizontal' ? '#FFFFFF' : '#2196F3', 
            fontFamily: 'Poppins-SemiBold' 
          }}>
            Horizontal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

