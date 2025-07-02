
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, CreditCard, Building, TrendingUp, UserCheck, FileCheck, Shield, Settings, BarChart3, DollarSign } from "lucide-react";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { UserManagement } from "@/components/admin/UserManagement";
import { MerchantManagement } from "@/components/admin/MerchantManagement";
import { TipTakerManagement } from "@/components/admin/TipTakerManagement";
import { TransactionManagement } from "@/components/admin/TransactionManagement";
import { SettlementManagement } from "@/components/admin/SettlementManagement";
import { PlatformAnalytics } from "@/components/admin/PlatformAnalytics";
import { SystemManagement } from "@/components/admin/SystemManagement";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-tipper-gray-900">Admin Dashboard</h1>
              <p className="text-tipper-gray-600">Platform Overview & Management</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="merchants" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Merchants
            </TabsTrigger>
            <TabsTrigger value="tiptakers" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Tip Takers
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="settlements" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Settlements
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="merchants">
            <MerchantManagement />
          </TabsContent>

          <TabsContent value="tiptakers">
            <TipTakerManagement />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionManagement />
          </TabsContent>

          <TabsContent value="settlements">
            <SettlementManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <PlatformAnalytics />
          </TabsContent>

          <TabsContent value="system">
            <SystemManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
