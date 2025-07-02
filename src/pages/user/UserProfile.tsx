
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, User, CreditCard, Bell, Shield, Plus, Trash2, Edit } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [paymentMethods] = useState([
    { id: 'pm-1', type: 'UPI', details: 'user@paytm', isDefault: true },
    { id: 'pm-2', type: 'Card', details: '**** **** **** 1234', isDefault: false },
    { id: 'pm-3', type: 'Wallet', details: 'PhonePe Wallet', isDefault: false }
  ]);

  const [notifications, setNotifications] = useState({
    tipConfirmations: true,
    receiptAlerts: true,
    merchantReminders: false,
    promotional: false
  });

  const [privacy, setPrivacy] = useState({
    shareNameWithMerchant: false,
    saveTipHistory: true,
    allowAnalytics: true
  });

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/user/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-tipper-gray-900">Profile Settings</h1>
                <p className="text-tipper-gray-600">Manage your account and preferences</p>
              </div>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-tipper-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-tipper-gray-800">Profile Photo</p>
                      <p className="text-sm text-tipper-gray-600 mb-2">Upload a photo to personalize your account</p>
                      <Button variant="outline" size="sm">
                        Upload Photo
                      </Button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-tipper-gray-700">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-tipper-gray-700">Email</label>
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-tipper-gray-700">Phone Number</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-tipper-gray-700">Member Since</label>
                      <Input value="June 2024" disabled />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3">
                      <Button onClick={handleSaveProfile} className="bg-tipper-primary hover:bg-tipper-primary-dark">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Methods
                    </CardTitle>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Method
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border border-tipper-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-tipper-gray-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-tipper-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-tipper-gray-800">{method.type}</p>
                            <p className="text-sm text-tipper-gray-600">{method.details}</p>
                          </div>
                          {method.isDefault && (
                            <Badge className="bg-tipper-success">Default</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-tipper-gray-800">Tip Confirmations</p>
                        <p className="text-sm text-tipper-gray-600">Get notified when your tip is processed</p>
                      </div>
                      <Switch
                        checked={notifications.tipConfirmations}
                        onCheckedChange={(checked) => setNotifications({...notifications, tipConfirmations: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-tipper-gray-800">Receipt Alerts</p>
                        <p className="text-sm text-tipper-gray-600">Receive digital receipts via email</p>
                      </div>
                      <Switch
                        checked={notifications.receiptAlerts}
                        onCheckedChange={(checked) => setNotifications({...notifications, receiptAlerts: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-tipper-gray-800">Merchant Reminders</p>
                        <p className="text-sm text-tipper-gray-600">Reminders for your favorite merchants</p>
                      </div>
                      <Switch
                        checked={notifications.merchantReminders}
                        onCheckedChange={(checked) => setNotifications({...notifications, merchantReminders: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-tipper-gray-800">Promotional Offers</p>
                        <p className="text-sm text-tipper-gray-600">Special offers and platform updates</p>
                      </div>
                      <Switch
                        checked={notifications.promotional}
                        onCheckedChange={(checked) => setNotifications({...notifications, promotional: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy & Security */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-tipper-gray-800">Share Name with Merchants</p>
                        <p className="text-sm text-tipper-gray-600">Allow merchants to see your name when you tip</p>
                      </div>
                      <Switch
                        checked={privacy.shareNameWithMerchant}
                        onCheckedChange={(checked) => setPrivacy({...privacy, shareNameWithMerchant: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-tipper-gray-800">Save Tip History</p>
                        <p className="text-sm text-tipper-gray-600">Keep a record of your transactions</p>
                      </div>
                      <Switch
                        checked={privacy.saveTipHistory}
                        onCheckedChange={(checked) => setPrivacy({...privacy, saveTipHistory: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-tipper-gray-800">Analytics & Performance</p>
                        <p className="text-sm text-tipper-gray-600">Help improve the platform with usage data</p>
                      </div>
                      <Switch
                        checked={privacy.allowAnalytics}
                        onCheckedChange={(checked) => setPrivacy({...privacy, allowAnalytics: checked})}
                      />
                    </div>

                    <div className="pt-6 border-t border-tipper-gray-200">
                      <h3 className="font-medium text-tipper-gray-800 mb-4">Account Actions</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Download My Data
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
