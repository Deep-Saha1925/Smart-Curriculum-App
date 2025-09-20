import React, { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Target, 
  BookOpen, 
  Code, 
  Users, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Brain,
  Sun,
  Moon
} from 'lucide-react';

interface StudentDashboardProps {
  onBack: () => void;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

export const StudentDashboard = React.memo<StudentDashboardProps>(({ onBack, isDarkMode, toggleTheme }) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  // Mock student data
  const studentData = useMemo(() => ({
    name: "Alex Johnson",
    studentId: "CS21B047",
    semester: "6th Semester",
    course: "Computer Science Engineering",
    attendancePercentage: 87,
    careerGoal: "Software Developer",
    interests: ["Programming", "AI/ML", "Web Development"]
  }), []);

  const todaySchedule = [
    { time: "09:00-10:00", subject: "Data Structures", room: "CS-101", status: "present" },
    { time: "10:15-11:15", subject: "Free Period", room: "-", status: "free" },
    { time: "11:30-12:30", subject: "Database Systems", room: "CS-102", status: "upcoming" },
    { time: "01:30-02:30", subject: "Software Engineering", room: "CS-103", status: "upcoming" },
    { time: "02:45-03:45", subject: "Free Period", room: "-", status: "free" },
    { time: "04:00-05:00", subject: "AI & ML Lab", room: "CS-Lab1", status: "upcoming" }
  ];

  const recommendedActivities = [
    {
      id: "1",
      title: "LeetCode Problem Solving",
      description: "Practice DSA problems to strengthen your coding skills",
      duration: "30-60 mins",
      category: "Programming",
      difficulty: "Medium",
      relevanceScore: 95,
      icon: <Code className="h-5 w-5" />
    },
    {
      id: "2",
      title: "React.js Tutorial",
      description: "Learn modern web development with React components",
      duration: "45 mins",
      category: "Web Development",
      difficulty: "Beginner",
      relevanceScore: 88,
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: "3",
      title: "Career Skills Workshop",
      description: "Soft skills development for tech interviews",
      duration: "30 mins",
      category: "Career Development",
      difficulty: "Easy",
      relevanceScore: 82,
      icon: <Users className="h-5 w-5" />
    },
    {
      id: "4",
      title: "Machine Learning Basics",
      description: "Introduction to ML concepts and algorithms",
      duration: "60 mins",
      category: "AI/ML",
      difficulty: "Intermediate",
      relevanceScore: 90,
      icon: <Brain className="h-5 w-5" />
    }
  ];

  const achievements = [
    { title: "Attendance Star", description: "90%+ attendance this month", icon: <Star className="h-5 w-5 text-yellow-500" /> },
    { title: "Code Warrior", description: "Solved 50+ coding problems", icon: <Code className="h-5 w-5 text-blue-500" /> },
    { title: "Learning Streak", description: "7 days continuous learning", icon: <Award className="h-5 w-5 text-purple-500" /> }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">Present</Badge>;
      case 'free':
        return <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700">Free Period</Badge>;
      case 'upcoming':
        return <Badge className="bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700">Upcoming</Badge>;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Intermediate':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back, {studentData.name}!</p>
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

        {/* Student Info Card */}
        <Card className="p-6 mb-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Profile Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Student ID: {studentData.studentId}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{studentData.course}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{studentData.semester}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Attendance</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">{studentData.attendancePercentage}%</span>
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <Progress value={studentData.attendancePercentage} className="w-full" />
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Career Goal</h3>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium text-gray-900 dark:text-white">{studentData.careerGoal}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {studentData.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">{interest}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                Today's Schedule
              </h3>
              <div className="space-y-3">
                {todaySchedule.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{item.time}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.subject}</p>
                        {item.room !== "-" && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">Room: {item.room}</p>
                        )}
                      </div>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                Personalized Activity Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Based on your career goal ({studentData.careerGoal}) and current free periods
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {recommendedActivities.map((activity) => (
                  <Card 
                    key={activity.id} 
                    className="p-4 cursor-pointer hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 bg-white dark:bg-gray-800"
                    onClick={() => setSelectedActivity(activity.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-gray-600 dark:text-gray-400">
                          {activity.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{activity.title}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{activity.relevanceScore}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">{activity.category}</Badge>
                        <span className={`text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{activity.duration}</span>
                    </div>
                    {selectedActivity === activity.id && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <Button size="sm" className="w-full">Start Activity</Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Weekly Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Attendance</span>
                      <span className="font-medium text-gray-900 dark:text-white">87%</span>
                    </div>
                    <Progress value={87} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Activities Completed</span>
                      <span className="font-medium text-gray-900 dark:text-white">12/15</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300">Study Hours</span>
                      <span className="font-medium text-gray-900 dark:text-white">28/30</span>
                    </div>
                    <Progress value={93} />
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Learning Streaks</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-900 dark:text-white">Coding Practice</span>
                    </div>
                    <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">7 days</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white">Reading</span>
                    </div>
                    <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700">5 days</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-gray-900 dark:text-white">Goal Activities</span>
                    </div>
                    <Badge className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700">3 days</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Achievements & Badges</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-4 text-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow">
                    <div className="flex justify-center mb-3">
                      {achievement.icon}
                    </div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
});