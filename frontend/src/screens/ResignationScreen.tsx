import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Modal, StatusBar } from 'react-native';
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
};

type Props = NativeStackScreenProps<RootStackParamList, 'Resignation'>;

const resignationReasons = [
  { id: 'health', label: 'Health issue -', checked: true },
  { id: 'salary', label: 'Salary Problem -', checked: true },
  { id: 'time', label: 'Time Issue -', checked: true },
  { id: 'travel', label: 'Travel Issue -', checked: false },
  { id: 'staff', label: 'Staff Management -', checked: false },
  { id: 'accident', label: 'Accident Issue -', checked: false },
  { id: 'policy', label: 'Comany Policy -', checked: false },
];

export default function ResignationScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [resignationDate, setResignationDate] = useState('01/04/2025');
  const [noticePeriod, setNoticePeriod] = useState('30 days');
  const [actualLastWorkingDate, setActualLastWorkingDate] = useState('30/04/2025');
  const [requestLastWorkingDay, setRequestLastWorkingDay] = useState('05/04/2025');
  const [reasons, setReasons] = useState(resignationReasons);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleReason = (id: string) => {
    setReasons(reasons.map(reason => 
      reason.id === id ? { ...reason, checked: !reason.checked } : reason
    ));
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#248CFF" />
      
      {/* Top Header - Blue Bar */}
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
            Resignation
          </Text>
        </View>

        {/* Right: Edit and Menu Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: spacing(4), marginRight: spacing(12) }}>
            <Image 
              source={require('../../assets/Registration header.png')} 
              style={{ width: wp(20), height: hp(20), resizeMode: 'contain' }} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: spacing(4) }}>
            <Text style={{ fontSize: fontSize(20), color: '#FFFFFF' }} allowFontScaling={false}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, paddingHorizontal: spacing(16) }}>
        {/* Employee and Company Information Section - Card */}
        <View style={{ 
          marginTop: spacing(6), 
          marginBottom: spacing(6),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(10),
          padding: spacing(10),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(1) },
          shadowOpacity: 0.08,
          shadowRadius: spacing(3),
          elevation: 2,
          borderWidth: wp(1),
          borderColor: '#E0E0E0'
        }}>
          {/* Top Row: Logo on Left, Company Info on Right */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing(6) }}>
            {/* Company Logo on Left */}
            <View style={{ flex: 1 }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: wp(110), height: hp(30), resizeMode: 'contain' }} 
              />
            </View>

            {/* Company Info on Right */}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: fontSize(10), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(1), textAlign: 'right' }} allowFontScaling={false}>
                Creative Designers
              </Text>
              <Text style={{ fontSize: fontSize(9), color: '#000000', fontFamily: 'Poppins', marginBottom: spacing(1), textAlign: 'right' }} allowFontScaling={false}>
                Radhakishanpura, Sikar
              </Text>
              <Text style={{ fontSize: fontSize(9), color: '#000000', fontFamily: 'Poppins', textAlign: 'right' }} allowFontScaling={false}>
                +919460638554
              </Text>
            </View>
          </View>

          {/* Profile Picture in Center */}
          <View style={{ alignItems: 'center', marginBottom: spacing(6) }}>
            <Image 
              source={require('../../assets/Profile picture.png')} 
              style={{ width: wp(60), height: hp(60), borderRadius: hp(30), marginBottom: spacing(3), resizeMode: 'cover' }}
            />
            <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(1), textAlign: 'center' }} allowFontScaling={false}>
              Kamal Jangid
            </Text>
            <Text style={{ fontSize: fontSize(11), color: '#666666', fontFamily: 'Poppins', marginBottom: spacing(1), textAlign: 'center' }} allowFontScaling={false}>
              Carpenter
            </Text>
            <Text style={{ fontSize: fontSize(11), fontWeight: '600', color: '#FF5252', fontFamily: 'Poppins-SemiBold', textAlign: 'center' }} allowFontScaling={false}>
              Resignation
            </Text>
          </View>

          {/* Bottom Row: Joining Date and Emp id */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing(6), borderTopWidth: wp(1), borderTopColor: '#E0E0E0' }}>
            <Text style={{ fontSize: fontSize(10), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
              Joining 01/11/23
            </Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: fontSize(10), color: '#000000', fontFamily: 'Poppins', textAlign: 'right' }} allowFontScaling={false}>
                Emp id - 001
              </Text>
            </View>
          </View>
        </View>

        {/* Resignation Form Fields - 2x2 Grid */}
        <View style={{ marginBottom: spacing(8) }}>
          {/* Row 1 */}
          <View style={{ flexDirection: 'row', marginBottom: spacing(8) }}>
            {/* Resignation Date */}
            <View style={{ flex: 1, marginRight: spacing(6) }}>
              <Text style={{ fontSize: fontSize(11), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(4) }} allowFontScaling={false}>
                Resignation Date
              </Text>
              <TextInput
                value={resignationDate}
                onChangeText={setResignationDate}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: hp(6),
                  paddingHorizontal: spacing(10),
                  paddingVertical: spacing(6),
                  fontSize: fontSize(11),
                  color: '#000000',
                  fontFamily: 'Poppins',
                  borderWidth: wp(1),
                  borderColor: '#E0E0E0',
                  height: hp(36)
                }}
                allowFontScaling={false}
              />
            </View>

            {/* Notice Period */}
            <View style={{ flex: 1, marginLeft: spacing(6) }}>
              <Text style={{ fontSize: fontSize(11), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(4) }} allowFontScaling={false}>
                Notice Period
              </Text>
              <TextInput
                value={noticePeriod}
                onChangeText={setNoticePeriod}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: hp(6),
                  paddingHorizontal: spacing(10),
                  paddingVertical: spacing(6),
                  fontSize: fontSize(11),
                  color: '#000000',
                  fontFamily: 'Poppins',
                  borderWidth: wp(1),
                  borderColor: '#E0E0E0',
                  height: hp(36)
                }}
                allowFontScaling={false}
              />
            </View>
          </View>

          {/* Row 2 */}
          <View style={{ flexDirection: 'row' }}>
            {/* Actual Last Working Date */}
            <View style={{ flex: 1, marginRight: spacing(6) }}>
              <Text style={{ fontSize: fontSize(11), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(4) }} allowFontScaling={false}>
                Actual Last Working Date
              </Text>
              <TextInput
                value={actualLastWorkingDate}
                onChangeText={setActualLastWorkingDate}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: hp(6),
                  paddingHorizontal: spacing(10),
                  paddingVertical: spacing(6),
                  fontSize: fontSize(11),
                  color: '#000000',
                  fontFamily: 'Poppins',
                  borderWidth: wp(1),
                  borderColor: '#E0E0E0',
                  height: hp(36)
                }}
                allowFontScaling={false}
              />
            </View>

            {/* Request Last Working Day */}
            <View style={{ flex: 1, marginLeft: spacing(6) }}>
              <Text style={{ fontSize: fontSize(11), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: spacing(4) }} allowFontScaling={false}>
                Request Last Working Day
              </Text>
              <TextInput
                value={requestLastWorkingDay}
                onChangeText={setRequestLastWorkingDay}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: hp(6),
                  paddingHorizontal: spacing(10),
                  paddingVertical: spacing(6),
                  fontSize: fontSize(11),
                  color: '#000000',
                  fontFamily: 'Poppins',
                  borderWidth: wp(1),
                  borderColor: '#E0E0E0',
                  height: hp(36)
                }}
                allowFontScaling={false}
              />
            </View>
          </View>
        </View>

        {/* Specify Reason Section */}
        <View style={{ marginBottom: spacing(6), flexShrink: 1 }}>
          <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: spacing(4) }} allowFontScaling={false}>
            Specify Reason
          </Text>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: hp(6),
            padding: spacing(6),
            borderWidth: wp(1),
            borderColor: '#E0E0E0'
          }}>
            {reasons.map((reason, index) => (
              <TouchableOpacity
                key={reason.id}
                onPress={() => toggleReason(reason.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: index < reasons.length - 1 ? spacing(4) : 0,
                  paddingVertical: spacing(0.5)
                }}
              >
                {reason.checked ? (
                  <View style={{
                    width: wp(16),
                    height: hp(16),
                    borderRadius: hp(4),
                    borderWidth: wp(1.5),
                    borderColor: '#4CAF50',
                    backgroundColor: '#4CAF50',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing(8),
                    flexShrink: 0
                  }}>
                    <Text style={{ color: '#FFFFFF', fontSize: fontSize(9), fontWeight: 'bold' }} allowFontScaling={false}>✓</Text>
                  </View>
                ) : (
                  <View style={{
                    width: wp(5),
                    height: hp(5),
                    borderRadius: hp(2.5),
                    backgroundColor: '#000000',
                    marginRight: spacing(12),
                    marginLeft: spacing(5),
                    flexShrink: 0
                  }} />
                )}
                <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', flex: 1 }} allowFontScaling={false}>
                  {reason.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add Image Section */}
        <View style={{ marginBottom: spacing(8) }}>
          <Text style={{ fontSize: fontSize(13), fontWeight: '700', color: '#248CFF', fontFamily: 'Poppins-Bold', marginBottom: spacing(6) }} allowFontScaling={false}>
            Add Image
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              flex: 1,
              height: hp(60),
              backgroundColor: '#FFFFFF',
              borderRadius: hp(6),
              borderWidth: wp(1),
              borderColor: '#E0E0E0',
              borderStyle: 'dashed',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing(8)
            }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: fontSize(20), marginBottom: spacing(2) }} allowFontScaling={false}>☁️</Text>
                <Text style={{ fontSize: fontSize(14) }} allowFontScaling={false}>↑</Text>
              </View>
            </View>
            <TouchableOpacity style={{
              width: wp(44),
              height: hp(44),
              borderRadius: hp(22),
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: wp(2),
              borderColor: '#000000',
              flexShrink: 0
            }}>
              <Text style={{ fontSize: fontSize(18), color: '#000000', fontWeight: 'bold' }} allowFontScaling={false}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Send Button */}
      <View style={{ 
        backgroundColor: '#FFFFFF',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(8),
        paddingBottom: spacing(8) + insets.bottom,
        borderTopWidth: wp(1),
        borderTopColor: '#E0E0E0'
      }}>
        <TouchableOpacity 
          onPress={() => setShowSuccessModal(true)}
          style={{
            backgroundColor: '#248CFF',
            paddingVertical: spacing(10),
            borderRadius: hp(6),
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>
            Send
          </Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}

        animationType="slide"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <View style={{ 
            backgroundColor: '#FFFFFF', 
            width: '100%',
            borderTopLeftRadius: hp(24),
            borderTopRightRadius: hp(24),
            paddingTop: spacing(32),
            paddingBottom: spacing(32) + insets.bottom,
            paddingHorizontal: spacing(24),
            alignItems: 'center'
          }}>
            {/* Draggable Handle Indicator */}
            <View style={{
              width: wp(40),
              height: hp(4),
              backgroundColor: '#E0E0E0',
              borderRadius: hp(2),
              marginBottom: spacing(32),
              alignSelf: 'center'
            }} />

            {/* Success Icon - Tick Image */}
            <View style={{ 
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing(32)
            }}>
              <Image 
                source={require('../../assets/tick.png')} 
                style={{ width: wp(140), height: hp(140), resizeMode: 'contain' }} 
              />
            </View>

            {/* Title - Two Lines */}
            <View style={{ marginBottom: spacing(16), alignItems: 'center' }}>
              <Text style={{ 
                fontSize: fontSize(24), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold',
                textAlign: 'center',
                marginBottom: spacing(4)
              }} allowFontScaling={false}>
                Resignation Applied
              </Text>
              <Text style={{ 
                fontSize: fontSize(24), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold',
                textAlign: 'center'
              }} allowFontScaling={false}>
                Successfully
              </Text>
            </View>

            {/* Message */}
            <Text style={{ 
              fontSize: fontSize(15), 
              color: '#666666', 
              fontFamily: 'Poppins',
              marginBottom: spacing(40),
              textAlign: 'center',
              lineHeight: fontSize(22),
              paddingHorizontal: spacing(16)
            }} allowFontScaling={false}>
              Your Resignation has been applied successfully
            </Text>

            {/* Done Button */}
            <TouchableOpacity 
              onPress={() => {
                setShowSuccessModal(false);
                navigation.goBack();
              }}
              style={{
                backgroundColor: '#248CFF',
                width: '100%',
                paddingVertical: spacing(16),
                borderRadius: hp(12),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ 
                fontSize: fontSize(16), 
                fontWeight: '600', 
                color: '#FFFFFF', 
                fontFamily: 'Poppins-SemiBold' 
              }} allowFontScaling={false}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

