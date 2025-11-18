import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Pressable, Alert } from 'react-native';
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
  LeaveRequestDetail: undefined;
  ApplyForLeave: undefined;
  PaymentReport: undefined;
  Calendar: undefined;
  Contacts: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ApplyForLeave'>;

const leaveTypes = [
  'Urjent Work',
  'Medical',
  'Death',
  'Personal Work',
  'Cort Work',
  'Police Work',
  'Travel',
];

const dayOptions = [
  'Half Day',
  '1 Day',
  '2 Day',
  '3 Day',
  '1 Weak',
  '1 Month',
];

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

// Generate calendar grid for January 2025
const generateCalendarGrid = (year: number, month: number) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
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

export default function ApplyForLeaveScreen({ navigation }: Props) {
  const [leaveType, setLeaveType] = useState('');
  const [isLeaveTypeOpen, setIsLeaveTypeOpen] = useState(false);
  const [startDate, setStartDate] = useState('01 January 2025');
  const [endDate, setEndDate] = useState('01 January 2025');
  const [day, setDay] = useState('');
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Calendar state
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState<'start' | 'end'>('start');
  const [currentMonth, setCurrentMonth] = useState(1); // January
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState<number | null>(1);
  
  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const calendarGrid = generateCalendarGrid(currentYear, currentMonth);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const formatDate = (day: number, month: number, year: number) => {
    const dayStr = day.toString().padStart(2, '0');
    return `${dayStr} ${monthNames[month - 1]} ${year}`;
  };
  
  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
    const formattedDate = formatDate(day, currentMonth, currentYear);
    if (calendarType === 'start') {
      setStartDate(formattedDate);
    } else {
      setEndDate(formattedDate);
    }
    setShowCalendar(false);
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };
  
  const openCalendar = (type: 'start' | 'end') => {
    setCalendarType(type);
    setShowCalendar(true);
    // Reset to current date if needed
    setSelectedDate(type === 'start' ? 1 : null);
  };
  
  const pickImage = async () => {
    // TODO: Install expo-image-picker: npx expo install expo-image-picker
    // For now, using a placeholder implementation
    Alert.alert(
      'Image Upload',
      'Image picker functionality requires expo-image-picker. Would you like to proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: () => {
            // Placeholder: In production, implement actual image picker
            // setSelectedImage('path/to/selected/image.jpg');
            Alert.alert('Info', 'Image picker will be implemented with expo-image-picker');
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Blue Header Bar */}
      <View style={{
        backgroundColor: '#4285F4',
        paddingTop: 44,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Back Arrow */}
        <BackButton color="#FFFFFF" />

        {/* Title */}
        <Text style={{
          fontSize: 18,
          fontWeight: '700',
          color: '#FFFFFF',
          fontFamily: 'Poppins-Bold',
          position: 'absolute',
          left: 0,
          right: 0,
          textAlign: 'center'
        }}>
          Apply for Leave
        </Text>

        {/* Menu Icon */}
        <TouchableOpacity style={{ padding: 8 }}>
          <Text style={{ fontSize: 18, color: '#FFFFFF' }}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Leave Type */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Leave Type
          </Text>
          <TouchableOpacity 
            onPress={() => setIsLeaveTypeOpen(!isLeaveTypeOpen)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: 14,
              color: leaveType ? '#000000' : '#9E9E9E',
              fontFamily: 'Poppins'
            }}>
              {leaveType || 'Select'}
            </Text>
            <Text style={{ fontSize: 12, color: '#000000' }}>
              {isLeaveTypeOpen ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {isLeaveTypeOpen && (
            <View style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              marginTop: 4,
              maxHeight: 300,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}>
              {leaveTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setLeaveType(type);
                    setIsLeaveTypeOpen(false);
                  }}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: index < leaveTypes.length - 1 ? 1 : 0,
                    borderBottomColor: '#E0E0E0'
                  }}
                >
                  <Text style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'Poppins'
                  }}>
                    {index + 1}. {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Start Date */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Start Date
          </Text>
          <TouchableOpacity 
            onPress={() => openCalendar('start')}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              {startDate}
            </Text>
            <TouchableOpacity onPress={() => openCalendar('start')}>
              <Image 
                source={require('../../assets/calender.png')} 
                style={{ width: 20, height: 20, resizeMode: 'contain' }} 
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* End Date */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            End Date
          </Text>
          <TouchableOpacity 
            onPress={() => openCalendar('end')}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              {endDate}
            </Text>
            <TouchableOpacity onPress={() => openCalendar('end')}>
              <Image 
                source={require('../../assets/calender.png')} 
                style={{ width: 20, height: 20, resizeMode: 'contain' }} 
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Day */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Day
          </Text>
          <TouchableOpacity 
            onPress={() => setIsDayOpen(!isDayOpen)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: 14,
              color: day ? '#000000' : '#9E9E9E',
              fontFamily: 'Poppins'
            }}>
              {day || 'Select'}
            </Text>
            <Text style={{ fontSize: 12, color: '#000000' }}>
              {isDayOpen ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {/* Day Dropdown Menu */}
          {isDayOpen && (
            <View style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              marginTop: 4,
              maxHeight: 300,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}>
              {dayOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setDay(option);
                    setIsDayOpen(false);
                  }}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: index < dayOptions.length - 1 ? 1 : 0,
                    borderBottomColor: '#E0E0E0'
                  }}
                >
                  <Text style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'Poppins'
                  }}>
                    • {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Reason for Leave */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Reason for Leave
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              minHeight: 120,
              textAlignVertical: 'top',
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Write an excuse"
            placeholderTextColor="#9E9E9E"
            multiline
            numberOfLines={5}
            value={reason}
            onChangeText={setReason}
          />
        </View>

        {/* Add Image */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Add Image
          </Text>
          <TouchableOpacity 
            onPress={pickImage}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              width: 120,
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {selectedImage ? (
              <Image 
                source={{ uri: selectedImage }} 
                style={{ width: 120, height: 120, resizeMode: 'cover' }} 
              />
            ) : (
              <>
                <Text style={{ fontSize: 32, color: '#000000' }}>☁</Text>
                <Text style={{ fontSize: 20, color: '#000000', marginTop: 4 }}>↑</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Apply Button - Fixed at Bottom */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#4285F4',
            borderRadius: 8,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3
          }}
          onPress={() => {
            // TODO: Handle form submission
            // Show success modal
            setShowSuccessModal(true);
          }}
        >
          <Text style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Picker Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: 20
          }}
          onPress={() => setShowCalendar(false)}
        >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 20,
              width: '100%',
              maxWidth: 400,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Calendar Navigation */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20
            }}>
              <TouchableOpacity onPress={() => navigateMonth('prev')}>
                <Text style={{ fontSize: 18, color: '#000000' }}>←</Text>
              </TouchableOpacity>
              <Text style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#000000',
                fontFamily: 'Poppins-Bold'
              }}>
                {monthNames[currentMonth - 1]} {currentYear}
              </Text>
              <TouchableOpacity onPress={() => navigateMonth('next')}>
                <Text style={{ fontSize: 18, color: '#000000' }}>→</Text>
              </TouchableOpacity>
            </View>

            {/* Days of Week Header */}
            <View style={{
              flexDirection: 'row',
              marginBottom: 12
            }}>
              {weekDays.map((day, index) => (
                <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 12,
                    color: '#666666',
                    fontFamily: 'Poppins',
                    fontWeight: '500'
                  }}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            <View>
              {calendarGrid.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row', marginBottom: 8 }}>
                  {row.map((day, colIndex) => (
                    <TouchableOpacity
                      key={colIndex}
                      onPress={() => day !== null && handleDateSelect(day)}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 40
                      }}
                      disabled={day === null}
                    >
                      {day !== null && (
                        <View style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          backgroundColor: selectedDate === day ? '#20B2AA' : 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text style={{
                            fontSize: 14,
                            color: selectedDate === day ? '#FFFFFF' : '#000000',
                            fontFamily: 'Poppins',
                            fontWeight: selectedDate === day ? '700' : '400'
                          }}>
                            {day}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Success Modal - Slides up from bottom */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'flex-end'
          }}
          onPress={() => setShowSuccessModal(false)}
        >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              paddingBottom: 32,
              alignItems: 'center'
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Success Icon with Halo */}
            <View style={{ marginBottom: 20, position: 'relative' }}>
              {/* Light blue halo */}
              <View style={{
                position: 'absolute',
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: 'rgba(66, 133, 244, 0.15)',
                top: -20,
                left: -20
              }} />
              {/* Blue circle */}
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#4285F4',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                <Text style={{ fontSize: 40, color: '#FFFFFF' }}>✓</Text>
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
              Leave Applied Successfully.
            </Text>

            {/* Subtitle */}
            <Text style={{
              fontSize: 14,
              color: '#666666',
              fontFamily: 'Poppins',
              marginBottom: 32,
              textAlign: 'center',
              paddingHorizontal: 20
            }}>
              Your Leave has been applied successfully.
            </Text>

            {/* Done Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#4285F4',
                borderRadius: 8,
                paddingVertical: 16,
                paddingHorizontal: 48,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3
              }}
              onPress={() => {
                setShowSuccessModal(false);
                navigation.goBack();
              }}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                fontWeight: '700'
              }}>
                Done
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

