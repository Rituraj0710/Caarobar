import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Pressable, StatusBar, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, useSafeArea } from '../utils/responsive';
import BackButton from '../components/BackButton';
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
  AddCustomer: undefined;
  AddTask: undefined;
  AddMaintenance: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddMaintenance'>;

const taskTypes = [
  'Board Repairing',
  'Installation',
  'Maintenance',
  'Repair',
  'Cleaning',
  'Inspection'
];

const assignedUsers = [
  { name: 'Lucky Jangid', photo: require('../../assets/Profile picture.png') },
  { name: 'Kamal Jangid', photo: require('../../assets/Profile picture.png') },
  { name: 'Nikhil Jangid', photo: require('../../assets/Profile picture.png') },
];

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateCalendarGrid = (year: number, month: number) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  
  const grid: (number | null)[][] = [];
  let currentRow: (number | null)[] = [];
  
  for (let i = 0; i < adjustedFirstDay; i++) {
    currentRow.push(null);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    currentRow.push(day);
    if (currentRow.length === 7) {
      grid.push(currentRow);
      currentRow = [];
    }
  }
  
  while (currentRow.length < 7 && currentRow.length > 0) {
    currentRow.push(null);
  }
  if (currentRow.length > 0) {
    grid.push(currentRow);
  }
  
  return grid;
};

export default function AddMaintenanceScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [firmName, setFirmName] = useState('Creative Designers');
  const [customerName, setCustomerName] = useState('Kamal Jangid');
  const [contact, setContact] = useState('+919460638554');
  const [location, setLocation] = useState('Radhakishanpura, Sikar');
  const [taskType, setTaskType] = useState('Board Repairing');
  const [selectedDate, setSelectedDate] = useState('05 May 2025');
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [description, setDescription] = useState('Board Me Light Khrab Hogyi hai');
  const [assignedTo, setAssignedTo] = useState('Lucky Jangid');
  
  const [showTaskTypeModal, setShowTaskTypeModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showAssignedModal, setShowAssignedModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Date picker state
  const [currentMonth, setCurrentMonth] = useState(5); // May
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDateDay, setSelectedDateDay] = useState<number | null>(5);
  
  const calendarGrid = generateCalendarGrid(currentYear, currentMonth);
  
  const formatDate = (day: number, month: number, year: number) => {
    const dayStr = day.toString().padStart(2, '0');
    return `${dayStr} ${monthNames[month - 1]} ${year}`;
  };
  
  const handleDateSelect = (day: number) => {
    setSelectedDateDay(day);
    const formattedDate = formatDate(day, currentMonth, currentYear);
    setSelectedDate(formattedDate);
    setShowDateModal(false);
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
  
  // Time options
  const timeOptions = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
  ];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#E53935" />
      {/* Red Header Bar */}
      <View style={{
        backgroundColor: '#E53935',
        paddingTop: spacing(12),
        paddingBottom: spacing(16),
        paddingHorizontal: spacing(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Back Arrow */}
        <BackButton color="#FFFFFF" />

        {/* Title */}
        <View style={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          top: 0,
          bottom: 0,
          alignItems: 'center', 
          justifyContent: 'center',
          paddingTop: spacing(12),
          paddingBottom: spacing(16)
        }}>
          <Text style={{
            fontSize: fontSize(18),
            fontWeight: '700',
            color: '#FFFFFF',
            fontFamily: 'Poppins-Bold'
          }} allowFontScaling={false}>
            Add Maintenance
          </Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: spacing(16), paddingBottom: spacing(120) + insets.bottom }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      >
        {/* Firm Name */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Firm Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter firm name"
            placeholderTextColor="#9E9E9E"
            value={firmName}
            onChangeText={setFirmName}
            allowFontScaling={false}
          />
        </View>

        {/* Customer Name */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Customer Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter customer name"
            placeholderTextColor="#9E9E9E"
            value={customerName}
            onChangeText={setCustomerName}
            allowFontScaling={false}
          />
        </View>

        {/* Contact */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Contact
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter contact number"
            placeholderTextColor="#9E9E9E"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
            allowFontScaling={false}
          />
        </View>

        {/* Location */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Location
          </Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: hp(8),
                paddingHorizontal: spacing(16),
                paddingVertical: spacing(14),
                paddingRight: spacing(40),
                fontSize: fontSize(14),
                color: '#000000',
                fontFamily: 'Poppins'
              }}
              placeholder="Enter location"
              placeholderTextColor="#9E9E9E"
              value={location}
              onChangeText={setLocation}
              allowFontScaling={false}
            />
            <View style={{
              position: 'absolute',
              right: spacing(12),
              top: spacing(14),
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: fontSize(16), color: '#9E9E9E' }} allowFontScaling={false}>📍</Text>
            </View>
          </View>
        </View>

        {/* Task Type */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Task Type
          </Text>
          <TouchableOpacity
            onPress={() => setShowTaskTypeModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
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
              {taskType}
            </Text>
            <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Select Date */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Select Date
          </Text>
          <TouchableOpacity
            onPress={() => setShowDateModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
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
              {selectedDate}
            </Text>
            <Image 
              source={require('../../assets/calender.png')} 
              style={{ width: wp(18), height: hp(18), resizeMode: 'contain' }} 
            />
          </TouchableOpacity>
        </View>

        {/* Select Time */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Select Time
          </Text>
          <TouchableOpacity
            onPress={() => setShowTimeModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
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
              {selectedTime}
            </Text>
            <Text style={{ fontSize: fontSize(16), color: '#000000' }} allowFontScaling={false}>🕐</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Description
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
              minHeight: hp(100),
              textAlignVertical: 'top',
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter description"
            placeholderTextColor="#9E9E9E"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            allowFontScaling={false}
          />
        </View>

        {/* Assigned To */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Assigned To
          </Text>
          <TouchableOpacity
            onPress={() => setShowAssignedModal(true)}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: hp(8),
              paddingHorizontal: spacing(16),
              paddingVertical: spacing(14),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: wp(32), height: hp(32), borderRadius: hp(16), marginRight: spacing(12), resizeMode: 'cover' }} 
              />
              <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              {assignedTo}
              </Text>
            </View>
            <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Add Image */}
        <View style={{ marginBottom: spacing(20) }}>
          <Text style={{
            fontSize: fontSize(14),
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Add Image
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                width: wp(100),
                height: hp(100),
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: hp(8),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FAFAFA',
                marginRight: spacing(12)
              }}
              onPress={() => {
                // TODO: Handle image selection
              }}
            >
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={{ width: wp(100), height: hp(100), borderRadius: hp(8), resizeMode: 'cover' }} />
              ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: fontSize(32), color: '#000000' }} allowFontScaling={false}>☁</Text>
                  <Text style={{ fontSize: fontSize(20), color: '#000000', marginTop: spacing(4) }} allowFontScaling={false}>↑</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: wp(48),
                height: hp(48),
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: hp(24),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF'
              }}
              onPress={() => {
                // TODO: Handle adding more images
              }}
            >
              <Text style={{ fontSize: fontSize(24), color: '#000000', fontWeight: '300' }} allowFontScaling={false}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Red Save Button - Fixed at Bottom */}
      <View style={{
        padding: spacing(16),
        paddingTop: spacing(12),
        paddingBottom: spacing(16) + insets.bottom,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#E53935',
            borderRadius: hp(25),
            paddingVertical: spacing(16),
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: spacing(2) },
            shadowOpacity: 0.2,
            shadowRadius: spacing(4),
            elevation: 3
          }}
          onPress={() => {
            // TODO: Handle form submission
            navigation.goBack();
          }}
        >
          <Text style={{
            color: '#FFFFFF',
              fontSize: fontSize(16),
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }} allowFontScaling={false}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task Type Modal */}
      <Modal
        visible={showTaskTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTaskTypeModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowTaskTypeModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: hp(24), borderTopRightRadius: hp(24), padding: spacing(20), paddingBottom: spacing(20) + insets.bottom }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(16), fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>Select Task Type</Text>
            {taskTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setTaskType(type);
                  setShowTaskTypeModal(false);
                }}
                style={{ paddingVertical: spacing(12), borderBottomWidth: index < taskTypes.length - 1 ? 1 : 0, borderBottomColor: '#E0E0E0' }}
              >
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{type}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Date Picker Modal */}
      <Modal
        visible={showDateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDateModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowDateModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: hp(24), borderTopRightRadius: hp(24), padding: spacing(20), paddingBottom: spacing(20) + insets.bottom }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>Select Date</Text>
            
            {/* Month Navigation */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing(20) }}>
              <TouchableOpacity onPress={() => navigateMonth('prev')} style={{ padding: spacing(8) }}>
                <Text style={{ fontSize: fontSize(20), color: '#000000' }} allowFontScaling={false}>←</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>
                {monthNames[currentMonth - 1]} {currentYear}
              </Text>
              <TouchableOpacity onPress={() => navigateMonth('next')} style={{ padding: spacing(8) }}>
                <Text style={{ fontSize: fontSize(20), color: '#000000' }} allowFontScaling={false}>→</Text>
              </TouchableOpacity>
            </View>

            {/* Weekday Headers */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing(10) }}>
              {weekDays.map((day, index) => (
                <Text key={index} style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins-Medium', width: wp(30), textAlign: 'center' }} allowFontScaling={false}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            {calendarGrid.map((row, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing(6) }}>
                {row.map((day, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    onPress={() => day && handleDateSelect(day)}
                    style={{
                      width: wp(30),
                      height: hp(30),
                      borderRadius: hp(15),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: day === selectedDateDay ? '#4285F4' : 'transparent',
                    }}
                    disabled={!day}
                  >
                    <Text style={{
                      fontSize: fontSize(14),
                      color: day === selectedDateDay ? '#FFFFFF' : (day ? '#000000' : '#E0E0E0'),
                      fontFamily: 'Poppins'
                    }} allowFontScaling={false}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimeModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowTimeModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: hp(24), borderTopRightRadius: hp(24), padding: spacing(20), paddingBottom: spacing(20) + insets.bottom, maxHeight: '50%' }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(16), fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>Select Time</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {timeOptions.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedTime(time);
                    setShowTimeModal(false);
                  }}
                  style={{ paddingVertical: spacing(12), borderBottomWidth: index < timeOptions.length - 1 ? 1 : 0, borderBottomColor: '#E0E0E0' }}
                >
                  <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Assigned To Modal */}
      <Modal
        visible={showAssignedModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAssignedModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowAssignedModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: hp(24), borderTopRightRadius: hp(24), padding: spacing(20), paddingBottom: spacing(20) + insets.bottom }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(16), fontFamily: 'Poppins-Bold' }} allowFontScaling={false}>Select User</Text>
            {assignedUsers.map((user, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setAssignedTo(user.name);
                  setShowAssignedModal(false);
                }}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing(12), borderBottomWidth: index < assignedUsers.length - 1 ? 1 : 0, borderBottomColor: '#E0E0E0' }}
              >
                <Image source={user.photo} style={{ width: wp(32), height: hp(32), borderRadius: hp(16), marginRight: spacing(12), resizeMode: 'cover' }} />
                <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{user.name}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

