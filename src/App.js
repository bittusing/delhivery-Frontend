import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './components/Authentication/SignUp.jsx';
import LoginPage from './components/Authentication/Login.jsx';
import { useAuth } from './hooks/useAuth';
import * as Pages from './pages/index.js'
import OrderDetailsPage from './pages/orderDetailsPage/index.jsx';
import ShipmentsPage from './pages/shipmentsPage/index.jsx';

// Layout component for protected routes
const DashboardLayout = ({ isSidebarOpen, setIsSidebarOpen, children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isSidebarOpen={isSidebarOpen}/>
      <div className="flex-1 px-2 lg:px-3 xl:px-4">
        <Header setIsSidebarOpen={setIsSidebarOpen}/>
        <main>{children}</main>
      </div>
    </div>
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2b4b] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupPage />} 
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/forward-orders"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.ForwardOrdersPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reserve-orders"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.ReserveOrdersPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pickup-requests"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.PickupRequestsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/direct-intracity-orders"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.DirectIntracityOrdersPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/exceptions-ndr"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.ExceptionsNDRPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.WalletPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/remittances"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.RemittancesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.InvoicesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/weight-mismatch"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.WeightMismatchPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/claims"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.ClaimsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/createclaimpage"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.CreateClaimPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.ReportsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduledreportform"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.ScheduledReportForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/rate-calculator"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.RateCalculatorPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/rate-card"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.RateCardPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pincode-serviceability"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.PincodeServiceabilityPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/packaging-guide"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.PackagingGuidePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/restricted-items"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.RestrictedItemsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.TermsAndConditionsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fetch-awb-numbers"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.FetchAWBNumbersPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.ServicesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.SettingsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.SupportPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-pickup-request"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <Pages.CreatePickupRequestPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-details"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <OrderDetailsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipments"
          element={
            <ProtectedRoute>
              <DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
                <ShipmentsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
