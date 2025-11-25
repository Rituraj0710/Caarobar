import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Pressable, Switch } from 'react-native';
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
  AddEmployeeAccount: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddEmployeeAccount'>;

type TabType = 'Basic' | 'Working' | 'Documents';

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const genders = ['Male', 'Female', 'Other'];
const states = ['Rajasthan', 'Delhi', 'Maharashtra', 'Gujarat', 'Punjab', 'Haryana', 'Uttar Pradesh'];
const cities = ['Sikar', 'Jaipur', 'Delhi', 'Mumbai', 'Ahmedabad', 'Chandigarh', 'Lucknow'];
const duties = ['Nurse', 'Doctor', 'Admin', 'Manager', 'Staff'];
const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const salaryTypes = ['Monthly', 'Weekly', 'Daily', 'Hourly'];
const overtimeTypes = ['Normal (salary per hour rate)', 'Double (2x salary per hour rate)', 'Triple (3x salary per hour rate)'];
const weekDaysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weeklyOffTypes = ['(Full Day)', '(Half Day)'];
const presentCriteriaRanges = ['30 Mitr', '50 Mitr', '100 Mitr', '200 Mitr', '500 Mitr'];
const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

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

const calculateAge = (day: number, month: number, year: number): number => {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default function AddEmployeeAccountScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('Basic');
  
  // Form fields
  const [mobileNo, setMobileNo] = useState('+91 9460638554');
  const [fullName, setFullName] = useState('Kamal Kishor Jangid');
  const [empId, setEmpId] = useState('001');
  const [fathersName, setFathersName] = useState('Banwarilal Jangid');
  const [alternateNo, setAlternateNo] = useState('+91 9352738554');
  const [dateOfBirth, setDateOfBirth] = useState('01/01/2000');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('25');
  const [address, setAddress] = useState('Radhakishanpura, Sikar');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('332001');
  const [cityVillage, setCityVillage] = useState('Sikar');
  const [wardNo, setWardNo] = useState('49');
  
  // Working tab fields
  const [joiningDate, setJoiningDate] = useState('01/01/2000');
  const [duty, setDuty] = useState('Nurse');
  const [experience, setExperience] = useState('2 Year 5 Months');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [education, setEducation] = useState('Graduate');
  const [startHour, setStartHour] = useState('09');
  const [startMinute, setStartMinute] = useState('00');
  const [startAmPm, setStartAmPm] = useState('AM');
  const [endHour, setEndHour] = useState('07');
  const [endMinute, setEndMinute] = useState('00');
  const [endAmPm, setEndAmPm] = useState('PM');
  const [dutyHours, setDutyHours] = useState('10');
  const [earlyMin, setEarlyMin] = useState('15');
  const [lateMin, setLateMin] = useState('15');
  const [salaryType, setSalaryType] = useState('Monthly');
  const [salaryAmount, setSalaryAmount] = useState('Rs 30000');
  const [perHour, setPerHour] = useState('Rs 100');
  const [overtimeEnabled, setOvertimeEnabled] = useState(true);
  const [overtimeType, setOvertimeType] = useState('Normal (salary per hour rate)');
  const [perHoursOT, setPerHoursOT] = useState('Rs 100');
  const [weeklyOffEnabled, setWeeklyOffEnabled] = useState(true);
  const [weeklyOffRows, setWeeklyOffRows] = useState([{ day: 'Saturday', type: '(Half Day)' }, { day: 'Sunday', type: '(Full Day)' }]);
  const [kilomiterEnabled, setKilomiterEnabled] = useState(true);
  const [kmPrice, setKmPrice] = useState('Rs 2');
  const [presentCriteriaEnabled, setPresentCriteriaEnabled] = useState(true);
  const [selectRange, setSelectRange] = useState('30 Mitr');
  
  // Documents tab fields
  const [aadharNumber, setAadharNumber] = useState(['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']);
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState(['R', 'J', '2', '3', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']);
  const [panNumber, setPanNumber] = useState(['A', 'B', 'C', '1', '2', '3', '4', 'X', 'X', 'X']);
  
  // Modal states
  const [showDateModal, setShowDateModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showJoiningDateModal, setShowJoiningDateModal] = useState(false);
  const [showDutyModal, setShowDutyModal] = useState(false);
  const [showBloodGroupModal, setShowBloodGroupModal] = useState(false);
  const [showSalaryTypeModal, setShowSalaryTypeModal] = useState(false);
  const [showOvertimeTypeModal, setShowOvertimeTypeModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);
  const [showWeeklyOffTypeModal, setShowWeeklyOffTypeModal] = useState(false);
  const [selectedWeeklyOffIndex, setSelectedWeeklyOffIndex] = useState<number | null>(null);
  const [showPresentCriteriaModal, setShowPresentCriteriaModal] = useState(false);
  const [showStartTimeModal, setShowStartTimeModal] = useState(false);
  const [showEndTimeModal, setShowEndTimeModal] = useState(false);
  const [showEarlyMinModal, setShowEarlyMinModal] = useState(false);
  const [showLateMinModal, setShowLateMinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Date picker state
  const [currentMonth, setCurrentMonth] = useState(1); // January
  const [currentYear, setCurrentYear] = useState(2000);
  const [selectedDateDay, setSelectedDateDay] = useState<number | null>(1);
  const [joiningDateMonth, setJoiningDateMonth] = useState(1);
  const [joiningDateYear, setJoiningDateYear] = useState(2000);
  const [selectedJoiningDateDay, setSelectedJoiningDateDay] = useState<number | null>(1);
  
  const calendarGrid = generateCalendarGrid(currentYear, currentMonth);
  
  useEffect(() => {
    // Parse date of birth and set calendar
    const parts = dateOfBirth.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      const year = parseInt(parts[2]);
      setCurrentMonth(month);
      setCurrentYear(year);
      setSelectedDateDay(day);
      const calculatedAge = calculateAge(day, month, year);
      setAge(calculatedAge.toString());
    }
  }, []);
  
  const formatDate = (day: number, month: number, year: number) => {
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = month.toString().padStart(2, '0');
    return `${dayStr}/${monthStr}/${year}`;
  };
  
  const handleDateSelect = (day: number) => {
    setSelectedDateDay(day);
    const formattedDate = formatDate(day, currentMonth, currentYear);
    setDateOfBirth(formattedDate);
    const calculatedAge = calculateAge(day, currentMonth, currentYear);
    setAge(calculatedAge.toString());
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

  const navigateJoiningMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (joiningDateMonth === 1) {
        setJoiningDateMonth(12);
        setJoiningDateYear(joiningDateYear - 1);
      } else {
        setJoiningDateMonth(joiningDateMonth - 1);
      }
    } else {
      if (joiningDateMonth === 12) {
        setJoiningDateMonth(1);
        setJoiningDateYear(joiningDateYear + 1);
      } else {
        setJoiningDateMonth(joiningDateMonth + 1);
      }
    }
  };

  const calculateDutyHours = () => {
    let startTime = parseInt(startHour);
    if (startAmPm === 'PM' && startTime !== 12) startTime += 12;
    if (startAmPm === 'AM' && startTime === 12) startTime = 0;
    const startMinutes = parseInt(startMinute);
    const startTotal = startTime * 60 + startMinutes;

    let endTime = parseInt(endHour);
    if (endAmPm === 'PM' && endTime !== 12) endTime += 12;
    if (endAmPm === 'AM' && endTime === 12) endTime = 0;
    const endMinutes = parseInt(endMinute);
    let endTotal = endTime * 60 + endMinutes;

    // Handle next day (e.g., 9 AM to 7 PM)
    if (endTotal <= startTotal) {
      endTotal += 24 * 60;
    }

    const diffMinutes = endTotal - startTotal;
    const hours = Math.floor(diffMinutes / 60);
    setDutyHours(hours.toString());
  };

  useEffect(() => {
    calculateDutyHours();
  }, [startHour, startMinute, startAmPm, endHour, endMinute, endAmPm]);

  const handleJoiningDateSelect = (day: number) => {
    setSelectedJoiningDateDay(day);
    const formattedDate = formatDate(day, joiningDateMonth, joiningDateYear);
    setJoiningDate(formattedDate);
    setShowJoiningDateModal(false);
  };

  const addWeeklyOffRow = () => {
    setWeeklyOffRows([...weeklyOffRows, { day: 'Monday', type: '(Full Day)' }]);
  };

  const removeWeeklyOffRow = (index: number) => {
    const newRows = weeklyOffRows.filter((_, i) => i !== index);
    setWeeklyOffRows(newRows);
  };

  const earlyMinOptions = Array.from({ length: 60 }, (_, i) => (i + 1).toString());
  const lateMinOptions = Array.from({ length: 60 }, (_, i) => (i + 1).toString());

  const insets = useSafeArea();

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Blue Header Bar */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#4285F4' }}>
        <View style={{
          backgroundColor: '#4285F4',
          paddingTop: hp(10),
          paddingBottom: spacing(16),
          paddingHorizontal: spacing(16),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: hp(60)
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
            paddingTop: hp(10),
            paddingBottom: spacing(16)
          }}>
            <Text style={{
              fontSize: fontSize(18),
              fontWeight: '700',
              color: '#FFFFFF',
              fontFamily: 'Poppins-Bold'
            }} allowFontScaling={false}>
              Add Employee Account
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Tab Navigation */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingHorizontal: spacing(16)
      }}>
        {(['Basic', 'Working', 'Documents'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              paddingVertical: spacing(16),
              alignItems: 'center',
              borderBottomWidth: activeTab === tab ? 2 : 0,
              borderBottomColor: '#4285F4'
            }}
          >
            <Text style={{
              fontSize: fontSize(14),
              color: activeTab === tab ? '#4285F4' : '#9E9E9E',
              fontFamily: activeTab === tab ? 'Poppins-SemiBold' : 'Poppins',
              fontWeight: activeTab === tab ? '600' : '400'
            }} allowFontScaling={false}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: spacing(16), paddingBottom: hp(100) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture - Only show for Basic and Working tabs */}
        {activeTab !== 'Documents' && (
          <View style={{ alignItems: 'center', marginTop: spacing(20), marginBottom: spacing(24) }}>
            <Image 
              source={require('../../assets/Profile picture.png')} 
              style={{ width: wp(100), height: hp(100), borderRadius: hp(50), resizeMode: 'cover' }}
            />
          </View>
        )}

        {activeTab === 'Basic' && (
          <>
            {/* Enter Mobile No */}
            <View style={{ marginBottom: spacing(20) }}>
              <Text style={{
                fontSize: fontSize(14),
                color: '#4285F4',
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                marginBottom: spacing(8)
              }}>
                Enter Mobile No
              </Text>
              <View style={{
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: hp(8),
                overflow: 'hidden'
              }}>
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: spacing(12),
                  paddingVertical: spacing(14),
                  borderRightWidth: 1,
                  borderRightColor: '#E0E0E0',
                  backgroundColor: '#F5F5F5'
                }}>
                  <Text style={{ fontSize: fontSize(16), marginRight: spacing(6) }} allowFontScaling={false}>🇮🇳</Text>
                  <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins', marginRight: spacing(4) }} allowFontScaling={false}>INDIA</Text>
                  <Text style={{ fontSize: fontSize(12), color: '#9E9E9E' }} allowFontScaling={false}>▼</Text>
                </TouchableOpacity>
                <TextInput
                  style={{
                    flex: 1,
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    fontSize: fontSize(14),
                    color: '#000000',
                    fontFamily: 'Poppins'
                  }}
                  placeholder="Enter mobile number"
                  placeholderTextColor="#9E9E9E"
                  value={mobileNo}
                  onChangeText={setMobileNo}
                  keyboardType="phone-pad"
                  allowFontScaling={false}
                />
              </View>
            </View>

            {/* Enter Full Name & Emp ID */}
            <View style={{ flexDirection: 'row', marginBottom: spacing(20), gap: spacing(12) }}>
              <View style={{ flex: 2 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }} allowFontScaling={false}>
                  Enter Full Name
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
                  placeholder="Enter full name"
                  placeholderTextColor="#9E9E9E"
                  value={fullName}
                  onChangeText={setFullName}
                  allowFontScaling={false}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }} allowFontScaling={false}>
                  Emp ID
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
                  placeholder="Emp ID"
                  placeholderTextColor="#9E9E9E"
                  value={empId}
                  onChangeText={setEmpId}
                  allowFontScaling={false}
                />
              </View>
            </View>

            {/* Fathers Name */}
            <View style={{ marginBottom: spacing(20) }}>
              <Text style={{
                fontSize: fontSize(14),
                color: '#4285F4',
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                marginBottom: spacing(8)
              }} allowFontScaling={false}>
                Fathers Name
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
                placeholder="Enter father's name"
                placeholderTextColor="#9E9E9E"
                value={fathersName}
                onChangeText={setFathersName}
                allowFontScaling={false}
              />
            </View>

            {/* Alternate No */}
            <View style={{ marginBottom: spacing(20) }}>
              <Text style={{
                fontSize: fontSize(14),
                color: '#4285F4',
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                marginBottom: spacing(8)
              }}>
                Alternate No
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
                placeholder="Enter alternate number"
                placeholderTextColor="#9E9E9E"
                value={alternateNo}
                onChangeText={setAlternateNo}
                keyboardType="phone-pad"
              />
            </View>

            {/* Date Of Birth, Gender, Age */}
            <View style={{ flexDirection: 'row', marginBottom: spacing(20), gap: spacing(12) }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Date Of Birth
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
                    alignItems: 'center'
                  }}
                >
                  <Image 
                    source={require('../../assets/calender.png')} 
                    style={{ width: 18, height: 18, marginRight: 8, resizeMode: 'contain' }} 
                  />
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#000000',
                    fontFamily: 'Poppins',
                    flex: 1
                  }}>
                    {dateOfBirth}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Gender
                </Text>
                <TouchableOpacity
                  onPress={() => setShowGenderModal(true)}
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
                  }}>
                    {gender}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Age
                </Text>
                <View style={{
                  backgroundColor: '#F5F5F5',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  borderRadius: hp(8),
                  paddingHorizontal: spacing(16),
                  paddingVertical: spacing(14)
                }}>
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#000000',
                    fontFamily: 'Poppins'
                  }}>
                    {age}
                  </Text>
                </View>
              </View>
            </View>

            {/* Address */}
            <View style={{ marginBottom: spacing(20) }}>
              <Text style={{
                fontSize: fontSize(14),
                color: '#4285F4',
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                marginBottom: spacing(8)
              }}>
                Address
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
                  fontFamily: 'Poppins',
                  minHeight: 80,
                  textAlignVertical: 'top'
                }}
                placeholder="Enter address"
                placeholderTextColor="#9E9E9E"
                value={address}
                onChangeText={setAddress}
                multiline
              />
            </View>

            {/* State & Pincode */}
            <View style={{ flexDirection: 'row', marginBottom: spacing(20), gap: spacing(12) }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  State
                </Text>
                <TouchableOpacity
                  onPress={() => setShowStateModal(true)}
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
                  }}>
                    {state}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Pincode
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
                  placeholder="Enter pincode"
                  placeholderTextColor="#9E9E9E"
                  value={pincode}
                  onChangeText={setPincode}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            {/* City / Village & Ward No */}
            <View style={{ flexDirection: 'row', marginBottom: spacing(20), gap: spacing(12) }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  City / Village
                </Text>
                <TouchableOpacity
                  onPress={() => setShowCityModal(true)}
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
                  }}>
                    {cityVillage}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Ward No.
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
                  placeholder="Enter ward number"
                  placeholderTextColor="#9E9E9E"
                  value={wardNo}
                  onChangeText={setWardNo}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </>
        )}

        {activeTab === 'Working' && (
          <>
            {/* Top Section - Joining Date, Duty, Experience, Blood Group, Education */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing(12) }}>
              <View style={{ width: '48%' }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Joining Date
                </Text>
                <TouchableOpacity
                  onPress={() => setShowJoiningDateModal(true)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: hp(8),
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Image 
                    source={require('../../assets/calender.png')} 
                    style={{ width: 18, height: 18, marginRight: 8, resizeMode: 'contain' }} 
                  />
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#000000',
                    fontFamily: 'Poppins',
                    flex: 1
                  }}>
                    {joiningDate}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '48%' }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Duty
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDutyModal(true)}
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
                  }}>
                    {duty}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '48%' }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Experience
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
                  placeholder="Enter experience"
                  placeholderTextColor="#9E9E9E"
                  value={experience}
                  onChangeText={setExperience}
                />
              </View>
              <View style={{ width: '48%' }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Blood Group
                </Text>
                <TouchableOpacity
                  onPress={() => setShowBloodGroupModal(true)}
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
                  }}>
                    {bloodGroup}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%' }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Education
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
                  placeholder="Enter education"
                  placeholderTextColor="#9E9E9E"
                  value={education}
                  onChangeText={setEducation}
                />
              </View>
              </View>
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#E0E0E0', marginBottom: spacing(20) }} />

            {/* Duty Time Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 8 }} />
                  <Text style={{
                    fontSize: fontSize(16),
                    color: '#000000',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }}>
                    Duty Time
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 8 }} />
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#000000',
                    fontFamily: 'Poppins-SemiBold'
                  }}>
                    Duty Hours {dutyHours}
                  </Text>
                </View>
              </View>

              {/* Start Time */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Start Time
                </Text>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => setShowStartTimeModal(true)}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: hp(8),
                      paddingHorizontal: spacing(12),
                      paddingVertical: spacing(14),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>Hour</Text>
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{startHour} ▼</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowStartTimeModal(true)}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: hp(8),
                      paddingHorizontal: spacing(12),
                      paddingVertical: spacing(14),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>Minutes</Text>
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{startMinute} ▼</Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <TouchableOpacity
                      onPress={() => setStartAmPm('AM')}
                      style={{
                        backgroundColor: startAmPm === 'AM' ? '#4285F4' : '#FFFFFF',
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: hp(8),
                        paddingHorizontal: spacing(16),
                        paddingVertical: spacing(14),
                        minWidth: 60
                      }}
                    >
                      <Text style={{
                        fontSize: fontSize(14),
                        color: startAmPm === 'AM' ? '#FFFFFF' : '#000000',
                        fontFamily: 'Poppins',
                        textAlign: 'center'
                      }}>
                        AM
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setStartAmPm('PM')}
                      style={{
                        backgroundColor: startAmPm === 'PM' ? '#4285F4' : '#FFFFFF',
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: hp(8),
                        paddingHorizontal: spacing(16),
                        paddingVertical: spacing(14),
                        minWidth: 60
                      }}
                    >
                      <Text style={{
                        fontSize: fontSize(14),
                        color: startAmPm === 'PM' ? '#FFFFFF' : '#000000',
                        fontFamily: 'Poppins',
                        textAlign: 'center'
                      }}>
                        PM
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* End Time */}
              <View>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  End Time
                </Text>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => setShowEndTimeModal(true)}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: hp(8),
                      paddingHorizontal: spacing(12),
                      paddingVertical: spacing(14),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>Hour</Text>
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{endHour} ▼</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setShowEndTimeModal(true)}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: hp(8),
                      paddingHorizontal: spacing(12),
                      paddingVertical: spacing(14),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>Minutes</Text>
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{endMinute} ▼</Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <TouchableOpacity
                      onPress={() => setEndAmPm('AM')}
                      style={{
                        backgroundColor: endAmPm === 'AM' ? '#4285F4' : '#FFFFFF',
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: hp(8),
                        paddingHorizontal: spacing(16),
                        paddingVertical: spacing(14),
                        minWidth: 60
                      }}
                    >
                      <Text style={{
                        fontSize: fontSize(14),
                        color: endAmPm === 'AM' ? '#FFFFFF' : '#000000',
                        fontFamily: 'Poppins',
                        textAlign: 'center'
                      }}>
                        AM
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setEndAmPm('PM')}
                      style={{
                        backgroundColor: endAmPm === 'PM' ? '#4285F4' : '#FFFFFF',
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: hp(8),
                        paddingHorizontal: spacing(16),
                        paddingVertical: spacing(14),
                        minWidth: 60
                      }}
                    >
                      <Text style={{
                        fontSize: fontSize(14),
                        color: endAmPm === 'PM' ? '#FFFFFF' : '#000000',
                        fontFamily: 'Poppins',
                        textAlign: 'center'
                      }}>
                        PM
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#E0E0E0', marginBottom: spacing(20) }} />

            {/* Arrive Deduction Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5252', marginRight: 8 }} />
                <Text style={{
                  fontSize: fontSize(16),
                  color: '#000000',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600'
                }}>
                  Arrive Deduction
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: spacing(12) }}>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#4285F4',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600',
                    marginBottom: spacing(8)
                  }}>
                    Early Min
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowEarlyMinModal(true)}
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
                    }}>
                      {earlyMin}
                    </Text>
                    <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#4285F4',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600',
                    marginBottom: spacing(8)
                  }}>
                    Late Min
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowLateMinModal(true)}
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
                    }}>
                      {lateMin}
                    </Text>
                    <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#E0E0E0', marginBottom: spacing(20) }} />

            {/* Salary Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#9E9E9E', marginRight: 8 }} />
                <Text style={{
                  fontSize: fontSize(16),
                  color: '#000000',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600'
                }}>
                  Salary
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: spacing(12), marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#4285F4',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600',
                    marginBottom: spacing(8)
                  }}>
                    Type
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowSalaryTypeModal(true)}
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
                    }}>
                      {salaryType}
                    </Text>
                    <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#4285F4',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600',
                    marginBottom: spacing(8)
                  }}>
                    Amount
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
                    placeholder="Enter amount"
                    placeholderTextColor="#9E9E9E"
                    value={salaryAmount}
                    onChangeText={setSalaryAmount}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#4285F4',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600',
                    marginBottom: spacing(8)
                  }}>
                    Per Hour
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
                    placeholder="Enter per hour"
                    placeholderTextColor="#9E9E9E"
                    value={perHour}
                    onChangeText={setPerHour}
                  />
                </View>
              </View>
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#E0E0E0', marginBottom: spacing(20) }} />

            {/* Overtime Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 8 }} />
                  <Text style={{
                    fontSize: fontSize(16),
                    color: '#000000',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }}>
                    Overtime
                  </Text>
                </View>
                <Switch
                  value={overtimeEnabled}
                  onValueChange={setOvertimeEnabled}
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor={overtimeEnabled ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
              {overtimeEnabled && (
                <>
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{
                      fontSize: fontSize(14),
                      color: '#4285F4',
                      fontFamily: 'Poppins-SemiBold',
                      fontWeight: '600',
                      marginBottom: spacing(8)
                    }}>
                      Select Overtime Type
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowOvertimeTypeModal(true)}
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
                        fontFamily: 'Poppins',
                        flex: 1
                      }}>
                        {overtimeType}
                      </Text>
                      <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{
                      fontSize: fontSize(14),
                      color: '#4285F4',
                      fontFamily: 'Poppins-SemiBold',
                      fontWeight: '600',
                      marginBottom: spacing(8)
                    }}>
                      Per Hours OT
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
                      placeholder="Enter per hours OT"
                      placeholderTextColor="#9E9E9E"
                      value={perHoursOT}
                      onChangeText={setPerHoursOT}
                    />
                  </View>
                </>
              )}
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#E0E0E0', marginBottom: spacing(20) }} />

            {/* Weekly Off Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 8 }} />
                  <Text style={{
                    fontSize: fontSize(16),
                    color: '#000000',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }}>
                    Weekly Off
                  </Text>
                </View>
                <Switch
                  value={weeklyOffEnabled}
                  onValueChange={setWeeklyOffEnabled}
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor={weeklyOffEnabled ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
              {weeklyOffEnabled && (
                <>
                  {weeklyOffRows.map((row, index) => (
                    <View key={index} style={{ flexDirection: 'row', gap: 8, marginBottom: 12, alignItems: 'flex-end' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          fontSize: fontSize(14),
                          color: '#4285F4',
                          fontFamily: 'Poppins-SemiBold',
                          fontWeight: '600',
                          marginBottom: spacing(8)
                        }}>
                          {index === 0 ? 'Day' : `Day ${index + 1}`}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedWeeklyOffIndex(index);
                            setShowDayModal(true);
                          }}
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
                          }}>
                            {row.day}
                          </Text>
                          <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          fontSize: fontSize(14),
                          color: '#4285F4',
                          fontFamily: 'Poppins-SemiBold',
                          fontWeight: '600',
                          marginBottom: spacing(8)
                        }}>
                          Type
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedWeeklyOffIndex(index);
                            setShowWeeklyOffTypeModal(true);
                          }}
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
                          }}>
                            {row.type}
                          </Text>
                          <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => addWeeklyOffRow()}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: '#4285F4',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: spacing(8)
                        }}
                      >
                        <Text style={{ fontSize: fontSize(20), color: '#FFFFFF', fontWeight: 'bold' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#E0E0E0', marginBottom: spacing(20) }} />

            {/* Kilomiter Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 8 }} />
                  <Text style={{
                    fontSize: fontSize(16),
                    color: '#000000',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }}>
                    Kilomiter
                  </Text>
                </View>
                <Switch
                  value={kilomiterEnabled}
                  onValueChange={setKilomiterEnabled}
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor={kilomiterEnabled ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
              {kilomiterEnabled && (
                <View>
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#4285F4',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600',
                    marginBottom: spacing(8)
                  }}>
                    Km Price
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
                    placeholder="Enter km price"
                    placeholderTextColor="#9E9E9E"
                    value={kmPrice}
                    onChangeText={setKmPrice}
                  />
                </View>
              )}
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#E0E0E0', marginBottom: spacing(20) }} />

            {/* Present Criteria Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 8 }} />
                  <Text style={{
                    fontSize: fontSize(16),
                    color: '#000000',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }}>
                    Present Criteria
                  </Text>
                </View>
                <Switch
                  value={presentCriteriaEnabled}
                  onValueChange={setPresentCriteriaEnabled}
                  trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                  thumbColor={presentCriteriaEnabled ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
              {presentCriteriaEnabled && (
                <>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{
                      fontSize: fontSize(14),
                      color: '#4285F4',
                      fontFamily: 'Poppins-SemiBold',
                      fontWeight: '600',
                      marginBottom: spacing(8)
                    }}>
                      Select Range
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowPresentCriteriaModal(true)}
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
                      }}>
                        {selectRange}
                      </Text>
                      <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Map Interface Placeholder */}
                  <View style={{
                    width: '100%',
                    height: 300,
                    borderRadius: 150,
                    backgroundColor: '#E0E0E0',
                    marginBottom: spacing(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: '#4285F4'
                  }}>
                    <Text style={{ fontSize: fontSize(14), color: '#9E9E9E', fontFamily: 'Poppins' }}>
                      Map View
                    </Text>
                  </View>
                  <Text style={{
                    fontSize: fontSize(14),
                    color: '#9E9E9E',
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    marginBottom: spacing(8)
                  }}>
                    Set Location
                  </Text>
                </>
              )}
            </View>
          </>
        )}

        {activeTab === 'Documents' && (
          <>
            {/* Aadhar Card Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#9E9E9E', marginRight: 8 }} />
                <Text style={{
                  fontSize: fontSize(16),
                  color: '#000000',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600'
                }}>
                  Aadhar Card
                </Text>
              </View>
              
              {/* Images */}
              <View style={{ flexDirection: 'row', gap: spacing(12), marginBottom: 16 }}>
                <View style={{ flex: 1 }}>
                  <View style={{
                    width: '100%',
                    aspectRatio: 1.6,
                    backgroundColor: '#F5F5F5',
                    borderRadius: hp(8),
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing(8)
                  }}>
                    <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }}>Front Side</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{
                    width: '100%',
                    aspectRatio: 1.6,
                    backgroundColor: '#F5F5F5',
                    borderRadius: hp(8),
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing(8)
                  }}>
                    <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }}>Back Side</Text>
                  </View>
                </View>
              </View>
              
              {/* Aadhar Number Input Boxes */}
              <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                {aadharNumber.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={{
                      width: 28,
                      height: 28,
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: hp(4),
                      textAlign: 'center',
                      fontSize: fontSize(14),
                      color: '#000000',
                      fontFamily: 'Poppins',
                      backgroundColor: '#FFFFFF'
                    }}
                    value={digit}
                    onChangeText={(text) => {
                      const newNumber = [...aadharNumber];
                      newNumber[index] = text.slice(-1) || '';
                      setAadharNumber(newNumber);
                    }}
                    maxLength={1}
                    keyboardType="number-pad"
                  />
                ))}
              </View>
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#E0E0E0', marginBottom: spacing(20) }} />

            {/* Driving License Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#9E9E9E', marginRight: 8 }} />
                <Text style={{
                  fontSize: fontSize(16),
                  color: '#000000',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600'
                }}>
                  Driving License
                </Text>
              </View>
              
              {/* Images */}
              <View style={{ flexDirection: 'row', gap: spacing(12), marginBottom: 16 }}>
                <View style={{ flex: 1 }}>
                  <View style={{
                    width: '100%',
                    aspectRatio: 1.6,
                    backgroundColor: '#F5F5F5',
                    borderRadius: hp(8),
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing(8)
                  }}>
                    <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }}>Front Side</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{
                    width: '100%',
                    aspectRatio: 1.6,
                    backgroundColor: '#F5F5F5',
                    borderRadius: hp(8),
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing(8)
                  }}>
                    <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }}>Back Side</Text>
                  </View>
                </View>
              </View>
              
              {/* Driving License Number Input Boxes */}
              <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                {drivingLicenseNumber.map((char, index) => (
                  <TextInput
                    key={index}
                    style={{
                      width: 28,
                      height: 28,
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: hp(4),
                      textAlign: 'center',
                      fontSize: fontSize(14),
                      color: '#000000',
                      fontFamily: 'Poppins',
                      backgroundColor: '#FFFFFF',
                      textTransform: 'uppercase'
                    }}
                    value={char}
                    onChangeText={(text) => {
                      const newNumber = [...drivingLicenseNumber];
                      newNumber[index] = text.slice(-1).toUpperCase() || '';
                      setDrivingLicenseNumber(newNumber);
                    }}
                    maxLength={1}
                  />
                ))}
              </View>
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#E0E0E0', marginBottom: spacing(20) }} />

            {/* PAN Card Section */}
            <View style={{ marginBottom: spacing(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#9E9E9E', marginRight: 8 }} />
                <Text style={{
                  fontSize: fontSize(16),
                  color: '#000000',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600'
                }}>
                  PAN Card
                </Text>
              </View>
              
              {/* Images */}
              <View style={{ flexDirection: 'row', gap: spacing(12), marginBottom: 16 }}>
                <View style={{ flex: 1 }}>
                  <View style={{
                    width: '100%',
                    aspectRatio: 1.6,
                    backgroundColor: '#F5F5F5',
                    borderRadius: hp(8),
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing(8)
                  }}>
                    <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }}>Front Side</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{
                    width: '100%',
                    aspectRatio: 1.6,
                    backgroundColor: '#F5F5F5',
                    borderRadius: hp(8),
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: spacing(8)
                  }}>
                    <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }}>Back Side</Text>
                  </View>
                </View>
              </View>
              
              {/* PAN Number Input Boxes */}
              <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                {panNumber.map((char, index) => (
                  <TextInput
                    key={index}
                    style={{
                      width: 28,
                      height: 28,
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: hp(4),
                      textAlign: 'center',
                      fontSize: fontSize(14),
                      color: '#000000',
                      fontFamily: 'Poppins',
                      backgroundColor: '#FFFFFF',
                      textTransform: 'uppercase'
                    }}
                    value={char}
                    onChangeText={(text) => {
                      const newNumber = [...panNumber];
                      newNumber[index] = text.slice(-1).toUpperCase() || '';
                      setPanNumber(newNumber);
                    }}
                    maxLength={1}
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Save Button - Fixed at Bottom */}
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
            borderRadius: hp(8),
            paddingVertical: spacing(16),
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3
          }}
          onPress={() => {
            // Show success modal
            setShowSuccessModal(true);
          }}
        >
          <Text style={{
            color: '#FFFFFF',
            fontSize: fontSize(16),
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

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
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Date</Text>
            
            {/* Month Navigation */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing(20) }}>
              <TouchableOpacity onPress={() => navigateMonth('prev')} style={{ padding: 8 }}>
                <Text style={{ fontSize: fontSize(20), color: '#000000' }}>←</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                {monthNames[currentMonth - 1]} {currentYear}
              </Text>
              <TouchableOpacity onPress={() => navigateMonth('next')} style={{ padding: 8 }}>
                <Text style={{ fontSize: fontSize(20), color: '#000000' }}>→</Text>
              </TouchableOpacity>
            </View>

            {/* Weekday Headers */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
              {weekDays.map((day, index) => (
                <Text key={index} style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins-Medium', width: 30, textAlign: 'center' }}>
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
                      fontSize: fontSize(14),
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

      {/* Gender Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowGenderModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Gender</Text>
            {genders.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setGender(item);
                  setShowGenderModal(false);
                }}
                style={{
                  paddingVertical: spacing(16),
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0'
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* State Modal */}
      <Modal
        visible={showStateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStateModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowStateModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: 400 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select State</Text>
            <ScrollView>
              {states.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setState(item);
                    setShowStateModal(false);
                  }}
                  style={{
                    paddingVertical: spacing(16),
                    borderBottomWidth: 1,
                    borderBottomColor: '#E0E0E0'
                  }}
                >
                  <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* City Modal */}
      <Modal
        visible={showCityModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCityModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowCityModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: 400 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select City / Village</Text>
            <ScrollView>
              {cities.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setCityVillage(item);
                    setShowCityModal(false);
                  }}
                  style={{
                    paddingVertical: spacing(16),
                    borderBottomWidth: 1,
                    borderBottomColor: '#E0E0E0'
                  }}
                >
                  <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Joining Date Modal */}
      <Modal
        visible={showJoiningDateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowJoiningDateModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowJoiningDateModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Joining Date</Text>
            
            {/* Month Navigation */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing(20) }}>
              <TouchableOpacity onPress={() => navigateJoiningMonth('prev')} style={{ padding: 8 }}>
                <Text style={{ fontSize: fontSize(20), color: '#000000' }}>←</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: fontSize(18), fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>
                {monthNames[joiningDateMonth - 1]} {joiningDateYear}
              </Text>
              <TouchableOpacity onPress={() => navigateJoiningMonth('next')} style={{ padding: 8 }}>
                <Text style={{ fontSize: fontSize(20), color: '#000000' }}>→</Text>
              </TouchableOpacity>
            </View>

            {/* Weekday Headers */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
              {weekDays.map((day, index) => (
                <Text key={index} style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins-Medium', width: 30, textAlign: 'center' }}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            {generateCalendarGrid(joiningDateYear, joiningDateMonth).map((row, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 6 }}>
                {row.map((day, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    onPress={() => day && handleJoiningDateSelect(day)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: day === selectedJoiningDateDay ? '#4285F4' : 'transparent',
                    }}
                    disabled={!day}
                  >
                    <Text style={{
                      fontSize: fontSize(14),
                      color: day === selectedJoiningDateDay ? '#FFFFFF' : (day ? '#000000' : '#E0E0E0'),
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

      {/* Duty Modal */}
      <Modal
        visible={showDutyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDutyModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowDutyModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Duty</Text>
            {duties.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setDuty(item);
                  setShowDutyModal(false);
                }}
                style={{
                  paddingVertical: spacing(16),
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0'
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Blood Group Modal */}
      <Modal
        visible={showBloodGroupModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBloodGroupModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowBloodGroupModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Blood Group</Text>
            {bloodGroups.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setBloodGroup(item);
                  setShowBloodGroupModal(false);
                }}
                style={{
                  paddingVertical: spacing(16),
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0'
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Salary Type Modal */}
      <Modal
        visible={showSalaryTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSalaryTypeModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowSalaryTypeModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Salary Type</Text>
            {salaryTypes.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setSalaryType(item);
                  setShowSalaryTypeModal(false);
                }}
                style={{
                  paddingVertical: spacing(16),
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0'
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Overtime Type Modal */}
      <Modal
        visible={showOvertimeTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOvertimeTypeModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowOvertimeTypeModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Overtime Type</Text>
            {overtimeTypes.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setOvertimeType(item);
                  setShowOvertimeTypeModal(false);
                }}
                style={{
                  paddingVertical: spacing(16),
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0'
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Day Modal (for Weekly Off) */}
      <Modal
        visible={showDayModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDayModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowDayModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Day</Text>
            {weekDaysList.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  if (selectedWeeklyOffIndex !== null) {
                    const newRows = [...weeklyOffRows];
                    newRows[selectedWeeklyOffIndex].day = item;
                    setWeeklyOffRows(newRows);
                  }
                  setShowDayModal(false);
                }}
                style={{
                  paddingVertical: spacing(16),
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0'
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Weekly Off Type Modal */}
      <Modal
        visible={showWeeklyOffTypeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowWeeklyOffTypeModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowWeeklyOffTypeModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Type</Text>
            {weeklyOffTypes.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  if (selectedWeeklyOffIndex !== null) {
                    const newRows = [...weeklyOffRows];
                    newRows[selectedWeeklyOffIndex].type = item;
                    setWeeklyOffRows(newRows);
                  }
                  setShowWeeklyOffTypeModal(false);
                }}
                style={{
                  paddingVertical: spacing(16),
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0'
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Present Criteria Modal */}
      <Modal
        visible={showPresentCriteriaModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPresentCriteriaModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowPresentCriteriaModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Range</Text>
            {presentCriteriaRanges.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setSelectRange(item);
                  setShowPresentCriteriaModal(false);
                }}
                style={{
                  paddingVertical: spacing(16),
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0'
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

      {/* Start Time Modal */}
      <Modal
        visible={showStartTimeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStartTimeModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowStartTimeModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: 400 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Start Time</Text>
            <View style={{ flexDirection: 'row', gap: spacing(12) }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: fontSize(14), color: '#4285F4', marginBottom: spacing(8), fontFamily: 'Poppins-SemiBold' }}>Hour</Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  {hours.map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        setStartHour(item);
                        setShowStartTimeModal(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E0E0E0'
                      }}
                    >
                      <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: fontSize(14), color: '#4285F4', marginBottom: spacing(8), fontFamily: 'Poppins-SemiBold' }}>Minutes</Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  {minutes.map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        setStartMinute(item);
                        setShowStartTimeModal(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E0E0E0'
                      }}
                    >
                      <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* End Time Modal */}
      <Modal
        visible={showEndTimeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEndTimeModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowEndTimeModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: 400 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select End Time</Text>
            <View style={{ flexDirection: 'row', gap: spacing(12) }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: fontSize(14), color: '#4285F4', marginBottom: spacing(8), fontFamily: 'Poppins-SemiBold' }}>Hour</Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  {hours.map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        setEndHour(item);
                        setShowEndTimeModal(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E0E0E0'
                      }}
                    >
                      <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: fontSize(14), color: '#4285F4', marginBottom: spacing(8), fontFamily: 'Poppins-SemiBold' }}>Minutes</Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  {minutes.map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        setEndMinute(item);
                        setShowEndTimeModal(false);
                      }}
                      style={{
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E0E0E0'
                      }}
                    >
                      <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Early Min Modal */}
      <Modal
        visible={showEarlyMinModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEarlyMinModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowEarlyMinModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: 400 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Early Minutes</Text>
            <ScrollView>
              {earlyMinOptions.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setEarlyMin(item);
                    setShowEarlyMinModal(false);
                  }}
                  style={{
                    paddingVertical: spacing(16),
                    borderBottomWidth: 1,
                    borderBottomColor: '#E0E0E0'
                  }}
                >
                  <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Late Min Modal */}
      <Modal
        visible={showLateMinModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLateMinModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowLateMinModal(false)}
        >
          <Pressable 
            style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: 400 }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: fontSize(18), fontWeight: '700', marginBottom: spacing(20), fontFamily: 'Poppins-Bold' }}>Select Late Minutes</Text>
            <ScrollView>
              {lateMinOptions.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setLateMin(item);
                    setShowLateMinModal(false);
                  }}
                  style={{
                    paddingVertical: spacing(16),
                    borderBottomWidth: 1,
                    borderBottomColor: '#E0E0E0'
                  }}
                >
                  <Text style={{ fontSize: fontSize(16), color: '#000000', fontFamily: 'Poppins' }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          onPress={() => setShowSuccessModal(false)}
        >
          <Pressable 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderTopLeftRadius: 24, 
              borderTopRightRadius: 24, 
              padding: 24,
              alignItems: 'center',
              paddingBottom: spacing(32) + insets.bottom
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <View style={{ 
              width: wp(100), 
              height: hp(100), 
              borderRadius: hp(50), 
              backgroundColor: '#4CAF50',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing(24),
              position: 'relative'
            }}>
              {/* Outer ring */}
              <View style={{
                position: 'absolute',
                width: wp(120),
                height: hp(120),
                borderRadius: hp(60),
                borderWidth: 3,
                borderColor: '#81C784',
                opacity: 0.5
              }} />
              {/* Checkmark */}
              <View style={{
              width: wp(50),
              height: hp(50),
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <View style={{
              width: wp(30),
              height: hp(20),
                  borderLeftWidth: 5,
                  borderBottomWidth: 5,
                  borderColor: '#FFFFFF',
                  transform: [{ rotate: '-45deg' }],
                  marginTop: -5
                }} />
              </View>
            </View>

            {/* Success Title */}
            <Text style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#000000',
              fontFamily: 'Poppins-Bold',
              marginBottom: spacing(8),
              textAlign: 'center',
              lineHeight: 32
            }}>
              Employee Added{'\n'}Successfully
            </Text>

            {/* Success Message */}
            <Text style={{
              fontSize: fontSize(14),
              color: '#9E9E9E',
              fontFamily: 'Poppins',
              marginBottom: 32,
              textAlign: 'center',
              lineHeight: 20
            }}>
              Employee has been added{'\n'}successfully
            </Text>

            {/* Share To Employee Button */}
            <TouchableOpacity
              onPress={() => {
                setShowSuccessModal(false);
                // TODO: Handle share functionality
                navigation.goBack();
              }}
              style={{
                width: '100%',
                backgroundColor: '#4285F4',
                borderRadius: hp(8),
                paddingVertical: spacing(16),
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: hp(2) },
                shadowOpacity: 0.2,
                shadowRadius: hp(4),
                elevation: 3
              }}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: fontSize(16),
                fontFamily: 'Poppins-Bold',
                fontWeight: '700'
              }} allowFontScaling={false}>
                Share To Employee
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

    </View>
  );
}

