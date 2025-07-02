
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Filter, Download, Calendar, Search } from "lucide-react";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const [transactions] = useState([
    {
      id: 'tx-001',
      recipient: 'Coffee House',
      recipientType: 'Merchant',
      amount: 150,
      date: '2024-06-11',
      time: '14:30',
      status: 'completed',
      paymentMethod: 'UPI'
    },
    {
      id: 'tx-002',
      recipient: 'Raj Kumar (Driver)',
      recipientType: 'Service Provider',
      amount: 100,
      date: '2024-06-11',
      time: '12:15',
      status: 'completed',
      paymentMethod: 'Card'
    },
    {
      id: 'tx-003',
      recipient: 'Restaurant ABC',
      recipientType: 'Merchant',
      amount: 200,
      date: '2024-06-10',
      time: '19:45',
      status: 'completed',
      paymentMethod: 'UPI'
    },
    {
      id: 'tx-004',
      recipient: 'Hotel Service',
      recipientType: 'Merchant',
      amount: 75,
      date: '2024-06-10',
      time: '10:30',
      status: 'failed',
      paymentMethod: 'Card'
    },
    {
      id: 'tx-005',
      recipient: 'Priya S. (Beautician)',
      recipientType: 'Service Provider',
      amount: 300,
      date: '2024-06-09',
      time: '16:20',
      status: 'completed',
      paymentMethod: 'UPI'
    }
  ]);

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'today' && tx.date === '2024-06-11') ||
      (dateFilter === 'week' && ['2024-06-11', '2024-06-10', '2024-06-09'].includes(tx.date));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-tipper-success';
      case 'failed': return 'bg-red-500';
      case 'pending': return 'bg-tipper-warning';
      default: return 'bg-tipper-gray-500';
    }
  };

  const getTotalAmount = () => {
    return filteredTransactions
      .filter(tx => tx.status === 'completed')
      .reduce((sum, tx) => sum + tx.amount, 0);
  };

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/user/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-tipper-gray-900">Transaction History</h1>
                <p className="text-tipper-gray-600">View and manage your tip history</p>
              </div>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-tipper-gray-600 text-sm">Total Tips Given</p>
                <p className="text-2xl font-bold text-tipper-gray-900">₹{getTotalAmount()}</p>
                <p className="text-tipper-success text-sm">{filteredTransactions.filter(tx => tx.status === 'completed').length} transactions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-tipper-gray-600 text-sm">This Month</p>
                <p className="text-2xl font-bold text-tipper-gray-900">₹825</p>
                <p className="text-tipper-success text-sm">+15% vs last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-tipper-gray-600 text-sm">Recipients</p>
                <p className="text-2xl font-bold text-tipper-gray-900">8</p>
                <p className="text-tipper-gray-600 text-sm">Unique recipients</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-tipper-gray-400" />
                <Input
                  placeholder="Search recipient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <select
                className="p-2 border border-tipper-gray-300 rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>

              <select
                className="p-2 border border-tipper-gray-300 rounded-md"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction List */}
        <Card>
          <CardHeader>
            <CardTitle>
              Transactions ({filteredTransactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-tipper-gray-50 rounded-lg hover:bg-tipper-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-tipper-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-tipper-primary font-semibold">
                        {transaction.recipientType === 'Merchant' ? 'M' : 'SP'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-tipper-gray-800">{transaction.recipient}</p>
                      <div className="flex items-center space-x-2 text-sm text-tipper-gray-600">
                        <span>{transaction.date} at {transaction.time}</span>
                        <span>•</span>
                        <span>{transaction.paymentMethod}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {transaction.recipientType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-tipper-gray-800">₹{transaction.amount}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`${getStatusColor(transaction.status)} text-white text-xs`}>
                        {transaction.status}
                      </Badge>
                      <span className="text-xs text-tipper-gray-500">{transaction.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-tipper-gray-500">No transactions found matching your filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionHistory;
