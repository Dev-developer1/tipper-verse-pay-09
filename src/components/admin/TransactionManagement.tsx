
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, RefreshCw, AlertTriangle, Filter } from "lucide-react";
import { useState } from "react";

const TransactionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    {
      id: "TXN001",
      transactionId: "tip_1234567890",
      amount: "₹150",
      senderName: "Rahul Kumar",
      senderPhone: "+91 9876543210",
      receiverName: "Suresh Kumar (Valet)",
      merchantName: "Coffee Corner",
      status: "completed",
      paymentMethod: "UPI",
      timestamp: "2024-06-11 14:30:25",
      platformFee: "₹7.5",
      message: "Great service!",
      gatewayRef: "upi_ref_12345"
    },
    {
      id: "TXN002",
      transactionId: "tip_1234567891",
      amount: "₹200",
      senderName: "Priya Sharma",
      senderPhone: "+91 9876543211",
      receiverName: "Anita Sharma (Server)",
      merchantName: "Pizza Palace",
      status: "processing",
      paymentMethod: "Card",
      timestamp: "2024-06-11 14:25:10",
      platformFee: "₹10",
      message: "Excellent food service",
      gatewayRef: "card_ref_67890"
    },
    {
      id: "TXN003",
      transactionId: "tip_1234567892",
      amount: "₹100",
      senderName: "Demo User",
      senderPhone: "+91 9999999999",
      receiverName: "Demo Tip Taker",
      merchantName: "Demo Merchant",
      status: "failed",
      paymentMethod: "UPI",
      timestamp: "2024-06-11 14:20:45",
      platformFee: "₹5",
      message: "Thank you",
      gatewayRef: "upi_ref_error"
    },
    {
      id: "TXN004",
      transactionId: "tip_1234567893",
      amount: "₹75",
      senderName: "Amit Patel",
      senderPhone: "+91 9876543212",
      receiverName: "Ramesh Gupta (Driver)",
      merchantName: "Independent",
      status: "completed",
      paymentMethod: "Wallet",
      timestamp: "2024-06-11 13:45:30",
      platformFee: "₹3.75",
      message: "Safe drive",
      gatewayRef: "wallet_ref_54321"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'UPI': return 'bg-purple-100 text-purple-800';
      case 'Card': return 'bg-blue-100 text-blue-800';
      case 'Wallet': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.transactionId.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Management</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by sender, receiver, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Real-time
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Details</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Receiver</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium font-mono text-sm">{transaction.transactionId}</p>
                      <p className="text-xs text-gray-500">Fee: {transaction.platformFee}</p>
                      {transaction.message && (
                        <p className="text-xs text-gray-600 italic">"{transaction.message}"</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.senderName}</p>
                      <p className="text-sm text-gray-500">{transaction.senderPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.receiverName}</p>
                      <p className="text-sm text-gray-500">{transaction.merchantName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-lg">{transaction.amount}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentMethodColor(transaction.paymentMethod)}>
                      {transaction.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{transaction.timestamp}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {transaction.status === 'failed' && (
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-4 w-4" />
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

      {/* Transaction Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {transactions.filter(t => t.status === 'processing').length}
              </p>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {transactions.filter(t => t.status === 'failed').length}
              </p>
              <p className="text-sm text-gray-600">Failed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-tipper-primary">
                ₹{transactions.reduce((sum, t) => sum + parseInt(t.amount.replace('₹', '')), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Volume</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { TransactionManagement };
