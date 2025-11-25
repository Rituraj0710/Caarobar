import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Modal, TouchableWithoutFeedback, Pressable } from 'react-native';
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
  PaymentRequestDetail: { month: string; monthNumber: string; year: string };
  ApplyForPayment: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ApplyForPayment'>;

export default function ApplyForPaymentScreen({ navigation }: Props) {
  const [paymentType, setPaymentType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [showPaymentTypeModal, setShowPaymentTypeModal] = useState(false);
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const paymentTypes = ['Urjent Work', 'Medical', 'Death', 'Personal Work', 'Cort Work', 'Police Work', 'Travel'];
  const amountOptions = ['100', '500', '1000', '2000', '4000', '10000'];

  const handleDateSelect = (day: number) => {
    setSelectedDay(day);
    const monthStr = currentMonth.toString().padStart(2, '0');
    const yearStr = currentYear.toString().slice(-2);
    const dateStr = `${day.toString().padStart(2, '0')}/${monthStr}/${yearStr}`;
    setSelectedDate(dateStr);
    setShowDatePicker(false);
  };

  // Generate calendar grid for the current month
  const generateCalendarGrid = () => {
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Monday = 0
    
    const grid: (number | null)[][] = [];
    let currentRow: (number | null)[] = [];
    
    // Fill empty cells at the start
    for (let i = 0; i < adjustedFirstDay; i++) {
      currentRow.push(null);
    }
    
    // Fill days
    for (let day = 1; day <= daysInMonth; day++) {
      currentRow.push(day);
      if (currentRow.length === 7) {
        grid.push(currentRow);
        currentRow = [];
      }
    }
    
    // Fill remaining cells
    while (currentRow.length < 7 && currentRow.length > 0) {
      currentRow.push(null);
    }
    if (currentRow.length > 0) {
      grid.push(currentRow);
    }
    
    return grid;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const calendarGrid = generateCalendarGrid();

  const handleApply = () => {
    // Check if all required fields are filled
    if (paymentType && selectedDate && amount && reason) {
      // Show success modal
      setShowSuccessModal(true);
    } else {
      // TODO: Show error message for missing fields
      // For now, just show success if at least payment type and amount are filled
      if (paymentType && amount) {
        setShowSuccessModal(true);
      }
    }
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  const insets = useSafeArea();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Blue Header Bar */}
      <View style={{
        backgroundColor: '#2196F3',
        paddingTop: spacing(12),
        paddingBottom: spacing(16),
        paddingHorizontal: spacing(16),
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: spacing(8), marginRight: spacing(16) }}>
          <Text style={{ fontSize: fontSize(20), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>
        <Text style={{
          fontSize: fontSize(18),
          fontWeight: '700',
          color: '#FFFFFF',
          fontFamily: 'Poppins-Bold',
          flex: 1
        }} allowFontScaling={false}>
          Apply for Payment
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing(16), paddingBottom: spacing(100) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Payment Type Field */}
        <View style={{ marginBottom: spacing(20), zIndex: showPaymentTypeModal ? 1000 : 1 }}>
          <Text style={{
            fontSize: fontSize(14),
            fontWeight: '600',
            color: '#2196F3',
            fontFamily: 'Poppins-SemiBold',
            marginBottom: 8
          }}>
            Payment Type
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowPaymentTypeModal(!showPaymentTypeModal);
              setShowAmountModal(false);
            }}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingVertical: 14,
              paddingHorizontal: spacing(16),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: fontSize(14),
              color: paymentType ? '#000000' : '#9E9E9E',
              fontFamily: 'Poppins'
            }}>
              {paymentType || 'Select'}
            </Text>
            <Text style={{ fontSize: fontSize(16), color: '#000000', transform: [{ rotate: showPaymentTypeModal ? '180deg' : '0deg' }] }}>▼</Text>
          </TouchableOpacity>
          
          {/* Inline Dropdown Options */}
          {showPaymentTypeModal && (
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: spacing(8),
                marginTop: 4,
                maxHeight: 300,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5
              }}>
                {paymentTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setPaymentType(type);
                      setShowPaymentTypeModal(false);
                    }}
                    style={{
                      paddingVertical: 14,
                      paddingHorizontal: spacing(16),
                      borderBottomWidth: index < paymentTypes.length - 1 ? 1 : 0,
                      borderBottomColor: '#E0E0E0'
                    }}
                  >
                    <Text style={{
                      fontSize: fontSize(14),
                      color: '#000000',
                      fontFamily: 'Poppins'
                    }}>
                      {index + 1}. {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          )}
        </View>

        {/* Select Date Field */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            fontWeight: '600',
            color: '#2196F3',
            fontFamily: 'Poppins-SemiBold',
            marginBottom: 8
          }}>
            Select Date
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingVertical: 14,
              paddingHorizontal: spacing(16),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: fontSize(14),
              color: selectedDate ? '#000000' : '#9E9E9E',
              fontFamily: 'Poppins'
            }}>
              {selectedDate || 'Enter Date'}
            </Text>
            <Image
              source={require('../../assets/calender.png')}
              style={{ width: 18, height: 18, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>

        {/* Amount Field */}
        <View style={{ marginBottom: spacing(20), zIndex: showAmountModal ? 1000 : 1 }}>
          <Text style={{
            fontSize: fontSize(14),
            fontWeight: '600',
            color: '#2196F3',
            fontFamily: 'Poppins-SemiBold',
            marginBottom: 8
          }}>
            Amount
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowAmountModal(!showAmountModal);
              setShowPaymentTypeModal(false);
            }}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingVertical: 14,
              paddingHorizontal: spacing(16),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: fontSize(14),
              color: amount ? '#000000' : '#9E9E9E',
              fontFamily: 'Poppins'
            }}>
              {amount || 'Select'}
            </Text>
            <Text style={{ fontSize: fontSize(16), color: '#000000', transform: [{ rotate: showAmountModal ? '180deg' : '0deg' }] }}>▼</Text>
          </TouchableOpacity>
          
          {/* Inline Dropdown Options */}
          {showAmountModal && (
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: spacing(8),
                marginTop: 4,
                maxHeight: 300,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5
              }}>
                {amountOptions.map((amt, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setAmount(amt);
                      setShowAmountModal(false);
                    }}
                    style={{
                      paddingVertical: 14,
                      paddingHorizontal: spacing(16),
                      borderBottomWidth: index < amountOptions.length - 1 ? 1 : 0,
                      borderBottomColor: '#E0E0E0'
                    }}
                  >
                    <Text style={{
                      fontSize: fontSize(14),
                      color: '#000000',
                      fontFamily: 'Poppins'
                    }}>
                      • {amt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          )}
        </View>

        {/* Reason for Payment Text Area */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            fontWeight: '600',
            color: '#2196F3',
            fontFamily: 'Poppins-SemiBold',
            marginBottom: 8
          }}>
            Reason for Payment
          </Text>
          <TextInput
            value={reason}
            onChangeText={setReason}
            placeholder="Write an excuse"
            placeholderTextColor="#9E9E9E"
            multiline
            numberOfLines={6}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: spacing(8),
              paddingVertical: 14,
              paddingHorizontal: spacing(16),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
              textAlignVertical: 'top',
              minHeight: 120
            }}
          />
        </View>

        {/* Add Image Section */}
        <View style={{ marginBottom: 40 }}>
          <Text style={{
            fontSize: fontSize(14),
            fontWeight: '600',
            color: '#2196F3',
            fontFamily: 'Poppins-SemiBold',
            marginBottom: 8
          }}>
            Add Image
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: spacing(8),
                width: 120,
                height: 120,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontSize: 32, color: '#000000', marginBottom: 8 }}>☁</Text>
              <Text style={{
                fontSize: fontSize(12),
                color: '#2196F3',
                fontFamily: 'Poppins-SemiBold'
              }}>
                Add Image
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                borderWidth: 2,
                borderColor: '#000000',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ fontSize: 24, color: '#000000' }}>+</Text>
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
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5
          }}
        >
          <Text style={{
            fontSize: fontSize(16),
            fontWeight: '700',
            color: '#FFFFFF',
            fontFamily: 'Poppins-Bold'
          }}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>


      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end'
        }}>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 20,
            paddingBottom: 24,
            paddingHorizontal: 20,
            height: '67%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5
          }}>
            {/* Calendar Header with Navigation */}
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: spacing(20)
            }}>
              <TouchableOpacity 
                onPress={() => {
                  if (currentMonth === 1) {
                    setCurrentMonth(12);
                    setCurrentYear(currentYear - 1);
                  } else {
                    setCurrentMonth(currentMonth - 1);
                  }
                }}
                style={{ padding: 8, marginLeft: -8 }}
              >
                <Text style={{ fontSize: fontSize(18), color: '#000000', fontWeight: '600' }}>&lt;</Text>
              </TouchableOpacity>
              
              <Text style={{
                fontSize: fontSize(16),
                fontWeight: '700',
                color: '#000000',
                fontFamily: 'Poppins-Bold'
              }}>
                {monthNames[currentMonth - 1]} {currentYear}
              </Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <TouchableOpacity 
                  onPress={() => {
                    if (currentMonth === 12) {
                      setCurrentMonth(1);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                  style={{ padding: 8, marginRight: -8 }}
                >
                  <Text style={{ fontSize: fontSize(18), color: '#000000', fontWeight: '600' }}>&gt;</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setShowDatePicker(false)} style={{ padding: 4 }}>
                  <Image
                    source={require('../../assets/calender.png')}
                    style={{ width: 16, height: 16, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Week day headers */}
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              marginBottom: 16,
              paddingHorizontal: 0
            }}>
              {weekDays.map((day, index) => (
                <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ 
                    fontSize: fontSize(12),
                    color: '#9E9E9E', 
                    fontFamily: 'Poppins', 
                    fontWeight: '500'
                  }}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar grid */}
            <View style={{ flex: 1 }}>
              {calendarGrid.map((row, rowIdx) => (
                <View key={rowIdx} style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  marginBottom: 12,
                  alignItems: 'center',
                  paddingHorizontal: 0
                }}>
                  {row.map((day, colIdx) => {
                    if (day === null) {
                      return <View key={`${rowIdx}-${colIdx}`} style={{ flex: 1, height: 42, alignItems: 'center', justifyContent: 'center' }} />;
                    }
                    const isSelected = selectedDay === day;
                    return (
                      <TouchableOpacity
                        key={`${rowIdx}-${colIdx}`}
                        onPress={() => handleDateSelect(day)}
                        style={{
                          flex: 1,
                          height: 42,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <View style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          backgroundColor: isSelected ? '#00BCD4' : 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text style={{
                            fontSize: fontSize(14),
                            color: isSelected ? '#FFFFFF' : '#000000',
                            fontFamily: 'Poppins',
                            fontWeight: isSelected ? '600' : '400'
                          }}>
                            {day}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleDone}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end'
        }}>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 32,
            paddingBottom: 40,
            alignItems: 'center'
          }}>
            {/* Success Icon */}
            <View style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 4,
              borderColor: '#4FC3F7',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24
            }}>
              {/* Inner dark blue circle */}
              <View style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: '#1976D2',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  fontSize: 36,
                  color: '#FFFFFF',
                  fontWeight: '700'
                }}>
                  ✓
                </Text>
              </View>
            </View>

            {/* Success Message */}
            <Text style={{
              fontSize: 22,
              fontWeight: '700',
              color: '#000000',
              fontFamily: 'Poppins-Bold',
              marginBottom: 12,
              textAlign: 'center'
            }}>
              Payment Applied Successfully
            </Text>

            {/* Confirmation Text */}
            <Text style={{
              fontSize: fontSize(14),
              color: '#9E9E9E',
              fontFamily: 'Poppins',
              marginBottom: 32,
              textAlign: 'center'
            }}>
              Your payment has been applied successfully.
            </Text>

            {/* Done Button */}
            <TouchableOpacity
              onPress={handleDone}
              style={{
                backgroundColor: '#2196F3',
                borderRadius: 12,
                paddingVertical: 16,
                paddingHorizontal: 48,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5
              }}
            >
              <Text style={{
                fontSize: fontSize(16),
                fontWeight: '700',
                color: '#FFFFFF',
                fontFamily: 'Poppins-Bold'
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

