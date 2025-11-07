import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageScreen from './screens/LanguageScreen';
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
import ExpenseRequestReportScreen from './screens/ExpenseRequestReportScreen';
import ExpenseRequestDetailScreen from './screens/ExpenseRequestDetailScreen';
import PaymentRequestDetailScreen from './screens/PaymentRequestDetailScreen';
import ApplyForPaymentScreen from './screens/ApplyForPaymentScreen';
import ApplyForExpenseScreen from './screens/ApplyForExpenseScreen';
import AssetsReportScreen from './screens/AssetsReportScreen';
import AgreementsScreen from './screens/AgreementsScreen';
import ResignationScreen from './screens/ResignationScreen';
import IDCardScreen from './screens/IDCardScreen';

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
  Tasks: undefined;
  TaskDetail: undefined;
  NewTask: undefined;
  AddCustomer: undefined;
  AddTask: undefined;
  AddMaintenance: undefined;
  WorkHistory: undefined;
  DailyWorkHistory: { month: string; monthNumber: string; year: string };
  ExpenseRequestReport: undefined;
  ExpenseRequestDetail: { month: string; monthNumber: string; year: string };
  PaymentRequestDetail: { month: string; monthNumber: string; year: string };
  ApplyForPayment: undefined;
  ApplyForExpense: undefined;
  AssetsReport: undefined;
  Agreements: undefined;
  Resignation: undefined;
  IDCard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: '#FFFFFF' },
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFFFFF' } }}
          initialRouteName="Language"
        >
          <Stack.Screen name="Language" component={LanguageScreen} />
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
          <Stack.Screen name="ExpenseRequestReport" component={ExpenseRequestReportScreen} />
          <Stack.Screen name="ExpenseRequestDetail" component={ExpenseRequestDetailScreen} />
          <Stack.Screen name="PaymentRequestDetail" component={PaymentRequestDetailScreen} />
          <Stack.Screen name="ApplyForPayment" component={ApplyForPaymentScreen} />
          <Stack.Screen name="ApplyForExpense" component={ApplyForExpenseScreen} />
          <Stack.Screen name="AssetsReport" component={AssetsReportScreen} />
          <Stack.Screen name="Agreements" component={AgreementsScreen} />
          <Stack.Screen name="Resignation" component={ResignationScreen} />
          <Stack.Screen name="IDCard" component={IDCardScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

