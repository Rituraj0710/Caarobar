import React, { useMemo } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Language: undefined;
  SignIn: undefined;
  OTPVerification: { identifier: string; role?: 'Admin' | 'Employee' };
  Register: undefined;
  Home: undefined;
  AdminHome: undefined;
  LeaveReport: undefined;
  PaymentReport: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentReport'>;

const rows = [
  { label: '01-January', pen: 0, rej: 0, app: 2, amount: 3500 },
  { label: '02-February', pen: 0, rej: 2, app: 2, amount: 3500 },
  { label: '03-March', pen: 1, rej: 1, app: 2, amount: 3500 },
  { label: '04-April', pen: 0, rej: 1, app: 2, amount: 3500 },
  { label: '05-May', pen: 1, rej: 1, app: 0, amount: 0 },
  { label: '06-June', pen: 0, rej: 1, app: 2, amount: 3500 },
  { label: '07-July', pen: 0, rej: 1, app: 2, amount: 3500 },
  { label: '08-August', pen: 0, rej: 2, app: 2, amount: 3500 },
  { label: '09-September', pen: 1, rej: 0, app: 0, amount: 0 },
  { label: '10-October', pen: 0, rej: 1, app: 2, amount: 3500 },
  { label: '11-November', pen: 1, rej: 1, app: 0, amount: 0 },
  { label: '12-December', pen: 0, rej: 0, app: 0, amount: 0 },
];

export default function PaymentReportScreen({ navigation }: Props) {
  const totals = useMemo(() => {
    return rows.reduce(
      (acc, r) => {
        acc.pen += r.pen || 0;
        acc.rej += r.rej || 0;
        acc.app += r.app || 0;
        acc.amount += r.amount || 0;
        return acc;
      },
      { pen: 0, rej: 0, app: 0, amount: 0 },
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginRight: 6 }}>
            <Text style={{ fontSize: 20 }}>←</Text>
          </TouchableOpacity>
          <Image source={require('../../assets/header carobar.png')} style={{ width: 96, height: 22, resizeMode: 'contain' }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ position: 'relative', marginLeft: 6 }}>
            <TouchableOpacity style={{ padding: 8 }}>
              <Text style={{ fontSize: 18, color: '#111' }}>🔔</Text>
            </TouchableOpacity>
            <View style={{ position: 'absolute', right: 10, top: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' }} />
          </View>
          <TouchableOpacity style={{ padding: 8, marginLeft: 2 }}>
            <Text style={{ fontSize: 18, color: '#111' }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8, marginLeft: 2 }}>
            <Text style={{ fontSize: 18, color: '#111' }}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Profile/Company Card */}
        <View style={{ marginHorizontal: 12, backgroundColor: '#FFFFFF', borderRadius: 12, borderColor: '#E6E6E6', borderWidth: 1, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/creative design.png')} style={{ width: 86, height: 22, resizeMode: 'contain' }} />
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Image source={require('../../assets/Profile picture.png')} style={{ width: 44, height: 44, borderRadius: 22 }} />
              <Text style={{ fontSize: 12, color: '#111', marginTop: 4 }}>Kamal Jangid</Text>
              <Text style={{ fontSize: 11, color: '#666' }}>Carpenter</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 11, color: '#111', textAlign: 'right' }}>
                Creative Designers{"\n"}Radhakishanpura ,Sikar{"\n"}+919460638554
              </Text>
            </View>
          </View>
          <Text style={{ textAlign: 'center', color: '#E53935', fontSize: 12, fontWeight: '700', marginBottom: 6 }}>PAYMENT REQUEST REPORT</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 10, color: '#111' }}>Emp id - 001</Text>
          </View>
        </View>

        {/* Year + Headers Row */}
        <View style={{ marginHorizontal: 12, marginTop: 10, borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 8, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F6F7FB', paddingHorizontal: 10, height: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Image source={require('../../assets/calender.png')} style={{ width: 16, height: 16, marginRight: 8 }} />
              <Text style={{ fontSize: 13, color: '#111' }}>2025</Text>
            </View>
            <Text style={{ width: 48, textAlign: 'center', fontSize: 12, color: '#111' }}>Pen</Text>
            <Text style={{ width: 48, textAlign: 'center', fontSize: 12, color: '#111' }}>Rej</Text>
            <Text style={{ width: 48, textAlign: 'center', fontSize: 12, color: '#111' }}>App</Text>
            <Text style={{ width: 72, textAlign: 'center', fontSize: 12, color: '#111' }}>Amount</Text>
          </View>

          {/* Rows */}
          {rows.map((r) => (
            <View key={r.label} style={{ flexDirection: 'row', alignItems: 'center', height: 40, borderTopWidth: 1, borderTopColor: '#E6E6E6', backgroundColor: '#FFFFFF' }}>
              <View style={{ flex: 1, paddingHorizontal: 12, justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: '#111' }}>{r.label}</Text>
              </View>
              <Text style={{ width: 48, textAlign: 'center', color: '#F59E0B', fontSize: 12 }}>{r.pen || 0}</Text>
              <Text style={{ width: 48, textAlign: 'center', color: '#EF4444', fontSize: 12 }}>{r.rej || 0}</Text>
              <Text style={{ width: 48, textAlign: 'center', color: '#22C55E', fontSize: 12 }}>{r.app || 0}</Text>
              <Text style={{ width: 72, textAlign: 'center', color: '#111', fontSize: 12 }}>{r.amount || 0}</Text>
            </View>
          ))}

          {/* Grand Total Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, borderTopWidth: 1, borderTopColor: '#E6E6E6', backgroundColor: '#FFF5F5' }}>
            <View style={{ flex: 1, paddingHorizontal: 12, justifyContent: 'center' }}>
              <Text style={{ fontSize: 12, color: '#E53935', fontWeight: '700' }}>Grand Total</Text>
            </View>
            <Text style={{ width: 48, textAlign: 'center', color: '#111', fontSize: 12 }}>{totals.pen}</Text>
            <Text style={{ width: 48, textAlign: 'center', color: '#111', fontSize: 12 }}>{totals.rej}</Text>
            <Text style={{ width: 48, textAlign: 'center', color: '#111', fontSize: 12 }}>{totals.app}</Text>
            <Text style={{ width: 72, textAlign: 'center', color: '#111', fontSize: 12 }}>{totals.amount}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


