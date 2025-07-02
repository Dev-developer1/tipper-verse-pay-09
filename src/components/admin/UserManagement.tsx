
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, UserX, Filter } from "lucide-react";
import { useState } from "react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: "USER001",
      name: "Rahul Kumar",
      phone: "+91 9876543210",
      email: "rahul@example.com",
      status: "active",
      totalTips: 45,
      totalAmount: "₹12,340",
      lastActivity: "2 hours ago",
      favorites: 8
    },
    {
      id: "USER002",
      name: "Priya Sharma",
      phone: "+91 9876543211",
      email: "priya@example.com",
      status: "active",
      totalTips: 32,
      totalAmount: "₹8,920",
      lastActivity: "1 day ago",
      favorites: 5
    },
    {
      id: "USER003",
      name: "Demo User",
      phone: "+91 9999999999",
      email: "user@demo.com",
      status: "demo",
      totalTips: 10,
      totalAmount: "₹2,500",
      lastActivity: "5 min ago",
      favorites: 2
    },
    {
      id: "USER004",
      name: "Amit Patel",
      phone: "+91 9876543212",
      email: "amit@example.com",
      status: "suspended",
      totalTips: 28,
      totalAmount: "₹7,650",
      lastActivity: "1 week ago",
      favorites: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'demo': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tips Given</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Favorites</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.totalTips}</TableCell>
                  <TableCell>{user.totalAmount}</TableCell>
                  <TableCell>{user.favorites}</TableCell>
                  <TableCell>{user.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.status === 'demo').length}
              </p>
              <p className="text-sm text-gray-600">Demo Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {users.filter(u => u.status === 'suspended').length}
              </p>
              <p className="text-sm text-gray-600">Suspended</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-tipper-primary">
                {users.reduce((sum, user) => sum + user.totalTips, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Tips</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { UserManagement };
