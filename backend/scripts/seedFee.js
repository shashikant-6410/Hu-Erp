import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Fee from '../src/models/Fee.js';
import Course from '../src/models/Course.js';

await mongoose.connect(env.MONGODB_URI);

const course = await Course.findOne({ code: 'CS201' });
if (!course) throw new Error('Course not found');

const fee = await Fee.create({
  course: course._id,
  semester: 6,
  academicYear: '2024-2025',
  components: {
    tuitionFee: 50000,
    labFee: 5000,
    libraryFee: 2000,
    examFee: 3000,
  },
  dueDate: new Date('2025-03-31'),
});

console.log('Fee created:', fee.totalAmount);
process.exit(0);
