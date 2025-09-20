import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Users, 
  School, 
  BarChart3, 
  Settings, 
  UserPlus,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Database,
  Shield,
  Bell,
  Sun,
  Moon
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

export const AdminDashboard = React.memo<AdminDashboardProps>(({ onBack, isDarkMode, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock admin data
  const systemStats = {
    totalStudents: 2847,
    totalTeachers: 142,
    activeSessions: 28,
    avgAttendance: 91.2,
    totalDepartments: 8,
    systemUptime: 99.7
  };

  const recentActivities = [
    { time: "2 min ago", action: "New student registered", user: "John Doe", type: "registration" },
    { time: "5 min ago", action: "Attendance session started", user: "Dr. Smith", type: "attendance" },
    { time: "10 min ago", action: "System backup completed", user: "System", type: "system" },
    { time: "15 min ago", action: "Teacher account activated", user: "Prof. Johnson", type: "account" },
    { time: "20 min ago", action: "Bulk attendance imported", user: "Admin", type: "import" }
  ];

  const departments = [
    { name: "Computer Science", students: 420, teachers: 25, attendance: 93.2 },
    { name: "Electronics", students: 380, teachers: 22, attendance: 89.5 },
    { name: "Mechanical", students: 450, teachers: 28, attendance: 90.8 },
    { name: "Civil", students: 390, teachers: 24, attendance: 88.7 },
    { name: "Chemical", students: 340, teachers: 20, attendance: 91.4 },
    { name: "Information Technology", students: 410, teachers: 23, attendance: 94.1 }
  ];

  const systemAlerts = [
    { type: "warning", message: "Low attendance in ME-302 (Chemistry Lab)", time: "1 hour ago" },
    { type: "info", message: "System maintenance scheduled for tonight", time: "2 hours ago" },
    { type: "success", message: "Backup completed successfully", time: "4 hours ago" },
    { type: "error", message: "Failed QR generation for CS-101", time: "6 hours ago" }
  ];

  const pendingApprovals = [
    { type: "Student Registration", name: "Alice Johnson", department: "CS", status: "pending" },
    { type: "Teacher Account", name: "Dr. Michael Brown", department: "EE", status: "pending" },
    { type: "Bulk Import Request", name: "Registrar Office", department: "Admin", status: "review" },
    { type: "System Integration", name: "ERP Team", department: "IT", status: "pending" }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registration':
        return <UserPlus className="h-4 w-4 text-green-600" />;
      case 'attendance':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'system':
        return <Settings className="h-4 w-4 text-gray-600" />;
      case 'account':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <Database className="h-4 w-4 text-orange-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">System Overview & Management</p>
            </div>
          </div>
          
          {/* Theme Toggle */}
          {toggleTheme && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-gray-700" />
              )}
            </Button>
          )}
        </div>

        {/* System Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card className="p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Students</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{systemStats.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </Card>
          
          <Card className="p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Teachers</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{systemStats.totalTeachers}</p>
              </div>
              <School className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </Card>

          <Card className="p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Active Sessions</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{systemStats.activeSessions}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </Card>

          <Card className="p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Avg Attendance</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{systemStats.avgAttendance}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </Card>

          <Card className="p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Departments</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{systemStats.totalDepartments}</p>
              </div>
              <School className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </Card>

          <Card className="p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">System Uptime</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{systemStats.systemUptime}%</p>
              </div>
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent System Activities</h3>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{activity.user} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* System Alerts */}
              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">System Alerts</h3>
                <div className="space-y-3">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">{alert.message}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Pending Approvals */}
            <Card className="p-6 mt-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Approvals</h3>
                <Badge className="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700">
                  {pendingApprovals.length} pending
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {pendingApprovals.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.type}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.name} • {item.department}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Reject
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500">
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Department Overview</h3>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>

              <div className="grid gap-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{dept.name}</h4>
                      <div className="flex items-center gap-6 mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Students: {dept.students}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Teachers: {dept.teachers}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Attendance: {dept.attendance}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div 
                          className="h-2 bg-green-500 dark:bg-green-400 rounded-full" 
                          style={{ width: `${dept.attendance}%` }}
                        />
                      </div>
                      <Button size="sm" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Management</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem value="all" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">All Departments</SelectItem>
                    <SelectItem value="cs" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Computer Science</SelectItem>
                    <SelectItem value="ee" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Electronics</SelectItem>
                    <SelectItem value="me" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Mechanical</SelectItem>
                    <SelectItem value="ce" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 font-semibold text-sm text-gray-900 dark:text-white">
                  <span>Name</span>
                  <span>Role</span>
                  <span>Department</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Sample user rows */}
                  <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <span className="font-medium text-gray-900 dark:text-white">Dr. Sarah Williams</span>
                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">Teacher</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Computer Science</span>
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">Active</Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Suspend
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <span className="font-medium text-gray-900 dark:text-white">Alex Johnson</span>
                    <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">Student</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Computer Science</span>
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">Active</Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Suspend
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">System Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">CPU Usage</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">45%</span>
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-9 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Memory Usage</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">62%</span>
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-12 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Storage Usage</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">38%</span>
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-8 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Network I/O</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">23%</span>
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-5 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">System Maintenance</h3>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Database className="h-4 w-4 mr-2" />
                    Run Database Cleanup
                  </Button>
                  <Button className="w-full" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Download className="h-4 w-4 mr-2" />
                    Create System Backup
                  </Button>
                  <Button className="w-full" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Performance Report
                  </Button>
                  <Button className="w-full" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Update System Settings
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Attendance Reports</h3>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Daily Attendance Report
                  </Button>
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Weekly Summary Report
                  </Button>
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Monthly Analytics Report
                  </Button>
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Low Attendance Alert Report
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">User Activity Reports</h3>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Student Engagement Report
                  </Button>
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Teacher Activity Report
                  </Button>
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    System Usage Analytics
                  </Button>
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Goal Achievement Report
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">System Reports</h3>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Performance Metrics Report
                  </Button>
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Security Audit Report
                  </Button>
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Integration Status Report
                  </Button>
                  <Button className="w-full" variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Custom Report Builder
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
});