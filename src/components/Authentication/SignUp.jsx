import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.termsAccepted) {
      setError('You must accept the terms and conditions');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        termsAccepted: formData.termsAccepted
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Side: Branding and Illustration */}
        <div className="hidden lg:flex flex-col h-full justify-between">
          <div className="mb-12">
            <img src='./images/logoAuth.png' alt='logo' className='w-40'/>
          </div>

          {/* Illustration Container */}
          <div className="relative flex-1 flex items-center justify-center">
            <img 
              src="./images/authImage.png" 
              alt="Logistics" 
              className="w-full max-w-xl object-contain"
            />
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 max-w-xl mx-auto lg:ml-auto w-full">
          <h2 className="text-2xl font-bold text-[#1a2b4b] mb-2">Reliable Shipping Starts Here</h2>
          <div className="h-1 w-full bg-slate-100 mb-8 rounded-full"></div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-[#1a2b4b] mb-2">Your name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full bg-slate-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-[#1a2b4b] mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@example.com"
                className="w-full bg-slate-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-bold text-[#1a2b4b] mb-2">Phone Number</label>
              <div className="flex gap-2">
                <div className="bg-slate-100 rounded-xl p-4 text-sm text-[#1a2b4b] font-medium min-w-[60px] text-center">
                  +91
                </div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="flex-1 bg-slate-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-[#1a2b4b] mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 character"
                  className="w-full bg-slate-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-12"
                  required
                  minLength={6}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-bold text-[#1a2b4b] mb-2">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full bg-slate-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all pr-12"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 w-5 h-5 rounded border-slate-300 text-[#1a2b4b] focus:ring-[#1a2b4b]"
                required
              />
              <p className="text-xs text-slate-500 leading-relaxed">
                By clicking on Create Account, you agree to OneDelivery's{' '}
                <Link to="/terms-conditions" className="text-blue-600 font-medium hover:underline">Terms & Conditions</Link> and{' '}
                <a href="#" className="text-blue-600 font-medium hover:underline">Privacy Policy</a>
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a2b4b] text-white font-bold py-4 rounded-xl hover:bg-[#253a63] transition-colors shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;