import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH } from '../utils/responsive';

type RootStackParamList = {
  Language: undefined;
  SignIn: undefined;
  OTPVerification: { identifier: string; role?: 'Admin' | 'Employee' };
  Register: undefined;
  Home: undefined;
  LeaveReport: undefined;
  PaymentReport: undefined;
  Calendar: undefined;
  Contacts: undefined;
  Tasks: undefined;
  WorkHistory: undefined;
  ExpenseRequestReport: undefined;
  AssetsReport: undefined;
  Agreements: undefined;
  Resignation: undefined;
  IDCard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [name, setName] = useState<string>('Kamal Jangid');
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const tileGap = spacing(12);
  const horizontalMargin = spacing(16) * 2; // container has marginHorizontal: 16
  const tileWidth = (SCREEN_WIDTH - horizontalMargin - tileGap * 3) / 4;

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
      } finally {
        setLoading(false);
      }
    })();

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onLogout = async () => {
    await AsyncStorage.removeItem('@jwt');
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('language');
    navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
  };

  const quickActions = [
    { name: 'Contacts', icon: require('../../assets/contacts.png'), bgColor: '#FFFFFF', hasNotification: false, onPress: () => navigation.navigate('Contacts') },
    { name: 'Tasks', icon: require('../../assets/tasks.png'), bgColor: '#00897B', hasNotification: false, onPress: () => navigation.navigate('Tasks') },
    { name: 'History', icon: require('../../assets/history.png'), bgColor: '#FFFFFF', hasNotification: false, onPress: () => navigation.navigate('WorkHistory') },
    { name: 'Payment', icon: require('../../assets/payment.png'), bgColor: '#F5E6D3', hasNotification: false, onPress: () => navigation.navigate('PaymentReport') },
    { name: 'Leave Request', icon: require('../../assets/Leave Request.png'), bgColor: '#FCE4EC', hasNotification: true, onPress: () => navigation.navigate('LeaveReport') },
    { name: 'Pay Request', icon: require('../../assets/Pay request.png'), bgColor: '#E0F2F1', hasNotification: true, onPress: () => navigation.navigate('ExpenseRequestReport') },
    { name: 'Expense', icon: require('../../assets/Expense.png'), bgColor: '#F5F5F5', hasNotification: true, onPress: () => navigation.navigate('ExpenseRequestReport') },
    { name: 'Asset', icon: require('../../assets/assets.png'), bgColor: '#FFF9C4', hasNotification: false, onPress: () => navigation.navigate('AssetsReport') },
    { name: 'Agreements', icon: require('../../assets/agreements.png'), bgColor: '#E8F5E9', hasNotification: false, onPress: () => navigation.navigate('Agreements') },
    { name: 'Calender', icon: require('../../assets/calender.png'), bgColor: '#FFF3E0', hasNotification: true, onPress: () => navigation.navigate('Calendar') },
    { name: 'Resignation', icon: require('../../assets/resignation-icon.png'), bgColor: '#E0F7FA', hasNotification: true, onPress: () => navigation.navigate('Resignation') },
    { name: 'Certificate', icon: require('../../assets/certificate.png'), bgColor: '#616161', hasNotification: false },
    { name: 'ID Card', icon: require('../../assets/id card (2).png'), bgColor: '#FFF9C4', hasNotification: false, onPress: () => navigation.navigate('IDCard') },
    { name: 'PF', icon: require('../../assets/PF.png'), bgColor: '#FFF9C4', hasNotification: false },
    { name: 'ESI', icon: require('../../assets/ESI.png'), bgColor: '#FFF9C4', hasNotification: false },
  ];

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };

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
      
      {/* Fixed Header */}
      <View style={{ backgroundColor: 'white', paddingHorizontal: spacing(20), paddingTop: hp(30), paddingBottom: spacing(16), flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
          {/* Company Icon */}
          <Image 
            source={require('../../assets/Group 1686559207.png')} 
            style={{ width: wp(40), height: hp(40), borderRadius: 20, marginRight: spacing(12), resizeMode: 'cover' }} 
          />
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing(4) }}>
              <Text style={{ fontSize: fontSize(17), fontWeight: '700', color: '#12110D', fontFamily: 'Poppins-Bold' }}>Creative Designers</Text>
              <Text style={{ fontSize: fontSize(12), color: '#12110D', marginLeft: spacing(6) }}>▼</Text>
            </View>
            <Text style={{ fontSize: fontSize(11), color: '#666', fontFamily: 'Poppins', lineHeight: 16 }}>Radhakishanpura ,Sikar +919460638554</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(16) }}>
          {/* Bell with notification dot */}
          <TouchableOpacity style={{ position: 'relative' }}>
            <Image source={require('../../assets/Frame.png')} style={{ width: wp(22), height: hp(22), resizeMode: 'contain' }} />
            <View style={{ position: 'absolute', top: -2, right: -2, width: wp(8), height: hp(8), borderRadius: 4, backgroundColor: '#FF5252', borderWidth: 1.5, borderColor: 'white' }} />
          </TouchableOpacity>
          {/* Speaker/Sound icon */}
          <TouchableOpacity>
            <Image source={require('../../assets/Frame (1).png')} style={{ width: wp(22), height: hp(22), resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Fixed User Profile and Time Tracking Card */}
      <View style={{ marginHorizontal: spacing(16), marginTop: spacing(12), backgroundColor: 'white', borderRadius: 20, padding: spacing(18), shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#E6E6E6' }}>
        {/* User Profile Section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing(18), paddingBottom: spacing(18), borderBottomWidth: 1, borderBottomColor: '#E6E6E6' }}>
          <Image 
            source={require('../../assets/Profile picture.png')} 
            style={{ width: wp(64), height: hp(64), borderRadius: 32, marginRight: spacing(14) }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: fontSize(17), fontWeight: '700', color: '#12110D', fontFamily: 'Poppins-Bold' }}>{name}</Text>
            <Text style={{ fontSize: fontSize(13), color: '#666', fontFamily: 'Poppins', marginTop: spacing(3) }}>Sec 24, chandigarh</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: wp(10), height: hp(10), borderRadius: 5, backgroundColor: '#FF5252', marginRight: spacing(8) }} />
            <Text style={{ fontSize: fontSize(14), color: '#FF5252', fontFamily: 'Poppins-SemiBold' }}>Offline</Text>
          </View>
        </View>
        {/* Date Row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(16), backgroundColor: '#EEF2FF', padding: 0, borderRadius: 12, overflow: 'hidden', marginHorizontal: -spacing(4) }}>
          {/* Left date label with icon */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing(10), paddingHorizontal: spacing(12) }}>
            <Image source={require('../../assets/calender.png')} style={{ width: wp(18), height: hp(18), marginRight: spacing(8), resizeMode: 'contain' }} />
            <Text style={{ fontSize: fontSize(14), color: '#555', fontFamily: 'Poppins-Medium' }}>Date</Text>
          </View>
          {/* Right date value */}
          <View style={{ paddingVertical: spacing(10), paddingHorizontal: spacing(12) }}>
            <Text style={{ fontSize: fontSize(13), color: '#12110D', fontFamily: 'Poppins-SemiBold' }}>{formatDate(currentTime)}</Text>
          </View>
        </View>

        {/* Branch Info */}
        <View style={{ marginBottom: spacing(16), alignItems: 'center' }}>
          <Text style={{ fontSize: fontSize(13), color: '#888', fontFamily: 'Poppins' }}>
            Branch - <Text style={{ color: '#FF5252', fontWeight: '600' }}>Vinod handlooms</Text>
          </Text>
        </View>

        {/* Working Hours */}
        <View style={{ marginBottom: spacing(16), alignItems: 'center' }}>
          <Text style={{ fontSize: fontSize(13), color: '#888', fontFamily: 'Poppins', marginBottom: spacing(8) }}>Total Working Hours</Text>
          <Text style={{ fontSize: fontSize(32), fontWeight: '700', color: '#248CFF', fontFamily: 'Poppins-Bold', letterSpacing: 2 }}>00 : 00 : 00</Text>
        </View>

        <View style={{ height: 1, backgroundColor: '#E6E6E6', marginVertical: spacing(8), marginHorizontal: -spacing(6) }} />

        {/* Punch Times */}
        <View style={{ marginBottom: spacing(20) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(8) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Clock icon */}
              <View style={{ width: wp(14), height: hp(14), marginRight: spacing(8), alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: wp(12), height: hp(12), borderRadius: 6, borderWidth: 1.5, borderColor: '#888', position: 'relative' }}>
                  <View style={{ position: 'absolute', top: 2, left: 5, width: 1, height: 3, backgroundColor: '#888' }} />
                  <View style={{ position: 'absolute', top: 4, left: 5, width: 3, height: 1, backgroundColor: '#888' }} />
                </View>
              </View>
              <Text style={{ fontSize: fontSize(12), color: '#888', fontFamily: 'Poppins' }}>Punch in time: 09:00 am</Text>
            </View>
            <Text style={{ fontSize: fontSize(13), color: '#12110D', fontFamily: 'Poppins-SemiBold' }}>{formatTime(currentTime)}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Clock icon */}
              <View style={{ width: wp(14), height: hp(14), marginRight: spacing(8), alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: wp(12), height: hp(12), borderRadius: 6, borderWidth: 1.5, borderColor: '#888', position: 'relative' }}>
                  <View style={{ position: 'absolute', top: 2, left: 5, width: 1, height: 3, backgroundColor: '#888' }} />
                  <View style={{ position: 'absolute', top: 4, left: 5, width: 3, height: 1, backgroundColor: '#888' }} />
                </View>
              </View>
              <Text style={{ fontSize: fontSize(12), color: '#888', fontFamily: 'Poppins' }}>Punch out time: 08:00 pm</Text>
            </View>
            <Text style={{ fontSize: fontSize(13), color: '#888', fontFamily: 'Poppins-SemiBold' }}>-- --</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', gap: spacing(14) }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: '#4CAF50', height: hp(52), borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#4CAF50', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}>
            <Text style={{ color: '#fff', fontSize: fontSize(16), fontFamily: 'Poppins-Bold' }}>Punch In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, backgroundColor: '#FF3B3B', height: hp(52), borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#FF3B3B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}>
            <Text style={{ color: '#fff', fontSize: fontSize(16), fontFamily: 'Poppins-Bold' }}>Punch Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Quick Actions Section */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: spacing(16), paddingTop: spacing(20), paddingBottom: spacing(24) }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: fontSize(17), fontWeight: '700', color: '#12110D', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }}>Quick Actions</Text>

        {/* Grid layout - 4 columns with proper spacing */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {quickActions.map((action, index) => {
            const isLastInRow = (index + 1) % 4 === 0;
            return (
              <View 
                key={index} 
                style={{ 
                  width: tileWidth, 
                  marginBottom: spacing(16),
                  marginRight: isLastInRow ? 0 : tileGap
                }}
              >
                <TouchableOpacity 
                  onPress={(action as any).onPress} 
                  style={{ 
                    borderRadius: 16, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: tileWidth,
                    height: tileWidth,
                    position: 'relative', 
                    padding: spacing(12), 
                  }}
                >
                  {action.hasNotification && (
                    <View style={{ position: 'absolute', top: spacing(8), right: spacing(8), width: wp(10), height: hp(10), borderRadius: 5, backgroundColor: '#4CAF50' }} />
                  )}
                  <View style={{
                    width: wp(48),
                    height: wp(48),
                    borderRadius: 12,
                    backgroundColor: ['Expense', 'Asset', 'Calender', 'Agreements'].includes(action.name) ? action.bgColor : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Image source={action.icon} style={{ width: wp(48), height: wp(48), resizeMode: 'contain' }} />
                  </View>
                </TouchableOpacity>
                <Text style={{ fontSize: fontSize(11), color: '#12110D', fontFamily: 'Poppins', textAlign: 'center', marginTop: spacing(6), lineHeight: 14 }} numberOfLines={2}>{action.name}</Text>
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={{ alignItems: 'center', paddingTop: spacing(24), marginTop: spacing(8) }}>
          <Text style={{ fontSize: fontSize(13), color: '#666', fontFamily: 'Poppins' }}>
            Powered by - <Text style={{ fontWeight: '600', color: '#000' }}>Caar</Text><Text style={{ fontWeight: '600', color: '#FF6B6B' }}>o</Text><Text style={{ fontWeight: '600', color: '#000' }}>bar</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


