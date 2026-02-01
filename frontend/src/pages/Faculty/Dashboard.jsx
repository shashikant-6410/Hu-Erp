import { useAuth } from '../../hooks/useAuth';
import {
    Users,
    Calendar,
    Clock,
    CheckSquare,
    FileText,
    MessageSquare,
    Bell,
    Search
} from 'lucide-react';

const FacultyDashboard = () => {
    const { user, profile } = useAuth();

    const stats = [
        {
            name: 'Total Classes',
            value: '12',
            period: 'This Week',
            icon: Calendar,
            color: 'primary',
        },
        {
            name: 'Students',
            value: '145',
            period: 'Enrolled',
            icon: Users,
            color: 'success',
        },
        {
            name: 'Pending Tasks',
            value: '5',
            period: 'To Review',
            icon: CheckSquare,
            color: 'warning',
        },
        {
            name: 'Teaching Hours',
            value: '18',
            period: 'This Week',
            icon: Clock,
            color: 'secondary',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                                Faculty Dashboard
                            </h1>
                            <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                                Spring Semester 2024
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex relative">
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-primary-500 text-sm w-64"
                                />
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                            </div>
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-danger-500 rounded-full"></span>
                            </button>
                            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                                {user?.email?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Hello, Prof. {profile?.firstName || user?.email?.split('@')[0]}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Here's what's happening in your classes today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.name} className="card hover:shadow-md transition-shadow">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {stat.name}
                                        </p>
                                        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            {stat.period}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                                        <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Today's Schedule (2 columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card">
                            <div className="card-header flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Today's Classes
                                </h3>
                                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                    View Full Schedule
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="space-y-4">
                                    {[
                                        { time: '09:00 - 10:30', course: 'Basic Electronics', code: 'ECE101', room: 'LH-102', status: 'Upcoming' },
                                        { time: '11:00 - 12:30', course: 'Digital Logic Design', code: 'ECE204', room: 'Lab-3', status: 'In Progress' },
                                        { time: '14:00 - 15:30', course: 'Microprocessors', code: 'ECE305', room: 'LH-105', status: 'Completed' },
                                    ].map((cls, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{cls.time.split(' - ')[0]}</span>
                                                    <span className="text-lg font-bold text-gray-900 dark:text-white">AM</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white">{cls.course}</h4>
                                                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-xs font-mono">{cls.code}</span>
                                                        <span>• {cls.room}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 sm:mt-0 flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium 
                          ${cls.status === 'In Progress' ? 'bg-success-100 text-success-800' :
                                                        cls.status === 'Upcoming' ? 'bg-primary-100 text-primary-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                    {cls.status}
                                                </span>
                                                <button className="btn btn-secondary text-sm py-1.5">
                                                    Mark Attendance
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: 'Mark Attendance', icon: CheckSquare, color: 'primary' },
                                { label: 'Upload Marks', icon: FileText, color: 'success' },
                                { label: 'Student Queries', icon: MessageSquare, color: 'warning' },
                                { label: 'My Timetable', icon: Calendar, color: 'secondary' },
                            ].map((action, idx) => (
                                <button key={idx} className="card p-4 flex flex-col items-center justify-center gap-3 hover:translate-y-[-2px] transition-transform">
                                    <div className={`p-3 rounded-full bg-${action.color}-50 dark:bg-${action.color}-900/20`}>
                                        <action.icon className={`h-6 w-6 text-${action.color}-600 dark:text-${action.color}-400`} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center">
                                        {action.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Notifications & Tasks */}
                    <div className="space-y-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Pending Actions
                                </h3>
                            </div>
                            <div className="card-body p-0">
                                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {[
                                        { title: 'Submit Mid-Term Grades', due: 'Today', type: 'urgent' },
                                        { title: 'Approve Leave Request - Student', due: 'Tomorrow', type: 'normal' },
                                        { title: 'Update Course Syllabus', due: 'In 3 days', type: 'normal' },
                                    ].map((task, idx) => (
                                        <div key={idx} className="p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${task.type === 'urgent' ? 'bg-danger-500' : 'bg-primary-500'}`} />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Due: {task.due}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                    View All Tasks
                                </button>
                            </div>
                        </div>

                        <div className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                            <div className="card-body">
                                <h3 className="font-bold text-lg mb-2">Notice Board</h3>
                                <p className="text-primary-100 text-sm mb-4">
                                    Faculty meeting scheduled for tomorrow at 2 PM in Conference Room A regarding NAAC accreditation.
                                </p>
                                <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
                                    Read More
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
