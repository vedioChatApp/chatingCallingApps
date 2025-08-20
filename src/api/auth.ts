import axiosInstance from './axiosInstance';

// 🔐 Login API
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post('/user/login', { email, password });
  return response.data;
};

// 📝 Signup API
export const registerUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post('/user/signup', userData);
  return response.data;
};

// 📩 Send OTP
export const sendOtp = async (email: string) => {
  const response = await axiosInstance.post('/user/send-otp', { email });
  return response.data;
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const response = await axiosInstance.post('/user/verify-otp', { email, otp });
  return response.data;
};

export const resetPassword = async ({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) => {
  try {
    const response = await axiosInstance.post('/user/reset-passwotrd', {
      email,
      newPassword,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getGenderList = async () => {
  const response = await axiosInstance.get('/master/get-gender-list');
  return response.data;
};

export const getCountryList = async () => {
  const response = await axiosInstance.get('/master/countries');
  return response.data;
};

export const getStatesByCountry = async (countryId: number) => {
  const res = await axiosInstance.get(`/master/states?countryId=${countryId}`);
  return res.data;
};

export const getCitiesByState = async (stateId: number) => {
  try {
    const res = await axiosInstance.get(`/master/cities?stateId=${stateId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getInterestList = () => axiosInstance.get('/master/interests');

export const getMasterData = async (path: string) => {
  try {
    const res = await axiosInstance.get(path);
    return res.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
