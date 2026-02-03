import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronLeft,
    Calendar,
    CheckCircle,
    XCircle,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    Download,
    Filter,
    RefreshCw,
    BarChart3,
    Eye,
    Target,
    Award
} from 'lucide-react';

const AttendanceDashboard = () => {
    const navigate = useNavigate();
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [viewMode, setViewMode] = useState('overview');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [refreshing, setRefreshing] = useState(false);
    const [hoveredSegment, setHoveredSegment] = useState(null);

    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRefreshing(false);
    };

    const handleExportData = () => {
        // Sample student details (in real app, this would come from user context/API)
        const studentDetails = {
            name: "John Doe",
            rollNumber: "2024CS101",
            department: "Computer Science",
            semester: "5th Semester",
            academicYear: "2024-2025"
        };

        // Generate PDF content
        const printContent = `
            <html>
                <head>
                    <title>Attendance Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                        .title { font-size: 24px; font-weight: bold; color: #333; }
                        .subtitle { font-size: 14px; color: #666; margin-top: 5px; }
                        .student-info { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 30px; border-left: 4px solid #007bff; }
                        .student-info h3 { margin: 0 0 15px 0; color: #333; font-size: 18px; }
                        .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
                        .info-item { }
                        .info-label { font-size: 12px; color: #666; margin-bottom: 3px; }
                        .info-value { font-size: 14px; font-weight: bold; color: #333; }
                        .section { margin-bottom: 30px; }
                        .section-title { font-size: 18px; font-weight: bold; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
                        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
                        .stat-box { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
                        .stat-label { font-size: 12px; color: #666; margin-bottom: 5px; }
                        .stat-value { font-size: 20px; font-weight: bold; color: #333; }
                        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                        .table th { background-color: #f5f5f5; font-weight: bold; }
                        .eligible { background-color: #d4edda; color: #155724; padding: 4px 8px; border-radius: 3px; font-weight: bold; }
                        .not-eligible { background-color: #f8d7da; color: #721c24; padding: 4px 8px; border-radius: 3px; font-weight: bold; }
                        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #666; text-align: center; }
                        @media print { body { margin: 10px; } }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="title">Attendance Report</div>
                        <div class="subtitle">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
                    </div>

                    <div class="student-info">
                        <h3>Student Information</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label">Student Name</div>
                                <div class="info-value">${studentDetails.name}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Roll Number</div>
                                <div class="info-value">${studentDetails.rollNumber}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Department</div>
                                <div class="info-value">${studentDetails.department}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Semester</div>
                                <div class="info-value">${studentDetails.semester}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Academic Year</div>
                                <div class="info-value">${studentDetails.academicYear}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Report Period</div>
                                <div class="info-value">${monthNames[selectedMonth]} ${selectedYear}</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">Overall Attendance Summary</div>
                        <div class="stats-grid">
                            <div class="stat-box">
                                <div class="stat-label">Overall Attendance Percentage</div>
                                <div class="stat-value">${courseStats.percentage}%</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-label">Eligibility Status (75% Required)</div>
                                <div class="stat-value">${courseStats.percentage >= 75 ? '<span class="eligible">ELIGIBLE</span>' : '<span class="not-eligible">NOT ELIGIBLE</span>'}</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-label">Total Classes Attended</div>
                                <div class="stat-value">${courseStats.present}</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-label">Total Classes Missed</div>
                                <div class="stat-value">${courseStats.absent} (Absent) + ${courseStats.late} (Late)</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">Subject-wise Attendance Details</div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Total Classes</th>
                                    <th>Present</th>
                                    <th>Absent</th>
                                    <th>Late</th>
                                    <th>Attendance %</th>
                                    <th>Eligibility (75%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${courseWiseStats.map(course => `
                                    <tr>
                                        <td><strong>${course.course}</strong></td>
                                        <td>${course.total}</td>
                                        <td style="color: #28a745; font-weight: bold;">${course.present}</td>
                                        <td style="color: #dc3545; font-weight: bold;">${course.absent}</td>
                                        <td style="color: #ffc107; font-weight: bold;">${course.late}</td>
                                        <td><strong>${course.percentage}%</strong></td>
                                        <td>${course.percentage >= 75 ? '<span class="eligible">ELIGIBLE</span>' : '<span class="not-eligible">NOT ELIGIBLE</span>'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="section">
                        <div class="section-title">Eligibility Summary</div>
                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                            <p><strong>Eligibility Criteria:</strong> Minimum 75% attendance required for all subjects</p>
                            <p><strong>Overall Status:</strong> ${courseStats.percentage >= 75 ? 
                                '<span style="color: #28a745;">✓ MEETS ELIGIBILITY CRITERIA</span>' : 
                                '<span style="color: #dc3545;">✗ DOES NOT MEET ELIGIBILITY CRITERIA</span>'}</p>
                            <p><strong>Subjects Eligible:</strong> ${courseWiseStats.filter(c => c.percentage >= 75).length} out of ${courseWiseStats.length}</p>
                            <p><strong>Subjects Needing Improvement:</strong> ${courseWiseStats.filter(c => c.percentage < 75).map(c => c.course).join(', ') || 'None'}</p>
                        </div>
                    </div>

                    <div class="footer">
                        <p><strong>Important Note:</strong> This attendance report is official and should be kept for academic records.</p>
                        <p>For any discrepancies, please contact the administration office within 7 days of report generation.</p>
                        <p>Report generated by HuErp Attendance System on ${new Date().toLocaleDateString()}</p>
                    </div>
                </body>
            </html>
        `;

        // Create a new window and print
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // Wait for content to load, then print
        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    };

    // Sample attendance data
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
        },
        {
            date: '2024-01-04',
            day: 'Thursday',
            courses: [
                { name: 'Database Management', time: '11:00 AM', status: 'present', room: 'Room 203' },
                { name: 'Web Development', time: '02:00 PM', status: 'present', room: 'Lab 102' }
            ]
        },
        {
            date: '2024-01-05',
            day: 'Friday',
            courses: [
                { name: 'Computer Networks', time: '11:00 AM', status: 'present', room: 'Room 205' },
                { name: 'Operating Systems', time: '02:00 PM', status: 'present', room: 'Room 301' }
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

    // Sample course stats
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
        { course: 'Data Structures', total: 15, present: 14, absent: 1, late: 0, percentage: 93.3 },
        { course: 'Database Management', total: 12, present: 11, absent: 1, late: 0, percentage: 91.7 },
        { course: 'Web Development', total: 10, present: 8, absent: 1, late: 1, percentage: 80.0 },
        { course: 'Computer Networks', total: 8, present: 6, absent: 2, late: 0, percentage: 75.0 },
        { course: 'Operating Systems', total: 8, present: 7, absent: 0, late: 1, percentage: 87.5 }
    ];

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 dark:border-gray-700"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayData = attendanceData.find(d => d.date === dateStr);
            
            days.push(
                <div 
                    key={day} 
                    className={`h-24 border border-gray-200 dark:border-gray-700 p-2 transition-colors ${
                        dayData 
                            ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer' 
                            : 'bg-gray-50 dark:bg-gray-800'
                    }`}
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
                        <div className="flex items-center gap-4">
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
                </div>
            )}
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* View Mode Tabs */}
                <div className="card mb-6">
                    <div className="card-body">
                        <div className="flex flex-wrap items-center justify-between gap-4">
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
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Attendance</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{courseStats.percentage}%</p>
                                    <p className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4" />
                                        {courseStats.monthlyTrend} this month
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
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{courseStats.present}</p>
                                    <p className="mt-2 text-sm text-gray-500">of {courseStats.totalClasses} total</p>
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
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{courseStats.absent}</p>
                                    <p className="mt-2 text-sm text-gray-500">{courseStats.late} late arrivals</p>
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
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{courseStats.weeklyTrend}</p>
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

                {/* Content based on view mode */}
                {viewMode === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Recent Attendance
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="space-y-4">
                                    {attendanceData.slice(0, 3).map((day, index) => (
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
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Course Performance
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="space-y-4">
                                    {courseWiseStats.slice(0, 3).map((course, index) => (
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
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === 'calendar' && (
                    <div className="card">
                        <div className="card-header">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Attendance Calendar
                                </h2>
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
                            </div>
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

                {viewMode === 'summary' && (
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Course-wise Attendance Summary
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Classes</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Present</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Absent</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Late</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Attendance %</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {courseWiseStats.map((course, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{course.course}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">{course.total}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600">{course.present}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-red-600">{course.absent}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-yellow-600">{course.late}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                    <span className={`font-medium ${
                                                        course.percentage >= 75 ? 'text-green-600' : 
                                                        course.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                        {course.percentage}%
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        course.percentage >= 75 ? 'bg-green-100 text-green-800' : 
                                                        course.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {course.percentage >= 75 ? 'Good' : 
                                                         course.percentage >= 60 ? 'Average' : 'Poor'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="space-y-4">
                                    {courseWiseStats.map((course, index) => (
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
                                <div className="flex items-center justify-center">
                                    <div className="grid grid-cols-7 gap-2 max-w-md">
                                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                            <div key={day} className="text-center">
                                                <div className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                                                    {day.substring(0, 3)}
                                                </div>
                                                <div className="w-12 h-16 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-end justify-center p-1">
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

                        {/* Monthly Trend Chart */}
                        <div className="card">
                            <div className="card-header">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Monthly Attendance Trend
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="h-64 flex items-center justify-center">
                                    <div className="flex items-end justify-between gap-3 w-full max-w-2xl">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                                            const percentage = 65 + index * 5;
                                            const height = percentage;
                                            return (
                                                <div key={month} className="flex-1 flex flex-col items-center group cursor-pointer">
                                                    <div className="relative w-full flex flex-col items-center">
                                                        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {percentage}%
                                                        </div>
                                                        <div 
                                                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t hover:from-blue-700 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
                                                            style={{ height: `${height * 2}px` }}
                                                        />
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">{month}</div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-400">{percentage}%</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Distribution */}
                        <div className="card">
                            <div className="card-header">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Attendance Distribution
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="text-center">
                                        <div className="relative inline-flex items-center justify-center w-40 h-40">
                                            <svg className="w-40 h-40 transform -rotate-90">
                                                {/* Present segment - 86.7% */}
                                                <circle
                                                    className="text-green-500 transition-all duration-300 cursor-pointer"
                                                    strokeWidth="20"
                                                    strokeDasharray={`${2 * Math.PI * 70 * 0.867} ${2 * Math.PI * 70}`}
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="70"
                                                    cx="80"
                                                    cy="80"
                                                    onMouseEnter={() => setHoveredSegment('present')}
                                                    onMouseLeave={() => setHoveredSegment(null)}
                                                    style={{
                                                        filter: hoveredSegment === 'present' ? 'brightness(1.2) drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))' : 'none',
                                                        strokeWidth: hoveredSegment === 'present' ? '22' : '20'
                                                    }}
                                                />
                                                {/* Absent segment - 8.9% */}
                                                <circle
                                                    className="text-red-500 transition-all duration-300 cursor-pointer"
                                                    strokeWidth="20"
                                                    strokeDasharray={`${2 * Math.PI * 70 * 0.089} ${2 * Math.PI * 70}`}
                                                    strokeDashoffset={`-${2 * Math.PI * 70 * 0.867}`}
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="70"
                                                    cx="80"
                                                    cy="80"
                                                    onMouseEnter={() => setHoveredSegment('absent')}
                                                    onMouseLeave={() => setHoveredSegment(null)}
                                                    style={{
                                                        filter: hoveredSegment === 'absent' ? 'brightness(1.2) drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))' : 'none',
                                                        strokeWidth: hoveredSegment === 'absent' ? '22' : '20'
                                                    }}
                                                />
                                                {/* Late segment - 4.4% */}
                                                <circle
                                                    className="text-yellow-500 transition-all duration-300 cursor-pointer"
                                                    strokeWidth="20"
                                                    strokeDasharray={`${2 * Math.PI * 70 * 0.044} ${2 * Math.PI * 70}`}
                                                    strokeDashoffset={`-${2 * Math.PI * 70 * (0.867 + 0.089)}`}
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="70"
                                                    cx="80"
                                                    cy="80"
                                                    onMouseEnter={() => setHoveredSegment('late')}
                                                    onMouseLeave={() => setHoveredSegment(null)}
                                                    style={{
                                                        filter: hoveredSegment === 'late' ? 'brightness(1.2) drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' : 'none',
                                                        strokeWidth: hoveredSegment === 'late' ? '22' : '20'
                                                    }}
                                                />
                                                {/* Background circle */}
                                                <circle
                                                    className="text-gray-200 dark:text-gray-700"
                                                    strokeWidth="20"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="70"
                                                    cx="80"
                                                    cy="80"
                                                    strokeDasharray={`${2 * Math.PI * 70} ${2 * Math.PI * 70}`}
                                                    strokeDashoffset="0"
                                                    opacity="0.3"
                                                />
                                            </svg>
                                            
                                            {/* Tooltip */}
                                            {/* Removed - no longer showing percentage on hover */}
                                            
                                            <div className="absolute text-center">
                                                <div className="text-3xl font-bold text-gray-900 dark:text-white">86.7%</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">Overall</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col justify-center space-y-4 max-w-sm">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Breakdown</h3>
                                        <div className="space-y-2">
                                            <div 
                                                className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                                                    hoveredSegment === 'present' 
                                                        ? 'bg-green-100 dark:bg-green-900/40 scale-105 shadow-md' 
                                                        : 'bg-green-50 dark:bg-green-900/20'
                                                }`}
                                                onMouseEnter={() => setHoveredSegment('present')}
                                                onMouseLeave={() => setHoveredSegment(null)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                    <span className="font-medium text-gray-900 dark:text-white text-sm">Present</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-green-600 text-sm">86.7%</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">39 classes</div>
                                                </div>
                                            </div>
                                            
                                            <div 
                                                className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                                                    hoveredSegment === 'absent' 
                                                        ? 'bg-red-100 dark:bg-red-900/40 scale-105 shadow-md' 
                                                        : 'bg-red-50 dark:bg-red-900/20'
                                                }`}
                                                onMouseEnter={() => setHoveredSegment('absent')}
                                                onMouseLeave={() => setHoveredSegment(null)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                    <span className="font-medium text-gray-900 dark:text-white text-sm">Absent</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-red-600 text-sm">8.9%</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">4 classes</div>
                                                </div>
                                            </div>
                                            
                                            <div 
                                                className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                                                    hoveredSegment === 'late' 
                                                        ? 'bg-yellow-100 dark:bg-yellow-900/40 scale-105 shadow-md' 
                                                        : 'bg-yellow-50 dark:bg-yellow-900/20'
                                                }`}
                                                onMouseEnter={() => setHoveredSegment('late')}
                                                onMouseLeave={() => setHoveredSegment(null)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                    <span className="font-medium text-gray-900 dark:text-white text-sm">Late</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-yellow-600 text-sm">4.4%</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">2 classes</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceDashboard;
