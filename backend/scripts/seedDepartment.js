import mongoose from 'mongoose';
import env from '../src/config/env.js';
import Department from '../src/models/Department.js';

await mongoose.connect(env.MONGODB_URI);

const department = await Department.create({
  name: 'Computer Science',
  code: 'CSE',
  description: 'Department of Computer Science',
});

console.log('Department ID:', department._id);
process.exit(0);