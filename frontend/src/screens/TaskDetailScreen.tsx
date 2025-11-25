import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackButton from '../components/BackButton';
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
  const insets = useSafeArea();

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Top Header */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#FFFFFF' }}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          paddingHorizontal: spacing(16),
          paddingTop: hp(10),
          paddingBottom: spacing(12),
          backgroundColor: '#FFFFFF'
        }}>
          {/* Left: Back Arrow and Logo */}
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{ marginRight: spacing(8) }}>
              <BackButton />
            </View>
            <Image 
              source={require('../../assets/header carobar.png')} 
              style={{ width: wp(96), height: hp(22), resizeMode: 'contain' }} 
            />
          </View>

          {/* Right: Icons */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(16) }}>
            {/* Bell with notification dot */}
            <View style={{ position: 'relative' }}>
              <TouchableOpacity style={{ padding: spacing(4) }}>
                <Image 
                  source={require('../../assets/Frame.png')} 
                  style={{ width: wp(22), height: hp(22), resizeMode: 'contain' }} 
                />
              </TouchableOpacity>
              <View style={{ 
                position: 'absolute', 
                right: wp(2), 
                top: hp(4), 
                width: wp(8), 
                height: hp(8), 
                borderRadius: hp(4), 
                backgroundColor: '#4CAF50' 
              }} />
            </View>
            <TouchableOpacity style={{ padding: spacing(4) }}>
              <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: spacing(4) }}>
              <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>↻</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: hp(120) + insets.bottom, paddingHorizontal: spacing(16) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Header Section */}
        <View style={{ marginTop: spacing(12), marginBottom: spacing(16) }}>
          {/* No. Label */}
          <Text style={{ 
            fontSize: fontSize(12), 
            color: '#9E9E9E', 
            fontFamily: 'Poppins',
            marginBottom: spacing(8)
          }} allowFontScaling={false}>
            No. 1
          </Text>

          {/* Title */}
          <Text style={{ 
            fontSize: fontSize(24), 
            fontWeight: '700', 
            color: '#000000', 
            fontFamily: 'Poppins-Bold',
            marginBottom: spacing(12) 
          }} allowFontScaling={false}>
            Creative Designers
          </Text>

          {/* Location and Contact Info */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: fontSize(14), color: '#9E9E9E', marginRight: spacing(6) }} allowFontScaling={false}>📍</Text>
              <Text style={{ fontSize: fontSize(14), color: '#9E9E9E', fontFamily: 'Poppins' }} allowFontScaling={false}>
                Radhakishpura, Sikar
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: fontSize(14), color: '#000000', fontFamily: 'Poppins', marginBottom: spacing(4) }} allowFontScaling={false}>
                Kamal Jangid
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize(13), color: '#000000', fontFamily: 'Poppins', marginRight: spacing(6) }} allowFontScaling={false}>
                  +919460638554
                </Text>
                <Text style={{ fontSize: fontSize(16), color: '#1976D2' }} allowFontScaling={false}>📞</Text>
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
                borderRadius: hp(12),
                padding: spacing(16),
                marginBottom: spacing(16),
                borderWidth: 1,
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
                  No. {item.id}
                </Text>
                <Text style={{ fontSize: fontSize(12), color: '#1976D2', fontFamily: 'Poppins' }} allowFontScaling={false}>
                  In {item.inDate}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(8) }}>
                  <Text style={{ fontSize: fontSize(12), color: '#E53935', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    Out {item.outDate}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTaskItemId(item.id);
                      setShowMoreActionsModal(true);
                    }}
                  >
                    <Text style={{ fontSize: fontSize(16), color: '#000000' }} allowFontScaling={false}>⋮</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Task Title */}
              <Text style={{ 
                fontSize: fontSize(18), 
                fontWeight: '700', 
                color: '#000000', 
                fontFamily: 'Poppins-Bold',
                marginBottom: spacing(12)
              }} allowFontScaling={false}>
                {item.title}
              </Text>

              {/* Specifications */}
              <View style={{ marginBottom: spacing(12) }}>
                {item.specifications.map((spec, specIndex) => (
                  <Text 
                    key={specIndex}
                    style={{ 
                      fontSize: fontSize(13), 
                      color: '#9E9E9E', 
                      fontFamily: 'Poppins',
                      marginBottom: spacing(4),
                      lineHeight: hp(20)
                    }}
                    allowFontScaling={false}
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
                  paddingHorizontal: spacing(12), 
                  paddingVertical: spacing(6), 
                  borderRadius: hp(12) 
                }}>
                  <Text style={{ 
                    fontSize: fontSize(12), 
                    color: '#C62828', 
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }} allowFontScaling={false}>
                    {item.duration}
                  </Text>
                </View>

                {/* Assigned Personnel and Status */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing(12) }}>
                  {/* Profile Pictures */}
                  <View style={{ flexDirection: 'row', marginRight: spacing(8) }}>
                    {Array.from({ length: item.assignedPersonnel }).map((_, idx) => (
                      <Image 
                        key={idx}
                        source={require('../../assets/Profile picture.png')} 
                        style={{ 
                          width: wp(32), 
                          height: hp(32), 
                          borderRadius: hp(16),
                          marginLeft: idx > 0 ? wp(-8) : 0,
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
                    paddingHorizontal: spacing(12), 
                    paddingVertical: spacing(6), 
                    borderRadius: hp(12) 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(12), 
                      color: statusColor.text, 
                      fontFamily: 'Poppins-SemiBold',
                      fontWeight: '600'
                    }} allowFontScaling={false}>
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
          bottom: hp(100) + insets.bottom,
          right: spacing(16),
          width: wp(56),
          height: hp(56),
          borderRadius: hp(28),
          backgroundColor: '#E53935',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(4) },
          shadowOpacity: 0.3,
          shadowRadius: hp(8),
          elevation: 5
        }}
        onPress={() => {
          navigation.navigate('NewTask');
        }}
      >
        <Text style={{ fontSize: fontSize(28), color: '#FFFFFF', lineHeight: hp(28) }} allowFontScaling={false}>+</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'transparent' }}>
        <View style={{
          marginHorizontal: spacing(16),
          marginBottom: spacing(8),
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          borderRadius: hp(12),
          flexDirection: 'row',
          paddingVertical: spacing(12),
          paddingHorizontal: spacing(16),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(-2) },
          shadowOpacity: 0.1,
          shadowRadius: hp(4),
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
                  marginTop: spacing(2)
                }} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

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
              borderTopLeftRadius: hp(24),
              borderTopRightRadius: hp(24),
              padding: spacing(20),
              paddingBottom: spacing(32) + insets.bottom,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: hp(-2) },
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
                onPress={() => setShowMoreActionsModal(false)}
                style={{ padding: spacing(4) }}
              >
                <Text style={{ fontSize: fontSize(20), color: '#000000' }} allowFontScaling={false}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* WhatsApp Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16),
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle WhatsApp action
                setShowMoreActionsModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(20), marginRight: spacing(16) }} allowFontScaling={false}>💬</Text>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                WhatsApp
              </Text>
            </TouchableOpacity>

            {/* Transfer to Tasks Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16),
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle transfer to Tasks
                setShowMoreActionsModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(20), marginRight: spacing(16) }} allowFontScaling={false}>⇄</Text>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                Transfer to Tasks
              </Text>
            </TouchableOpacity>

            {/* Transfer to Maintenance Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16),
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle transfer to Maintenance
                setShowMoreActionsModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(20), marginRight: spacing(16) }} allowFontScaling={false}>⇄</Text>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                Transfer to Maintenance
              </Text>
            </TouchableOpacity>

            {/* Delete Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16),
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0'
              }}
              onPress={() => {
                // TODO: Handle delete action
                setShowMoreActionsModal(false);
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

            {/* Share Option */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: spacing(16)
              }}
              onPress={() => {
                // TODO: Handle share action
                setShowMoreActionsModal(false);
              }}
            >
              <Text style={{ fontSize: fontSize(20), marginRight: spacing(16) }} allowFontScaling={false}>📤</Text>
              <Text style={{ 
                fontSize: fontSize(16), 
                color: '#000000', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                Share
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

