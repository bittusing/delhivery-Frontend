import React, { useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    businessName: "My Shipping Company",
    email: "business@example.com",
    phone: "+91-XXXXXXXXXX",
    notifications: true,
    emailUpdates: true,
    twoFactorAuth: false,
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your account and preferences.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Business Information */}
        <section className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Business Name</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="border-b pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange("notifications", e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Enable notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailUpdates}
                onChange={(e) => handleChange("emailUpdates", e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Email updates</span>
            </label>
          </div>
        </section>

        {/* Security */}
        <section className="pb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleChange("twoFactorAuth", e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Two-factor authentication</span>
            </label>
            <button className="text-blue-600 hover:underline text-sm font-semibold">
              Change Password
            </button>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
