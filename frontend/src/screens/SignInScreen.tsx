import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';
import Logo from '@/components/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

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
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Language')}
        style={{ position: 'absolute', top: 24, left: 16, zIndex: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
      >
        <Text style={{ fontSize: 28, color: '#12110D' }}>←</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
        {/* Logo + Tagline block */}
        <View style={{ alignItems: 'center', marginTop: 66, marginBottom: 18, width: 400, alignSelf: 'center' }}>
          <Image
            source={require('../../assets/caarobar (2) 1.png')}
            style={{ width: 130.81, height: 62, resizeMode: 'contain' }}
          />
          <Text style={{ width: 285, marginTop: 8, fontFamily: 'Inter', fontWeight: '400', fontSize: 13, color: '#12110D', lineHeight: 19.5, textAlign: 'center' }}>
            Get Control of your staff management with us.
          </Text>
        </View>
        {/* Welcome Section (Lexend Deca 24/36) */}
        <View style={{ alignSelf: 'center', marginBottom: 10, width: 400 }}>
          <Text style={{ fontFamily: 'LexendDeca-Bold', fontWeight: '700', fontSize: 24, color: '#12110D', textAlign: 'left', lineHeight: 36 }}>
            Welcome Back <Text style={{ fontSize: 24 }}>👋</Text>
          </Text>
          <Text style={{ fontFamily: 'LexendDeca-Bold', fontWeight: '700', fontSize: 24, color: '#12110D', textAlign: 'left', lineHeight: 36, marginBottom: 2 }}>
            to <Text style={{ color: '#248CFF' }}>CAAROBAR</Text>
          </Text>
          <Text style={{ color: '#787878', fontFamily: 'Poppins', fontSize: 13, marginVertical: 6, lineHeight: 20, textAlign: 'left' }}>Hello there, login to continue</Text>
        </View>
        {/* Country row */}
        <View style={{ width: 400, alignSelf: 'center', marginBottom: 14, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 20.5, marginRight: 8 }}>🇮🇳</Text>
          <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 21, color: 'rgba(0,0,0,1)', marginRight: 6 }}>INDIA</Text>
          <Text style={{ fontSize: 12, color: '#000' }}>▼</Text>
        </View>
        {/* Email/Phone field card */}
        <View style={{ width: 392, height: 50, alignSelf: 'center', marginBottom: 16, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
          <Text style={{ position: 'absolute', top: -10, left: 16, backgroundColor: '#fff', paddingHorizontal: 4, fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 21, color: 'rgba(52,122,255,1)' }}>Email/Phone</Text>
          <TextInput
            placeholder=""
            placeholderTextColor="#12110D"
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType="phone-pad"
            autoComplete="tel"
            style={{
              flex: 1,
              paddingHorizontal: 12,
              fontSize: 14,
              color: '#12110D',
            }}
          />
        </View>
        {/* Admin button */}
        <TouchableOpacity
          onPress={() => {
            setRole('Admin');
            if (identifier.trim()) {
              navigation.navigate('OTPVerification', { identifier: identifier.trim(), role: 'Admin' });
            }
          }}
          style={{
            width: 392,
            height: 55,
            alignSelf: 'center',
            borderRadius: 30,
            backgroundColor: 'rgba(45,110,255,1)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 14,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.3)'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, marginRight: 8 }}>🧑‍💼</Text>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Admin</Text>
        </TouchableOpacity>
        {/* Employee button */}
        <TouchableOpacity
          onPress={() => {
            setRole('Employee');
            if (identifier.trim()) {
              navigation.navigate('OTPVerification', { identifier: identifier.trim(), role: 'Employee' });
            }
          }}
          style={{
            width: 392,
            height: 55,
            alignSelf: 'center',
            borderRadius: 30,
            backgroundColor: 'rgba(45,110,255,1)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 18,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.3)'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, marginRight: 8 }}>👥</Text>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700' }}>Employee</Text>
        </TouchableOpacity>
        {/* Separator */}
        <View style={{ width: 392, alignSelf: 'center', marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#E5E5E5' }} />
          <Text style={{ marginHorizontal: 10, color: '#B3B3B3', fontSize: 12 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#E5E5E5' }} />
        </View>
        {/* Google button */}
        <TouchableOpacity style={{ width: 360, height: 48, borderRadius: 12, backgroundColor: '#F2F3F5', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, borderColor: '#E3E2E2', marginBottom: 34 }}>
          <Image source={require('../../assets/Google.png')} style={{ width: 18, height: 18, marginRight: 10, resizeMode: 'contain' }} />
          <Text style={{ fontSize: 15, color: '#12110D', fontWeight: '600' }}>Continue with Google</Text>
        </TouchableOpacity>
        {/* Spacer to push footer to bottom */}
        <View style={{ flex: 1 }} />
        {/* Register link */}
        <View style={{ width: 247, height: 21, alignSelf: 'center', marginBottom: 45 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: 14, lineHeight: 21, color: '#12110D' }}>Didn't have a account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 21, color: '#248CFF' }}>Register here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


