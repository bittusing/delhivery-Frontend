import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, X, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../config/api';

const KYCVerification = ({ onClose }) => {
  const { user } = useAuth();
  const [step, setStep] = useState('select'); // select, aadhaar-otp, aadhaar-verify, pan-verify
  const [verificationType, setVerificationType] = useState(''); // aadhaar or pan
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Aadhaar states
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [otp, setOtp] = useState('');

  // PAN states
  const [panNumber, setPanNumber] = useState('');
  const [nameAsPerPAN, setNameAsPerPAN] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSendAadhaarOTP = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/kyc/aadhaar/send-otp', {
        aadhaarNumber: aadhaarNumber
      });

      if (response.data.success) {
        setReferenceId(response.data.data.referenceId);
        setSuccess(response.data.data.message);
        setStep('aadhaar-verify');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAadhaarOTP = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/kyc/aadhaar/verify-otp', {
        referenceId: referenceId,
        otp: otp
      });

      if (response.data.success) {
        setSuccess('Aadhaar verified successfully! KYC completed.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPAN = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/kyc/pan/verify', {
        pan: panNumber,
        nameAsPerPAN: nameAsPerPAN,
        dateOfBirth: dateOfBirth
      });

      if (response.data.success) {
        setSuccess('PAN verified successfully! KYC completed.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify PAN');
    } finally {
      setLoading(false);
    }
  };

  if (user?.kycStatus === 'approved') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">KYC Verified!</h2>
            <p className="text-gray-600 mb-4">Your KYC verification is complete. You can now access all features.</p>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">KYC Verification</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {user?.kycStatus === 'pending' && (
          <div className="mb-6 flex items-center gap-2 text-orange-600 bg-orange-50 p-3 rounded-lg">
            <Clock className="w-5 h-5" />
            <span className="font-medium">KYC verification is pending review</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Step 1: Select Verification Type */}
        {step === 'select' && (
          <div className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Choose Verification Method</p>
                <p>Select Aadhaar or PAN card to complete your KYC verification instantly.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setVerificationType('aadhaar');
                  setStep('aadhaar-otp');
                }}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <Shield className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">Aadhaar Card</h3>
                <p className="text-sm text-gray-600">Verify using your Aadhaar number with OTP</p>
              </button>

              <button
                onClick={() => {
                  setVerificationType('pan');
                  setStep('pan-verify');
                }}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <Shield className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">PAN Card</h3>
                <p className="text-sm text-gray-600">Verify using your PAN card details</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Aadhaar OTP */}
        {step === 'aadhaar-otp' && (
          <div className="space-y-6">
            <button
              onClick={() => setStep('select')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to selection
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Number *
              </label>
              <input
                type="text"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                placeholder="Enter 12-digit Aadhaar number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={12}
              />
              <p className="text-xs text-gray-500 mt-1">OTP will be sent to your registered mobile number</p>
            </div>

            <button
              onClick={handleSendAadhaarOTP}
              disabled={loading || aadhaarNumber.length !== 12}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        )}

        {/* Step 3: Verify Aadhaar OTP */}
        {step === 'aadhaar-verify' && (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                OTP has been sent to your registered mobile number ending with ****
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP *
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('aadhaar-otp')}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Resend OTP
              </button>
              <button
                onClick={handleVerifyAadhaarOTP}
                disabled={loading || otp.length !== 6}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Complete KYC'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: PAN Verification */}
        {step === 'pan-verify' && (
          <div className="space-y-6">
            <button
              onClick={() => setStep('select')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to selection
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Number *
              </label>
              <input
                type="text"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase().slice(0, 10))}
                placeholder="Enter PAN number (e.g., ABCDE1234F)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                maxLength={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name as per PAN *
              </label>
              <input
                type="text"
                value={nameAsPerPAN}
                onChange={(e) => setNameAsPerPAN(e.target.value)}
                placeholder="Enter full name as per PAN card"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth *
              </label>
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="DD-MM-YYYY"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Format: DD-MM-YYYY (e.g., 15-08-1990)</p>
            </div>

            <button
              onClick={handleVerifyPAN}
              disabled={loading || !panNumber || !nameAsPerPAN || !dateOfBirth}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Complete KYC'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCVerification;
