import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH } from '../utils/responsive';

type RootStackParamList = {
  RoleSelection: undefined;
  SignIn: { role?: 'Admin' | 'Employee' };
  Register: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'RoleSelection'>;

export default function RoleSelectionScreen({ navigation }: Props) {
  const handleRoleSelection = async (role: 'Admin' | 'Employee') => {
    // Store the selected role
    await AsyncStorage.setItem('@selectedRole', role);
    // Navigate directly to SignIn
    navigation.navigate('SignIn', { role });
  };

  return (
    <View style={styles.container}>
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
          style={styles.adminButton}
          onPress={() => handleRoleSelection('Admin')}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            {/* Admin Icon - Person with document/badge */}
            <View style={styles.iconWrapper}>
              <MaterialIcons name="person" size={20} color="#6BA3FF" />
              <MaterialIcons name="description" size={12} color="#6BA3FF" style={styles.badgeIcon} />
            </View>
            <Text style={styles.adminButtonText}>Continue as a Admin</Text>
          </View>
        </TouchableOpacity>

        {/* Employee Button */}
        <TouchableOpacity
          style={styles.employeeButton}
          onPress={() => handleRoleSelection('Employee')}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            {/* Employee Icon - Group with document/badge */}
            <View style={styles.iconWrapper}>
              <MaterialIcons name="group" size={20} color="#FFFFFF" />
              <MaterialIcons name="description" size={12} color="#FFFFFF" style={styles.badgeIcon} />
            </View>
            <Text style={styles.employeeButtonText}>Continue as a Employee</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Register Link - Positioned at bottom */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Didn't have a account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    width: wp(280), // Adjusted width for better proportions
    height: hp(150), // Adjusted height for better proportions
    resizeMode: 'contain',
  },
  adminButton: {
    width: '100%',
    height: hp(55),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#6BA3FF', // Light blue border as shown in screenshot
    borderRadius: hp(55) / 2, // Fully rounded corners (half of height for perfect circle/rounded)
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(16),
  },
  employeeButton: {
    width: '100%',
    height: hp(55),
    backgroundColor: '#2979FF', // Solid blue background
    borderRadius: hp(55) / 2, // Fully rounded corners (half of height for perfect circle/rounded)
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(16),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    color: '#6BA3FF', // Light blue text to match border
    fontFamily: 'Poppins-Medium',
  },
  employeeButtonText: {
    fontSize: fontSize(16),
    fontWeight: '500',
    color: '#FFFFFF', // White text
    fontFamily: 'Poppins-Medium',
  },
  registerContainer: {
    position: 'absolute',
    bottom: hp(40),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing(20),
    flexWrap: 'wrap',
  },
  registerText: {
    fontSize: fontSize(14),
    color: '#666666', // Dark grey text as shown in screenshot
    fontFamily: 'Poppins',
  },
  registerLink: {
    fontSize: fontSize(14),
    color: '#2979FF', // Blue color for clickable link
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});

