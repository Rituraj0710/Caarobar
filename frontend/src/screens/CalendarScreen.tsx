import React, { useMemo, useState } from 'react';
import { Image, Modal, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
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
    { date: '02/09/2021', day: 2, title: 'Mahaveer Jyanti', description: 'There is a holiday regarding mahaveer jyanti.', color: '#22C55E', start: '12:00 AM', end: '11:59 PM' },
    { date: '06/09/2021', day: 6, title: 'Ramnavmi Rali', description: 'There is a holiday regarding ramnavmi rali.', color: '#7C3AED', start: '12:00 AM', end: '11:59 PM' },
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
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <View style={{ height: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 6 }}>
            <BackButton />
          </View>
          <Image source={require('../../assets/header carobar.png')} style={{ width: 96, height: 22, resizeMode: 'contain' }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ position: 'relative', marginLeft: 6 }}>
            <TouchableOpacity style={{ padding: 8 }}>
              <Text style={{ fontSize: 18, color: '#111' }}>🔔</Text>
            </TouchableOpacity>
            <View style={{ position: 'absolute', right: 10, top: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' }} />
          </View>
          <TouchableOpacity style={{ padding: 8, marginLeft: 2 }}>
            <Text style={{ fontSize: 18, color: '#111' }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 8, marginLeft: 2 }}>
            <Text style={{ fontSize: 18, color: '#111' }}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 48 }}>
        {/* Month switcher */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18 }}>‹</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#111' }}>September</Text>
              <Text style={{ fontSize: 11, color: '#666', marginTop: 2 }}>2021</Text>
            </View>
            <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: '#E6E6E6', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18 }}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Week days */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 16 }}>
          {weekDays.map((d) => (
            <Text key={d} style={{ width: 36, textAlign: 'center', fontSize: 11, color: '#888' }}>{d}</Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          {grid.map((row, rowIdx) => (
            <View key={rowIdx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              {row.map((day, colIdx) => {
                const out = isOutOfMonth(rowIdx, colIdx);
                const isSelected = day === 2 && !out;
                const dotColor = dotDays[day];
                return (
                  <TouchableOpacity onPress={() => { if (!out && holidayByDay[day]) { setSelectedHoliday(holidayByDay[day]); setReminds(false); } }} activeOpacity={0.7} key={`${rowIdx}-${colIdx}`} style={{ width: 36, height: 36, alignItems: 'center' }}>
                    <View style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: isSelected ? '#E8EAF6' : 'transparent' }}>
                      <Text style={{ fontSize: 13, color: out ? '#C0C0C0' : '#111' }}>{day !== 0 ? day : ''}</Text>
                    </View>
                    {isSelected && <View style={{ width: 18, height: 3, backgroundColor: '#22C55E', borderRadius: 2, marginTop: 2 }} />}
                    {!isSelected && dotColor && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dotColor, marginTop: 2 }} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Divider */}
        <View style={{ height: 1, backgroundColor: '#EDEDED', marginVertical: 12, marginHorizontal: 16 }} />

        {/* Events list */}
        <View style={{ paddingHorizontal: 16 }}>
          {holidays.map((e, idx) => (
            <TouchableOpacity key={idx} onPress={() => { setSelectedHoliday(e); setReminds(false); }} style={{ paddingVertical: 14, borderBottomWidth: idx < holidays.length - 1 ? 1 : 0, borderBottomColor: '#EDEDED' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: e.color, marginRight: 8 }} />
                  <Text style={{ fontSize: 11, color: '#888' }}>{e.date}</Text>
                </View>
                <Text style={{ fontSize: 14, color: '#999' }}>⋯</Text>
              </View>
              <Text style={{ fontSize: 14, color: '#111', fontWeight: '600', marginBottom: 4 }}>{e.title}</Text>
              <Text style={{ fontSize: 12, color: '#888', lineHeight: 16 }}>{e.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Holiday details modal */}
        <Modal visible={!!selectedHoliday} transparent animationType="fade" onRequestClose={() => setSelectedHoliday(null)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <View style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 16 }}>
              <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 12 }}>Holiday Details</Text>

              {/* Name */}
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 11, color: '#4F46E5', marginBottom: 6 }}>Holiday Name</Text>
                <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 8, paddingHorizontal: 12, height: 40, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 13, color: '#111' }}>{selectedHoliday?.title || ''}</Text>
                </View>
              </View>

              {/* Description */}
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 11, color: '#4F46E5', marginBottom: 6 }}>Description</Text>
                <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 }}>
                  <Text style={{ fontSize: 13, color: '#111' }}>{selectedHoliday?.description || ''}</Text>
                </View>
              </View>

              {/* Date */}
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 11, color: '#4F46E5', marginBottom: 6 }}>Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 8, paddingHorizontal: 12, height: 40, justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 13, color: '#111' }}>{selectedHoliday?.date || ''}</Text>
                  <Image source={require('../../assets/calender.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
                </View>
              </View>

              {/* Start / End */}
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, color: '#4F46E5', marginBottom: 6 }}>Start</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 8, paddingHorizontal: 12, height: 40, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 13, color: '#111' }}>{selectedHoliday?.start || ''}</Text>
                    <Text style={{ fontSize: 14 }}>🕘</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, color: '#4F46E5', marginBottom: 6 }}>End</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 8, paddingHorizontal: 12, height: 40, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 13, color: '#111' }}>{selectedHoliday?.end || ''}</Text>
                    <Text style={{ fontSize: 14 }}>🕘</Text>
                  </View>
                </View>
              </View>

              {/* Reminds me */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <Text style={{ fontSize: 12, color: '#666' }}>Reminds me</Text>
                <Switch value={reminds} onValueChange={setReminds} />
              </View>

              {/* Close */}
              <TouchableOpacity onPress={() => setSelectedHoliday(null)} style={{ height: 48, borderRadius: 24, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}


