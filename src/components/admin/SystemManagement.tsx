
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Settings, Shield, Key, Bell, Mail, MessageSquare, Users, Database } from "lucide-react";

const SystemManagement = () => {
  const roles = [
    { id: "ROLE001", name: "Super Admin", users: 2, permissions: ["ALL"] },
    { id: "ROLE002", name: "Regional Manager", users: 5, permissions: ["USER_MGMT", "MERCHANT_MGMT", "ANALYTICS"] },
    { id: "ROLE003", name: "Auditor", users: 3, permissions: ["VIEW_TRANSACTIONS", "VIEW_SETTLEMENTS", "ANALYTICS"] },
    { id: "ROLE004", name: "Support Agent", users: 8, permissions: ["USER_SUPPORT", "MERCHANT_SUPPORT"] }
  ];

  const emailTemplates = [
    { id: "TEMP001", name: "Welcome Email - User", status: "active", lastModified: "2024-06-01" },
    { id: "TEMP002", name: "Merchant Approval", status: "active", lastModified: "2024-05-28" },
    { id: "TEMP003", name: "Settlement Confirmation", status: "active", lastModified: "2024-05-25" },
    { id: "TEMP004", name: "Transaction Receipt", status: "active", lastModified: "2024-05-20" }
  ];

  const apiKeys = [
    { id: "API001", name: "Payment Gateway - Razorpay", status: "active", lastUsed: "2024-06-11 14:30" },
    { id: "API002", name: "SMS Gateway - Twilio", status: "active", lastUsed: "2024-06-11 13:45" },
    { id: "API003", name: "Email Service - SendGrid", status: "active", lastUsed: "2024-06-11 12:20" },
    { id: "API004", name: "Analytics - Google Analytics", status: "inactive", lastUsed: "2024-06-08 10:15" }
  ];

  const features = [
    { name: "Real-time Notifications", enabled: true, description: "Push notifications for transactions" },
    { name: "Auto Settlement", enabled: true, description: "Automatic settlement processing" },
    { name: "Fraud Detection", enabled: true, description: "AI-powered fraud detection" },
    { name: "Multi-language Support", enabled: false, description: "Support for multiple languages" },
    { name: "Dark Mode", enabled: false, description: "Dark theme for admin panel" },
    { name: "Advanced Analytics", enabled: true, description: "Enhanced analytics dashboard" }
  ];

  const demoAccounts = [
    { role: "User (Tipper)", email: "user@demo.com", password: "demo123", status: "active" },
    { role: "Tip Taker", email: "tiptaker@demo.com", password: "demo123", status: "active" },
    { role: "Merchant", email: "merchant@demo.com", password: "demo123", status: "active" },
    { role: "Admin", email: "admin@tipper.com", password: "admin123", status: "active" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">System Management</h2>
        <p className="text-gray-600">Platform configuration and administrative settings</p>
      </div>

      {/* Roles & Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Roles & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{role.name}</p>
                  <p className="text-sm text-gray-600">{role.users} users assigned</p>
                  <div className="flex gap-1 mt-2">
                    {role.permissions.map((perm, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailTemplates.map((template) => (
              <div key={template.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{template.name}</p>
                  <p className="text-sm text-gray-600">Last modified: {template.lastModified}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                    {template.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Keys Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{apiKey.name}</p>
                  <p className="text-sm text-gray-600">Last used: {apiKey.lastUsed}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                    {apiKey.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Feature Toggles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{feature.name}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <Switch checked={feature.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Demo Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoAccounts.map((account, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{account.role}</p>
                  <p className="text-sm text-gray-600">{account.email} / {account.password}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                    {account.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Reset
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Timeout (minutes)</label>
                <Input type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Login Attempts</label>
                <Input type="number" defaultValue="5" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password Expiry (days)</label>
                <Input type="number" defaultValue="90" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">2FA Requirement</label>
                <Switch />
              </div>
            </div>
            <div className="pt-4">
              <Button>Save Security Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SystemManagement };
