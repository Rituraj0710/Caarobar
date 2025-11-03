import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';

type RootStackParamList = {
  Language: undefined;
  SignIn: undefined;
  OTPVerification: { identifier: string; role?: 'Admin' | 'Employee' };
  Register: undefined;
  Home: undefined;
  AdminHome: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AdminHome'>;

export default function AdminHomeScreen({ navigation }: Props) {
  const [name, setName] = useState<string>('Kamal Jangid');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/users/me');
        setName(data?.name || 'Kamal Jangid');
      } catch {
        const saved = await AsyncStorage.getItem('@user');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setName(parsed?.name || 'Kamal Jangid');
          } catch {}
        }
      }
    })();

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    { name: 'Leave Request', icon: require('../../assets/Leave Request.png'), bgColor: '#FCE4EC', hasNotification: true },
    { name: 'Pay Request', icon: require('../../assets/Pay request.png'), bgColor: '#E0F2F1', hasNotification: true },
    { name: 'Expense', icon: require('../../assets/Expense.png'), bgColor: '#F5F5F5', hasNotification: true },
    { name: 'Asset', icon: require('../../assets/assets.png'), bgColor: '#FFF9C4', hasNotification: false },
    { name: 'Agreements', icon: require('../../assets/agreements.png'), bgColor: '#E8F5E9', hasNotification: false },
    { name: 'Calender', icon: require('../../assets/calender.png'), bgColor: '#FFF3E0', hasNotification: true },
    { name: 'Resignation', icon: require('../../assets/resignation-icon.png'), bgColor: '#E0F7FA', hasNotification: true },
    { name: 'Certificate', icon: require('../../assets/certificate.png'), bgColor: '#616161', hasNotification: false },
    { name: 'ID Card', icon: require('../../assets/Logo.png'), bgColor: '#F5F5F5', hasNotification: false },
    { name: 'PF', icon: require('../../assets/PF.png'), bgColor: '#F5F5F5', hasNotification: false },
    { name: 'ESI', icon: require('../../assets/ESI.png'), bgColor: '#F5F5F5', hasNotification: false },
  ];

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 60, paddingBottom: 100 }}>
        {/* Header */}
        <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Image source={require('../../assets/Group 1686559207.png')} style={{ width: 28, height: 28, resizeMode: 'contain', marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#12110D', fontFamily: 'Poppins-Bold' }}>Creative Designers</Text>
                <Text style={{ fontSize: 14, marginLeft: 6, color: '#12110D' }}>▼</Text>
              </View>
              <Text style={{ fontSize: 11, color: '#666', fontFamily: 'Poppins', marginTop: 2 }}>Radhakishanpura ,Sikar +919460638554</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
            <TouchableOpacity>
              <Image source={require('../../assets/Frame.png')} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/Frame (1).png')} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Profile Card */}
        <View style={{ marginHorizontal: 16, marginTop: 12, backgroundColor: 'white', borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}>
          <Image 
            source={require('../../assets/Profile picture.png')} 
            style={{ width: 64, height: 64, borderRadius: 32, marginRight: 14 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17, fontWeight: '700', color: '#12110D', fontFamily: 'Poppins-Bold' }}>{name}</Text>
            <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins', marginTop: 3 }}>Sec 24, chandigarh</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF5252', marginRight: 8 }} />
            <Text style={{ fontSize: 14, color: '#FF5252', fontFamily: 'Poppins-SemiBold' }}>Offline</Text>
          </View>
        </View>

        {/* Time Tracking Card */}
        <View style={{ marginHorizontal: 16, marginTop: 12, backgroundColor: 'white', borderRadius: 20, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#E6E6E6' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, backgroundColor: '#EEF2FF', padding: 12, borderRadius: 12, marginHorizontal: -4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/calender.png')} style={{ width: 18, height: 18, marginRight: 8, resizeMode: 'contain' }} />
              <Text style={{ fontSize: 14, color: '#555', fontFamily: 'Poppins-Medium' }}>Date</Text>
            </View>
            <Text style={{ fontSize: 13, color: '#12110D', fontFamily: 'Poppins-SemiBold' }}>Saturday, 20 Jan 2024</Text>
          </View>

          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: '#888', fontFamily: 'Poppins' }}>
              Branch - <Text style={{ color: '#FF5252', fontWeight: '600' }}>Vinod handlooms</Text>
            </Text>
          </View>

          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: '#888', fontFamily: 'Poppins', marginBottom: 8 }}>Total Working Hours</Text>
            <Text style={{ fontSize: 32, fontWeight: '700', color: '#248CFF', fontFamily: 'Poppins-Bold', letterSpacing: 2 }}>00 : 00 : 00</Text>
          </View>

          <View style={{ height: 1, backgroundColor: '#E6E6E6', marginVertical: 8, marginHorizontal: -6 }} />

          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, marginRight: 8 }}>🕘</Text>
                <Text style={{ fontSize: 12, color: '#888', fontFamily: 'Poppins' }}>Punch in time: 09:00 am</Text>
              </View>
              <Text style={{ fontSize: 13, color: '#12110D', fontFamily: 'Poppins-SemiBold' }}>{formatTime(currentTime)}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, marginRight: 8 }}>🕘</Text>
                <Text style={{ fontSize: 12, color: '#888', fontFamily: 'Poppins' }}>Punch out time: 08:00 pm</Text>
              </View>
              <Text style={{ fontSize: 13, color: '#888', fontFamily: 'Poppins' }}>---</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 14 }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#4CAF50', height: 52, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Poppins-Bold' }}>Punch In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, backgroundColor: '#FF3B3B', height: 52, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#FF3B3B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Poppins-Bold' }}>Punch Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ marginHorizontal: 16, marginTop: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#12110D', fontFamily: 'Poppins-Bold', marginBottom: 16 }}>Quick Actions</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            {[
              { name: 'Contacts', icon: require('../../assets/contacts.png') },
              { name: 'Tasks', icon: require('../../assets/tasks.png') },
              { name: 'History', icon: require('../../assets/history.png') },
              { name: 'Payment', icon: require('../../assets/payment.png') },
            ].map((item, idx) => (
              <View key={`top-${idx}`} style={{ width: '23%' }}>
                <TouchableOpacity style={{ backgroundColor: '#FFFFFF', borderRadius: 16, alignItems: 'center', justifyContent: 'center', aspectRatio: 1, position: 'relative', padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}>
                  <Image source={item.icon} style={{ width: 44, height: 44, resizeMode: 'contain', marginBottom: 8 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 11, color: '#12110D', fontFamily: 'Poppins', textAlign: 'center', marginTop: 6, lineHeight: 14 }} numberOfLines={2}>{item.name}</Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {quickActions.map((action, index) => (
              <View key={index} style={{ width: '23%', marginBottom: 16 }}>
                <TouchableOpacity style={{ backgroundColor: action.bgColor, borderRadius: 16, alignItems: 'center', justifyContent: 'center', aspectRatio: 1, position: 'relative', padding: 12 }}>
                  {action.hasNotification && (
                    <View style={{ position: 'absolute', top: 8, right: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50' }} />
                  )}
                  <Image source={action.icon} style={{ width: 52, height: 52, resizeMode: 'contain', marginBottom: 8 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 11, color: '#12110D', fontFamily: 'Poppins', textAlign: 'center', marginTop: 6, lineHeight: 14 }} numberOfLines={2}>{action.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ alignItems: 'center', paddingBottom: 24, marginTop: 8 }}>
          <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins' }}>
            Powered by - <Text style={{ fontWeight: '600', color: '#000' }}>Caar</Text><Text style={{ fontWeight: '600', color: '#FF6B6B' }}>o</Text><Text style={{ fontWeight: '600', color: '#000' }}>bar</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}



