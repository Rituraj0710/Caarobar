import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Pressable, SafeAreaView, StatusBar, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { wp, hp, fontSize, spacing, SCREEN_WIDTH, tableCellWidth } from '../utils/responsive';
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
  const [activeTab, setActiveTab] = useState<TabType>('Tasks');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const summaryStats = {
    completed: 205,
    inProgress: 15,
    pending: 85,
    cancel: 5,
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        {/* Top Header */}
        <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 44,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF'
      }}>
        {/* Left: Back Arrow and Logo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ marginRight: 8 }}>
            <BackButton />
          </View>
          <Image 
            source={require('../../assets/header carobar.png')} 
            style={{ width: 96, height: 22, resizeMode: 'contain' }} 
          />
        </View>

        {/* Right: Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <TouchableOpacity 
            style={{ padding: 4 }}
            onPress={() => setShowSearchModal(true)}
          >
            <Text style={{ fontSize: 18, color: '#000000' }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ padding: 4 }}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={{ fontSize: 18, color: '#000000' }}>🔽</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 18, color: '#000000' }}>↻</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Cards */}
        <View style={{ 
          flexDirection: 'row', 
          paddingHorizontal: 16, 
          marginTop: 12,
          gap: 12
        }}>
          {/* Completed Card */}
          <View style={{ 
            flex: 1, 
            backgroundColor: '#FFFFFF', 
            borderRadius: 8, 
            borderWidth: 1, 
            borderColor: '#E0E0E0',
            padding: 12,
            alignItems: 'center'
          }}>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: 8
            }}>
              {summaryStats.completed}
            </Text>
            <View style={{ 
              backgroundColor: '#E8F5E9', 
              paddingHorizontal: 12, 
              paddingVertical: 4, 
              borderRadius: 12 
            }}>
              <Text style={{ 
                fontSize: 12, 
                color: '#2E7D32', 
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600'
              }}>
                Completed
              </Text>
            </View>
          </View>

          {/* In Progress Card */}
          <View style={{ 
            flex: 1, 
            backgroundColor: '#FFFFFF', 
            borderRadius: 8, 
            borderWidth: 1, 
            borderColor: '#E0E0E0',
            padding: 12,
            alignItems: 'center'
          }}>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: 8
            }}>
              {summaryStats.inProgress}
            </Text>
            <View style={{ 
              backgroundColor: '#FFF9C4', 
              paddingHorizontal: 12, 
              paddingVertical: 4, 
              borderRadius: 12 
            }}>
              <Text style={{ 
                fontSize: 12, 
                color: '#F57C00', 
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600'
              }}>
                In Progress
              </Text>
            </View>
          </View>

          {/* Pending Card */}
          <View style={{ 
            flex: 1, 
            backgroundColor: '#FFFFFF', 
            borderRadius: 8, 
            borderWidth: 1, 
            borderColor: '#E0E0E0',
            padding: 12,
            alignItems: 'center'
          }}>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: 8
            }}>
              {summaryStats.pending}
            </Text>
            <View style={{ 
              backgroundColor: '#E3F2FD', 
              paddingHorizontal: 12, 
              paddingVertical: 4, 
              borderRadius: 12 
            }}>
              <Text style={{ 
                fontSize: 12, 
                color: '#1976D2', 
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600'
              }}>
                Pending
              </Text>
            </View>
          </View>

          {/* Cancel Card */}
          <View style={{ 
            flex: 1, 
            backgroundColor: '#FFFFFF', 
            borderRadius: 8, 
            borderWidth: 1, 
            borderColor: '#E0E0E0',
            padding: 12,
            alignItems: 'center'
          }}>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: 8
            }}>
              {summaryStats.cancel}
            </Text>
            <View style={{ 
              backgroundColor: '#FFEBEE', 
              paddingHorizontal: 12, 
              paddingVertical: 4, 
              borderRadius: 12 
            }}>
              <Text style={{ 
                fontSize: 12, 
                color: '#C62828', 
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '600'
              }}>
                Cancel
              </Text>
            </View>
          </View>
        </View>

        {/* Divider Line */}
        <View style={{ 
          height: 2, 
          backgroundColor: activeTab === 'Tasks' ? '#4CAF50' : activeTab === 'Order Book' ? '#4285F4' : '#E53935',
          marginHorizontal: 16,
          marginTop: 16,
          marginBottom: 12
        }} />

        {/* Task List */}
        <View style={{ paddingHorizontal: 16 }}>
          {tasks.map((task) => {
            const statusColor = getStatusColor(task.status);
            return (
              <TouchableOpacity 
                key={task.id}
                onPress={() => navigation.navigate('TaskDetail')}
                activeOpacity={0.7}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 2
                }}
              >
                {/* Top Row: No., In Date, Out Date */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <Text style={{ fontSize: 12, color: '#9E9E9E', fontFamily: 'Poppins' }}>
                    No. {task.id}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#1976D2', fontFamily: 'Poppins' }}>
                    In {task.inDate}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontSize: 12, color: '#E53935', fontFamily: 'Poppins' }}>
                      Out {task.outDate}
                    </Text>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        setSelectedTaskId(task.id);
                      }}
                    >
                      <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Main Title */}
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold',
                  marginBottom: 8
                }}>
                  {task.title}
                </Text>

                {/* Location */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <Text style={{ fontSize: 14, color: '#9E9E9E', marginRight: 6 }}>📍</Text>
                  <Text style={{ fontSize: 13, color: '#9E9E9E', fontFamily: 'Poppins' }}>
                    {task.location}
                  </Text>
                </View>

                {/* Bottom Row: Duration, Assignee, Phone, Status */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Duration Tag */}
                  <View style={{ 
                    backgroundColor: '#FFEBEE', 
                    paddingHorizontal: 10, 
                    paddingVertical: 4, 
                    borderRadius: 12 
                  }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: '#C62828', 
                      fontFamily: 'Poppins-SemiBold',
                      fontWeight: '600'
                    }}>
                      {task.duration}
                    </Text>
                  </View>

                  {/* Assignee and Phone */}
                  <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 12 }}>
                    <Text style={{ 
                      fontSize: 13, 
                      color: '#000000', 
                      fontFamily: 'Poppins',
                      marginBottom: 4
                    }}>
                      {task.assignee}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ 
                        fontSize: 12, 
                        color: '#9E9E9E', 
                        fontFamily: 'Poppins',
                        marginRight: 4
                      }}>
                        {task.phone}
                      </Text>
                      <Text style={{ fontSize: 14, color: '#1976D2' }}>📞</Text>
                    </View>
                  </View>

                  {/* Additional Count and Status */}
                  <View style={{ alignItems: 'flex-end' }}>
                    {task.additionalCount && (
                      <Text style={{ 
                        fontSize: 12, 
                        color: '#9E9E9E', 
                        fontFamily: 'Poppins',
                        marginBottom: 4
                      }}>
                        +{task.additionalCount}
                      </Text>
                    )}
                    <View style={{ 
                      backgroundColor: statusColor.bg, 
                      paddingHorizontal: 10, 
                      paddingVertical: 4, 
                      borderRadius: 12 
                    }}>
                      <Text style={{ 
                        fontSize: 12, 
                        color: statusColor.text, 
                        fontFamily: 'Poppins-SemiBold',
                        fontWeight: '600'
                      }}>
                        {task.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: hp(100),
          right: spacing(16),
          width: wp(56),
          height: hp(56),
          borderRadius: 28,
          backgroundColor: activeTab === 'Tasks' ? '#4CAF50' : activeTab === 'Order Book' ? '#4285F4' : '#E53935',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5
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
      >
        <Text style={{ fontSize: fontSize(28), color: '#FFFFFF', lineHeight: 28 }}>+</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
        <View style={{
          backgroundColor: '#FFFFFF',
          marginHorizontal: spacing(16),
          marginBottom: Platform.OS === 'ios' ? spacing(8) : spacing(16),
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          borderRadius: 12,
          flexDirection: 'row',
          paddingVertical: spacing(12),
          paddingHorizontal: spacing(16),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
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
              }}>
                {tab}
              </Text>
              {activeTab === tab && (
                <View style={{
                  width: '100%',
                  height: 3,
                  backgroundColor: tab === 'Order Book' ? '#4285F4' : tab === 'Tasks' ? '#4CAF50' : '#E53935',
                  borderRadius: 2,
                  marginTop: spacing(2)
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
            paddingTop: 100,
            paddingRight: 60
          }}
          onPress={() => setShowSearchModal(false)}
        >
          <Pressable 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              padding: 16,
              marginLeft: 'auto',
              marginRight: 16,
              minWidth: 200,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5
            }}
            onPress={(e: any) => e.stopPropagation()}
          >
            {/* Search Options */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle Party Name search
                setShowSearchModal(false);
              }}
            >
              <Text style={{ fontSize: 16, color: '#000000', marginRight: 8 }}>•</Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                Party Name
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle Mobile Number search
                setShowSearchModal(false);
              }}
            >
              <Text style={{ fontSize: 16, color: '#000000', marginRight: 8 }}>•</Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                Mobile Number
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle Address search
                setShowSearchModal(false);
              }}
            >
              <Text style={{ fontSize: 16, color: '#000000', marginRight: 8 }}>•</Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                Address
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12
              }}
              onPress={() => {
                // TODO: Handle Serial No. search
                setShowSearchModal(false);
              }}
            >
              <Text style={{ fontSize: 16, color: '#000000', marginRight: 8 }}>•</Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
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
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 20,
              paddingBottom: 32,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5
            }}
            onPress={(e: any) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#000000', marginRight: 8 }}>⋮</Text>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold' 
                }}>
                  More Actions
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setSelectedTaskId(null)}
                style={{ padding: 4 }}
              >
                <Text style={{ fontSize: 20, color: '#000000' }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Delete Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle delete action
                setSelectedTaskId(null);
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 16 }}>🗑️</Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                Delete
              </Text>
            </TouchableOpacity>

            {/* Edit Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16
              }}
              onPress={() => {
                // TODO: Handle edit action
                setSelectedTaskId(null);
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 16 }}>✏️</Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
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
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 20,
              paddingBottom: 32,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5
            }}
            onPress={(e: any) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#000000', marginRight: 8 }}>🔽</Text>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: '700', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Bold' 
                }}>
                  Filter
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setShowFilterModal(false)}
                style={{ padding: 4 }}
              >
                <Text style={{ fontSize: 20, color: '#9E9E9E' }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* By Serial No Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle filter by Serial No
                setShowFilterModal(false);
              }}
            >
              <Text style={{ fontSize: 16, color: '#000000', marginRight: 8 }}>•</Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                By Serial No
              </Text>
            </TouchableOpacity>

            {/* By Days Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16
              }}
              onPress={() => {
                // TODO: Handle filter by Days
                setShowFilterModal(false);
              }}
            >
              <Text style={{ fontSize: 16, color: '#000000', marginRight: 8 }}>•</Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                By Days
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

