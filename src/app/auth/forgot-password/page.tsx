'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ChefHat, CheckCircle } from 'lucide-react';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock success
            setIsSubmitted(true);
        } catch (err) {
            setError('Failed to send reset email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cream-50 to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <Link href="/" className="inline-flex items-center space-x-2 group mb-8">
                            <ChefHat className="h-10 w-10 text-primary-600 group-hover:text-primary-700 transition-colors" />
                            <span className="text-2xl font-bold text-gray-800">Foodies Kitchen</span>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="mb-6">
                            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
                            <p className="text-gray-600">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                                Didn't receive the email? Check your spam folder or try again.
                            </p>

                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
                            >
                                Try different email
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back to login</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream-50 to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center space-x-2 group mb-8">
                        <ChefHat className="h-10 w-10 text-primary-600 group-hover:text-primary-700 transition-colors" />
                        <span className="text-2xl font-bold text-gray-800">Foodies Kitchen</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Your Password</h2>
                    <p className="text-gray-600">Enter your email to receive a reset link</p>
                </div>

                {/* Reset Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-6 text-center border-t border-gray-200 pt-6">
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;