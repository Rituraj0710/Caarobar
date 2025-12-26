import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import api from '@/lib/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import BackButton from '@/components/BackButton';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH, useSafeArea } from '../utils/responsive';

type RootStackParamList = {
  Language: undefined;
  SignIn: undefined;
  OTPVerification: { identifier: string };
  Register: undefined;
  Home: undefined;
};

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  mobile: z.string().min(10, 'Mobile number is required'),
  alternateNo: z.string().optional(),
  companyName: z.string().min(2, 'Company name is required'),
  address: z.string().min(5, 'Address is required'),
});

type FormValues = z.infer<typeof schema>;

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const insets = useSafeArea();
  const { register, setValue, handleSubmit, formState: { errors, isSubmitting }, setError, clearErrors, watch } = useForm<FormValues>({
    defaultValues: { 
      name: '', 
      email: '',
      mobile: '',
      alternateNo: '',
      companyName: '',
      address: ''
    },
  });

  // Watch form values for controlled inputs
  const name = watch('name');
  const email = watch('email');
  const mobile = watch('mobile');
  const alternateNo = watch('alternateNo');
  const companyName = watch('companyName');
  const address = watch('address');

  React.useEffect(() => {
    register('name');
    register('email');
    register('mobile');
    register('alternateNo');
    register('companyName');
    register('address');
  }, [register]);

  const onSubmit = async (values: FormValues) => {
    if (!agreedToTerms) {
      alert('Please agree to Terms & Conditions and Privacy Policy');
      return;
    }
    
    try {
      const parsed = schema.safeParse(values);
      if (!parsed.success) {
        const first = parsed.error.issues[0];
        const field = first?.path?.[0] as keyof FormValues;
        if (field) {
          setError(field, { type: 'validate', message: first.message });
        }
        return;
      }
      const { data } = await api.post('/auth/register', values);
      if (data?.user) {
        await AsyncStorage.setItem('@user', JSON.stringify(data.user));
      }
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (e: any) {
      console.error('Registration error:', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        {/* Back Button */}
        <View style={{ position: 'absolute', top: Math.max(0, insets.top - spacing(4)), left: wp(23), zIndex: 10 }}>
          <BackButton 
            onPress={() => navigation.goBack()}
            color="#000000"
            width={wp(20)}
            height={hp(18)}
          />
        </View>
        <ScrollView style={{flex: 1}} contentContainerStyle={{ paddingBottom: hp(32) + insets.bottom }} keyboardShouldPersistTaps="handled">
        {/* Header titles */}
        <View style={{ alignItems: 'center', marginTop: hp(35), marginBottom: spacing(10), width: Math.min(wp(400), SCREEN_WIDTH - spacing(32)), alignSelf: 'center' }}>
          <Text style={{ fontFamily: 'LexendDeca-Bold', fontWeight: '700', fontSize: fontSize(24), lineHeight: 36, color: '#12110D', textAlign: 'center' }} allowFontScaling={false}>Register Account</Text>
          <Text style={{ fontFamily: 'LexendDeca-Bold', fontWeight: '700', fontSize: fontSize(24), lineHeight: 36, color: '#12110D', textAlign: 'center', marginTop: spacing(2) }} allowFontScaling={false}>to <Text style={{ color: '#248CFF' }} allowFontScaling={false}>CAAROBAR</Text></Text>
          <Text style={{ fontFamily: 'Poppins', fontSize: fontSize(12.5), color: '#888', marginTop: spacing(8) }} allowFontScaling={false}>Hello there, register to continue</Text>
        </View>
        {/* Form field cards */}
        <View style={{ alignItems: 'center' }}>
          {/* Enter Name */}
          <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), height: hp(50), marginBottom: spacing(18), backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: spacing(12), backgroundColor: '#fff', paddingHorizontal: spacing(4), fontFamily: 'Inter', fontWeight: '500', fontSize: fontSize(14), lineHeight: 21, color: 'rgba(52,122,255,1)' }} allowFontScaling={false}>Enter Name</Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#ACACAB"
              value={name}
              onChangeText={(text) => setValue('name', text, { shouldValidate: true })}
              allowFontScaling={false}
              style={{ paddingHorizontal: spacing(12), fontSize: fontSize(14), color: '#12110D' }}
            />
          </View>
          {errors.name && <Text style={{ color: '#ef4444', fontSize: fontSize(12), alignSelf: 'flex-start', marginLeft: spacing(32), marginTop: -spacing(6), marginBottom: spacing(8) }} allowFontScaling={false}>{errors.name.message}</Text>}
          {/* Email Address */}
          <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), height: hp(50), marginBottom: spacing(18), backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: spacing(12), backgroundColor: '#fff', paddingHorizontal: spacing(4), fontFamily: 'Inter', fontWeight: '500', fontSize: fontSize(14), lineHeight: 21, color: 'rgba(52,122,255,1)' }} allowFontScaling={false}>Email Address</Text>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor="#ACACAB"
              value={email}
              onChangeText={(text) => setValue('email', text, { shouldValidate: true })}
              keyboardType="email-address"
              autoCapitalize="none"
              allowFontScaling={false}
              style={{ paddingHorizontal: spacing(12), fontSize: fontSize(14), color: '#12110D' }}
            />
          </View>
          {errors.email && <Text style={{ color: '#ef4444', fontSize: fontSize(12), alignSelf: 'flex-start', marginLeft: spacing(32), marginTop: -spacing(6), marginBottom: spacing(8) }} allowFontScaling={false}>{errors.email.message}</Text>}
          {/* Enter Mobile */}
          <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), height: hp(50), marginBottom: spacing(18), backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: hp(6), borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: spacing(12), backgroundColor: '#fff', paddingHorizontal: spacing(4), fontFamily: 'Inter', fontWeight: '500', fontSize: fontSize(14), lineHeight: 21, color: 'rgba(52,122,255,1)' }} allowFontScaling={false}>Enter Mobile</Text>
            <TextInput
              placeholder="Enter your mobile number"
              placeholderTextColor="#ACACAB"
              value={mobile}
              onChangeText={(text) => setValue('mobile', text, { shouldValidate: true })}
              keyboardType="phone-pad"
              allowFontScaling={false}
              style={{ paddingHorizontal: spacing(12), fontSize: fontSize(14), color: '#12110D' }}
            />
          </View>
          {errors.mobile && <Text style={{ color: '#ef4444', fontSize: fontSize(12), alignSelf: 'flex-start', marginLeft: spacing(32), marginTop: -spacing(6), marginBottom: spacing(8) }} allowFontScaling={false}>{errors.mobile.message}</Text>}
          {/* Alternate No */}
          <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), height: hp(50), marginBottom: spacing(18), backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: hp(6), borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: spacing(12), backgroundColor: '#fff', paddingHorizontal: spacing(4), fontFamily: 'Inter', fontWeight: '500', fontSize: fontSize(14), lineHeight: 21, color: 'rgba(52,122,255,1)' }} allowFontScaling={false}>Alternate No</Text>
            <TextInput
              placeholder="Enter alternate number (optional)"
              placeholderTextColor="#ACACAB"
              value={alternateNo}
              onChangeText={(text) => setValue('alternateNo', text)}
              keyboardType="phone-pad"
              allowFontScaling={false}
              style={{ paddingHorizontal: spacing(12), fontSize: fontSize(14), color: '#12110D' }}
            />
          </View>
          {/* Company Name */}
          <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), height: hp(50), marginBottom: spacing(18), backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: hp(6), borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: spacing(12), backgroundColor: '#fff', paddingHorizontal: spacing(4), fontFamily: 'Inter', fontWeight: '500', fontSize: fontSize(14), lineHeight: 21, color: 'rgba(52,122,255,1)' }} allowFontScaling={false}>Company Name</Text>
            <TextInput
              placeholder="Enter your company name"
              placeholderTextColor="#ACACAB"
              value={companyName}
              onChangeText={(text) => setValue('companyName', text, { shouldValidate: true })}
              allowFontScaling={false}
              style={{ paddingHorizontal: spacing(12), fontSize: fontSize(14), color: '#12110D' }}
            />
          </View>
          {errors.companyName && <Text style={{ color: '#ef4444', fontSize: fontSize(12), alignSelf: 'flex-start', marginLeft: spacing(32), marginTop: -spacing(6), marginBottom: spacing(8) }} allowFontScaling={false}>{errors.companyName.message}</Text>}
          {/* Address */}
          <View style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), height: hp(50), marginBottom: spacing(18), backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: hp(6), borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: spacing(12), backgroundColor: '#fff', paddingHorizontal: spacing(4), fontFamily: 'Inter', fontWeight: '500', fontSize: fontSize(14), lineHeight: 21, color: 'rgba(52,122,255,1)' }} allowFontScaling={false}>Address</Text>
            <TextInput
              placeholder="Enter your address"
              placeholderTextColor="#ACACAB"
              value={address}
              onChangeText={(text) => setValue('address', text, { shouldValidate: true })}
              allowFontScaling={false}
              style={{ paddingHorizontal: spacing(12), fontSize: fontSize(14), color: '#12110D' }}
            />
          </View>
          {errors.address && <Text style={{ color: '#ef4444', fontSize: fontSize(12), alignSelf: 'flex-start', marginLeft: spacing(32), marginTop: -spacing(6), marginBottom: spacing(8) }} allowFontScaling={false}>{errors.address.message}</Text>}
        </View>
        {/* Terms and Conditions */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing(12), marginBottom: spacing(18), width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} style={{ marginRight: spacing(12), marginTop: spacing(4) }}>
            <View style={{ width: wp(20), height: hp(20), borderRadius: 4, borderWidth: 2, borderColor: agreedToTerms ? '#248CFF' : '#D1D5DB', alignItems: 'center', justifyContent: 'center', backgroundColor: agreedToTerms ? '#248CFF' : 'transparent' }}>
              {agreedToTerms && <Text style={{ color: '#fff', fontSize: fontSize(12) }} allowFontScaling={false}>✓</Text>}
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: fontSize(13), color: '#12110D', lineHeight: 18 }} allowFontScaling={false}>
              I agree to the <Text style={{ color: '#248CFF' }} allowFontScaling={false}>Term & Conditions</Text> & <Text style={{ color: '#248CFF' }} allowFontScaling={false}>Privacy Policy</Text>{'\n'}set out by this site.
            </Text>
          </View>
        </View>
        {/* Register Button */}
        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting} style={{ width: Math.min(wp(392), SCREEN_WIDTH - spacing(32)), height: hp(55), borderRadius: hp(30), backgroundColor: '#248CFF', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: spacing(24) }}>
          <Text style={{ color: '#fff', fontSize: fontSize(16), fontWeight: '700' }} allowFontScaling={false}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


