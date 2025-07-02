
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Clock, Download } from "lucide-react";
import { useState } from "react";

const SettlementManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const settlements = [
    {
      id: "SET001",
      settlementId: "settlement_789012",
      merchantName: "Coffee Corner",
      merchantId: "MERCH001",
      amount: "₹12,450",
      transactionCount: 25,
      requestedAt: "2024-06-11 10:00:00",
      status: "pending",
      paymentMethod: "Bank Transfer",
      accountDetails: "ICICI Bank ***4567",
      processingFee: "₹25",
      netAmount: "₹12,425",
      estimatedTime: "2-3 business days"
    },
    {
      id: "SET002",
      settlementId: "settlement_789013",
      merchantName: "Pizza Palace",
      merchantId: "MERCH002",
      amount: "₹8,920",
      transactionCount: 18,
      requestedAt: "2024-06-10 15:30:00",
      status: "processing",
      paymentMethod: "UPI",
      accountDetails: "UPI ID: merchant@okaxis",
      processingFee: "₹18",
      netAmount: "₹8,902",
      estimatedTime: "24 hours"
    },
    {
      id: "SET003",
      settlementId: "settlement_789014",
      merchantName: "Book Store",
      merchantId: "MERCH004",
      amount: "₹5,670",
      transactionCount: 12,
      requestedAt: "2024-06-09 09:15:00",
      status: "completed",
      paymentMethod: "Bank Transfer",
      accountDetails: "SBI Bank ***8901",
      processingFee: "₹12",
      netAmount: "₹5,658",
      estimatedTime: "Completed",
      completedAt: "2024-06-10 14:20:00"
    },
    {
      id: "SET004",
      settlementId: "settlement_789015",
      merchantName: "Demo Merchant",
      merchantId: "MERCH003",
      amount: "₹1,200",
      transactionCount: 5,
      requestedAt: "2024-06-11 12:00:00",
      status: "failed",
      paymentMethod: "Bank Transfer",
      accountDetails: "Demo Bank ***1234",
      processingFee: "₹5",
      netAmount: "₹1,195",
      estimatedTime: "Failed",
      failureReason: "Invalid account details"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSettlements = settlements.filter(settlement =>
    settlement.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    settlement.settlementId.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settlement Management</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by merchant name or settlement ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Settlement Details</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSettlements.map((settlement) => (
                <TableRow key={settlement.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium font-mono text-sm">{settlement.settlementId}</p>
                      <p className="text-sm text-gray-600">{settlement.transactionCount} transactions</p>
                      <p className="text-xs text-gray-500">Fee: {settlement.processingFee}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{settlement.merchantName}</p>
                      <p className="text-sm text-gray-500">{settlement.merchantId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold text-lg">{settlement.amount}</p>
                      <p className="text-sm text-green-600">Net: {settlement.netAmount}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{settlement.paymentMethod}</p>
                      <p className="text-sm text-gray-500">{settlement.accountDetails}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(settlement.status)}>
                      {settlement.status}
                    </Badge>
                    {settlement.status === 'failed' && settlement.failureReason && (
                      <p className="text-xs text-red-600 mt-1">{settlement.failureReason}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">Requested: {settlement.requestedAt}</p>
                      {settlement.completedAt && (
                        <p className="text-sm text-green-600">Completed: {settlement.completedAt}</p>
                      )}
                      <p className="text-xs text-gray-500">{settlement.estimatedTime}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {settlement.status === 'pending' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {settlement.status === 'failed' && (
                        <Button size="sm" variant="outline">
                          <Clock className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Settlement Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {settlements.filter(s => s.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending Approval</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {settlements.filter(s => s.status === 'processing').length}
              </p>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {settlements.filter(s => s.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-tipper-primary">
                ₹{settlements.reduce((sum, s) => sum + parseInt(s.netAmount.replace('₹', '').replace(',', '')), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Settled</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { SettlementManagement };
