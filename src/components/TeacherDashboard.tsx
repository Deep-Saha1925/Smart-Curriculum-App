import React, { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Search,
  QrCode,
  Download,
  Plus,
  BookOpen,
  BarChart3,
  Sun,
  Moon
} from 'lucide-react';

interface TeacherDashboardProps {
  onBack: () => void;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

export const TeacherDashboard = React.memo<TeacherDashboardProps>(({ onBack, isDarkMode, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('CS301-Database Systems');

  // Mock teacher data
  const teacherData = useMemo(() => ({
    name: "Dr. Sarah Williams",
    employeeId: "FAC001",
    department: "Computer Science",
    subjects: ["Database Systems", "Software Engineering", "Data Structures"]
  }), []);

  const todayClasses = [
    {
      time: "09:00-10:00",
      subject: "Database Systems",
      section: "CS-A",
      room: "CS-102",
      totalStudents: 45,
      presentStudents: 42,
      status: "completed"
    },
    {
      time: "11:30-12:30",
      subject: "Software Engineering",
      section: "CS-B",
      room: "CS-103",
      totalStudents: 48,
      presentStudents: 0,
      status: "upcoming"
    },
    {
      time: "02:30-03:30",
      subject: "Data Structures",
      section: "CS-C",
      room: "CS-101",
      totalStudents: 50,
      presentStudents: 0,
      status: "upcoming"
    }
  ];

  const currentClassStudents = [
    { id: "CS21B001", name: "Alice Johnson", status: "present", time: "09:02" },
    { id: "CS21B002", name: "Bob Smith", status: "present", time: "09:00" },
    { id: "CS21B003", name: "Charlie Brown", status: "absent", time: "-" },
    { id: "CS21B004", name: "Diana Prince", status: "present", time: "09:01" },
    { id: "CS21B005", name: "Ethan Hunt", status: "late", time: "09:15" },
    { id: "CS21B006", name: "Fiona Green", status: "present", time: "09:03" },
    { id: "CS21B007", name: "George Miller", status: "absent", time: "-" },
    { id: "CS21B008", name: "Hannah White", status: "present", time: "09:05" }
  ];

  const activities = [
    {
      id: "1",
      title: "SQL Query Practice",
      description: "Practice complex JOIN operations",
      assignedTo: 15,
      completed: 12,
      category: "Programming"
    },
    {
      id: "2",
      title: "Database Design Project",
      description: "Design a library management system",
      assignedTo: 20,
      completed: 8,
      category: "Project"
    },
    {
      id: "3",
      title: "Reading: ACID Properties",
      description: "Chapter 15 - Transaction Management",
      assignedTo: 45,
      completed: 38,
      category: "Reading"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Present
        </Badge>;
      case 'absent':
        return <Badge className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Absent
        </Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Late
        </Badge>;
      default:
        return null;
    }
  };

  const getClassStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">Completed</Badge>;
      case 'ongoing':
        return <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700">Ongoing</Badge>;
      case 'upcoming':
        return <Badge className="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700">Upcoming</Badge>;
      default:
        return null;
    }
  };

  const filteredStudents = currentClassStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome, {teacherData.name}</p>
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

        {/* Teacher Info Card */}
        <Card className="p-6 mb-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Profile Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Employee ID: {teacherData.employeeId}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Department: {teacherData.department}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Today's Classes</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{todayClasses.length}</span>
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total students: 143</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Subjects</h3>
              <div className="flex flex-wrap gap-1">
                {teacherData.subjects.map((subject, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">{subject}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="classes">Today's Classes</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="classes">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                Today's Schedule
              </h3>
              <div className="space-y-3">
                {todayClasses.map((classItem, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{classItem.time}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{classItem.subject}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Section {classItem.section} • Room {classItem.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {classItem.presentStudents}/{classItem.totalStudents}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Students</p>
                      </div>
                      {getClassStatusBadge(classItem.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                  <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Class Attendance - {selectedClass}
                </h3>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid gap-3">
                {filteredStudents.map((student) => (
                  <div 
                    key={student.id} 
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{student.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {student.time !== '-' && (
                        <span className="text-sm text-gray-600 dark:text-gray-300">{student.time}</span>
                      )}
                      {getStatusBadge(student.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                  <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Assigned Activities
                </h3>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Activity
                </Button>
              </div>

              <div className="grid gap-4">
                {activities.map((activity) => (
                  <Card key={activity.id} className="p-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{activity.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{activity.description}</p>
                      </div>
                      <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">{activity.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Assigned to: {activity.assignedTo} students
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Completed: {activity.completed}/{activity.assignedTo}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {Math.round((activity.completed / activity.assignedTo) * 100)}%
                        </span>
                        <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div 
                            className="h-2 bg-green-500 dark:bg-green-400 rounded-full" 
                            style={{ width: `${(activity.completed / activity.assignedTo) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <BarChart3 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  Attendance Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Database Systems</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">93%</span>
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-18 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Software Engineering</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">89%</span>
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-17 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Data Structures</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">85%</span>
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-16 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Weekly Trends</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Monday</span>
                    <span className="font-medium text-gray-900 dark:text-white">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Tuesday</span>
                    <span className="font-medium text-gray-900 dark:text-white">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Wednesday</span>
                    <span className="font-medium text-gray-900 dark:text-white">88%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Thursday</span>
                    <span className="font-medium text-gray-900 dark:text-white">91%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Friday</span>
                    <span className="font-medium text-gray-900 dark:text-white">87%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
});