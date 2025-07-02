
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { QrCode, Download, TrendingUp, Calendar, Users, LogOut, Settings, Building2 } from "lucide-react";

const ServiceProviderDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [linkStatus, setLinkStatus] = useState<'independent' | 'linked'>('independent');
  
  const [recentTips] = useState([
    { id: 'tip-1', tipperName: 'Anonymous', amount: 100, time: '5 min ago', merchant: 'Coffee House' },
    { id: 'tip-2', tipperName: 'Priya S.', amount: 50, time: '15 min ago', merchant: 'Independent' },
    { id: 'tip-3', tipperName: 'Anonymous', amount: 200, time: '45 min ago', merchant: 'Hotel Grand' },
    { id: 'tip-4', tipperName: 'Rahul K.', amount: 75, time: '1 hour ago', merchant: 'Independent' },
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const downloadQR = () => {
    console.log('Downloading QR code...');
  };

  const toggleMerchantLink = () => {
    setLinkStatus(prev => prev === 'independent' ? 'linked' : 'independent');
  };

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-tipper-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SP</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-tipper-gray-800">Welcome, {user?.name}!</h1>
                <p className="text-sm text-tipper-gray-600">{user?.serviceRole} • {linkStatus === 'linked' ? 'Linked to Coffee House' : 'Independent'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => navigate('/service-provider/profile')}>
                <Settings className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tipper-gray-600 text-sm">Today's Tips</p>
                  <p className="text-2xl font-bold text-tipper-gray-900">₹425</p>
                  <p className="text-tipper-success text-sm">+12% from yesterday</p>
                </div>
                <Calendar className="h-8 w-8 text-tipper-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tipper-gray-600 text-sm">Weekly Total</p>
                  <p className="text-2xl font-bold text-tipper-gray-900">₹2,850</p>
                  <p className="text-tipper-success text-sm">+8% from last week</p>
                </div>
                <TrendingUp className="h-8 w-8 text-tipper-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tipper-gray-600 text-sm">Total Tips</p>
                  <p className="text-2xl font-bold text-tipper-gray-900">₹48,650</p>
                  <p className="text-tipper-success text-sm">156 transactions</p>
                </div>
                <Users className="h-8 w-8 text-tipper-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* QR Code Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="h-5 w-5 mr-2 text-tipper-secondary" />
                  Your QR Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-48 h-48 bg-tipper-gray-100 rounded-lg flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-tipper-gray-400" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="font-medium text-tipper-gray-800">QR Code ID: SP-{user?.id?.slice(-6)}</p>
                      <p className="text-sm text-tipper-gray-600">Customers can scan this to tip you directly</p>
                    </div>
                    <Button onClick={downloadQR} className="bg-tipper-secondary hover:bg-tipper-secondary-dark">
                      <Download className="h-4 w-4 mr-2" />
                      Download QR Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTips.map((tip) => (
                    <div key={tip.id} className="flex items-center justify-between p-4 bg-tipper-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-tipper-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-tipper-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-tipper-gray-800">{tip.tipperName}</p>
                          <div className="flex items-center space-x-2 text-sm text-tipper-gray-600">
                            <span>{tip.time}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {tip.merchant}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-tipper-success">₹{tip.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Tips
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Work Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-tipper-gray-600">Status</span>
                  <Badge className="bg-tipper-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-tipper-gray-600">Service Role</span>
                  <Badge variant="outline">{user?.serviceRole}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-tipper-gray-600">Merchant Link</span>
                  <Badge variant={linkStatus === 'linked' ? 'default' : 'secondary'}>
                    {linkStatus === 'linked' ? 'Linked' : 'Independent'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Merchant Link */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  Merchant Association
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {linkStatus === 'independent' ? (
                  <div>
                    <p className="text-sm text-tipper-gray-600 mb-3">
                      Link with a merchant to receive tips through their business QR codes.
                    </p>
                    <Button onClick={toggleMerchantLink} variant="outline" className="w-full">
                      Link with Merchant
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium">Coffee House</p>
                    <p className="text-xs text-tipper-gray-600 mb-3">
                      You're receiving 100% of tips through this merchant.
                    </p>
                    <Button onClick={toggleMerchantLink} variant="outline" className="w-full">
                      Work Independently
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Tip History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
