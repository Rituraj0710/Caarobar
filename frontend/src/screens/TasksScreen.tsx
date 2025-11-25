import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Pressable, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH, tableCellWidth, useSafeArea } from '../utils/responsive';
import BackButton from '../components/BackButton';

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
  TaskDetail: undefined;
  NewTask: undefined;
  AddCustomer: undefined;
  AddTask: undefined;
  AddMaintenance: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Tasks'>;

type TabType = 'Order Book' | 'Tasks' | 'Maintenance';

interface Task {
  id: number;
  inDate: string;
  outDate: string;
  title: string;
  location: string;
  duration: string;
  assignee: string;
  phone: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Cancel';
  additionalCount?: number;
}

const tasks: Task[] = [
  {
    id: 1,
    inDate: '05/07/2025',
    outDate: '08/07/2025',
    title: 'Creative Designers',
    location: 'Radhakishpura, Sikar',
    duration: '3 Days',
    assignee: 'Kamal Jangid',
    phone: '+919460638554',
    status: 'Pending',
    additionalCount: 2
  },
  {
    id: 2,
    inDate: '05/07/2025',
    outDate: '08/07/2025',
    title: 'Creative Designers',
    location: 'Radhakishpura, Sikar',
    duration: '3 Days',
    assignee: 'Kamal Jangid',
    phone: '+919460638554',
    status: 'Completed',
    additionalCount: 2
  },
  {
    id: 3,
    inDate: '05/07/2025',
    outDate: '08/07/2025',
    title: 'Creative Designers',
    location: 'Radhakishpura, Sikar',
    duration: '3 Days',
    assignee: 'Kamal Jangid',
    phone: '+919460638554',
    status: 'In Progress',
    additionalCount: 2
  },
  {
    id: 4,
    inDate: '05/07/2025',
    outDate: '08/07/2025',
    title: 'Creative Designers',
    location: 'Radhakishpura, Sikar',
    duration: '3 Days',
    assignee: 'Kamal Jangid',
    phone: '+919460638554',
    status: 'Cancel',
    additionalCount: 2
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return { bg: '#E8F5E9', text: '#2E7D32' };
    case 'In Progress':
      return { bg: '#FFF9C4', text: '#F57C00' };
    case 'Pending':
      return { bg: '#E3F2FD', text: '#1976D2' };
    case 'Cancel':
      return { bg: '#FFEBEE', text: '#C62828' };
    default:
      return { bg: '#F5F5F5', text: '#666666' };
  }
};

export default function TasksScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('Order Book');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDateFilterModal, setShowDateFilterModal] = useState(false);
  const [fromDate, setFromDate] = useState('01/01/2025');
  const [toDate, setToDate] = useState('05/05/2025');
  const insets = useSafeArea();

  const summaryStats = {
    totalOrder: 310,
    completed: 205,
    inProgress: 15,
    pending: 85,
    cancel: 5,
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={activeTab === 'Tasks' ? '#248CFF' : activeTab === 'Order Book' ? '#248CFF' : '#248CFF'} 
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        {/* Blue Header Bar */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          paddingHorizontal: spacing(16),
          paddingTop: spacing(12),
          paddingBottom: spacing(12),
          backgroundColor: '#248CFF'
        }}>
          {/* Left: Back Arrow */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={{ marginRight: spacing(12) }}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          >
            <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
          </TouchableOpacity>
          
          {/* Center: Title */}
          <Text style={{ 
            fontSize: fontSize(20), 
            fontWeight: '700', 
            color: '#FFFFFF', 
            fontFamily: 'Poppins-Bold',
            flex: 1,
            textAlign: 'center'
          }} allowFontScaling={false}>
            {activeTab}
          </Text>

          {/* Right: Icons */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Calendar Icon */}
            <TouchableOpacity 
              style={{ padding: spacing(4), marginRight: spacing(12) }}
              onPress={() => setShowDateFilterModal(true)}
              hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
            >
              <Image 
                source={require('../../assets/task_calender_icon.png')} 
                style={{ 
                  width: wp(20), 
                  height: hp(20), 
                  resizeMode: 'contain',
                  tintColor: '#FFFFFF'
                }} 
              />
            </TouchableOpacity>
            {/* Search Icon */}
            <TouchableOpacity 
              style={{ padding: spacing(4), marginRight: spacing(12) }}
              onPress={() => setShowSearchModal(true)}
              hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
            >
              <Text style={{ fontSize: fontSize(20), color: '#FFFFFF' }} allowFontScaling={false}>🔍</Text>
            </TouchableOpacity>
            {/* Filter Icon */}
            <TouchableOpacity 
              style={{ padding: spacing(4), marginRight: spacing(12) }}
              onPress={() => setShowFilterModal(true)}
              hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
            >
              <Image 
                source={require('../../assets/tasks_filter_icon.png')} 
                style={{ 
                  width: wp(20), 
                  height: hp(20), 
                  resizeMode: 'contain',
                  tintColor: '#FFFFFF'
                }} 
              />
            </TouchableOpacity>
            {/* Refresh Icon */}
            <TouchableOpacity 
              style={{ padding: spacing(4) }}
              hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
            >
              <Image 
                source={require('../../assets/task_reload_icon.png')} 
                style={{ 
                  width: wp(20), 
                  height: hp(20), 
                  resizeMode: 'contain',
                  tintColor: '#FFFFFF'
                }} 
              />
            </TouchableOpacity>
          </View>
        </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: hp(140) + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Cards - Show for Order Book, Tasks, and Maintenance tabs */}
        {(activeTab === 'Order Book' || activeTab === 'Tasks' || activeTab === 'Maintenance') && (
          <View style={{ 
            flexDirection: 'row', 
            paddingHorizontal: spacing(16), 
            marginTop: spacing(16),
            justifyContent: 'space-between'
          }}>
          {/* T. Order Card */}
          <View style={{ 
            flex: 1, 
            backgroundColor: '#FFFFFF', 
            borderRadius: hp(8), 
            borderWidth: wp(1), 
            borderColor: '#E0E0E0',
            paddingVertical: hp(10),
            paddingHorizontal: spacing(4),
            alignItems: 'center',
            minWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: hp(1) },
            shadowOpacity: 0.05,
            shadowRadius: hp(2),
            elevation: 1
          }}>
            <Text style={{ 
              fontSize: fontSize(20), 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: hp(6)
            }} allowFontScaling={false}>
              {summaryStats.totalOrder}
            </Text>
            <View style={{ 
              backgroundColor: '#E8F5E9', 
              paddingHorizontal: spacing(6), 
              paddingVertical: hp(3), 
              borderRadius: hp(8),
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: hp(20)
            }}>
              <Text style={{ 
                fontSize: fontSize(11), 
                color: '#2E7D32', 
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                textAlign: 'center'
              }} allowFontScaling={false} numberOfLines={1}>
                T. Order
              </Text>
            </View>
          </View>

          {/* Completed Card */}
          <View style={{ 
            flex: 1, 
            backgroundColor: '#FFFFFF', 
            borderRadius: hp(8), 
            borderWidth: wp(1), 
            borderColor: '#E0E0E0',
            paddingVertical: hp(10),
            paddingHorizontal: spacing(4),
            alignItems: 'center',
            minWidth: 0,
            marginRight: spacing(8),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: hp(1) },
            shadowOpacity: 0.05,
            shadowRadius: hp(2),
            elevation: 1
          }}>
            <Text style={{ 
              fontSize: fontSize(20), 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: hp(6)
            }} allowFontScaling={false}>
              {summaryStats.completed}
            </Text>
            <View style={{ 
              backgroundColor: '#E8F5E9', 
              paddingHorizontal: spacing(6), 
              paddingVertical: hp(3), 
              borderRadius: hp(8),
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: hp(20)
            }}>
              <Text style={{ 
                fontSize: fontSize(11), 
                color: '#2E7D32', 
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                textAlign: 'center'
              }} allowFontScaling={false} numberOfLines={1}>
                Complete
              </Text>
            </View>
          </View>

          {/* In Progress Card */}
          <View style={{ 
            flex: 1, 
            backgroundColor: '#FFFFFF', 
            borderRadius: hp(8), 
            borderWidth: wp(1), 
            borderColor: '#E0E0E0',
            paddingVertical: hp(10),
            paddingHorizontal: spacing(4),
            alignItems: 'center',
            minWidth: 0,
            marginRight: spacing(8),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: hp(1) },
            shadowOpacity: 0.05,
            shadowRadius: hp(2),
            elevation: 1
          }}>
            <Text style={{ 
              fontSize: fontSize(20), 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: hp(6)
            }} allowFontScaling={false}>
              {summaryStats.inProgress}
            </Text>
            <View style={{ 
              backgroundColor: '#FFF9C4', 
              paddingHorizontal: spacing(6), 
              paddingVertical: hp(3), 
              borderRadius: hp(8),
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: hp(20)
            }}>
              <Text style={{ 
                fontSize: fontSize(11), 
                color: '#F57C00', 
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                textAlign: 'center'
              }} allowFontScaling={false} numberOfLines={1}>
                In Progress
              </Text>
            </View>
          </View>

          {/* Pending Card */}
          <View style={{ 
            flex: 1, 
            backgroundColor: '#FFFFFF', 
            borderRadius: hp(8), 
            borderWidth: wp(1), 
            borderColor: '#E0E0E0',
            paddingVertical: hp(10),
            paddingHorizontal: spacing(4),
            alignItems: 'center',
            minWidth: 0,
            marginRight: spacing(8),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: hp(1) },
            shadowOpacity: 0.05,
            shadowRadius: hp(2),
            elevation: 1
          }}>
            <Text style={{ 
              fontSize: fontSize(20), 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: hp(6)
            }} allowFontScaling={false}>
              {summaryStats.pending}
            </Text>
            <View style={{ 
              backgroundColor: '#E3F2FD', 
              paddingHorizontal: spacing(6), 
              paddingVertical: hp(3), 
              borderRadius: hp(8),
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: hp(20)
            }}>
              <Text style={{ 
                fontSize: fontSize(11), 
                color: '#1976D2', 
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                textAlign: 'center'
              }} allowFontScaling={false} numberOfLines={1}>
                Pending
              </Text>
            </View>
          </View>

          {/* Cancel Card */}
          <View style={{ 
            flex: 1, 
            backgroundColor: '#FFFFFF', 
            borderRadius: hp(8), 
            borderWidth: wp(1), 
            borderColor: '#E0E0E0',
            paddingVertical: hp(10),
            paddingHorizontal: spacing(4),
            alignItems: 'center',
            minWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: hp(1) },
            shadowOpacity: 0.05,
            shadowRadius: hp(2),
            elevation: 1
          }}>
            <Text style={{ 
              fontSize: fontSize(20), 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: hp(6)
            }} allowFontScaling={false}>
              {summaryStats.cancel}
            </Text>
            <View style={{ 
              backgroundColor: '#FFEBEE', 
              paddingHorizontal: spacing(6), 
              paddingVertical: hp(3), 
              borderRadius: hp(8),
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: hp(20)
            }}>
              <Text style={{ 
                fontSize: fontSize(11), 
                color: '#C62828', 
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600',
                textAlign: 'center'
              }} allowFontScaling={false} numberOfLines={1}>
                Cancel
              </Text>
            </View>
          </View>
        </View>
        )}

        {/* Divider Line */}
        {activeTab === 'Order Book' && (
          <View style={{ 
            height: hp(2), 
            backgroundColor: '#4285F4',
            marginHorizontal: spacing(16),
            marginTop: spacing(16),
            marginBottom: spacing(12)
          }} />
        )}
        {activeTab === 'Tasks' && (
          <View style={{ 
            height: hp(2), 
            backgroundColor: '#4CAF50',
            marginHorizontal: spacing(16),
            marginTop: spacing(16),
            marginBottom: spacing(12)
          }} />
        )}
        {activeTab === 'Maintenance' && (
          <View style={{ 
            height: hp(2), 
            backgroundColor: '#E53935',
            marginHorizontal: spacing(16),
            marginTop: spacing(16),
            marginBottom: spacing(12)
          }} />
        )}

        {/* Order List - Only show when Order Book tab is active */}
        {activeTab === 'Order Book' && (
          <View style={{ paddingHorizontal: spacing(16) }}>
            {tasks.map((task) => {
              const statusColor = getStatusColor(task.status);
              return (
                <TouchableOpacity 
                  key={task.id}
                  onPress={() => navigation.navigate('TaskDetail')}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: hp(12),
                    padding: spacing(16),
                    marginBottom: spacing(12),
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: hp(2) },
                    shadowOpacity: 0.08,
                    shadowRadius: hp(4),
                    elevation: 2
                  }}
                >
                {/* Top Row: No., In Date, Out Date */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(12) }}>
                  <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    No. {task.id}
                  </Text>
                  <Text style={{ fontSize: fontSize(12), color: '#1976D2', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    In {task.inDate}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: fontSize(12), color: '#E53935', fontFamily: 'Poppins', marginRight: spacing(8) }} allowFontScaling={false}>
                      Out {task.outDate}
                    </Text>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        setSelectedTaskId(task.id);
                      }}
                      hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
                    >
                      <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>⋮</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Main Title */}
                <Text style={{ 
                  fontSize: fontSize(18), 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold',
                  marginBottom: spacing(8)
                }} allowFontScaling={false}>
                  {task.title}
                </Text>

                {/* Location Row */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing(12) }}>
                  <Text style={{ fontSize: fontSize(14), color: '#9E9E9E', marginRight: spacing(6) }} allowFontScaling={false}>📍</Text>
                  <Text style={{ fontSize: fontSize(13), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {task.location}
                  </Text>
                </View>

                {/* Bottom Section: Tags, Contact Info, and Status */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  {/* Left: Duration and Time Tags */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ 
                      backgroundColor: '#FFEBEE', 
                      paddingHorizontal: spacing(10), 
                      paddingVertical: spacing(4), 
                      borderRadius: hp(12),
                      marginRight: spacing(8)
                    }}>
                      <Text style={{ 
                        fontSize: fontSize(12), 
                        color: '#C62828', 
                        fontFamily: 'Poppins-SemiBold',
                        fontWeight: '600'
                      }} allowFontScaling={false}>
                        {task.duration}
                      </Text>
                    </View>
                    <View style={{ 
                      backgroundColor: '#FFEBEE', 
                      paddingHorizontal: spacing(10), 
                      paddingVertical: spacing(4), 
                      borderRadius: hp(12)
                    }}>
                      <Text style={{ 
                        fontSize: fontSize(12), 
                        color: '#C62828', 
                        fontFamily: 'Poppins-SemiBold',
                        fontWeight: '600'
                      }} allowFontScaling={false}>
                        02:15 PM
                      </Text>
                    </View>
                  </View>

                  {/* Right: Contact Person, Phone, Additional Count, Status */}
                  <View style={{ alignItems: 'flex-end', flex: 1 }}>
                    <Text style={{ 
                      fontSize: fontSize(13), 
                      color: '#000000', 
                      fontFamily: 'Poppins',
                      marginBottom: spacing(4),
                      textAlign: 'right'
                    }} allowFontScaling={false}>
                      {task.assignee}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing(4), justifyContent: 'flex-end' }}>
                      <Text style={{ 
                        fontSize: fontSize(12), 
                        color: '#9E9E9E', 
                        fontFamily: 'Poppins',
                        marginRight: spacing(4)
                      }} allowFontScaling={false}>
                        {task.phone}
                      </Text>
                      <Text style={{ fontSize: fontSize(14), color: '#666666' }} allowFontScaling={false}>📞</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {task.additionalCount && (
                        <Text style={{ 
                          fontSize: fontSize(12), 
                          color: '#9E9E9E', 
                          fontFamily: 'Poppins',
                          marginRight: spacing(6)
                        }} allowFontScaling={false}>
                          +{task.additionalCount}
                        </Text>
                      )}
                      <View style={{ 
                        backgroundColor: statusColor.bg, 
                        paddingHorizontal: spacing(10), 
                        paddingVertical: spacing(4), 
                        borderRadius: hp(12) 
                      }}>
                        <Text style={{ 
                          fontSize: fontSize(12), 
                          color: statusColor.text, 
                          fontFamily: 'Poppins-SemiBold',
                          fontWeight: '600'
                        }} allowFontScaling={false}>
                          {task.status === 'Completed' ? 'Completed' : task.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        
        {/* Tasks List - Only show when Tasks tab is active */}
        {activeTab === 'Tasks' && (
          <View style={{ paddingHorizontal: spacing(16) }}>
            {tasks.map((task) => {
              const statusColor = getStatusColor(task.status);
              return (
                <TouchableOpacity 
                  key={task.id}
                  onPress={() => navigation.navigate('TaskDetail')}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: hp(12),
                    padding: spacing(16),
                    marginBottom: spacing(12),
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: hp(2) },
                    shadowOpacity: 0.08,
                    shadowRadius: hp(4),
                    elevation: 2
                  }}
                >
                  {/* Top Row: No., In Date, Out Date */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(12) }}>
                    <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>
                      No. {task.id}
                    </Text>
                    <Text style={{ fontSize: fontSize(12), color: '#1976D2', fontFamily: 'Poppins' }} allowFontScaling={false}>
                      In {task.inDate}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: fontSize(12), color: '#E53935', fontFamily: 'Poppins', marginRight: spacing(8) }} allowFontScaling={false}>
                        Out {task.outDate}
                      </Text>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          setSelectedTaskId(task.id);
                        }}
                        hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
                      >
                        <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>⋮</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Main Title */}
                  <Text style={{ 
                    fontSize: fontSize(18), 
                    fontWeight: '700', 
                    color: '#000000', 
                    fontFamily: 'Poppins-Bold',
                    marginBottom: spacing(8)
                  }} allowFontScaling={false}>
                    {task.title}
                  </Text>

                  {/* Location and Contact Person Row */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(12) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Text style={{ fontSize: fontSize(14), color: '#9E9E9E', marginRight: spacing(6) }} allowFontScaling={false}>📍</Text>
                      <Text style={{ fontSize: fontSize(13), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>
                        {task.location}
                      </Text>
                    </View>
                    <Text style={{ 
                      fontSize: fontSize(13), 
                      color: '#000000', 
                      fontFamily: 'Poppins',
                      textAlign: 'right'
                    }} allowFontScaling={false}>
                      {task.assignee}
                    </Text>
                  </View>

                  {/* Phone Number Row - Right aligned */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: spacing(12) }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: '#1976D2', 
                      fontFamily: 'Poppins',
                      marginRight: spacing(4)
                    }} allowFontScaling={false}>
                      {task.phone}
                    </Text>
                    <Text style={{ fontSize: fontSize(14), color: '#1976D2' }} allowFontScaling={false}>📞</Text>
                  </View>

                  {/* Bottom Row: Duration Tag on Left, Additional Count and Status on Right */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Left: Duration Tag */}
                    <View style={{ 
                      backgroundColor: '#FFEBEE', 
                      paddingHorizontal: spacing(10), 
                      paddingVertical: spacing(4), 
                      borderRadius: hp(12)
                    }}>
                      <Text style={{ 
                        fontSize: fontSize(12), 
                        color: '#C62828', 
                        fontFamily: 'Poppins-SemiBold',
                        fontWeight: '600'
                      }} allowFontScaling={false}>
                        {task.duration}
                      </Text>
                    </View>

                    {/* Right: Additional Count and Status */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {task.additionalCount && (
                        <Text style={{ 
                          fontSize: fontSize(12), 
                          color: '#9E9E9E', 
                          fontFamily: 'Poppins',
                          marginRight: spacing(6)
                        }} allowFontScaling={false}>
                          +{task.additionalCount}
                        </Text>
                      )}
                      <View style={{ 
                        backgroundColor: statusColor.bg, 
                        paddingHorizontal: spacing(10), 
                        paddingVertical: spacing(4), 
                        borderRadius: hp(12) 
                      }}>
                        <Text style={{ 
                          fontSize: fontSize(12), 
                          color: statusColor.text, 
                          fontFamily: 'Poppins-SemiBold',
                          fontWeight: '600'
                        }} allowFontScaling={false}>
                          {task.status === 'Completed' ? 'Completed' : task.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        
        {/* Maintenance List - Only show when Maintenance tab is active */}
        {activeTab === 'Maintenance' && (
          <View style={{ paddingHorizontal: spacing(16) }}>
            {tasks.map((task) => {
              const statusColor = getStatusColor(task.status);
              return (
                <TouchableOpacity 
                  key={task.id}
                  onPress={() => navigation.navigate('TaskDetail')}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: hp(12),
                    padding: spacing(16),
                    marginBottom: spacing(12),
                    borderWidth: wp(1),
                    borderColor: '#E0E0E0',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: hp(2) },
                    shadowOpacity: 0.08,
                    shadowRadius: hp(4),
                    elevation: 2
                  }}
                >
                  {/* Top Row: No., In Date, Out Date */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(12) }}>
                    <Text style={{ fontSize: fontSize(12), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>
                      No. {task.id}
                    </Text>
                    <Text style={{ fontSize: fontSize(12), color: '#1976D2', fontFamily: 'Poppins' }} allowFontScaling={false}>
                      In {task.inDate}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: fontSize(12), color: '#E53935', fontFamily: 'Poppins', marginRight: spacing(8) }} allowFontScaling={false}>
                        Out {task.outDate}
                      </Text>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          setSelectedTaskId(task.id);
                        }}
                        hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
                      >
                        <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>⋮</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Main Title */}
                  <Text style={{ 
                    fontSize: fontSize(18), 
                    fontWeight: '700', 
                    color: '#000000', 
                    fontFamily: 'Poppins-Bold',
                    marginBottom: spacing(8)
                  }} allowFontScaling={false}>
                    {task.title}
                  </Text>

                  {/* Location and Contact Person Row */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(12) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Text style={{ fontSize: fontSize(14), color: '#9E9E9E', marginRight: spacing(6) }} allowFontScaling={false}>📍</Text>
                      <Text style={{ fontSize: fontSize(13), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>
                        {task.location}
                      </Text>
                    </View>
                    <Text style={{ 
                      fontSize: fontSize(13), 
                      color: '#000000', 
                      fontFamily: 'Poppins',
                      textAlign: 'right'
                    }} allowFontScaling={false}>
                      {task.assignee}
                    </Text>
                  </View>

                  {/* Phone Number Row - Right aligned */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: spacing(12) }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: '#1976D2', 
                      fontFamily: 'Poppins',
                      marginRight: spacing(4)
                    }} allowFontScaling={false}>
                      {task.phone}
                    </Text>
                    <Text style={{ fontSize: fontSize(14), color: '#1976D2' }} allowFontScaling={false}>📞</Text>
                  </View>

                  {/* Bottom Row: Duration Tag on Left, Additional Count and Status on Right */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Left: Duration Tag */}
                    <View style={{ 
                      backgroundColor: '#FFEBEE', 
                      paddingHorizontal: spacing(10), 
                      paddingVertical: spacing(4), 
                      borderRadius: hp(12)
                    }}>
                      <Text style={{ 
                        fontSize: fontSize(12), 
                        color: '#C62828', 
                        fontFamily: 'Poppins-SemiBold',
                        fontWeight: '600'
                      }} allowFontScaling={false}>
                        {task.duration}
                      </Text>
                    </View>

                    {/* Right: Additional Count and Status */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {task.additionalCount && (
                        <Text style={{ 
                          fontSize: fontSize(12), 
                          color: '#9E9E9E', 
                          fontFamily: 'Poppins',
                          marginRight: spacing(6)
                        }} allowFontScaling={false}>
                          +{task.additionalCount}
                        </Text>
                      )}
                      <View style={{ 
                        backgroundColor: statusColor.bg, 
                        paddingHorizontal: spacing(10), 
                        paddingVertical: spacing(4), 
                        borderRadius: hp(12) 
                      }}>
                        <Text style={{ 
                          fontSize: fontSize(12), 
                          color: statusColor.text, 
                          fontFamily: 'Poppins-SemiBold',
                          fontWeight: '600'
                        }} allowFontScaling={false}>
                          {task.status === 'Completed' ? 'Completed' : task.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: hp(100),
          right: spacing(16),
          width: wp(56),
          height: hp(56),
          borderRadius: hp(28),
          backgroundColor: activeTab === 'Tasks' ? '#4CAF50' : activeTab === 'Order Book' ? '#4285F4' : '#E53935',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(4) },
          shadowOpacity: 0.3,
          shadowRadius: hp(8),
          elevation: 8,
          zIndex: 10
        }}
        onPress={() => {
          if (activeTab === 'Order Book') {
            navigation.navigate('AddCustomer');
          } else if (activeTab === 'Tasks') {
            navigation.navigate('AddTask');
          } else {
            navigation.navigate('AddMaintenance');
          }
        }}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: fontSize(32), color: '#FFFFFF', lineHeight: fontSize(32), fontWeight: '300' }} allowFontScaling={false}>+</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <SafeAreaView style={{ backgroundColor: '#FFFFFF' }} edges={['bottom']}>
        <View style={{
          backgroundColor: '#FFFFFF',
          marginHorizontal: spacing(16),
          marginBottom: hp(24),
          marginTop: spacing(8),
          borderTopWidth: wp(1),
          borderTopColor: '#E0E0E0',
          borderRadius: hp(12),
          flexDirection: 'row',
          paddingVertical: spacing(12),
          paddingHorizontal: spacing(16),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -hp(2) },
          shadowOpacity: 0.1,
          shadowRadius: hp(4),
          elevation: 5
        }}>
          {(['Order Book', 'Tasks', 'Maintenance'] as TabType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{ flex: 1, alignItems: 'center' }}
            >
              <Text style={{
                fontSize: fontSize(14),
                color: activeTab === tab ? '#000000' : '#9E9E9E',
                fontFamily: activeTab === tab ? 'Poppins-Bold' : 'Poppins',
                fontWeight: activeTab === tab ? '700' : '400',
                marginBottom: spacing(4)
              }} allowFontScaling={false}>
                {tab}
              </Text>
              {activeTab === tab && (
                <View style={{
                  width: '100%',
                  height: hp(3),
                  backgroundColor: tab === 'Order Book' ? '#4285F4' : tab === 'Tasks' ? '#4CAF50' : '#E53935',
                  borderRadius: hp(2),
                  marginTop: spacing(2),
                  alignSelf: 'center'
                }} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
      </SafeAreaView>

      {/* Search Modal - Dropdown from Search Icon */}
      <Modal
        visible={showSearchModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSearchModal(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            paddingTop: hp(100),
            paddingRight: wp(60)
          }}
          onPress={() => setShowSearchModal(false)}
        >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: hp(8),
              padding: spacing(16),
              marginLeft: 'auto',
              marginRight: spacing(16),
              minWidth: wp(200),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: hp(4) },
              shadowOpacity: 0.2,
              shadowRadius: hp(8),
              elevation: 5
            }}
            onPress={(e: any) => e.stopPropagation()}
          >
            {/* Search Options */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(12),
                borderBottomWidth: wp(1),
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle Party Name search
                setShowSearchModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
              <Text style={{ 
                fontSize: fontSize(14), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                Party Name
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(12),
                borderBottomWidth: wp(1),
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle Mobile Number search
                setShowSearchModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
              <Text style={{ 
                fontSize: fontSize(14), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                Mobile Number
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(12),
                borderBottomWidth: wp(1),
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle Address search
                setShowSearchModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
              <Text style={{ 
                fontSize: fontSize(14), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                Address
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(12)
              }}
              onPress={() => {
                // TODO: Handle Serial No. search
                setShowSearchModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
              <Text style={{ 
                fontSize: fontSize(14), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                Serial No.
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* More Actions Bottom Sheet Modal */}
      <Modal
        visible={selectedTaskId !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedTaskId(null)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'flex-end'
          }}
          onPress={() => setSelectedTaskId(null)}
        >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: hp(24),
              borderTopRightRadius: hp(24),
              padding: spacing(20),
              paddingBottom: spacing(32) + insets.bottom,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -hp(2) },
              shadowOpacity: 0.1,
              shadowRadius: hp(4),
              elevation: 5
            }}
            onPress={(e: any) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(24) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize(20), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>⋮</Text>
                <Text style={{ 
                  fontSize: fontSize(18), 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold' 
                }} allowFontScaling={false}>
                  More Actions
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setSelectedTaskId(null)}
                style={{ padding: spacing(4) }}
              >
                <Text style={{ fontSize: fontSize(20), color: '#000000' }} allowFontScaling={false}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Delete Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16),
                borderBottomWidth: wp(1),
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle delete action
                setSelectedTaskId(null);
              }}
            >
              <Text style={{ fontSize: fontSize(20), marginRight: spacing(16) }} allowFontScaling={false}>🗑️</Text>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                Delete
              </Text>
            </TouchableOpacity>

            {/* Edit Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16)
              }}
              onPress={() => {
                // TODO: Handle edit action
                setSelectedTaskId(null);
              }}
            >
              <Text style={{ fontSize: fontSize(20), marginRight: spacing(16) }} allowFontScaling={false}>✏️</Text>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                Edit
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Filter Bottom Sheet Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'flex-end'
          }}
          onPress={() => setShowFilterModal(false)}
        >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: hp(24),
              borderTopRightRadius: hp(24),
              padding: spacing(20),
              paddingBottom: spacing(32),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -hp(2) },
              shadowOpacity: 0.1,
              shadowRadius: hp(4),
              elevation: 5
            }}
            onPress={(e: any) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(24), paddingBottom: spacing(16), borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize(20), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>🔽</Text>
                <Text style={{ 
                  fontSize: fontSize(18), 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold' 
                }} allowFontScaling={false}>
                  Filter
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setShowFilterModal(false)}
                style={{ padding: spacing(4) }}
              >
                <Text style={{ fontSize: fontSize(20), color: '#9E9E9E' }} allowFontScaling={false}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* By Serial No Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16),
                borderBottomWidth: wp(1),
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle filter by Serial No
                setShowFilterModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                By Serial No
              </Text>
            </TouchableOpacity>

            {/* By Days Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16)
              }}
              onPress={() => {
                // TODO: Handle filter by Days
                setShowFilterModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                By Days
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Date Filter Modal */}
      <Modal
        visible={showDateFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDateFilterModal(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'flex-end'
          }}
          onPress={() => setShowDateFilterModal(false)}
        >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: hp(24),
              borderTopRightRadius: hp(24),
              padding: spacing(20),
              paddingBottom: spacing(32) + insets.bottom,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -hp(2) },
              shadowOpacity: 0.1,
              shadowRadius: hp(4),
              elevation: 5
            }}
            onPress={(e: any) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(24) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image 
                  source={require('../../assets/task_calender_icon.png')} 
                  style={{ 
                    width: wp(24), 
                    height: hp(24), 
                    resizeMode: 'contain',
                    marginRight: spacing(10)
                  }} 
                />
                <Text style={{ 
                  fontSize: fontSize(18), 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold' 
                }} allowFontScaling={false}>
                  Date Filter
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setShowDateFilterModal(false)}
                style={{ padding: spacing(4) }}
                hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
              >
                <Text style={{ fontSize: fontSize(20), color: '#9E9E9E' }} allowFontScaling={false}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Date Range Selection */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: spacing(24)
            }}>
              {/* From Date */}
              <TouchableOpacity 
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  borderWidth: wp(1),
                  borderColor: '#E0E0E0',
                  borderRadius: hp(8),
                  paddingVertical: spacing(12),
                  paddingHorizontal: spacing(12)
                }}
                onPress={() => {
                  // TODO: Open calendar picker for From date
                }}
                activeOpacity={0.7}
              >
                <Image 
                  source={require('../../assets/task_calender_icon.png')} 
                  style={{ 
                    width: wp(20), 
                    height: hp(20), 
                    resizeMode: 'contain',
                    marginRight: spacing(8)
                  }} 
                />
                <Text style={{ 
                  fontSize: fontSize(14), 
                  color: '#000000', 
                  fontFamily: 'Poppins'
                }} allowFontScaling={false}>
                  {fromDate}
                </Text>
              </TouchableOpacity>

              {/* To Text */}
              <Text style={{ 
                fontSize: fontSize(14), 
                color: '#000000', 
                fontFamily: 'Poppins',
                marginHorizontal: spacing(12)
              }} allowFontScaling={false}>
                To
              </Text>

              {/* To Date */}
              <TouchableOpacity 
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  borderWidth: wp(1),
                  borderColor: '#E0E0E0',
                  borderRadius: hp(8),
                  paddingVertical: spacing(12),
                  paddingHorizontal: spacing(12)
                }}
                onPress={() => {
                  // TODO: Open calendar picker for To date
                }}
                activeOpacity={0.7}
              >
                <Image 
                  source={require('../../assets/task_calender_icon.png')} 
                  style={{ 
                    width: wp(20), 
                    height: hp(20), 
                    resizeMode: 'contain',
                    marginRight: spacing(8)
                  }} 
                />
                <Text style={{ 
                  fontSize: fontSize(14), 
                  color: '#000000', 
                  fontFamily: 'Poppins'
                }} allowFontScaling={false}>
                  {toDate}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Predefined Date Options */}
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing(16),
                  borderBottomWidth: wp(1),
                  borderBottomColor: '#E0E0E0'
                }}
                onPress={() => {
                  // TODO: Handle Today option
                  setShowDateFilterModal(false);
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
                <Text style={{ 
                  fontSize: fontSize(16), 
                  color: '#000000', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  Today
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing(16),
                  borderBottomWidth: wp(1),
                  borderBottomColor: '#E0E0E0'
                }}
                onPress={() => {
                  // TODO: Handle This Week option
                  setShowDateFilterModal(false);
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
                <Text style={{ 
                  fontSize: fontSize(16), 
                  color: '#000000', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  This Week
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing(16),
                  borderBottomWidth: wp(1),
                  borderBottomColor: '#E0E0E0'
                }}
                onPress={() => {
                  // TODO: Handle This Month option
                  setShowDateFilterModal(false);
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
                <Text style={{ 
                  fontSize: fontSize(16), 
                  color: '#000000', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  This Month
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing(16),
                  borderBottomWidth: wp(1),
                  borderBottomColor: '#E0E0E0'
                }}
                onPress={() => {
                  // TODO: Handle This Quarter option
                  setShowDateFilterModal(false);
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
                <Text style={{ 
                  fontSize: fontSize(16), 
                  color: '#000000', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  This Quarter
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing(16)
                }}
                onPress={() => {
                  // TODO: Handle This Financial Year option
                  setShowDateFilterModal(false);
                }}
              >
                <Text style={{ fontSize: fontSize(16), color: '#000000', marginRight: spacing(8) }} allowFontScaling={false}>•</Text>
                <Text style={{ 
                  fontSize: fontSize(16), 
                  color: '#000000', 
                  fontFamily: 'Poppins' 
                }} allowFontScaling={false}>
                  This Financial Year
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

