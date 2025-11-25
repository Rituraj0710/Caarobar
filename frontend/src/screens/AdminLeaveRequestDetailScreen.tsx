import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackButton from '../components/BackButton';
import { wp, hp, fontSize, spacing, useSafeArea } from '../utils/responsive';
import SafeAreaView from '../components/SafeAreaView';

type RootStackParamList = {
  AdminLeaveRequestDetail: {
    employeeId: string;
    employeeName: string;
    leaveType?: string;
    requestDate?: string;
    startOffDate?: string;
    day?: string;
    approvedBy?: string;
    status?: string;
    reason?: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AdminLeaveRequestDetail'>;

export default function AdminLeaveRequestDetailScreen({ navigation, route }: Props) {
  const insets = useSafeArea();
  const {
    employeeId = '1',
    employeeName = 'Kamal Kishore Jangid',
    leaveType = 'Medical',
    requestDate = '25 December 2024',
    startOffDate = '01 January 2025',
    day = '2 Day',
    approvedBy = 'Admin',
    status = 'Pending',
    reason = 'I need to take a medical leave.'
  } = route.params || {};

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleApprove = () => {
    // TODO: Implement approve functionality
    console.log('Approve leave request');
    navigation.goBack();
  };

  const handleReject = () => {
    // TODO: Implement reject functionality
    console.log('Reject leave request');
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />
      
      {/* Blue Header */}
      <View style={{
        backgroundColor: '#4285F4',
        paddingTop: spacing(12),
        paddingBottom: spacing(12),
        paddingHorizontal: spacing(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Back Arrow */}
        <BackButton color="#FFFFFF" />

        {/* Title */}
        <Text style={{
          fontSize: fontSize(18),
          fontWeight: '700',
          color: '#FFFFFF',
          fontFamily: 'Poppins-Bold',
          flex: 1,
          textAlign: 'center',
          marginRight: wp(40)
        }} allowFontScaling={false}>
          Leave Request Details
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing(100) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Leave Request Information Section */}
        <View style={{ paddingHorizontal: spacing(16), paddingTop: spacing(20) }}>
          {/* Leave Type */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: spacing(16),
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Leave Type
            </Text>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }} allowFontScaling={false}>
              {leaveType}
            </Text>
          </View>

          {/* Request Date */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: spacing(16),
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Request Date
            </Text>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }} allowFontScaling={false}>
              {requestDate}
            </Text>
          </View>

          {/* Start Off Date */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: spacing(16),
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Start Off Date
            </Text>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }} allowFontScaling={false}>
              {startOffDate}
            </Text>
          </View>

          {/* Day */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: spacing(16),
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Day
            </Text>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }} allowFontScaling={false}>
              {day}
            </Text>
          </View>

          {/* Approved By */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: spacing(16),
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Approved By
            </Text>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }} allowFontScaling={false}>
              {approvedBy}
            </Text>
          </View>

          {/* Status */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: spacing(16),
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Status
            </Text>
            <Text style={{
              fontSize: fontSize(14),
              color: status === 'Pending' ? '#F59E0B' : status === 'Approved' ? '#4CAF50' : '#E53935',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }} allowFontScaling={false}>
              {status}
            </Text>
          </View>
        </View>

        {/* Reason for Leave Section */}
        <View style={{ paddingHorizontal: spacing(16), paddingTop: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#000000',
            fontFamily: 'Poppins',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Reason for Leave :-
          </Text>
          <View style={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: hp(8),
            padding: spacing(12),
            minHeight: hp(100),
            backgroundColor: '#FAFAFA'
          }}>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
              lineHeight: fontSize(20)
            }} allowFontScaling={false}>
              • {reason}
            </Text>
          </View>
        </View>

        {/* Add Image Section */}
        <View style={{ paddingHorizontal: spacing(16), paddingTop: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins',
            fontWeight: '600',
            marginBottom: spacing(12)
          }} allowFontScaling={false}>
            Add Image
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing(12)
          }}>
            {/* Dashed Border Box with Upload Icon */}
            <View style={{
              width: wp(120),
              height: hp(120),
              borderWidth: 2,
              borderColor: '#E0E0E0',
              borderStyle: 'dashed',
              borderRadius: hp(8),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FAFAFA',
              position: 'relative'
            }}>
              {/* Cloud/Upload Icon - Large Black Cloud with Up Arrow */}
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {/* Large Cloud Shape */}
                <Text style={{ fontSize: fontSize(60), color: '#000000', marginBottom: spacing(8) }} allowFontScaling={false}>☁</Text>
                {/* Up Arrow inside cloud */}
                <View style={{
                  position: 'absolute',
                  bottom: spacing(25),
                  width: 0,
                  height: 0,
                  borderLeftWidth: wp(10),
                  borderRightWidth: wp(10),
                  borderBottomWidth: hp(14),
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#000000'
                }} />
              </View>
            </View>

            {/* Circular Plus Button */}
            <TouchableOpacity
              style={{
                width: wp(50),
                height: hp(50),
                borderRadius: hp(25),
                backgroundColor: '#000000',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Implement image picker
                console.log('Add image');
              }}
            >
              <Text style={{ fontSize: fontSize(24), color: '#FFFFFF', fontWeight: 'bold' }} allowFontScaling={false}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons Footer */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingHorizontal: spacing(16),
        paddingVertical: spacing(16),
        paddingBottom: spacing(34) + insets.bottom,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        gap: spacing(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: spacing(-2) },
        shadowOpacity: 0.1,
        shadowRadius: spacing(4),
        elevation: 5
      }}>
        {/* Reject Button */}
        <TouchableOpacity
          onPress={handleReject}
          style={{
            flex: 1,
            backgroundColor: '#E53935',
            borderRadius: hp(8),
            paddingVertical: spacing(14),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: spacing(8)
          }}
        >
          <Text style={{ fontSize: fontSize(20), color: '#FFFFFF', fontWeight: 'bold' }} allowFontScaling={false}>×</Text>
          <Text style={{
            fontSize: fontSize(16),
            color: '#FFFFFF',
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }} allowFontScaling={false}>
            Reject
          </Text>
        </TouchableOpacity>

        {/* Approve Button */}
        <TouchableOpacity
          onPress={handleApprove}
          style={{
            flex: 1,
            backgroundColor: '#4CAF50',
            borderRadius: hp(8),
            paddingVertical: spacing(14),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: spacing(8)
          }}
        >
          <Text style={{ fontSize: fontSize(20), color: '#FFFFFF', fontWeight: 'bold' }} allowFontScaling={false}>✓</Text>
          <Text style={{
            fontSize: fontSize(16),
            color: '#FFFFFF',
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }} allowFontScaling={false}>
            Approve
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

