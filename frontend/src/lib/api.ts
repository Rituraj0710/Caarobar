import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Use different base URLs for different platforms
const getBaseURL = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000'; // Android emulator
  } else if (Platform.OS === 'ios') {
    return 'http://localhost:5000'; // iOS simulator
  }
  return 'http://localhost:5000'; // Default fallback
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // 10 second timeout
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@jwt');
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


