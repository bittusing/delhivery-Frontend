import React, { useState, useEffect } from "react";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldQuestion, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MapPin,
  Plus,
  Trash2,
  Lock,
  X,
  Loader2,
  Building2,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import warehouseService from "../services/warehouse.service";
import KYCVerification from "../components/KYCVerification";
import api from "../config/api";

const SettingsPage = () => {
  const { user, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // profile, warehouses, security
  const [loading, setLoading] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [showAddWarehouse, setShowAddWarehouse] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    businessAddress: ""
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    city: "",
    state: ""
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        phone: user.phone || "",
        businessAddress: user.businessAddress || ""
      });
    }
    fetchWarehouses();
  }, [user]);

  const fetchWarehouses = async () => {
    try {
      const response = await warehouseService.getWarehouses();
      if (response.success) {
        setWarehouses(response.data.warehouses);
      }
    } catch (error) {
      console.error("Failed to fetch warehouses:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.patch('/auth/update-me', profileData);
      if (response.data.success) {
        alert("Profile updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await changePassword(passwordData.oldPassword, passwordData.newPassword);
      alert("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWarehouse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await warehouseService.createWarehouse(newWarehouse);
      if (response.success) {
        setWarehouses([response.data.warehouse, ...warehouses]);
        setShowAddWarehouse(false);
        setNewWarehouse({
          name: "", contactPerson: "", phone: "", email: "",
          addressLine1: "", addressLine2: "", pincode: "", city: "", state: ""
        });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add warehouse");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWarehouse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this warehouse?")) return;
    try {
      await warehouseService.deleteWarehouse(id);
      setWarehouses(warehouses.filter(w => w._id !== id));
    } catch (error) {
      alert("Failed to delete warehouse");
    }
  };

  const getKYCStatusBadge = (status) => {
    switch (status) {
      case 'approved': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> VERIFIED</span>;
      case 'pending': return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3"/> PENDING</span>;
      case 'rejected': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3"/> REJECTED</span>;
      default: return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">NOT STARTED</span>;
    }
  };

  const maskDocumentNumber = (num) => {
    if (!num) return "";
    if (num.length > 4) {
      return "•".repeat(num.length - 4) + num.slice(-4);
    }
    return num;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Settings</h1>
          <p className="text-gray-500 font-medium">Manage your account, warehouses, and security.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex flex-col items-end">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Flywell ID</span>
          <span className="font-bold text-gray-900">{user?.email || "Loading..."}</span>
        </div>
      </div>

      <div className="flex bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 border-r border-gray-100 flex-shrink-0 bg-gray-50/30">
          <nav className="p-4 space-y-2 text-sm">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-sm'}`}
            >
              <UserIcon className="w-4 h-4" /> Profile Info
            </button>
            <button 
              onClick={() => setActiveTab("warehouses")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'warehouses' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-sm'}`}
            >
              <Building2 className="w-4 h-4" /> Warehouses
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'security' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-sm'}`}
            >
              <Lock className="w-4 h-4" /> Security
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 lg:p-12">
          {activeTab === 'profile' && (
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
                {getKYCStatusBadge(user?.kycStatus)}
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/30 outline-none transition-all font-semibold" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/30 outline-none transition-all font-semibold" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Business Address</label>
                  <textarea 
                    rows={3}
                    value={profileData.businessAddress}
                    onChange={(e) => setProfileData({...profileData, businessAddress: e.target.value})}
                    placeholder="Enter your primary office/billing address"
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/30 outline-none transition-all font-semibold resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin"/>} Save Profile
                </button>
              </form>

              <hr className="border-gray-50"/>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">KYC Verification</h4>
                    <p className="text-sm text-gray-500">
                      {user?.kycStatus === 'approved' 
                        ? (
                          <span className="flex flex-col gap-1 mt-1">
                            <span className="text-green-600 font-bold flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5" /> Account Fully Verified
                            </span>
                            <span className="text-xs bg-white/50 border border-blue-100 rounded-xl px-4 py-3 inline-block shadow-sm">
                              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-[0.15em] mb-1.5">Verified Document</span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600 font-medium capitalize">{user?.kycData?.documentType || "aadhaar"}:</span>
                                <span className="text-gray-900 font-bold tracking-[0.1em]">{maskDocumentNumber(user?.kycData?.documentNumber)}</span>
                              </div>
                            </span>
                          </span>
                        )
                        : "Complete verification to unlock all features."}
                    </p>
                  </div>
                </div>
                {user?.kycStatus !== 'approved' && (
                  <button 
                    onClick={() => setShowKYCModal(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition"
                  >
                    {user?.kycStatus === 'rejected' ? 'Retry Verification' : 'Verify Now'}
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'warehouses' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Pickup Locations</h3>
                  <p className="text-sm text-gray-500">Manage multiple warehouses for faster shipping.</p>
                </div>
                <button 
                  onClick={() => setShowAddWarehouse(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition"
                >
                  <Plus className="w-4 h-4" /> Add New
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {warehouses.length > 0 ? warehouses.map((w) => (
                  <div key={w._id} className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{w.name}</h4>
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase">{w.city}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteWarehouse(w._id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 font-medium">
                      <p className="flex items-center gap-2"><UserIcon className="w-3 h-3"/> {w.contactPerson}</p>
                      <p className="flex items-center gap-2"><Phone className="w-3 h-3"/> {w.phone}</p>
                      <p className="mt-2 line-clamp-2">{w.addressLine1}, {w.city}, {w.state} - {w.pincode}</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center space-y-3">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">No warehouses yet</h4>
                      <p className="text-sm text-gray-500">Start by adding your first pickup location.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Security & Privacy</h3>
                <p className="text-sm text-gray-500">Keep your account secure.</p>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Account Password</h4>
                    <p className="text-sm text-gray-500">Last changed recently</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="px-6 py-2 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
                >
                  Change Password
                </button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-500" /> Security Recommendations
                </h4>
                <ul className="text-sm text-gray-600 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    Use a strong password with symbols and numbers.
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    Never share your login credentials with anyone.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Warehouse Modal */}
      {showAddWarehouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-bold text-gray-900">Add New Warehouse</h4>
              <button 
                onClick={() => setShowAddWarehouse(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddWarehouse} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Warehouse Name</label>
                  <input required placeholder="e.g. Primary Hub" value={newWarehouse.name} onChange={(e) => setNewWarehouse({...newWarehouse, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Person</label>
                  <input required placeholder="Full Name" value={newWarehouse.contactPerson} onChange={(e) => setNewWarehouse({...newWarehouse, contactPerson: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input required placeholder="10-digit number" value={newWarehouse.phone} onChange={(e) => setNewWarehouse({...newWarehouse, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email (Optional)</label>
                  <input type="email" placeholder="example@mail.com" value={newWarehouse.email} onChange={(e) => setNewWarehouse({...newWarehouse, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Address Line 1</label>
                <input required placeholder="House/Flat No, Street, Colony" value={newWarehouse.addressLine1} onChange={(e) => setNewWarehouse({...newWarehouse, addressLine1: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pincode</label>
                  <input required placeholder="6-digit" value={newWarehouse.pincode} onChange={(e) => setNewWarehouse({...newWarehouse, pincode: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">City</label>
                  <input required placeholder="City name" value={newWarehouse.city} onChange={(e) => setNewWarehouse({...newWarehouse, city: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">State</label>
                  <input required placeholder="State name" value={newWarehouse.state} onChange={(e) => setNewWarehouse({...newWarehouse, state: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin"/>} Add Pickup Location
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-bold text-gray-900">Change Password</h4>
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Old Password</label>
                  <input required type="password" value={passwordData.oldPassword} onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Password</label>
                  <input required type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Confirm New Password</label>
                  <input required type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/20 outline-none transition-all font-semibold" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin"/>} Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* KYC Modal */}
      {showKYCModal && <KYCVerification onClose={() => setShowKYCModal(false)} />}
    </div>
  );
};

export default SettingsPage;
