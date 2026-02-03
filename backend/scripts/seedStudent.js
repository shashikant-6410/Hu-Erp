import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Student from '../src/models/Student.js';
import User from '../src/models/User.js';
import Department from '../src/models/Department.js';
import Course from '../src/models/Course.js';

await mongoose.connect(env.MONGODB_URI);

// 1️⃣ Find existing student user (OTP login user)
const user = await User.findOne({ role: 'STUDENT' });
if (!user) {
  throw new Error('Student user not found');
}

// 2️⃣ Find department & course
const department = await Department.findOne({ code: 'CSE' });
const course = await Course.findOne({ code: 'CS201' });

if (!department || !course) {
  throw new Error('Department or Course missing');
}

// 3️⃣ Create student profile
const student = await Student.create({
  user: user._id,
  enrollmentNumber: 'ENR2023001',
  firstName: 'Milan',
  lastName: 'Chauhan',
  dateOfBirth: new Date('2003-01-01'),
  gender: 'MALE',
  phone: '8888888888',
  guardianName: 'Guardian Name',
  guardianPhone: '7777777777',
  guardianRelation: 'FATHER',
  department: department._id,
  course: course._id,
  currentSemester: 6,
  section: 'A',
  batch: '2023-2027',
});

console.log('Student created:', student._id);
process.exit(0);