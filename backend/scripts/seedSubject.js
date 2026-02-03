import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Subject from '../src/models/Subject.js';
import Course from '../src/models/Course.js';
import Department from '../src/models/Department.js';
import Faculty from '../src/models/Faculty.js';

await mongoose.connect(env.MONGODB_URI);

const department = await Department.findOne({ code: 'CSE' });
const course = await Course.findOne({ code: 'CS201' });
const faculty = await Faculty.findOne({ employeeId: 'EMP001' });

if (!department || !course || !faculty) {
  throw new Error('Required data missing');
}

const subject = await Subject.create({
  name: 'Data Structures',
  code: 'DS101',
  course: course._id,
  department: department._id,
  semester: 6,
  credits: 4,
  facultyAssigned: [
    {
      faculty: '6980f74c4342b59b931559ad',
      academicYear: '2024-2025',
      section: 'A',
    },
  ],
});

console.log('Subject created:', subject._id);
process.exit(0);
