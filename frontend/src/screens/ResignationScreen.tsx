import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Modal } from 'react-native';
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
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee and Company Information Section - Card */}
        <View style={{ 
          marginTop: 12, 
          marginBottom: 24,
          backgroundColor: '#F5F5F5',
          borderRadius: 12,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2
        }}>
          {/* Top Row: Logo on Left, Company Info on Right */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
            {/* Company Logo on Left */}
            <View style={{ flex: 1 }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: 140, height: 40, resizeMode: 'contain', marginBottom: 8 }} 
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

          {/* Profile Picture in Center with Icons */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <View style={{ alignItems: 'center', position: 'relative' }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 4, textAlign: 'center' }}>
                Kamal Jangid
              </Text>
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }}>
                Carpenter
              </Text>
              {/* Edit and Ellipsis icons to the right of profile */}
              <View style={{ position: 'absolute', right: -40, top: 0, flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginRight: 8 }}>
                  <Text style={{ fontSize: 16, color: '#000000' }}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 18, color: '#000000' }}>⋮</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bottom Row: Joining Date, RESIGNATION, Emp id */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E0E0E0' }}>
            <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
              Joining 01/11/23
            </Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#E91E63', fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }}>
              RESIGNATION
            </Text>
            <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
              Emp id - 001
            </Text>
          </View>
        </View>

        {/* Resignation Form Fields */}
        <View style={{ marginBottom: 24 }}>
          {/* Resignation Date */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
              Resignation Date
            </Text>
            <TextInput
              value={resignationDate}
              onChangeText={setResignationDate}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 14,
                color: '#000000',
                fontFamily: 'Poppins',
                borderWidth: 1,
                borderColor: '#E0E0E0'
              }}
            />
          </View>

          {/* Notice Period */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
              Notice Period
            </Text>
            <TextInput
              value={noticePeriod}
              onChangeText={setNoticePeriod}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 14,
                color: '#000000',
                fontFamily: 'Poppins',
                borderWidth: 1,
                borderColor: '#E0E0E0'
              }}
            />
          </View>

          {/* Actual Last Working Date */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
              Actual Last Working Date
            </Text>
            <TextInput
              value={actualLastWorkingDate}
              onChangeText={setActualLastWorkingDate}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 14,
                color: '#000000',
                fontFamily: 'Poppins',
                borderWidth: 1,
                borderColor: '#E0E0E0'
              }}
            />
          </View>

          {/* Request Last Working Day */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
              Request Last Working Day
            </Text>
            <TextInput
              value={requestLastWorkingDay}
              onChangeText={setRequestLastWorkingDay}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 14,
                color: '#000000',
                fontFamily: 'Poppins',
                borderWidth: 1,
                borderColor: '#E0E0E0'
              }}
            />
          </View>
        </View>

        {/* Specify Reason Section */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 12 }}>
            Specify Reason
          </Text>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            padding: 16,
            borderWidth: 1,
            borderColor: '#E0E0E0'
          }}>
            {reasons.map((reason) => (
              <TouchableOpacity
                key={reason.id}
                onPress={() => toggleReason(reason.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                  paddingVertical: 4
                }}
              >
                {reason.checked ? (
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#4CAF50',
                    backgroundColor: '#4CAF50',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
                  </View>
                ) : (
                  <View style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#000000',
                    marginRight: 17,
                    marginLeft: 7
                  }} />
                )}
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', flex: 1 }}>
                  {reason.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add Image Section */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#2196F3', fontFamily: 'Poppins-Bold', marginBottom: 12 }}>
            Add Image
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              flex: 1,
              height: 120,
              backgroundColor: '#F5F5F5',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderStyle: 'dashed',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12
            }}>
              <Text style={{ fontSize: 32, marginBottom: 8 }}>☁️</Text>
              <Text style={{ fontSize: 20 }}>↑</Text>
            </View>
            <TouchableOpacity style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#000000'
            }}>
              <Text style={{ fontSize: 24, color: '#000000', fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Send Button */}
      <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
        <TouchableOpacity 
          onPress={() => setShowSuccessModal(true)}
          style={{
            backgroundColor: '#2196F3',
            paddingVertical: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins-SemiBold' }}>
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
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 32,
            paddingBottom: 24,
            paddingHorizontal: 24,
            alignItems: 'center'
          }}>
            {/* Success Icon */}
            <View style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: '#E3F2FD',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}>
              <View style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 30, 
                backgroundColor: '#2196F3',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ fontSize: 32, color: '#FFFFFF' }}>✓</Text>
              </View>
            </View>

            {/* Title */}
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: 8,
              textAlign: 'center'
            }}>
              Resignation Applied Successfully
            </Text>

            {/* Message */}
            <Text style={{ 
              fontSize: 14, 
              color: '#666666', 
              fontFamily: 'Poppins',
              marginBottom: 32,
              textAlign: 'center',
              lineHeight: 20
            }}>
              Your Resignation has been applied successfully
            </Text>

            {/* Done Button */}
            <TouchableOpacity 
              onPress={() => {
                setShowSuccessModal(false);
                navigation.goBack();
              }}
              style={{
                backgroundColor: '#2196F3',
                width: '100%',
                paddingVertical: 16,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#FFFFFF', 
                fontFamily: 'Poppins-SemiBold' 
              }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

