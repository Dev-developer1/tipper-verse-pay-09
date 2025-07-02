
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { QrCode, History, CreditCard, User, LogOut, Plus, Clock, MapPin, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [recentTransactions] = useState([
    { id: 'tx-1', merchant: 'Coffee House', amount: 50, date: '2024-06-11 14:30', status: 'completed', type: 'Merchant' },
    { id: 'tx-2', merchant: 'Raj Kumar (Driver)', amount: 150, date: '2024-06-10 19:45', status: 'completed', type: 'Service Provider' },
    { id: 'tx-3', merchant: 'Hotel Service', amount: 100, date: '2024-06-09 12:15', status: 'completed', type: 'Merchant' },
  ]);

  const [favoritesMerchants] = useState([
    { id: 'm-1', name: 'Coffee House', category: 'Cafe', lastTip: 50 },
    { id: 'm-2', name: 'Restaurant ABC', category: 'Restaurant', lastTip: 150 },
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-tipper-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-tipper-gray-800">Welcome back!</h1>
                <p className="text-sm text-tipper-gray-600">{user?.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => navigate('/user/profile')}>
                <Settings className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="text-tipper-gray-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Main Action Card */}
        <Card className="mb-8 bg-gradient-to-r from-tipper-primary to-tipper-secondary text-white">
          <CardContent className="p-8 text-center">
            <QrCode className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready to Tip?</h2>
            <p className="text-white/90 mb-6">Scan a QR code or enter merchant details</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-tipper-primary hover:bg-gray-100"
                onClick={() => navigate('/user/tip')}
              >
                <QrCode className="h-5 w-5 mr-2" />
                Scan QR Code
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-tipper-primary"
                onClick={() => navigate('/user/tip?method=phone')}
              >
                <Plus className="h-5 w-5 mr-2" />
                Enter Phone Number
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <History className="h-5 w-5 mr-2 text-tipper-primary" />
                    Recent Tips
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/user/transactions')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-tipper-gray-50 rounded-lg hover:bg-tipper-gray-100 transition-colors cursor-pointer" 
                         onClick={() => navigate(`/user/receipt/${tx.id}`)}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-tipper-secondary/10 rounded-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-tipper-secondary" />
                        </div>
                        <div>
                          <p className="font-medium text-tipper-gray-800">{tx.merchant}</p>
                          <div className="flex items-center space-x-2 text-sm text-tipper-gray-600">
                            <Clock className="h-3 w-3" />
                            <span>{tx.date}</span>
                            <Badge variant="outline" className="text-xs">
                              {tx.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-tipper-gray-800">₹{tx.amount}</p>
                        <Badge variant="secondary" className="bg-tipper-success/10 text-tipper-success">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorite Merchants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-tipper-primary" />
                  Favorite Merchants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {favoritesMerchants.map((merchant) => (
                    <div key={merchant.id} className="p-4 bg-tipper-gray-50 rounded-lg hover:bg-tipper-gray-100 transition-colors cursor-pointer"
                         onClick={() => navigate(`/user/tip?merchant=${merchant.id}`)}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-tipper-gray-800">{merchant.name}</h3>
                        <Badge variant="outline">{merchant.category}</Badge>
                      </div>
                      <p className="text-sm text-tipper-gray-600">Last tip: ₹{merchant.lastTip}</p>
                      <Button size="sm" className="w-full mt-3" variant="outline">
                        Tip Again
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Tipping Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-tipper-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-tipper-primary">₹300</p>
                  <p className="text-sm text-tipper-gray-600">Total Tips This Month</p>
                </div>
                <div className="text-center p-4 bg-tipper-secondary/5 rounded-lg">
                  <p className="text-2xl font-bold text-tipper-secondary">3</p>
                  <p className="text-sm text-tipper-gray-600">Merchants Tipped</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/user/profile')}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Manage Payment Methods
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/user/profile')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/user/transactions')}
                >
                  <History className="h-4 w-4 mr-2" />
                  Transaction History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
