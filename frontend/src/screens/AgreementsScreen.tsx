import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
  const insets = useSafeArea();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#248CFF" />
      
      {/* Header - Blue Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: spacing(16),
        paddingTop: spacing(8),
        paddingBottom: spacing(8),
        backgroundColor: '#248CFF'
      }}>
        {/* Left: Back Arrow */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: spacing(4) }}
        >
          <Text style={{ fontSize: fontSize(24), color: '#FFFFFF' }} allowFontScaling={false}>←</Text>
        </TouchableOpacity>

        {/* Center: Title */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ 
            fontSize: fontSize(18), 
            fontWeight: '600', 
            color: '#FFFFFF', 
            fontFamily: 'Poppins-SemiBold' 
          }} allowFontScaling={false}>
            Agreement
          </Text>
        </View>

        {/* Right: Edit and Menu Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: spacing(4), marginRight: spacing(12) }}>
            <Image 
              source={require('../../assets/Registration header.png')} 
              style={{ width: wp(20), height: hp(20), resizeMode: 'contain', tintColor: '#FFFFFF' }} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: spacing(4) }}>
            <Text style={{ fontSize: fontSize(18), color: '#FFFFFF' }} allowFontScaling={false}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content - Single Screen Layout */}
      <View style={{ flex: 1, paddingHorizontal: spacing(16) }}>
        {/* Employee and Company Information Section - Card */}
        <View style={{ 
          marginTop: spacing(6), 
          marginBottom: spacing(8),
          backgroundColor: '#FFFFFF',
          borderRadius: hp(8),
          padding: spacing(10),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: hp(1) },
          shadowOpacity: 0.1,
          shadowRadius: spacing(2),
          elevation: 2
        }}>
          {/* Top Section: Company Logo (Left) and Company Info (Right) */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing(8) }}>
            {/* Company Logo on Left */}
            <View style={{ flex: 1 }}>
              <Image 
                source={require('../../assets/creative designers.png')} 
                style={{ width: wp(110), height: hp(30), resizeMode: 'contain' }} 
              />
            </View>

            {/* Company Info on Right */}
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ 
                fontSize: fontSize(10), 
                fontWeight: '500', 
                color: '#666666', 
                fontFamily: 'Poppins-Medium', 
                marginBottom: spacing(2) 
              }} allowFontScaling={false}>
                Creative Designers
              </Text>
              <Text style={{ 
                fontSize: fontSize(9), 
                color: '#666666', 
                fontFamily: 'Poppins', 
                marginBottom: spacing(1) 
              }} allowFontScaling={false}>
                Radhakishanpura, Sikar
              </Text>
              <Text style={{ 
                fontSize: fontSize(9), 
                color: '#666666', 
                fontFamily: 'Poppins' 
              }} allowFontScaling={false}>
                +919460638554
              </Text>
            </View>
          </View>

          {/* Middle Section: Profile Picture (Center) with Name/Role */}
          <View style={{ alignItems: 'center', marginBottom: spacing(8) }}>
            <Image 
              source={require('../../assets/Profile picture.png')} 
              style={{ 
                width: wp(60), 
                height: hp(60), 
                borderRadius: hp(30), 
                marginBottom: spacing(4), 
                resizeMode: 'cover' 
              }} 
            />
            <Text style={{ 
              fontSize: fontSize(13), 
              fontWeight: '700', 
              color: '#000000', 
              fontFamily: 'Poppins-Bold', 
              marginBottom: spacing(2), 
              textAlign: 'center' 
            }} allowFontScaling={false}>
              Kamal Jangid
            </Text>
            <Text style={{ 
              fontSize: fontSize(11), 
              color: '#666666', 
              fontFamily: 'Poppins', 
              textAlign: 'center' 
            }} allowFontScaling={false}>
              Carpenter
            </Text>
          </View>

          {/* Bottom Section: Joining Date (Left), Agreement (Center), Emp id (Right) */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            paddingTop: spacing(6), 
            borderTopWidth: wp(1), 
            borderTopColor: '#E0E0E0' 
          }}>
            {/* Joining Date on Left */}
            <Text style={{ 
              fontSize: fontSize(10), 
              color: '#666666', 
              fontFamily: 'Poppins' 
            }} allowFontScaling={false}>
              Joining 01/11/23
            </Text>

            {/* Agreement in Center */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ 
                fontSize: fontSize(12), 
                fontWeight: '700', 
                color: '#E53935', 
                fontFamily: 'Poppins-Bold' 
              }} allowFontScaling={false}>
                Agreement
              </Text>
            </View>

            {/* Emp id on Right */}
            <Text style={{ 
              fontSize: fontSize(10), 
              color: '#666666', 
              fontFamily: 'Poppins' 
            }} allowFontScaling={false}>
              Emp id - 001
            </Text>
          </View>
        </View>

        {/* Terms and Conditions Section */}
        <View style={{ flex: 1, marginBottom: spacing(8) }}>
          {agreementTerms.map((term, index) => (
            <View key={index} style={{ marginBottom: spacing(6) }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Text style={{ 
                  fontSize: fontSize(11), 
                  fontWeight: '500', 
                  color: '#000000', 
                  fontFamily: 'Poppins-Medium', 
                  marginRight: spacing(8), 
                  minWidth: wp(30), 
                  lineHeight: fontSize(16) 
                }} allowFontScaling={false}>
                  {term.number}.
                </Text>
                <Text style={{ 
                  fontSize: fontSize(11), 
                  fontWeight: '400', 
                  color: '#000000', 
                  fontFamily: 'Poppins', 
                  flex: 1, 
                  lineHeight: fontSize(16), 
                  letterSpacing: 0 
                }} allowFontScaling={false}>
                  {term.text}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Signature - Bottom Right */}
        <View style={{ alignItems: 'flex-end', marginBottom: spacing(8) }}>
          <Text style={{ 
            fontSize: fontSize(12), 
            color: '#000000', 
            fontFamily: 'Poppins',
            textDecorationLine: 'underline' 
          }} allowFontScaling={false}>
            Signature
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

