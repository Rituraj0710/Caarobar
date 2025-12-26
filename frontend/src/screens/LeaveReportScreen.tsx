import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';
import { wp, hp, fontSize, spacing, useSafeArea } from '../utils/responsive';
import SafeAreaView from '../components/SafeAreaView';

type RootStackParamList = {
  Language: undefined;
  SignIn: undefined;
  OTPVerification: { identifier: string; role?: 'Admin' | 'Employee' };
  Register: undefined;
  Home: undefined;
  AdminHome: undefined;
  LeaveReport: undefined;
  LeaveRequestDetail: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LeaveReport'>;

const months = [
  { label: '01-January', pen: '', rej: '', app: '', percent: '' },
  { label: '02-February', pen: 0, rej: 0, app: 2, percent: '98%' },
  { label: '03-March', pen: 1, rej: 1, app: 2, percent: '98%' },
  { label: '04-April', pen: 0, rej: 1, app: 2, percent: '98%' },
  { label: '05-May', pen: 1, rej: 1, app: 0, percent: '100%' },
  { label: '06-June', pen: 0, rej: 1, app: 2, percent: '98%' },
  { label: '07-July', pen: 1, rej: 1, app: 2, percent: '98%' },
  { label: '08-August', pen: 1, rej: 0, app: 2, percent: '98%' },
  { label: '09-September', pen: 1, rej: 1, app: 0, percent: '100%' },
  { label: '10-October', pen: 0, rej: 1, app: 2, percent: '98%' },
  { label: '11-November', pen: 1, rej: 1, app: 0, percent: '100%' },
  { label: '12-December', pen: '', rej: '', app: '', percent: '' },
];

export default function LeaveReportScreen({ navigation }: Props) {
  const insets = useSafeArea();
  const [name, setName] = useState<string>('Kamal Jangid');
  const [empId, setEmpId] = useState<string>('001');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/users/me');
        setName(data?.name || 'Kamal Jangid');
        setEmpId(data?.employeeId || '001');
      } catch {
        const saved = await AsyncStorage.getItem('@user');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setName(parsed?.name || 'Kamal Jangid');
            setEmpId(parsed?.employeeId || '001');
          } catch {}
        }
      }
    })();
  }, []);

  // Calculate grand totals
  const grandTotal = months.reduce((acc, month) => {
    if (typeof month.pen === 'number') acc.pen += month.pen;
    if (typeof month.rej === 'number') acc.rej += month.rej;
    if (typeof month.app === 'number') acc.app += month.app;
    return acc;
  }, { pen: 0, rej: 0, app: 0 });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#2D6EFF" />
      
      {/* Header - Blue Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(8),
        paddingBottom: spacing(8),
        backgroundColor: '#2D6EFF'
      }}>
        {/* Left: Back Arrow */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: spacing(4) }}
        >
          <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>

        {/* Left: Title */}
        <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: spacing(12) }}>
          <Text style={{ 
            fontSize: fontSize(18), 
            fontWeight: '500', 
            color: '#FFFFFF', 
            fontFamily: 'Inter' 
          }} allowFontScaling={false}>
            Leave Request Report
          </Text>
        </View>

        {/* Right: Empty space for alignment */}
        <View style={{ width: wp(32) }} />
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: spacing(40) + insets.bottom, paddingHorizontal: spacing(16) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee Information Card */}
        <View style={{ 
          marginTop: spacing(12), 
          marginBottom: spacing(16),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(12),
          padding: spacing(16),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(2) },
          shadowOpacity: 0.1,
          shadowRadius: spacing(4),
          elevation: 3
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Profile Picture on Left */}
            <Image 
              source={require('../../assets/Profile picture.png')} 
              style={{ 
                width: wp(64), 
                height: hp(64), 
                borderRadius: hp(32), 
                marginRight: spacing(12), 
                resizeMode: 'cover' 
              }}
            />
            
            {/* Employee Info in Middle */}
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ 
                fontSize: fontSize(15), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold',
                marginBottom: spacing(4)
              }} allowFontScaling={false}>
                {name}
              </Text>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#666666', 
                fontFamily: 'Poppins'
              }} allowFontScaling={false}>
                Carpenter
              </Text>
            </View>

            {/* Emp ID and Phone on Right */}
            <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
              <Text style={{ 
                fontSize: fontSize(13), 
                color: '#666666', 
                fontFamily: 'Poppins',
                marginBottom: spacing(6)
              }} allowFontScaling={false}>
                Emp ID - {empId}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: fontSize(14), 
                  color: '#248CFF', 
                  marginRight: spacing(4)
                }} allowFontScaling={false}>
                  📞
                </Text>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#248CFF', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  9460638554
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Year Selector and Column Headers Card */}
        <View style={{ 
          marginBottom: spacing(16),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(12),
          padding: spacing(12),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(1) },
          shadowOpacity: 0.1,
          shadowRadius: spacing(2),
          elevation: 2,
          borderWidth: wp(1),
          borderColor: '#E0E0E0'
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}>
            {/* Year Selector on Left */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={require('../../assets/calender.png')} 
                style={{ width: wp(18), height: hp(18), marginRight: spacing(8), resizeMode: 'contain' }} 
              />
              <Text style={{ 
                fontSize: fontSize(15), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold' 
              }} allowFontScaling={false}>
                2025
              </Text>
            </View>

            {/* Column Headers on Right */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ 
                fontSize: fontSize(12), 
                fontWeight: '600', 
                color: '#FF9800', 
                fontFamily: 'Poppins-SemiBold',
                marginRight: spacing(12)
              }} allowFontScaling={false}>
                Pen
              </Text>
              <Text style={{ 
                fontSize: fontSize(12), 
                fontWeight: '600', 
                color: '#E53935', 
                fontFamily: 'Poppins-SemiBold',
                marginRight: spacing(12)
              }} allowFontScaling={false}>
                Rej
              </Text>
              <Text style={{ 
                fontSize: fontSize(12), 
                fontWeight: '600', 
                color: '#4CAF50', 
                fontFamily: 'Poppins-SemiBold',
                marginRight: spacing(12)
              }} allowFontScaling={false}>
                App
              </Text>
              <Text style={{ 
                fontSize: fontSize(12), 
                fontWeight: '600', 
                color: '#000000', 
                fontFamily: 'Poppins-SemiBold'
              }} allowFontScaling={false}>
                Percent
              </Text>
            </View>
          </View>
        </View>

        {/* Leave Request Table */}
        <View style={{ marginBottom: spacing(24) }}>
          <View style={{ 
            borderWidth: wp(1), 
            borderColor: '#CCCCCC', 
            backgroundColor: '#FFFFFF', 
            borderRadius: hp(8),
            overflow: 'hidden'
          }}>

            {months.map((month, idx) => (
              <TouchableOpacity
                key={month.label}
                onPress={() => {
                  if (month.pen !== '' || month.rej !== '' || month.app !== '') {
                    navigation.navigate('LeaveRequestDetail');
                  }
                }}
                activeOpacity={0.7}
                disabled={month.pen === '' && month.rej === '' && month.app === ''}
              >
                <View style={{ 
                  flexDirection: 'row', 
                  backgroundColor: '#FFFFFF',
                  minHeight: hp(40),
                  alignItems: 'center'
                }}>
                  <View style={{ 
                    flex: 1.5, 
                    paddingVertical: spacing(10), 
                    paddingHorizontal: spacing(12), 
                    borderRightWidth: wp(1), 
                    borderRightColor: '#CCCCCC', 
                    borderBottomWidth: idx === months.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC'
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {month.label}
                    </Text>
                  </View>
                  <View style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    paddingVertical: spacing(10), 
                    borderRightWidth: wp(1), 
                    borderRightColor: '#CCCCCC', 
                    borderBottomWidth: idx === months.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: month.pen !== '' && month.pen !== undefined ? '#FF9800' : '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {month.pen === '' ? '-' : (month.pen !== undefined ? month.pen : '-')}
                    </Text>
                  </View>
                  <View style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    paddingVertical: spacing(10), 
                    borderRightWidth: wp(1), 
                    borderRightColor: '#CCCCCC', 
                    borderBottomWidth: idx === months.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: month.rej !== '' && month.rej !== undefined ? '#E53935' : '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {month.rej === '' ? '-' : (month.rej !== undefined ? month.rej : '-')}
                    </Text>
                  </View>
                  <View style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    paddingVertical: spacing(10), 
                    borderRightWidth: wp(1), 
                    borderRightColor: '#CCCCCC', 
                    borderBottomWidth: idx === months.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: month.app !== '' && month.app !== undefined ? '#4CAF50' : '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {month.app === '' ? '-' : (month.app !== undefined ? month.app : '-')}
                    </Text>
                  </View>
                  <View style={{ 
                    flex: 1.2, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    paddingVertical: spacing(10), 
                    borderBottomWidth: idx === months.length - 1 ? 0 : wp(1), 
                    borderBottomColor: '#CCCCCC' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: '#000000', 
                      fontFamily: 'Poppins' 
                    }} allowFontScaling={false}>
                      {month.percent || '-'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Grand Total Row */}
            <View style={{ 
              flexDirection: 'row', 
              backgroundColor: '#F0F0F0',
              borderBottomLeftRadius: hp(8),
              borderBottomRightRadius: hp(8)
            }}>
              <View style={{ 
                flex: 1.5, 
                paddingVertical: spacing(10), 
                paddingHorizontal: spacing(12), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(13), 
                  fontWeight: '700', 
                  color: '#E53935', 
                  fontFamily: 'Poppins-Bold' 
                }} allowFontScaling={false}>
                  Grand Total
                </Text>
              </View>
              <View style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingVertical: spacing(10), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#FF9800', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  {grandTotal.pen}
                </Text>
              </View>
              <View style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingVertical: spacing(10), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#E53935', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  {grandTotal.rej}
                </Text>
              </View>
              <View style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingVertical: spacing(10), 
                borderRightWidth: wp(1), 
                borderRightColor: '#CCCCCC' 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#4CAF50', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  {grandTotal.app}
                </Text>
              </View>
              <View style={{ 
                flex: 1.2, 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingVertical: spacing(10) 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#000000', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  98.5%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
