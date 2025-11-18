import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar, Switch, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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

  const screenWidth = Dimensions.get('window').width;
  const tileGap = 12;
  const horizontalMargin = 16 * 2;
  const tileWidth = (screenWidth - horizontalMargin - tileGap * 3) / 4;

  const quickActions = [
    { 
      name: 'Leave Request', 
      icon: require('../../assets/Leave Request.png'), 
      bgColor: '#FCE4EC', 
      hasNotification: true,
      onPress: () => {} 
    },
    { 
      name: 'Pay Request', 
      icon: require('../../assets/Pay request.png'), 
      bgColor: '#E0F2F1', 
      hasNotification: true,
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
      hasNotification: true,
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
      <View style={{
        backgroundColor: '#FFFFFF',
        paddingTop: 44,
        paddingBottom: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
      }}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Text style={{ fontSize: 20, color: '#000000' }}>←</Text>
        </TouchableOpacity>

        {/* Logo */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            source={require('../../assets/caarobar (2) 1.png')}
            style={{ width: 120, height: 40, resizeMode: 'contain' }}
          />
        </View>

        {/* Right Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {/* Crown Icon */}
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 20, color: '#000000' }}>👑</Text>
          </TouchableOpacity>
          {/* Bell with notification */}
          <TouchableOpacity style={{ position: 'relative', padding: 4 }}>
            <Image source={require('../../assets/Frame.png')} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
            <View style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', borderWidth: 1.5, borderColor: 'white' }} />
          </TouchableOpacity>
          {/* Search */}
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 20, color: '#000000' }}>🔍</Text>
          </TouchableOpacity>
          {/* More options */}
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 20, color: '#000000' }}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee Information Section */}
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0'
        }}>
          {/* Left Column - Company Logo and Salary */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Image
              source={require('../../assets/creative designers.png')}
              style={{ width: 140, height: 40, resizeMode: 'contain', marginBottom: 12 }}
            />
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              Salary {salary}
            </Text>
          </View>

          {/* Middle Column - Profile Picture, Name, Role */}
          <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 12 }}>
            <Image
              source={require('../../assets/Profile picture.png')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginBottom: 8,
                resizeMode: 'cover',
                backgroundColor: '#F5F5F5'
              }}
            />
            <Text style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#000000',
              fontFamily: 'Poppins-Bold',
              marginBottom: 4,
              textAlign: 'center'
            }}>
              {name}
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#666666',
              fontFamily: 'Poppins',
              textAlign: 'center'
            }}>
              {role}
            </Text>
          </View>

          {/* Right Column - Company Info */}
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#000000',
              fontFamily: 'Poppins-SemiBold',
              marginBottom: 4,
              textAlign: 'right'
            }}>
              {company}
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#000000',
              fontFamily: 'Poppins',
              marginBottom: 2,
              textAlign: 'right'
            }}>
              {location}
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#000000',
              fontFamily: 'Poppins',
              marginBottom: 2,
              textAlign: 'right'
            }}>
              {phone}
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#000000',
              fontFamily: 'Poppins',
              textAlign: 'right'
            }}>
              Emp id - {empId}
            </Text>
          </View>
        </View>

        {/* Status and Toggle Section */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0'
        }}>
          {/* Bell Icon in Gray Box */}
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            backgroundColor: '#F5F5F5',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16
          }}>
            <Image
              source={require('../../assets/Frame.png')}
              style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: '#4CAF50' }}
            />
          </View>

          {/* Joining and End Dates */}
          <View style={{ flex: 1, marginRight: 16 }}>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins',
              marginBottom: 4
            }}>
              Joining {joiningDate}
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              End {endDate}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={{ alignItems: 'center', marginRight: 16 }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              borderWidth: 6,
              borderColor: '#E0E0E0',
              borderTopColor: '#4CAF50',
              borderRightColor: '#4CAF50',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 4
            }}>
              <Text style={{
                fontSize: 12,
                fontWeight: '700',
                color: '#4CAF50',
                fontFamily: 'Poppins-Bold'
              }}>
                {progress}%
              </Text>
            </View>
            <Text style={{
              fontSize: 12,
              color: '#000000',
              fontFamily: 'Poppins'
            }}>
              {progressDays} Day
            </Text>
          </View>

          {/* Toggle Switch */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{
              fontSize: 12,
              color: isToggleOn ? '#4CAF50' : '#9E9E9E',
              fontFamily: 'Poppins',
              marginRight: 4
            }}>
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
        <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 16 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#000000',
            fontFamily: 'Poppins-Bold',
            textDecorationLine: 'underline',
            marginBottom: 16
          }}>
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
                  marginBottom: 16
                }}
              >
                <View style={{
                  width: tileWidth,
                  height: tileWidth,
                  borderRadius: 8,
                  backgroundColor: action.bgColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
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
                      top: 4,
                      right: 4,
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#4CAF50',
                      borderWidth: 1,
                      borderColor: '#FFFFFF'
                    }} />
                  )}
                </View>
                <Text style={{
                  fontSize: 11,
                  color: '#000000',
                  fontFamily: 'Poppins',
                  textAlign: 'center'
                }}>
                  {action.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Powered by Section */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          marginTop: 20
        }}>
          <Text style={{
            fontSize: 12,
            color: '#9E9E9E',
            fontFamily: 'Poppins',
            marginBottom: 8
          }}>
            Powered by - Caarobar
          </Text>
          <Image
            source={require('../../assets/caarobar (2) 1.png')}
            style={{ width: 100, height: 30, resizeMode: 'contain' }}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }}>
        <TouchableOpacity
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#4285F4',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            {/* Home Icon */}
            <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{
                width: 0,
                height: 0,
                borderLeftWidth: 8,
                borderRightWidth: 8,
                borderBottomWidth: 6,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: '#FFFFFF',
                marginBottom: 2
              }} />
              <View style={{
                width: 12,
                height: 8,
                borderWidth: 1.5,
                borderColor: '#FFFFFF',
                borderRadius: 1
              }} />
            </View>
          </View>
          <Text style={{
            fontSize: 10,
            color: '#4285F4',
            fontFamily: 'Poppins'
          }}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            {/* Paper Airplane Icon */}
            <View style={{ 
              width: 20, 
              height: 20, 
              alignItems: 'center', 
              justifyContent: 'center',
              transform: [{ rotate: '45deg' }]
            }}>
              <View style={{
                width: 0,
                height: 0,
                borderLeftWidth: 0,
                borderRightWidth: 10,
                borderTopWidth: 5,
                borderBottomWidth: 5,
                borderRightColor: '#000000',
                borderTopColor: 'transparent',
                borderBottomColor: 'transparent',
                marginLeft: 2
              }} />
            </View>
          </View>
          <Text style={{
            fontSize: 10,
            color: '#000000',
            fontFamily: 'Poppins'
          }}>
            Branch
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            <Text style={{ 
              fontSize: 18, 
              color: '#000000',
              fontFamily: 'Poppins-Bold'
            }}>
              ₹
            </Text>
          </View>
          <Text style={{
            fontSize: 10,
            color: '#000000',
            fontFamily: 'Poppins'
          }}>
            Salary
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            {/* Map Pin Icon */}
            <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'flex-start' }}>
              <View style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: '#000000',
                backgroundColor: '#000000',
                marginBottom: -2
              }} />
              <View style={{
                width: 0,
                height: 0,
                borderLeftWidth: 6,
                borderRightWidth: 6,
                borderTopWidth: 8,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: '#000000'
              }} />
            </View>
          </View>
          <Text style={{
            fontSize: 10,
            color: '#000000',
            fontFamily: 'Poppins'
          }}>
            Location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: 'center', flex: 1 }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
          }}>
            <Image 
              source={require('../../assets/gear-icon.png')} 
              style={{ 
                width: 20, 
                height: 20, 
                resizeMode: 'contain',
                tintColor: '#000000'
              }} 
            />
          </View>
          <Text style={{
            fontSize: 10,
            color: '#000000',
            fontFamily: 'Poppins'
          }}>
            Tools
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

