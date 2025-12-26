import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH, useSafeArea } from '../utils/responsive';

type RootStackParamList = {
  RoleSelection: undefined;
  SignIn: { role?: 'Admin' | 'Employee' };
  Register: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelection'>;

export default function RoleSelectionScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [clickedButton, setClickedButton] = useState<'Admin' | 'Employee' | null>(null);
  
  const handleRoleSelection = async (role: 'Admin' | 'Employee') => {
    // Set clicked button state
    setClickedButton(role);
    // Store the selected role
    await AsyncStorage.setItem('@selectedRole', role);
    // Navigate directly to SignIn
    navigation.navigate('SignIn', { role });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Centered Content Container with Equal Spacing */}
      <View style={styles.centeredContent}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/caarobar (2) 1.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Admin Button */}
        <TouchableOpacity
          style={[
            styles.adminButton,
            { backgroundColor: clickedButton === 'Admin' ? '#FFFFFF' : '#2D6EFF' }
          ]}
          onPress={() => handleRoleSelection('Admin')}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            {/* Admin Icon - Person with document/badge */}
            <View style={styles.iconWrapper}>
              <MaterialIcons 
                name="person" 
                size={20} 
                color={clickedButton === 'Admin' ? '#6BA3FF' : '#FFFFFF'} 
              />
              <MaterialIcons 
                name="description" 
                size={12} 
                color={clickedButton === 'Admin' ? '#6BA3FF' : '#FFFFFF'} 
                style={styles.badgeIcon} 
              />
            </View>
            <Text 
              style={[
                styles.adminButtonText,
                { color: clickedButton === 'Admin' ? '#6BA3FF' : '#FFFFFF' }
              ]} 
              allowFontScaling={false}
            >
              Continue as a Admin
            </Text>
          </View>
        </TouchableOpacity>

        {/* Employee Button */}
        <TouchableOpacity
          style={[
            styles.employeeButton,
            { backgroundColor: clickedButton === 'Employee' ? '#FFFFFF' : '#2D6EFF' }
          ]}
          onPress={() => handleRoleSelection('Employee')}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            {/* Employee Icon - Group with document/badge */}
            <View style={styles.iconWrapper}>
              <MaterialIcons 
                name="group" 
                size={20} 
                color={clickedButton === 'Employee' ? '#6BA3FF' : '#FFFFFF'} 
              />
              <MaterialIcons 
                name="description" 
                size={12} 
                color={clickedButton === 'Employee' ? '#6BA3FF' : '#FFFFFF'} 
                style={styles.badgeIcon} 
              />
            </View>
            <Text 
              style={[
                styles.employeeButtonText,
                { color: clickedButton === 'Employee' ? '#6BA3FF' : '#FFFFFF' }
              ]} 
              allowFontScaling={false}
            >
              Continue as a Employee
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Register Link - Positioned at bottom */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText} allowFontScaling={false}>Didn't have a account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink} allowFontScaling={false}>Register here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: spacing(20),
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: wp(400),
    alignSelf: 'center',
    gap: spacing(32), // Equal spacing between logo and both buttons
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: wp(240), // Smaller image size
    height: hp(130), // Smaller image size
    resizeMode: 'contain',
  },
  adminButton: {
    width: '100%',
    height: hp(55),
    borderWidth: wp(1),
    borderColor: '#6BA3FF', // Light blue border as shown in screenshot
    borderRadius: hp(55) / 2, // Fully rounded corners (half of height for perfect circle/rounded)
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(16),
    marginBottom: -spacing(8), // Reduce spacing between Admin and Employee buttons
  },
  employeeButton: {
    width: '100%',
    height: hp(55),
    borderWidth: wp(1),
    borderColor: '#6BA3FF', // Light blue border
    borderRadius: hp(55) / 2, // Fully rounded corners (half of height for perfect circle/rounded)
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(16),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconWrapper: {
    marginRight: spacing(12), // Space between icon and text
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: wp(28),
    height: hp(28),
  },
  badgeIcon: {
    position: 'absolute',
    bottom: -2,
    right: -4,
  },
  adminButtonText: {
    fontSize: fontSize(16),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  employeeButtonText: {
    fontSize: fontSize(16),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  registerContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(20),
    paddingBottom: spacing(20),
    flexWrap: 'wrap',
  },
  registerText: {
    fontSize: fontSize(14),
    color: '#666666', // Dark grey text as shown in screenshot
    fontFamily: 'Poppins',
  },
  registerLink: {
    fontSize: fontSize(14),
    color: '#2D6EFF', // Blue color for clickable link
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});

