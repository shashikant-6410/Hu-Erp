import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Attendance from '../src/models/Attendance.js';
import Student from '../src/models/Student.js';
import Subject from '../src/models/Subject.js';
import Faculty from '../src/models/Faculty.js';

await mongoose.connect(env.MONGODB_URI);

const student = await Student.findOne(); // logged-in student
const subject = await Subject.findOne({ code: 'DS101' });
const faculty = await Faculty.findOne({ employeeId: 'EMP001' });

if (!student || !subject || !faculty) {
  throw new Error('Missing student / subject / faculty');
}

const records = [
  { status: 'PRESENT' },
  { status: 'PRESENT' },
  { status: 'PRESENT' },
  { status: 'PRESENT' },
  { status: 'ABSENT' },
];

const attendanceDocs = records.map((r, i) => ({
  student: student._id,
  subject: subject._id,
  faculty: faculty._id,
  date: new Date(2025, 0, i + 1),
  status: r.status,
  semester: 6,
  academicYear: '2024-2025',
}));

await Attendance.insertMany(attendanceDocs);

console.log('Attendance seeded');
process.exit(0);
