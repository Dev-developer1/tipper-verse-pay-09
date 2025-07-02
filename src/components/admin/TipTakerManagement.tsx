
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, QrCode, Star, UserPlus } from "lucide-react";
import { useState } from "react";

const TipTakerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tipTakers = [
    {
      id: "TIP001",
      name: "Suresh Kumar",
      phone: "+91 9876543230",
      email: "suresh@example.com",
      category: "Valet",
      status: "active",
      merchantId: "MERCH001",
      merchantName: "Coffee Corner",
      type: "employed", // employed or freelance
      totalTips: 156,
      totalEarnings: "₹18,920",
      avgTipAmount: "₹121",
      customerRating: 4.8,
      qrCodeId: "QR_TIP001",
      joinDate: "2024-01-20"
    },
    {
      id: "TIP002",
      name: "Anita Sharma",
      phone: "+91 9876543231",
      email: "anita@example.com",
      category: "Server",
      status: "active",
      merchantId: "MERCH002",
      merchantName: "Pizza Palace",
      type: "employed",
      totalTips: 203,
      totalEarnings: "₹24,560",
      avgTipAmount: "₹121",
      customerRating: 4.9,
      qrCodeId: "QR_TIP002",
      joinDate: "2024-02-05"
    },
    {
      id: "TIP003",
      name: "Ramesh Gupta",
      phone: "+91 9876543232",
      email: "ramesh@example.com",
      category: "Driver",
      status: "active",
      merchantId: null,
      merchantName: null,
      type: "freelance",
      totalTips: 89,
      totalEarnings: "₹12,340",
      avgTipAmount: "₹139",
      customerRating: 4.5,
      qrCodeId: "QR_TIP003",
      joinDate: "2024-01-15"
    },
    {
      id: "TIP004",
      name: "Demo Tip Taker",
      phone: "+91 9999999997",
      email: "tiptaker@demo.com",
      category: "Service",
      status: "demo",
      merchantId: "MERCH003",
      merchantName: "Demo Merchant",
      type: "employed",
      totalTips: 15,
      totalEarnings: "₹1,850",
      avgTipAmount: "₹123",
      customerRating: 4.2,
      qrCodeId: "QR_DEMO_TIP",
      joinDate: "2024-03-01"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'demo': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'employed': return 'bg-purple-100 text-purple-800';
      case 'freelance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTipTakers = tipTakers.filter(tipTaker =>
    tipTaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tipTaker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tipTaker.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tip Taker (Service Provider) Management</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tip takers by name, category, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Tip Taker
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Provider</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTipTakers.map((tipTaker) => (
                <TableRow key={tipTaker.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{tipTaker.name}</p>
                      <p className="text-sm text-gray-500">{tipTaker.email}</p>
                      <p className="text-sm text-gray-500">{tipTaker.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tipTaker.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(tipTaker.type)}>
                      {tipTaker.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(tipTaker.status)}>
                      {tipTaker.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {tipTaker.merchantName ? (
                      <div>
                        <p className="text-sm font-medium">{tipTaker.merchantName}</p>
                        <p className="text-xs text-gray-500">ID: {tipTaker.merchantId}</p>
                      </div>
                    ) : (
                      <span className="text-gray-400">Independent</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{tipTaker.totalTips} tips</p>
                      <p className="text-sm text-green-600">{tipTaker.totalEarnings}</p>
                      <p className="text-xs text-gray-500">Avg: {tipTaker.avgTipAmount}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{tipTaker.customerRating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tip Taker Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {tipTakers.filter(t => t.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active Tip Takers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {tipTakers.filter(t => t.type === 'employed').length}
              </p>
              <p className="text-sm text-gray-600">Employed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {tipTakers.filter(t => t.type === 'freelance').length}
              </p>
              <p className="text-sm text-gray-600">Freelance</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-tipper-primary">
                {tipTakers.reduce((sum, tipTaker) => sum + tipTaker.totalTips, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Tips Received</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {(tipTakers.reduce((sum, tipTaker) => sum + tipTaker.customerRating, 0) / tipTakers.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { TipTakerManagement };
