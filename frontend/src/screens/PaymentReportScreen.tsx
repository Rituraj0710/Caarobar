import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Modal, Pressable, TextInput, StatusBar, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';
import { wp, hp, fontSize, spacing, tableCellWidth, SCREEN_WIDTH, SCREEN_HEIGHT, useSafeArea } from '../utils/responsive';
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
  PaymentReport: {
    employeeId?: string;
    name?: string;
    role?: string;
    empId?: string;
  } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentReport'>;

interface Transaction {
  date: string;
  description: string;
  credit: string;
  debit: string;
  balance: string;
}

const transactions: Transaction[] = [
  { date: '01/04/24', description: 'Opening BL', credit: '', debit: '', balance: 'Nill' },
  { date: '31/07/24', description: '07 - Salary', credit: '15000', debit: '', balance: '15000 Cr' },
  { date: '07/08/24', description: 'PhonePe', credit: '', debit: '15000', balance: 'Nill' },
  { date: '31/08/24', description: '08 - Salary', credit: '14000', debit: '', balance: '14000 Cr' },
  { date: '07/09/24', description: 'Gpay', credit: '', debit: '13000', balance: '1000 Cr' },
  { date: '31/08/24', description: '08 - Expense', credit: '1500', debit: '', balance: '2500 Cr' },
  { date: '07/10/24', description: 'Cash', credit: '', debit: '1000', balance: '1500 Cr' },
];

// Generate calendar grid
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

export default function PaymentReportScreen({ navigation, route }: Props) {
  const insets = useSafeArea();
  const routeParams = route.params;
  const [name, setName] = useState<string>(routeParams?.name || 'Kamal Jangid');
  const [empId, setEmpId] = useState<string>(routeParams?.empId || '001');
  const [role, setRole] = useState<string>(routeParams?.role || 'Carpenter');

  // Payment In Modal States
  const [showPaymentInModal, setShowPaymentInModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [isAmountDropdownOpen, setIsAmountDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDateDay, setSelectedDateDay] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaymentMethodDropdownOpen, setIsPaymentMethodDropdownOpen] = useState(false);
  const [remark, setRemark] = useState('');

  // Payment Out Modal States
  const [showPaymentOutModal, setShowPaymentOutModal] = useState(false);
  const [amountOut, setAmountOut] = useState('');
  const [isAmountOutDropdownOpen, setIsAmountOutDropdownOpen] = useState(false);
  const [selectedDateOut, setSelectedDateOut] = useState('');
  const [showCalendarOut, setShowCalendarOut] = useState(false);
  const [currentMonthOut, setCurrentMonthOut] = useState(new Date().getMonth() + 1);
  const [currentYearOut, setCurrentYearOut] = useState(new Date().getFullYear());
  const [selectedDateDayOut, setSelectedDateDayOut] = useState<number | null>(null);
  const [paymentMethodOut, setPaymentMethodOut] = useState('');
  const [isPaymentMethodOutDropdownOpen, setIsPaymentMethodOutDropdownOpen] = useState(false);
  const [remarkOut, setRemarkOut] = useState('');

  // Amount options
  const amountOptions = ['5000', '10000', '15000', '20000', '25000', '30000', '35000', '40000', '45000', '50000'];

  // Payment method options
  const paymentMethodOptions = ['Cash', 'PhonePe', 'Gpay', 'Bank Transfer', 'UPI', 'Cheque'];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calendarGrid = generateCalendarGrid(currentYear, currentMonth);
  const calendarGridOut = generateCalendarGrid(currentYearOut, currentMonthOut);

  const formatDate = (day: number, month: number, year: number) => {
    const dayStr = day.toString().padStart(2, '0');
    return `${dayStr} ${monthNames[month - 1]} ${year}`;
  };

  const handleDateSelect = (day: number) => {
    setSelectedDateDay(day);
    const formattedDate = formatDate(day, currentMonth, currentYear);
    setSelectedDate(formattedDate);
    // Calendar stays open after selection to match screenshot
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

  const handlePaymentInDone = () => {
    // TODO: Implement payment in submission
    console.log('Payment In:', { amount, selectedDate, paymentMethod, remark });
    setShowPaymentInModal(false);
    // Reset form
    setAmount('');
    setSelectedDate('');
    setPaymentMethod('');
    setRemark('');
    setSelectedDateDay(null);
  };

  const handlePaymentInCancel = () => {
    setShowPaymentInModal(false);
    // Reset form
    setAmount('');
    setSelectedDate('');
    setPaymentMethod('');
    setRemark('');
    setSelectedDateDay(null);
  };

  // Payment Out handlers
  const handleDateSelectOut = (day: number) => {
    setSelectedDateDayOut(day);
    const formattedDate = formatDate(day, currentMonthOut, currentYearOut);
    setSelectedDateOut(formattedDate);
    // Calendar stays open after selection to match screenshot
  };

  const navigateMonthOut = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonthOut === 1) {
        setCurrentMonthOut(12);
        setCurrentYearOut(currentYearOut - 1);
      } else {
        setCurrentMonthOut(currentMonthOut - 1);
      }
    } else {
      if (currentMonthOut === 12) {
        setCurrentMonthOut(1);
        setCurrentYearOut(currentYearOut + 1);
      } else {
        setCurrentMonthOut(currentMonthOut + 1);
      }
    }
  };

  const handlePaymentOutDone = () => {
    // TODO: Implement payment out submission
    console.log('Payment Out:', { amountOut, selectedDateOut, paymentMethodOut, remarkOut });
    setShowPaymentOutModal(false);
    // Reset form
    setAmountOut('');
    setSelectedDateOut('');
    setPaymentMethodOut('');
    setRemarkOut('');
    setSelectedDateDayOut(null);
  };

  const handlePaymentOutCancel = () => {
    setShowPaymentOutModal(false);
    // Reset form
    setAmountOut('');
    setSelectedDateOut('');
    setPaymentMethodOut('');
    setRemarkOut('');
    setSelectedDateDayOut(null);
  };

  useEffect(() => {
    // If params are provided, use them; otherwise fetch from API
    if (routeParams?.name && routeParams?.empId) {
      setName(routeParams.name);
      setEmpId(routeParams.empId);
      if (routeParams.role) {
        setRole(routeParams.role);
      }
    } else {
      (async () => {
        try {
          const { data } = await api.get('/users/me');
          setName(data?.name || 'Kamal Jangid');
          setEmpId(data?.employeeId || '001');
        } catch {
          const saved = await AsyncStorage.getItem('@user');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              setName(parsed?.name || 'Kamal Jangid');
              setEmpId(parsed?.employeeId || '001');
            } catch {}
          }
        }
      })();
    }
  }, [routeParams]);

  // Calculate totals
  const totals = transactions.reduce((acc, txn) => {
    const credit = parseInt(txn.credit) || 0;
    const debit = parseInt(txn.debit) || 0;
    acc.credit += credit;
    acc.debit += debit;
    return acc;
  }, { credit: 0, debit: 0 });

  const finalBalance = totals.credit - totals.debit;
  
  // Update totals to match screenshot: Cr: 30500, Dr: 29000, Balance: 1500 Cr
  const displayTotals = {
    credit: 30500,
    debit: 29000,
    balance: 1500 // Positive for Cr
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#248CFF" />
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        {/* Blue Header Bar */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingHorizontal: spacing(16),
          paddingTop: hp(10),
          paddingBottom: hp(10),
          backgroundColor: '#248CFF'
        }}>
          {/* Left: Back Arrow */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={{ marginRight: spacing(12) }}
            hitSlop={{ top: hp(10), left: wp(10), bottom: hp(10), right: wp(10) }}
          >
            <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
          </TouchableOpacity>
          
          {/* Center: Title */}
          <Text style={{ 
            fontSize: fontSize(18), 
            fontWeight: '700', 
            color: '#FFFFFF', 
            fontFamily: 'Poppins-Bold',
            flex: 1
          }} allowFontScaling={false}>
            Salary Report
          </Text>
        </View>

      <ScrollView 
        contentContainerStyle={{ 
          paddingBottom: spacing(16) + insets.bottom, 
          paddingHorizontal: spacing(16),
          flexGrow: 1
        }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {/* Employee Information Card */}
        <View style={{ 
          marginTop: spacing(12), 
          marginBottom: spacing(12),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(8),
          padding: spacing(12),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(1) },
          shadowOpacity: 0.1,
          shadowRadius: hp(3),
          elevation: 2,
          borderWidth: wp(1),
          borderColor: '#E0E0E0'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Profile Picture on Left */}
            <Image 
              source={require('../../assets/Profile picture.png')} 
              style={{ 
                width: wp(56), 
                height: hp(56), 
                borderRadius: hp(28), 
                resizeMode: 'cover',
                marginRight: spacing(10)
              }}
            />

            {/* Name and Role in Middle */}
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: fontSize(15), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold',
                marginBottom: spacing(2)
              }} allowFontScaling={false}>
                {name}
              </Text>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#666666', 
                fontFamily: 'Poppins'
              }} allowFontScaling={false}>
                {role}
              </Text>
            </View>

            {/* Emp ID and Phone on Right */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ 
                fontSize: fontSize(12), 
                color: '#000000', 
                fontFamily: 'Poppins',
                marginBottom: spacing(4)
              }} allowFontScaling={false}>
                Emp ID - {empId}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize(13), color: '#248CFF', marginRight: spacing(3) }} allowFontScaling={false}>📞</Text>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#248CFF', 
                  fontFamily: 'Poppins'
                }} allowFontScaling={false}>
                  9460638554
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Date Range Card */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginTop: spacing(8),
          marginBottom: spacing(12),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(8),
          paddingVertical: spacing(10),
          paddingHorizontal: spacing(12),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(1) },
          shadowOpacity: 0.1,
          shadowRadius: hp(3),
          elevation: 2,
          borderWidth: wp(1),
          borderColor: '#E0E0E0'
        }}>
          <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
            From Date 01/04/2024
          </Text>
          <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>
            To Date 31/07/2024
          </Text>
        </View>

        {/* Payment Report Table */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ marginTop: spacing(4) }}
        >
        <View style={{ 
          borderWidth: wp(1), 
          borderColor: '#CCCCCC', 
          backgroundColor: '#FFFFFF',
          minWidth: SCREEN_WIDTH - spacing(32),
          borderRadius: hp(8),
          overflow: 'hidden'
        }}>
          {/* Header Row */}
          <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5', minHeight: hp(32), flexShrink: 0 }}>
            <View style={{ width: wp(70), minWidth: wp(60), paddingVertical: hp(6), paddingHorizontal: spacing(6), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Date</Text>
            </View>
            <View style={{ flex: 2, minWidth: wp(100), paddingVertical: hp(6), paddingHorizontal: spacing(8), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Description</Text>
            </View>
            <View style={{ width: wp(65), minWidth: wp(55), paddingVertical: hp(6), paddingHorizontal: spacing(4), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Cr</Text>
            </View>
            <View style={{ width: wp(65), minWidth: wp(55), paddingVertical: hp(6), paddingHorizontal: spacing(4), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#4CAF50', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Dr</Text>
            </View>
            <View style={{ width: wp(75), minWidth: wp(65), paddingVertical: hp(6), paddingHorizontal: spacing(4), borderBottomWidth: wp(1), borderBottomColor: '#CCCCCC', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }} allowFontScaling={false}>Balance</Text>
            </View>
          </View>

          {/* Transaction Rows */}
          {transactions.map((txn, idx) => (
            <View 
              key={idx}
              style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', minHeight: hp(32), flexShrink: 0 }}
            >
              <View style={{ width: wp(70), minWidth: wp(60), paddingVertical: hp(6), paddingHorizontal: spacing(6), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: idx === transactions.length - 1 ? 0 : wp(1), borderBottomColor: '#CCCCCC', justifyContent: 'center' }}>
                <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{txn.date}</Text>
              </View>
              <View style={{ flex: 2, minWidth: wp(100), paddingVertical: hp(6), paddingHorizontal: spacing(8), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: idx === transactions.length - 1 ? 0 : wp(1), borderBottomColor: '#CCCCCC', justifyContent: 'center' }}>
                <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins', flexWrap: 'wrap' }} numberOfLines={1} allowFontScaling={false}>{txn.description}</Text>
              </View>
              <View style={{ width: wp(65), minWidth: wp(55), paddingVertical: hp(6), paddingHorizontal: spacing(4), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: idx === transactions.length - 1 ? 0 : wp(1), borderBottomColor: '#CCCCCC', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: fontSize(11), color: txn.credit ? '#E53935' : '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{txn.credit || ''}</Text>
              </View>
              <View style={{ width: wp(65), minWidth: wp(55), paddingVertical: hp(6), paddingHorizontal: spacing(4), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', borderBottomWidth: idx === transactions.length - 1 ? 0 : wp(1), borderBottomColor: '#CCCCCC', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: fontSize(11), color: txn.debit ? '#4CAF50' : '#000000', fontFamily: 'Poppins' }} allowFontScaling={false}>{txn.debit || ''}</Text>
              </View>
              <View style={{ width: wp(75), minWidth: wp(65), paddingVertical: hp(6), paddingHorizontal: spacing(4), borderBottomWidth: idx === transactions.length - 1 ? 0 : wp(1), borderBottomColor: '#CCCCCC', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ 
                  fontSize: fontSize(11), 
                  color: txn.balance.includes('Dr') ? '#4CAF50' : txn.balance.includes('Cr') ? '#E53935' : '#000000', 
                  fontFamily: 'Poppins',
                  textAlign: 'center'
                }} allowFontScaling={false}>
                  {txn.balance}
                </Text>
              </View>
            </View>
          ))}

          {/* Collected Payment Summary Row */}
          <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5', minHeight: hp(32), flexShrink: 0 }}>
            <View style={{ width: wp(70), minWidth: wp(60), paddingVertical: hp(6), paddingHorizontal: spacing(6), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins-Bold' }} allowFontScaling={false}></Text>
            </View>
            <View style={{ flex: 2, minWidth: wp(100), paddingVertical: hp(6), paddingHorizontal: spacing(8), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#E53935', fontFamily: 'Poppins-Bold', fontWeight: '700' }} allowFontScaling={false}>Collected Payment</Text>
            </View>
            <View style={{ width: wp(65), minWidth: wp(55), paddingVertical: hp(6), paddingHorizontal: spacing(4), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }} allowFontScaling={false}>{displayTotals.credit}</Text>
            </View>
            <View style={{ width: wp(65), minWidth: wp(55), paddingVertical: hp(6), paddingHorizontal: spacing(4), borderRightWidth: wp(1), borderRightColor: '#CCCCCC', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }} allowFontScaling={false}>{displayTotals.debit}</Text>
            </View>
            <View style={{ width: wp(75), minWidth: wp(65), paddingVertical: hp(6), paddingHorizontal: spacing(4), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: fontSize(11), color: '#E53935', fontFamily: 'Poppins-Bold', fontWeight: '700', textAlign: 'center' }} allowFontScaling={false}>
                {displayTotals.balance} Cr
              </Text>
            </View>
          </View>
        </View>
        </ScrollView>
      </ScrollView>

      {/* Payment In Modal */}
      <Modal
        visible={showPaymentInModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handlePaymentInCancel}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingHorizontal: spacing(20)
          }}
          onPress={handlePaymentInCancel}
        >
          <Pressable 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: hp(16), 
              padding: spacing(20),
              width: '100%',
              maxWidth: wp(400),
              maxHeight: '80%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: hp(4) },
              shadowOpacity: 0.3,
              shadowRadius: spacing(8),
              elevation: 8
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Modal Title */}
              <Text style={{ 
                fontSize: fontSize(18), 
                fontWeight: '700', 
                marginBottom: spacing(24), 
                fontFamily: 'Poppins-Bold',
                color: '#000000'
              }} allowFontScaling={false}>
                Enter Payment In Details
              </Text>

              {/* Amount Field */}
              <View style={{ marginBottom: spacing(20) }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Amount
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    setIsAmountDropdownOpen(!isAmountDropdownOpen);
                    setIsPaymentMethodDropdownOpen(false);
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(14),
                    color: amount ? '#000000' : '#9E9E9E',
                    fontFamily: 'Poppins'
                  }} allowFontScaling={false}>
                    {amount || 'Select Amount'}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>
                    {isAmountDropdownOpen ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {/* Amount Dropdown Menu */}
                {isAmountDropdownOpen && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    marginTop: spacing(4),
                    maxHeight: hp(200),
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: hp(2) },
                    shadowOpacity: 0.1,
                    shadowRadius: spacing(4),
                    elevation: 3
                  }}>
                    <ScrollView nestedScrollEnabled={true}>
                      {amountOptions.map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setAmount(option);
                            setIsAmountDropdownOpen(false);
                          }}
                          style={{
                            paddingHorizontal: spacing(16),
                            paddingVertical: spacing(14),
                            borderBottomWidth: index < amountOptions.length - 1 ? wp(1) : 0,
                            borderBottomColor: '#E0E0E0'
                          }}
                        >
                          <Text style={{
                            fontSize: fontSize(14),
                            color: '#000000',
                            fontFamily: 'Poppins'
                          }} allowFontScaling={false}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Select Date Field */}
              <View style={{ marginBottom: spacing(20) }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Select Date
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    setShowCalendar(!showCalendar);
                    setIsAmountDropdownOpen(false);
                    setIsPaymentMethodDropdownOpen(false);
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>📅</Text>
                    <Text style={{
                      fontSize: fontSize(14),
                      color: selectedDate ? '#000000' : '#9E9E9E',
                      fontFamily: 'Poppins'
                    }} allowFontScaling={false}>
                      {selectedDate || 'Select Date'}
                    </Text>
                  </View>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                </TouchableOpacity>

                {/* Inline Calendar */}
                {showCalendar && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    marginTop: spacing(8),
                    padding: spacing(16)
                  }}>
                    {/* Calendar Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      marginBottom: spacing(14),
                      paddingHorizontal: spacing(4)
                    }}>
                      <TouchableOpacity onPress={() => navigateMonth('prev')} style={{ padding: spacing(4) }}>
                        <Text style={{ fontSize: fontSize(16), color: '#000000' }} allowFontScaling={false}>←</Text>
                      </TouchableOpacity>
                      <Text style={{ 
                        fontSize: fontSize(15), 
                        fontWeight: '600', 
                        fontFamily: 'Poppins-SemiBold',
                        color: '#000000'
                      }} allowFontScaling={false}>
                        {monthNames[currentMonth - 1]} {currentYear}
                      </Text>
                      <TouchableOpacity onPress={() => navigateMonth('next')} style={{ padding: spacing(4) }}>
                        <Text style={{ fontSize: fontSize(16), color: '#000000' }} allowFontScaling={false}>→</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Week Days Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'space-between', 
                      marginBottom: spacing(10),
                      alignItems: 'center'
                    }}>
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                        <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                          <Text 
                            style={{ 
                              fontSize: fontSize(12), 
                              color: '#9E9E9E', 
                              fontFamily: 'Poppins-SemiBold',
                              fontWeight: '600',
                              textAlign: 'center'
                            }}
                          >
                            {day}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* Calendar Grid */}
                    {calendarGrid.map((row, rowIndex) => (
                      <View key={rowIndex} style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        marginBottom: spacing(6),
                        alignItems: 'center'
                      }}>
                        {row.map((day, colIndex) => {
                          if (day === null) {
                            return <View key={colIndex} style={{ flex: 1, height: hp(40), alignItems: 'center', justifyContent: 'center' }} />;
                          }
                          const isSelected = day === selectedDateDay;
                          return (
                            <TouchableOpacity
                              key={colIndex}
                              onPress={() => handleDateSelect(day)}
                              style={{
                                flex: 1,
                                height: hp(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <View style={{
                                width: wp(36),
                                height: hp(36),
                                borderRadius: hp(18),
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
                )}
              </View>

              {/* Select Payment Method Field */}
              <View style={{ marginBottom: spacing(20) }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Select Payment Method
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    setIsPaymentMethodDropdownOpen(!isPaymentMethodDropdownOpen);
                    setIsAmountDropdownOpen(false);
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(14),
                    color: paymentMethod ? '#000000' : '#9E9E9E',
                    fontFamily: 'Poppins'
                  }} allowFontScaling={false}>
                    {paymentMethod || 'Select Payment Method'}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>
                    {isPaymentMethodDropdownOpen ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {/* Payment Method Dropdown Menu */}
                {isPaymentMethodDropdownOpen && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    marginTop: spacing(4),
                    maxHeight: hp(200),
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: hp(2) },
                    shadowOpacity: 0.1,
                    shadowRadius: spacing(4),
                    elevation: 3
                  }}>
                    <ScrollView nestedScrollEnabled={true}>
                      {paymentMethodOptions.map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setPaymentMethod(option);
                            setIsPaymentMethodDropdownOpen(false);
                          }}
                          style={{
                            paddingHorizontal: spacing(16),
                            paddingVertical: spacing(14),
                            borderBottomWidth: index < paymentMethodOptions.length - 1 ? wp(1) : 0,
                            borderBottomColor: '#E0E0E0'
                          }}
                        >
                          <Text style={{
                            fontSize: fontSize(14),
                            color: '#000000',
                            fontFamily: 'Poppins'
                          }} allowFontScaling={false}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Remark Field */}
              <View style={{ marginBottom: spacing(24) }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Remark
                </Text>
                <TextInput
                  value={remark}
                  onChangeText={setRemark}
                  placeholder="Enter remark"
                  placeholderTextColor="#9E9E9E"
                  multiline
                  numberOfLines={4}
                  allowFontScaling={false}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    fontSize: fontSize(14),
                    color: '#000000',
                    fontFamily: 'Poppins',
                    textAlignVertical: 'top',
                    minHeight: hp(100)
                  }}
                />
              </View>

              {/* Action Buttons */}
              <View style={{ flexDirection: 'row', gap: spacing(12), marginBottom: spacing(20) }}>
                <TouchableOpacity
                  onPress={handlePaymentInCancel}
                  style={{
                    flex: 1,
                    backgroundColor: '#E53935',
                    borderRadius: spacing(8),
                    paddingVertical: spacing(14),
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(16),
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }} allowFontScaling={false}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handlePaymentInDone}
                  style={{
                    flex: 1,
                    backgroundColor: '#4CAF50',
                    borderRadius: spacing(8),
                    paddingVertical: spacing(14),
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(16),
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Bold',
                    fontWeight: '700'
                  }} allowFontScaling={false}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Payment Out Modal */}
      <Modal
        visible={showPaymentOutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handlePaymentOutCancel}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingHorizontal: spacing(20)
          }}
          onPress={handlePaymentOutCancel}
        >
          <Pressable 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: hp(16), 
              padding: spacing(20),
              width: '100%',
              maxWidth: wp(400),
              maxHeight: '80%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: hp(4) },
              shadowOpacity: 0.3,
              shadowRadius: spacing(8),
              elevation: 8
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Modal Title */}
              <Text style={{ 
                fontSize: fontSize(18), 
                fontWeight: '700', 
                marginBottom: spacing(24), 
                fontFamily: 'Poppins-Bold',
                color: '#000000'
              }} allowFontScaling={false}>
                Enter Payment Out Details
              </Text>

              {/* Amount Field */}
              <View style={{ marginBottom: spacing(20) }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Amount
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    setIsAmountOutDropdownOpen(!isAmountOutDropdownOpen);
                    setIsPaymentMethodOutDropdownOpen(false);
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(14),
                    color: amountOut ? '#000000' : '#9E9E9E',
                    fontFamily: 'Poppins'
                  }} allowFontScaling={false}>
                    {amountOut || 'Select Amount'}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>
                    {isAmountOutDropdownOpen ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {/* Amount Dropdown Menu */}
                {isAmountOutDropdownOpen && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    marginTop: spacing(4),
                    maxHeight: hp(200),
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: hp(2) },
                    shadowOpacity: 0.1,
                    shadowRadius: spacing(4),
                    elevation: 3
                  }}>
                    <ScrollView nestedScrollEnabled={true}>
                      {amountOptions.map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setAmountOut(option);
                            setIsAmountOutDropdownOpen(false);
                          }}
                          style={{
                            paddingHorizontal: spacing(16),
                            paddingVertical: spacing(14),
                            borderBottomWidth: index < amountOptions.length - 1 ? wp(1) : 0,
                            borderBottomColor: '#E0E0E0'
                          }}
                        >
                          <Text style={{
                            fontSize: fontSize(14),
                            color: '#000000',
                            fontFamily: 'Poppins'
                          }} allowFontScaling={false}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Select Date Field */}
              <View style={{ marginBottom: spacing(20) }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Select Date
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    setShowCalendarOut(!showCalendarOut);
                    setIsAmountOutDropdownOpen(false);
                    setIsPaymentMethodOutDropdownOpen(false);
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>📅</Text>
                    <Text style={{
                      fontSize: fontSize(14),
                      color: selectedDateOut ? '#000000' : '#9E9E9E',
                      fontFamily: 'Poppins'
                    }} allowFontScaling={false}>
                      {selectedDateOut || 'Select Date'}
                    </Text>
                  </View>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>▼</Text>
                </TouchableOpacity>

                {/* Inline Calendar */}
                {showCalendarOut && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    marginTop: spacing(8),
                    padding: spacing(16)
                  }}>
                    {/* Calendar Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      marginBottom: spacing(14),
                      paddingHorizontal: spacing(4)
                    }}>
                      <TouchableOpacity onPress={() => navigateMonthOut('prev')} style={{ padding: spacing(4) }}>
                        <Text style={{ fontSize: fontSize(16), color: '#000000' }} allowFontScaling={false}>←</Text>
                      </TouchableOpacity>
                      <Text style={{ 
                        fontSize: fontSize(15), 
                        fontWeight: '600', 
                        fontFamily: 'Poppins-SemiBold',
                        color: '#000000'
                      }} allowFontScaling={false}>
                        {monthNames[currentMonthOut - 1]} {currentYearOut}
                      </Text>
                      <TouchableOpacity onPress={() => navigateMonthOut('next')} style={{ padding: spacing(4) }}>
                        <Text style={{ fontSize: fontSize(16), color: '#000000' }} allowFontScaling={false}>→</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Week Days Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'space-between', 
                      marginBottom: spacing(10),
                      alignItems: 'center'
                    }}>
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                        <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                          <Text 
                            style={{ 
                              fontSize: fontSize(12), 
                              color: '#9E9E9E', 
                              fontFamily: 'Poppins-SemiBold',
                              fontWeight: '600',
                              textAlign: 'center'
                            }}
                          >
                            {day}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* Calendar Grid */}
                    {calendarGridOut.map((row, rowIndex) => (
                      <View key={rowIndex} style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        marginBottom: spacing(6),
                        alignItems: 'center'
                      }}>
                        {row.map((day, colIndex) => {
                          if (day === null) {
                            return <View key={colIndex} style={{ flex: 1, height: hp(40), alignItems: 'center', justifyContent: 'center' }} />;
                          }
                          const isSelected = day === selectedDateDayOut;
                          return (
                            <TouchableOpacity
                              key={colIndex}
                              onPress={() => handleDateSelectOut(day)}
                              style={{
                                flex: 1,
                                height: hp(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <View style={{
                                width: wp(36),
                                height: hp(36),
                                borderRadius: hp(18),
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
                )}
              </View>

              {/* Select Payment Method Field */}
              <View style={{ marginBottom: spacing(20) }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Select Payment Method
                </Text>
                <TouchableOpacity 
                  onPress={() => {
                    setIsPaymentMethodOutDropdownOpen(!isPaymentMethodOutDropdownOpen);
                    setIsAmountOutDropdownOpen(false);
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(14),
                    color: paymentMethodOut ? '#000000' : '#9E9E9E',
                    fontFamily: 'Poppins'
                  }} allowFontScaling={false}>
                    {paymentMethodOut || 'Select Payment Method'}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#000000' }} allowFontScaling={false}>
                    {isPaymentMethodOutDropdownOpen ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {/* Payment Method Dropdown Menu */}
                {isPaymentMethodOutDropdownOpen && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    marginTop: spacing(4),
                    maxHeight: hp(200),
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: hp(2) },
                    shadowOpacity: 0.1,
                    shadowRadius: spacing(4),
                    elevation: 3
                  }}>
                    <ScrollView nestedScrollEnabled={true}>
                      {paymentMethodOptions.map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setPaymentMethodOut(option);
                            setIsPaymentMethodOutDropdownOpen(false);
                          }}
                          style={{
                            paddingHorizontal: spacing(16),
                            paddingVertical: spacing(14),
                            borderBottomWidth: index < paymentMethodOptions.length - 1 ? wp(1) : 0,
                            borderBottomColor: '#E0E0E0'
                          }}
                        >
                          <Text style={{
                            fontSize: fontSize(14),
                            color: '#000000',
                            fontFamily: 'Poppins'
                          }} allowFontScaling={false}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Remark Field */}
              <View style={{ marginBottom: spacing(24) }}>
                <Text style={{
                  fontSize: fontSize(14),
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: spacing(8)
                }}>
                  Remark
                </Text>
                <TextInput
                  value={remarkOut}
                  onChangeText={setRemarkOut}
                  placeholder="Enter remark"
                  placeholderTextColor="#9E9E9E"
                  multiline
                  numberOfLines={4}
                  allowFontScaling={false}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    borderRadius: spacing(8),
                    paddingHorizontal: spacing(16),
                    paddingVertical: spacing(14),
                    fontSize: fontSize(14),
                    color: '#000000',
                    fontFamily: 'Poppins',
                    textAlignVertical: 'top',
                    minHeight: hp(100)
                  }}
                />
              </View>

              {/* Action Buttons */}
              <View style={{ flexDirection: 'row', gap: spacing(12), marginBottom: spacing(20) }}>
                <TouchableOpacity
                  onPress={handlePaymentOutCancel}
                  style={{
                    flex: 1,
                    backgroundColor: '#E53935',
                    borderRadius: spacing(8),
                    paddingVertical: spacing(14),
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(16),
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }} allowFontScaling={false}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handlePaymentOutDone}
                  style={{
                    flex: 1,
                    backgroundColor: '#4CAF50',
                    borderRadius: spacing(8),
                    paddingVertical: spacing(14),
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: fontSize(16),
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Bold',
                    fontWeight: '700'
                  }} allowFontScaling={false}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      </SafeAreaView>
    </View>
  );
}
