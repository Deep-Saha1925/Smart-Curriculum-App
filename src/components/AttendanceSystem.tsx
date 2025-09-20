import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  QrCode, 
  Wifi, 
  Camera, 
  Smartphone,
  CheckCircle,
  Clock,
  Users,
  MapPin,
  Signal,
  Scan,
  RefreshCw,
  Download,
  Play,
  Square,
  Eye,
  Settings,
  Sun,
  Moon
} from 'lucide-react';

interface AttendanceSystemProps {
  onBack: () => void;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

export const AttendanceSystem = React.memo<AttendanceSystemProps>(({ onBack, isDarkMode, toggleTheme }) => {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const [proximityDevices, setProximityDevices] = useState(12);
  const [faceRecognitionActive, setFaceRecognitionActive] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(0);

  // Mock session data
  const currentSession = {
    subject: "Database Systems",
    section: "CS-A",
    room: "CS-102",
    teacher: "Dr. Sarah Williams",
    startTime: "09:00",
    endTime: "10:00",
    totalStudents: 45,
    checkedIn: 38,
    expectedStudents: 42
  };

  const attendanceMethods = [
    {
      id: 'qr',
      name: 'QR Code Scanning',
      icon: <QrCode className="h-6 w-6" />,
      description: 'Students scan QR code displayed in classroom',
      status: 'active',
      count: 28,
      accuracy: 99.2
    },
    {
      id: 'proximity',
      name: 'Proximity Detection',
      icon: <Wifi className="h-6 w-6" />,
      description: 'Automatic detection via Bluetooth/Wi-Fi',
      status: 'active',
      count: 8,
      accuracy: 96.8
    },
    {
      id: 'face',
      name: 'Face Recognition',
      icon: <Camera className="h-6 w-6" />,
      description: 'Biometric attendance using camera',
      status: 'inactive',
      count: 2,
      accuracy: 98.5
    }
  ];

  const recentAttendance = [
    { id: "CS21B001", name: "Alice Johnson", method: "QR Code", time: "09:02", status: "present" },
    { id: "CS21B002", name: "Bob Smith", method: "Proximity", time: "09:00", status: "present" },
    { id: "CS21B003", name: "Charlie Brown", method: "-", time: "-", status: "absent" },
    { id: "CS21B004", name: "Diana Prince", method: "QR Code", time: "09:01", status: "present" },
    { id: "CS21B005", name: "Ethan Hunt", method: "Face Recognition", time: "09:15", status: "late" },
    { id: "CS21B006", name: "Fiona Green", method: "Proximity", time: "09:03", status: "present" }
  ];

  const classroomDevices = [
    { id: "QR-101", type: "QR Display", room: "CS-102", status: "active", lastUpdate: "2 min ago" },
    { id: "BT-102", type: "Bluetooth Beacon", room: "CS-102", status: "active", lastUpdate: "1 min ago" },
    { id: "CAM-103", type: "IP Camera", room: "CS-102", status: "standby", lastUpdate: "5 min ago" },
    { id: "WIFI-104", type: "Wi-Fi Access Point", room: "CS-102", status: "active", lastUpdate: "30 sec ago" }
  ];

  // Simulate session timer with optimized updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSession) {
      interval = setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 5000); // Update every 5 seconds instead of every second to reduce CPU usage
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeSession]);

  // Generate QR code
  const generateQRCode = useCallback(() => {
    const sessionId = Date.now().toString();
    setQrCode(`ATTEND_${sessionId}_${currentSession.subject.replace(/\s+/g, '')}`);
  }, [currentSession.subject]);

  const startSession = useCallback(() => {
    setActiveSession('current');
    generateQRCode();
    setSessionTimer(0);
  }, [generateQRCode]);

  const endSession = useCallback(() => {
    setActiveSession(null);
    setQrCode('');
    setSessionTimer(0);
  }, []);

  const formatTime = useMemo(() => (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700">Late</Badge>;
      default:
        return null;
    }
  };

  const getMethodBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600">Inactive</Badge>;
      case 'standby':
        return <Badge className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700">Standby</Badge>;
      default:
        return null;
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance System</h1>
              <p className="text-gray-600 dark:text-gray-300">Multi-modal attendance tracking</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {activeSession && (
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Session Active: {formatTime(sessionTimer)}
                </span>
              </div>
            )}
            
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
        </div>

        {/* Current Session Card */}
        <Card className="p-6 mb-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Current Session</h3>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{currentSession.subject}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Section {currentSession.section}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Room {currentSession.room}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Teacher</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{currentSession.teacher}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{currentSession.startTime} - {currentSession.endTime}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Attendance Progress</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {currentSession.checkedIn}/{currentSession.expectedStudents}
                </span>
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <Progress value={(currentSession.checkedIn / currentSession.expectedStudents) * 100} />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {Math.round((currentSession.checkedIn / currentSession.expectedStudents) * 100)}% attendance
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {!activeSession ? (
                <Button onClick={startSession} className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Session
                </Button>
              ) : (
                <Button onClick={endSession} variant="destructive">
                  <Square className="h-4 w-4 mr-2" />
                  End Session
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="methods" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="methods">Attendance Methods</TabsTrigger>
            <TabsTrigger value="live">Live Tracking</TabsTrigger>
            <TabsTrigger value="devices">Device Status</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="methods">
            <div className="grid md:grid-cols-3 gap-6">
              {attendanceMethods.map((method) => (
                <Card key={method.id} className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                        <div className="text-blue-600 dark:text-blue-400">
                          {method.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{method.name}</h3>
                    </div>
                    {getMethodBadge(method.status)}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{method.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Students checked in</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{method.count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Accuracy rate</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{method.accuracy}%</span>
                    </div>
                  </div>

                  {method.id === 'qr' && activeSession && (
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center border border-gray-200 dark:border-gray-600">
                      <div className="w-24 h-24 bg-black dark:bg-gray-900 mx-auto mb-2 rounded flex items-center justify-center border border-gray-300 dark:border-gray-600">
                        <QrCode className="h-16 w-16 text-white" />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">QR Code: {qrCode}</p>
                      <Button size="sm" variant="outline" className="mt-2 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600" onClick={generateQRCode}>
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Regenerate
                      </Button>
                    </div>
                  )}

                  {method.id === 'proximity' && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Signal className="h-4 w-4 text-green-500 dark:text-green-400" />
                        <span className="text-gray-700 dark:text-gray-300">{proximityDevices} devices detected</span>
                      </div>
                    </div>
                  )}

                  {method.id === 'face' && (
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        variant={faceRecognitionActive ? "destructive" : "default"}
                        onClick={() => setFaceRecognitionActive(!faceRecognitionActive)}
                        className="w-full"
                      >
                        {faceRecognitionActive ? (
                          <>
                            <Square className="h-3 w-3 mr-1" />
                            Stop Camera
                          </>
                        ) : (
                          <>
                            <Camera className="h-3 w-3 mr-1" />
                            Start Camera
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Live Attendance Tracking</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 dark:text-green-400">Live Updates</span>
                </div>
              </div>

              <div className="grid gap-3">
                {recentAttendance.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{student.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{student.method}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Method</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{student.time}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Time</p>
                      </div>
                      {getStatusBadge(student.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Classroom Device Status</h3>
                <Button size="sm" variant="outline" className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Devices
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {classroomDevices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                        <div className="text-blue-600 dark:text-blue-400">
                          {device.type.includes('QR') && <QrCode className="h-5 w-5" />}
                          {device.type.includes('Bluetooth') && <Smartphone className="h-5 w-5" />}
                          {device.type.includes('Camera') && <Camera className="h-5 w-5" />}
                          {device.type.includes('Wi-Fi') && <Wifi className="h-5 w-5" />}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{device.type}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{device.id} • {device.room}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {getMethodBadge(device.status)}
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{device.lastUpdate}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Classroom Coverage Map
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  All attendance methods are active and providing coverage for room {currentSession.room}
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="w-8 h-8 bg-green-500 dark:bg-green-400 rounded-full mx-auto mb-1" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">QR Zone</span>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-blue-500 dark:bg-blue-400 rounded-full mx-auto mb-1" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Bluetooth Zone</span>
                  </div>
                  <div>
                    <div className="w-8 h-8 bg-purple-500 dark:bg-purple-400 rounded-full mx-auto mb-1" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Camera Zone</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Method Performance</h3>
                <div className="space-y-4">
                  {attendanceMethods.map((method, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{method.name}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{method.accuracy}%</span>
                      </div>
                      <Progress value={method.accuracy} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Usage Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">QR Code Scans</span>
                    <span className="font-medium text-gray-900 dark:text-white">28 (74%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Proximity Detection</span>
                    <span className="font-medium text-gray-900 dark:text-white">8 (21%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Face Recognition</span>
                    <span className="font-medium text-gray-900 dark:text-white">2 (5%)</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-semibold text-gray-900 dark:text-white">Total Check-ins</span>
                    <span className="font-semibold text-gray-900 dark:text-white">38</span>
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