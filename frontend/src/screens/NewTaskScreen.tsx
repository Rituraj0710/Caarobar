import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Modal, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackButton from '../components/BackButton';
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
};

type Props = NativeStackScreenProps<RootStackParamList, 'NewTask'>;

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

export default function NewTaskScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [taskNumber] = useState('1');
  const [inDate, setInDate] = useState('05/07/2025');
  const [outDate, setOutDate] = useState('08/07/2025');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showAddDataModal, setShowAddDataModal] = useState(false);
  
  // Calendar state
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState<'in' | 'out'>('in');
  const [currentMonth, setCurrentMonth] = useState(7); // July
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState<number | null>(5);
  
  const calendarGrid = generateCalendarGrid(currentYear, currentMonth);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const formatDate = (day: number, month: number, year: number) => {
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = month.toString().padStart(2, '0');
    return `${dayStr}/${monthStr}/${year}`;
  };
  
  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
    const formattedDate = formatDate(day, currentMonth, currentYear);
    if (calendarType === 'in') {
      setInDate(formattedDate);
    } else {
      setOutDate(formattedDate);
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
  
  const openCalendar = (type: 'in' | 'out') => {
    setCalendarType(type);
    setShowCalendar(true);
    // Set initial selected date based on current date
    if (type === 'in') {
      setSelectedDate(5);
    } else {
      setSelectedDate(8);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      {/* Top Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(12),
        paddingBottom: spacing(12),
        backgroundColor: '#FFFFFF'
      }}>
        {/* Left: Back Arrow and Logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ marginRight: spacing(8) }}>
            <BackButton />
          </View>
          <Image 
            source={require('../../assets/header carobar.png')} 
            style={{ width: wp(96), height: hp(22), resizeMode: 'contain' }} 
          />
        </View>

        {/* Right: Refresh Icon */}
        <TouchableOpacity style={{ padding: spacing(4) }}>
          <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>↻</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: spacing(16), paddingTop: spacing(20), paddingBottom: spacing(100) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* No. Label and Date Fields */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(24) }}>
          <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>
            No. {taskNumber}
          </Text>
          
          {/* In Date */}
          <TouchableOpacity 
            onPress={() => openCalendar('in')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(6) }}
          >
            <Image 
              source={require('../../assets/calender.png')} 
              style={{ width: wp(18), height: hp(18), resizeMode: 'contain' }} 
            />
            <Text style={{ fontSize: fontSize(14), color: '#1976D2', fontFamily: 'Poppins' }} allowFontScaling={false}>
              In {inDate}
            </Text>
          </TouchableOpacity>
          
          {/* Out Date */}
          <TouchableOpacity 
            onPress={() => openCalendar('out')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(6) }}
          >
            <Image 
              source={require('../../assets/calender.png')} 
              style={{ width: wp(18), height: hp(18), resizeMode: 'contain' }} 
            />
            <Text style={{ fontSize: fontSize(14), color: '#E53935', fontFamily: 'Poppins' }} allowFontScaling={false}>
              Out {outDate}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title Input */}
        <View style={{ marginBottom: spacing(24) }}>
          <TextInput
            style={{
              fontSize: fontSize(24),
              color: title ? '#000000' : '#9E9E9E',
              fontFamily: title ? 'Poppins-Bold' : 'Poppins',
              fontWeight: title ? '700' : '400',
              minHeight: hp(40)
            }}
            placeholder="Title"
            placeholderTextColor="#9E9E9E"
            value={title}
            onChangeText={setTitle}
            allowFontScaling={false}
          />
        </View>

        {/* Description Input */}
        <View style={{ marginBottom: spacing(24) }}>
          <TextInput
            style={{
              fontSize: fontSize(14),
              color: description ? '#000000' : '#9E9E9E',
              fontFamily: 'Poppins',
              minHeight: hp(120),
              textAlignVertical: 'top'
            }}
            placeholder="Start typing"
            placeholderTextColor="#9E9E9E"
            multiline
            numberOfLines={8}
            value={description}
            onChangeText={setDescription}
            allowFontScaling={false}
          />
        </View>
      </ScrollView>

      {/* Red Floating Action Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: spacing(20) + insets.bottom,
          right: spacing(16),
          width: wp(56),
          height: hp(56),
          borderRadius: hp(28),
          backgroundColor: '#E53935',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: spacing(4) },
          shadowOpacity: 0.3,
          shadowRadius: spacing(8),
          elevation: 5,
          zIndex: 10
        }}
        onPress={() => {
          setShowAddDataModal(true);
        }}
      >
        <Text style={{ fontSize: fontSize(28), color: '#FFFFFF', lineHeight: fontSize(28) }} allowFontScaling={false}>+</Text>
      </TouchableOpacity>

      {/* Add Data Bottom Sheet Modal */}
      <Modal
        visible={showAddDataModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddDataModal(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'flex-end'
          }}
          onPress={() => setShowAddDataModal(false)}
        >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: hp(24),
              borderTopRightRadius: hp(24),
              padding: spacing(20),
              paddingBottom: spacing(32) + insets.bottom,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: spacing(-2) },
              shadowOpacity: 0.1,
              shadowRadius: spacing(4),
              elevation: 5
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(24) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: fontSize(20), 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold',
                  marginRight: spacing(8) 
                }} allowFontScaling={false}>+</Text>
                <Text style={{ 
                  fontSize: fontSize(18), 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold' 
                }} allowFontScaling={false}>
                  Add Data
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setShowAddDataModal(false)}
                style={{ padding: spacing(4) }}
              >
                <Text style={{ fontSize: fontSize(20), color: '#AAAAAA', fontFamily: 'Poppins' }} allowFontScaling={false}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Image Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16),
                borderBottomWidth: 1,
                borderBottomColor: '#EEEEEE'
              }}
              onPress={() => {
                // TODO: Handle image selection
                setShowAddDataModal(false);
              }}
            >
              {/* Camera Icon with Plus Overlay */}
              <View style={{ position: 'relative', marginRight: spacing(16), width: wp(32), height: hp(32) }}>
                <Text style={{ fontSize: fontSize(24), color: '#333333' }} allowFontScaling={false}>📷</Text>
                <View style={{
                  position: 'absolute',
                  top: spacing(-4),
                  right: spacing(-4),
                  width: wp(16),
                  height: hp(16),
                  borderRadius: hp(8),
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#333333'
                }}>
                  <Text style={{ fontSize: fontSize(10), color: '#333333', fontWeight: '700', fontFamily: 'Poppins-Bold', lineHeight: fontSize(10) }} allowFontScaling={false}>+</Text>
                </View>
              </View>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#333333', 
                fontFamily: 'Poppins',
                fontWeight: '400'
              }} allowFontScaling={false}>
                Image
              </Text>
            </TouchableOpacity>

            {/* Document Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16)
              }}
              onPress={() => {
                // TODO: Handle document selection
                setShowAddDataModal(false);
              }}
            >
              {/* Document Icon with Plus Overlay */}
              <View style={{ position: 'relative', marginRight: spacing(16), width: wp(32), height: hp(32) }}>
                <Text style={{ fontSize: fontSize(24), color: '#333333' }} allowFontScaling={false}>📄</Text>
                <View style={{
                  position: 'absolute',
                  top: spacing(-4),
                  right: spacing(-4),
                  width: wp(16),
                  height: hp(16),
                  borderRadius: hp(8),
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#333333'
                }}>
                  <Text style={{ fontSize: fontSize(10), color: '#333333', fontWeight: '700', fontFamily: 'Poppins-Bold', lineHeight: fontSize(10) }} allowFontScaling={false}>+</Text>
                </View>
              </View>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#333333', 
                fontFamily: 'Poppins',
                fontWeight: '400'
              }} allowFontScaling={false}>
                Document
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Calendar Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showCalendar}
        onRequestClose={() => setShowCalendar(false)}
      >
        <Pressable 
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setShowCalendar(false)}
        >
          <Pressable style={{ backgroundColor: '#FFFFFF', borderRadius: hp(12), padding: spacing(20), width: '90%' }}>
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
                      backgroundColor: day === selectedDate ? '#4285F4' : 'transparent',
                    }}
                    disabled={!day}
                  >
                    <Text style={{
                      fontSize: fontSize(14),
                      color: day === selectedDate ? '#FFFFFF' : (day ? '#000000' : '#E0E0E0'),
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
    </SafeAreaView>
  );
}

