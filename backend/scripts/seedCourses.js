import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Course from '../src/models/Course.js';

await mongoose.connect(env.MONGODB_URI);

const departmentId = 'DEPARTMENT_ID_HERE';

await Course.insertMany([
  {
    name: 'Data Structures',
    code: 'CS201',
    department: '6980f182afb78a197d5e8f5d',
    description: 'Core DS course',
    duration: { years: 4, semesters: 8 },
    degree: 'B_TECH',
    isActive: true,
  },
  {
    name: 'Database Management Systems',
    code: 'CS301',
    department: '6980f182afb78a197d5e8f5d',
    description: 'DBMS course',
    duration: { years: 4, semesters: 8 },
    degree: 'B_TECH',
    isActive: true,
  },
  {
    name: 'Archived Course',
    code: 'CS101',
    department: '6980f182afb78a197d5e8f5d',
    description: 'Old syllabus',
    duration: { years: 4, semesters: 8 },
    degree: 'B_TECH',
    isActive: false,
  },
]);

console.log('Courses seeded successfully');
process.exit(0);