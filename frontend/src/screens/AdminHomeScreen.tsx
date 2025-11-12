import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, Dimensions } from 'react-native';
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
  AddEmployeeAccount: undefined;
  EmployeeManagement: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AdminHome'>;

export default function AdminHomeScreen({ navigation }: Props) {
  const [name, setName] = useState<string>('Kamal Jangid');
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const tileGap = 12;
  const horizontalMargin = 16 * 2; // container has marginHorizontal: 16
  const tileWidth = (Dimensions.get('window').width - horizontalMargin - tileGap * 3) / 4;

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
    { name: 'ID Card', icon: require('../../assets/id card.png'), bgColor: '#FAF8F3', hasNotification: false, onPress: () => navigation.navigate('IDCard') },
    { name: 'PF', icon: require('../../assets/PF.png'), bgColor: '#FAF8F3', hasNotification: false },
    { name: 'ESI', icon: require('../../assets/ESI.png'), bgColor: '#FAF8F3', hasNotification: false },
    { name: 'Add Employee', icon: require('../../assets/Profile picture.png'), bgColor: '#E3F2FD', hasNotification: false, onPress: () => navigation.navigate('AddEmployeeAccount') },
    { name: 'Admin', icon: require('../../assets/Profile picture.png'), bgColor: '#F3E5F5', hasNotification: false, onPress: () => navigation.navigate('EmployeeManagement') },
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
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 25, paddingBottom: 100 }}
        nestedScrollEnabled
        overScrollMode="always"
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 30, paddingBottom: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
            {/* Company Icon */}
            <Image 
              source={require('../../assets/Group 1686559207.png')} 
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12, resizeMode: 'cover' }} 
            />
            
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 17, fontWeight: '700', color: '#12110D', fontFamily: 'Poppins-Bold' }}>Creative Designers</Text>
                <Text style={{ fontSize: 12, color: '#12110D', marginLeft: 6 }}>▼</Text>
              </View>
              <Text style={{ fontSize: 11, color: '#666', fontFamily: 'Poppins', lineHeight: 16 }}>Radhakishanpura ,Sikar +919460638554</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            {/* Bell with notification dot */}
            <TouchableOpacity style={{ position: 'relative' }}>
              <Image source={require('../../assets/Frame.png')} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
              <View style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5252', borderWidth: 1.5, borderColor: 'white' }} />
            </TouchableOpacity>
            {/* Speaker/Sound icon */}
            <TouchableOpacity>
              <Image source={require('../../assets/Frame (1).png')} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Profile and Time Tracking Card - Single Container */}
        <View style={{ marginHorizontal: 16, marginTop: 12, backgroundColor: 'white', borderRadius: 20, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#E6E6E6' }}>
          {/* User Profile Section */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18, paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: '#E6E6E6' }}>
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
          {/* Date Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, backgroundColor: '#EEF2FF', padding: 0, borderRadius: 12, overflow: 'hidden', marginHorizontal: -4 }}>
            {/* Left date label with icon */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12 }}>
              <Image source={require('../../assets/calender.png')} style={{ width: 18, height: 18, marginRight: 8, resizeMode: 'contain' }} />
              <Text style={{ fontSize: 14, color: '#555', fontFamily: 'Poppins-Medium' }}>Date</Text>
            </View>
            {/* Right date value */}
            <View style={{ paddingVertical: 10, paddingHorizontal: 12 }}>
              <Text style={{ fontSize: 13, color: '#12110D', fontFamily: 'Poppins-SemiBold' }}>{formatDate(currentTime)}</Text>
            </View>
          </View>

          {/* Branch Info */}
          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: '#888', fontFamily: 'Poppins' }}>
              Branch - <Text style={{ color: '#FF5252', fontWeight: '600' }}>Vinod handlooms</Text>
            </Text>
          </View>

          {/* Working Hours */}
          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, color: '#888', fontFamily: 'Poppins', marginBottom: 8 }}>Total Working Hours</Text>
            <Text style={{ fontSize: 32, fontWeight: '700', color: '#248CFF', fontFamily: 'Poppins-Bold', letterSpacing: 2 }}>00 : 00 : 00</Text>
          </View>

          <View style={{ height: 1, backgroundColor: '#E6E6E6', marginVertical: 8, marginHorizontal: -6 }} />

          {/* Punch Times */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Clock icon */}
                <View style={{ width: 14, height: 14, marginRight: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: '#888', position: 'relative' }}>
                    <View style={{ position: 'absolute', top: 2, left: 5, width: 1, height: 3, backgroundColor: '#888' }} />
                    <View style={{ position: 'absolute', top: 4, left: 5, width: 3, height: 1, backgroundColor: '#888' }} />
                  </View>
                </View>
                <Text style={{ fontSize: 12, color: '#888', fontFamily: 'Poppins' }}>Punch in time: 09:00 am</Text>
              </View>
              <Text style={{ fontSize: 13, color: '#12110D', fontFamily: 'Poppins-SemiBold' }}>{formatTime(currentTime)}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Clock icon */}
                <View style={{ width: 14, height: 14, marginRight: 8, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: '#888', position: 'relative' }}>
                    <View style={{ position: 'absolute', top: 2, left: 5, width: 1, height: 3, backgroundColor: '#888' }} />
                    <View style={{ position: 'absolute', top: 4, left: 5, width: 3, height: 1, backgroundColor: '#888' }} />
                  </View>
                </View>
                <Text style={{ fontSize: 12, color: '#888', fontFamily: 'Poppins' }}>Punch out time: 08:00 pm</Text>
              </View>
              <Text style={{ fontSize: 13, color: '#888', fontFamily: 'Poppins-SemiBold' }}>-- --</Text>
            </View>
          </View>

          {/* Action Buttons */}
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

          {/* Grid layout - 4 columns with proper spacing */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {quickActions.map((action, index) => {
              const isLastInRow = (index + 1) % 4 === 0;
              return (
                <View 
                  key={index} 
                  style={{ 
                    width: tileWidth, 
                    marginBottom: 16,
                    marginRight: isLastInRow ? 0 : tileGap
                  }}
                >
                  <TouchableOpacity 
                    onPress={(action as any).onPress} 
                    style={{ 
                      backgroundColor: action.bgColor, 
                      borderRadius: 16, 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      aspectRatio: 1, 
                      position: 'relative', 
                      padding: 12, 
                      shadowColor: '#000', 
                      shadowOffset: { width: 0, height: 2 }, 
                      shadowOpacity: 0.08, 
                      shadowRadius: 8, 
                      elevation: 3 
                    }}
                  >
                    {action.hasNotification && (
                      <View style={{ position: 'absolute', top: 8, right: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50' }} />
                    )}
                    {action.name === 'PF' ? (
                      <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: action.bgColor, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <Image source={action.icon} style={{ width: 52, height: 52, resizeMode: 'contain' }} />
                      </View>
                    ) : (
                      <Image source={action.icon} style={{ width: 52, height: 52, resizeMode: 'contain', marginBottom: 8 }} />
                    )}
                  </TouchableOpacity>
                  <Text style={{ fontSize: 11, color: '#12110D', fontFamily: 'Poppins', textAlign: 'center', marginTop: 6, lineHeight: 14 }} numberOfLines={2}>{action.name}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Footer */}
        <View style={{ alignItems: 'center', paddingBottom: 24, marginTop: 8 }}>
          <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins' }}>
            Powered by - <Text style={{ fontWeight: '600', color: '#000' }}>Caar</Text><Text style={{ fontWeight: '600', color: '#FF6B6B' }}>o</Text><Text style={{ fontWeight: '600', color: '#000' }}>bar</Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
