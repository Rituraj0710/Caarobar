import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  AdminPaymentRequestDetail: {
    employeeId: string;
    employeeName: string;
    paymentType?: string;
    requestDate?: string;
    requestedDate?: string;
    amount?: string;
    approvedBy?: string;
    status?: string;
    reason?: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'AdminPaymentRequestDetail'>;

export default function AdminPaymentRequestDetailScreen({ navigation, route }: Props) {
  const {
    employeeId = '1',
    employeeName = 'Kamal Kishore Jangid',
    paymentType = 'Medical',
    requestDate = '25 December 2024',
    requestedDate = '01 January 2025',
    amount = '2000',
    approvedBy = 'Admin',
    status = 'Pending',
    reason = 'I am feeling unwell & need to see a doctor'
  } = route.params || {};

  const handlePaymentTransfer = () => {
    // TODO: Implement payment transfer functionality
    console.log('Payment Transfer To Salary A/C');
  };

  const handleApprove = () => {
    // TODO: Implement approve functionality
    console.log('Approve payment request');
    navigation.goBack();
  };

  const handleReject = () => {
    // TODO: Implement reject functionality
    console.log('Reject payment request');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#4285F4" />
      
      {/* Blue Header */}
      <View style={{
        backgroundColor: '#4285F4',
        paddingTop: 44,
        paddingBottom: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Text style={{ fontSize: 20, color: '#FFFFFF' }}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={{
          fontSize: 18,
          fontWeight: '700',
          color: '#FFFFFF',
          fontFamily: 'Poppins-Bold',
          flex: 1,
          textAlign: 'center',
          marginRight: 40
        }}>
          Payment Request Details
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Payment Request Information Section */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          {/* Payment Type */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              Payment Type
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }}>
              {paymentType}
            </Text>
          </View>

          {/* Request Date */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              Request Date
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }}>
              {requestDate}
            </Text>
          </View>

          {/* Requested Date */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              Requested Date
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }}>
              {requestedDate}
            </Text>
          </View>

          {/* Amount */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              Amount
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }}>
              {amount}
            </Text>
          </View>

          {/* Approved By */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              Approved By
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }}>
              {approvedBy}
            </Text>
          </View>

          {/* Status */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              Status
            </Text>
            <Text style={{
              fontSize: 14,
              color: status === 'Pending' ? '#F59E0B' : status === 'Approved' ? '#4CAF50' : '#E53935',
              fontFamily: 'Poppins',
              fontWeight: '600'
            }}>
              {status}
            </Text>
          </View>
        </View>

        {/* Reason for Leave Section */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#000000',
            fontFamily: 'Poppins',
            marginBottom: 8
          }}>
            Reason for Leave :-
          </Text>
          <View style={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 8,
            padding: 12,
            minHeight: 100,
            backgroundColor: '#FAFAFA'
          }}>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins',
              lineHeight: 20
            }}>
              • {reason}
            </Text>
          </View>
        </View>

        {/* Add Image Section */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins',
            fontWeight: '600',
            marginBottom: 12
          }}>
            Add Image
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12
          }}>
            {/* Dashed Border Box with Upload Icon */}
            <View style={{
              width: 120,
              height: 120,
              borderWidth: 2,
              borderColor: '#E0E0E0',
              borderStyle: 'dashed',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FAFAFA',
              position: 'relative'
            }}>
              {/* Cloud/Upload Icon - Large Black Cloud with Up Arrow */}
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {/* Large Cloud Shape */}
                <Text style={{ fontSize: 60, color: '#000000', marginBottom: 8 }}>☁</Text>
                {/* Up Arrow inside cloud */}
                <View style={{
                  position: 'absolute',
                  bottom: 25,
                  width: 0,
                  height: 0,
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  borderBottomWidth: 14,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#000000'
                }} />
              </View>
            </View>

            {/* Circular Plus Button */}
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
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
              <Text style={{ fontSize: 24, color: '#FFFFFF', fontWeight: 'bold' }}>+</Text>
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
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 34,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }}>
        {/* Payment Transfer To Salary A/C Button */}
        <TouchableOpacity
          onPress={handlePaymentTransfer}
          style={{
            backgroundColor: '#FF9800',
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12
          }}
        >
          <Text style={{
            fontSize: 16,
            color: '#000000',
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }}>
            Payment Transfer To Salary A/C
          </Text>
        </TouchableOpacity>

        {/* Reject and Approve Buttons */}
        <View style={{
          flexDirection: 'row',
          gap: 12
        }}>
          {/* Reject Button */}
          <TouchableOpacity
            onPress={handleReject}
            style={{
              flex: 1,
              backgroundColor: '#E53935',
              borderRadius: 8,
              paddingVertical: 14,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 8
            }}
          >
            <Text style={{ fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' }}>×</Text>
            <Text style={{
              fontSize: 16,
              color: '#FFFFFF',
              fontFamily: 'Poppins-Bold',
              fontWeight: '700'
            }}>
              Reject
            </Text>
          </TouchableOpacity>

          {/* Approve Button */}
          <TouchableOpacity
            onPress={handleApprove}
            style={{
              flex: 1,
              backgroundColor: '#4CAF50',
              borderRadius: 8,
              paddingVertical: 14,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 8
            }}
          >
            <Text style={{ fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' }}>✓</Text>
            <Text style={{
              fontSize: 16,
              color: '#FFFFFF',
              fontFamily: 'Poppins-Bold',
              fontWeight: '700'
            }}>
              Approve
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

