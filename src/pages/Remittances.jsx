import React, { useState, useEffect } from 'react';
import { Building2, Plus, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../config/api';

const Remittances = () => {
  const [bankAccount, setBankAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    accountType: 'savings'
  });

  useEffect(() => {
    fetchBankAccount();
  }, []);

  const fetchBankAccount = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bank-account');
      if (response.data.data) {
        setBankAccount(response.data.data);
      } else {
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error fetching bank account:', error);
      setShowForm(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      setError('Account numbers do not match');
      return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
      setError('Invalid IFSC code format');
      return;
    }

    try {
      setSaving(true);
      const response = await api.post('/bank-account', {
        accountHolderName: formData.accountHolderName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode.toUpperCase(),
        bankName: formData.bankName,
        branchName: formData.branchName,
        accountType: formData.accountType
      });

      setBankAccount(response.data.data);
      setShowForm(false);
      setSuccess('Bank account details saved successfully!');
      
      // Reset form
      setFormData({
        accountHolderName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
        bankName: '',
        branchName: '',
        accountType: 'savings'
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save bank account details');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setFormData({
      accountHolderName: bankAccount.accountHolderName,
      accountNumber: bankAccount.accountNumber,
      confirmAccountNumber: bankAccount.accountNumber,
      ifscCode: bankAccount.ifscCode,
      bankName: bankAccount.bankName,
      branchName: bankAccount.branchName || '',
      accountType: bankAccount.accountType
    });
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Remittances</h1>
        <p className="text-gray-600 mt-1">Manage your bank account for COD settlements</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">2-Day Remittances processed daily</p>
            <p>Your bank account will be credited 2 days post our daily remittance. Set up your bank account to receive COD payments automatically.</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{success}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Bank Account Display */}
      {bankAccount && !showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Bank Account Details</h2>
                <p className="text-sm text-gray-500">
                  {bankAccount.isVerified ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  ) : (
                    <span className="text-yellow-600">Pending Verification</span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
            >
              Edit Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Account Holder Name</label>
              <p className="text-gray-900 font-medium mt-1">{bankAccount.accountHolderName}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Account Number</label>
              <p className="text-gray-900 font-medium mt-1">
                {'*'.repeat(bankAccount.accountNumber.length - 4) + bankAccount.accountNumber.slice(-4)}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">IFSC Code</label>
              <p className="text-gray-900 font-medium mt-1">{bankAccount.ifscCode}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Bank Name</label>
              <p className="text-gray-900 font-medium mt-1">{bankAccount.bankName}</p>
            </div>

            {bankAccount.branchName && (
              <div>
                <label className="text-sm font-medium text-gray-500">Branch Name</label>
                <p className="text-gray-900 font-medium mt-1">{bankAccount.branchName}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-500">Account Type</label>
              <p className="text-gray-900 font-medium mt-1 capitalize">{bankAccount.accountType}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bank Account Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {bankAccount ? 'Update Bank Account' : 'Set up Bank Account'}
              </h2>
              <p className="text-sm text-gray-500">Enter your bank account details for COD settlements</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="As per bank records"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Account Number *
                </label>
                <input
                  type="text"
                  name="confirmAccountNumber"
                  value={formData.confirmAccountNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Re-enter account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  required
                  maxLength={11}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                  placeholder="e.g., SBIN0001234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name *
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., State Bank of India"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Name (Optional)
                </label>
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Connaught Place"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type *
                </label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              {bankAccount && (
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    {bankAccount ? 'Update Bank Account' : 'Set up Bank Account'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Empty State */}
      {!bankAccount && !showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Bank Account Set Up</h3>
          <p className="text-gray-600 mb-6">
            Set up your bank account to receive COD payments automatically
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Set up Bank Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Remittances;
