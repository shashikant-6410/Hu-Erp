import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Calendar, 
    CheckCircle, 
    XCircle, 
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Download,
    ChevronLeft,
    Calculator,
    BarChart3,
    Filter,
    RefreshCw,
    Zap,
    Award,
    Target
} from 'lucide-react';

const AttendanceDashboard = () => {
    const navigate = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [viewMode, setViewMode] = useState('overview');
    const [showFilters, setShowFilters] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [timeRange, setTimeRange] = useState('month');
    const [comparisonMode, setComparisonMode] = useState(false);

    const attendanceData = [
        {
            date: '2024-01-01',
            day: 'Monday',
            courses: [
                { name: 'Data Structures', time: '09:00 AM', status: 'present', room: 'Lab 101' },
                { name: 'Database Management', time: '11:00 AM', status: 'present', room: 'Room 203' }
            ]
        },
        {
            date: '2024-01-02',
            day: 'Tuesday',
            courses: [
                { name: 'Web Development', time: '09:00 AM', status: 'late', room: 'Lab 102' },
                { name: 'Computer Networks', time: '11:00 AM', status: 'present', room: 'Room 205' }
            ]
        },
        {
            date: '2024-01-03',
            day: 'Wednesday',
            courses: [
                { name: 'Data Structures', time: '09:00 AM', status: 'present', room: 'Lab 101' },
                { name: 'Operating Systems', time: '02:00 PM', status: 'absent', room: 'Room 301' }
            ]
        }
    ];

    const courses = [
        { id: 'all', name: 'All Courses' },
        { id: 'ds', name: 'Data Structures' },
        { id: 'dbms', name: 'Database Management' },
        { id: 'web', name: 'Web Development' },
        { id: 'cn', name: 'Computer Networks' },
        { id: 'os', name: 'Operating Systems' }
    ];

    const courseStats = {
        totalClasses: 45,
        present: 39,
        absent: 4,
        late: 2,
        percentage: 86.7,
        monthlyTrend: '+2.3%',
        weeklyTrend: '-0.5%'
    };

    const courseWiseStats = [
        { course: 'Data Structures', total: 15, present: 14, absent: 1, late: 0, percentage: 93.3, estimatedTotal: 60 },
        { course: 'Database Management', total: 12, present: 11, absent: 1, late: 0, percentage: 91.7, estimatedTotal: 48 },
        { course: 'Web Development', total: 10, present: 8, absent: 1, late: 1, percentage: 80.0, estimatedTotal: 40 },
        { course: 'Computer Networks', total: 8, present: 6, absent: 2, late: 0, percentage: 75.0, estimatedTotal: 32 },
        { course: 'Operating Systems', total: 8, present: 7, absent: 0, late: 1, percentage: 87.5, estimatedTotal: 32 }
    ];

    const handleRefresh = async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRefreshing(false);
    };

    const handleExportData = () => {
        const dataStr = JSON.stringify({
            attendanceData,
            courseStats,
            courseWiseStats,
            exportDate: new Date().toISOString()
        }, null, 2);
        
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `attendance-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const getAttendanceInsights = () => {
        const insights = [];
        
        let currentStreak = 0;
        let tempStreak = 0;
        
        attendanceData.forEach(day => {
            const allPresent = day.courses.every(course => course.status === 'present');
            if (allPresent) {
                tempStreak++;
            } else {
                tempStreak = 0;
            }
        });
        currentStreak = tempStreak;
        
        insights.push({
            type: 'streak',
            title: 'Current Streak',
            value: `${currentStreak} days`,
            icon: Zap,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
        });
        
        const bestCourse = courseWiseStats.reduce((best, course) => 
            course.percentage > best.percentage ? course : best
        );
        
        insights.push({
            type: 'best-course',
            title: 'Best Performance',
            value: bestCourse.course,
            subtitle: `${bestCourse.percentage}% attendance`,
            icon: Award,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        });
        
        const goalPercentage = 85;
        const progress = Math.min((courseStats.percentage / goalPercentage) * 100, 100);
        
        insights.push({
            type: 'goal',
            title: 'Goal Progress',
            value: `${Math.round(progress)}%`,
            subtitle: `Target: ${goalPercentage}%`,
            icon: Target,
            color: progress >= 100 ? 'text-green-600' : 'text-blue-600',
            bgColor: progress >= 100 ? 'bg-green-100' : 'bg-blue-100'
        });
        
        return insights;
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const handleDayClick = (day, dayData) => {
        setSelectedDay({ day, ...dayData });
        setShowDayModal(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'present': return 'text-green-600 bg-green-100 border-green-200';
            case 'absent': return 'text-red-600 bg-red-100 border-red-200';
            case 'late': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
            default: return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'present': return <CheckCircle className="h-4 w-4" />;
            case 'absent': return <XCircle className="h-4 w-4" />;
            case 'late': return <AlertCircle className="h-4 w-4" />;
            default: return null;
        }
    };

    const insights = getAttendanceInsights();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Modal states
    const [selectedDay, setSelectedDay] = useState(null);
    const [showDayModal, setShowDayModal] = useState(false);
    const [showSmartCalculator, setShowSmartCalculator] = useState(false);

    const calculateAttendanceBuffer = (course) => {
        const MIN_ATTENDANCE_PERCENTAGE = 75;
        const { total, present, estimatedTotal } = course;
        
        const remainingClasses = estimatedTotal - total;
        const requiredPresentForMinAttendance = Math.ceil(estimatedTotal * MIN_ATTENDANCE_PERCENTAGE / 100);
        const moreClassesNeeded = Math.max(0, requiredPresentForMinAttendance - present);
        const canMiss = Math.max(0, remainingClasses - moreClassesNeeded);
        
        return {
            canMiss,
            remainingClasses,
            requiredPresentForMinAttendance,
            moreClassesNeeded,
            isAtRisk: canMiss <= 2,
            isCritical: canMiss <= 0
        };
    };

    // Memoized filtered data to prevent re-calculation issues
    const filteredData = useMemo(() => {
        try {
            if (selectedCourse === 'all' || !selectedCourse) {
                return {
                    attendanceData: attendanceData,
                    courseStats: courseStats,
                    courseWiseStats: courseWiseStats
                };
            }
            
            const selectedCourseObj = courses.find(c => c.id === selectedCourse);
            if (!selectedCourseObj) {
                return {
                    attendanceData: attendanceData,
                    courseStats: courseStats,
                    courseWiseStats: courseWiseStats
                };
            }
            
            const selectedCourseName = selectedCourseObj.name.toLowerCase();
            const searchTerms = selectedCourseName.split(' ');
            
            const filteredAttendanceData = attendanceData.map(day => ({
                ...day,
                courses: day.courses.filter(course => {
                    const courseName = course.name.toLowerCase();
                    return searchTerms.some(term => courseName.includes(term));
                })
            })).filter(day => day.courses.length > 0);
            
            const foundCourseStats = courseWiseStats.find(c => {
                const courseName = c.course.toLowerCase();
                return searchTerms.some(term => courseName.includes(term));
            });
            
            const filteredCourseWiseStats = courseWiseStats.filter(course => 
                searchTerms.some(term => course.course.toLowerCase().includes(term))
            );
            
            return {
                attendanceData: filteredAttendanceData,
                courseStats: foundCourseStats || courseStats,
                courseWiseStats: filteredCourseWiseStats
            };
        } catch (error) {
            console.error('Error filtering data:', error);
            return {
                attendanceData: attendanceData,
                courseStats: courseStats,
                courseWiseStats: courseWiseStats
            };
        }
    }, [selectedCourse, attendanceData, courseStats, courseWiseStats, courses]);

    // Safe access to filtered data
    const safeCourseStats = filteredData.courseStats || courseStats;
    const safeAttendanceData = filteredData.attendanceData || attendanceData;
    const safeCourseWiseStats = filteredData.courseWiseStats || courseWiseStats;

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 dark:border-gray-700"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayData = safeAttendanceData.find(d => d.date === dateStr);
            
            days.push(
                <div 
                    key={day} 
                    className={`h-24 border border-gray-200 dark:border-gray-700 p-2 transition-colors ${
                        dayData 
                            ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer' 
                            : 'bg-gray-50 dark:bg-gray-800'
                    }`}
                    onClick={() => dayData && handleDayClick(day, dayData)}
                >
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{day}</div>
                    {dayData ? (
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                                <span className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                    {dayData.courses.filter(c => c.status === 'present').length}
                                </span>
                                <span className="flex items-center gap-1">
                                    <XCircle className="h-3 w-3 text-red-600" />
                                    {dayData.courses.filter(c => c.status === 'absent').length}
                                </span>
                                {dayData.courses.filter(c => c.status === 'late').length > 0 && (
                                    <span className="flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3 text-yellow-600" />
                                        {dayData.courses.filter(c => c.status === 'late').length}
                                    </span>
                                )}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                                {dayData.courses.map(c => c.name.split(' ')[0]).join(', ')}
                            </div>
                        </div>
                    ) : (
                        <div className="text-xs text-gray-400">No classes</div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/student/dashboard')}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                                    Interactive Attendance Dashboard
                                </h1>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Real-time insights and attendance analytics
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <Filter className="h-4 w-4" />
                                Filters
                            </button>
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                            >
                                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <button 
                                onClick={handleExportData}
                                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                <Download className="h-4 w-4" />
                                Export Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showFilters && (
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Course:</label>
                                <select
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                >
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>{course.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Range:</label>
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                >
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="semester">This Semester</option>
                                </select>
                            </div>
                            {selectedCourse !== 'all' && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                        Filtering: {courses.find(c => c.id === selectedCourse)?.name}
                                    </span>
                                    <button
                                        onClick={() => setSelectedCourse('all')}
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100"
                                    >
                                        <XCircle className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {selectedCourse === 'all' ? 'Overall Attendance' : `${courses.find(c => c.id === selectedCourse)?.name} Attendance`}
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{safeCourseStats.percentage}%</p>
                                    <p className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4" />
                                        {safeCourseStats.monthlyTrend} this month
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                                    <Calendar className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Classes Attended</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{safeCourseStats.present}</p>
                                    <p className="mt-2 text-sm text-gray-500">of {safeCourseStats.totalClasses} total</p>
                                </div>
                                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Classes Missed</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{safeCourseStats.absent}</p>
                                    <p className="mt-2 text-sm text-gray-500">{safeCourseStats.late} late arrivals</p>
                                </div>
                                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
                                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Weekly Trend</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{safeCourseStats.weeklyTrend}</p>
                                    <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
                                        <TrendingDown className="h-4 w-4" />
                                        vs last week
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                                    <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {insights.map((insight, index) => (
                        <div key={index} className="card">
                            <div className="card-body">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                                        <insight.icon className={`h-5 w-5 ${insight.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{insight.title}</p>
                                        <p className={`text-lg font-bold ${insight.color}`}>{insight.value}</p>
                                        {insight.subtitle && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{insight.subtitle}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Mode Tabs */}
                <div className="card mb-6">
                    <div className="card-body">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Month:</label>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    >
                                        {monthNames.map((month, index) => (
                                            <option key={month} value={index}>{month}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Year:</label>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    >
                                        <option value={2023}>2023</option>
                                        <option value={2024}>2024</option>
                                        <option value={2025}>2025</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('overview')}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        viewMode === 'overview' 
                                            ? 'bg-primary-600 text-white' 
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setViewMode('calendar')}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        viewMode === 'calendar' 
                                            ? 'bg-primary-600 text-white' 
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    Calendar
                                </button>
                                <button
                                    onClick={() => setViewMode('summary')}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        viewMode === 'summary' 
                                            ? 'bg-primary-600 text-white' 
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    Summary
                                </button>
                                <button
                                    onClick={() => setViewMode('analytics')}
                                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                        viewMode === 'analytics' 
                                            ? 'bg-primary-600 text-white' 
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Analytics
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content based on view mode */}
                {viewMode === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Recent Attendance
                                    {selectedCourse !== 'all' && (
                                        <span className="text-sm font-normal text-gray-500 ml-2">
                                            ({courses.find(c => c.id === selectedCourse)?.name})
                                        </span>
                                    )}
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="space-y-4">
                                    {filteredAttendanceData.slice(0, 3).map((day, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{day.day}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{day.date}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-1 text-sm text-green-600">
                                                    <CheckCircle className="h-4 w-4" />
                                                    {day.courses.filter(c => c.status === 'present').length}
                                                </span>
                                                <span className="flex items-center gap-1 text-sm text-red-600">
                                                    <XCircle className="h-4 w-4" />
                                                    {day.courses.filter(c => c.status === 'absent').length}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {filteredAttendanceData.length === 0 && (
                                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                                            No attendance data found for selected filter
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Course Performance
                                    {selectedCourse !== 'all' && (
                                        <span className="text-sm font-normal text-gray-500 ml-2">
                                            (Filtered)
                                        </span>
                                    )}
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="space-y-4">
                                    {filteredCourseWiseStats.slice(0, 3).map((course, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900 dark:text-white">{course.course}</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {course.present}/{course.total} ({course.percentage}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full transition-all duration-300 ${
                                                        course.percentage >= 75 ? 'bg-green-500' :
                                                        course.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                    style={{ width: `${course.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {filteredCourseWiseStats.length === 0 && (
                                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                                            No course data found for selected filter
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === 'summary' && (
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Course-wise Attendance Summary
                                {selectedCourse !== 'all' && (
                                    <span className="text-sm font-normal text-gray-500 ml-2">
                                        (Filtered: {courses.find(c => c.id === selectedCourse)?.name})
                                    </span>
                                )}
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead className="table-header">
                                        <tr>
                                            <th className="table-cell font-semibold text-left">Course</th>
                                            <th className="table-cell font-semibold text-center">Total Classes</th>
                                            <th className="table-cell font-semibold text-center">Present</th>
                                            <th className="table-cell font-semibold text-center">Absent</th>
                                            <th className="table-cell font-semibold text-center">Late</th>
                                            <th className="table-cell font-semibold text-center">Attendance %</th>
                                            <th className="table-cell font-semibold text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredCourseWiseStats.map((course, index) => (
                                            <tr key={index} className="table-row">
                                                <td className="table-cell font-medium">{course.course}</td>
                                                <td className="table-cell text-center">{course.total}</td>
                                                <td className="table-cell text-center text-green-600">{course.present}</td>
                                                <td className="table-cell text-center text-red-600">{course.absent}</td>
                                                <td className="table-cell text-center text-yellow-600">{course.late}</td>
                                                <td className="table-cell text-center">
                                                    <span className={`font-medium ${
                                                        course.percentage >= 75 ? 'text-green-600' : 
                                                        course.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                        {course.percentage}%
                                                    </span>
                                                </td>
                                                <td className="table-cell text-center">
                                                    <span className={`badge ${
                                                        course.percentage >= 75 ? 'badge-success' : 
                                                        course.percentage >= 60 ? 'badge-warning' : 'badge-danger'
                                                    }`}>
                                                        {course.percentage >= 75 ? 'Good' : 
                                                         course.percentage >= 60 ? 'Average' : 'Poor'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredCourseWiseStats.length === 0 && (
                                            <tr>
                                                <td colSpan="7" className="table-cell text-center text-gray-500 py-4">
                                                    No data found for selected filter
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === 'calendar' && (
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {monthNames[selectedMonth]} {selectedYear}
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="grid grid-cols-7 gap-0 mb-2">
                                {dayNames.map(day => (
                                    <div key={day} className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-0">
                                {renderCalendar()}
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === 'analytics' && (
                    <div className="space-y-6">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Monthly Trend</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">vs last month</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-green-600">
                                        {courseStats.monthlyTrend}
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                            <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Best Day</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Highest attendance</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Monday
                                    </div>
                                    <div className="text-sm text-green-600">92% avg</div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                            <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">Goal Achievement</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Target: 85%</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        102%
                                    </div>
                                    <div className="text-sm text-gray-600">Exceeded target</div>
                                </div>
                            </div>
                        </div>

                        {/* Course Performance Chart */}
                        <div className="card">
                            <div className="card-header">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Course Performance Analysis
                                    {selectedCourse !== 'all' && (
                                        <span className="text-sm font-normal text-gray-500 ml-2">
                                            (Filtered)
                                        </span>
                                    )}
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="space-y-4">
                                    {filteredCourseWiseStats.map((course, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900 dark:text-white">{course.course}</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {course.present}/{course.total} ({course.percentage}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                                <div 
                                                    className={`h-3 rounded-full transition-all duration-300 ${
                                                        course.percentage >= 75 ? 'bg-green-500' :
                                                        course.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                    style={{ width: `${course.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {filteredCourseWiseStats.length === 0 && (
                                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                                            No course data found for selected filter
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Weekly Pattern */}
                        <div className="card">
                            <div className="card-header">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Weekly Attendance Pattern
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="grid grid-cols-7 gap-4">
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                        <div key={day} className="text-center">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                                {day.substring(0, 3)}
                                            </div>
                                            <div className="w-full h-20 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-end justify-center p-2">
                                                <div className="w-full bg-green-500 rounded" style={{ height: '75%', opacity: 0.6 }} />
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                85%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Day Detail Modal */}
            {showDayModal && selectedDay && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {selectedDay.day} - {selectedDay.date}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Attendance Details
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowDayModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <XCircle className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {selectedDay.courses.length}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Classes</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {selectedDay.courses.filter(c => c.status === 'present').length}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Present</div>
                                </div>
                                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-red-600">
                                        {selectedDay.courses.filter(c => c.status === 'absent').length}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Absent</div>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {selectedDay.courses.filter(c => c.status === 'late').length}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Late</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Course Details</h4>
                                {selectedDay.courses.map((course, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg border ${getStatusColor(course.status)}`}>
                                                {getStatusIcon(course.status)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{course.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {course.room} • {course.time}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(course.status)}`}>
                                                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowDayModal(false)}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Close
                                </button>
                                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                                    Report Issue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Smart Calculator Button */}
            <div className="fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setShowSmartCalculator(!showSmartCalculator)}
                    className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    title="Smart Attendance Calculator"
                >
                    <Calculator className="h-6 w-6" />
                    <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Smart Calculator
                    </span>
                </button>
            </div>

            {/* Smart Calculator Modal */}
            {showSmartCalculator && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Smart Attendance Calculator
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Know how many more classes you can miss while maintaining 75% attendance
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowSmartCalculator(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <XCircle className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <div className="space-y-4">
                                {filteredCourseWiseStats.map((course, index) => {
                                    const buffer = calculateAttendanceBuffer(course);
                                    return (
                                        <div key={index} className={`border rounded-lg p-4 ${
                                            buffer.isCritical 
                                                ? 'border-red-300 bg-red-50 dark:bg-red-900/20' 
                                                : buffer.isAtRisk 
                                                    ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20'
                                                    : 'border-green-300 bg-green-50 dark:bg-green-900/20'
                                        }`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${
                                                        buffer.isCritical 
                                                            ? 'bg-red-100 dark:bg-red-900/30' 
                                                            : buffer.isAtRisk 
                                                                ? 'bg-yellow-100 dark:bg-yellow-900/30'
                                                                : 'bg-green-100 dark:bg-green-900/30'
                                                    }`}>
                                                        {buffer.isCritical ? (
                                                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                        ) : buffer.isAtRisk ? (
                                                            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                                        ) : (
                                                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 dark:text-white">{course.course}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Current: {course.present}/{course.total} ({course.percentage}%)
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-2xl font-bold ${
                                                        buffer.isCritical 
                                                            ? 'text-red-600' 
                                                            : buffer.isAtRisk 
                                                                ? 'text-yellow-600'
                                                                : 'text-green-600'
                                                    }`}>
                                                        {buffer.canMiss}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        classes can miss
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Total Classes:</span>
                                                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                                        {course.estimatedTotal} (estimated)
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Remaining:</span>
                                                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                                        {buffer.remainingClasses}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Need to Attend:</span>
                                                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                                                        {buffer.moreClassesNeeded} more
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                                                    <span className={`ml-2 font-medium ${
                                                        buffer.isCritical 
                                                            ? 'text-red-600' 
                                                            : buffer.isAtRisk 
                                                                ? 'text-yellow-600'
                                                                : 'text-green-600'
                                                    }`}>
                                                        {buffer.isCritical ? 'Critical' : buffer.isAtRisk ? 'At Risk' : 'Safe'}
                                                    </span>
                                                </div>
                                            </div>

                                            {buffer.isCritical && (
                                                <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                                    <p className="text-sm text-red-800 dark:text-red-200">
                                                        ⚠️ <strong>Immediate Action Required!</strong> You cannot miss any more classes in this subject. 
                                                        Attend all remaining classes to meet the 75% criteria.
                                                    </p>
                                                </div>
                                            )}

                                            {buffer.isAtRisk && !buffer.isCritical && (
                                                <div className="mt-3 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                                        ⚡ <strong>Be Careful!</strong> You can miss only {buffer.canMiss} more classes. 
                                                        Plan your attendance carefully to avoid falling below 75%.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                {filteredCourseWiseStats.length === 0 && (
                                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                                        No course data found for selected filter
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceDashboard;
