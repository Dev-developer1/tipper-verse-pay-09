
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserLogin = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code",
      });
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (otp !== '123456') {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP (Demo: 123456)",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      const userData = {
        id: 'user-demo-1',
        name: 'Demo User',
        email: 'user@demo.com',
        phone: phone,
        type: 'user' as const
      };
      login(userData);
      navigate('/user/dashboard');
      toast({
        title: "Welcome!",
        description: "You have successfully logged in",
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
          <p className="text-white/90">Welcome back! Please log in to continue</p>
        </div>

        <Card className="bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <Smartphone className="h-5 w-5 mr-2 text-tipper-primary" />
              {step === 'phone' ? 'Enter Your Phone Number' : 'Verify OTP'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'phone' ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-center text-lg"
                  />
                  <p className="text-xs text-tipper-gray-500 text-center">
                    Use +91 9876543210 for demo
                  </p>
                </div>
                <Button 
                  onClick={handleSendOTP} 
                  className="w-full bg-tipper-primary hover:bg-tipper-primary-dark"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enter OTP</label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-tipper-gray-500 text-center">
                    Demo OTP: 123456
                  </p>
                </div>
                <Button 
                  onClick={handleVerifyOTP} 
                  className="w-full bg-tipper-secondary hover:bg-tipper-secondary-dark"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setStep('phone')}
                  className="w-full text-tipper-gray-600"
                >
                  Change Phone Number
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserLogin;
