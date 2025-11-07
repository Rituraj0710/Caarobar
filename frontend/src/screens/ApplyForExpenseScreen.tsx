import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
};

type Props = NativeStackScreenProps<RootStackParamList, 'ApplyForExpense'>;

export default function ApplyForExpenseScreen({ navigation }: Props) {
  const [expenseType, setExpenseType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [reason, setReason] = useState('');
  const [showExpenseTypeModal, setShowExpenseTypeModal] = useState(false);
  const [showPaymentModeModal, setShowPaymentModeModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const expenseTypes = ['Factory', 'House', 'Office', 'Transport', 'Hotel', 'Food', 'Travel', 'Custom'];
  const paymentModes = ['Cash', 'UPI'];

  const handleDateSelect = (day: number) => {
    setSelectedDay(day);
    const monthStr = currentMonth.toString().padStart(2, '0');
    const yearStr = currentYear.toString().slice(-2);
    const dateStr = `${day.toString().padStart(2, '0')}/${monthStr}/${yearStr}`;
    setSelectedDate(dateStr);
    setShowDatePicker(false);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month - 1, 1).getDay();
    // Convert Sunday (0) to 6, Monday (1) to 0, etc. to make Monday the first day
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const handleApply = () => {
    // Show success modal
    setShowSuccessModal(true);
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: '#2196F3', 
        paddingTop: 44, 
        paddingBottom: 16, 
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
          <Text style={{ fontSize: 24, color: '#FFFFFF' }}>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', flex: 1, textAlign: 'center' }}>
          Apply for Expense
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Expense Type */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#2196F3', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
            Expense Type
          </Text>
          <TouchableOpacity 
            onPress={() => setShowExpenseTypeModal(true)}
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#FFFFFF',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ fontSize: 14, color: expenseType ? '#000000' : '#999999', fontFamily: 'Poppins' }}>
              {expenseType || 'Select'}
            </Text>
            <Text style={{ fontSize: 12, color: '#000000' }}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Select Date */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#2196F3', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
            Select Date
          </Text>
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)}
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#FFFFFF',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ fontSize: 14, color: selectedDate ? '#000000' : '#999999', fontFamily: 'Poppins' }}>
              {selectedDate || 'Enter Date'}
            </Text>
            <Text style={{ fontSize: 16, color: '#000000' }}>📅</Text>
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#2196F3', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
            Amount
          </Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter Amount"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#FFFFFF',
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}
          />
        </View>

        {/* Payment Mode */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#2196F3', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
            Payment Mode
          </Text>
          <TouchableOpacity 
            onPress={() => setShowPaymentModeModal(true)}
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#FFFFFF',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ fontSize: 14, color: paymentMode ? '#000000' : '#999999', fontFamily: 'Poppins' }}>
              {paymentMode || 'Select'}
            </Text>
            <Text style={{ fontSize: 12, color: '#000000' }}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Reason for Payment */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#2196F3', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
            Reason for Payment
          </Text>
          <TextInput
            value={reason}
            onChangeText={setReason}
            placeholder="Write an excuse"
            placeholderTextColor="#999999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: '#FFFFFF',
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins',
              minHeight: 100
            }}
          />
        </View>

        {/* Add Image */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#2196F3', fontFamily: 'Poppins-SemiBold', marginBottom: 8 }}>
            Add Image
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {/* Upload Box */}
            <TouchableOpacity
              style={{
                width: 120,
                height: 120,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: 8,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 48, color: '#000000' }}>☁</Text>
                <View style={{ position: 'absolute', top: 20, left: 30 }}>
                  <Text style={{ fontSize: 24, color: '#000000' }}>↑</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Plus Icon */}
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#000000',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontSize: 30, color: '#FFFFFF', fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
        <TouchableOpacity 
          onPress={handleApply}
          style={{
            backgroundColor: '#2196F3',
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins-SemiBold' }}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>

      {/* Expense Type Modal */}
      <Modal
        visible={showExpenseTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowExpenseTypeModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowExpenseTypeModal(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 16 }}>
                  Select Expense Type
                </Text>
                {expenseTypes.map((type, index) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => {
                      setExpenseType(type);
                      setShowExpenseTypeModal(false);
                    }}
                    style={{
                      paddingVertical: 12,
                      borderBottomWidth: index < expenseTypes.length - 1 ? 1 : 0,
                      borderBottomColor: '#E0E0E0'
                    }}
                  >
                    <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'Poppins' }}>{index + 1}. {type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Payment Mode Modal */}
      <Modal
        visible={showPaymentModeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPaymentModeModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowPaymentModeModal(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 16 }}>
                  Select Payment Mode
                </Text>
                {paymentModes.map((mode, index) => (
                  <TouchableOpacity
                    key={mode}
                    onPress={() => {
                      setPaymentMode(mode);
                      setShowPaymentModeModal(false);
                    }}
                    style={{
                      paddingVertical: 12,
                      borderBottomWidth: index < paymentModes.length - 1 ? 1 : 0,
                      borderBottomColor: '#E0E0E0'
                    }}
                  >
                    <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'Poppins' }}>{index + 1}. {mode}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: 12, 
                padding: 20,
                width: '100%',
                maxWidth: 400,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8
              }}>
                {/* Calendar Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, position: 'relative' }}>
                  <TouchableOpacity onPress={() => {
                    if (currentMonth === 1) {
                      setCurrentMonth(12);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}>
                    <Text style={{ fontSize: 20, color: '#000000' }}>←</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                    {new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 16, color: '#000000' }}>📅</Text>
                    <TouchableOpacity onPress={() => {
                      if (currentMonth === 12) {
                        setCurrentMonth(1);
                        setCurrentYear(currentYear + 1);
                      } else {
                        setCurrentMonth(currentMonth + 1);
                      }
                    }}>
                      <Text style={{ fontSize: 20, color: '#000000' }}>→</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Days of Week Header */}
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                    <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={{ fontSize: 12, fontWeight: '600', color: '#666666', fontFamily: 'Poppins-SemiBold' }}>{day}</Text>
                    </View>
                  ))}
                </View>

                {/* Calendar Grid */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {emptyDays.map((_, index) => (
                    <View key={`empty-${index}`} style={{ width: '14.28%', height: 40 }} />
                  ))}
                  {days.map((day) => (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleDateSelect(day)}
                      style={{
                        width: '14.28%',
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <View style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: selectedDay === day ? '#00BCD4' : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Text style={{
                          fontSize: 14,
                          color: selectedDay === day ? '#FFFFFF' : '#000000',
                          fontFamily: 'Poppins',
                          fontWeight: selectedDay === day ? '600' : '400'
                        }}>
                          {day}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowSuccessModal(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={{ 
                backgroundColor: '#FFFFFF', 
                borderTopLeftRadius: 24, 
                borderTopRightRadius: 24,
                paddingTop: 12,
                paddingBottom: 32,
                paddingHorizontal: 24,
                alignItems: 'center'
              }}>
                {/* Draggable Indicator */}
                <View style={{ 
                  width: 40, 
                  height: 4, 
                  backgroundColor: '#E0E0E0', 
                  borderRadius: 2, 
                  marginBottom: 24 
                }} />

                {/* Success Icon with Glow Effect */}
                <View style={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: 50, 
                  backgroundColor: '#2196F3', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: 24,
                  shadowColor: '#2196F3',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.5,
                  shadowRadius: 20,
                  elevation: 10
                }}>
                  <View style={{ 
                    width: 70, 
                    height: 70, 
                    borderRadius: 35, 
                    backgroundColor: '#2196F3', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderColor: '#FFFFFF'
                  }}>
                    <Text style={{ fontSize: 40, color: '#FFFFFF', fontWeight: 'bold' }}>✓</Text>
                  </View>
                </View>

                {/* Success Message */}
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold',
                  marginBottom: 8,
                  textAlign: 'center'
                }}>
                  Expense Applied Successfully
                </Text>

                {/* Confirmation Text */}
                <Text style={{ 
                  fontSize: 14, 
                  color: '#666666', 
                  fontFamily: 'Poppins',
                  marginBottom: 32,
                  textAlign: 'center'
                }}>
                  Your Expense has been applied successfully
                </Text>

                {/* Done Button */}
                <TouchableOpacity
                  onPress={handleDone}
                  style={{
                    backgroundColor: '#2196F3',
                    paddingVertical: 14,
                    paddingHorizontal: 48,
                    borderRadius: 8,
                    width: '100%',
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
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

