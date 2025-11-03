import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Logo from '@/components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = {
  code: string;
  label: string;
  flag: string;
};

const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: '🇦🇪' }, // UAE flag for English
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' }, // India flag for Hindi
  // { code: 'ar', label: 'Arabic', flag: '🇦🇪' },
  // { code: 'fr', label: 'French', flag: '🇫🇷' },
  // { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  // { code: 'de', label: 'German', flag: '🇩🇪' },
  // { code: 'it', label: 'Italian', flag: '🇮🇹' },
  // { code: 'pt', label: 'Portuguese', flag: '🇵🇹' },
  // { code: 'ru', label: 'Russian', flag: '🇷🇺' },
  // { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
  // { code: 'ko', label: 'Korean', flag: '🇰🇷' },
  // { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
];

const STORAGE_KEY = 'language';

type RootStackParamList = {
  Language: undefined;
  SignIn: undefined;
  OTPVerification: { identifier: string };
  Register: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Language'>;

export default function LanguageScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string>('en'); // Default to English as shown in image
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setSelected(saved);
      setLoaded(true);
    })();
  }, []);

  const filtered = LANGUAGES.filter(l => l.label.toLowerCase().includes(query.toLowerCase()));

  const onContinue = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, selected);
    navigation.replace('SignIn');
  };

  if (!loaded) return null;

  // Render all top content as a function for FlatList ListHeaderComponent
  const renderHeader = () => (
    <>
      <View style={{alignItems: 'center', marginTop: 44, marginBottom: 18}}>
        <Image
          source={require('../../assets/caarobar (2) 1.png')}
          style={{
            width: 130.81,
            height: 62,
            resizeMode: 'contain',
            opacity: 1,
          }}
        />
        <Text style={{
          width: 285,
          fontFamily: 'Inter',
          fontWeight: '400',
          fontSize: 13,
          textAlign: 'center',
          lineHeight: 19.5,
          opacity: 1,
          color: '#12110D',
          marginTop: 8,
        }}>
          Get Control of your staff management with us.
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Choose the language</Text>
        <Text style={styles.headerSubtitle}>Select your preferred language below This helps us serve you better.</Text>
      </View>
      <Text style={styles.selectedTitle}>You Selected</Text>
      <View style={styles.selectedContainer}>
        <Text style={styles.flag}>{LANGUAGES.find(l => l.code === selected)?.flag}</Text>
        <Text style={styles.selectedLabel}>{LANGUAGES.find(l => l.code === selected)?.label}</Text>
        <View style={styles.selectedCheckCircle}>
          <Text style={styles.selectedCheck}>✓</Text>
        </View>
      </View>
      <Text style={styles.allLanguagesTitle}>All Languages</Text>
      <View style={styles.languageListSearchWrapper}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#ACACAB"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>
      </View>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={true} />
      <FlatList
        data={filtered}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item.code)}
            style={[
              styles.listItem,
              selected === item.code && styles.listItemActive,
            ]}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.langLabel}>{item.label}</Text>
            <View
              style={[
                styles.langCheckCircleBase,
                selected === item.code ? styles.langCheckCircleActive : styles.langCheckCircleInactive,
              ]}
            >
              {selected === item.code && (
                <Text style={styles.listCheck}>✓</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.code}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.flatListContainer}
      />
      {/* Continue Button docked at bottom */}
      <View style={styles.continueContainer}>
        <TouchableOpacity
          onPress={onContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingTop: 32,
    paddingHorizontal: 22,
    paddingBottom: 100,
    alignItems: 'stretch',
  },
  languageListSearchWrapper: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(227,226,226,1)',
    borderBottomWidth: 0,
    overflow: 'hidden',
    marginBottom: 0,
  },
  logo: {
    width: 130.8,
    height: 62,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  tagline: {
    alignSelf: 'center',
    width: 285,
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#12110D',
    opacity: 1,
    textAlign: 'center',
    marginBottom: 18,
  },
  headerContainer: {
    marginBottom: 14,
    alignSelf: 'stretch',
    marginTop: 4,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold', // If available, else fallback
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 22,
    color: '#12110D',
    textAlign: 'left',
    marginBottom: 12,
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    color: '#12110D',
    textAlign: 'left',
  },
  selectedTitle: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 18,
    color: '#12110D',
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(52,122,255,1)',
    borderRadius: 50,
    height: 55,
    paddingLeft: 16,
    paddingRight: 20,
    shadowColor: '#12110D',
    shadowOpacity: 0.08,
    shadowRadius: 17,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
    marginBottom: 20,
  },
  flag: {
    fontSize: 28,
    marginRight: 16,
  },
  selectedLabel: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    color: '#12110D',
    flex: 1,
  },
  selectedCheckCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(52,122,255,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheck: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  allLanguagesTitle: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 18,
    color: '#12110D',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  languageListContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(227,226,226,1)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 18,
  },
  searchContainer: {
    width: '100%',
    height: 55,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(227,226,226,1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#fff',
  },
  searchIcon: {
    fontSize: 20,
    color: '#C4C4C4',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'rgba(18,17,13,1)',
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    height: 55,
    borderBottomWidth: 1,
    borderColor: 'rgba(227,226,226,1)',
    backgroundColor: '#fff',
  },
  listItemActive: {
    backgroundColor: 'rgba(52,122,255,0.07)',
  },
  langLabel: {
    fontSize: 16,
    color: '#12110D',
    fontFamily: 'Poppins',
    fontWeight: '500',
    flex: 1,
  },
  langCheckCircleBase: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  langCheckCircleActive: {
    backgroundColor: 'rgba(52,122,255,1)',
    borderColor: 'rgba(52,122,255,1)',
  },
  langCheckCircleInactive: {
    borderColor: 'rgba(227,226,226,1)',
    backgroundColor: '#fff',
  },
  listCheck: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  continueContainer: {
    position: 'absolute',
    left: 21,
    right: 21,
    bottom: 32,
    width: undefined,
    height: 55,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  continueButton: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52,122,255,1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  // homeIndicator: {
  //   position: 'absolute',
  //   width: 375,
  //   height: 34,
  //   left: 32,
  //   top: 946,
  //   backgroundColor: 'rgba(0,0,0,0.07)',
  //   borderRadius: 16,
  // },
});


