import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";
import Course from "../models/Course.js";
import Payment from "../models/Payment.js";
import Attendance from "../models/Attendance.js";
import Timetable from '../models/Timetable.js';

import Fee from '../models/Fee.js';

import { asyncHandler } from "../middlewares/errorHandler.js";

class DashboardController {
  getStats = asyncHandler(async (req, res) => {
    const [totalStudents, totalFaculty, activeCourses, payments] =
      await Promise.all([
        Student.countDocuments({ isDeleted: false }),
        Faculty.countDocuments({ isDeleted: false }),
        Course.countDocuments({ isDeleted: false, isActive: true }),
        Payment.find({ status: "SUCCESS" }).select("amount"), // Simple implementation for total revenue or similar if needed. Or just count.
      ]);

    // Calculate something like attendance rate or revenue?
    // For now, let's just return the counts requested by the UI.
    // UI has: Total Students, Faculty Members, Active Courses, Attendance Rate (Mock for now or 0)

    res.json({
      success: true,
      data: {
        totalStudents,
        totalFaculty,
        activeCourses,
        attendanceRate: 0, // Placeholder as we don't have attendance module yet
      },
    });
  });

  getStudentDashboard = asyncHandler(async (req, res) => {
  // 1️⃣ Find student from logged-in user
  const student = await Student.findOne({ user: req.user.id });

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student profile not found',
    });
  }

  const studentId = student._id;

  // 2️⃣ Active courses
  const activeCourses = await Course.countDocuments({
    isActive: true,
  });

  // 3️⃣ Attendance aggregation
  const result = await Attendance.aggregate([
    { $match: { student: studentId } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        present: {
          $sum: {
            $cond: [{ $in: ['$status', ['PRESENT', 'LATE']] }, 1, 0],
          },
        },
      },
    },
  ]);

  const total = result[0]?.total || 0;
  const present = result[0]?.present || 0;
  const attendance = total === 0 ? 0 : Math.round((present / total) * 100);
  

  // Pending Fees calculation
// 4️⃣ Fee & payment aggregation
const fee = await Fee.findOne({
  course: student.course,
  semester: student.currentSemester,
  academicYear: '2024-2025',
});

let pendingFees = 0;

if (fee) {
  const payments = await Payment.aggregate([
    {
      $match: {
        student: student._id,
        fee: fee._id,
        status: 'SUCCESS',
      },
    },
    {
      $group: {
        _id: null,
        paid: { $sum: '$amount' },
      },
    },
  ]);

  const paidAmount = payments[0]?.paid || 0;
  pendingFees = Math.max(fee.totalAmount - paidAmount, 0);
}
res.status(200).json({
  success: true,
  data: {
    attendance,
    cgpa: 0,
    pendingFees,   // ✅ REAL DATA
    activeCourses,
  },
});

});

getTodaySchedule = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ user: req.user.id });

  const today = new Date()
    .toLocaleString('en-US', { weekday: 'long' })
    .toUpperCase();

  const schedule = await Timetable.find({
    course: student.course,
    semester: student.currentSemester,
    dayOfWeek: today,
  })
    .populate('subject', 'name')
    .populate('faculty', 'firstName lastName')
    .sort({ startTime: 1 });

  res.status(200).json({
    success: true,
    data: schedule.map((item) => ({
      subject: item.subject.name,
      time: `${item.startTime} - ${item.endTime}`,
      room: item.room,
      type: item.type,
      faculty: `${item.faculty.firstName} ${item.faculty.lastName}`,
    })),
  });
});


}

export default new DashboardController();
