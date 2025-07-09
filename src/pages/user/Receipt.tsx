
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Download, Share2, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Receipt = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [searchParams] = useSearchParams();
  
  const amount = searchParams.get('amount');
  const merchant = searchParams.get('merchant');
  const message = searchParams.get('message');
  const reference = searchParams.get('reference');

  const [receiptData, setReceiptData] = useState({
    transactionId: transactionId || '',
    amount: amount || '0',
    merchant: merchant || 'Unknown Merchant',
    message: message || '',
    reference: reference || '',
    date: new Date().toLocaleString(),
    status: 'completed'
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tip Receipt',
          text: `I just tipped ₹${receiptData.amount} to ${receiptData.merchant} via Tipper!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`I just tipped ₹${receiptData.amount} to ${receiptData.merchant} via Tipper!`);
    }
  };

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/user/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold text-tipper-gray-800">Transaction Receipt</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-tipper-success rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-tipper-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-tipper-gray-600">Your tip has been sent successfully</p>
        </div>

        {/* Receipt Card */}
        <Card className="mb-6">
          <CardHeader className="text-center bg-gradient-to-r from-tipper-primary to-tipper-secondary text-white">
            <CardTitle className="text-xl">Payment Receipt</CardTitle>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {receiptData.status}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-tipper-gray-600">Amount</span>
              <span className="text-2xl font-bold text-tipper-primary">₹{receiptData.amount}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-tipper-gray-600">To</span>
              <span className="font-medium text-tipper-gray-800">{receiptData.merchant}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-tipper-gray-600">Transaction ID</span>
              <span className="font-mono text-sm text-tipper-gray-800">{receiptData.transactionId}</span>
            </div>
            
            {receiptData.reference && (
              <div className="flex justify-between items-center">
                <span className="text-tipper-gray-600">Reference</span>
                <span className="font-mono text-sm text-tipper-gray-800">{receiptData.reference}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-tipper-gray-600">Date & Time</span>
              <span className="text-sm text-tipper-gray-800">{receiptData.date}</span>
            </div>
            
            {receiptData.message && (
              <div className="pt-4 border-t">
                <span className="text-tipper-gray-600">Message</span>
                <p className="text-tipper-gray-800 mt-1 italic">"{receiptData.message}"</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleShare} variant="outline" className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            Share Receipt
          </Button>
          
          <Button 
            onClick={() => navigate('/user/dashboard')} 
            className="w-full bg-tipper-primary hover:bg-tipper-primary-dark"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <Button 
            onClick={() => navigate('/user/tip')} 
            variant="outline" 
            className="w-full"
          >
            Send Another Tip
          </Button>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8 p-4 bg-white rounded-lg">
          <p className="text-tipper-gray-600 text-sm">
            Thank you for using Tipper! Your generosity makes a difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
