import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import BackButton from '@/components/BackButton';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH, useSafeArea } from '../utils/responsive';

type RootStackParamList = {
  RoleSelection: undefined;
  Language: undefined;
  SignIn: { role?: 'Admin' | 'Employee' };
  OTPVerification: { identifier: string; role?: 'Admin' | 'Employee' };
  Register: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export default function SignInScreen({ navigation, route }: Props) {
  const [identifier, setIdentifier] = useState('');
  const [role, setRole] = useState<'Admin' | 'Employee'>(route.params?.role || 'Admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const insets = useSafeArea();

  useEffect(() => {
    // Load stored role from AsyncStorage
    (async () => {
      const storedRole = await AsyncStorage.getItem('@selectedRole');
      if (storedRole && (storedRole === 'Admin' || storedRole === 'Employee')) {
        setRole(storedRole as 'Admin' | 'Employee');
      } else if (route.params?.role) {
        setRole(route.params.role);
      }
    })();
  }, [route.params?.role]);

  const onSendOtp = async () => {
    setError(null);
    if (!identifier || identifier.trim().length < 3) {
      setError('Please enter a valid phone or email');
      return;
    }
    setLoading(true);
    
    // Navigate to OTP verification page
    setTimeout(() => {
      navigation.navigate('OTPVerification', { identifier: identifier.trim(), role: role });
      setLoading(false);
    }, 500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Back Button */}
      <View style={{ position: 'absolute', top: Math.max(0, insets.top - spacing(8)), left: (SCREEN_WIDTH - Math.min(wp(392), SCREEN_WIDTH - spacing(32))) / 2 - spacing(4), zIndex: 10 }}>
        <BackButton 
          onPress={() => navigation.goBack()}
          color="#000000"
          width={wp(20)}
          height={hp(18)}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
        {/* Logo + Tagline block */}
        <View style={{ alignItems: 'center', marginTop: hp(20), marginBottom: spacing(18), width: Math.min(wp(400), SCREEN_WIDTH - spacing(32)), alignSelf: 'center' }}>
          <Image
            source={require('../../assets/caarobar (2) 1.png')}
            style={{ width: wp(130.81), height: hp(62), resizeMode: 'contain' }}
          />
          <Text style={{ width: wp(285), marginTop: spacing(8), fontFamily: 'Inter', fontWeight: '300', fontSize: fontSize(13), color: '#12110D', lineHeight: 19.5, textAlign: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }} allowFontScaling={false}>
            Get Control of your staff management with us.
          </Text>
        </View>
        {/* Welcome Section */}
        <View style={{ alignSelf: 'center', marginBottom: spacing(24), width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)) }}>
          <Text style={{ fontFamily: 'Lexend Deca', fontWeight: '700', fontSize: 24, color: '#12110D', textAlign: 'left', lineHeight: 36, marginBottom: spacing(4), letterSpacing: 1.5 }} allowFontScaling={false}>
            Welcome Back 👋
          </Text>
          <Text style={{ fontFamily: 'Lexend Deca', fontWeight: '700', fontSize: 24, color: '#2979FF', textAlign: 'left', lineHeight: 36, marginBottom: spacing(8), letterSpacing: 1.5 }} allowFontScaling={false}>
            to CAAROBAR
          </Text>
          <Text style={{ color: '#787878', fontFamily: 'Poppins', fontSize: fontSize(13), lineHeight: fontSize(20), textAlign: 'left' }} allowFontScaling={false}>Hello there, login to continue</Text>
        </View>
        {/* Country and Phone Input Fields - Side by Side */}
        <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), alignSelf: 'center', marginBottom: spacing(24), flexDirection: 'row' }}>
          {/* Country Selector - Left */}
          <TouchableOpacity
            style={{
              width: wp(140),
              height: hp(50),
              backgroundColor: '#FFFFFF',
              borderRadius: spacing(8),
              borderWidth: 1,
              borderColor: '#828282',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: spacing(12),
              marginRight: spacing(12),
            }}
          >
            {/* Indian Flag - Simple representation */}
            <View style={{ width: wp(24), height: hp(16), marginRight: spacing(8), overflow: 'hidden', borderRadius: 2 }}>
              <View style={{ flex: 1, backgroundColor: '#FF9933' }} />
              <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: wp(8), height: hp(8), borderRadius: wp(4), borderWidth: 1, borderColor: '#000080' }} />
              </View>
              <View style={{ flex: 1, backgroundColor: '#138808' }} />
            </View>
            <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: fontSize(14), color: '#999999', marginRight: spacing(6) }} allowFontScaling={false}>INDIA</Text>
            <Text style={{ fontSize: fontSize(10), color: '#666666' }} allowFontScaling={false}>▼</Text>
          </TouchableOpacity>
          
          {/* Phone Number Input - Right */}
          <View style={{
            flex: 1,
            height: hp(50),
            backgroundColor: '#FFFFFF',
            borderRadius: spacing(8),
            borderWidth: 1,
            borderColor: '#828282',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing(12),
          }}>
            <Text style={{ fontSize: fontSize(14), color: '#000000', marginRight: spacing(4), fontWeight: '700' }} allowFontScaling={false}>+91</Text>
          <TextInput
              placeholder="Enter Phone Number"
              placeholderTextColor="#999999"
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType="phone-pad"
            autoComplete="tel"
              allowFontScaling={false}
            style={{
              flex: 1,
              fontSize: fontSize(14),
              color: '#12110D',
            }}
          />
        </View>
        </View>
        
        {/* Continue Button */}
        <TouchableOpacity
          onPress={onSendOtp}
          disabled={loading}
          style={{
            width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)),
            height: hp(50),
            alignSelf: 'center',
            borderRadius: hp(25), // Fully rounded (pill-shaped)
            backgroundColor: '#2979FF',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing(20),
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: fontSize(16), fontWeight: '600', fontFamily: 'Poppins-SemiBold' }} allowFontScaling={false}>
            Continue
          </Text>
        </TouchableOpacity>
        {/* Separator */}
        <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), alignSelf: 'center', marginBottom: spacing(20), flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#828282' }} />
          <Text style={{ marginHorizontal: spacing(10), color: '#828282', fontSize: fontSize(12), fontFamily: 'Poppins' }} allowFontScaling={false}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#828282' }} />
        </View>
        {/* Google and Email Icons - Circular */}
        <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), alignSelf: 'center', marginBottom: spacing(40), flexDirection: 'row', justifyContent: 'center' }}>
          {/* Google Icon */}
          <TouchableOpacity
            style={{
              width: wp(56),
              height: hp(56),
              borderRadius: wp(28),
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#CCCCCC',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing(20),
            }}
          >
            <Image 
              source={require('../../assets/Google.png')} 
              style={{ width: wp(28), height: hp(28), resizeMode: 'contain' }} 
            />
          </TouchableOpacity>
          
          {/* Email Icon */}
          <TouchableOpacity
            style={{
              width: wp(56),
              height: hp(56),
              borderRadius: wp(28),
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#CCCCCC',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image 
              source={require('../../assets/gmail_icon_for_sign_up_page-removebg-preview.png')} 
              style={{ width: wp(36), height: hp(36), resizeMode: 'contain' }} 
            />
          </TouchableOpacity>
        </View>
        {/* Spacer to push footer to bottom */}
        <View style={{ flex: 1 }} />
        
        {/* Footer - Terms and Privacy */}
        <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), alignSelf: 'center', marginBottom: spacing(20) + insets.bottom, alignItems: 'center', paddingHorizontal: spacing(16) }}>
          <Text style={{ fontSize: fontSize(12), color: '#999999', fontFamily: 'Poppins', marginBottom: spacing(4), textAlign: 'center', lineHeight: fontSize(18) }} allowFontScaling={false}>
            By continuing, you agree to our
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>
              <Text style={{ fontSize: fontSize(12), color: '#666666', fontFamily: 'Poppins', textDecorationLine: 'underline', lineHeight: fontSize(18) }} allowFontScaling={false}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: fontSize(12), color: '#999999', marginHorizontal: spacing(3) }} allowFontScaling={false}> </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: fontSize(12), color: '#666666', fontFamily: 'Poppins', textDecorationLine: 'underline', lineHeight: fontSize(18) }} allowFontScaling={false}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: fontSize(12), color: '#999999', marginHorizontal: spacing(3) }} allowFontScaling={false}> </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: fontSize(12), color: '#666666', fontFamily: 'Poppins', textDecorationLine: 'underline', lineHeight: fontSize(18) }} allowFontScaling={false}>Content Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


