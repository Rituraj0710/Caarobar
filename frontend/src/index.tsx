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
          <Stack.Screen name="PaymentReport" component={PaymentReportScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

