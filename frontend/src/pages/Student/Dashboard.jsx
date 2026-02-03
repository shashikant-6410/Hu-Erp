import { useAuth } from '../../hooks/useAuth';
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

  // 🔹 Dashboard stats
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: getStudentDashboard,
  });

  // 🔹 Today’s schedule
  const {
    data: scheduleData,
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useQuery({
    queryKey: ['student-schedule'],
    queryFn: getTodaySchedule,
  });

  if (isLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  if (isError) {
    return <div className="p-8 text-red-500">Failed to load dashboard</div>;
  }

  const stats = [
    {
      name: 'Attendance',
      value: `${data.attendance}%`,
      icon: Calendar,
      color: 'primary',
    },
    {
      name: 'CGPA',
      value: data.cgpa,
      icon: Award,
      color: 'success',
    },
    {
      name: 'Pending Fees',
      value: `₹${data.pendingFees}`,
      icon: DollarSign,
      color: 'warning',
    },
    {
      name: 'Courses',
      value: data.activeCourses,
      icon: BookOpen,
      color: 'secondary',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back,{' '}
              {profile?.firstName ||
                user?.email?.split('@')[0]}{' '}
              👋
            </h1>
            {profile?.enrollmentNumber && (
              <p className="text-sm text-gray-500">
                Enrollment: {profile.enrollmentNumber}
              </p>
            )}
          </div>

          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="card">
              <div className="card-body flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today’s Schedule */}
          <div className="lg:col-span-2 card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Today’s Schedule</h2>
            </div>

            <div className="card-body">
              {scheduleLoading ? (
                <p className="text-gray-500">Loading schedule...</p>
              ) : scheduleError ? (
                <p className="text-red-500">Failed to load schedule</p>
              ) : scheduleData.length === 0 ? (
                <p className="text-gray-500">No classes scheduled today</p>
              ) : (
                <div className="space-y-4">
                  {scheduleData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <BookOpen className="h-6 w-6 text-primary-600" />
                      </div>

                      <div className="ml-4 flex-1">
                        <p className="font-medium">{item.subject}</p>
                        <p className="text-sm text-gray-500">
                          {item.room} • {item.type}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.faculty}
                        </p>
                      </div>

                      <div className="text-sm font-medium text-primary-600">
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </div>
            <div className="card-body space-y-3">
              <button className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
                <Calendar className="h-5 w-5 text-primary-600" />
                View Attendance
              </button>
              <button className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
                <FileText className="h-5 w-5 text-success-600" />
                Check Results
              </button>
              <button className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-warning-600" />
                Pay Fees
              </button>
              <button className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg">
                <Users className="h-5 w-5 text-secondary-600" />
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
