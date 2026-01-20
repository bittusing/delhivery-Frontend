import React, { useState } from 'react';
import { AlertCircle, Shield, FileCheck } from 'lucide-react';
import KYCVerification from './KYCVerification';
import { useAuth } from '../hooks/useAuth';

const KYCGuard = ({ children, message = "KYC verification is required to access this feature." }) => {
  const { user } = useAuth();
  const [showKYCModal, setShowKYCModal] = useState(false);

  // If KYC is approved, render children
  if (user?.kycStatus === 'approved') {
    return children;
  }

  // If KYC is not approved, show verification required message
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">KYC Verification Required</h3>
          <p className="text-gray-600 mb-6">{message}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800 text-left">
              <p className="font-medium mb-1">Why do we need KYC?</p>
              <ul className="space-y-1 text-xs">
                <li>• Ensure secure and compliant transactions</li>
                <li>• Prevent fraud and unauthorized access</li>
                <li>• Meet regulatory requirements</li>
                <li>• Protect your account and data</li>
              </ul>
            </div>
          </div>
        </div>

        {user?.kycStatus === 'pending' ? (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-orange-700">
              <FileCheck className="w-5 h-5" />
              <span className="font-medium">KYC Under Review</span>
            </div>
            <p className="text-sm text-orange-600 mt-2">
              Your KYC documents are being reviewed. This usually takes 24-48 hours.
            </p>
          </div>
        ) : (
          <button
            onClick={() => setShowKYCModal(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Complete KYC Verification
          </button>
        )}

        {showKYCModal && (
          <KYCVerification onClose={() => setShowKYCModal(false)} />
        )}
      </div>
    </div>
  );
};

export default KYCGuard;