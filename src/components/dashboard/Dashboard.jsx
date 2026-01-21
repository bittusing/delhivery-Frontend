import { useState } from "react";
import { Shield, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import KYCVerification from "../KYCVerification";
import UpcomingPickups from "../UpcomingPickups";
import PerformanceGraph from "./PerformanceGraph";
import Topheader from "./Topheader";
import UpcomingPickupsCard from "./UpcomingPickupsCard";
import YourPerformanceCard from "./YourPerformanceCard";

const Dashboard = () => {
  const { user } = useAuth();
  const [showKYCModal, setShowKYCModal] = useState(false);

  // If KYC is not approved, show KYC verification screen
  if (user?.kycStatus !== 'approved') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-2xl w-full">
          {/* KYC Required Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Verification Required</h2>
              <p className="text-gray-600">
                Complete KYC verification to create orders and start shipping with us.
              </p>
            </div>

            {/* Why KYC Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-2">Why do we need KYC?</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Ensure secure and compliant transactions</li>
                    <li>• Prevent fraud and unauthorized access</li>
                    <li>• Meet regulatory requirements</li>
                    <li>• Protect your account and data</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            {user?.kycStatus === 'pending' && (
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  KYC Under Review
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your KYC documents are being reviewed. This usually takes 24-48 hours.
                </p>
              </div>
            )}

            {user?.kycStatus === 'rejected' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium mb-4">
                  Your KYC was rejected. Please submit again with correct documents.
                </p>
              </div>
            )}

            {user?.kycStatus === 'not_started' && (
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Get started by completing your KYC verification in just a few minutes.
                </p>
              </div>
            )}

            {/* Action Button - Always show for not_started, pending and rejected */}
            <button
              onClick={() => setShowKYCModal(true)}
              disabled={user?.kycStatus === 'pending'}
              className={`w-full max-w-md mx-auto block px-8 py-4 rounded-lg transition-colors font-bold text-lg shadow-lg ${
                user?.kycStatus === 'pending'
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {user?.kycStatus === 'pending' 
                ? 'Verification in Progress...' 
                : 'Complete KYC Verification'}
            </button>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Your information is secure and will be used only for verification purposes.
              </p>
            </div>
          </div>

          {/* KYC Modal */}
          {showKYCModal && (
            <KYCVerification onClose={() => setShowKYCModal(false)} />
          )}
        </div>
      </div>
    );
  }

  // If KYC is approved, show normal dashboard
  return (
    <div className="min-h-screen" style={{ pointerEvents: 'auto' }}>
      <Topheader />
      <UpcomingPickupsCard />
      {/* <UpcomingPickups /> */}
      <PerformanceGraph />
      {/* <YourPerformanceCard data={mockChartData} title="Your Performance" /> */}
    </div>
  );
};

export default Dashboard;
