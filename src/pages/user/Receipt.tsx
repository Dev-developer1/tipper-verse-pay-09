
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Share2, CheckCircle } from "lucide-react";

const Receipt = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  
  // Mock transaction data
  const transaction = {
    id: transactionId || 'TXN001',
    amount: 250,
    merchant: 'Coffee Corner Cafe',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    status: 'completed',
    message: 'Great service!'
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tip Receipt',
        text: `I just tipped ₹${transaction.amount} to ${transaction.merchant}`,
        url: window.location.href,
      });
    }
  };

  const handleDownload = () => {
    // Simple download functionality
    const element = document.createElement('a');
    const file = new Blob([`Receipt - ${transaction.id}\nAmount: ₹${transaction.amount}\nMerchant: ${transaction.merchant}\nDate: ${transaction.date}`], 
      { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `receipt-${transaction.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tipper-primary to-tipper-secondary p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/user/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card className="bg-white/95 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-tipper-success rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-tipper-gray-800">Payment Successful!</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-tipper-primary mb-2">
                ₹{transaction.amount}
              </div>
              <p className="text-tipper-gray-600">Tip sent to {transaction.merchant}</p>
            </div>

            <div className="space-y-3 bg-tipper-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-tipper-gray-600">Transaction ID</span>
                <span className="font-medium text-tipper-gray-800">{transaction.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tipper-gray-600">Date</span>
                <span className="font-medium text-tipper-gray-800">{transaction.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tipper-gray-600">Time</span>
                <span className="font-medium text-tipper-gray-800">{transaction.time}</span>
              </div>
              {transaction.message && (
                <div className="flex justify-between">
                  <span className="text-tipper-gray-600">Message</span>
                  <span className="font-medium text-tipper-gray-800">"{transaction.message}"</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                className="flex-1 bg-tipper-secondary hover:bg-tipper-secondary-dark"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Receipt;
