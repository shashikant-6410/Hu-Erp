import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Faculty from '../src/models/Faculty.js';
import User from '../src/models/User.js';
import Department from '../src/models/Department.js';

await mongoose.connect(env.MONGODB_URI);

// 1️⃣ Get existing department
const department = await Department.findOne({ code: 'CSE' });
if (!department) {
  throw new Error('Department not found');
}

// 2️⃣ Create a user for faculty (required)
const facultyUser = await User.create({
  email: 'faculty1@erp.com',
  password: 'Test@12345', // REQUIRED
  role: 'FACULTY',
  isVerified: true,
});


// 3️⃣ Create faculty
const faculty = await Faculty.create({
  user: facultyUser._id,
  employeeId: 'EMP001',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: new Date('1985-01-01'),
  gender: 'MALE',
  phone: '9999999999',
  department: department._id,
  designation: 'ASSISTANT_PROFESSOR',
  qualification: 'M_TECH',
});

console.log('Faculty created:', faculty._id);
process.exit(0);