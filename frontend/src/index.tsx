import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import SignInScreen from './screens/SignInScreen';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LeaveReportScreen from './screens/LeaveReportScreen';
import PaymentReportScreen from './screens/PaymentReportScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import ContactsScreen from './screens/ContactsScreen';
import LeaveRequestDetailScreen from './screens/LeaveRequestDetailScreen';
import ApplyForLeaveScreen from './screens/ApplyForLeaveScreen';
import TasksScreen from './screens/TasksScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import NewTaskScreen from './screens/NewTaskScreen';
import AddCustomerScreen from './screens/AddCustomerScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import AddMaintenanceScreen from './screens/AddMaintenanceScreen';
import WorkHistoryScreen from './screens/WorkHistoryScreen';
import DailyWorkHistoryScreen from './screens/DailyWorkHistoryScreen';
import DailyWorkHistoryInDetailScreen from './screens/DailyWorkHistoryInDetailScreen';
import ExpenseRequestReportScreen from './screens/ExpenseRequestReportScreen';
import ExpenseRequestDetailScreen from './screens/ExpenseRequestDetailScreen';
import PaymentRequestReportScreen from './screens/PaymentRequestReportScreen';
import PaymentRequestDetailScreen from './screens/PaymentRequestDetailScreen';
import ApplyForPaymentScreen from './screens/ApplyForPaymentScreen';
import ApplyForExpenseScreen from './screens/ApplyForExpenseScreen';
import AssetsReportScreen from './screens/AssetsReportScreen';
import AgreementsScreen from './screens/AgreementsScreen';
import ResignationScreen from './screens/ResignationScreen';
import IDCardScreen from './screens/IDCardScreen';
import AddEmployeeAccountScreen from './screens/AddEmployeeAccountScreen';
import EmployeeManagementScreen from './screens/EmployeeManagementScreen';
import EmployeeDetailScreen from './screens/EmployeeDetailScreen';
import AdminLeaveRequestDetailScreen from './screens/AdminLeaveRequestDetailScreen';
import AdminPaymentRequestDetailScreen from './screens/AdminPaymentRequestDetailScreen';
import BusinessProfileScreen from './screens/BusinessProfileScreen';

type RootStackParamList = {
  RoleSelection: undefined;
  SignIn: { role?: 'Admin' | 'Employee' };
  OTPVerification: { identifier: string; role?: 'Admin' | 'Employee' };
  Register: undefined;
  Home: undefined;
  AdminHome: undefined;
  LeaveReport: undefined;
  LeaveRequestDetail: undefined;
  ApplyForLeave: undefined;
  PaymentReport: {
    employeeId?: string;
    name?: string;
    role?: string;
    empId?: string;
  } | undefined;
  Calendar: undefined;
  Contacts: undefined;
  Tasks: undefined;
  TaskDetail: undefined;
  NewTask: undefined;
  AddCustomer: undefined;
  AddTask: undefined;
  AddMaintenance: undefined;
  WorkHistory: undefined;
  DailyWorkHistory: { month: string; monthNumber: string; year: string };
  DailyWorkHistoryInDetail: { month: string; monthNumber: string; year: string };
  ExpenseRequestReport: undefined;
  ExpenseRequestDetail: { month: string; monthNumber: string; year: string };
  PaymentRequestReport: undefined;
  PaymentRequestDetail: { month: string; monthNumber: string; year: string };
  ApplyForPayment: undefined;
  ApplyForExpense: undefined;
  AssetsReport: undefined;
  Agreements: undefined;
  Resignation: undefined;
  IDCard: undefined;
  AddEmployeeAccount: undefined;
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
  BusinessProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: '#FFFFFF' },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }}
          initialRouteName="RoleSelection"
        >
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
          <Stack.Screen name="LeaveReport" component={LeaveReportScreen} />
          <Stack.Screen name="LeaveRequestDetail" component={LeaveRequestDetailScreen} />
          <Stack.Screen name="ApplyForLeave" component={ApplyForLeaveScreen} />
          <Stack.Screen name="PaymentReport" component={PaymentReportScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Contacts" component={ContactsScreen} />
          <Stack.Screen name="Tasks" component={TasksScreen} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          <Stack.Screen name="NewTask" component={NewTaskScreen} />
          <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="AddMaintenance" component={AddMaintenanceScreen} />
          <Stack.Screen name="WorkHistory" component={WorkHistoryScreen} />
          <Stack.Screen name="DailyWorkHistory" component={DailyWorkHistoryScreen} />
          <Stack.Screen name="DailyWorkHistoryInDetail" component={DailyWorkHistoryInDetailScreen} />
          <Stack.Screen name="ExpenseRequestReport" component={ExpenseRequestReportScreen} />
          <Stack.Screen name="ExpenseRequestDetail" component={ExpenseRequestDetailScreen} />
          <Stack.Screen name="PaymentRequestReport" component={PaymentRequestReportScreen} />
          <Stack.Screen name="PaymentRequestDetail" component={PaymentRequestDetailScreen} />
          <Stack.Screen name="ApplyForPayment" component={ApplyForPaymentScreen} />
          <Stack.Screen name="ApplyForExpense" component={ApplyForExpenseScreen} />
          <Stack.Screen name="AssetsReport" component={AssetsReportScreen} />
          <Stack.Screen name="Agreements" component={AgreementsScreen} />
          <Stack.Screen name="Resignation" component={ResignationScreen} />
          <Stack.Screen name="IDCard" component={IDCardScreen} />
          <Stack.Screen name="AddEmployeeAccount" component={AddEmployeeAccountScreen} />
          <Stack.Screen name="EmployeeManagement" component={EmployeeManagementScreen} />
          <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
          <Stack.Screen name="AdminLeaveRequestDetail" component={AdminLeaveRequestDetailScreen} />
          <Stack.Screen name="AdminPaymentRequestDetail" component={AdminPaymentRequestDetailScreen} />
          <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

