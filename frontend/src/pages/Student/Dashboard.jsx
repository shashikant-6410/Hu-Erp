import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  getStudentDashboard,
  getTodaySchedule,
} from '../../services/dashboard.service';

import {
  BookOpen,
  Calendar,
  DollarSign,
  Award,
  Users,
  FileText,
  Bell,
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: getStudentDashboard,
  });

  const {
    data: scheduleData = [],
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useQuery({
    queryKey: ['student-schedule'],
    queryFn: getTodaySchedule,
  });

  if (isLoading) return <div className="p-8">Loading dashboard...</div>;
  if (isError) return <div className="p-8 text-red-500">Failed to load dashboard</div>;

  const stats = [
    { name: 'Attendance', value: `${data.attendance}%`, icon: Calendar },
    { name: 'CGPA', value: data.cgpa, icon: Award },
    { name: 'Pending Fees', value: `₹${data.pendingFees}`, icon: DollarSign },
    { name: 'Courses', value: data.activeCourses, icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {profile?.firstName || user?.email?.split('@')[0]} 👋
            </h1>
            {profile?.enrollmentNumber && (
              <p className="text-sm text-gray-500">
                Enrollment: {profile.enrollmentNumber}
              </p>
            )}
          </div>

          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today Schedule */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-4 border-b font-semibold">Today’s Schedule</div>
            <div className="p-4 space-y-4">
              {scheduleLoading && <p>Loading schedule...</p>}
              {scheduleError && <p className="text-red-500">Failed to load schedule</p>}
              {!scheduleLoading && scheduleData.length === 0 && (
                <p>No classes scheduled today</p>
              )}

              {scheduleData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.subject}</p>
                    <p className="text-sm text-gray-500">
                      {item.room} • {item.type}
                    </p>
                    <p className="text-xs text-gray-400">{item.faculty}</p>
                  </div>

                  <div className="text-sm font-medium text-blue-600">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">Quick Actions</h2>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/student/attendance')}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg"
              >
                <Calendar className="h-5 w-5 text-blue-600" />
                View Attendance
              </button>

              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
                Check Results
              </button>

              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                Pay Fees
              </button>

              <button
                onClick={() => navigate('/student/courses')}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg"
              >
                <Users className="h-5 w-5 text-purple-600" />
                My Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;