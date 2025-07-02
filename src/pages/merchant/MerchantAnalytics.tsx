
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Users } from "lucide-react";

const MerchantAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/merchant/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-tipper-gray-900">Analytics</h1>
              <p className="text-tipper-gray-600">Detailed insights into your tip earnings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tipper-gray-600 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-tipper-gray-900">₹1,24,500</p>
                  <p className="text-tipper-success text-sm">+18% this month</p>
                </div>
                <DollarSign className="h-8 w-8 text-tipper-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tipper-gray-600 text-sm">Avg Tip Amount</p>
                  <p className="text-2xl font-bold text-tipper-gray-900">₹175</p>
                  <p className="text-tipper-success text-sm">+5% this month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-tipper-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tipper-gray-600 text-sm">Total Customers</p>
                  <p className="text-2xl font-bold text-tipper-gray-900">2,456</p>
                  <p className="text-tipper-success text-sm">+12% this month</p>
                </div>
                <Users className="h-8 w-8 text-tipper-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tipper-gray-600 text-sm">This Month</p>
                  <p className="text-2xl font-bold text-tipper-gray-900">₹45,320</p>
                  <p className="text-tipper-success text-sm">+25% vs last month</p>
                </div>
                <Calendar className="h-8 w-8 text-tipper-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Earning Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Saturday', 'Friday', 'Sunday', 'Thursday', 'Wednesday'].map((day, index) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-tipper-gray-700">{day}</span>
                    <span className="font-semibold">₹{2500 - (index * 200)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settlement History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: '2024-01-15', amount: 15400, status: 'Completed' },
                  { date: '2024-01-08', amount: 12800, status: 'Completed' },
                  { date: '2024-01-01', amount: 18200, status: 'Completed' }
                ].map((settlement, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-tipper-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-tipper-gray-900">₹{settlement.amount}</p>
                      <p className="text-sm text-tipper-gray-600">{settlement.date}</p>
                    </div>
                    <span className="px-2 py-1 bg-tipper-success text-white text-xs rounded">
                      {settlement.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MerchantAnalytics;
