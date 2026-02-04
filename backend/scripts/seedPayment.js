import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Payment from '../src/models/Payment.js';
import Student from '../src/models/Student.js';
import Fee from '../src/models/Fee.js';

await mongoose.connect(env.MONGODB_URI);

const student = await Student.findOne();
const fee = await Fee.findOne();

if (!student || !fee) throw new Error('Student or Fee missing');

await Payment.create({
  student: student._id,
  fee: fee._id,
  amount: 40000,
  method: 'ONLINE',
  status: 'SUCCESS',
  semester: 6,
  academicYear: '2024-2025',
});

console.log('Payment seeded');
process.exit(0);