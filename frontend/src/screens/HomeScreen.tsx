import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  LeaveReport: undefined;
  PaymentReport: undefined;
  Calendar: undefined;
  Contacts: undefined;
  Tasks: undefined;
  WorkHistory: undefined;
  ExpenseRequestReport: undefined;
  PaymentRequestReport: undefined;
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
  const insets = useSafeArea();
  // Calculate tile width to ensure exactly 4 columns on all devices
  const containerPadding = spacing(16);
  const tileGap = spacing(12);
  const availableWidth = SCREEN_WIDTH - (containerPadding * 2);
  const tileWidth = (availableWidth - (tileGap * 3)) / 4;

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
    { name: 'Pay Request', icon: require('../../assets/Pay request.png'), bgColor: '#E0F2F1', hasNotification: true, onPress: () => navigation.navigate('PaymentRequestReport') },
    { name: 'Expense', icon: require('../../assets/Expense.png'), bgColor: '#F5F5F5', hasNotification: true, onPress: () => navigation.navigate('ExpenseRequestReport') },
    { name: 'Asset', icon: require('../../assets/assets.png'), bgColor: '#FFF9C4', hasNotification: false, onPress: () => navigation.navigate('AssetsReport') },
    { name: 'Agreements', icon: require('../../assets/agreements.png'), bgColor: '#E0F7FA', hasNotification: false, onPress: () => navigation.navigate('Agreements') },
    { name: 'Calender', icon: require('../../assets/calender.png'), bgColor: '#FFF3E0', hasNotification: true, onPress: () => navigation.navigate('Calendar') },
    { name: 'Resignation', icon: require('../../assets/resignation-icon.png'), bgColor: '#E0F7FA', hasNotification: true, onPress: () => navigation.navigate('Resignation') },
    { name: 'Certificate', icon: require('../../assets/certificate.png'), bgColor: '#757575', hasNotification: false },
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Fixed Header */}
      <View style={{ 
        backgroundColor: 'white', 
        paddingHorizontal: spacing(20), 
        paddingTop: spacing(12), 
        paddingBottom: spacing(16), 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between',
        minHeight: hp(60)
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
          {/* Company Icon */}
          <Image 
            source={require('../../assets/Group 1686559207.png')} 
            style={{ 
              width: wp(32), 
              height: hp(32), 
              borderRadius: hp(16), 
              marginRight: spacing(12), 
              marginTop: spacing(4), 
              resizeMode: 'cover',
              flexShrink: 0
            }} 
          />
          
          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing(4), flexWrap: 'nowrap' }}>
              <Text 
                style={{ 
                  fontSize: fontSize(17), 
                  fontWeight: '700', 
                  color: '#12110D', 
                  fontFamily: 'Poppins-Bold',
                  flexShrink: 1
                }} 
                numberOfLines={1}
                allowFontScaling={false}
              >
                Creative Designers
              </Text>
              <Text 
                style={{ 
                  fontSize: fontSize(12), 
                  color: '#12110D', 
                  marginLeft: spacing(6),
                  flexShrink: 0
                }} 
                allowFontScaling={false}
              >
                ▼
              </Text>
            </View>
            <Text 
              style={{ 
                fontSize: fontSize(11), 
                color: '#666666', 
                fontFamily: 'Poppins', 
                lineHeight: fontSize(16) 
              }} 
              numberOfLines={1}
              allowFontScaling={false}
            >
              Radhakishanpura ,Sikar +919460638554
            </Text>
          </View>
        </View>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          flexShrink: 0,
          paddingLeft: spacing(8)
        }}>
          {/* Bell with notification dot */}
          <TouchableOpacity style={{ position: 'relative', padding: spacing(4) }}>
            <Image source={require('../../assets/Frame.png')} style={{ width: wp(22), height: hp(22), resizeMode: 'contain' }} />
            <View style={{ position: 'absolute', top: hp(-2), right: wp(-2), width: wp(8), height: hp(8), borderRadius: hp(4), backgroundColor: '#FF5252', borderWidth: wp(1.5), borderColor: '#FFFFFF' }} />
          </TouchableOpacity>
          {/* Speaker/Sound icon */}
          <TouchableOpacity style={{ padding: spacing(4), marginLeft: spacing(8) }}>
            <Image source={require('../../assets/Frame (1).png')} style={{ width: wp(22), height: hp(22), resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Fixed User Profile and Time Tracking Card */}
      <View style={{ 
        marginHorizontal: spacing(16), 
        marginTop: spacing(12), 
        backgroundColor: '#FFFFFF', 
        borderRadius: hp(20), 
        padding: spacing(18), 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: hp(2) }, 
        shadowOpacity: 0.08, 
        shadowRadius: spacing(8), 
        elevation: 3, 
        borderWidth: wp(1), 
        borderColor: '#E6E6E6' 
      }}>
        {/* User Profile Section */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          marginBottom: spacing(18), 
          paddingBottom: spacing(18), 
          borderBottomWidth: wp(1), 
          borderBottomColor: '#E6E6E6' 
        }}>
          <Image 
            source={require('../../assets/Profile picture.png')} 
            style={{ 
              width: wp(64), 
              height: hp(64), 
              borderRadius: hp(32), 
              marginRight: spacing(14),
              resizeMode: 'cover',
              flexShrink: 0
            }}
          />
          <View style={{ flex: 1, minWidth: 0, paddingRight: spacing(8) }}>
            <Text 
              style={{ 
                fontSize: fontSize(17), 
                fontWeight: '700', 
                color: '#12110D', 
                fontFamily: 'Poppins-Bold' 
              }} 
              numberOfLines={1}
              allowFontScaling={false}
            >
              {name}
            </Text>
            <Text 
              style={{ 
                fontSize: fontSize(13), 
                color: '#666666', 
                fontFamily: 'Poppins', 
                marginTop: spacing(3) 
              }} 
              numberOfLines={1}
              allowFontScaling={false}
            >
              Sec 24, chandigarh
            </Text>
          </View>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            flexShrink: 0
          }}>
            <View style={{ 
              width: wp(10), 
              height: hp(10), 
              borderRadius: hp(5), 
              backgroundColor: '#FF5252', 
              marginRight: spacing(8) 
            }} />
            <Text style={{ 
              fontSize: fontSize(14), 
              color: '#FF5252', 
              fontFamily: 'Poppins-SemiBold' 
            }} allowFontScaling={false}>
              Offline
            </Text>
          </View>
        </View>

        {/* Date Row - Light Blue Bar */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: spacing(16), 
          backgroundColor: '#EEF2FF', 
          paddingVertical: spacing(10), 
          paddingHorizontal: spacing(12), 
          borderRadius: hp(12)
        }}>
          {/* Left: Calendar icon + Date label */}
          <View style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
            <Image 
              source={require('../../assets/calender.png')} 
              style={{ 
                width: wp(18), 
                height: hp(18), 
                marginRight: spacing(8), 
                resizeMode: 'contain' 
              }} 
            />
            <Text style={{ 
              fontSize: fontSize(14), 
              color: '#555555', 
              fontFamily: 'Poppins-Medium' 
            }} allowFontScaling={false}>
              Date
            </Text>
          </View>
          {/* Right: Full date */}
          <View style={{ flex: 1, alignItems: 'flex-end', paddingLeft: spacing(8) }}>
            <Text 
              style={{ 
                fontSize: fontSize(13), 
                color: '#12110D', 
                fontFamily: 'Poppins-SemiBold' 
              }} 
              numberOfLines={1}
              allowFontScaling={false}
            >
              {formatDate(currentTime)}
            </Text>
          </View>
        </View>

        {/* Branch Info */}
        <View style={{ marginBottom: spacing(16), alignItems: 'center' }}>
          <Text style={{ 
            fontSize: fontSize(13), 
            color: '#888888', 
            fontFamily: 'Poppins' 
          }} allowFontScaling={false}>
            Branch - <Text style={{ 
              color: '#FF5252', 
              fontWeight: '600',
              fontFamily: 'Poppins-SemiBold'
            }} allowFontScaling={false}>Vinod handlooms</Text>
          </Text>
        </View>

        {/* Total Working Hours */}
        <View style={{ marginBottom: spacing(16), alignItems: 'center' }}>
          <Text style={{ 
            fontSize: fontSize(13), 
            color: '#888888', 
            fontFamily: 'Poppins', 
            marginBottom: spacing(8) 
          }} allowFontScaling={false}>Total Working Hours</Text>
          <Text style={{ 
            fontSize: fontSize(32), 
            fontWeight: '700', 
            color: '#248CFF', 
            fontFamily: 'Poppins-Bold', 
            letterSpacing: spacing(2)
          }} allowFontScaling={false}>00 : 00 : 00</Text>
        </View>

        {/* Light Grey Dividing Line */}
        <View style={{ 
          height: hp(1), 
          backgroundColor: '#E6E6E6', 
          marginVertical: spacing(8), 
          marginHorizontal: -spacing(6) 
        }} />

        {/* Punch Times Section */}
        <View style={{ marginBottom: spacing(20) }}>
          {/* Punch In Time Row */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: spacing(8) 
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: 0 }}>
              {/* Clock icon */}
              <View style={{ 
                width: wp(14), 
                height: hp(14), 
                marginRight: spacing(8), 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <View style={{ 
                  width: wp(12), 
                  height: hp(12), 
                  borderRadius: hp(6), 
                  borderWidth: wp(1.5), 
                  borderColor: '#888888', 
                  position: 'relative' 
                }}>
                  <View style={{ 
                    position: 'absolute', 
                    top: hp(2), 
                    left: wp(5), 
                    width: wp(1), 
                    height: hp(3), 
                    backgroundColor: '#888888' 
                  }} />
                  <View style={{ 
                    position: 'absolute', 
                    top: hp(4), 
                    left: wp(5), 
                    width: wp(3), 
                    height: hp(1), 
                    backgroundColor: '#888888' 
                  }} />
                </View>
              </View>
              <Text 
                style={{ 
                  fontSize: fontSize(12), 
                  color: '#888888', 
                  fontFamily: 'Poppins',
                  flexShrink: 1
                }} 
                numberOfLines={1}
                allowFontScaling={false}
              >
                Punch in time: 09:00 am
              </Text>
            </View>
            <Text 
              style={{ 
                fontSize: fontSize(13), 
                color: '#12110D', 
                fontFamily: 'Poppins-SemiBold',
                flexShrink: 0,
                marginLeft: spacing(8)
              }} 
              allowFontScaling={false}
            >
              {formatTime(currentTime)}
            </Text>
          </View>
          
          {/* Punch Out Time Row */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: 0 }}>
              {/* Clock icon */}
              <View style={{ 
                width: wp(14), 
                height: hp(14), 
                marginRight: spacing(8), 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <View style={{ 
                  width: wp(12), 
                  height: hp(12), 
                  borderRadius: hp(6), 
                  borderWidth: wp(1.5), 
                  borderColor: '#888888', 
                  position: 'relative' 
                }}>
                  <View style={{ 
                    position: 'absolute', 
                    top: hp(2), 
                    left: wp(5), 
                    width: wp(1), 
                    height: hp(3), 
                    backgroundColor: '#888888' 
                  }} />
                  <View style={{ 
                    position: 'absolute', 
                    top: hp(4), 
                    left: wp(5), 
                    width: wp(3), 
                    height: hp(1), 
                    backgroundColor: '#888888' 
                  }} />
                </View>
              </View>
              <Text 
                style={{ 
                  fontSize: fontSize(12), 
                  color: '#888888', 
                  fontFamily: 'Poppins',
                  flexShrink: 1
                }} 
                numberOfLines={1}
                allowFontScaling={false}
              >
                Punch out time: 08:00 pm
              </Text>
            </View>
            <Text 
              style={{ 
                fontSize: fontSize(13), 
                color: '#888888', 
                fontFamily: 'Poppins-SemiBold',
                flexShrink: 0,
                marginLeft: spacing(8)
              }} 
              allowFontScaling={false}
            >
              -- --
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', gap: spacing(14) }}>
          {/* Punch In Button - Green */}
          <TouchableOpacity style={{ 
            flex: 1, 
            backgroundColor: '#4CAF50', 
            height: hp(52), 
            borderRadius: hp(28), 
            alignItems: 'center', 
            justifyContent: 'center', 
            shadowColor: '#4CAF50', 
            shadowOffset: { width: 0, height: hp(4) }, 
            shadowOpacity: 0.3, 
            shadowRadius: spacing(8), 
            elevation: 4 
          }}>
            <Text style={{ 
              color: '#FFFFFF', 
              fontSize: fontSize(16), 
              fontFamily: 'Poppins-Bold' 
            }} allowFontScaling={false}>Punch In</Text>
          </TouchableOpacity>
          
          {/* Punch Out Button - Red */}
          <TouchableOpacity style={{ 
            flex: 1, 
            backgroundColor: '#FF3B3B', 
            height: hp(52), 
            borderRadius: hp(28), 
            alignItems: 'center', 
            justifyContent: 'center', 
            shadowColor: '#FF3B3B', 
            shadowOffset: { width: 0, height: hp(4) }, 
            shadowOpacity: 0.3, 
            shadowRadius: spacing(8), 
            elevation: 4 
          }}>
            <Text style={{ 
              color: '#FFFFFF', 
              fontSize: fontSize(16), 
              fontFamily: 'Poppins-Bold' 
            }} allowFontScaling={false}>Punch Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Quick Actions Section */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: spacing(16), paddingTop: spacing(20), paddingBottom: spacing(24) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: fontSize(17), fontWeight: '700', color: '#12110D', fontFamily: 'Poppins-Bold', marginBottom: spacing(16) }} allowFontScaling={false}>Quick Actions</Text>

        {/* Grid layout - 4 columns with proper spacing - Fixed to always show 4 columns */}
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap',
          width: '100%'
        }}>
          {quickActions.map((action, index) => {
            const isLastInRow = (index + 1) % 4 === 0;
            return (
              <View 
                key={index} 
                style={{ 
                  width: tileWidth, 
                  marginBottom: spacing(16),
                  marginRight: isLastInRow ? 0 : tileGap,
                  flexShrink: 0,
                  flexGrow: 0
                }}
              >
                <TouchableOpacity 
                  onPress={(action as any).onPress} 
                  activeOpacity={0.7}
                  style={{ 
                    alignItems: 'center', 
                    justifyContent: 'flex-start',
                    width: '100%'
                  }}
                >
                  <View style={{ 
                    width: '100%',
                    aspectRatio: 1,
                    borderRadius: hp(14),
                    backgroundColor: action.bgColor || '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    marginBottom: spacing(6),
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: hp(2) },
                    shadowOpacity: 0.1,
                    shadowRadius: spacing(3),
                    elevation: 2,
                  }}>
                    {action.hasNotification && (
                      <View style={{ 
                        position: 'absolute', 
                        top: spacing(8), 
                        right: spacing(8), 
                        width: wp(10), 
                        height: hp(10), 
                        borderRadius: hp(5), 
                        backgroundColor: '#4CAF50',
                        borderWidth: wp(1.5),
                        borderColor: '#FFFFFF',
                      }} />
                    )}
                    <Image 
                      source={action.icon} 
                      style={{ 
                        width: wp(56), 
                        height: wp(56), 
                        resizeMode: 'contain' 
                      }} 
                    />
                  </View>
                </TouchableOpacity>
                <Text 
                  style={{ 
                    fontSize: fontSize(11), 
                    color: '#12110D', 
                    fontFamily: 'Poppins', 
                    textAlign: 'center', 
                    marginTop: spacing(6), 
                    lineHeight: fontSize(14),
                    minHeight: fontSize(28)
                  }} 
                  numberOfLines={2} 
                  allowFontScaling={false}
                >
                  {action.name}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={{ alignItems: 'center', paddingTop: spacing(24), marginTop: spacing(8) }}>
          <Text style={{ fontSize: fontSize(13), color: '#666', fontFamily: 'Poppins' }} allowFontScaling={false}>
            Powered by - <Text style={{ fontWeight: '600', color: '#000' }} allowFontScaling={false}>Caar</Text><Text style={{ fontWeight: '600', color: '#FF6B6B' }} allowFontScaling={false}>o</Text><Text style={{ fontWeight: '600', color: '#000' }} allowFontScaling={false}>bar</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


