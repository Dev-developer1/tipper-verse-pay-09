
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Users, Building, CreditCard } from "lucide-react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const PlatformAnalytics = () => {
  const monthlyData = [
    { month: "Jan", tips: 1200, revenue: 180000, users: 150, merchants: 25 },
    { month: "Feb", tips: 1450, revenue: 220000, users: 180, merchants: 30 },
    { month: "Mar", tips: 1680, revenue: 252000, users: 210, merchants: 35 },
    { month: "Apr", tips: 1920, revenue: 288000, users: 245, merchants: 42 },
    { month: "May", tips: 2150, revenue: 322500, users: 280, merchants: 48 },
    { month: "Jun", tips: 2380, revenue: 357000, users: 315, merchants: 55 }
  ];

  const categoryData = [
    { name: "Restaurant", value: 45, amount: 180000 },
    { name: "Hotel", value: 25, amount: 100000 },
    { name: "Salon", value: 15, amount: 60000 },
    { name: "Delivery", value: 10, amount: 40000 },
    { name: "Others", value: 5, amount: 20000 }
  ];

  const regionData = [
    { region: "Mumbai", tips: 580, revenue: 87000 },
    { region: "Delhi", tips: 520, revenue: 78000 },
    { region: "Bangalore", tips: 480, revenue: 72000 },
    { region: "Chennai", tips: 420, revenue: 63000 },
    { region: "Hyderabad", tips: 380, revenue: 57000 },
    { region: "Pune", tips: 320, revenue: 48000 }
  ];

  const topPerformers = [
    { name: "Suresh Kumar (Valet)", tips: 156, earnings: "₹18,920", rating: 4.8, category: "Valet" },
    { name: "Anita Sharma (Server)", tips: 203, earnings: "₹24,560", rating: 4.9, category: "Server" },
    { name: "Rajesh Cook", tips: 145, earnings: "₹17,400", rating: 4.7, category: "Chef" },
    { name: "Meera Driver", tips: 134, earnings: "₹16,080", rating: 4.6, category: "Driver" },
    { name: "Vikram Cleaner", tips: 128, earnings: "₹15,360", rating: 4.5, category: "Cleaner" }
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Platform Analytics</h2>
          <p className="text-gray-600">Comprehensive insights across all user roles</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tips (6 months)</p>
                <p className="text-3xl font-bold">11,780</p>
                <p className="text-green-600 text-sm">↗ 24% from last period</p>
              </div>
              <CreditCard className="h-10 w-10 text-tipper-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Platform Revenue</p>
                <p className="text-3xl font-bold">₹1,76,700</p>
                <p className="text-green-600 text-sm">↗ 28% from last period</p>
              </div>
              <TrendingUp className="h-10 w-10 text-tipper-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-3xl font-bold">315</p>
                <p className="text-green-600 text-sm">↗ 18% from last period</p>
              </div>
              <Users className="h-10 w-10 text-tipper-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Merchants</p>
                <p className="text-3xl font-bold">55</p>
                <p className="text-green-600 text-sm">↗ 22% from last period</p>
              </div>
              <Building className="h-10 w-10 text-tipper-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Transaction Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                tips: { label: "Tips", color: "hsl(var(--chart-1))" },
                revenue: { label: "Revenue", color: "hsl(var(--chart-2))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="tips" stroke="var(--color-tips)" strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips by Service Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Percentage", color: "hsl(var(--chart-1))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                tips: { label: "Tips", color: "hsl(var(--chart-1))" },
                revenue: { label: "Revenue", color: "hsl(var(--chart-2))" }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <XAxis dataKey="region" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="tips" fill="var(--color-tips)" />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Tip Takers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{performer.name}</p>
                    <p className="text-sm text-gray-600">{performer.category}</p>
                    <p className="text-sm">⭐ {performer.rating} rating</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{performer.earnings}</p>
                    <p className="text-sm text-gray-600">{performer.tips} tips</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Platform Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-blue-600">₹150</p>
              <p className="text-sm text-gray-600">Average Tip Amount</p>
              <p className="text-xs text-green-600">↗ 12% increase</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-purple-600">68%</p>
              <p className="text-sm text-gray-600">Repeat Customer Rate</p>
              <p className="text-xs text-green-600">↗ 8% increase</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-orange-600">94%</p>
              <p className="text-sm text-gray-600">Settlement Success Rate</p>
              <p className="text-xs text-green-600">↗ 3% increase</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { PlatformAnalytics };
