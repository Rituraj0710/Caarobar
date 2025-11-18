import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
};

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

type TabType = 'Order Book' | 'Tasks' | 'Maintenance';

interface TaskItem {
  id: number;
  inDate: string;
  outDate: string;
  title: string;
  specifications: string[];
  duration: string;
  assignedPersonnel: number;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Cancel';
}

const taskItems: TaskItem[] = [
  {
    id: 1,
    inDate: '05/07/2025',
    outDate: '08/07/2025',
    title: 'Workshop Signage',
    specifications: [
      'Size : 120"x36"',
      'ACP Color Black hai.',
      '3 Foot ke wire rakhne hai',
      'Folding 5 set chaiye'
    ],
    duration: '3 Days',
    assignedPersonnel: 2,
    status: 'Pending'
  },
  {
    id: 1,
    inDate: '05/07/2025',
    outDate: '08/07/2025',
    title: 'Building Signage',
    specifications: [
      'Size : 120"x36"',
      'ACP Color Black hai.',
      '3 Foot ke wire rakhne hai',
      'Folding 5 set chaiye'
    ],
    duration: '3 Days',
    assignedPersonnel: 2,
    status: 'In Progress'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return { bg: '#E8F5E9', text: '#FFFFFF' };
    case 'In Progress':
      return { bg: '#FFF9C4', text: '#000000' };
    case 'Pending':
      return { bg: '#E3F2FD', text: '#FFFFFF' };
    case 'Cancel':
      return { bg: '#FFEBEE', text: '#FFFFFF' };
    default:
      return { bg: '#F5F5F5', text: '#666666' };
  }
};

export default function TaskDetailScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('Tasks');
  const [showMoreActionsModal, setShowMoreActionsModal] = useState(false);
  const [selectedTaskItemId, setSelectedTaskItemId] = useState<number | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
          {/* Bell with notification dot */}
          <View style={{ position: 'relative' }}>
            <TouchableOpacity style={{ padding: 4 }}>
              <Image 
                source={require('../../assets/Frame.png')} 
                style={{ width: 22, height: 22, resizeMode: 'contain' }} 
              />
            </TouchableOpacity>
            <View style={{ 
              position: 'absolute', 
              right: 2, 
              top: 4, 
              width: 8, 
              height: 8, 
              borderRadius: 4, 
              backgroundColor: '#4CAF50' 
            }} />
          </View>
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 18, color: '#000000' }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 18, color: '#000000' }}>↻</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Header Section */}
        <View style={{ marginTop: 12, marginBottom: 16 }}>
          {/* No. Label */}
          <Text style={{ 
            fontSize: 12, 
            color: '#9E9E9E', 
            fontFamily: 'Poppins',
            marginBottom: 8
          }}>
            No. 1
          </Text>

          {/* Title */}
          <Text style={{ 
            fontSize: 24, 
            fontWeight: '700', 
            color: '#000000', 
            fontFamily: 'Poppins-Bold',
            marginBottom: 12 
          }}>
            Creative Designers
          </Text>

          {/* Location and Contact Info */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 14, color: '#9E9E9E', marginRight: 6 }}>📍</Text>
              <Text style={{ fontSize: 14, color: '#9E9E9E', fontFamily: 'Poppins' }}>
                Radhakishpura, Sikar
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', marginBottom: 4 }}>
                Kamal Jangid
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 13, color: '#000000', fontFamily: 'Poppins', marginRight: 6 }}>
                  +919460638554
                </Text>
                <Text style={{ fontSize: 16, color: '#1976D2' }}>📞</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Task Detail Cards */}
        {taskItems.map((item, index) => {
          const statusColor = getStatusColor(item.status);
          return (
            <View 
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
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
                  No. {item.id}
                </Text>
                <Text style={{ fontSize: 12, color: '#1976D2', fontFamily: 'Poppins' }}>
                  In {item.inDate}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontSize: 12, color: '#E53935', fontFamily: 'Poppins' }}>
                    Out {item.outDate}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTaskItemId(item.id);
                      setShowMoreActionsModal(true);
                    }}
                  >
                    <Text style={{ fontSize: 16, color: '#000000' }}>⋮</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Task Title */}
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold',
                marginBottom: 12
              }}>
                {item.title}
              </Text>

              {/* Specifications */}
              <View style={{ marginBottom: 12 }}>
                {item.specifications.map((spec, specIndex) => (
                  <Text 
                    key={specIndex}
                    style={{ 
                      fontSize: 13, 
                      color: '#9E9E9E', 
                      fontFamily: 'Poppins',
                      marginBottom: 4,
                      lineHeight: 20
                    }}
                  >
                    {spec}
                  </Text>
                ))}
              </View>

              {/* Bottom Row: Duration, Assigned Personnel, Status */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Duration Badge */}
                <View style={{ 
                  backgroundColor: '#FFEBEE', 
                  paddingHorizontal: 12, 
                  paddingVertical: 6, 
                  borderRadius: 12 
                }}>
                  <Text style={{ 
                    fontSize: 12, 
                    color: '#C62828', 
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }}>
                    {item.duration}
                  </Text>
                </View>

                {/* Assigned Personnel and Status */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  {/* Profile Pictures */}
                  <View style={{ flexDirection: 'row', marginRight: 8 }}>
                    {Array.from({ length: item.assignedPersonnel }).map((_, idx) => (
                      <Image 
                        key={idx}
                        source={require('../../assets/Profile picture.png')} 
                        style={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 16,
                          marginLeft: idx > 0 ? -8 : 0,
                          borderWidth: 2,
                          borderColor: '#FFFFFF',
                          resizeMode: 'cover'
                        }} 
                      />
                    ))}
                  </View>

                  {/* Status Badge */}
                  <View style={{ 
                    backgroundColor: statusColor.bg, 
                    paddingHorizontal: 12, 
                    paddingVertical: 6, 
                    borderRadius: 12 
                  }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: statusColor.text, 
                      fontFamily: 'Poppins-SemiBold',
                      fontWeight: '600'
                    }}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Floating Action Button - Red for creating new task item */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 100,
          right: 16,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#E53935',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5
        }}
        onPress={() => {
          navigation.navigate('NewTask');
        }}
      >
        <Text style={{ fontSize: 28, color: '#FFFFFF', lineHeight: 28 }}>+</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={{
        position: 'absolute',
        bottom: 40,
        left: 16,
        right: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        borderRadius: 12,
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }}>
        {(['Order Book', 'Tasks', 'Maintenance'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              if (tab === 'Tasks') {
                navigation.navigate('Tasks');
              }
              // TODO: Navigate to other tabs
            }}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Text style={{
              fontSize: 14,
              color: activeTab === tab ? '#000000' : '#9E9E9E',
              fontFamily: activeTab === tab ? 'Poppins-Bold' : 'Poppins',
              fontWeight: activeTab === tab ? '700' : '400',
              marginBottom: 4
            }}>
              {tab}
            </Text>
            {activeTab === tab && (
              <View style={{
                width: '100%',
                height: 3,
                backgroundColor: tab === 'Order Book' ? '#4285F4' : tab === 'Tasks' ? '#4CAF50' : '#E53935',
                borderRadius: 2,
                marginTop: 2
              }} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* More Actions Bottom Sheet Modal */}
      <Modal
        visible={showMoreActionsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMoreActionsModal(false)}
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            justifyContent: 'flex-end'
          }}
          onPress={() => setShowMoreActionsModal(false)}
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
                onPress={() => setShowMoreActionsModal(false)}
                style={{ padding: 4 }}
              >
                <Text style={{ fontSize: 20, color: '#000000' }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* WhatsApp Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle WhatsApp action
                setShowMoreActionsModal(false);
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 16 }}>💬</Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                WhatsApp
              </Text>
            </TouchableOpacity>

            {/* Transfer to Tasks Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle transfer to Tasks
                setShowMoreActionsModal(false);
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 16 }}>⇄</Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                Transfer to Tasks
              </Text>
            </TouchableOpacity>

            {/* Transfer to Maintenance Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle transfer to Maintenance
                setShowMoreActionsModal(false);
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 16 }}>⇄</Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                Transfer to Maintenance
              </Text>
            </TouchableOpacity>

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
                setShowMoreActionsModal(false);
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

            {/* Share Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16
              }}
              onPress={() => {
                // TODO: Handle share action
                setShowMoreActionsModal(false);
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 16 }}>📤</Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }}>
                Share
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

