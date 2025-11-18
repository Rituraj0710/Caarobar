import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, Switch, Modal, TextInput, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, tableCellWidth } from '../utils/responsive';
import BackButton from '../components/BackButton';

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
  Calendar: undefined;
  Contacts: undefined;
  Tasks: undefined;
  EmployeeManagement: undefined;
  EmployeeDetail: {
    employeeId: string;
    name: string;
    role: string;
    empId: string;
    salary?: string;
    company?: string;
    location?: string;
    phone?: string;
    joiningDate?: string;
    endDate?: string;
    progress?: number;
    progressDays?: number;
  };
  AdminLeaveRequestDetail: {
    employeeId: string;
    employeeName: string;
    leaveType?: string;
    requestDate?: string;
    startOffDate?: string;
    day?: string;
    approvedBy?: string;
    status?: string;
    reason?: string;
  };
  AdminPaymentRequestDetail: {
    employeeId: string;
    employeeName: string;
    paymentType?: string;
    requestDate?: string;
    requestedDate?: string;
    amount?: string;
    approvedBy?: string;
    status?: string;
    reason?: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'EmployeeManagement'>;

interface Employee {
  id: string;
  name: string;
  startTime?: string;
  endTime?: string;
  leaveTime?: string;
  leaveDuration?: string;
  leaveDurationColor?: string;
  paymentTime?: string;
  paymentAmount?: string;
  paymentAmountColor?: string;
  showRejectIcon?: boolean;
  expenseDate?: string;
  expenseDateColor?: string;
  expenseAmount?: string;
  expenseAmountColor?: string;
  expenseStatusIcon?: 'checkmark' | 'minus' | 'x' | null;
}

const employees: Employee[] = [
  { id: '1', name: 'Kamal Kishore Jangid', startTime: '08:00 am', endTime: '07:30 pm' },
  { id: '2', name: 'Kamal Kishore Jangid', startTime: '08:00 am', endTime: '07:30 pm' },
  { id: '3', name: 'Kamal Kishore Jangid', startTime: '08:00 am', endTime: '07:30 pm' },
  { id: '4', name: 'Kamal Kishore Jangid', startTime: '08:00 am', endTime: '07:30 pm' },
  { id: '5', name: 'Kamal Kishore Jangid', startTime: '08:00 am', endTime: '07:30 pm' },
];

const leaveEmployees: Employee[] = [
  { id: '1', name: 'Kamal Kishore Jangid', leaveTime: '8:00 pm', leaveDuration: '1 Day', leaveDurationColor: '#4CAF50' },
  { id: '2', name: 'Kamal Kishore Jangid', leaveTime: '8:00 pm', leaveDuration: 'Half Day', leaveDurationColor: '#4CAF50' },
  { id: '3', name: 'Kamal Kishore Jangid', leaveTime: '8:00 pm', leaveDuration: '2 Hours', leaveDurationColor: '#9E9E9E' },
  { id: '4', name: 'Kamal Kishore Jangid', leaveTime: '8:00 pm', leaveDuration: '1 Day', leaveDurationColor: '#4CAF50' },
  { id: '5', name: 'Kamal Kishore Jangid', leaveTime: '8:00 pm', leaveDuration: '7 Day', leaveDurationColor: '#9E9E9E' },
];

const paymentEmployees: Employee[] = [
  { id: '1', name: 'Kamal Kishore Jangid', paymentTime: '8:00 pm', paymentAmount: '2000 /-', paymentAmountColor: '#9E9E9E' },
  { id: '2', name: 'Kamal Kishore Jangid', paymentTime: '8:00 pm', paymentAmount: '2000 /-', paymentAmountColor: '#9E9E9E' },
  { id: '3', name: 'Kamal Kishore Jangid', paymentTime: '8:00 pm', paymentAmount: '2000 /-', paymentAmountColor: '#9E9E9E' },
  { id: '4', name: 'Kamal Kishore Jangid', paymentTime: '8:00 pm', paymentAmount: '2000 /-', paymentAmountColor: '#9E9E9E', showRejectIcon: true },
  { id: '5', name: 'Kamal Kishore Jangid', paymentTime: '8:00 pm', paymentAmount: '2000 /-', paymentAmountColor: '#4CAF50' },
];

const expenseEmployees: Employee[] = [
  { id: '1', name: 'Kamal Kishore Jangid', expenseDate: '01/01/2025', expenseDateColor: '#000000', expenseAmount: '2000 /-', expenseAmountColor: '#4CAF50', expenseStatusIcon: null },
  { id: '2', name: 'Kamal Kishore Jangid', expenseDate: '05/01/2025', expenseDateColor: '#9E9E9E', expenseAmount: '2000 /-', expenseAmountColor: '#9E9E9E', expenseStatusIcon: 'checkmark' },
  { id: '3', name: 'Kamal Kishore Jangid', expenseDate: '06/01/2025', expenseDateColor: '#9E9E9E', expenseAmount: '2000 /-', expenseAmountColor: '#9E9E9E', expenseStatusIcon: 'minus' },
  { id: '4', name: 'Kamal Kishore Jangid', expenseDate: '10/01/2025', expenseDateColor: '#9E9E9E', expenseAmount: '2000 /-', expenseAmountColor: '#9E9E9E', expenseStatusIcon: 'x' },
  { id: '5', name: 'Kamal Kishore Jangid', expenseDate: '15/01/2025', expenseDateColor: '#000000', expenseAmount: '2000 /-', expenseAmountColor: '#4CAF50', expenseStatusIcon: null },
];

interface BranchData {
  sno: string;
  site: string;
  empPlus: string;
  payment: string;
}

const branchData: BranchData[] = [
  { sno: '01', site: 'Hotel La Nature', empPlus: '06', payment: '5200 Dr.' },
  { sno: '02', site: 'Sikar', empPlus: '02', payment: '40000 Dr.' },
  { sno: '03', site: 'Khatushyam Ji', empPlus: '01', payment: '12000 Dr.' },
  { sno: '04', site: 'Jaipur', empPlus: '140', payment: '140000 Dr.' },
  { sno: '05', site: 'Site', empPlus: '03', payment: '30000 Dr.' },
  { sno: '06', site: 'Site', empPlus: '05', payment: '50000 Dr.' },
];

interface SalaryEmployee {
  id: string;
  name: string;
  role: string;
  empId: string;
  salary: string;
}

const salaryEmployees: SalaryEmployee[] = [
  { id: '1', name: 'Kamal Jangid', role: 'CEO', empId: '001', salary: '30000 Dr' },
  { id: '2', name: 'Nikhil Jangid', role: 'Supervisor', empId: '002', salary: '20000 Dr' },
  { id: '3', name: 'Lucky Jangid', role: 'Manager', empId: '003', salary: '21000 Dr' },
  { id: '4', name: 'Rampal Jangid', role: 'Driver', empId: '004', salary: '18000 Dr' },
  { id: '5', name: 'Naresh Jangid', role: 'Driver', empId: '005', salary: '18000 Dr' },
  { id: '6', name: 'Yogesh Jangid', role: 'Driver', empId: '006', salary: '18000 Dr' },
  { id: '7', name: 'Suresh Jangid', role: 'Salesman', empId: '007', salary: '15000 Dr' },
  { id: '8', name: 'Mahesh Jangid', role: 'Salesman', empId: '008', salary: '15000 Dr' },
  { id: '9', name: 'Rajesh Jangid', role: 'Carpenter', empId: '009', salary: '16000 Dr' },
  { id: '10', name: 'Mukesh Jangid', role: 'Carpenter', empId: '010', salary: '16000 Dr' },
  { id: '11', name: 'Dinesh Jangid', role: 'Accountant', empId: '011', salary: '22000 Dr' },
  { id: '12', name: 'Hitesh Jangid', role: 'Accountant', empId: '012', salary: '22000 Dr' },
  { id: '13', name: 'Amit Jangid', role: 'HR', empId: '013', salary: '25000 Dr' },
  { id: '14', name: 'Sumit Jangid', role: 'HR', empId: '014', salary: '25000 Dr' },
  { id: '15', name: 'Rohit Jangid', role: 'Security Guard', empId: '015', salary: '12000 Dr' },
  { id: '16', name: 'Mohit Jangid', role: 'Security Guard', empId: '016', salary: '12000 Dr' },
  { id: '17', name: 'Vikash Jangid', role: 'Team Supervisor', empId: '017', salary: '19000 Dr' },
  { id: '18', name: 'Prakash Jangid', role: 'Team Supervisor', empId: '018', salary: '19000 Dr' },
  { id: '19', name: 'Ashok Jangid', role: 'Manager', empId: '019', salary: '21000 Dr' },
  { id: '20', name: 'Ramesh Jangid', role: 'Supervisor', empId: '020', salary: '20000 Dr' },
];

interface LocationEmployee {
  id: string;
  name: string;
  empId: string;
  role: string;
  km?: string;
  kmColor?: string;
  speed?: string;
  speedColor?: string;
  hasAlert?: boolean;
}

const locationEmployees: LocationEmployee[] = [
  { id: '1', name: 'Rampal Jangid', empId: '04', role: 'Driver' },
  { id: '2', name: 'Naresh Jangid', empId: '05', role: 'Driver' },
  { id: '3', name: 'Yogesh Jangid', empId: '07', role: 'Driver' },
];

const locationSalesmen: LocationEmployee[] = [
  { id: '1', name: 'Rampal Jangid', empId: '06', role: 'Salesman' },
];

const locationLiveEmployees: LocationEmployee[] = [
  { id: '1', name: 'Kamal Kishore Jangid', empId: '001', role: 'Carpenter' },
  { id: '2', name: 'Lucky Jangid', empId: '02', role: 'Accountant' },
  { id: '3', name: 'Nikhil Jangid', empId: '03', role: 'Manager' },
  { id: '4', name: 'Rampal Jangid', empId: '04', role: 'Driver' },
  { id: '5', name: 'Naresh Jangid', empId: '05', role: 'Driver' },
  { id: '6', name: 'Rampal Jangid', empId: '06', role: 'Salesman' },
];

const locationKilometerEmployees: LocationEmployee[] = [
  { id: '1', name: 'Kamal Kishore Jangid', empId: '001', role: 'Carpenter', km: '03', kmColor: '#000000', hasAlert: false },
  { id: '2', name: 'Lucky Jangid', empId: '02', role: 'Accountant', km: '01', kmColor: '#000000', hasAlert: false },
  { id: '3', name: 'Nikhil Jangid', empId: '03', role: 'Manager', km: '00', kmColor: '#000000', hasAlert: false },
  { id: '4', name: 'Rampal Jangid', empId: '04', role: 'Driver', km: '103', kmColor: '#FF5252', hasAlert: true },
  { id: '5', name: 'Naresh Jangid', empId: '05', role: 'Driver', km: '70', kmColor: '#000000', hasAlert: false },
  { id: '6', name: 'Rampal Jangid', empId: '06', role: 'Salesman', km: '150', kmColor: '#FF5252', hasAlert: true },
];

const locationSpeedometerEmployees: LocationEmployee[] = [
  { id: '1', name: 'Kamal Kishore Jangid', empId: '01', role: 'CEO', speed: '120', speedColor: '#FF5252', hasAlert: false },
  { id: '2', name: 'Lucky Jangid', empId: '02', role: 'Accountant', speed: '50', speedColor: '#000000', hasAlert: false },
  { id: '3', name: 'Nikhil Jangid', empId: '03', role: 'Manager', speed: '30', speedColor: '#000000', hasAlert: false },
  { id: '4', name: 'Rampal Jangid', empId: '04', role: 'Driver', speed: '70', speedColor: '#000000', hasAlert: false },
  { id: '5', name: 'Naresh Jangid', empId: '05', role: 'Driver', speed: '90', speedColor: '#FF5252', hasAlert: true },
  { id: '6', name: 'Rampal Jangid', empId: '06', role: 'Salesman', speed: '135', speedColor: '#FF5252', hasAlert: true },
];

export default function EmployeeManagementScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState('Live');
  const [activeBottomTab, setActiveBottomTab] = useState('Home');
  const [activeLocationFilter, setActiveLocationFilter] = useState('Driver');
  const [activeRole, setActiveRole] = useState('Admin');
  const [powerOfTeamSettings, setPowerOfTeamSettings] = useState({
    salary: true,
    sound: true,
    history: true,
    editing: true,
    location: true,
    kilometer: true,
    timeline: true,
    speed: true,
    teamControl: true,
    teamEdit: true,
  });
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Role-based feature lists
  const getFeaturesForRole = (role: string) => {
    switch (role) {
      case 'Admin':
        return [
          { key: 'salary', label: 'Salary' },
          { key: 'sound', label: 'Sound' },
          { key: 'history', label: 'History' },
          { key: 'editing', label: 'Editing' },
          { key: 'location', label: 'Location' },
          { key: 'kilometer', label: 'Kilometer' },
          { key: 'timeline', label: 'Timeline' },
          { key: 'speed', label: 'Speed' },
          { key: 'teamControl', label: 'Team Control' },
          { key: 'teamEdit', label: 'Team Edit...' },
        ];
      case 'Accountant':
        return [
          { key: 'salary', label: 'Salary' },
          { key: 'history', label: 'History' },
        ];
      case 'Manager':
        return [
          { key: 'salary', label: 'Salary' },
          { key: 'sound', label: 'Sound' },
          { key: 'history', label: 'History' },
          { key: 'editing', label: 'Editing' },
          { key: 'location', label: 'Location' },
          { key: 'kilometer', label: 'Kilometer' },
          { key: 'timeline', label: 'Timeline' },
          { key: 'speed', label: 'Speed' },
        ];
      case 'HR':
        return [
          { key: 'salary', label: 'Salary' },
          { key: 'history', label: 'History' },
          { key: 'editing', label: 'Editing' },
          { key: 'teamControl', label: 'Team Control' },
          { key: 'teamEdit', label: 'Team Edit...' },
        ];
      case 'Team Supervisor':
        return [
          { key: 'sound', label: 'Sound' },
          { key: 'teamControl', label: 'Team Control' },
        ];
      case 'Security Guard':
        return [
          { key: 'sound', label: 'Sound' },
        ];
      default:
        return [
          { key: 'salary', label: 'Salary' },
          { key: 'sound', label: 'Sound' },
          { key: 'history', label: 'History' },
          { key: 'editing', label: 'Editing' },
          { key: 'location', label: 'Location' },
          { key: 'kilometer', label: 'Kilometer' },
          { key: 'timeline', label: 'Timeline' },
          { key: 'speed', label: 'Speed' },
          { key: 'teamControl', label: 'Team Control' },
          { key: 'teamEdit', label: 'Team Edit...' },
        ];
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={{
        backgroundColor: '#FFFFFF',
        paddingTop: 44,
        paddingBottom: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
      }}>
        {/* Back Arrow */}
        <BackButton />

        {/* Logo */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../../assets/caarobar (2) 1.png')}
            style={{ width: 120, height: 40, resizeMode: 'contain' }}
          />
        </View>

        {/* Right Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {/* Bell with notification */}
          <TouchableOpacity style={{ position: 'relative', padding: 4 }}>
            <Image source={require('../../assets/Frame.png')} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
            <View style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', borderWidth: 1.5, borderColor: 'white' }} />
          </TouchableOpacity>
          {/* Search */}
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 20, color: '#000000' }}>🔍</Text>
          </TouchableOpacity>
          {/* More options */}
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 20, color: '#000000' }}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeBottomTab === 'Salary' ? (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Summary Bar */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingTop: 20,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#E0E0E0'
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#000000',
                fontFamily: 'Poppins-Bold',
                textDecorationLine: 'underline'
              }}>
                Salary
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#000000',
                fontFamily: 'Poppins'
              }}>
                20 Emp
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#4CAF50',
                fontFamily: 'Poppins'
              }}>
                200000 Dr
              </Text>
            </View>

            {/* Table Headers */}
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: '#FFFFFF',
              borderBottomWidth: 1,
              borderBottomColor: '#E0E0E0'
            }}>
              <View style={{ flex: 2 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Employee
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Emp ID
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Salary
                </Text>
              </View>
            </View>

            {/* Employee List */}
            {salaryEmployees.map((employee, index) => (
              <TouchableOpacity
                key={employee.id}
                onPress={() => navigation.navigate('PaymentReport', {
                  employeeId: employee.id,
                  name: employee.name,
                  role: employee.role,
                  empId: employee.empId
                })}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {/* Profile Picture */}
                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/Profile picture.png')}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginRight: 12,
                      resizeMode: 'cover',
                      backgroundColor: '#F5F5F5'
                    }}
                  />
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#000000',
                      fontFamily: 'Poppins-Medium'
                    }}>
                      {employee.name}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: '#9E9E9E',
                      fontFamily: 'Poppins'
                    }}>
                      ({employee.role})
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'Poppins'
                  }}>
                    {employee.empId}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={{
                    fontSize: 14,
                    color: '#4CAF50',
                    fontFamily: 'Poppins'
                  }}>
                    {employee.salary}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : activeBottomTab === 'Location' ? (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Filter Buttons - 2x3 Grid */}
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 16,
              paddingVertical: 12,
              gap: 8,
              justifyContent: 'space-between'
            }}>
              {/* Row 1 */}
              <TouchableOpacity
                onPress={() => setActiveLocationFilter('Branch')}
                style={{
                  width: '31%',
                  backgroundColor: activeLocationFilter === 'Branch' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 6
                }}
              >
                <Text style={{ fontSize: 16 }}>🔍</Text>
                <Text style={{
                  fontSize: 14,
                  color: activeLocationFilter === 'Branch' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Branch
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveLocationFilter('Driver')}
                style={{
                  width: '31%',
                  backgroundColor: activeLocationFilter === 'Driver' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeLocationFilter === 'Driver' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Driver
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveLocationFilter('Salesman')}
                style={{
                  width: '31%',
                  backgroundColor: activeLocationFilter === 'Salesman' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeLocationFilter === 'Salesman' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Salesman
                </Text>
              </TouchableOpacity>

              {/* Row 2 */}
              <TouchableOpacity
                onPress={() => setActiveLocationFilter('Live')}
                style={{
                  width: '31%',
                  backgroundColor: activeLocationFilter === 'Live' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeLocationFilter === 'Live' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Live
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveLocationFilter('Kilometer')}
                style={{
                  width: '31%',
                  backgroundColor: activeLocationFilter === 'Kilometer' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeLocationFilter === 'Kilometer' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Kilometer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveLocationFilter('Speedometer')}
                style={{
                  width: '31%',
                  backgroundColor: activeLocationFilter === 'Speedometer' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeLocationFilter === 'Speedometer' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Speedometer
                </Text>
              </TouchableOpacity>
            </View>

            {/* Content Header */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: '#F5F5F5',
              borderBottomWidth: 1,
              borderBottomColor: '#E0E0E0'
            }}>
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>
                P {activeLocationFilter === 'Speedometer' ? locationSpeedometerEmployees.length : activeLocationFilter === 'Kilometer' ? locationKilometerEmployees.length : activeLocationFilter === 'Live' ? locationLiveEmployees.length : activeLocationFilter === 'Salesman' ? locationSalesmen.length : locationEmployees.length}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                {activeLocationFilter === 'Live' || activeLocationFilter === 'Kilometer' || activeLocationFilter === 'Speedometer' ? (
                  <>
                    <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>1. Creative Designers</Text>
                    {activeLocationFilter !== 'Kilometer' && activeLocationFilter !== 'Speedometer' && (
                      /* Location Pin Icon */
                      <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <View style={{
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                          borderWidth: 2,
                          borderColor: '#000000',
                          backgroundColor: '#000000',
                          marginBottom: -2
                        }} />
                        <View style={{
                          width: 0,
                          height: 0,
                          borderLeftWidth: 6,
                          borderRightWidth: 6,
                          borderTopWidth: 8,
                          borderLeftColor: 'transparent',
                          borderRightColor: 'transparent',
                          borderTopColor: '#000000'
                        }} />
                      </View>
                    )}
                  </>
                ) : (
                  <>
                    <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>
                      {activeLocationFilter === 'Salesman' ? 'Salesman' : 'Driver'}
                    </Text>
                    {/* Location Pin Icon */}
                    <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
                      <View style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        borderWidth: 2,
                        borderColor: '#000000',
                        backgroundColor: '#000000',
                        marginBottom: -2
                      }} />
                      <View style={{
                        width: 0,
                        height: 0,
                        borderLeftWidth: 6,
                        borderRightWidth: 6,
                        borderTopWidth: 8,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderTopColor: '#000000'
                      }} />
                    </View>
                  </>
                )}
              </View>
              {activeLocationFilter === 'Kilometer' ? (
                <View style={{ flexDirection: 'row', gap: 16 }}>
                  <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>KM</Text>
                  <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Timeline</Text>
                </View>
              ) : activeLocationFilter === 'Speedometer' ? (
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Speed</Text>
              ) : (
                <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Location</Text>
              )}
            </View>

            {/* Employee List */}
            {(activeLocationFilter === 'Speedometer' ? locationSpeedometerEmployees : activeLocationFilter === 'Kilometer' ? locationKilometerEmployees : activeLocationFilter === 'Live' ? locationLiveEmployees : activeLocationFilter === 'Salesman' ? locationSalesmen : locationEmployees).map((employee, index) => (
              <TouchableOpacity
                key={employee.id}
                onPress={() => navigation.navigate('EmployeeDetail', {
                  employeeId: employee.id,
                  name: employee.name,
                  role: employee.role,
                  empId: employee.empId,
                  salary: '30000/-',
                  company: 'Creative Designers',
                  location: 'Radhakishanpura, Sikar',
                  phone: '+919460638554',
                  joiningDate: '01/07/2024',
                  endDate: '00/00/0000',
                  progress: 90,
                  progressDays: 90
                })}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {/* Profile Picture */}
                <Image
                  source={require('../../assets/Profile picture.png')}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 12,
                    resizeMode: 'cover',
                    backgroundColor: '#F5F5F5'
                  }}
                />

                {/* Employee Info */}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#000000',
                      fontFamily: 'Poppins-Medium'
                    }}>
                      {employee.name}
                    </Text>
                    {employee.hasAlert && (
                      <View style={{ position: 'relative' }}>
                        <Text style={{ fontSize: 16, color: '#FF5252' }}>🔊</Text>
                        {/* Sound waves */}
                        <View style={{
                          position: 'absolute',
                          top: -2,
                          left: -2,
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: '#FF5252',
                          opacity: 0.3
                        }} />
                      </View>
                    )}
                  </View>
                  <Text style={{
                    fontSize: 12,
                    color: '#9E9E9E',
                    fontFamily: 'Poppins'
                  }}>
                    {employee.empId} ({employee.role})
                  </Text>
                </View>

                {/* Speed Value (for Speedometer filter), KM Value (for Kilometer filter), or Location Icon */}
                {activeLocationFilter === 'Speedometer' ? (
                  <View style={{ width: 60, alignItems: 'flex-end' }}>
                    <Text style={{
                      fontSize: 14,
                      color: employee.speedColor || '#000000',
                      fontFamily: 'Poppins'
                    }}>
                      {employee.speed}
                    </Text>
                  </View>
                ) : activeLocationFilter === 'Kilometer' ? (
                  <>
                    <View style={{ width: 50, alignItems: 'center' }}>
                      <Text style={{
                        fontSize: 14,
                        color: employee.kmColor || '#000000',
                        fontFamily: 'Poppins'
                      }}>
                        {employee.km}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <View style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        backgroundColor: '#E0E0E0',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Text style={{ fontSize: 12, color: '#9E9E9E' }}>📄</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity>
                    <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
                      <View style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        borderWidth: 2,
                        borderColor: '#000000',
                        backgroundColor: '#000000',
                        marginBottom: -2
                      }} />
                      <View style={{
                        width: 0,
                        height: 0,
                        borderLeftWidth: 6,
                        borderRightWidth: 6,
                        borderTopWidth: 8,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderTopColor: '#000000'
                      }} />
                    </View>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : activeBottomTab === 'Tools' ? (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 16 }}>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#000000',
                fontFamily: 'Poppins-Bold',
                textDecorationLine: 'underline'
              }}>
                Power Of Team
              </Text>
            </View>

            {/* Role Selection Buttons - 2x3 Grid */}
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 16,
              paddingVertical: 12,
              gap: 8,
              justifyContent: 'space-between'
            }}>
              {/* Row 1 */}
              <TouchableOpacity
                onPress={() => setActiveRole('Admin')}
                style={{
                  width: '31%',
                  backgroundColor: activeRole === 'Admin' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeRole === 'Admin' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Admin
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveRole('Manager')}
                style={{
                  width: '31%',
                  backgroundColor: activeRole === 'Manager' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeRole === 'Manager' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Manager
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveRole('HR')}
                style={{
                  width: '31%',
                  backgroundColor: activeRole === 'HR' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeRole === 'HR' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  HR
                </Text>
              </TouchableOpacity>

              {/* Row 2 */}
              <TouchableOpacity
                onPress={() => setActiveRole('Accountant')}
                style={{
                  width: '31%',
                  backgroundColor: activeRole === 'Accountant' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeRole === 'Accountant' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Accountant
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveRole('Team Supervisor')}
                style={{
                  width: '31%',
                  backgroundColor: activeRole === 'Team Supervisor' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeRole === 'Team Supervisor' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Team Supervisor
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveRole('Security Guard')}
                style={{
                  width: '31%',
                  backgroundColor: activeRole === 'Security Guard' ? '#9E9E9E' : '#FFFFFF',
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: activeRole === 'Security Guard' ? '#FFFFFF' : '#000000',
                  fontFamily: 'Poppins-SemiBold'
                }}>
                  Security Guard
                </Text>
              </TouchableOpacity>
            </View>

            {/* Feature List with Toggles */}
            <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
              {getFeaturesForRole(activeRole).map((feature, index, array) => (
                <View
                  key={feature.key}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    borderBottomWidth: index < array.length - 1 ? 1 : 0,
                    borderBottomColor: '#E0E0E0'
                  }}
                >
                  <Text style={{
                    fontSize: 14,
                    color: '#000000',
                    fontFamily: 'Poppins'
                  }}>
                    {feature.label}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{
                      fontSize: 12,
                      color: powerOfTeamSettings[feature.key as keyof typeof powerOfTeamSettings] ? '#4CAF50' : '#9E9E9E',
                      fontFamily: 'Poppins',
                      marginRight: 4
                    }}>
                      {powerOfTeamSettings[feature.key as keyof typeof powerOfTeamSettings] ? 'ON' : 'OFF'}
                    </Text>
                    <Switch
                      value={powerOfTeamSettings[feature.key as keyof typeof powerOfTeamSettings]}
                      onValueChange={(value) => {
                        setPowerOfTeamSettings(prev => ({
                          ...prev,
                          [feature.key]: value
                        }));
                      }}
                      trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
                      thumbColor="#FFFFFF"
                      ios_backgroundColor="#E0E0E0"
                    />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      ) : activeBottomTab === 'Branch' ? (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 16 }}>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#000000',
                fontFamily: 'Poppins-Bold',
                textDecorationLine: 'underline'
              }}>
                Branch Summary
              </Text>
            </View>

            {/* Table */}
            <View style={{ paddingHorizontal: 16 }}>
              {/* Table Header */}
              <View style={{
                flexDirection: 'row',
                backgroundColor: '#F5F5F5',
                paddingVertical: spacing(12),
                paddingHorizontal: spacing(8),
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#E0E0E0'
              }}>
                <View style={{ width: tableCellWidth(50), alignItems: 'center' }}>
                  <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>S.No</Text>
                </View>
                <View style={{ flex: 2, paddingLeft: spacing(8) }}>
                  <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Site</Text>
                </View>
                <View style={{ width: tableCellWidth(60), alignItems: 'center' }}>
                  <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Emp+</Text>
                </View>
                <View style={{ flex: 1.5, alignItems: 'flex-end', paddingRight: spacing(8) }}>
                  <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Payment</Text>
                </View>
              </View>

              {/* Table Rows */}
              {branchData.map((branch, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: spacing(12),
                    paddingHorizontal: spacing(8),
                    borderBottomWidth: 1,
                    borderBottomColor: '#E0E0E0',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <View style={{ width: tableCellWidth(50), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }}>{branch.sno}</Text>
                  </View>
                  <View style={{ flex: 2, paddingLeft: spacing(8), justifyContent: 'center' }}>
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }}>{branch.site}</Text>
                  </View>
                  <View style={{ width: tableCellWidth(60), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins' }}>{branch.empPlus}</Text>
                  </View>
                  <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: spacing(4) }}>
                    <Text style={{ fontSize: fontSize(14), color: '#4CAF50', fontFamily: 'Poppins' }}>{branch.payment}</Text>
                    <TouchableOpacity>
                      <View style={{
                        width: wp(16),
                        height: hp(16),
                        backgroundColor: '#E0E0E0',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2
                      }}>
                        <Text style={{ fontSize: fontSize(10), color: '#000000' }}>↗</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Grand Total Row */}
              <View style={{
                flexDirection: 'row',
                backgroundColor: '#F5F5F5',
                paddingVertical: spacing(12),
                paddingHorizontal: spacing(8),
                borderTopWidth: 2,
                borderBottomWidth: 1,
                borderColor: '#E0E0E0',
                marginTop: spacing(4)
              }}>
                <View style={{ width: tableCellWidth(50), alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}></Text>
                </View>
                <View style={{ flex: 2, paddingLeft: spacing(8), justifyContent: 'center' }}>
                  <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Grand Total</Text>
                </View>
                <View style={{ width: tableCellWidth(60), alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold' }}>
                    {branchData.reduce((sum, branch) => sum + parseInt(branch.empPlus), 0)}
                  </Text>
                </View>
                <View style={{ flex: 1.5, alignItems: 'flex-end', paddingRight: spacing(8), justifyContent: 'center' }}>
                  <Text style={{ fontSize: fontSize(14), fontWeight: '600', color: '#4CAF50', fontFamily: 'Poppins-SemiBold' }}>
                    {branchData.reduce((sum, branch) => {
                      const paymentValue = parseInt(branch.payment.replace(/[^0-9]/g, ''));
                      return sum + paymentValue;
                    }, 0).toLocaleString()} Dr.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Floating Action Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 100,
              right: 16,
              backgroundColor: '#4285F4',
              borderRadius: 8,
              paddingHorizontal: 20,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5
            }}
            onPress={() => {
              setShowAddBranchModal(true);
            }}
          >
            <Text style={{ fontSize: 20, color: '#FFFFFF', fontWeight: 'bold' }}>+</Text>
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>Add Branch</Text>
          </TouchableOpacity>

          {/* Add Branch Modal */}
          <Modal
            visible={showAddBranchModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowAddBranchModal(false)}
          >
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20
            }}>
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
                elevation: 5
              }}>
                {/* Modal Header */}
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20
                }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#000000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Text style={{
                      fontSize: 24,
                      color: '#000000',
                      fontWeight: 'bold'
                    }}>+</Text>
                  </View>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#000000',
                    fontFamily: 'Poppins-Bold'
                  }}>
                    Add Branch Site
                  </Text>
                </View>

                {/* Input Field */}
                <View style={{ marginBottom: 24 }}>
                  <Text style={{
                    fontSize: 12,
                    color: '#4285F4',
                    fontFamily: 'Poppins',
                    marginBottom: 8
                  }}>
                    Enter Site
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#E0E0E0',
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      paddingVertical: 12,
                      fontSize: 14,
                      color: '#000000',
                      fontFamily: 'Poppins',
                      backgroundColor: '#FFFFFF'
                    }}
                    placeholder="Enter New Branch Name"
                    placeholderTextColor="#9E9E9E"
                    value={branchName}
                    onChangeText={setBranchName}
                  />
                </View>

                {/* Action Buttons */}
                <View style={{
                  flexDirection: 'row',
                  gap: 12
                }}>
                  {/* Cancel Button */}
                  <TouchableOpacity
                    onPress={() => {
                      setShowAddBranchModal(false);
                      setBranchName('');
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#E53935',
                      borderRadius: 8,
                      paddingVertical: 12,
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
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  {/* ADD Button */}
                  <TouchableOpacity
                    onPress={() => {
                      // TODO: Implement add branch functionality
                      if (branchName.trim()) {
                        console.log('Add branch:', branchName);
                        // Close the add branch modal
                        setShowAddBranchModal(false);
                        // Show success modal
                        setShowSuccessModal(true);
                        // Clear the input after a delay
                        setTimeout(() => {
                          setBranchName('');
                        }, 300);
                      }
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#4CAF50',
                      borderRadius: 8,
                      paddingVertical: 12,
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
                      ADD
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  paddingTop: 32,
                  paddingHorizontal: 20,
                  paddingBottom: 34,
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: -2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 10
                }}
                onPress={(e) => e.stopPropagation()}
              >
                {/* Success Icon */}
                <View style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  position: 'relative'
                }}>
                  {/* Light blue outer ring/halo */}
                  <View style={{
                    position: 'absolute',
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: '#E3F2FD',
                    opacity: 0.3
                  }} />
                  {/* Dark blue inner circle */}
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
                    {/* Checkmark */}
                    <Text style={{
                      fontSize: 48,
                      color: '#FFFFFF',
                      fontWeight: 'bold'
                    }}>✓</Text>
                  </View>
                </View>

                {/* Title */}
                <Text style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#000000',
                  fontFamily: 'Poppins-Bold',
                  marginBottom: 8,
                  textAlign: 'center',
                  lineHeight: 28
                }}>
                  New Branch Added{'\n'}Successfully
                </Text>

                {/* Message */}
                <Text style={{
                  fontSize: 14,
                  color: '#9E9E9E',
                  fontFamily: 'Poppins',
                  marginBottom: 24,
                  textAlign: 'center',
                  lineHeight: 20
                }}>
                  New Branch has been added{'\n'}successfully
                </Text>

                {/* Done Button */}
                <TouchableOpacity
                  onPress={() => {
                    setShowSuccessModal(false);
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: '#4285F4',
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
              </Pressable>
            </Pressable>
          </Modal>
        </>
      ) : (
        <>
          {/* Summary Statistics */}
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
          }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>6</Text>
              <Text style={{ fontSize: 12, color: '#4CAF50', fontFamily: 'Poppins-SemiBold', marginTop: 4 }}>Present</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>4</Text>
              <Text style={{ fontSize: 12, color: '#FF5252', fontFamily: 'Poppins-SemiBold', marginTop: 4 }}>Absent</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>1</Text>
              <Text style={{ fontSize: 12, color: '#FFC107', fontFamily: 'Poppins-SemiBold', marginTop: 4 }}>Leave</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold' }}>11</Text>
              <Text style={{ fontSize: 12, color: '#000000', fontFamily: 'Poppins-SemiBold', marginTop: 4 }}>T.Staff</Text>
            </View>
          </View>

          {/* Filter Buttons - 2x3 Grid */}
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 16,
            paddingVertical: 12,
            gap: 8,
            justifyContent: 'space-between'
          }}>
            {/* Row 1 */}
            <TouchableOpacity
              onPress={() => setActiveFilter('Live')}
              style={{
                width: '31%',
                backgroundColor: activeFilter === 'Live' ? '#9E9E9E' : '#FFFFFF',
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{
                fontSize: 14,
                color: activeFilter === 'Live' ? '#FFFFFF' : '#000000',
                fontFamily: 'Poppins-SemiBold'
              }}>
                Live
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter('Unread')}
              style={{
                width: '31%',
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 6
              }}
            >
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Unread</Text>
              <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 9, color: '#FFFFFF', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>10</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter('Branch')}
              style={{
                width: '31%',
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 6
              }}
            >
              <Text style={{ fontSize: 16 }}>🔍</Text>
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Branch</Text>
            </TouchableOpacity>

            {/* Row 2 */}
            <TouchableOpacity
              onPress={() => setActiveFilter('Leave')}
              style={{
                width: '31%',
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 6
              }}
            >
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Leave</Text>
              <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 9, color: '#FFFFFF', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>5</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter('Payment')}
              style={{
                width: '31%',
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 6
              }}
            >
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Payment</Text>
              <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 9, color: '#FFFFFF', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>5</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter('Expense')}
              style={{
                width: '31%',
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 6
              }}
            >
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold' }}>Expense</Text>
              <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 9, color: '#FFFFFF', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>2</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Employee List */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Section Header */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: '#FFFFFF',
              borderBottomWidth: 1,
              borderBottomColor: '#E0E0E0'
            }}>
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins-SemiBold', fontWeight: '600' }}>P 5</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'Poppins-Bold', fontWeight: '700' }}>1. Creative Designers</Text>
                <TouchableOpacity>
                  <Image source={require('../../assets/Frame.png')} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Employee Entries */}
            {(activeFilter === 'Leave' ? leaveEmployees : activeFilter === 'Payment' ? paymentEmployees : activeFilter === 'Expense' ? expenseEmployees : employees).map((employee, index) => (
              <TouchableOpacity
                key={employee.id}
                activeOpacity={0.7}
                onPress={() => {
                  if (activeFilter === 'Leave') {
                    // Navigate to Admin Leave Request Detail for Leave filter
                    navigation.navigate('AdminLeaveRequestDetail', {
                      employeeId: employee.id,
                      employeeName: employee.name,
                      leaveType: 'Medical',
                      requestDate: '25 December 2024',
                      startOffDate: '01 January 2025',
                      day: employee.leaveDuration || '2 Day',
                      approvedBy: 'Admin',
                      status: 'Pending',
                      reason: 'I need to take a medical leave.'
                    });
                  } else if (activeFilter === 'Payment' || activeFilter === 'Expense') {
                    // Navigate to Admin Payment Request Detail for Payment and Expense filters
                    navigation.navigate('AdminPaymentRequestDetail', {
                      employeeId: employee.id,
                      employeeName: employee.name,
                      paymentType: 'Medical',
                      requestDate: activeFilter === 'Expense' ? employee.expenseDate || '25 December 2024' : '25 December 2024',
                      requestedDate: '01 January 2025',
                      amount: activeFilter === 'Expense' ? employee.expenseAmount?.replace(' /-', '') || '2000' : employee.paymentAmount?.replace(' /-', '') || '2000',
                      approvedBy: 'Admin',
                      status: 'Pending',
                      reason: 'I am feeling unwell & need to see a doctor'
                    });
                  } else {
                    // Navigate to Employee Detail for other filters
                    navigation.navigate('EmployeeDetail', {
                      employeeId: employee.id,
                      name: employee.name,
                      role: 'Carpenter',
                      empId: employee.id,
                      salary: '30000/-',
                      company: 'Creative Designers',
                      location: 'Radhakishanpura, Sikar',
                      phone: '+919460638554',
                      joiningDate: '01/07/2024',
                      endDate: '00/00/0000',
                      progress: 90,
                      progressDays: 90
                    });
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {/* Profile Picture */}
                <Image
                  source={require('../../assets/Profile picture.png')}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 12,
                    resizeMode: 'cover',
                    backgroundColor: '#F5F5F5'
                  }}
                />

                {/* Employee Info */}
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#000000',
                    fontFamily: 'Poppins-Medium'
                  }}>
                    {employee.id} - {employee.name}
                  </Text>
                </View>

                {/* Time and Duration (for Leave), Payment (for Payment), Expense (for Expense), or Time (for others) */}
                {activeFilter === 'Leave' ? (
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{
                      fontSize: 14,
                      color: '#000000',
                      fontFamily: 'Poppins',
                      marginBottom: 4
                    }}>
                      {employee.leaveTime}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: employee.leaveDurationColor || '#9E9E9E',
                      fontFamily: 'Poppins'
                    }}>
                      {employee.leaveDuration}
                    </Text>
                  </View>
                ) : activeFilter === 'Payment' ? (
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{
                      fontSize: 14,
                      color: '#9E9E9E',
                      fontFamily: 'Poppins',
                      marginBottom: 4
                    }}>
                      {employee.paymentTime}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Text style={{
                        fontSize: 12,
                        color: employee.paymentAmountColor || '#9E9E9E',
                        fontFamily: 'Poppins'
                      }}>
                        {employee.paymentAmount}
                      </Text>
                      {employee.showRejectIcon && (
                        <View style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: '#FF5252',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' }}>×</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ) : activeFilter === 'Expense' ? (
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{
                      fontSize: 14,
                      color: employee.expenseDateColor || '#000000',
                      fontFamily: 'Poppins',
                      marginBottom: 4
                    }}>
                      {employee.expenseDate}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Text style={{
                        fontSize: 12,
                        color: employee.expenseAmountColor || '#9E9E9E',
                        fontFamily: 'Poppins'
                      }}>
                        {employee.expenseAmount}
                      </Text>
                      {employee.expenseStatusIcon === 'checkmark' && (
                        <View style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: '#4CAF50',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' }}>✓</Text>
                        </View>
                      )}
                      {employee.expenseStatusIcon === 'minus' && (
                        <View style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: '#FFC107',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' }}>−</Text>
                        </View>
                      )}
                      {employee.expenseStatusIcon === 'x' && (
                        <View style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: '#FF5252',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Text style={{ fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' }}>×</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ) : (
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{
                      fontSize: 12,
                      color: '#000000',
                      fontFamily: 'Poppins'
                    }}>
                      {employee.startTime}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: '#FF5252',
                      fontFamily: 'Poppins'
                    }}>
                      {employee.endTime}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Bottom Navigation Bar */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }}>
        <TouchableOpacity
          onPress={() => setActiveBottomTab('Home')}
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: activeBottomTab === 'Home' ? '#4285F4' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            {/* Home Icon - House with curved roof */}
            <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{
                width: 0,
                height: 0,
                borderLeftWidth: 8,
                borderRightWidth: 8,
                borderBottomWidth: 6,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: activeBottomTab === 'Home' ? '#FFFFFF' : '#000000',
                marginBottom: 2
              }} />
              <View style={{
                width: 12,
                height: 8,
                borderWidth: 1.5,
                borderColor: activeBottomTab === 'Home' ? '#FFFFFF' : '#000000',
                borderRadius: 1
              }} />
            </View>
          </View>
          <Text style={{
            fontSize: 10,
            color: activeBottomTab === 'Home' ? '#4285F4' : '#000000',
            fontFamily: 'Poppins'
          }}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveBottomTab('Branch')}
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: activeBottomTab === 'Branch' ? '#4285F4' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            {/* Paper Airplane Icon */}
            <View style={{ 
              width: 20, 
              height: 20, 
              alignItems: 'center', 
              justifyContent: 'center',
              transform: [{ rotate: '45deg' }]
            }}>
              <View style={{
                width: 0,
                height: 0,
                borderLeftWidth: 0,
                borderRightWidth: 10,
                borderTopWidth: 5,
                borderBottomWidth: 5,
                borderRightColor: activeBottomTab === 'Branch' ? '#FFFFFF' : '#000000',
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
                marginLeft: 2
              }} />
            </View>
          </View>
          <Text style={{
            fontSize: 10,
            color: activeBottomTab === 'Branch' ? '#4285F4' : '#000000',
            fontFamily: 'Poppins'
          }}>
            Branch
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveBottomTab('Salary')}
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: activeBottomTab === 'Salary' ? '#4285F4' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            <Text style={{ 
              fontSize: 18, 
              color: activeBottomTab === 'Salary' ? '#FFFFFF' : '#000000',
              fontFamily: 'Poppins-Bold'
            }}>
              ₹
            </Text>
          </View>
          <Text style={{
            fontSize: 10,
            color: activeBottomTab === 'Salary' ? '#4285F4' : '#000000',
            fontFamily: 'Poppins'
          }}>
            Salary
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveBottomTab('Location')}
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: activeBottomTab === 'Location' ? '#4285F4' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            {/* Map Pin Icon */}
            <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
              <View style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: activeBottomTab === 'Location' ? '#FFFFFF' : '#000000',
                backgroundColor: activeBottomTab === 'Location' ? '#FFFFFF' : '#000000',
                marginBottom: -2
              }} />
              <View style={{
                width: 0,
                height: 0,
                borderLeftWidth: 6,
                borderRightWidth: 6,
                borderTopWidth: 8,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: activeBottomTab === 'Location' ? '#FFFFFF' : '#000000'
              }} />
            </View>
          </View>
          <Text style={{
            fontSize: 10,
            color: activeBottomTab === 'Location' ? '#4285F4' : '#000000',
            fontFamily: 'Poppins'
          }}>
            Location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveBottomTab('Tools')}
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: activeBottomTab === 'Tools' ? '#4285F4' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            <Image 
              source={require('../../assets/gear-icon.png')} 
              style={{ 
                width: 20, 
                height: 20, 
                resizeMode: 'contain',
                tintColor: activeBottomTab === 'Tools' ? '#FFFFFF' : '#000000'
              }} 
            />
          </View>
          <Text style={{
            fontSize: 10,
            color: activeBottomTab === 'Tools' ? '#4285F4' : '#000000',
            fontFamily: 'Poppins'
          }}>
            Tools
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

