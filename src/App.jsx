import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import WhatsAppFAB from '@/components/common/WhatsAppFAB'
import ScrollProgress from '@/components/common/ScrollProgress'
import BackToTop from '@/components/common/BackToTop'
import ProtectedRoute from '@/components/common/ProtectedRoute'

import HomePage from '@/pages/HomePage'
import RegisterPage from '@/pages/RegisterPage'
import CheckoutPage from '@/pages/CheckoutPage'
import PaymentSuccessPage from '@/pages/PaymentSuccessPage'
import SigninPage from '@/pages/SigninPage'
import ContactPage from '@/pages/ContactPage'
import AboutUsPage from '@/pages/AboutUsPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import TermsPage from '@/pages/TermsPage'
import RefundPolicyPage from '@/pages/RefundPolicyPage'

import DashboardLayout from '@/pages/dashboard/DashboardLayout'
import DashboardHome from '@/pages/dashboard/DashboardHome'
import MyDesigns from '@/pages/dashboard/MyDesigns'
import PlansAndBilling from '@/pages/dashboard/PlansAndBilling'
import ProfilePage from '@/pages/dashboard/ProfilePage'
import SettingsPage from '@/pages/dashboard/SettingsPage'

function PublicLayout() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppFAB />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
      </Route>

      {/* Standalone pages with their own layout (no main nav/footer) */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/signin" element={<SigninPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="designs" element={<MyDesigns />} />
        <Route path="plans" element={<PlansAndBilling />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
