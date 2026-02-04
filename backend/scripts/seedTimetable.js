import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Timetable from '../src/models/Timetable.js';
import Subject from '../src/models/Subject.js';
import Faculty from '../src/models/Faculty.js';
import Course from '../src/models/Course.js';
import Student from '../src/models/Student.js';

await mongoose.connect(env.MONGODB_URI);

const subject = await Subject.findOne({ code: 'DS101' });
const faculty = await Faculty.findOne({ employeeId: 'EMP001' });
const course = await Course.findOne({ code: 'CS201' });
const student = await Student.findOne({ enrollmentNumber: 'ENR2023001' });

if (!subject || !faculty || !course) {
  throw new Error('Subject / Faculty / Course missing');
}

await Timetable.insertMany([
   {
    subject: subject._id,
    faculty: faculty._id,
    course: student.course,          // ✅ SAME AS STUDENT
    semester: student.currentSemester, // ✅ SAME AS STUDENT
    academicYear: '2024-2025',
    dayOfWeek: 'WEDNESDAY',           // must match today
    startTime: '09:00',
    endTime: '10:00',
    room: 'Lab 101',
    type: 'PRACTICAL',
  },
   {
    subject: subject._id,
    faculty: faculty._id,
    course: student.course,          // ✅ SAME AS STUDENT
    semester: student.currentSemester, // ✅ SAME AS STUDENT
    academicYear: '2024-2025',
    dayOfWeek: 'WEDNESDAY',           // must match today
    startTime: '11:00',
    endTime: '12:00',
    room: 'Room 202',
    type: 'THEORY',
  },
]);

console.log('Timetable seeded for today');
process.exit(0);