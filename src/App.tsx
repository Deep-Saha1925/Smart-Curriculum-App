import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AttendanceSystem } from './components/AttendanceSystem';
import { 
  Users, 
  BookOpen, 
  Settings, 
  QrCode, 
  Brain, 
  TrendingUp,
  Shield,
  Clock,
  Target,
  Smartphone,
  Wifi,
  Camera,
  BarChart3,
  Sun,
  Moon
} from 'lucide-react';

type AppView = 'home' | 'student' | 'teacher' | 'admin' | 'attendance';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  const features = useMemo(() => [
    {
      icon: QrCode,
      title: "Automated Attendance",
      description: "QR code, Bluetooth/Wi-Fi proximity, and face recognition for seamless attendance tracking",
      color: "#3b82f6"
    },
    {
      icon: Brain,
      title: "AI-Powered Recommendations", 
      description: "Personalized activity suggestions based on student profiles, interests, and career goals",
      color: "#8b5cf6"
    },
    {
      icon: Target,
      title: "Smart Scheduling",
      description: "Generate daily routines combining class timetables, free time, and personal goals",
      color: "#10b981"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live attendance dashboards and productivity metrics for all stakeholders",
      color: "#f97316"
    }
  ], []);

  const stakeholders = useMemo(() => [
    {
      role: "Students",
      description: "Track attendance, get personalized activity recommendations, and optimize free time",
      benefits: ["Automated check-in", "Productivity coaching", "Career-aligned activities"]
    },
    {
      role: "Teachers",
      description: "Manage class attendance, assign activities, and monitor student engagement",
      benefits: ["Real-time attendance", "Activity management", "Student analytics"]
    },
    {
      role: "Administrators",
      description: "Oversee institutional attendance, manage users, and access system-wide analytics",
      benefits: ["System oversight", "User management", "Institutional insights"]
    },
    {
      role: "Career Counselors",
      description: "Access student progress data and provide targeted career guidance",
      benefits: ["Progress tracking", "Goal alignment", "Intervention insights"]
    }
  ], []);

  const handleBackToHome = useCallback(() => setCurrentView('home'), []);

  const renderDashboard = () => {
    switch (currentView) {
      case 'student':
        return <StudentDashboard onBack={handleBackToHome} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      case 'teacher':
        return <TeacherDashboard onBack={handleBackToHome} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      case 'admin':
        return <AdminDashboard onBack={handleBackToHome} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      case 'attendance':
        return <AttendanceSystem onBack={handleBackToHome} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
            {/* Theme Toggle Button */}
            <div className="fixed top-4 right-4 z-50">
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
            </div>

            {/* Header */}
            <div className="container mx-auto px-4 py-8">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-xl mr-4">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">SmartCurriculum</h1>
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Intelligent Attendance & Activity Management System for Modern Education
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">NEP 2020 Aligned</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700">AI-Powered</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700">Lightweight</Badge>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={index} className="p-6 text-center hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <div className="flex justify-center mb-4">
                        <IconComponent className="h-8 w-8" style={{ color: feature.color }} />
                      </div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </Card>
                  );
                })}
              </div>

              {/* Role-based Dashboards */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                  Access Your Dashboard
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setCurrentView('student')}
                    className="h-24 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Users className="h-6 w-6 mb-2" />
                    Student Dashboard
                  </Button>
                  <Button
                    onClick={() => setCurrentView('teacher')}
                    className="h-24 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <BookOpen className="h-6 w-6 mb-2" />
                    Teacher Dashboard
                  </Button>
                  <Button
                    onClick={() => setCurrentView('admin')}
                    className="h-24 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Settings className="h-6 w-6 mb-2" />
                    Admin Dashboard
                  </Button>
                  <Button
                    onClick={() => setCurrentView('attendance')}
                    className="h-24 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <QrCode className="h-6 w-6 mb-2" />
                    Attendance System
                  </Button>
                </div>
              </div>

              {/* Attendance Methods */}
              <Card className="p-8 mb-12 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                  Multiple Attendance Methods
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-blue-200 dark:border-blue-700">
                      <QrCode className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">QR Code Scanning</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Quick and contactless attendance marking using QR codes displayed in classrooms</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-green-200 dark:border-green-700">
                      <Wifi className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Proximity Detection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Automatic attendance using Bluetooth/Wi-Fi when students enter classroom zones</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-purple-200 dark:border-purple-700">
                      <Camera className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Face Recognition</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Advanced biometric attendance for enhanced security and accuracy</p>
                  </div>
                </div>
              </Card>

              {/* Stakeholders */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                  Beneficiaries & Impact
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {stakeholders.map((stakeholder, index) => (
                    <Card key={index} className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow">
                      <h3 className="font-semibold text-lg mb-3 text-blue-600 dark:text-blue-400">
                        {stakeholder.role}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{stakeholder.description}</p>
                      <div className="space-y-2">
                        {stakeholder.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
                            <span className="text-sm text-gray-700 dark:text-gray-200">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* System Benefits */}
              <Card className="p-8 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                  System Impact & Benefits
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Time Efficiency</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Saves 5-10 minutes per class by automating attendance, adding up to hours weekly</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Improved Accuracy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">99%+ attendance accuracy with automated systems vs manual recording</p>
                  </div>
                  <div className="text-center">
                    <Target className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Student Productivity</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Personalized recommendations boost productive use of free periods by 40%</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return renderDashboard();
}