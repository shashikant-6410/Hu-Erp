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
    Clock,
    MapPin,
    Star,
    Target,
    ChevronRight,
    Activity,
    BarChart3
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
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <p className="text-red-600 dark:text-red-400">Failed to load dashboard</p>
                </div>
            </div>
        );
    }

    const stats = [
        {
            name: 'Attendance',
            value: `${data.attendance}%`,
            change: '+2.5%',
            trend: 'up',
            icon: Calendar,
            color: 'blue',
            bgGradient: 'from-blue-500 to-blue-600',
        },
        {
            name: 'CGPA',
            value: data.cgpa,
            change: '+0.2',
            trend: 'up',
            icon: Award,
            color: 'emerald',
            bgGradient: 'from-emerald-500 to-emerald-600',
        },
        {
            name: 'Pending Fees',
            value: `₹${data.pendingFees}`,
            change: '-₹5,000',
            trend: 'down',
            icon: DollarSign,
            color: 'amber',
            bgGradient: 'from-amber-500 to-orange-500',
        },
        {
            name: 'Active Courses',
            value: data.activeCourses,
            change: 'This Semester',
            trend: 'neutral',
            icon: BookOpen,
            color: 'purple',
            bgGradient: 'from-purple-500 to-purple-600',
        },
    ];

    const userName = profile?.firstName ||
        user?.email
            ?.split("@")[0]
            .split(".")[0]
            .replace(/^(.{4})(.*)$/, (_, first, last) =>
                first.charAt(0).toUpperCase() +
                first.slice(1) +
                " " +
                last.charAt(0).toUpperCase() +
                last.slice(1)
            );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Enhanced Header with Gradient */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-xl">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">
                                    {userName?.[0]?.toUpperCase() || 'S'}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-display font-bold text-white">
                                    Welcome back, {userName}! 👋
                                </h1>
                                <p className="mt-1 text-blue-100">
                                    {profile?.enrollmentNumber && `Enrollment: ${profile.enrollmentNumber}`}
                                    <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                                        <Activity className="h-3 w-3 mr-1" />
                                        Active Student
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all relative">
                                <Bell className="h-6 w-6 text-white" />
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">3</span>
                            </button>
                            <div className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                                <Clock className="h-4 w-4 text-white" />
                                <span className="text-white text-sm font-medium">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Enhanced Stats Grid with Gradients */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {stats.map((stat, index) => (
                        <div key={stat.name} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                            <div className="relative p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            {stat.name}
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                            {stat.value}
                                        </p>
                                        <div className="flex items-center">
                                            {stat.trend === 'up' && (
                                                <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                                            )}
                                            <span className={`text-sm font-medium ${
                                                stat.trend === 'up' ? 'text-emerald-600' : 
                                                stat.trend === 'down' ? 'text-red-600' : 
                                                'text-gray-500'
                                            }`}>
                                                {stat.change}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.bgGradient} shadow-lg`}>
                                        <stat.icon className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Enhanced Today's Schedule */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-white flex items-center">
                                        <Calendar className="h-6 w-6 mr-2" />
                                        Today's Schedule
                                    </h2>
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                                        3 Classes
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {[
                                        { time: '09:00 AM', subject: 'Data Structures', room: 'Lab 101', type: 'Practical', status: 'upcoming', professor: 'Dr. Smith' },
                                        { time: '11:00 AM', subject: 'Database Management', room: 'Room 203', type: 'Theory', status: 'current', professor: 'Prof. Johnson' },
                                        { time: '02:00 PM', subject: 'Web Development', room: 'Lab 102', type: 'Practical', status: 'upcoming', professor: 'Dr. Wilson' },
                                    ].map((class_, index) => (
                                        <div key={index} className={`relative p-5 rounded-xl border-l-4 transition-all duration-300 hover:shadow-md ${
                                            class_.status === 'current' 
                                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500' 
                                                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 hover:border-indigo-400'
                                        }`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl ${
                                                        class_.status === 'current' 
                                                            ? 'bg-green-500 text-white' 
                                                            : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                                    }`}>
                                                        <span className="text-xs font-medium">{class_.time.split(' ')[1]}</span>
                                                        <span className="text-lg font-bold">{class_.time.split(' ')[0].split(':')[0]}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                            {class_.subject}
                                                        </h3>
                                                        <div className="flex items-center space-x-3 mt-1">
                                                            <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                                <MapPin className="h-4 w-4 mr-1" />
                                                                {class_.room}
                                                            </span>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                class_.type === 'Practical' 
                                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                                            }`}>
                                                                {class_.type}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            {class_.professor}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {class_.status === 'current' && (
                                                        <span className="flex items-center px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium animate-pulse">
                                                            <div className="h-2 w-2 bg-white rounded-full mr-2"></div>
                                                            Live Now
                                                        </span>
                                                    )}
                                                    <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                                        <ChevronRight className="h-5 w-5 text-gray-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Quick Actions & Notifications */}
                    <div className="space-y-6">
                        {/* Quick Actions with Better Design */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <Target className="h-6 w-6 mr-2" />
                                    Quick Actions
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: Calendar, label: 'Attendance', color: 'blue', path: '/student/attendance' },
                                        { icon: FileText, label: 'Results', color: 'green' },
                                        { icon: DollarSign, label: 'Pay Fees', color: 'yellow' },
                                        { icon: Users, label: 'Courses', color: 'purple' },
                                    ].map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => action.path && navigate(action.path)}
                                            className="group p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                            style={{
                                                background: `linear-gradient(135deg, ${
                                                    action.color === 'blue' ? '#3b82f6, #1d4ed8' :
                                                    action.color === 'green' ? '#10b981, #059669' :
                                                    action.color === 'yellow' ? '#f59e0b, #d97706' :
                                                    '#8b5cf6, #7c3aed'
                                                })`,
                                            }}
                                        >
                                            <div className="text-center">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform">
                                                    <action.icon className="h-6 w-6 text-white" />
                                                </div>
                                                <p className="text-sm font-medium text-white">
                                                    {action.label}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Performance Overview */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <BarChart3 className="h-6 w-6 mr-2" />
                                    Performance
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Progress</span>
                                        <span className="text-sm font-bold text-emerald-600">85%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8.5</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Current CGPA</div>
                                        </div>
                                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">92%</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Attendance</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Recent Grades */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white flex items-center">
                                <Star className="h-6 w-6 mr-2" />
                                Recent Exam Results
                            </h2>
                            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors">
                                View All
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Subject</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Exam Type</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Marks</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Grade</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { subject: 'Data Structures', type: 'Mid-Term', marks: '42/50', grade: 'A', status: 'PASS', percentage: 84 },
                                        { subject: 'DBMS', type: 'Internal', marks: '18/20', grade: 'A+', status: 'PASS', percentage: 90 },
                                        { subject: 'Web Development', type: 'Assignment', marks: '48/50', grade: 'O', status: 'PASS', percentage: 96 },
                                    ].map((result, index) => (
                                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="py-4 px-4">
                                                <div className="font-medium text-gray-900 dark:text-white">{result.subject}</div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{result.type}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium text-gray-900 dark:text-white">{result.marks}</span>
                                                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                        <div 
                                                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" 
                                                            style={{ width: `${result.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                    result.grade === 'O' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                                    result.grade === 'A+' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                }`}>
                                                    {result.grade}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                    ✓ {result.status}
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
