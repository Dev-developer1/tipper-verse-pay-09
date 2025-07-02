
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, TrendingUp, Users, CreditCard, QrCode } from "lucide-react";

const MerchantDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { title: "Today's Tips", value: "₹2,450", icon: CreditCard, change: "+12%" },
    { title: "Total Customers", value: "156", icon: Users, change: "+8%" },
    { title: "This Month", value: "₹45,320", icon: TrendingUp, change: "+25%" },
    { title: "Active Staff", value: "8", icon: Users, change: "+2%" }
  ];

  const recentTransactions = [
    { id: "TXN001", customer: "Anonymous", amount: 150, time: "2 min ago" },
    { id: "TXN002", customer: "Regular Customer", amount: 200, time: "15 min ago" },
    { id: "TXN003", customer: "Anonymous", amount: 100, time: "32 min ago" },
  ];

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-tipper-gray-900">Merchant Dashboard</h1>
              <p className="text-tipper-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/merchant/analytics')}
              >
                Analytics
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/merchant/staff')}
              >
                <Users className="h-4 w-4 mr-2" />
                Staff
              </Button>
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-tipper-gray-600 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-tipper-gray-900">{stat.value}</p>
                    <p className="text-tipper-success text-sm">{stat.change}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-tipper-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 bg-tipper-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-tipper-gray-900">{transaction.customer}</p>
                      <p className="text-sm text-tipper-gray-600">{transaction.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-tipper-success">₹{transaction.amount}</p>
                      <p className="text-xs text-tipper-gray-600">{transaction.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Request Settlement
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Staff
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
