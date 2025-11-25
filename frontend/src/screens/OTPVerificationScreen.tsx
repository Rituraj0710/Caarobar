import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, KeyboardAvoidingView, Platform, Image, Pressable, TouchableOpacity, StatusBar, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Illustration from '../../assets/VerifcationCode.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH, useSafeArea } from '../utils/responsive';

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
  const insets = useSafeArea();
  const inputRef = useRef<TextInput>(null);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ScrollView 
          contentContainerStyle={{ 
            flexGrow: 1, 
            alignItems: 'center', 
            width: '100%',
            paddingBottom: insets.bottom + spacing(32)
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with Back Button */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: insets.top + spacing(20), width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), paddingHorizontal: spacing(16), position: 'relative', alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: spacing(16), zIndex: 10, width: wp(40), height: hp(40), alignItems: 'center', justifyContent: 'center' }} hitSlop={{top: hp(10), left: wp(10), bottom: hp(10), right: wp(10)}}>
              <Text style={{ fontSize: fontSize(28), color: '#12110D' }} allowFontScaling={false}>←</Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Poppins-Bold', fontWeight: '700', fontSize: fontSize(22), color: '#12110D', textAlign: 'center', width: '100%' }} allowFontScaling={false}>
              Enter Verification Code
            </Text>
          </View>

        {/* Subtitle */}
        <Text style={{ fontFamily: 'Poppins', fontSize: fontSize(13), color: '#888888', textAlign: 'center', marginTop: spacing(10), marginBottom: spacing(28), width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), alignSelf: 'center', paddingHorizontal: spacing(16) }} allowFontScaling={false}>
          We have sent the code verification to your Phone
        </Text>

        {/* Illustration */}
        <View style={{ alignItems: 'center', marginBottom: spacing(20), width: '100%' }}>
          <Image
            accessibilityLabel="OTP verification illustration"
            source={Illustration}
            style={{ 
              width: Math.min(wp(320), SCREEN_WIDTH - spacing(40)), 
              height: Math.min(hp(320), (SCREEN_WIDTH - spacing(40)) * 0.8), 
              resizeMode: 'contain' 
            }}
          />
        </View>

        {/* OTP Input - 4 boxes */}
        <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), marginBottom: spacing(24), alignItems: 'center', justifyContent: 'center', alignSelf: 'center', paddingHorizontal: spacing(16) }}>
          <Pressable
            onPress={() => inputRef.current?.focus()}
            style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'nowrap' }}
          >
            {[0, 1, 2, 3].map((idx) => {
              const digit = otp[idx] || '';
              const boxSize = Math.min(wp(56), hp(56)); // Use smaller dimension to maintain square shape
              return (
                <View
                  key={idx}
                  style={{
                    width: boxSize,
                    height: boxSize,
                    borderRadius: spacing(8),
                    borderWidth: wp(1),
                    borderColor: error ? '#FE0032' : '#E0E0E0',
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: spacing(6),
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSize(24),
                      fontWeight: '600',
                      color: '#12110D',
                    }}
                    allowFontScaling={false}
                  >
                    {digit}
                  </Text>
                </View>
              );
            })}
          </Pressable>
          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={(text) => setOtp(text.replace(/\D/g, '').slice(0, 4))}
            keyboardType="number-pad"
            returnKeyType="done"
            maxLength={4}
            style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
            autoFocus
            allowFontScaling={false}
          />
        </View>

        {/* Timer and Resend - Right aligned */}
        <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: spacing(24), alignSelf: 'center', paddingHorizontal: spacing(16) }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: fontSize(14), color: '#12110D', marginRight: spacing(8) }} allowFontScaling={false}>
            00:{String(countdown).padStart(2, '0')}
          </Text>
          <TouchableOpacity onPress={onResend} disabled={countdown > 0} hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}>
            <Text style={{ 
              fontFamily: 'Poppins', 
              fontSize: fontSize(14), 
              color: countdown > 0 ? '#888888' : '#248CFF',
              fontWeight: countdown > 0 ? '400' : '600'
            }} allowFontScaling={false}>
              Resend it
            </Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={{ color: '#FE0032', fontFamily: 'Poppins', fontSize: fontSize(13), textAlign: 'center', marginBottom: spacing(16), width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), alignSelf: 'center' }} allowFontScaling={false}>
            {error}
          </Text>
        ) : null}

        {/* Verify Button */}
        <TouchableOpacity 
          onPress={onVerify} 
          disabled={loading || otp.trim().length !== 4}
          style={{
            width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)),
            height: hp(50),
            borderRadius: spacing(8), // Slightly rounded corners (matching screenshot)
            backgroundColor: (loading || otp.trim().length !== 4) ? '#CCCCCC' : '#248CFF',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: spacing(32),
            marginBottom: spacing(16),
            alignSelf: 'center',
            paddingHorizontal: spacing(16),
            opacity: (loading || otp.trim().length !== 4) ? 0.6 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: '#FFFFFF', fontSize: fontSize(16), fontFamily: 'Poppins', fontWeight: '600' }} allowFontScaling={false}>Verify</Text>
          )}
        </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


