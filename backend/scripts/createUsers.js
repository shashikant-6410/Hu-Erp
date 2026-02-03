import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Student from '../src/models/Student.js';
import Faculty from '../src/models/Faculty.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hu-erp');
    console.log('Connected to MongoDB');

    // Create Super Admin
    const superAdminEmail = 'superadmin@huroorkee.ac.in';
    const superAdminPassword = 'SuperAdmin@123';

    let superAdmin = await User.findOne({ email: superAdminEmail });
    if (!superAdmin) {
      superAdmin = await User.create({
        email: superAdminEmail,
        password: superAdminPassword,
        role: 'SUPER_ADMIN',
        isActive: true,
        emailVerified: true
      });
      console.log('✅ Super Admin created successfully');
    } else {
      console.log('ℹ️  Super Admin already exists');
    }

    // Create Regular Admin
    const adminEmail = 'admin@huroorkee.ac.in';
    const adminPassword = 'Admin@123';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        email: adminEmail,
        password: adminPassword,
        role: 'ADMIN',
        isActive: true,
        emailVerified: true
      });
      console.log('✅ Admin created successfully');
    } else {
      console.log('ℹ️  Admin already exists');
    }

    // Create Sample Faculty
    const facultyEmail = 'faculty@huroorkee.ac.in';
    const facultyPassword = 'Faculty@123';

    let faculty = await User.findOne({ email: facultyEmail });
    if (!faculty) {
      faculty = await User.create({
        email: facultyEmail,
        password: facultyPassword,
        role: 'FACULTY',
        isActive: true,
        emailVerified: true
      });

      // Create Faculty profile
      await Faculty.create({
        user: faculty._id,
        employeeId: 'FAC001',
        firstName: 'John',
        lastName: 'Doe',
        department: 'Computer Science',
        designation: 'Professor',
        qualification: 'Ph.D. Computer Science',
        experience: 10,
        specialization: 'Data Structures, Algorithms',
        phone: '+91-9876543210',
        address: {
          street: '123 Faculty Street',
          city: 'Haridwar',
          state: 'Uttarakhand',
          pincode: '249401',
          country: 'India'
        }
      });

      console.log('✅ Faculty created successfully');
    } else {
      console.log('ℹ️  Faculty already exists');
    }

    // Create Sample Student
    const studentEmail = 'student@huroorkee.ac.in';
    const studentPassword = 'Student@123';

    let student = await User.findOne({ email: studentEmail });
    if (!student) {
      student = await User.create({
        email: studentEmail,
        password: studentPassword,
        role: 'STUDENT',
        isActive: true,
        emailVerified: true
      });

      // Create Student profile
      await Student.create({
        user: student._id,
        enrollmentNumber: 'HU2024001',
        rollNumber: 'CS001',
        firstName: 'Jane',
        lastName: 'Smith',
        course: 'B.Tech Computer Science',
        semester: 6,
        batch: '2021-2025',
        admissionDate: new Date('2021-08-01'),
        phone: '+91-9876543211',
        address: {
          street: '456 Student Street',
          city: 'Haridwar',
          state: 'Uttarakhand',
          pincode: '249401',
          country: 'India'
        },
        guardianDetails: {
          name: 'Robert Smith',
          relation: 'Father',
          phone: '+91-9876543212',
          email: 'robert.smith@email.com'
        }
      });

      console.log('✅ Student created successfully');
    } else {
      console.log('ℹ️  Student already exists');
    }

    console.log('\n📋 Login Credentials:');
    console.log('==========================================');
    console.log('🔐 Super Admin:');
    console.log('   Email:', superAdminEmail);
    console.log('   Password:', superAdminPassword);
    console.log('');
    console.log('🔐 Admin:');
    console.log('   Email:', adminEmail);
    console.log('   Password:', adminPassword);
    console.log('');
    console.log('🔐 Faculty:');
    console.log('   Email:', facultyEmail);
    console.log('   Password:', facultyPassword);
    console.log('');
    console.log('🔐 Student:');
    console.log('   Email:', studentEmail);
    console.log('   Password:', studentPassword);
    console.log('==========================================');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

createUsers();