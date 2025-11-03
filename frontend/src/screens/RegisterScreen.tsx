import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import api from '@/lib/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

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
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView style={{flex: 1}} contentContainerStyle={{ paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
        {/* Back arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 20, left: 16, zIndex: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </TouchableOpacity>
        {/* Header titles */}
        <View style={{ alignItems: 'center', marginTop: 65, marginBottom: 10, width: 400, alignSelf: 'center' }}>
          <Text style={{ fontFamily: 'LexendDeca-Bold', fontWeight: '700', fontSize: 24, lineHeight: 36, color: '#12110D', textAlign: 'center' }}>Register Account</Text>
          <Text style={{ fontFamily: 'LexendDeca-Bold', fontWeight: '700', fontSize: 24, lineHeight: 36, color: '#12110D', textAlign: 'center', marginTop: 2 }}>to <Text style={{ color: '#248CFF' }}>CAAROBAR</Text></Text>
          <Text style={{ fontFamily: 'Poppins', fontSize: 12.5, color: '#888', marginTop: 8 }}>Hello there, register to continue</Text>
        </View>
        {/* Form field cards */}
        <View style={{ alignItems: 'center' }}>
          {/* Enter Name */}
          <View style={{ width: 392, height: 50, marginBottom: 18, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: 12, backgroundColor: '#fff', paddingHorizontal: 4, fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 21, color: 'rgba(52,122,255,1)' }}>Enter Name</Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#ACACAB"
              value={name}
              onChangeText={(text) => setValue('name', text, { shouldValidate: true })}
              style={{ paddingHorizontal: 12, fontSize: 14, color: '#12110D' }}
            />
          </View>
          {errors.name && <Text style={{ color: '#ef4444', fontSize: 12, alignSelf: 'flex-start', marginLeft: 32, marginTop: -6, marginBottom: 8 }}>{errors.name.message}</Text>}
          {/* Email Address */}
          <View style={{ width: 392, height: 50, marginBottom: 18, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: 12, backgroundColor: '#fff', paddingHorizontal: 4, fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 21, color: 'rgba(52,122,255,1)' }}>Email Address</Text>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor="#ACACAB"
              value={email}
              onChangeText={(text) => setValue('email', text, { shouldValidate: true })}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ paddingHorizontal: 12, fontSize: 14, color: '#12110D' }}
            />
          </View>
          {errors.email && <Text style={{ color: '#ef4444', fontSize: 12, alignSelf: 'flex-start', marginLeft: 32, marginTop: -6, marginBottom: 8 }}>{errors.email.message}</Text>}
          {/* Enter Mobile */}
          <View style={{ width: 392, height: 50, marginBottom: 18, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: 12, backgroundColor: '#fff', paddingHorizontal: 4, fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 21, color: 'rgba(52,122,255,1)' }}>Enter Mobile</Text>
            <TextInput
              placeholder="Enter your mobile number"
              placeholderTextColor="#ACACAB"
              value={mobile}
              onChangeText={(text) => setValue('mobile', text, { shouldValidate: true })}
              keyboardType="phone-pad"
              style={{ paddingHorizontal: 12, fontSize: 14, color: '#12110D' }}
            />
          </View>
          {errors.mobile && <Text style={{ color: '#ef4444', fontSize: 12, alignSelf: 'flex-start', marginLeft: 32, marginTop: -6, marginBottom: 8 }}>{errors.mobile.message}</Text>}
          {/* Alternate No */}
          <View style={{ width: 392, height: 50, marginBottom: 18, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: 12, backgroundColor: '#fff', paddingHorizontal: 4, fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 21, color: 'rgba(52,122,255,1)' }}>Alternate No</Text>
            <TextInput
              placeholder="Enter alternate number (optional)"
              placeholderTextColor="#ACACAB"
              value={alternateNo}
              onChangeText={(text) => setValue('alternateNo', text)}
              keyboardType="phone-pad"
              style={{ paddingHorizontal: 12, fontSize: 14, color: '#12110D' }}
            />
          </View>
          {/* Company Name */}
          <View style={{ width: 392, height: 50, marginBottom: 18, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: 12, backgroundColor: '#fff', paddingHorizontal: 4, fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 21, color: 'rgba(52,122,255,1)' }}>Company Name</Text>
            <TextInput
              placeholder="Enter your company name"
              placeholderTextColor="#ACACAB"
              value={companyName}
              onChangeText={(text) => setValue('companyName', text, { shouldValidate: true })}
              style={{ paddingHorizontal: 12, fontSize: 14, color: '#12110D' }}
            />
          </View>
          {errors.companyName && <Text style={{ color: '#ef4444', fontSize: 12, alignSelf: 'flex-start', marginLeft: 32, marginTop: -6, marginBottom: 8 }}>{errors.companyName.message}</Text>}
          {/* Address */}
          <View style={{ width: 392, height: 50, marginBottom: 18, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6, borderWidth: 1, borderColor: 'rgb(130,130,130)', justifyContent: 'center' }}>
            <Text style={{ position: 'absolute', top: -10, left: 12, backgroundColor: '#fff', paddingHorizontal: 4, fontFamily: 'Inter', fontWeight: '500', fontSize: 14, lineHeight: 21, color: 'rgba(52,122,255,1)' }}>Address</Text>
            <TextInput
              placeholder="Enter your address"
              placeholderTextColor="#ACACAB"
              value={address}
              onChangeText={(text) => setValue('address', text, { shouldValidate: true })}
              style={{ paddingHorizontal: 12, fontSize: 14, color: '#12110D' }}
            />
          </View>
          {errors.address && <Text style={{ color: '#ef4444', fontSize: 12, alignSelf: 'flex-start', marginLeft: 32, marginTop: -6, marginBottom: 8 }}>{errors.address.message}</Text>}
        </View>
        {/* Terms and Conditions */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 12, marginBottom: 18, width: 392, alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => setAgreedToTerms(!agreedToTerms)} style={{ marginRight: 12, marginTop: 4 }}>
            <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: agreedToTerms ? '#248CFF' : '#D1D5DB', alignItems: 'center', justifyContent: 'center', backgroundColor: agreedToTerms ? '#248CFF' : 'transparent' }}>
              {agreedToTerms && <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>}
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, color: '#12110D', lineHeight: 18 }}>
              I agree to the <Text style={{ color: '#248CFF' }}>Term & Conditions</Text> & <Text style={{ color: '#248CFF' }}>Privacy Policy</Text>{'\n'}set out by this site.
            </Text>
          </View>
        </View>
        {/* Register Button */}
        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isSubmitting} style={{ width: 392, height: 55, borderRadius: 30, backgroundColor: '#248CFF', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 24 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


