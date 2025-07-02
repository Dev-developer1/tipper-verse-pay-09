
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import TransactionHistory from "./pages/user/TransactionHistory";
import TipFlow from "./pages/user/TipFlow";
import Receipt from "./pages/user/Receipt";
import ServiceProviderLogin from "./pages/service-provider/ServiceProviderLogin";
import ServiceProviderDashboard from "./pages/service-provider/ServiceProviderDashboard";
import MerchantLogin from "./pages/merchant/MerchantLogin";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import MerchantAnalytics from "./pages/merchant/MerchantAnalytics";
import StaffManagement from "./pages/merchant/StaffManagement";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* User Routes */}
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/transactions" element={<TransactionHistory />} />
            <Route path="/user/tip" element={<TipFlow />} />
            <Route path="/user/receipt/:transactionId" element={<Receipt />} />
            
            {/* Service Provider Routes */}
            <Route path="/service-provider/login" element={<ServiceProviderLogin />} />
            <Route path="/service-provider/dashboard" element={<ServiceProviderDashboard />} />
            
            {/* Merchant Routes */}
            <Route path="/merchant/login" element={<MerchantLogin />} />
            <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
            <Route path="/merchant/analytics" element={<MerchantAnalytics />} />
            <Route path="/merchant/staff" element={<StaffManagement />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
