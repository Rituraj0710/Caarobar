import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Pressable } from 'react-native';
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
  AddCustomer: undefined;
  AddTask: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

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

export default function AddTaskScreen({ navigation }: Props) {
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
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Green Header Bar */}
      <View style={{
        backgroundColor: '#4CAF50',
        paddingTop: 44,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 60
      }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Text style={{ fontSize: 20, color: '#FFFFFF' }}>←</Text>
        </TouchableOpacity>

        {/* Title */}
        <View style={{ 
          position: 'absolute', 
          left: 0, 
          right: 0, 
          top: 0,
          bottom: 0,
          alignItems: 'center', 
          justifyContent: 'center',
          paddingTop: 44,
          paddingBottom: 16
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#FFFFFF',
            fontFamily: 'Poppins-Bold'
          }}>
            Add Task
          </Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Firm Name */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Firm Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter firm name"
            placeholderTextColor="#9E9E9E"
            value={firmName}
            onChangeText={setFirmName}
          />
        </View>

        {/* Customer Name */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Customer Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter customer name"
            placeholderTextColor="#9E9E9E"
            value={customerName}
            onChangeText={setCustomerName}
          />
        </View>

        {/* Contact */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Contact
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter contact number"
            placeholderTextColor="#9E9E9E"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />
        </View>

        {/* Location */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Location
          </Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 14,
                paddingRight: 40,
                fontSize: 14,
                color: '#000000',
                fontFamily: 'Poppins'
              }}
              placeholder="Enter location"
              placeholderTextColor="#9E9E9E"
              value={location}
              onChangeText={setLocation}
            />
            <View style={{
              position: 'absolute',
              right: 12,
              top: 14,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ fontSize: 16, color: '#9E9E9E' }}>📍</Text>
            </View>
          </View>
        </View>

        {/* Task Type */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Task Type
          </Text>
          <TouchableOpacity
            onPress={() => setShowTaskTypeModal(true)}
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
              {taskType}
            </Text>
            <Text style={{ fontSize: 12, color: '#000000' }}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Select Date */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Select Date
          </Text>
          <TouchableOpacity
            onPress={() => setShowDateModal(true)}
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
              {selectedDate}
            </Text>
            <Image 
              source={require('../../assets/calender.png')} 
              style={{ width: 18, height: 18, resizeMode: 'contain' }} 
            />
          </TouchableOpacity>
        </View>

        {/* Select Time */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Select Time
          </Text>
          <TouchableOpacity
            onPress={() => setShowTimeModal(true)}
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
              {selectedTime}
            </Text>
            <Text style={{ fontSize: 16, color: '#000000' }}>🕐</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Description
          </Text>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 14,
              minHeight: 100,
              textAlignVertical: 'top',
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}
            placeholder="Enter description"
            placeholderTextColor="#9E9E9E"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Assigned To */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 14,
            color: '#4285F4',
            fontFamily: 'Poppins-SemiBold',
            fontWeight: '600',
            marginBottom: 8
          }}>
            Assigned To
          </Text>
          <TouchableOpacity
            onPress={() => setShowAssignedModal(true)}
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
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12 }} 
              />
              <Text style={{
                fontSize: 14,
                color: '#000000',
                fontFamily: 'Poppins'
              }}>
                {assignedTo}
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: '#000000' }}>▼</Text>
          </TouchableOpacity>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FAFAFA'
              }}
              onPress={() => {
                // TODO: Handle image selection
              }}
            >
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100, borderRadius: 8 }} />
              ) : (
                <>
                  <Text style={{ fontSize: 32, color: '#9E9E9E' }}>☁</Text>
                  <Text style={{ fontSize: 20, color: '#9E9E9E', marginTop: 4 }}>↑</Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FAFAFA'
              }}
              onPress={() => {
                // TODO: Handle adding more images
              }}
            >
              <Text style={{ fontSize: 24, color: '#9E9E9E' }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Green Save Button - Fixed at Bottom */}
      <View style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        padding: 16,
        paddingBottom: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#4CAF50',
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
            navigation.goBack();
          }}
        >
          <Text style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }}>
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
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16, fontFamily: 'Poppins-Bold' }}>Select Task Type</Text>
            {taskTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setTaskType(type);
                  setShowTaskTypeModal(false);
                }}
                style={{ paddingVertical: 12, borderBottomWidth: index < taskTypes.length - 1 ? 1 : 0, borderBottomColor: '#E0E0E0' }}
              >
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>{type}</Text>
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
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 20, fontFamily: 'Poppins-Bold' }}>Select Date</Text>
            
            {/* Month Navigation */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <TouchableOpacity onPress={() => navigateMonth('prev')} style={{ padding: 8 }}>
                <Text style={{ fontSize: 20, color: '#000000' }}>←</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                {monthNames[currentMonth - 1]} {currentYear}
              </Text>
              <TouchableOpacity onPress={() => navigateMonth('next')} style={{ padding: 8 }}>
                <Text style={{ fontSize: 20, color: '#000000' }}>→</Text>
              </TouchableOpacity>
            </View>

            {/* Weekday Headers */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
              {weekDays.map((day, index) => (
                <Text key={index} style={{ fontSize: 12, color: '#9E9E9E', fontFamily: 'Poppins-Medium', width: 30, textAlign: 'center' }}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            {calendarGrid.map((row, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 6 }}>
                {row.map((day, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    onPress={() => day && handleDateSelect(day)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: day === selectedDateDay ? '#4285F4' : 'transparent',
                    }}
                    disabled={!day}
                  >
                    <Text style={{
                      fontSize: 14,
                      color: day === selectedDateDay ? '#FFFFFF' : (day ? '#000000' : '#E0E0E0'),
                      fontFamily: 'Poppins'
                    }}>
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
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '50%' }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16, fontFamily: 'Poppins-Bold' }}>Select Time</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {timeOptions.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedTime(time);
                    setShowTimeModal(false);
                  }}
                  style={{ paddingVertical: 12, borderBottomWidth: index < timeOptions.length - 1 ? 1 : 0, borderBottomColor: '#E0E0E0' }}
                >
                  <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>{time}</Text>
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
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16, fontFamily: 'Poppins-Bold' }}>Select User</Text>
            {assignedUsers.map((user, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setAssignedTo(user.name);
                  setShowAssignedModal(false);
                }}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: index < assignedUsers.length - 1 ? 1 : 0, borderBottomColor: '#E0E0E0' }}
              >
                <Image source={user.photo} style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12 }} />
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>{user.name}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

