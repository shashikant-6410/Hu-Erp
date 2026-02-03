import { useAuth } from '../../hooks/useAuth';
import {
    Users,
    Calendar,
    Clock,
    CheckSquare,
    FileText,
    MessageSquare,
    Bell,
    Search,
    BookOpen,
    Award,
    TrendingUp,
    ChevronRight,
    Plus,
    Eye,
    Edit,
    BarChart3,
    Target,
    Activity,
    GraduationCap,
    MapPin,
    Star
} from 'lucide-react';

const FacultyDashboard = () => {
    const { user, profile } = useAuth();

    const stats = [
        {
            name: 'Total Classes',
            value: '12',
            period: 'This Week',
            change: '+2',
            trend: 'up',
            icon: Calendar,
            color: 'blue',
            bgGradient: 'from-blue-500 to-blue-600',
        },
        {
            name: 'Students',
            value: '145',
            period: 'Enrolled',
            change: '+8',
            trend: 'up',
            icon: Users,
            color: 'emerald',
            bgGradient: 'from-emerald-500 to-emerald-600',
        },
        {
            name: 'Pending Tasks',
            value: '5',
            period: 'To Review',
            change: '-3',
            trend: 'down',
            icon: CheckSquare,
            color: 'amber',
            bgGradient: 'from-amber-500 to-orange-500',
        },
        {
            name: 'Teaching Hours',
            value: '18',
            period: 'This Week',
            change: '+2',
            trend: 'up',
            icon: Clock,
            color: 'purple',
            bgGradient: 'from-purple-500 to-purple-600',
        },
    ];

    const userName = profile?.firstName || user?.email?.split('@')[0] || 'Faculty';

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Enhanced Header */}
            <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl sticky top-0 z-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-display font-bold text-white">
                                    Hello, Prof. {userName} 👨‍🏫
                                </h1>
                                <p className="text-emerald-100 flex items-center">
                                    <Activity className="h-4 w-4 mr-2" />
                                    Here's what's happening in your classes today
                                    <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                                        Spring Semester 2024
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex relative">
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    className="pl-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70 text-sm w-64"
                                />
                                <Search className="absolute left-3 top-3.5 h-4 w-4 text-white/70" />
                            </div>
                            <button className="p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all relative">
                                <Bell className="h-6 w-6 text-white" />
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">4</span>
                            </button>
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {userName[0]?.toUpperCase()}
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
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {stat.period}
                                            </span>
                                            <div className="flex items-center">
                                                {stat.trend === 'up' ? (
                                                    <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                                                ) : (
                                                    <TrendingUp className="h-3 w-3 text-red-500 mr-1 rotate-180" />
                                                )}
                                                <span className={`text-xs font-medium ${
                                                    stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                                                }`}>
                                                    {stat.change}
                                                </span>
                                            </div>
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
                    {/* Enhanced Today's Schedule */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white flex items-center">
                                        <Calendar className="h-6 w-6 mr-2" />
                                        Today's Classes
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                                            3 Classes
                                        </span>
                                        <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-3 py-1 rounded-lg text-white text-sm font-medium transition-colors">
                                            View Full Schedule
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {[
                                        { time: '09:00 - 10:30', course: 'Basic Electronics', code: 'ECE101', room: 'LH-102', status: 'Upcoming', students: 45, attendance: null },
                                        { time: '11:00 - 12:30', course: 'Digital Logic Design', code: 'ECE204', room: 'Lab-3', status: 'In Progress', students: 38, attendance: 35 },
                                        { time: '14:00 - 15:30', course: 'Microprocessors', code: 'ECE305', room: 'LH-105', status: 'Completed', students: 42, attendance: 40 },
                                    ].map((cls, idx) => (
                                        <div key={idx} className={`relative p-6 rounded-2xl border-l-4 transition-all duration-300 hover:shadow-lg ${
                                            cls.status === 'In Progress' 
                                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500 shadow-md' 
                                                : cls.status === 'Completed'
                                                ? 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border-gray-400'
                                                : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-500 hover:border-indigo-400'
                                        }`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-6">
                                                    <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl shadow-sm ${
                                                        cls.status === 'In Progress' 
                                                            ? 'bg-green-500 text-white animate-pulse' 
                                                            : cls.status === 'Completed'
                                                            ? 'bg-gray-400 text-white'
                                                            : 'bg-indigo-500 text-white'
                                                    }`}>
                                                        <span className="text-xs font-medium">{cls.time.split(' - ')[0]}</span>
                                                        <span className="text-lg font-bold">{cls.time.split(' - ')[0].split(':')[0]}</span>
                                                        <span className="text-xs">{cls.time.split(' - ')[0].includes('14:') ? 'PM' : 'AM'}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                            {cls.course}
                                                        </h4>
                                                        <div className="flex items-center space-x-4 mb-2">
                                                            <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                                <MapPin className="h-4 w-4 mr-1" />
                                                                {cls.room}
                                                            </span>
                                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                                                {cls.code}
                                                            </span>
                                                            <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                                <Users className="h-4 w-4 mr-1" />
                                                                {cls.students} students
                                                            </span>
                                                        </div>
                                                        {cls.attendance && (
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-sm text-gray-600 dark:text-gray-400">Attendance:</span>
                                                                <div className="flex items-center space-x-2">
                                                                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                                        <div 
                                                                            className="bg-green-500 h-2 rounded-full" 
                                                                            style={{ width: `${(cls.attendance / cls.students) * 100}%` }}
                                                                        ></div>
                                                                    </div>
                                                                    <span className="text-sm font-medium text-green-600">
                                                                        {cls.attendance}/{cls.students} ({Math.round((cls.attendance / cls.students) * 100)}%)
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end space-y-2">
                                                    {cls.status === 'In Progress' && (
                                                        <span className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium animate-pulse">
                                                            <div className="h-2 w-2 bg-white rounded-full mr-2"></div>
                                                            Live Now
                                                        </span>
                                                    )}
                                                    {cls.status === 'Completed' && (
                                                        <span className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-full text-sm font-medium">
                                                            <CheckSquare className="h-4 w-4 mr-2" />
                                                            Completed
                                                        </span>
                                                    )}
                                                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        cls.status === 'Completed' 
                                                            ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                                    }`}>
                                                        {cls.status === 'Completed' ? 'View Report' : 'Mark Attendance'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Quick Actions Grid */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <Target className="h-6 w-6 mr-2" />
                                    Quick Actions
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Mark Attendance', icon: CheckSquare, color: 'blue' },
                                        { label: 'Upload Marks', icon: FileText, color: 'emerald' },
                                        { label: 'Student Queries', icon: MessageSquare, color: 'amber' },
                                        { label: 'My Timetable', icon: Calendar, color: 'purple' },
                                    ].map((action, idx) => (
                                        <button 
                                            key={idx} 
                                            className="group p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                            style={{
                                                background: `linear-gradient(135deg, ${
                                                    action.color === 'blue' ? '#3b82f6, #1d4ed8' :
                                                    action.color === 'emerald' ? '#10b981, #059669' :
                                                    action.color === 'amber' ? '#f59e0b, #d97706' :
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
                    </div>

                    {/* Right Column: Enhanced Notifications & Tasks */}
                    <div className="space-y-6">
                        {/* Pending Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <CheckSquare className="h-6 w-6 mr-2" />
                                    Pending Actions
                                </h3>
                            </div>
                            <div className="p-0">
                                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {[
                                        { title: 'Submit Mid-Term Grades', due: 'Today', type: 'urgent', course: 'ECE101' },
                                        { title: 'Approve Leave Request', due: 'Tomorrow', type: 'normal', course: 'Student ID: 2024001' },
                                        { title: 'Update Course Syllabus', due: 'In 3 days', type: 'normal', course: 'ECE204' },
                                    ].map((task, idx) => (
                                        <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <div className="flex items-start space-x-3">
                                                <div className={`mt-1 h-3 w-3 rounded-full flex-shrink-0 ${task.type === 'urgent' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{task.course}</p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className={`text-xs font-medium ${task.type === 'urgent' ? 'text-red-600' : 'text-blue-600'}`}>
                                                            Due: {task.due}
                                                        </span>
                                                        <button className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-2 py-1 rounded transition-colors">
                                                            Action
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                                <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View All Tasks
                                </button>
                            </div>
                        </div>

                        {/* Performance Overview */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <BarChart3 className="h-6 w-6 mr-2" />
                                    Performance
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Class Completion</span>
                                        <span className="text-sm font-bold text-emerald-600">92%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.8</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Avg Rating</div>
                                            <div className="flex justify-center mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-3 w-3 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">87%</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Avg Attendance</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notice Board */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg overflow-hidden text-white">
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center">
                                    <Bell className="h-5 w-5 mr-2" />
                                    Notice Board
                                </h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                                        <p className="text-sm font-medium mb-1">Faculty Meeting</p>
                                        <p className="text-xs text-indigo-100">Tomorrow at 2 PM in Conference Room A regarding NAAC accreditation.</p>
                                    </div>
                                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                                        <p className="text-sm font-medium mb-1">Exam Schedule</p>
                                        <p className="text-xs text-indigo-100">Mid-term exams start from March 15th. Submit question papers by March 10th.</p>
                                    </div>
                                </div>
                                <button className="w-full mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                                    View All Notices
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;
