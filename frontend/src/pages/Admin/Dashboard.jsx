import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { dashboardService } from '../../services';
import {
    Users,
    BookOpen,
    Calendar,
    TrendingUp,
    UserCheck,
    ClipboardList,
    Bell,
    Settings,
    BarChart3,
    PieChart,
    Activity,
    Shield,
    Database,
    Globe,
    ChevronRight,
    Plus,
    Eye,
    Edit,
    AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Fetch Dashboard Stats
    const { data: statsData, isLoading } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: () => dashboardService.getStats()
    });

    const stats = [
        {
            name: 'Total Students',
            value: isLoading ? '...' : statsData?.data?.totalStudents || 1247,
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: 'blue',
            bgGradient: 'from-blue-500 to-blue-600',
        },
        {
            name: 'Faculty Members',
            value: isLoading ? '...' : statsData?.data?.totalFaculty || 89,
            change: '+5%',
            trend: 'up',
            icon: UserCheck,
            color: 'emerald',
            bgGradient: 'from-emerald-500 to-emerald-600',
        },
        {
            name: 'Active Courses',
            value: isLoading ? '...' : statsData?.data?.activeCourses || 156,
            change: '+8%',
            trend: 'up',
            icon: BookOpen,
            color: 'purple',
            bgGradient: 'from-purple-500 to-purple-600',
        },
        {
            name: 'Attendance Rate',
            value: isLoading ? '...' : (statsData?.data?.attendanceRate || '87%'),
            change: '+2.3%',
            trend: 'up',
            icon: Calendar,
            color: 'amber',
            bgGradient: 'from-amber-500 to-orange-500',
        },
    ];

    const recentActivities = [
        { action: 'New student registration', user: 'John Doe', time: '2 minutes ago', type: 'user' },
        { action: 'Course updated', user: 'Dr. Smith', time: '15 minutes ago', type: 'course' },
        { action: 'Fee payment received', user: 'Jane Wilson', time: '1 hour ago', type: 'payment' },
        { action: 'Faculty added', user: 'Prof. Johnson', time: '2 hours ago', type: 'faculty' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Enhanced Header */}
            <div className="relative bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <Shield className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-display font-bold text-white">
                                    Admin Dashboard
                                </h1>
                                <p className="mt-1 text-blue-100 flex items-center">
                                    <Activity className="h-4 w-4 mr-2" />
                                    System Overview & Management
                                    <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                                        <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                        All Systems Online
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all relative">
                                <Bell className="h-6 w-6 text-white" />
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">5</span>
                            </button>
                            <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                                <Settings className="h-6 w-6 text-white" />
                            </button>
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                A
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {stats.map((stat, index) => (
                        <div key={stat.name} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
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
                                            <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                                            <span className="text-sm font-medium text-emerald-600">
                                                {stat.change}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-2">vs last month</span>
                                        </div>
                                    </div>
                                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.bgGradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Enhanced Management Actions */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-white flex items-center">
                                        <Database className="h-6 w-6 mr-2" />
                                        Quick Management
                                    </h2>
                                    <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors">
                                        <Plus className="h-4 w-4 inline mr-1" />
                                        Add New
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { label: 'Manage Students', icon: Users, color: 'blue', path: '/admin/students', count: '1,247', action: 'View All' },
                                        { label: 'Manage Faculty', icon: UserCheck, color: 'emerald', path: '/admin/faculty', count: '89', action: 'View All' },
                                        { label: 'Course Management', icon: BookOpen, color: 'purple', path: '/admin/courses', count: '156', action: 'Manage' },
                                        { label: 'System Reports', icon: ClipboardList, color: 'amber', path: '/admin/reports', count: '24', action: 'Generate' },
                                    ].map((action, index) => (
                                        <div
                                            key={index}
                                            className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                                            onClick={() => navigate(action.path)}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-r ${
                                                action.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                                action.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                                                action.color === 'purple' ? 'from-purple-500 to-purple-600' :
                                                'from-amber-500 to-orange-500'
                                            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                            <div className="relative p-6 bg-white dark:bg-gray-800 group-hover:bg-transparent transition-colors duration-300">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className={`p-3 rounded-xl bg-${action.color}-100 dark:bg-${action.color}-900/30 group-hover:bg-white/20 transition-colors duration-300`}>
                                                        <action.icon className={`h-8 w-8 text-${action.color}-600 dark:text-${action.color}-400 group-hover:text-white transition-colors duration-300`} />
                                                    </div>
                                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300 mb-2">
                                                    {action.label}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors duration-300">
                                                        {action.count}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                                                        {action.action}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* System Analytics */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <BarChart3 className="h-6 w-6 mr-2" />
                                    System Analytics
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">98.5%</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">System Uptime</div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">87%</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Avg Attendance</div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">₹2.4M</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Revenue</div>
                                        <div className="text-xs text-green-600 mt-1">+15% this month</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Activities & Alerts */}
                    <div className="space-y-6">
                        {/* Recent Activities */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <Activity className="h-6 w-6 mr-2" />
                                    Recent Activities
                                </h2>
                            </div>
                            <div className="p-0">
                                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <div className="flex items-start space-x-3">
                                                <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center ${
                                                    activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                                    activity.type === 'course' ? 'bg-purple-100 dark:bg-purple-900/30' :
                                                    activity.type === 'payment' ? 'bg-green-100 dark:bg-green-900/30' :
                                                    'bg-amber-100 dark:bg-amber-900/30'
                                                }`}>
                                                    {activity.type === 'user' && <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                                                    {activity.type === 'course' && <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                                                    {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />}
                                                    {activity.type === 'faculty' && <UserCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {activity.action}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        by {activity.user}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View All Activities
                                </button>
                            </div>
                        </div>

                        {/* System Alerts */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <AlertTriangle className="h-6 w-6 mr-2" />
                                    System Alerts
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Server maintenance scheduled
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                Tomorrow at 2:00 AM
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                                        <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                New feature update available
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                Version 2.1.0 ready to deploy
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg overflow-hidden text-white">
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center">
                                    <PieChart className="h-5 w-5 mr-2" />
                                    Today's Summary
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-indigo-100">New Registrations</span>
                                        <span className="font-bold">12</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-indigo-100">Active Sessions</span>
                                        <span className="font-bold">847</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-indigo-100">Pending Approvals</span>
                                        <span className="font-bold">5</span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                                    View Detailed Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
