import React from "react";
import { useSelector } from "react-redux";
import { MdCastForEducation } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import "./ViewCourses.css";

const userData = [
    {
        _id: "C001",
        courseCode: "CS301",
        courseName: "Data Structures & Algorithms",
        semester: 3,
        credits: 4,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/dTxGBozwyZ7jNx_r5RGItFi5DCBxyneXT4tKGi3ynkk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE3LzgyLzY4LzIx/LzM2MF9GXzE3ODI2/ODIxMDBfOEtkZzRs/bEVxbFk4aVk4c2Vn/bmFmV1Aza0FRd1pi/T1cuanBn",

        faculty: {
            facultyId: "F101",
            name: "Dr. Rahul Sharma",
            email: "rahul.sharma@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Theory",
        status: "Active",

        enrolledStudents: 58,
        enrollmentLimit: 60,

        syllabusUnits: 5,
        progress: 68,

        attendance: {
            totalLectures: 28,
            present: 24,
            percentage: 85.71
        },

        assignments: {
            total: 5,
            submitted: 4,
            pending: 1
        },

        internalMarks: {
            midTerm: 18,
            assignment: 12,
            attendance: 8,
            total: 38,
            outOf: 50
        },

        announcementsCount: 3
    },

    {
        _id: "C002",
        courseCode: "CS302",
        courseName: "Database Management Systems",
        semester: 3,
        credits: 3,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/-VtXZeACJfG1YbEoyRDgHgEij3u96O-_uBppt0jv5m4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE3LzQ1LzE4Lzcy/LzM2MF9GXzE3NDUx/ODcyOTVfTWcySk1q/UTdHWjg0MHZSRDhO/ZkRnVVhZakZiSTln/d1kuanBn",

        faculty: {
            facultyId: "F102",
            name: "Prof. Neha Verma",
            email: "neha.verma@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Theory",
        status: "Active",

        enrolledStudents: 56,
        enrollmentLimit: 60,

        syllabusUnits: 4,
        progress: 54,

        attendance: {
            totalLectures: 24,
            present: 20,
            percentage: 83.33
        },

        assignments: {
            total: 4,
            submitted: 4,
            pending: 0
        },

        internalMarks: {
            midTerm: 16,
            assignment: 14,
            attendance: 7,
            total: 37,
            outOf: 50
        },

        announcementsCount: 2
    },

    {
        _id: "C003",
        courseCode: "CS303",
        courseName: "Operating Systems",
        semester: 3,
        credits: 4,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/6dDFAqH427CozQn3Upyv38tOWlIhoqz-mtDAk770A3U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzA1LzNl/L2M5LzA1M2VjOWVj/ZjRhNWMyMzAzZDQx/MDEwNTM0ZjhjY2Q0/LmpwZw",

        faculty: {
            facultyId: "F103",
            name: "Dr. Ajay Singh",
            email: "ajay.singh@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Theory",
        status: "Active",

        enrolledStudents: 54,
        enrollmentLimit: 60,

        syllabusUnits: 5,
        progress: 72,

        attendance: {
            totalLectures: 20,
            present: 18,
            percentage: 90
        },

        assignments: {
            total: 3,
            submitted: 2,
            pending: 1
        },

        internalMarks: {
            midTerm: 17,
            assignment: 10,
            attendance: 9,
            total: 36,
            outOf: 50
        },

        announcementsCount: 4
    },

    {
        _id: "C004",
        courseCode: "CS304",
        courseName: "Computer Networks",
        semester: 3,
        credits: 3,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/d440_utfP4KGTn9c-HJmJOwJO5Og_6rnPyDTi5JP-wo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIw/MDEyODcxNi9waG90/by9haS1wb3dlcnMt/YmlnLWRhdGEtYW5h/bHlzaXMtYW5kLWF1/dG9tYXRpb24td29y/a2Zsb3dzLXNob3dj/YXNpbmctbmV1cmFs/LW5ldHdvcmtzLWFu/ZC1kYXRhLndlYnA_/YT0xJmI9MSZzPTYx/Mng2MTImdz0wJms9/MjAmYz1XY3QzUnFz/dHVaaUhPRWV4ZDBr/U0ROdWZSSEpaX1pj/Q2VCVUFrYldLakRv/PQ",

        faculty: {
            facultyId: "F104",
            name: "Prof. Sneha Kulkarni",
            email: "sneha.kulkarni@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Theory",
        status: "Active",

        enrolledStudents: 55,
        enrollmentLimit: 60,

        syllabusUnits: 4,
        progress: 49,

        attendance: {
            totalLectures: 18,
            present: 16,
            percentage: 88.89
        },

        assignments: {
            total: 4,
            submitted: 3,
            pending: 1
        },

        internalMarks: {
            midTerm: 15,
            assignment: 11,
            attendance: 8,
            total: 34,
            outOf: 50
        },

        announcementsCount: 1
    },

    {
        _id: "C005",
        courseCode: "CS305",
        courseName: "Software Engineering",
        semester: 3,
        credits: 3,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/RDQYoMTg4OHfqo6TpK-h_CJ2Q9SdmuOW8etJGLDM93g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNjAxMTYx/MTI5NTUzNjU3MDcv/c29mdHdhcmVfZW5n/aW5lZXJpbmctMS53/ZWJw",

        faculty: {
            facultyId: "F105",
            name: "Dr. Pooja Nair",
            email: "pooja.nair@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Theory",
        status: "Active",

        enrolledStudents: 57,
        enrollmentLimit: 60,

        syllabusUnits: 4,
        progress: 61,

        attendance: {
            totalLectures: 22,
            present: 19,
            percentage: 86.36
        },

        assignments: {
            total: 6,
            submitted: 5,
            pending: 1
        },

        internalMarks: {
            midTerm: 14,
            assignment: 13,
            attendance: 7,
            total: 34,
            outOf: 50
        },

        announcementsCount: 5
    },

    {
        _id: "C006",
        courseCode: "CS306",
        courseName: "Web Development (MERN Stack)",
        semester: 3,
        credits: 4,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/JjlQdgButn6fYIhbOmFypGa-FzyNNNfyLeNjncH-JSw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9qYXJv/LXdlYnNpdGUuczMu/YXAtc291dGgtMS5h/bWF6b25hd3MuY29t/LzIwMjQvMDMvRmVh/dHVyZXMtb2YtTWVy/bi1zdGFjay1kZXZl/bG9wbWVudC1zZXJ2/aWNlcy1Zb3UtU2hv/dWxkLUtub3ctNzY4/eDM5Ny0xLnBuZw",

        faculty: {
            facultyId: "F106",
            name: "Prof. Kavita Joshi",
            email: "kavita.joshi@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Lab",
        status: "Active",

        enrolledStudents: 52,
        enrollmentLimit: 55,

        syllabusUnits: 6,
        progress: 80,

        attendance: {
            totalLectures: 16,
            present: 14,
            percentage: 87.5
        },

        assignments: {
            total: 5,
            submitted: 3,
            pending: 2
        },

        internalMarks: {
            midTerm: 19,
            assignment: 15,
            attendance: 8,
            total: 42,
            outOf: 50
        },

        announcementsCount: 6
    },

    {
        _id: "C007",
        courseCode: "CS307",
        courseName: "Artificial Intelligence Basics",
        semester: 3,
        credits: 3,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/WS_RkGrlcdDcpMzUEifAvjfBWASg6CUPkhN8fGLvDpY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZWxlYXJuaW5naW5k/dXN0cnkuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzAy/L1doYXQtaXMtQXJ0/aWZpY2lhbC1JbnRl/bGxpZ2VuY2UtTXVz/dC1Lbm93LUJhc2lj/cy1Gb3ItQmVnaW5u/ZXJzLmpwZw",

        faculty: {
            facultyId: "F107",
            name: "Dr. Arjun Mehta",
            email: "arjun.mehta@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Theory",
        status: "Active",

        enrolledStudents: 50,
        enrollmentLimit: 60,

        syllabusUnits: 4,
        progress: 45,

        attendance: {
            totalLectures: 14,
            present: 12,
            percentage: 85.71
        },

        assignments: {
            total: 4,
            submitted: 2,
            pending: 2
        },

        internalMarks: {
            midTerm: 12,
            assignment: 9,
            attendance: 7,
            total: 28,
            outOf: 50
        },

        announcementsCount: 2
    },

    {
        _id: "C008",
        courseCode: "CS308",
        courseName: "Cyber Security Fundamentals",
        semester: 3,
        credits: 3,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/3jC5YObdYokMQOFRVRU2hdQLak7eiSM9ooji0ZvgK_s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lY2N3/ZWIuczMuYXAtc291/dGgtMS5hbWF6b25h/d3MuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzExLzI2/MTAzOTA2L1doYXQt/QXJlLXRoZS1GdW5k/YW1lbnRhbHMtb2Yt/SW5mb3JtYXRpb24t/U2VjdXJpdHktMS0x/LnBuZw",

        faculty: {
            facultyId: "F108",
            name: "Prof. Ritesh Patel",
            email: "ritesh.patel@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Theory",
        status: "Active",

        enrolledStudents: 53,
        enrollmentLimit: 60,

        syllabusUnits: 4,
        progress: 55,

        attendance: {
            totalLectures: 15,
            present: 13,
            percentage: 86.67
        },

        assignments: {
            total: 3,
            submitted: 3,
            pending: 0
        },

        internalMarks: {
            midTerm: 15,
            assignment: 12,
            attendance: 8,
            total: 35,
            outOf: 50
        },

        announcementsCount: 3
    },

    {
        _id: "C009",
        courseCode: "CS309",
        courseName: "Cloud Computing",
        semester: 3,
        credits: 3,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/yLeTIpzdprqR2Gn_90Q-11z8-l7X0ZXRU3KOvo4Bq9A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjkv/NTkzLzExNC9zbWFs/bC9idXNpbmVzc21h/bi10b3VjaGVzLWNs/b3VkLWNvbXB1dGlu/Zy1jb25jZXB0LWZ1/dHVyaXN0aWMtdGVj/aG5vbG9neS1kaWdp/dGFsLWRhdGEtYW5h/bHlzaXMtYmlnLWRh/dGEtbmV0d29yay1j/b25uZWN0aW9uLWFi/c3RyYWN0LWJhY2tn/cm91bmQtcGhvdG8u/anBn",

        faculty: {
            facultyId: "F109",
            name: "Dr. Simran Kaur",
            email: "simran.kaur@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Theory",
        status: "Active",

        enrolledStudents: 48,
        enrollmentLimit: 60,

        syllabusUnits: 4,
        progress: 77,

        attendance: {
            totalLectures: 12,
            present: 11,
            percentage: 91.67
        },

        assignments: {
            total: 4,
            submitted: 4,
            pending: 0
        },

        internalMarks: {
            midTerm: 18,
            assignment: 14,
            attendance: 9,
            total: 41,
            outOf: 50
        },

        announcementsCount: 2
    },

    {
        _id: "C010",
        courseCode: "CS310",
        courseName: "DSA",
        semester: 3,
        credits: 2,
        department: "Computer Science",
        imageUrl:
            "https://imgs.search.brave.com/8k5mn4L85qWWUKc00Xfjtf5w6UEJtPFPXB9_06Bi9iI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZHNhLWxvZ28t/ZHNhLWxldHRlci1k/c2EtbGV0dGVyLWxv/Z28tZGVzaWduLWlu/aXRpYWxzLWRzYS1s/b2dvLWxpbmtlZC13/aXRoLWNpcmNsZS11/cHBlcmNhc2UtbW9u/b2dyYW0tbG9nby1k/c2EtdHlwb2dyYXBo/eS10ZWNobm9sb2d5/LWJ1c2luZXNzLXJl/YWwtZXN0YXRlLWJy/YW5kXzIyOTEyMC01/NTc5NS5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA",

        faculty: {
            facultyId: "F110",
            name: "Prof. Anjali Desai",
            email: "anjali.desai@college.edu"
        },

        academicYear: "2025-26",
        division: "A",
        courseType: "Lab",
        status: "Active",

        enrolledStudents: 45,
        enrollmentLimit: 50,

        syllabusUnits: 3,
        progress: 30,

        attendance: {
            totalLectures: 10,
            present: 9,
            percentage: 90
        },

        assignments: {
            total: 2,
            submitted: 1,
            pending: 1
        },

        internalMarks: {
            midTerm: 10,
            assignment: 8,
            attendance: 9,
            total: 27,
            outOf: 50
        },

        announcementsCount: 1
    }
];



const ViewCourses = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <nav className="mycourses-navbar">
                <div className="mycourses-left">
                    <MdCastForEducation className="mycourses-icon" />
                    <h1 className="mycourses-title">View Courses</h1>
                </div>

                <div className="mycourses-right">
                    <div className="info-block">
                        <span className="label">User:</span>
                        <span className="value">
                            {user?.firstName} {user?.lastName}
                        </span>
                    </div>

                    <div className="info-block">
                        <span className="label">Role:</span>
                        <span className="value">{user?.role}</span>
                    </div>

                    <div className="info-block">
                        <span className="label">Status:</span>
                        <span className={`value ${user ? "ok" : "bad"}`}>
                            {user ? "Available" : "Not available"}
                        </span>
                    </div>
                </div>
            </nav>
            <div>
                {/*  Course details*/}
                <div className="mycourses-content">
                    <div className="mycourses-header">
                        <div>
                            <h2>My Courses</h2>
                            <p className="subtext">Academic Year: 2025-26 • Semester 3</p>
                        </div>
                        <div className="search-box">
                            <IoIosSearch className="search-icon" />
                            <input type="search" placeholder="Search Cources...." />
                        </div>

                        <p className="count-text">{userData.length} Courses</p>
                    </div>

                    <div className="courses-grid">
                        {userData.map((course) => (
                            <div className="course-card" key={course._id}>
                                {/* Image */}
                                <div className="course-image">
                                    <img src={course.imageUrl} alt={course.courseName} />
                                    <span className="course-status">{course.status}</span>
                                </div>

                                {/*  Card Body */}
                                <div className="course-body">
                                    <h3 className="course-title">{course.courseName}</h3>

                                    <div className="course-badges">
                                        <span className="badge">{course.courseCode}</span>
                                        <span className="badge">Sem {course.semester}</span>
                                        <span className="badge">{course.credits} Credits</span>
                                        <span className="badge">{course.courseType}</span>
                                    </div>

                                    <p className="course-info">
                                        <b>Faculty:</b> {course.faculty.name}
                                    </p>

                                    {/*  Quick Stats */}
                                    <div className="course-stats">
                                        <div className="stat-box">
                                            <span className="stat-label">Attendance</span>
                                            <span className="stat-value">{course.attendance.percentage}%</span>
                                        </div>

                                        <div className="stat-box">
                                            <span className="stat-label">Pending</span>
                                            <span className="stat-value">{course.assignments.pending}</span>
                                        </div>

                                        <div className="stat-box">
                                            <span className="stat-label">Notices</span>
                                            <span className="stat-value">{course.announcementsCount}</span>
                                        </div>
                                    </div>

                                    {/*  Progress Bar */}
                                    <div className="progress-wrap">
                                        <div className="progress-top">
                                            <span className="progress-label">Syllabus Progress</span>
                                            <span className="progress-percent">{course.progress}%</span>
                                        </div>

                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/*  Actions */}
                                    <div className="course-actions">
                                        <button className="btn-primary">View Details</button>
                                        <button className="btn-outline">Assignments</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};

export default ViewCourses;
