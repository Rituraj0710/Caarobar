import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
  WorkHistory: undefined;
  DailyWorkHistory: { month: string; monthNumber: string; year: string };
  ExpenseRequestReport: undefined;
  ExpenseRequestDetail: { month: string; monthNumber: string; year: string };
  PaymentRequestDetail: { month: string; monthNumber: string; year: string };
  ApplyForPayment: undefined;
  ApplyForExpense: undefined;
  AssetsReport: undefined;
  Agreements: undefined;
  Resignation: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Agreements'>;

const agreementTerms = [
  {
    number: '01',
    text: 'ड्यूटी टाइम 9 से 7:30 तक है एसके बाद ओवर्टाइम मिलेगा'
  },
  {
    number: '02',
    text: 'घर पर जाकर खाना खाने पर 30 मिनट मिलेगी'
  },
  {
    number: '03',
    text: 'घर जाते समय on / of का मैसेज करना है'
  },
  {
    number: '04',
    text: 'रविवार को पूरी ड्यूटी करने पर 1.5 ड्यूटी का पैसा मिलेगा / 1 दिन का मिलेगा'
  },
  {
    number: '05',
    text: 'पेमेंट बिचमे 20 तारीख को मिलेगा ओर 7 तारीख को पूरी सैलरी मिलेगी'
  },
  {
    number: '06',
    text: 'वर्शाप मे ईमर्जन्सी होने पर ही फोन का प्रयोग करना है'
  },
  {
    number: '07',
    text: 'बिना बतायेह छुट्टी करने पर 1 दिन की जगह 2 दिन के पैसे कटेंगे'
  },
  {
    number: '08',
    text: 'Computer से Data चोरी करने पर 1 लाख रूपए का जुर्माना लगेगा'
  },
  {
    number: '09',
    text: 'काम छोड़ने से पहले 1 महीने पहले सूचना देनी होगी बिना सूचना दिए काम छोड़ने पर कोई सैलरी नहीं मिलेगी'
  },
];

export default function AgreementsScreen({ navigation }: Props) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginRight: 8 }}>
            <Text style={{ fontSize: 20, color: '#000000' }}>←</Text>
          </TouchableOpacity>
          <Image 
            source={require('../../assets/header carobar.png')} 
            style={{ width: 96, height: 22, resizeMode: 'contain' }} 
          />
        </View>

        {/* Right: Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Bell with notification dot */}
          <View style={{ position: 'relative', marginRight: 16 }}>
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
          <TouchableOpacity style={{ padding: 4, marginRight: 16 }}>
            <Text style={{ fontSize: 18, color: '#000000' }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 4 }}>
            <Text style={{ fontSize: 18, color: '#000000' }}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Employee and Company Information Section - Card */}
        <View style={{ 
          marginTop: 12, 
          marginBottom: 24,
          backgroundColor: '#F5F5F5',
          borderRadius: 12,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2
        }}>
          {/* Top Section: Company Logo (Left) and Company Info (Right) */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            {/* Company Logo on Left */}
            <View style={{ flex: 1 }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: 140, height: 40, resizeMode: 'contain' }} 
              />
            </View>

            {/* Company Info on Right */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000', fontFamily: 'Poppins-SemiBold', marginBottom: 4 }}>
                Creative Designers
              </Text>
              <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins', marginBottom: 2 }}>
                Radhakishanpura, Sikar
              </Text>
              <Text style={{ fontSize: 12, color: '#666666', fontFamily: 'Poppins' }}>
                +919460638554
              </Text>
            </View>
          </View>

          {/* Middle Section: Profile Picture (Center) with Name/Role and Ellipsis (Right) */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
            {/* Profile Picture and Info in Center */}
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Image 
                source={require('../../assets/Profile picture.png')} 
                style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }} 
              />
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', fontFamily: 'Poppins-Bold', marginBottom: 4, textAlign: 'center' }}>
                Kamal Jangid
              </Text>
              <Text style={{ fontSize: 14, color: '#666666', fontFamily: 'Poppins', textAlign: 'center' }}>
                Carpenter
              </Text>
            </View>

            {/* Ellipsis icon on Far Right */}
            <View style={{ position: 'absolute', right: 0 }}>
              <TouchableOpacity>
                <Text style={{ fontSize: 18, color: '#000000' }}>⋮</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Section: Joining Date (Left), AGREEMENT (Center), Emp id (Right) */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E0E0E0' }}>
            {/* Joining Date on Left */}
            <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
              Joining 01/11/23
            </Text>

            {/* AGREEMENT in Center */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#E91E63', fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }}>
                  AGREEMENT
                </Text>
              </TouchableOpacity>
            </View>

            {/* Emp id on Right */}
            <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins' }}>
              Emp id - 001
            </Text>
          </View>
        </View>

        {/* Terms and Conditions Section */}
        <View style={{ marginBottom: 24 }}>
          {agreementTerms.map((term, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#000000', fontFamily: 'Inter', marginRight: 12, minWidth: 35, lineHeight: 28 }}>
                  {term.number}.
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#000000', fontFamily: 'Inter', flex: 1, lineHeight: 28, letterSpacing: 0 }}>
                  {term.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
      }}>
        {/* Signature - Top Right */}
        <View style={{ alignItems: 'flex-end', marginBottom: 16 }}>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, color: '#000000', fontFamily: 'Poppins', textDecorationLine: 'underline' }}>
              Signature
            </Text>
          </TouchableOpacity>
        </View>

        {/* Add Typing Button - Centered Below, Smaller Size */}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity 
            onPress={() => setShowSuccessModal(true)}
            style={{
              backgroundColor: '#2196F3',
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF', fontFamily: 'Poppins-SemiBold' }}>
              Add Typing
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <View style={{ 
            backgroundColor: '#FFFFFF', 
            width: '100%',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 32,
            paddingBottom: 24,
            paddingHorizontal: 24,
            alignItems: 'center'
          }}>
            {/* Success Icon */}
            <View style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 40, 
              backgroundColor: '#E3F2FD',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}>
              <View style={{ 
                width: 60, 
                height: 60, 
                borderRadius: 30, 
                backgroundColor: '#2196F3',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ fontSize: 32, color: '#FFFFFF' }}>✓</Text>
              </View>
            </View>

            {/* Title */}
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold',
              marginBottom: 8,
              textAlign: 'center'
            }}>
              Resignation Applied Successfully
            </Text>

            {/* Message */}
            <Text style={{ 
              fontSize: 14, 
              color: '#666666', 
              fontFamily: 'Poppins',
              marginBottom: 32,
              textAlign: 'center',
              lineHeight: 20
            }}>
              Your Resignation has been applied successfully
            </Text>

            {/* Done Button */}
            <TouchableOpacity 
              onPress={() => {
                setShowSuccessModal(false);
                navigation.navigate('Resignation');
              }}
              style={{
                backgroundColor: '#2196F3',
                width: '100%',
                paddingVertical: 16,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#FFFFFF', 
                fontFamily: 'Poppins-SemiBold' 
              }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

