
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CreditCard, Building, TrendingUp, CheckCircle, AlertTriangle, XCircle, Activity } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const AdminOverview = () => {
  const stats = [
    { title: "Total Users", value: "12,456", icon: Users, change: "+8%", changeType: "positive" },
    { title: "Active Merchants", value: "1,234", icon: Building, change: "+12%", changeType: "positive" },
    { title: "Daily Transactions", value: "₹2,45,320", icon: CreditCard, change: "+18%", changeType: "positive" },
    { title: "Platform Revenue", value: "₹45,680", icon: TrendingUp, change: "+25%", changeType: "positive" }
  ];

  const pendingApprovals = [
    { id: "MERCH001", name: "Coffee Corner", type: "Merchant Registration", time: "2 hours ago", priority: "high" },
    { id: "MERCH002", name: "Pizza Palace", type: "Document Verification", time: "4 hours ago", priority: "medium" },
    { id: "MERCH003", name: "Book Store", type: "Settlement Request", time: "6 hours ago", priority: "low" },
    { id: "TIP001", name: "John Doe", type: "Tip Taker Onboarding", time: "1 hour ago", priority: "high" }
  ];

  const systemActivities = [
    { title: "System Backup", description: "Daily backup completed", status: "success", time: "10 min ago" },
    { title: "Security Scan", description: "Weekly security check", status: "success", time: "1 hour ago" },
    { title: "Payment Gateway", description: "All systems operational", status: "success", time: "2 hours ago" },
    { title: "Tip Spike Alert", description: "Unusual activity detected", status: "warning", time: "30 min ago" },
    { title: "Login Event", description: "Admin login from new IP", status: "info", time: "5 min ago" }
  ];

  const chartData = [
    { name: "Mon", transactions: 45, revenue: 2300 },
    { name: "Tue", transactions: 52, revenue: 2800 },
    { name: "Wed", transactions: 48, revenue: 2400 },
    { name: "Thu", transactions: 61, revenue: 3200 },
    { name: "Fri", transactions: 55, revenue: 2900 },
    { name: "Sat", transactions: 67, revenue: 3800 },
    { name: "Sun", transactions: 43, revenue: 2100 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-tipper-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-tipper-primary" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tipper-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-tipper-gray-900">{stat.value}</p>
                  <p className="text-tipper-success text-sm">{stat.change}</p>
                </div>
                <stat.icon className="h-8 w-8 text-tipper-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Transaction Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              transactions: {
                label: "Transactions",
                color: "hsl(var(--chart-1))",
              },
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="transactions" stroke="var(--color-transactions)" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex justify-between items-center p-3 bg-tipper-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-tipper-gray-900">{approval.name}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(approval.priority)}`}>
                        {approval.priority}
                      </span>
                    </div>
                    <p className="text-sm text-tipper-gray-600">{approval.type}</p>
                    <p className="text-xs text-tipper-gray-500">{approval.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-tipper-success hover:bg-tipper-success/90">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Real-Time System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-tipper-gray-50 rounded-lg">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-tipper-gray-900">{activity.title}</p>
                        <p className="text-sm text-tipper-gray-600">{activity.description}</p>
                      </div>
                      <span className="text-xs text-tipper-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { AdminOverview };
