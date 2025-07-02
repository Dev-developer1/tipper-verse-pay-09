
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, QrCode, Smartphone, TrendingUp, Users, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-tipper-primary to-tipper-secondary">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-tipper-primary font-bold text-lg">T</span>
            </div>
            <span className="text-white font-bold text-xl">Tipper</span>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/user/login')}
            >
              User Login
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/service-provider/login')}
            >
              Service Provider
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/merchant/login')}
            >
              Merchant Login
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/admin/login')}
            >
              Admin
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Seamless Tipping,
            <br />
            <span className="text-yellow-300">Simplified</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 animate-fade-in">
            Scan a QR code, tip instantly, and make someone's day better. 
            The future of gratitude payments is here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-tipper-primary hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => navigate('/user/login')}
            >
              Start Tipping <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-tipper-primary text-lg px-8 py-4"
              onClick={() => navigate('/merchant/login')}
            >
              Join as Merchant
            </Button>
          </div>

          {/* Demo Credentials */}
          <Card className="max-w-3xl mx-auto mb-16 bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-tipper-gray-800">Demo Credentials</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium text-tipper-primary">User Demo:</p>
                  <p>Phone: +91 9876543210</p>
                  <p>OTP: 123456</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-tipper-secondary">Service Provider:</p>
                  <p>Phone: +91 9876543212</p>
                  <p>OTP: 123456</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-tipper-warning">Merchant Demo:</p>
                  <p>Email: merchant@demo.com</p>
                  <p>Password: demo123</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <QrCode className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">QR Code Scanning</h3>
                <p className="text-white/80">Simply scan and tip in seconds</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Smartphone className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">Multiple Payment Options</h3>
                <p className="text-white/80">UPI, Cards, Wallets - your choice</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-white/80">Track earnings and insights</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-tipper-gray-800 mb-4">
              Why Choose Tipper?
            </h2>
            <p className="text-xl text-tipper-gray-600 max-w-2xl mx-auto">
              Built for the modern economy with security, speed, and simplicity at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-tipper-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-tipper-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-tipper-gray-800">Bank-Grade Security</h3>
              <p className="text-tipper-gray-600">End-to-end encryption and secure payment processing</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-tipper-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-tipper-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-tipper-gray-800">Instant Settlements</h3>
              <p className="text-tipper-gray-600">Get your money transferred within minutes</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-tipper-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-tipper-warning" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-tipper-gray-800">Team Management</h3>
              <p className="text-tipper-gray-600">Manage staff and split tips automatically</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tipper-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-tipper-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl">Tipper</span>
            </div>
            <p className="text-tipper-gray-400">Making gratitude payments simple and secure</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
