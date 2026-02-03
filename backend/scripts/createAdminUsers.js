import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const createAdminUsers = async () => {
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

    // Create Test Admin (simple credentials for testing)
    const testAdminEmail = 'admin@test.com';
    const testAdminPassword = 'password123';

    let testAdmin = await User.findOne({ email: testAdminEmail });
    if (!testAdmin) {
      testAdmin = await User.create({
        email: testAdminEmail,
        password: testAdminPassword,
        role: 'SUPER_ADMIN',
        isActive: true,
        emailVerified: true
      });
      console.log('✅ Test Admin created successfully');
    } else {
      console.log('ℹ️  Test Admin already exists');
      // Update role if needed
      if (testAdmin.role !== 'SUPER_ADMIN') {
        testAdmin.role = 'SUPER_ADMIN';
        await testAdmin.save();
        console.log('✅ Test Admin role updated to SUPER_ADMIN');
      }
    }

    // Create Sample Faculty User (without profile)
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
      console.log('✅ Faculty user created successfully');
    } else {
      console.log('ℹ️  Faculty user already exists');
    }

    // Create Sample Student User (without profile)
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
      console.log('✅ Student user created successfully');
    } else {
      console.log('ℹ️  Student user already exists');
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
    console.log('🔐 Test Admin (Simple):');
    console.log('   Email:', testAdminEmail);
    console.log('   Password:', testAdminPassword);
    console.log('');
    console.log('🔐 Faculty:');
    console.log('   Email:', facultyEmail);
    console.log('   Password:', facultyPassword);
    console.log('');
    console.log('🔐 Student:');
    console.log('   Email:', studentEmail);
    console.log('   Password:', studentPassword);
    console.log('==========================================');
    console.log('\n💡 Note: Faculty and Student users are created without profiles.');
    console.log('   You can create profiles later through the admin dashboard.');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

createAdminUsers();