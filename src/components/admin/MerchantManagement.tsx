
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, FileCheck, QrCode, Users, DollarSign } from "lucide-react";
import { useState } from "react";

const MerchantManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const merchants = [
    {
      id: "MERCH001",
      businessName: "Coffee Corner",
      ownerName: "Rajesh Kumar",
      phone: "+91 9876543220",
      email: "rajesh@coffeecorner.com",
      category: "Restaurant",
      status: "verified",
      qrCodes: 3,
      staffCount: 5,
      totalTransactions: 245,
      totalEarnings: "₹45,320",
      pendingSettlement: "₹12,450",
      joinDate: "2024-01-15"
    },
    {
      id: "MERCH002",
      businessName: "Pizza Palace",
      ownerName: "Neha Sharma",
      phone: "+91 9876543221",
      email: "neha@pizzapalace.com",
      category: "Restaurant",
      status: "pending",
      qrCodes: 2,
      staffCount: 8,
      totalTransactions: 189,
      totalEarnings: "₹32,890",
      pendingSettlement: "₹8,920",
      joinDate: "2024-02-10"
    },
    {
      id: "MERCH003",
      businessName: "Demo Merchant",
      ownerName: "Demo Owner",
      phone: "+91 9999999998",
      email: "merchant@demo.com",
      category: "Service",
      status: "demo",
      qrCodes: 1,
      staffCount: 2,
      totalTransactions: 25,
      totalEarnings: "₹5,600",
      pendingSettlement: "₹1,200",
      joinDate: "2024-03-01"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'demo': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMerchants = merchants.filter(merchant =>
    merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Merchant Management</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search merchants by business name, owner, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>QR Codes</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMerchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{merchant.businessName}</p>
                      <p className="text-sm text-gray-500">{merchant.ownerName}</p>
                      <p className="text-sm text-gray-500">{merchant.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{merchant.category}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(merchant.status)}>
                      {merchant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{merchant.qrCodes}</TableCell>
                  <TableCell>{merchant.staffCount}</TableCell>
                  <TableCell>{merchant.totalTransactions}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{merchant.totalEarnings}</p>
                      <p className="text-sm text-orange-600">Pending: {merchant.pendingSettlement}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileCheck className="h-4 w-4" />
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

      {/* Merchant Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {merchants.filter(m => m.status === 'verified').length}
              </p>
              <p className="text-sm text-gray-600">Verified Merchants</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {merchants.filter(m => m.status === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending Approval</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-tipper-primary">
                {merchants.reduce((sum, merchant) => sum + merchant.qrCodes, 0)}
              </p>
              <p className="text-sm text-gray-600">Total QR Codes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {merchants.reduce((sum, merchant) => sum + merchant.staffCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Staff</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { MerchantManagement };
