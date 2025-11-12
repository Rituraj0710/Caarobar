import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Modal, Pressable, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';

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
  { date: '31/09/24', description: '09 - Salary', credit: '14500', debit: '', balance: '15000 Cr' },
  { date: '07/10/24', description: 'Cash', credit: '', debit: '17000', balance: '1500 Dr' },
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
  
  // Update totals to match screenshot: Cr: 43500, Dr: 45000, Balance: 1500 Dr
  const displayTotals = {
    credit: 43500,
    debit: 45000,
    balance: -1500 // Negative for Dr
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Top Navigation Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 44,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF'
      }}>
        {/* Left: Back Arrow and Logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginRight: 8 }}>
            <Text style={{ fontSize: 20, color: '#000000' }}>←</Text>
          </TouchableOpacity>
          <Image 
            source={require('../../assets/caarobar (2) 1.png')} 
            style={{ width: 120, height: 40, resizeMode: 'contain' }} 
          />
        </View>

        {/* Right: Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Bell with notification dot */}
          <View style={{ position: 'relative', marginRight: 12 }}>
            <TouchableOpacity style={{ padding: 4 }}>
              <Image 
                source={require('../../assets/Frame.png')} 
                style={{ width: 22, height: 22, resizeMode: 'contain' }} 
              />
            </TouchableOpacity>
            <View style={{ 
              position: 'absolute', 
              right: 2, 
              top: 4, 
              width: 8, 
              height: 8, 
              borderRadius: 4, 
              backgroundColor: '#4CAF50' 
            }} />
          </View>

          {/* Search Icon */}
          <TouchableOpacity style={{ padding: 4, marginRight: 12 }}>
            <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#000000' }}>🔍</Text>
            </View>
          </TouchableOpacity>

          {/* Menu (three dots) */}
          <TouchableOpacity style={{ padding: 4 }}>
            <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#000000', lineHeight: 16 }}>⋮</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User and Company Information Section */}
        <View style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: 12, 
          padding: 16, 
          marginTop: 12,
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 }, 
          shadowOpacity: 0.05, 
          shadowRadius: 6, 
          elevation: 2 
        }}>
          {/* Three Column Layout: Logo | Profile | Company Details */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
            {/* Left: Company Logo */}
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: 120, height: 30, resizeMode: 'contain' }} 
              />
            </View>

            {/* Center: Employee Profile */}
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8 }}>
              {/* Profile Picture */}
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 70, height: 70, borderRadius: 35, marginBottom: 8 }} 
              />
              
              {/* Name with menu icon to the right */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginRight: 6 }}>
                  {name}
                </Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                </TouchableOpacity>
              </View>

              {/* Role */}
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins', textAlign: 'center' }}>
                {role}
              </Text>
            </View>

            {/* Right: Company Details (left-aligned within right column) */}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins', textAlign: 'left', lineHeight: 18 }}>
                  Creative Designers{'\n'}Radhakishanpura, Sikar{'\n'}+919460638554
                </Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Joining Date and Report Title Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 8 }}>
            {/* Joining Date - Left */}
            <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
              Joining 01/11/23
            </Text>

            {/* PAYMENT REPORT - Centered */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '700', 
                color: '#E53935', 
                fontFamily: 'Poppins-Bold',
                textDecorationLine: 'underline'
              }}>
                PAYMENT REPORT
              </Text>
            </View>

            {/* Emp ID - Right aligned */}
            <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins' }}>
              Emp id - {empId}
            </Text>
          </View>
        </View>

        {/* Date Range Header */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginTop: 16,
          marginBottom: 12,
          paddingHorizontal: 4
        }}>
          <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
            From Date 01/04/2024
          </Text>
          <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>
            To Date 31/07/2024
          </Text>
        </View>

        {/* Payment Report Table */}
        <View style={{ 
          marginTop: 8, 
          borderWidth: 1, 
          borderColor: '#CCCCCC', 
          backgroundColor: '#FFFFFF'
        }}>
          {/* Header Row */}
          <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Date</Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Description</Text>
            </View>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Cr</Text>
            </View>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#4CAF50', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Dr</Text>
            </View>
            <View style={{ width: 90, paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Balance</Text>
            </View>
          </View>

          {/* Transaction Rows */}
          {transactions.map((txn, idx) => (
            <View 
              key={idx}
              style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}
            >
              <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>{txn.date}</Text>
              </View>
              <View style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC' }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins' }}>{txn.description}</Text>
              </View>
              <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
                <Text style={{ fontSize: 13, color: txn.credit ? '#E53935' : '#000000', fontFamily: 'Poppins' }}>{txn.credit || ''}</Text>
              </View>
              <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
                <Text style={{ fontSize: 13, color: txn.debit ? '#4CAF50' : '#000000', fontFamily: 'Poppins' }}>{txn.debit || ''}</Text>
              </View>
              <View style={{ width: 90, paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: 13, 
                  color: txn.balance.includes('Dr') ? '#4CAF50' : txn.balance.includes('Cr') ? '#E53935' : '#000000', 
                  fontFamily: 'Poppins' 
                }}>
                  {txn.balance}
                </Text>
              </View>
            </View>
          ))}

          {/* Collected Payment Summary Row */}
          <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-Bold' }}></Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 12, borderRightWidth: 1, borderRightColor: '#CCCCCC' }}>
              <Text style={{ fontSize: 13, color: '#E53935', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>Collected Payment</Text>
            </View>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>{displayTotals.credit}</Text>
            </View>
            <View style={{ width: 80, paddingVertical: 12, paddingHorizontal: 8, borderRightWidth: 1, borderRightColor: '#CCCCCC', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>{displayTotals.debit}</Text>
            </View>
            <View style={{ width: 90, paddingVertical: 12, paddingHorizontal: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 13, color: displayTotals.balance < 0 ? '#4CAF50' : '#E53935', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>
                {displayTotals.balance > 0 ? `${displayTotals.balance} Cr` : displayTotals.balance < 0 ? `${Math.abs(displayTotals.balance)} Dr` : 'Nill'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons - Fixed at Bottom */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 34,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }}>
        {/* Payment In Button */}
        <TouchableOpacity
          onPress={() => setShowPaymentInModal(true)}
          style={{
            flex: 1,
            backgroundColor: '#4CAF50',
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{
            fontSize: 16,
            color: '#FFFFFF',
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }}>
            Payment In
          </Text>
        </TouchableOpacity>

        {/* Payment Out Button */}
        <TouchableOpacity
          onPress={() => setShowPaymentOutModal(true)}
          style={{
            flex: 1,
            backgroundColor: '#E53935',
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{
            fontSize: 16,
            color: '#FFFFFF',
            fontFamily: 'Poppins-Bold',
            fontWeight: '700'
          }}>
            Payment Out
          </Text>
        </TouchableOpacity>
      </View>

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
            paddingHorizontal: 20
          }}
          onPress={handlePaymentInCancel}
        >
          <Pressable 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: 16, 
              padding: 20,
              width: '100%',
              maxWidth: 400,
              maxHeight: '80%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Modal Title */}
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '700', 
                marginBottom: 24, 
                fontFamily: 'Poppins-Bold',
                color: '#000000'
              }}>
                Enter Payment In Details
              </Text>

              {/* Amount Field */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: 8
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
                    color: amount ? '#000000' : '#9E9E9E',
                    fontFamily: 'Poppins'
                  }}>
                    {amount || 'Select Amount'}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#000000' }}>
                    {isAmountDropdownOpen ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {/* Amount Dropdown Menu */}
                {isAmountDropdownOpen && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 8,
                    marginTop: 4,
                    maxHeight: 200,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
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
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderBottomWidth: index < amountOptions.length - 1 ? 1 : 0,
                            borderBottomColor: '#E0E0E0'
                          }}
                        >
                          <Text style={{
                            fontSize: 14,
                            color: '#000000',
                            fontFamily: 'Poppins'
                          }}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Select Date Field */}
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
                  onPress={() => {
                    setShowCalendar(!showCalendar);
                    setIsAmountDropdownOpen(false);
                    setIsPaymentMethodDropdownOpen(false);
                  }}
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
                    <Text style={{ fontSize: 16, color: '#000000', marginRight: 8 }}>📅</Text>
                    <Text style={{
                      fontSize: 14,
                      color: selectedDate ? '#000000' : '#9E9E9E',
                      fontFamily: 'Poppins'
                    }}>
                      {selectedDate || 'Select Date'}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 12, color: '#000000' }}>▼</Text>
                </TouchableOpacity>

                {/* Inline Calendar */}
                {showCalendar && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 8,
                    marginTop: 8,
                    padding: 16
                  }}>
                    {/* Calendar Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      marginBottom: 14,
                      paddingHorizontal: 4
                    }}>
                      <TouchableOpacity onPress={() => navigateMonth('prev')} style={{ padding: 4 }}>
                        <Text style={{ fontSize: 16, color: '#000000' }}>←</Text>
                      </TouchableOpacity>
                      <Text style={{ 
                        fontSize: 15, 
                        fontWeight: '600', 
                        fontFamily: 'Poppins-SemiBold',
                        color: '#000000'
                      }}>
                        {monthNames[currentMonth - 1]} {currentYear}
                      </Text>
                      <TouchableOpacity onPress={() => navigateMonth('next')} style={{ padding: 4 }}>
                        <Text style={{ fontSize: 16, color: '#000000' }}>→</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Week Days Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'space-between', 
                      marginBottom: 10,
                      alignItems: 'center'
                    }}>
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                        <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                          <Text 
                            style={{ 
                              fontSize: 12, 
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
                        marginBottom: 6,
                        alignItems: 'center'
                      }}>
                        {row.map((day, colIndex) => {
                          if (day === null) {
                            return <View key={colIndex} style={{ flex: 1, height: 40, alignItems: 'center', justifyContent: 'center' }} />;
                          }
                          const isSelected = day === selectedDateDay;
                          return (
                            <TouchableOpacity
                              key={colIndex}
                              onPress={() => handleDateSelect(day)}
                              style={{
                                flex: 1,
                                height: 40,
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
                                  fontSize: 14,
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
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: 8
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
                    color: paymentMethod ? '#000000' : '#9E9E9E',
                    fontFamily: 'Poppins'
                  }}>
                    {paymentMethod || 'Select Payment Method'}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#000000' }}>
                    {isPaymentMethodDropdownOpen ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {/* Payment Method Dropdown Menu */}
                {isPaymentMethodDropdownOpen && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 8,
                    marginTop: 4,
                    maxHeight: 200,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
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
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderBottomWidth: index < paymentMethodOptions.length - 1 ? 1 : 0,
                            borderBottomColor: '#E0E0E0'
                          }}
                        >
                          <Text style={{
                            fontSize: 14,
                            color: '#000000',
                            fontFamily: 'Poppins'
                          }}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Remark Field */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: 8
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
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'Poppins',
                    textAlignVertical: 'top',
                    minHeight: 100
                  }}
                />
              </View>

              {/* Action Buttons */}
              <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={handlePaymentInCancel}
                  style={{
                    flex: 1,
                    backgroundColor: '#E53935',
                    borderRadius: 8,
                    paddingVertical: 14,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handlePaymentInDone}
                  style={{
                    flex: 1,
                    backgroundColor: '#4CAF50',
                    borderRadius: 8,
                    paddingVertical: 14,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Bold',
                    fontWeight: '700'
                  }}>
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
            paddingHorizontal: 20
          }}
          onPress={handlePaymentOutCancel}
        >
          <Pressable 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: 16, 
              padding: 20,
              width: '100%',
              maxWidth: 400,
              maxHeight: '80%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Modal Title */}
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '700', 
                marginBottom: 24, 
                fontFamily: 'Poppins-Bold',
                color: '#000000'
              }}>
                Enter Payment Out Details
              </Text>

              {/* Amount Field */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: 8
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
                    color: amountOut ? '#000000' : '#9E9E9E',
                    fontFamily: 'Poppins'
                  }}>
                    {amountOut || 'Select Amount'}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#000000' }}>
                    {isAmountOutDropdownOpen ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {/* Amount Dropdown Menu */}
                {isAmountOutDropdownOpen && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 8,
                    marginTop: 4,
                    maxHeight: 200,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
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
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderBottomWidth: index < amountOptions.length - 1 ? 1 : 0,
                            borderBottomColor: '#E0E0E0'
                          }}
                        >
                          <Text style={{
                            fontSize: 14,
                            color: '#000000',
                            fontFamily: 'Poppins'
                          }}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Select Date Field */}
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
                  onPress={() => {
                    setShowCalendarOut(!showCalendarOut);
                    setIsAmountOutDropdownOpen(false);
                    setIsPaymentMethodOutDropdownOpen(false);
                  }}
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
                    <Text style={{ fontSize: 16, color: '#000000', marginRight: 8 }}>📅</Text>
                    <Text style={{
                      fontSize: 14,
                      color: selectedDateOut ? '#000000' : '#9E9E9E',
                      fontFamily: 'Poppins'
                    }}>
                      {selectedDateOut || 'Select Date'}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 12, color: '#000000' }}>▼</Text>
                </TouchableOpacity>

                {/* Inline Calendar */}
                {showCalendarOut && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 8,
                    marginTop: 8,
                    padding: 16
                  }}>
                    {/* Calendar Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      marginBottom: 14,
                      paddingHorizontal: 4
                    }}>
                      <TouchableOpacity onPress={() => navigateMonthOut('prev')} style={{ padding: 4 }}>
                        <Text style={{ fontSize: 16, color: '#000000' }}>←</Text>
                      </TouchableOpacity>
                      <Text style={{ 
                        fontSize: 15, 
                        fontWeight: '600', 
                        fontFamily: 'Poppins-SemiBold',
                        color: '#000000'
                      }}>
                        {monthNames[currentMonthOut - 1]} {currentYearOut}
                      </Text>
                      <TouchableOpacity onPress={() => navigateMonthOut('next')} style={{ padding: 4 }}>
                        <Text style={{ fontSize: 16, color: '#000000' }}>→</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Week Days Header */}
                    <View style={{ 
                      flexDirection: 'row', 
                      justifyContent: 'space-between', 
                      marginBottom: 10,
                      alignItems: 'center'
                    }}>
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                        <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                          <Text 
                            style={{ 
                              fontSize: 12, 
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
                        marginBottom: 6,
                        alignItems: 'center'
                      }}>
                        {row.map((day, colIndex) => {
                          if (day === null) {
                            return <View key={colIndex} style={{ flex: 1, height: 40, alignItems: 'center', justifyContent: 'center' }} />;
                          }
                          const isSelected = day === selectedDateDayOut;
                          return (
                            <TouchableOpacity
                              key={colIndex}
                              onPress={() => handleDateSelectOut(day)}
                              style={{
                                flex: 1,
                                height: 40,
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
                                  fontSize: 14,
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
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: 8
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
                    color: paymentMethodOut ? '#000000' : '#9E9E9E',
                    fontFamily: 'Poppins'
                  }}>
                    {paymentMethodOut || 'Select Payment Method'}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#000000' }}>
                    {isPaymentMethodOutDropdownOpen ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>

                {/* Payment Method Dropdown Menu */}
                {isPaymentMethodOutDropdownOpen && (
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 8,
                    marginTop: 4,
                    maxHeight: 200,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
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
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderBottomWidth: index < paymentMethodOptions.length - 1 ? 1 : 0,
                            borderBottomColor: '#E0E0E0'
                          }}
                        >
                          <Text style={{
                            fontSize: 14,
                            color: '#000000',
                            fontFamily: 'Poppins'
                          }}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Remark Field */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#4285F4',
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  marginBottom: 8
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
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: '#E0E0E0',
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'Poppins',
                    textAlignVertical: 'top',
                    minHeight: 100
                  }}
                />
              </View>

              {/* Action Buttons */}
              <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={handlePaymentOutCancel}
                  style={{
                    flex: 1,
                    backgroundColor: '#E53935',
                    borderRadius: 8,
                    paddingVertical: 14,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handlePaymentOutDone}
                  style={{
                    flex: 1,
                    backgroundColor: '#4CAF50',
                    borderRadius: 8,
                    paddingVertical: 14,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{
                    fontSize: 16,
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Bold',
                    fontWeight: '700'
                  }}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

    </View>
  );
}
