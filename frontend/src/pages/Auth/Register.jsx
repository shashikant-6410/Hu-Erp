import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, User, Loader2, GraduationCap, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const registerSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    role: z.enum(['STUDENT', 'FACULTY'], {
        errorMap: () => ({ message: 'Please select a role' }),
    }),
});

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'STUDENT'
        }
    });

    const selectedRole = watch('role');

    const onSubmit = async (data) => {
        console.log('=== FORM SUBMISSION DEBUG ===');
        console.log('Raw form data:', data);
        console.log('firstName:', data.firstName);
        console.log('lastName:', data.lastName);
        console.log('email:', data.email);
        console.log('role:', data.role);
        
        setIsLoading(true);
        try {
            const registrationData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                role: data.role
            };
            console.log('Final registration data:', registrationData);
            const result = await registerUser(registrationData);
            
            // Navigate to dashboard based on role after successful registration
            if (result && result?.user?.role) {
                if (result?.user?.role === 'STUDENT') {
                    navigate('/student/dashboard');
                } else if (result?.user?.role === 'FACULTY') {
                    navigate('/faculty/dashboard');
                } else if (result?.user?.role === 'ADMIN' || result?.user?.role === 'SUPER_ADMIN') {
                    navigate('/admin/dashboard');
                }
            }
        } catch (error) {
            console.error('Registration failed:', error);
            console.error('Error response:', error.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary-600 rounded-2xl shadow-lg">
                            <GraduationCap className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Join Haridwar University ERP Portal
                    </p>
                </div>

                {/* Register Form */}
                <div className="card">
                    <div className="card-body space-y-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Role Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${selectedRole === 'STUDENT' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                    <input
                                        type="radio"
                                        value="STUDENT"
                                        className="sr-only"
                                        {...register('role')}
                                    />
                                    <GraduationCap className={`h-6 w-6 ${selectedRole === 'STUDENT' ? 'text-primary-600' : 'text-gray-400'}`} />
                                    <span className="text-sm font-medium">Student</span>
                                </label>

                                <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${selectedRole === 'FACULTY' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                    <input
                                        type="radio"
                                        value="FACULTY"
                                        className="sr-only"
                                        {...register('role')}
                                    />
                                    <Briefcase className={`h-6 w-6 ${selectedRole === 'FACULTY' ? 'text-primary-600' : 'text-gray-400'}`} />
                                    <span className="text-sm font-medium">Faculty</span>
                                </label>
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            {...register('firstName')}
                                            type="text"
                                            className={`input pl-10 ${errors.firstName ? 'input-error' : ''}`}
                                            placeholder="First name"
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-danger-600">{errors.firstName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            {...register('lastName')}
                                            type="text"
                                            className={`input pl-10 ${errors.lastName ? 'input-error' : ''}`}
                                            placeholder="Last name"
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-danger-600">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                                        placeholder={selectedRole === 'STUDENT' ? 'student@huroorkee.ac.in' : 'faculty@huroorkee.ac.in'}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-danger-600">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        {...register('password')}
                                        type="password"
                                        className={`input pl-10 ${errors.password ? 'input-error' : ''}`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-danger-600">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-primary-600 hover:text-primary-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
