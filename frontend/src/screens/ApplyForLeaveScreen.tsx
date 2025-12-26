import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Pressable, Alert, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, useSafeArea } from '../utils/responsive';
import SafeAreaView from '../components/SafeAreaView';
import Button from '../components/ui/Button';

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

  const insets = useSafeArea();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6EFF" />
      
      {/* Header - Blue Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(12),
        paddingBottom: spacing(12),
        backgroundColor: '#2D6EFF'
      }}>
        {/* Left: Back Arrow */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: spacing(4) }}
        >
          <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>

        {/* Left: Title */}
        <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: spacing(12) }}>
          <Text style={{ 
            fontSize: fontSize(18), 
            fontWeight: '500', 
            color: '#FFFFFF', 
            fontFamily: 'Inter' 
          }} allowFontScaling={false}>
            Apply for Leave
          </Text>
        </View>

        {/* Right: Empty space for alignment */}
        <View style={{ width: wp(32) }} />
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing(16), paddingBottom: spacing(100) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Leave Type */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#248CFF',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Leave Type
          </Text>
          <TouchableOpacity 
            onPress={() => setIsLeaveTypeOpen(!isLeaveTypeOpen)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: wp(1),
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              height: hp(48),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: fontSize(14),
              color: leaveType ? '#000000' : '#9E9E9E',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              {leaveType || 'Select'}
            </Text>
            <Text style={{ fontSize: fontSize(12), color: '#666666' }} allowFontScaling={false}>
              {isLeaveTypeOpen ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {isLeaveTypeOpen && (
            <View style={{
              backgroundColor: '#FFFFFF',
              borderWidth: wp(1),
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              marginTop: spacing(4),
              maxHeight: hp(300),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: hp(2) },
              shadowOpacity: 0.1,
              shadowRadius: spacing(4),
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
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    borderBottomWidth: index < leaveTypes.length - 1 ? wp(1) : 0,
                    borderBottomColor: '#E0E0E0'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#000000',
                    fontFamily: 'Poppins'
                  }} allowFontScaling={false}>
                    {index + 1}. {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Start Date */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#248CFF',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Start Date
          </Text>
          <TouchableOpacity 
            onPress={() => openCalendar('start')}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: wp(1),
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              height: hp(48),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              {startDate}
            </Text>
            <Image 
              source={require('../../assets/calender.png')} 
              style={{ width: wp(20), height: hp(20), resizeMode: 'contain' }} 
            />
          </TouchableOpacity>
        </View>

        {/* End Date */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#248CFF',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            End Date
          </Text>
          <TouchableOpacity 
            onPress={() => openCalendar('end')}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: wp(1),
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              height: hp(48),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              {endDate}
            </Text>
            <Image 
              source={require('../../assets/calender.png')} 
              style={{ width: wp(20), height: hp(20), resizeMode: 'contain' }} 
            />
          </TouchableOpacity>
        </View>

        {/* Day */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#248CFF',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Day
          </Text>
          <TouchableOpacity 
            onPress={() => setIsDayOpen(!isDayOpen)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: wp(1),
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              height: hp(48),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{
              fontSize: fontSize(14),
              color: day ? '#000000' : '#9E9E9E',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              {day || 'Select'}
            </Text>
            <Text style={{ fontSize: fontSize(12), color: '#666666' }} allowFontScaling={false}>
              {isDayOpen ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {/* Day Dropdown Menu */}
          {isDayOpen && (
            <View style={{
              backgroundColor: '#FFFFFF',
              borderWidth: wp(1),
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              marginTop: spacing(4),
              maxHeight: hp(300),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: hp(2) },
              shadowOpacity: 0.1,
              shadowRadius: spacing(4),
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
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    borderBottomWidth: index < dayOptions.length - 1 ? wp(1) : 0,
                    borderBottomColor: '#E0E0E0'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#000000',
                    fontFamily: 'Poppins'
                  }} allowFontScaling={false}>
                    • {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Reason for Leave */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#248CFF',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Reason for Leave
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: wp(1),
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              paddingTop: spacing(14),
              paddingBottom: spacing(14),
              minHeight: hp(120),
              textAlignVertical: 'top',
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Write an excuse"
            placeholderTextColor="#9E9E9E"
            multiline
            numberOfLines={5}
            value={reason}
            onChangeText={setReason}
            allowFontScaling={false}
          />
        </View>

        {/* Add Image */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#248CFF',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Add Image
          </Text>
          <TouchableOpacity 
            onPress={pickImage}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: wp(1),
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              width: wp(120),
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {selectedImage ? (
              <Image 
                source={{ uri: selectedImage }} 
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }} 
              />
            ) : (
              <>
                <Text style={{ fontSize: fontSize(32), color: '#000000' }} allowFontScaling={false}>☁</Text>
                <Text style={{ fontSize: fontSize(20), color: '#000000', marginTop: spacing(4) }} allowFontScaling={false}>↑</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Apply Button - Fixed at Bottom */}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#FFFFFF' }}>
        <View style={{
          paddingHorizontal: spacing(16),
          paddingTop: spacing(16),
          paddingBottom: spacing(16) + insets.bottom,
          backgroundColor: '#FFFFFF',
          borderTopWidth: wp(1),
          borderTopColor: '#E0E0E0'
        }}>
          <Button
            title="Apply"
            onPress={() => {
              // TODO: Handle form submission
              // Show success modal
              setShowSuccessModal(true);
            }}
            variant="primary"
          />
        </View>
      </SafeAreaView>

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
              padding: spacing(20)
            }}
            onPress={() => setShowCalendar(false)}
          >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: hp(12),
              padding: spacing(20),
              width: '100%',
              maxWidth: wp(400),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: hp(4) },
              shadowOpacity: 0.3,
              shadowRadius: hp(8),
              elevation: 5
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Calendar Navigation */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: spacing(20)
            }}>
              <TouchableOpacity onPress={() => navigateMonth('prev')}>
                <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>←</Text>
              </TouchableOpacity>
              <Text style={{
                fontSize: fontSize(16),
                fontWeight: '700',
                color: '#000000',
                fontFamily: 'Poppins-Bold'
              }} allowFontScaling={false}>
                {monthNames[currentMonth - 1]} {currentYear}
              </Text>
              <TouchableOpacity onPress={() => navigateMonth('next')}>
                <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>→</Text>
              </TouchableOpacity>
            </View>

            {/* Days of Week Header */}
            <View style={{
              flexDirection: 'row',
              marginBottom: spacing(12)
            }}>
              {weekDays.map((day, index) => (
                <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{
                    fontSize: fontSize(12),
                    color: '#666666',
                    fontFamily: 'Poppins',
                    fontWeight: '500'
                  }} allowFontScaling={false}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            <View>
              {calendarGrid.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row', marginBottom: spacing(8) }}>
                  {row.map((day, colIndex) => (
                    <TouchableOpacity
                      key={colIndex}
                      onPress={() => day !== null && handleDateSelect(day)}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: hp(40)
                      }}
                      disabled={day === null}
                    >
                      {day !== null && (
                        <View style={{
                          width: wp(36),
                          height: hp(36),
                          borderRadius: hp(18),
                          backgroundColor: selectedDate === day ? '#20B2AA' : 'transparent',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text style={{
                            fontSize: fontSize(14),
                            color: selectedDate === day ? '#FFFFFF' : '#000000',
                            fontFamily: 'Poppins',
                            fontWeight: selectedDate === day ? '700' : '400'
                          }} allowFontScaling={false}>
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
              borderTopLeftRadius: hp(24),
              borderTopRightRadius: hp(24),
              padding: spacing(24),
              paddingBottom: spacing(32) + insets.bottom,
              alignItems: 'center'
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Success Icon with Halo */}
            <View style={{ marginBottom: spacing(20), position: 'relative' }}>
              {/* Light blue halo */}
              <View style={{
                position: 'absolute',
                width: wp(120),
                height: hp(120),
                borderRadius: hp(60),
                backgroundColor: 'rgba(36, 140, 255, 0.15)',
                top: hp(-20),
                left: wp(-20)
              }} />
              {/* Blue circle */}
              <View style={{
                width: wp(80),
                height: hp(80),
                borderRadius: hp(40),
                backgroundColor: '#248CFF',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                <Text style={{ fontSize: fontSize(40), color: '#FFFFFF' }} allowFontScaling={false}>✓</Text>
              </View>
            </View>

            {/* Success Message */}
            <Text style={{
              fontSize: fontSize(20),
              fontWeight: '700',
              color: '#000000',
              fontFamily: 'Poppins-Bold',
              marginBottom: spacing(8),
              textAlign: 'center'
            }} allowFontScaling={false}>
              Leave Applied Successfully.
            </Text>

            {/* Subtitle */}
            <Text style={{
              fontSize: fontSize(14),
              color: '#666666',
              fontFamily: 'Poppins',
              marginBottom: spacing(32),
              textAlign: 'center',
              paddingHorizontal: spacing(20)
            }} allowFontScaling={false}>
              Your Leave has been applied successfully.
            </Text>

            {/* Done Button */}
            <Button
              title="Done"
              onPress={() => {
                setShowSuccessModal(false);
                navigation.goBack();
              }}
              variant="primary"
              style={{ width: '100%' }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

