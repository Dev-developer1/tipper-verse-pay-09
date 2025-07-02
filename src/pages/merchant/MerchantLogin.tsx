
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MerchantLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (email !== 'merchant@demo.com' || password !== 'demo123') {
      toast({
        title: "Invalid Credentials",
        description: "Please use merchant@demo.com / demo123",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const merchantData = {
        id: 'merchant-demo-1',
        name: 'Demo Merchant',
        email: 'merchant@demo.com',
        phone: '+91 9876543210',
        type: 'merchant' as const,
        merchantId: 'MERCH001'
      };
      login(merchantData);
      navigate('/merchant/dashboard');
      toast({
        title: "Welcome back!",
        description: "Successfully logged into merchant dashboard",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tipper-primary to-tipper-secondary flex items-center justify-center p-4">
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
          <p className="text-white/90">Merchant Portal</p>
        </div>

        <Card className="bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <Store className="h-5 w-5 mr-2 text-tipper-primary" />
              Merchant Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="merchant@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="demo123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="text-xs text-tipper-gray-500 text-center">
              Demo: merchant@demo.com / demo123
            </p>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-tipper-primary hover:bg-tipper-primary-dark"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantLogin;
