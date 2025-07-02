
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, QrCode, Edit, Trash2 } from "lucide-react";

const StaffManagement = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    phone: '',
    email: '',
    level: 'Staff'
  });

  const [staff] = useState([
    { 
      id: 'STAFF001', 
      name: 'John Doe', 
      phone: '+91 9876543210', 
      email: 'john@cafe.com', 
      level: 'Manager',
      qrCode: 'QR_JOHN_001'
    },
    { 
      id: 'STAFF002', 
      name: 'Jane Smith', 
      phone: '+91 9876543211', 
      email: 'jane@cafe.com', 
      level: 'Staff',
      qrCode: 'QR_JANE_002'
    }
  ]);

  const handleAddStaff = () => {
    console.log('Adding staff:', newStaff);
    setNewStaff({ name: '', phone: '', email: '', level: 'Staff' });
    setShowAddForm(false);
  };

  const generateQRCode = (staffId: string) => {
    console.log('Generating QR code for staff:', staffId);
  };

  return (
    <div className="min-h-screen bg-tipper-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/merchant/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-tipper-gray-900">Staff Management</h1>
                <p className="text-tipper-gray-600">Manage your team and generate QR codes</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-tipper-primary hover:bg-tipper-primary-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Staff Member</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-tipper-gray-700">Name</label>
                  <Input
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    placeholder="Enter staff name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-tipper-gray-700">Phone</label>
                  <Input
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-tipper-gray-700">Email</label>
                  <Input
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    placeholder="staff@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-tipper-gray-700">Level</label>
                  <select
                    className="w-full p-2 border border-tipper-gray-300 rounded-md"
                    value={newStaff.level}
                    onChange={(e) => setNewStaff({...newStaff, level: e.target.value})}
                  >
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button onClick={handleAddStaff} className="bg-tipper-primary hover:bg-tipper-primary-dark">
                  Add Staff Member
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {staff.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-tipper-gray-900">{member.name}</h3>
                    <p className="text-sm text-tipper-gray-600">{member.level}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-tipper-gray-600">
                    <span className="font-medium">Phone:</span> {member.phone}
                  </p>
                  <p className="text-sm text-tipper-gray-600">
                    <span className="font-medium">Email:</span> {member.email}
                  </p>
                  <p className="text-sm text-tipper-gray-600">
                    <span className="font-medium">ID:</span> {member.id}
                  </p>
                </div>

                <Button 
                  onClick={() => generateQRCode(member.id)}
                  className="w-full bg-tipper-secondary hover:bg-tipper-secondary-dark"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
