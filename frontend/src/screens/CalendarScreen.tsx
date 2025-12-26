import React, { useMemo, useState } from 'react';
import { Image, Modal, ScrollView, Switch, Text, TouchableOpacity, View, StatusBar } from 'react-native';
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
};

type Props = NativeStackScreenProps<RootStackParamList, 'Calendar'>;

type Holiday = {
  date: string; // dd/mm/yyyy
  day: number; // day of month (for current grid month)
  title: string;
  description: string;
  color: string;
  start: string;
  end: string;
};

export default function CalendarScreen({ navigation }: Props) {
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [reminds, setReminds] = useState<boolean>(false);
  const insets = useSafeArea();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // Grid for September 2021 (Mon-first). 6 rows x 7 cols.
  const grid = [
    [31, 30, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 1, 2, 3],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  const isOutOfMonth = (rowIdx: number, colIdx: number) => {
    // Row 0: 31,30 are Aug; Row 4: 1,2,3 are Oct; zeros are empty
    if (rowIdx === 0 && (colIdx === 0 || colIdx === 1)) return true;
    if (rowIdx === 4 && (colIdx >= 4)) return true;
    if (grid[rowIdx][colIdx] === 0) return true;
    return false;
  };

  const holidays: Holiday[] = [
    { date: '02/09/2021', day: 2, title: 'Mahaveer Jyanti', description: 'Only 1 Day', color: '#22C55E', start: '12:00 AM', end: '11:59 PM' },
    { date: '06/09/2021', day: 6, title: 'Ramnavmi Rali', description: 'Only 2 Days', color: '#7C3AED', start: '12:00 AM', end: '11:59 PM' },
    { date: '15/09/2021', day: 15, title: 'Heavy Rain', description: 'There is a holiday in the office today due to heavy rain', color: '#1D4ED8', start: '12:00 AM', end: '11:59 PM' },
  ];

  const dotDays: Record<number, string> = useMemo(() => {
    const rec: Record<number, string> = {};
    holidays.forEach(h => { rec[h.day] = h.color; });
    return rec;
  }, []);

  const holidayByDay: Record<number, Holiday> = useMemo(() => {
    const map: Record<number, Holiday> = {};
    holidays.forEach(h => { map[h.day] = h; });
    return map;
  }, []);

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
            Calender
          </Text>
        </View>

        {/* Right: Refresh Icon */}
        <TouchableOpacity style={{ padding: spacing(4) }}>
          <View style={{
            width: wp(32),
            height: hp(32),
            borderRadius: hp(16),
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{ fontSize: fontSize(18), color: '#FFFFFF' }} allowFontScaling={false}>↻</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: hp(48) + insets.bottom }}>
        {/* Month switcher */}
        <View style={{ paddingHorizontal: spacing(16), paddingTop: spacing(12) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ 
              width: wp(32), 
              height: hp(32), 
              borderRadius: hp(16), 
              borderWidth: wp(1), 
              borderColor: '#E6E6E6', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>←</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ 
                fontSize: fontSize(18), 
                fontWeight: '700', 
                color: '#000000',
                fontFamily: 'Poppins-Bold'
              }} allowFontScaling={false}>
                September
              </Text>
              <Text style={{ 
                fontSize: fontSize(12), 
                color: '#666666', 
                marginTop: spacing(2),
                fontFamily: 'Poppins'
              }} allowFontScaling={false}>
                2021
              </Text>
            </View>
            <TouchableOpacity style={{ 
              width: wp(32), 
              height: hp(32), 
              borderRadius: hp(16), 
              borderWidth: wp(1), 
              borderColor: '#E6E6E6', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Text style={{ fontSize: fontSize(18), color: '#000000' }} allowFontScaling={false}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Week days */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing(20), marginTop: spacing(16) }}>
          {weekDays.map((d) => (
            <Text 
              key={d} 
              style={{ 
                width: wp(36), 
                textAlign: 'center', 
                fontSize: fontSize(11), 
                color: '#888888',
                fontFamily: 'Poppins'
              }} 
              allowFontScaling={false}
            >
              {d}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={{ paddingHorizontal: spacing(16), marginTop: spacing(8) }}>
          {grid.map((row, rowIdx) => (
            <View key={rowIdx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing(8) }}>
              {row.map((day, colIdx) => {
                const out = isOutOfMonth(rowIdx, colIdx);
                const isSelected = day === 2 && !out;
                const dotColor = dotDays[day];
                return (
                  <TouchableOpacity 
                    onPress={() => { if (!out && holidayByDay[day]) { setSelectedHoliday(holidayByDay[day]); setReminds(false); } }} 
                    activeOpacity={0.7} 
                    key={`${rowIdx}-${colIdx}`} 
                    style={{ width: wp(36), height: hp(44), alignItems: 'center', justifyContent: 'flex-start', paddingTop: spacing(2) }}
                  >
                    <View style={{ 
                      width: wp(32), 
                      height: hp(32), 
                      borderRadius: hp(16), 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      backgroundColor: isSelected ? '#248CFF' : 'transparent' 
                    }}>
                      <Text style={{ 
                        fontSize: fontSize(13), 
                        color: out ? '#C0C0C0' : (isSelected ? '#FFFFFF' : '#111111'),
                        fontWeight: isSelected ? '600' : '400',
                        fontFamily: isSelected ? 'Poppins-SemiBold' : 'Poppins'
                      }} allowFontScaling={false}>
                        {day !== 0 ? day : ''}
                      </Text>
                    </View>
                    {/* Colored line below date */}
                    {isSelected ? (
                      <View style={{ 
                        width: wp(20), 
                        height: hp(2), 
                        backgroundColor: '#22C55E', 
                        borderRadius: hp(1), 
                        marginTop: spacing(2) 
                      }} />
                    ) : dotColor ? (
                      <View style={{ 
                        width: wp(20), 
                        height: hp(2), 
                        backgroundColor: dotColor, 
                        borderRadius: hp(1), 
                        marginTop: spacing(2) 
                      }} />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Divider */}
        <View style={{ height: hp(1), backgroundColor: '#EDEDED', marginVertical: spacing(12), marginHorizontal: spacing(16) }} />

        {/* Events list */}
        <View style={{ paddingHorizontal: spacing(16) }}>
          {holidays.map((e, idx) => (
            <TouchableOpacity 
              key={idx} 
              onPress={() => { setSelectedHoliday(e); setReminds(false); }} 
              style={{ 
                paddingVertical: spacing(14), 
                borderBottomWidth: idx < holidays.length - 1 ? wp(1) : 0, 
                borderBottomColor: '#EDEDED' 
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing(6) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ 
                    width: wp(10), 
                    height: hp(10), 
                    borderRadius: hp(5), 
                    backgroundColor: e.color, 
                    marginRight: spacing(8) 
                  }} />
                  <Text style={{ fontSize: fontSize(11), color: '#888', fontFamily: 'Poppins' }} allowFontScaling={false}>
                    {e.date}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={{ fontSize: fontSize(18), color: '#999' }} allowFontScaling={false}>⋮</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ 
                fontSize: fontSize(14), 
                color: '#111', 
                fontWeight: '700', 
                fontFamily: 'Poppins-Bold',
                marginBottom: spacing(4) 
              }} allowFontScaling={false}>
                {e.title}
              </Text>
              <Text style={{ 
                fontSize: fontSize(12), 
                color: '#888', 
                fontFamily: 'Poppins',
                lineHeight: fontSize(16) 
              }} allowFontScaling={false}>
                {e.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Holiday details modal */}
        <Modal visible={!!selectedHoliday} transparent animationType="slide" onRequestClose={() => setSelectedHoliday(null)}>
          <TouchableOpacity 
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
            activeOpacity={1}
            onPress={() => setSelectedHoliday(null)}
          >
            <TouchableOpacity 
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={{ 
                width: '100%', 
                backgroundColor: '#FFFFFF', 
                borderTopLeftRadius: hp(20), 
                borderTopRightRadius: hp(20),
                paddingTop: spacing(16),
                paddingBottom: insets.bottom + spacing(16),
                paddingHorizontal: spacing(16),
                maxHeight: '90%'
              }}
            >
              {/* Draggable Handle Indicator */}
              <View style={{ 
                width: wp(40), 
                height: hp(4), 
                backgroundColor: '#E0E0E0', 
                borderRadius: hp(2), 
                alignSelf: 'center',
                marginBottom: spacing(16)
              }} />

              <Text style={{ 
                textAlign: 'center', 
                fontSize: fontSize(16), 
                fontWeight: '700', 
                color: '#111', 
                fontFamily: 'Poppins-Bold',
                marginBottom: spacing(12) 
              }} allowFontScaling={false}>
                Holiday Details
              </Text>

              {/* Name */}
              <View style={{ marginBottom: spacing(10) }}>
                <Text style={{ 
                  fontSize: fontSize(11), 
                  color: '#4F46E5', 
                  marginBottom: spacing(6),
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600'
                }} allowFontScaling={false}>
                  Holiday Name
                </Text>
                <View style={{ 
                  borderWidth: wp(1), 
                  borderColor: '#E6E6E6', 
                  borderRadius: hp(8), 
                  paddingHorizontal: spacing(12), 
                  height: hp(40), 
                  justifyContent: 'center' 
                }}>
                  <Text style={{ 
                    fontSize: fontSize(13), 
                    color: '#111',
                    fontFamily: 'Poppins'
                  }} allowFontScaling={false}>
                    {selectedHoliday?.title || ''}
                  </Text>
                </View>
              </View>

              {/* Description */}
              <View style={{ marginBottom: spacing(10) }}>
                <Text style={{ 
                  fontSize: fontSize(11), 
                  color: '#4F46E5', 
                  marginBottom: spacing(6),
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600'
                }} allowFontScaling={false}>
                  Description
                </Text>
                <View style={{ 
                  borderWidth: wp(1), 
                  borderColor: '#E6E6E6', 
                  borderRadius: hp(8), 
                  paddingHorizontal: spacing(12), 
                  paddingVertical: spacing(10) 
                }}>
                  <Text style={{ 
                    fontSize: fontSize(13), 
                    color: '#111',
                    fontFamily: 'Poppins'
                  }} allowFontScaling={false}>
                    {selectedHoliday?.description || ''}
                  </Text>
                </View>
              </View>

              {/* Date */}
              <View style={{ marginBottom: spacing(10) }}>
                <Text style={{ 
                  fontSize: fontSize(11), 
                  color: '#4F46E5', 
                  marginBottom: spacing(6),
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600'
                }} allowFontScaling={false}>
                  Date
                </Text>
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  borderWidth: wp(1), 
                  borderColor: '#E6E6E6', 
                  borderRadius: hp(8), 
                  paddingHorizontal: spacing(12), 
                  height: hp(40), 
                  justifyContent: 'space-between' 
                }}>
                  <Text style={{ 
                    fontSize: fontSize(13), 
                    color: '#111',
                    fontFamily: 'Poppins'
                  }} allowFontScaling={false}>
                    {selectedHoliday?.date || ''}
                  </Text>
                  <Image 
                    source={require('../../assets/calender.png')} 
                    style={{ width: wp(16), height: hp(16), resizeMode: 'contain' }} 
                  />
                </View>
              </View>

              {/* Start / End */}
              <View style={{ flexDirection: 'row', marginBottom: spacing(10) }}>
                <View style={{ flex: 1, marginRight: spacing(10) }}>
                  <Text style={{ 
                    fontSize: fontSize(11), 
                    color: '#4F46E5', 
                    marginBottom: spacing(6),
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }} allowFontScaling={false}>
                    Start
                  </Text>
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    borderWidth: wp(1), 
                    borderColor: '#E6E6E6', 
                    borderRadius: hp(8), 
                    paddingHorizontal: spacing(12), 
                    height: hp(40), 
                    justifyContent: 'space-between' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(13), 
                      color: '#111',
                      fontFamily: 'Poppins'
                    }} allowFontScaling={false}>
                      {selectedHoliday?.start || ''}
                    </Text>
                    <Text style={{ fontSize: fontSize(14) }} allowFontScaling={false}>🕘</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: fontSize(11), 
                    color: '#4F46E5', 
                    marginBottom: spacing(6),
                    fontFamily: 'Poppins-SemiBold',
                    fontWeight: '600'
                  }} allowFontScaling={false}>
                    End
                  </Text>
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    borderWidth: wp(1), 
                    borderColor: '#E6E6E6', 
                    borderRadius: hp(8), 
                    paddingHorizontal: spacing(12), 
                    height: hp(40), 
                    justifyContent: 'space-between' 
                  }}>
                    <Text style={{ 
                      fontSize: fontSize(13), 
                      color: '#111',
                      fontFamily: 'Poppins'
                    }} allowFontScaling={false}>
                      {selectedHoliday?.end || ''}
                    </Text>
                    <Text style={{ fontSize: fontSize(14) }} allowFontScaling={false}>🕘</Text>
                  </View>
                </View>
              </View>

              {/* Reminds me */}
              <View style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: spacing(14) 
              }}>
                <Text style={{ 
                  fontSize: fontSize(12), 
                  color: '#666666',
                  fontFamily: 'Poppins'
                }} allowFontScaling={false}>
                  Reminds me
                </Text>
                <Switch value={reminds} onValueChange={setReminds} />
              </View>

              {/* Close */}
              <TouchableOpacity 
                onPress={() => setSelectedHoliday(null)} 
                style={{ 
                  height: hp(48), 
                  borderRadius: hp(24), 
                  backgroundColor: '#3B82F6', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <Text style={{ 
                  color: '#FFFFFF', 
                  fontSize: fontSize(16), 
                  fontWeight: '600',
                  fontFamily: 'Poppins-SemiBold'
                }} allowFontScaling={false}>
                  Close
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}


