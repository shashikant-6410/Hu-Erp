import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStudentDashboard } from '../../services/dashboard.service';
import {
    BookOpen,
    Calendar,
    DollarSign,
    Award,
    TrendingUp,
    Users,
    FileText,
    Bell,
    ChevronRight,
    Clock,
    MapPin,
    User,
    Star,
    Activity
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
    change: '+2.5% from last month',
    trend: 'up',
    icon: Calendar,
    color: 'blue',
    bgGradient: 'from-blue-500 to-blue-600',
    progress: data.attendance,
  },
  {
    name: 'CGPA',
    value: data.cgpa,
    change: '+0.2 from last semester',
    trend: 'up',
    icon: Award,
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-emerald-600',
    progress: (parseFloat(data.cgpa) / 10) * 100,
  },
  {
    name: 'Pending Fees',
    value: `₹${data.pendingFees}`,
    change: 'Due in 15 days',
    trend: 'neutral',
    icon: DollarSign,
    color: 'amber',
    bgGradient: 'from-amber-500 to-amber-600',
    progress: data.pendingFees > 0 ? 75 : 0,
  },
  {
    name: 'Active Courses',
    value: data.activeCourses,
    change: 'This semester',
    trend: 'neutral',
    icon: BookOpen,
    color: 'purple',
    bgGradient: 'from-purple-500 to-purple-600',
    progress: (data.activeCourses / 8) * 100,
  },
];


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
            {/* Enhanced Header with Gradient */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                    <User className="h-8 w-8 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                                    <div className="h-2 w-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">
                                    Welcome back,{' '}
                                    {profile?.firstName ||
                                        user?.email
                                            ?.split("@")[0]
                                            .split(".")[0]
                                            .replace(/^(.{4})(.*)$/, (_, first, last) =>
                                                first.charAt(0).toUpperCase() +
                                                first.slice(1) +
                                                " " +
                                                last.charAt(0).toUpperCase() +
                                                last.slice(1)
                                            )}! 👋
                                </h1>
                                <p className="text-blue-100 flex items-center space-x-2">
                                    <span>{profile?.enrollmentNumber && `Enrollment: ${profile.enrollmentNumber}`}</span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-400/20 text-green-100 border border-green-400/30">
                                        <Activity className="h-3 w-3 mr-1" />
                                        Active
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="relative p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 group">
                                <Bell className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
                                    3
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-4 relative z-10">
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {stats.map((stat, index) => (
                        <div 
                            key={stat.name} 
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                            <div className="p-6 relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.bgGradient} shadow-lg`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                    {stat.trend === 'up' && (
                                        <div className="flex items-center text-green-500">
                                            <TrendingUp className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        {stat.name}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                        {stat.change}
                                    </p>
                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full bg-gradient-to-r ${stat.bgGradient} transition-all duration-1000 ease-out`}
                                            style={{ width: `${Math.min(stat.progress, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Enhanced Today's Schedule */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                            <h2 className="text-xl font-bold text-white flex items-center">
                                <Calendar className="h-6 w-6 mr-2" />
                                Today's Schedule
                            </h2>
                            <p className="text-blue-100 text-sm mt-1">Wednesday, February 4, 2026</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {[
                                    { 
                                        time: '09:00 AM', 
                                        subject: 'Data Structures & Algorithms', 
                                        room: 'Computer Lab 101', 
                                        type: 'Practical',
                                        professor: 'Dr. Sharma',
                                        status: 'upcoming',
                                        color: 'blue'
                                    },
                                    { 
                                        time: '11:00 AM', 
                                        subject: 'Database Management Systems', 
                                        room: 'Lecture Hall 203', 
                                        type: 'Theory',
                                        professor: 'Prof. Kumar',
                                        status: 'live',
                                        color: 'green'
                                    },
                                    { 
                                        time: '02:00 PM', 
                                        subject: 'Web Development Project', 
                                        room: 'Computer Lab 102', 
                                        type: 'Practical',
                                        professor: 'Ms. Patel',
                                        status: 'upcoming',
                                        color: 'purple'
                                    },
                                ].map((class_, index) => (
                                    <div key={index} className="group relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600">
                                        {class_.status === 'live' && (
                                            <div className="absolute -top-2 -right-2 flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                                                <div className="h-2 w-2 bg-white rounded-full"></div>
                                                <span>LIVE</span>
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-4">
                                            <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-r from-${class_.color}-500 to-${class_.color}-600 flex items-center justify-center shadow-lg`}>
                                                <BookOpen className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                                    {class_.subject}
                                                </p>
                                                <div className="flex items-center space-x-4 mt-1">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                                        <MapPin className="h-3 w-3 mr-1" />
                                                        {class_.room}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                                        <User className="h-3 w-3 mr-1" />
                                                        {class_.professor}
                                                    </p>
                                                </div>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                                                    class_.type === 'Practical' 
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                                                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                }`}>
                                                    {class_.type}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                                                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                                    {class_.time}
                                                </div>
                                                {class_.status === 'upcoming' && (
                                                    <span className="text-xs text-gray-500 mt-1">in 2 hours</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Quick Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                            <h2 className="text-xl font-bold text-white flex items-center">
                                <Star className="h-6 w-6 mr-2" />
                                Quick Actions
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                {[
                                    { 
                                        icon: Calendar, 
                                        label: 'View Attendance', 
                                        description: 'Check your attendance record',
                                        color: 'blue',
                                        gradient: 'from-blue-500 to-blue-600',
                                        path: '/student/attendance' 
                                    },
                                    { 
                                        icon: FileText, 
                                        label: 'Exam Results', 
                                        description: 'View your latest results',
                                        color: 'green',
                                        gradient: 'from-green-500 to-green-600'
                                    },
                                    { 
                                        icon: DollarSign, 
                                        label: 'Pay Fees', 
                                        description: 'Make fee payments online',
                                        color: 'amber',
                                        gradient: 'from-amber-500 to-amber-600'
                                    },
                                    { 
                                        icon: Users, 
                                        label: 'My Courses', 
                                        description: 'Manage your courses',
                                        color: 'purple',
                                        gradient: 'from-purple-500 to-purple-600'
                                    },
                                ].map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={() => action.path && navigate(action.path)}
                                        className="group w-full flex items-center p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                                    >
                                        <div className={`p-3 rounded-lg bg-gradient-to-r ${action.gradient} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                                            <action.icon className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="ml-4 flex-1 text-left">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200">
                                                {action.label}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {action.description}
                                            </p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Performance Overview */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <TrendingUp className="h-6 w-6 mr-2" />
                            Performance Overview
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {[
                                { label: 'Overall Performance', value: '92%', color: 'green', progress: 92 },
                                { label: 'Assignment Completion', value: '95%', color: 'blue', progress: 95 },
                                { label: 'Class Participation', value: '88%', color: 'purple', progress: 88 },
                            ].map((metric, index) => (
                                <div key={index} className="text-center">
                                    <div className="relative inline-flex items-center justify-center">
                                        <svg className="w-20 h-20 transform -rotate-90">
                                            <circle
                                                cx="40"
                                                cy="40"
                                                r="30"
                                                stroke="currentColor"
                                                strokeWidth="6"
                                                fill="transparent"
                                                className="text-gray-200 dark:text-gray-700"
                                            />
                                            <circle
                                                cx="40"
                                                cy="40"
                                                r="30"
                                                stroke="currentColor"
                                                strokeWidth="6"
                                                fill="transparent"
                                                strokeDasharray={`${2 * Math.PI * 30}`}
                                                strokeDashoffset={`${2 * Math.PI * 30 * (1 - metric.progress / 100)}`}
                                                className={`text-${metric.color}-500 transition-all duration-1000 ease-out`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="absolute text-lg font-bold text-gray-900 dark:text-white">
                                            {metric.value}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {metric.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced Recent Exam Results */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <Award className="h-6 w-6 mr-2" />
                            Recent Exam Results
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Subject</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Exam Type</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Score</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Grade</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Progress</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {[
                                        { subject: 'Data Structures', type: 'Mid-Term', marks: '42/50', percentage: 84, grade: 'A', status: 'EXCELLENT' },
                                        { subject: 'Database Management', type: 'Internal Assessment', marks: '18/20', percentage: 90, grade: 'A+', status: 'OUTSTANDING' },
                                        { subject: 'Web Development', type: 'Project Submission', marks: '48/50', percentage: 96, grade: 'O', status: 'OUTSTANDING' },
                                        { subject: 'Computer Networks', type: 'Quiz', marks: '15/20', percentage: 75, grade: 'B+', status: 'GOOD' },
                                    ].map((result, index) => (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                            <td className="py-4 px-4">
                                                <div className="font-medium text-gray-900 dark:text-white">{result.subject}</div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{result.type}</td>
                                            <td className="py-4 px-4">
                                                <div className="font-semibold text-gray-900 dark:text-white">{result.marks}</div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                    result.grade === 'O' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                                    result.grade === 'A+' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                                    result.grade === 'A' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                }`}>
                                                    {result.grade}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                                                                result.percentage >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                                                result.percentage >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                                                result.percentage >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                                                'bg-gradient-to-r from-red-400 to-red-600'
                                                            }`}
                                                            style={{ width: `${result.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[3rem]">
                                                        {result.percentage}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                    result.status === 'OUTSTANDING' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                                    result.status === 'EXCELLENT' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                                    result.status === 'GOOD' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                }`}>
                                                    {result.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
