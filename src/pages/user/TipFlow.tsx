
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, QrCode, Smartphone, CreditCard, Check, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const TipFlow = () => {
  const [step, setStep] = useState<'scan' | 'verify' | 'amount' | 'payment' | 'processing'>('scan');
  const [scanMethod, setScanMethod] = useState<'qr' | 'phone'>('qr');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [merchant, setMerchant] = useState<any>(null);
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const method = searchParams.get('method');
    if (method === 'phone') {
      setScanMethod('phone');
    }
  }, [searchParams]);

  const presetAmounts = [50, 100, 200, 500];
  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: '💳' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'wallet', name: 'Digital Wallet', icon: '📱' },
  ];

  const handleScanQR = () => {
    // Simulate QR scan
    setTimeout(() => {
      setMerchant({
        id: 'merchant-1',
        name: 'Coffee House',
        category: 'Cafe',
        verified: true,
        location: 'Downtown',
        photo: '☕'
      });
      setStep('verify');
    }, 1500);
  };

  const handlePhoneVerify = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    // Simulate merchant lookup
    setTimeout(() => {
      setMerchant({
        id: 'merchant-2',
        name: 'Restaurant ABC',
        category: 'Restaurant',
        verified: true,
        location: 'Food Court',
        photo: '🍽️'
      });
      setStep('verify');
    }, 1000);
  };

  const handleConfirmMerchant = () => {
    setStep('amount');
  };

  const handleAmountConfirm = () => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid tip amount",
        variant: "destructive"
      });
      return;
    }
    setStep('payment');
  };

  const handlePayment = () => {
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      const transactionId = 'tx-' + Date.now();
      navigate(`/user/receipt/${transactionId}?amount=${amount}&merchant=${merchant.name}&message=${encodeURIComponent(message)}`);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => step === 'scan' ? navigate('/user/dashboard') : setStep('scan')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold text-tipper-gray-800">Send a Tip</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {step === 'scan' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center">How would you like to find the merchant?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={scanMethod === 'qr' ? 'default' : 'outline'}
                  className="h-20 flex-col"
                  onClick={() => setScanMethod('qr')}
                >
                  <QrCode className="h-8 w-8 mb-2" />
                  Scan QR
                </Button>
                <Button
                  variant={scanMethod === 'phone' ? 'default' : 'outline'}
                  className="h-20 flex-col"
                  onClick={() => setScanMethod('phone')}
                >
                  <Smartphone className="h-8 w-8 mb-2" />
                  Phone Number
                </Button>
              </div>

              {scanMethod === 'qr' ? (
                <div className="text-center py-8">
                  <div className="w-48 h-48 bg-tipper-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-tipper-gray-400" />
                  </div>
                  <p className="text-tipper-gray-600 mb-4">Position the QR code within the frame</p>
                  <Button onClick={handleScanQR} className="bg-tipper-primary">
                    Simulate QR Scan
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    type="tel"
                    placeholder="Enter merchant's phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button onClick={handlePhoneVerify} className="w-full">
                    Find Merchant
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {step === 'verify' && merchant && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center">Confirm Merchant</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl">{merchant.photo}</div>
              <div>
                <h3 className="text-xl font-bold flex items-center justify-center">
                  {merchant.name}
                  {merchant.verified && <Check className="h-5 w-5 ml-2 text-tipper-success" />}
                </h3>
                <Badge variant="secondary" className="mt-1">{merchant.category}</Badge>
                <p className="text-tipper-gray-600 mt-2">{merchant.location}</p>
              </div>
              <Button onClick={handleConfirmMerchant} className="w-full bg-tipper-secondary">
                Yes, This is Correct
              </Button>
              <Button variant="outline" onClick={() => setStep('scan')} className="w-full">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'amount' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center">Choose Tip Amount</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset}
                    variant={amount === preset ? 'default' : 'outline'}
                    onClick={() => setAmount(preset)}
                    className="h-14 text-lg"
                  >
                    ₹{preset}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Custom Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="text-center text-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Add a message (optional)</label>
                <Textarea
                  placeholder="Thank you for your service!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              {amount > 0 && (
                <Button onClick={handleAmountConfirm} className="w-full bg-tipper-primary text-lg">
                  Continue with ₹{amount}
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {step === 'payment' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center">Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-tipper-gray-100 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-tipper-primary">₹{amount}</p>
                <p className="text-tipper-gray-600">to {merchant.name}</p>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <Button
                    key={method.id}
                    variant={selectedPayment === method.id ? 'default' : 'outline'}
                    onClick={() => setSelectedPayment(method.id)}
                    className="w-full justify-start h-14"
                  >
                    <span className="text-xl mr-3">{method.icon}</span>
                    {method.name}
                  </Button>
                ))}
              </div>

              <Button onClick={handlePayment} className="w-full bg-tipper-success text-lg">
                <CreditCard className="h-5 w-5 mr-2" />
                Pay ₹{amount}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'processing' && (
          <Card className="animate-fade-in">
            <CardContent className="py-12 text-center">
              <div className="animate-spin w-16 h-16 border-4 border-tipper-primary border-t-transparent rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold mb-2">Processing Payment...</h3>
              <p className="text-tipper-gray-600">Please wait while we process your tip</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TipFlow;
