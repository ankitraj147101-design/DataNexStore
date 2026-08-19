'use client';

import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useStore } from '@/store/useStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'otp'>('signin');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('phone');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('9911371218');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loginAs = useStore((state) => state.loginAs);
  const updateUserProfile = useStore((state) => state.updateUserProfile);
  const registerCustomer = useStore((state) => state.registerCustomer);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setOtpSent(true);
    setSuccess(`OTP sent successfully to +91 ${phone} via WhatsApp`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('Please enter the 4-digit verification code');
      return;
    }
    registerCustomer({
      name: 'Store Customer',
      email: `customer_${phone}@datanexstore.in`,
      phone: phone
    });
    loginAs('customer');
    if (phone) {
      updateUserProfile({ phone: `+91 ${phone}` });
    }
    setSuccess('Signed in successfully! Welcome to Datanexstore.');
    setTimeout(() => {
      onClose();
      setError('');
      setSuccess('');
    }, 800);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }
    registerCustomer({
      name: email.split('@')[0],
      email: email,
      phone: phone || '9911371218'
    });
    loginAs('customer');
    updateUserProfile({ email });
    setSuccess('Signed in successfully! Welcome back.');
    setTimeout(() => {
      onClose();
      setError('');
      setSuccess('');
    }, 800);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setError('Please fill in all required fields');
      return;
    }
    const [firstName, ...rest] = fullName.split(' ');
    registerCustomer({
      name: fullName,
      email: email,
      phone: phone
    });
    loginAs('customer');
    updateUserProfile({
      firstName: firstName || 'Customer',
      lastName: rest.join(' ') || '',
      email,
      phone: `+91 ${phone}`
    });
    setSuccess('Account created successfully! Welcome to Datanexstore.');
    setTimeout(() => {
      onClose();
      setError('');
      setSuccess('');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-sky-400 flex items-center justify-center mx-auto shadow-sm">
            <Zap className="w-6 h-6 fill-sky-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {authMode === 'signup' ? 'Create Datanexstore Account' : 'Sign In to Datanexstore'}
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            {authMode === 'signup'
              ? 'Join India’s premier destination for high-end electronics'
              : 'Access your orders, invoices, air tracking & wishlist'}
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex p-1 bg-slate-100 rounded-2xl font-mono text-xs">
          <button
            onClick={() => {
              setAuthMode('signin');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 rounded-xl font-bold transition ${
              authMode === 'signin'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthMode('signup');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2 rounded-xl font-bold transition ${
              authMode === 'signup'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error / Success Feedback */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-mono">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{success}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {authMode === 'signin' && (
          <div className="space-y-4">
            {/* Phone OTP vs Email Toggle */}
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-500 border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('phone');
                  setOtpSent(false);
                }}
                className={`font-bold transition ${
                  loginMethod === 'phone' ? 'text-sky-600 border-b-2 border-sky-600 pb-1' : 'hover:text-slate-800'
                }`}
              >
                WhatsApp / Mobile OTP
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`font-bold transition ${
                  loginMethod === 'email' ? 'text-sky-600 border-b-2 border-sky-600 pb-1' : 'hover:text-slate-800'
                }`}
              >
                Email & Password
              </button>
            </div>

            {/* Mobile OTP Login */}
            {loginMethod === 'phone' && !otpSent && (
              <form onSubmit={handlePhoneSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Mobile / WhatsApp Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9911371218"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength={10}
                      className="w-full bg-slate-50 text-xs text-slate-900 pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-xs font-mono"
                >
                  <span>Send OTP via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Verify OTP */}
            {loginMethod === 'phone' && otpSent && (
              <form onSubmit={handleVerifyOtp} className="space-y-3 animate-in fade-in">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Enter 4-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8941"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full bg-slate-50 text-center text-lg tracking-widest text-slate-900 py-2.5 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono font-black"
                  />
                  <div className="text-[11px] text-slate-500 font-mono mt-1 text-center">
                    Enter any 4 digits to verify your WhatsApp account.
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-xs font-mono"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Sign In</span>
                </button>
              </form>
            )}

            {/* Email Login */}
            {loginMethod === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="customer@datanexstore.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-3 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-3 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-xs font-mono"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* SIGN UP FORM */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">WhatsApp Number *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 font-mono">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="9911371218"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={10}
                  className="w-full bg-slate-50 text-xs text-slate-900 pl-12 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="customer@datanexstore.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Create Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-xs font-mono"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Security Assurance */}
        <div className="text-[11px] text-slate-400 font-mono text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>256-Bit SSL Encrypted Authentication</span>
        </div>
      </div>
    </div>
  );
}
