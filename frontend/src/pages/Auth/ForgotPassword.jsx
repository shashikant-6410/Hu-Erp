import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, ArrowLeft, Loader2, GraduationCap, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
    const [step, setStep] = useState('email'); // 'email' | 'otp' | 'success'
    const [resetEmail, setResetEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { sendPasswordResetOtp, verifyPasswordResetOtp } = useAuth();

    // Schemas for different steps
    const emailSchema = z.object({
        email: z.string().email('Invalid email address'),
    });

    const otpSchema = z.object({
        otp: z.string().length(6, 'OTP must be 6 digits'),
    });

    const getCurrentSchema = () => {
        return step === 'email' ? emailSchema : otpSchema;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(getCurrentSchema()),
    });

    const handleSendOtp = async (data) => {
        setIsLoading(true);
        try {
            await sendPasswordResetOtp(data.email);
            setResetEmail(data.email);
            setStep('otp');
            reset({ otp: '' });
        } catch (error) {
            console.error('Failed to send reset OTP:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (data) => {
        setIsLoading(true);
        try {
            const result = await verifyPasswordResetOtp(resetEmail, data.otp);
            if (result?.resetToken) {
                // Redirect to reset password page with token
                window.location.href = `/reset-password?token=${result.resetToken}`;
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (data) => {
        if (step === 'email') {
            handleSendOtp(data);
        } else {
            handleVerifyOtp(data);
        }
    };

    const goBackToEmail = () => {
        setStep('email');
        reset();
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
                        Reset Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {step === 'email' 
                            ? 'Enter your email to receive a reset code'
                            : 'Enter the verification code sent to your email'
                        }
                    </p>
                </div>

                {/* Form */}
                <div className="card">
                    <div className="card-body space-y-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            
                            {/* Email Step */}
                            {step === 'email' && (
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
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
                                            placeholder="student@huroorkee.ac.in"
                                            autoFocus
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-danger-600">{errors.email.message}</p>
                                    )}
                                </div>
                            )}

                            {/* OTP Step */}
                            {step === 'otp' && (
                                <div>
                                    <div className="mb-4 text-center">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Enter the 6-digit code sent to <br />
                                            <span className="font-medium text-gray-900 dark:text-gray-200">{resetEmail}</span>
                                        </p>
                                        <button
                                            type="button"
                                            onClick={goBackToEmail}
                                            className="mt-1 text-xs text-primary-600 hover:text-primary-500 hover:underline"
                                        >
                                            Change email
                                        </button>
                                    </div>

                                    <label
                                        htmlFor="otp"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Verification Code
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            {...register('otp')}
                                            type="text"
                                            maxLength={6}
                                            className={`input pl-10 tracking-widest text-center text-lg ${errors.otp ? 'input-error' : ''}`}
                                            placeholder="123456"
                                            autoFocus
                                        />
                                    </div>
                                    {errors.otp && (
                                        <p className="mt-1 text-sm text-danger-600">{errors.otp.message}</p>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                        {step === 'email' ? 'Sending Code...' : 'Verifying...'}
                                    </>
                                ) : (
                                    <>
                                        {step === 'email' ? 'Send Reset Code' : 'Verify Code'}
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Back to Login */}
                        <div className="text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;