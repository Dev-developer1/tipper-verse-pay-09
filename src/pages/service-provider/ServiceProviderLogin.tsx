
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, User } from "lucide-react";

const ServiceProviderLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    otp: ''
  });
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSendOTP = () => {
    console.log('Sending OTP to:', formData.phone);
    setStep('otp');
  };

  const handleLogin = () => {
    // Demo credentials check
    if (formData.phone === '+91 9876543212' && formData.otp === '123456') {
      login({
        id: 'sp-demo-001',
        name: 'Raj Kumar',
        email: 'raj.driver@demo.com',
        phone: formData.phone,
        type: 'service-provider',
        serviceRole: 'Driver'
      });
      navigate('/service-provider/dashboard');
    } else {
      alert('Invalid credentials. Use demo: +91 9876543212, OTP: 123456');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tipper-secondary to-tipper-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="w-16 h-16 bg-tipper-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Service Provider Login</CardTitle>
          <p className="text-tipper-gray-600">Enter your details to access your dashboard</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'phone' ? (
            <>
              <div>
                <label className="text-sm font-medium text-tipper-gray-700">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="+91 9876543212"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <Button onClick={handleSendOTP} className="w-full bg-tipper-secondary hover:bg-tipper-secondary-dark">
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-tipper-gray-700">Enter OTP</label>
                <Input
                  type="text"
                  placeholder="123456"
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                />
              </div>
              <Button onClick={handleLogin} className="w-full bg-tipper-secondary hover:bg-tipper-secondary-dark">
                Login
              </Button>
              <Button variant="outline" onClick={() => setStep('phone')} className="w-full">
                Change Phone Number
              </Button>
            </>
          )}
          
          <div className="mt-6 p-4 bg-tipper-gray-50 rounded-lg">
            <p className="text-sm font-medium text-tipper-gray-800 mb-2">Demo Credentials:</p>
            <p className="text-xs text-tipper-gray-600">Phone: +91 9876543212</p>
            <p className="text-xs text-tipper-gray-600">OTP: 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceProviderLogin;
