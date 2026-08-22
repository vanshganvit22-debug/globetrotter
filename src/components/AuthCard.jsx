import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { TravelIllustration } from './TravelIllustration';
import { supabase } from '../supabaseClient';

export const AuthCard = ({ mode = 'login', setMode, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMsg('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        // Provide friendly message
        if (error.message.includes('Invalid login credentials')) {
          setErrorMsg('Invalid email or password. Please check your credentials.');
        } else if (error.message.includes('Email not confirmed')) {
          setErrorMsg('Please confirm your email address before signing in.');
        } else {
          setErrorMsg(error.message || 'Failed to sign in. Please try again.');
        }
      } else {
        setSuccessMsg('Welcome back! Signing you in...');
        if (onAuthSuccess) {
          onAuthSuccess(data?.user || { email: formData.email });
        }
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setErrorMsg(err.message || 'An unexpected error occurred. Please verify your Supabase settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMsg('Please accept the Terms of Service to continue.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message || 'Failed to create account.');
      } else {
        setSuccessMsg('Account created successfully! Check your email or sign in.');
        setTimeout(() => {
          setMode('login');
          setSuccessMsg('Account created! Please sign in with your credentials.');
        }, 1500);
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setErrorMsg(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        setErrorMsg(error.message || 'Google sign in failed. Ensure OAuth is configured in Supabase.');
      }
    } catch (err) {
      setErrorMsg('Google sign in error. Please check your Supabase OAuth settings.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrorMsg('Please enter your email address to reset password.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg('Password reset instructions sent to your email.');
      }
    } catch (err) {
      setErrorMsg('Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card-container">
      {/* Top Travel Illustration */}
      <TravelIllustration />

      {/* Card Header Title */}
      <div className="card-header-area">
        <h2 className="card-title">
          {mode === 'login' && 'Welcome Back'}
          {mode === 'register' && 'Create Account'}
          {mode === 'forgot' && 'Reset Password'}
        </h2>
        <div className="title-accent-bar"></div>
      </div>

      {/* Status Notifications */}
      {errorMsg && (
        <div className="alert-box alert-error" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="alert-box alert-success" role="alert">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* LOGIN FORM */}
      {mode === 'login' && (
        <form onSubmit={handleLogin} className="auth-form" noValidate>
          {/* Email Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email Address
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Mail className="w-4 h-4 text-[#7b8794]" />
              </span>
              <input
                id="login-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Lock className="w-4 h-4 text-[#7b8794]" />
              </span>
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-[#94a3b8] hover:text-[#475569]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#94a3b8] hover:text-[#475569]" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="forgot-password-row">
            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setMode('forgot');
              }}
              className="forgot-link"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Primary CTA */}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || googleLoading}
          >
            {loading ? (
              <span className="btn-inner-loading">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </span>
            ) : (
              <span className="btn-inner">
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="divider-row">
            <div className="divider-line"></div>
            <span className="divider-text">or</span>
            <div className="divider-line"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="btn-google"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#64748b]" />
            ) : (
              <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          {/* Toggle to Register */}
          <div className="auth-footer-prompt">
            <span>Need an account? </span>
            <button
              type="button"
              className="auth-footer-link"
              onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setMode('register');
              }}
            >
              Register
            </button>
          </div>
        </form>
      )}

      {/* REGISTER FORM */}
      {mode === 'register' && (
        <form onSubmit={handleRegister} className="auth-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-fullname">
              Full Name
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <User className="w-4 h-4 text-[#7b8794]" />
              </span>
              <input
                id="reg-fullname"
                name="fullName"
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">
              Email Address
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Mail className="w-4 h-4 text-[#7b8794]" />
              </span>
              <input
                id="reg-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">
              Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Lock className="w-4 h-4 text-[#7b8794]" />
              </span>
              <input
                id="reg-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Create a password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-[#94a3b8]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#94a3b8]" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm-password">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Lock className="w-4 h-4 text-[#7b8794]" />
              </span>
              <input
                id="reg-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="input-icon-right"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 text-[#94a3b8]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#94a3b8]" />
                )}
              </button>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="terms-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="custom-checkbox"
              />
              <span>
                I agree to the <a href="#terms" className="terms-link">Terms of Service</a> & <a href="#privacy" className="terms-link">Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* Register Primary CTA */}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || googleLoading}
          >
            {loading ? (
              <span className="btn-inner-loading">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </span>
            ) : (
              <span className="btn-inner">
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="divider-row">
            <div className="divider-line"></div>
            <span className="divider-text">or</span>
            <div className="divider-line"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="btn-google"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
          >
            <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Toggle to Sign In */}
          <div className="auth-footer-prompt">
            <span>Already have an account? </span>
            <button
              type="button"
              className="auth-footer-link"
              onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setMode('login');
              }}
            >
              Sign In
            </button>
          </div>
        </form>
      )}

      {/* FORGOT PASSWORD FORM */}
      {mode === 'forgot' && (
        <form onSubmit={handleForgotPassword} className="auth-form" noValidate>
          <p className="forgot-instructions">
            Enter your account email below, and we'll send you instructions to reset your password.
          </p>

          <div className="form-group">
            <label className="form-label" htmlFor="forgot-email">
              Email Address
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Mail className="w-4 h-4 text-[#7b8794]" />
              </span>
              <input
                id="forgot-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-inner-loading">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </span>
            ) : (
              <span className="btn-inner">
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

          <div className="auth-footer-prompt">
            <button
              type="button"
              className="auth-footer-link"
              onClick={() => {
                setErrorMsg('');
                setSuccessMsg('');
                setMode('login');
              }}
            >
              &larr; Back to Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
