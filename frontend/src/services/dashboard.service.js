import api from './api';

export const getStudentDashboard = async () => {
  const response = await api.get('/dashboard/student');
  return response.data;
};

export const getTodaySchedule = async () => {
  const response = await api.get('/dashboard/student/schedule');
  return response.data;
};
