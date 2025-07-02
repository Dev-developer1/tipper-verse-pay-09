
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (email !== 'admin@tipper.com' || password !== 'admin123') {
      toast({
        title: "Invalid Credentials",
        description: "Please use admin@tipper.com / admin123",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const adminData = {
        id: 'admin-demo-1',
        name: 'Admin User',
        email: 'admin@tipper.com',
        phone: '+91 9999999999',
        type: 'admin' as const
      };
      login(adminData);
      navigate('/admin/dashboard');
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin dashboard",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tipper-gray-800 to-tipper-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-tipper-primary font-bold text-xl">T</span>
            </div>
            <span className="text-white font-bold text-2xl">Tipper</span>
          </div>
          <p className="text-white/90">Admin Portal</p>
        </div>

        <Card className="bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <Shield className="h-5 w-5 mr-2 text-tipper-primary" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="admin@tipper.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="text-xs text-tipper-gray-500 text-center">
              Demo: admin@tipper.com / admin123
            </p>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-tipper-primary hover:bg-tipper-primary-dark"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Admin Login'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
