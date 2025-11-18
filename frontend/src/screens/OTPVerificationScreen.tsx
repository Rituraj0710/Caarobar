import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, KeyboardAvoidingView, Platform, Image, Pressable, TouchableOpacity, StatusBar } from 'react-native';
import Illustration from '../../assets/VerifcationCode.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import OTPInput from '@/components/ui/OTPInput';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH } from '../utils/responsive';

type RootStackParamList = {
  Language: undefined;
  SignIn: undefined;
  OTPVerification: { identifier: string; role?: 'Admin' | 'Employee' };
  Register: undefined;
  Home: undefined;
  AdminHome: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

export default function OTPVerificationScreen({ route, navigation }: Props) {
  const { identifier, role } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);

  const onVerify = async () => {
    setError(null);
    if (otp.trim().length !== 4) {
      setError('Please enter the 4-digit code');
      return;
    }
    
    // Initial phase: Accept preset codes
    const expectedCode = role === 'Admin' ? '0000' : role === 'Employee' ? '9999' : null;
    
    if (expectedCode && otp.trim() === expectedCode) {
      // Valid preset code - navigate to Home
      setLoading(true);
      setTimeout(() => {
        if (role === 'Admin') {
          navigation.reset({ index: 0, routes: [{ name: 'AdminHome' }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }
        setLoading(false);
      }, 500);
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/auth/verify-otp', { identifier, otp: otp.trim() });
      if (data?.token) {
        await AsyncStorage.setItem('@jwt', data.token);
      }
      if (data?.user) {
        await AsyncStorage.setItem('@user', JSON.stringify(data.user));
      }
      const profileComplete = data?.profileComplete ?? !!data?.user?.name;
      if (profileComplete) {
        if (role === 'Admin') {
          navigation.reset({ index: 0, routes: [{ name: 'AdminHome' }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }
      } else {
        navigation.replace('Register');
      }
    } catch (e: any) {
      setError('Invalid OTP, try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onResend = async () => {
    if (countdown > 0) return;
    try {
      await api.post('/auth/request-otp', { identifier });
      setCountdown(30);
    } catch {}
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
        {/* Header with Back Button */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(60), width: '90%', paddingHorizontal: spacing(16), position: 'relative' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: spacing(16) }}>
            <Text style={{ fontSize: fontSize(24) }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Poppins-Bold', fontWeight: '700', fontSize: fontSize(22), color: '#12110D', textAlign: 'center', width: '100%' }}>
            Enter Verification Code
          </Text>
        </View>

        {/* Subtitle */}
        <Text style={{ fontFamily: 'Poppins', fontSize: fontSize(13), color: '#888', textAlign: 'center', marginTop: spacing(10), marginBottom: spacing(28), width: '90%' }}>
          We have sent the code verification to your Gmail
        </Text>

        {/* Illustration */}
        <View style={{ alignItems: 'center', marginBottom: 0 }}>
          <Image
            accessibilityLabel="OTP verification illustration"
            source={Illustration}
            style={{ width: Math.min(wp(480), SCREEN_WIDTH - spacing(40)), height: Math.min(hp(480), SCREEN_WIDTH - spacing(40)), resizeMode: 'contain' }}
          />
        </View>

        {/* OTP Input */}
        <View style={{ width: '90%', marginBottom: spacing(16), alignItems: 'center', justifyContent: 'center', marginTop: spacing(8) }}>
          <OTPInput value={otp} onChange={setOtp} autoFocus accessibilityLabel="OTP input" />
        </View>

        {/* Timer and Resend */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginBottom: spacing(24) }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: fontSize(14), color: '#888', marginRight: spacing(8), marginBottom: spacing(2) }}>
            00:{String(countdown).padStart(2, '30')}
          </Text>
          <TouchableOpacity onPress={onResend} disabled={countdown > 0}>
            <Text style={{ 
              fontFamily: 'Poppins', 
              fontSize: fontSize(14), 
              color: countdown > 0 ? '#888' : '#248CFF',
              fontWeight: countdown > 0 ? '400' : '600'
            }}>
              Resend it
            </Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={{ color: '#FE0032', fontFamily: 'Poppins', fontSize: fontSize(13), textAlign: 'center', marginBottom: spacing(16) }}>
            {error}
          </Text>
        ) : null}

        {/* Verify Button */}
        <TouchableOpacity 
          onPress={onVerify} 
          disabled={loading}
          style={{
            width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)),
            height: hp(55),
            borderRadius: 30,
            backgroundColor: '#248CFF',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: hp(32),
            alignSelf: 'center'
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: '#fff', fontSize: fontSize(16), fontFamily: 'Poppins', fontWeight: '600' }}>Verify</Text>
          )}
        </TouchableOpacity>

        {/* Spacer to push footer to bottom */}
        <View style={{ flex: 1 }} />

        {/* Register Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: hp(32), width: '90%' }}>
          <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: fontSize(14), lineHeight: 21, color: '#12110D' }}>
            Didn't have a account ?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ fontFamily: 'Inter', fontWeight: '500', fontSize: fontSize(14), lineHeight: 21, color: '#248CFF' }}>
              Register here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


