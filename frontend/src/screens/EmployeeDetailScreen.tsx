import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, Switch } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH, useSafeArea } from '../utils/responsive';
import SafeAreaView from '../components/SafeAreaView';

type RootStackParamList = {
  EmployeeDetail: {
    employeeId: string;
    name: string;
    role: string;
    empId: string;
    salary?: string;
    company?: string;
    location?: string;
    phone?: string;
    joiningDate?: string;
    endDate?: string;
    progress?: number;
    progressDays?: number;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'EmployeeDetail'>;

export default function EmployeeDetailScreen({ navigation, route }: Props) {
  const { 
    employeeId = '1',
    name = 'Kamal Jangid',
    role = 'Carpenter',
    empId = '001',
    salary = '30000/-',
    company = 'Creative Designers',
    location = 'Radhakishanpura, Sikar',
    phone = '+919460638554',
    joiningDate = '01/07/2024',
    endDate = '00/00/0000',
    progress = 90,
    progressDays = 90
  } = route.params || {};

  const [isToggleOn, setIsToggleOn] = useState(true);
  const insets = useSafeArea();

  const tileGap = spacing(12);
  const horizontalMargin = spacing(16) * 2;
  const tileWidth = (SCREEN_WIDTH - horizontalMargin - tileGap * 3) / 4;

  const quickActions = [
    { 
      name: 'Leave Request', 
      icon: require('../../assets/Leave Request.png'), 
      bgColor: '#FCE4EC', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'Pay Request', 
      icon: require('../../assets/Pay request.png'), 
      bgColor: '#E0F2F1', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'History', 
      icon: require('../../assets/history.png'), 
      bgColor: '#FFFFFF', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'Salary', 
      icon: require('../../assets/payment.png'), 
      bgColor: '#FFF9C4', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'Location', 
      icon: require('../../assets/Frame.png'), 
      bgColor: '#E3F2FD', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'Call Details', 
      icon: require('../../assets/contacts.png'), 
      bgColor: '#E1F5FE', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'Promotion', 
      icon: require('../../assets/history.png'), 
      bgColor: '#F3E5F5', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'Edit', 
      icon: require('../../assets/Leave Request.png'), 
      bgColor: '#FFF9C4', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'ID Card', 
      icon: require('../../assets/id card (2).png'), 
      bgColor: '#E8F5E9', 
      hasNotification: false,
      onPress: () => navigation.navigate('IDCard' as any) 
    },
    { 
      name: 'Expense', 
      icon: require('../../assets/Expense.png'), 
      bgColor: '#F5F5F5', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'Assest', 
      icon: require('../../assets/assets.png'), 
      bgColor: '#FFF9C4', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'Agreements', 
      icon: require('../../assets/agreements.png'), 
      bgColor: '#E8F5E9', 
      hasNotification: false,
      onPress: () => {} 
    },
    { 
      name: 'Resignation', 
      icon: require('../../assets/resignation-icon.png'), 
      bgColor: '#E0F7FA', 
      hasNotification: false,
      onPress: () => {} 
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#FFFFFF' }}>
        <View style={{
          backgroundColor: '#FFFFFF',
          paddingTop: hp(10),
          paddingBottom: spacing(12),
          paddingHorizontal: spacing(16),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0'
        }}>
          {/* Back Arrow */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: spacing(8) }}>
            <Text style={{ fontSize: fontSize(20), color: '#000000' }} allowFontScaling={false}>←</Text>
          </TouchableOpacity>

          {/* Logo */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={require('../../assets/caarobar (2) 1.png')}
              style={{ width: wp(120), height: hp(40), resizeMode: 'contain' }}
            />
          </View>

          {/* Right Icons */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(16) }}>
            {/* Crown Icon */}
            <TouchableOpacity style={{ padding: spacing(4) }}>
              <Text style={{ fontSize: fontSize(20), color: '#000000' }} allowFontScaling={false}>👑</Text>
            </TouchableOpacity>
            {/* Bell with notification */}
            <TouchableOpacity style={{ position: 'relative', padding: spacing(4) }}>
              <Image source={require('../../assets/Frame.png')} style={{ width: wp(22), height: hp(22), resizeMode: 'contain' }} />
              <View style={{ position: 'absolute', top: hp(2), right: wp(2), width: wp(8), height: hp(8), borderRadius: hp(4), backgroundColor: '#4CAF50', borderWidth: 1.5, borderColor: 'white' }} />
            </TouchableOpacity>
            {/* Search */}
            <TouchableOpacity style={{ padding: spacing(4) }}>
              <Text style={{ fontSize: fontSize(20), color: '#000000' }} allowFontScaling={false}>🔍</Text>
            </TouchableOpacity>
            {/* More options */}
            <TouchableOpacity style={{ padding: spacing(4) }}>
              <Text style={{ fontSize: fontSize(20), color: '#000000' }} allowFontScaling={false}>⋮</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: hp(100) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee Information Section */}
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: spacing(16),
          paddingTop: spacing(20),
          paddingBottom: spacing(16),
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0'
        }}>
          {/* Left Column - Company Logo and Salary */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Image
              source={require('../../assets/creative designers.png')}
              style={{ width: wp(140), height: hp(40), resizeMode: 'contain', marginBottom: spacing(12) }}
            />
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Salary {salary}
            </Text>
          </View>

          {/* Middle Column - Profile Picture, Name, Role */}
          <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: spacing(12) }}>
            <Image
              source={require('../../assets/Profile picture.png')}
              style={{
                width: wp(80),
                height: hp(80),
                borderRadius: hp(40),
                marginBottom: spacing(8),
                resizeMode: 'cover',
                backgroundColor: '#F5F5F5'
              }}
            />
            <Text style={{
              fontSize: fontSize(16),
              fontWeight: '700',
              color: '#000000',
              fontFamily: 'Poppins-Bold',
              marginBottom: spacing(4),
              textAlign: 'center'
            }} allowFontScaling={false}>
              {name}
            </Text>
            <Text style={{
              fontSize: fontSize(14),
              color: '#666666',
              fontFamily: 'Poppins',
              textAlign: 'center'
            }} allowFontScaling={false}>
              {role}
            </Text>
          </View>

          {/* Right Column - Company Info */}
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{
              fontSize: fontSize(14),
              fontWeight: '600',
              color: '#000000',
              fontFamily: 'Poppins-SemiBold',
              marginBottom: spacing(4),
              textAlign: 'right'
            }} allowFontScaling={false}>
              {company}
            </Text>
            <Text style={{
              fontSize: fontSize(12),
              color: '#000000',
              fontFamily: 'Poppins',
              marginBottom: spacing(2),
              textAlign: 'right'
            }} allowFontScaling={false}>
              {location}
            </Text>
            <Text style={{
              fontSize: fontSize(12),
              color: '#000000',
              fontFamily: 'Poppins',
              marginBottom: spacing(2),
              textAlign: 'right'
            }} allowFontScaling={false}>
              {phone}
            </Text>
            <Text style={{
              fontSize: fontSize(12),
              color: '#000000',
              fontFamily: 'Poppins',
              textAlign: 'right'
            }} allowFontScaling={false}>
              Emp id - {empId}
            </Text>
          </View>
        </View>

        {/* Status and Toggle Section */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing(16),
          paddingVertical: spacing(16),
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0'
        }}>
          {/* Bell Icon in Gray Box */}
          <View style={{
            width: wp(50),
            height: hp(50),
            borderRadius: hp(8),
            backgroundColor: '#F5F5F5',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing(16)
          }}>
            <Image
              source={require('../../assets/Frame.png')}
              style={{ width: wp(24), height: hp(24), resizeMode: 'contain', tintColor: '#4CAF50' }}
            />
          </View>

          {/* Joining and End Dates */}
          <View style={{ flex: 1, marginRight: spacing(16) }}>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins',
              marginBottom: spacing(4)
            }} allowFontScaling={false}>
              Joining {joiningDate}
            </Text>
            <Text style={{
              fontSize: fontSize(14),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              End {endDate}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={{ alignItems: 'center', marginRight: spacing(16) }}>
            <View style={{
              width: wp(60),
              height: hp(60),
              borderRadius: hp(30),
              borderWidth: hp(6),
              borderColor: '#E0E0E0',
              borderTopColor: '#4CAF50',
              borderRightColor: '#4CAF50',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing(4)
            }}>
              <Text style={{
                fontSize: fontSize(12),
                fontWeight: '700',
                color: '#4CAF50',
                fontFamily: 'Poppins-Bold'
              }} allowFontScaling={false}>
                {progress}%
              </Text>
            </View>
            <Text style={{
              fontSize: fontSize(12),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              {progressDays} Day
            </Text>
          </View>

          {/* Toggle Switch */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(8) }}>
            <Text style={{
              fontSize: fontSize(12),
              color: isToggleOn ? '#4CAF50' : '#9E9E9E',
              fontFamily: 'Poppins',
              marginRight: spacing(4)
            }} allowFontScaling={false}>
              {isToggleOn ? 'ON' : 'OFF'}
            </Text>
            <Switch
              value={isToggleOn}
              onValueChange={setIsToggleOn}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E0E0E0"
            />
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={{ paddingHorizontal: spacing(16), paddingTop: spacing(20), paddingBottom: spacing(16) }}>
          <Text style={{
            fontSize: fontSize(20),
            fontWeight: '700',
            color: '#000000',
            fontFamily: 'Poppins-Bold',
            textDecorationLine: 'underline',
            marginBottom: spacing(16)
          }} allowFontScaling={false}>
            Quick Actions
          </Text>

          {/* Quick Actions Grid */}
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                style={{
                  width: tileWidth,
                  alignItems: 'center',
                  marginBottom: spacing(16)
                }}
              >
                <View style={{
                  width: tileWidth,
                  height: tileWidth,
                  borderRadius: hp(8),
                  backgroundColor: action.bgColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: spacing(8),
                  position: 'relative',
                  borderWidth: 1,
                  borderColor: '#E0E0E0'
                }}>
                  <Image
                    source={action.icon}
                    style={{ width: tileWidth * 0.5, height: tileWidth * 0.5, resizeMode: 'contain' }}
                  />
                  {action.hasNotification && (
                    <View style={{
                      position: 'absolute',
                      top: spacing(4),
                      right: spacing(4),
                      width: wp(8),
                      height: hp(8),
                      borderRadius: hp(4),
                      backgroundColor: '#4CAF50',
                      borderWidth: 1,
                      borderColor: '#FFFFFF'
                    }} />
                  )}
                </View>
                <Text style={{
                  fontSize: fontSize(11),
                  color: '#000000',
                  fontFamily: 'Poppins',
                  textAlign: 'center'
                }} allowFontScaling={false}>
                  {action.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Powered by Section */}
        <View style={{
          alignItems: 'center',
          paddingVertical: spacing(20),
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          marginTop: spacing(20)
        }}>
          <Text style={{
            fontSize: fontSize(12),
            color: '#9E9E9E',
            fontFamily: 'Poppins',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            Powered by - Caarobar
          </Text>
          <Image
            source={require('../../assets/caarobar (2) 1.png')}
            style={{ width: wp(100), height: hp(30), resizeMode: 'contain' }}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#FFFFFF' }}>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          flexDirection: 'row',
          paddingVertical: spacing(8),
          paddingHorizontal: spacing(16),
          justifyContent: 'space-around',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(-2) },
          shadowOpacity: 0.1,
          shadowRadius: hp(4),
          elevation: 5
        }}>
          <TouchableOpacity
            style={{ alignItems: 'center', flex: 1 }}
          >
            <View style={{
              width: wp(40),
              height: hp(40),
              borderRadius: hp(20),
              backgroundColor: '#4285F4',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing(4)
            }}>
              {/* Home Icon */}
              <View style={{ width: wp(20), height: hp(20), alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: wp(8),
                  borderRightWidth: wp(8),
                  borderBottomWidth: hp(6),
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#FFFFFF',
                  marginBottom: hp(2)
                }} />
                <View style={{
                  width: wp(12),
                  height: hp(8),
                  borderWidth: 1.5,
                  borderColor: '#FFFFFF',
                  borderRadius: 1
                }} />
              </View>
            </View>
            <Text style={{
              fontSize: fontSize(10),
              color: '#4285F4',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: 'center', flex: 1 }}
          >
            <View style={{
              width: wp(40),
              height: hp(40),
              borderRadius: hp(20),
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing(4)
            }}>
              {/* Paper Airplane Icon */}
              <View style={{ 
                width: wp(20), 
                height: hp(20), 
                alignItems: 'center', 
                justifyContent: 'center',
                transform: [{ rotate: '45deg' }]
              }}>
                <View style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: wp(10),
                  borderTopWidth: hp(5),
                  borderBottomWidth: hp(5),
                  borderRightColor: '#000000',
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  marginLeft: wp(2)
                }} />
              </View>
            </View>
            <Text style={{
              fontSize: fontSize(10),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Branch
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: 'center', flex: 1 }}
          >
            <View style={{
              width: wp(40),
              height: hp(40),
              borderRadius: hp(20),
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing(4)
            }}>
              <Text style={{ 
                fontSize: fontSize(18), 
                color: '#000000',
                fontFamily: 'Poppins-Bold'
              }} allowFontScaling={false}>
                ₹
              </Text>
            </View>
            <Text style={{
              fontSize: fontSize(10),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Salary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: 'center', flex: 1 }}
          >
            <View style={{
              width: wp(40),
              height: hp(40),
              borderRadius: hp(20),
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing(4)
            }}>
              {/* Map Pin Icon */}
              <View style={{ width: wp(20), height: hp(20), alignItems: 'center', justifyContent: 'flex-start' }}>
                <View style={{
                  width: wp(12),
                  height: hp(12),
                  borderRadius: hp(6),
                  borderWidth: 2,
                  borderColor: '#000000',
                  backgroundColor: '#000000',
                  marginBottom: hp(-2)
                }} />
                <View style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: wp(6),
                  borderRightWidth: wp(6),
                  borderTopWidth: hp(8),
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderTopColor: '#000000'
                }} />
              </View>
            </View>
            <Text style={{
              fontSize: fontSize(10),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Location
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: 'center', flex: 1 }}
          >
            <View style={{
              width: wp(40),
              height: hp(40),
              borderRadius: hp(20),
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing(4)
            }}>
              <Image 
                source={require('../../assets/gear-icon.png')} 
                style={{ 
                  width: wp(20), 
                  height: hp(20), 
                  resizeMode: 'contain',
                  tintColor: '#000000'
                }} 
              />
            </View>
            <Text style={{
              fontSize: fontSize(10),
              color: '#000000',
              fontFamily: 'Poppins'
            }} allowFontScaling={false}>
              Tools
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

