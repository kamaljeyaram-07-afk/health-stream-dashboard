import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { 
  Heart, 
  Thermometer, 
  Activity, 
  Droplets, 
  Calendar, 
  Pill, 
  Video, 
  LogOut,
  TrendingUp,
  Clock,
  Bell,
  CheckCircle,
  AlertCircle,
  Plus,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [vitals] = useState({
    bpm: 72,
    spo2: 98,
    temperature: 98.6,
    ecg: "Normal Sinus Rhythm"
  });

  // Mock data for charts
  const [vitalHistory] = useState([
    { time: "00:00", bpm: 70, spo2: 97, temp: 98.4 },
    { time: "04:00", bpm: 68, spo2: 98, temp: 98.2 },
    { time: "08:00", bpm: 72, spo2: 98, temp: 98.6 },
    { time: "12:00", bpm: 75, spo2: 97, temp: 98.8 },
    { time: "16:00", bpm: 73, spo2: 98, temp: 98.5 },
    { time: "20:00", bpm: 71, spo2: 98, temp: 98.7 },
  ]);

  const [healthGoals] = useState([
    { name: "Daily Steps", current: 8250, target: 10000, icon: Target },
    { name: "Water Intake", current: 6, target: 8, icon: Droplets },
    { name: "Sleep Hours", current: 7.5, target: 8, icon: Clock },
  ]);

  const [medications] = useState([
    { name: "Aspirin", dosage: "81mg", time: "8:00 AM", taken: true, nextDue: "Tomorrow 8:00 AM" },
    { name: "Metformin", dosage: "500mg", time: "12:00 PM", taken: true, nextDue: "Today 12:00 PM" },
    { name: "Lisinopril", dosage: "10mg", time: "6:00 PM", taken: false, nextDue: "Today 6:00 PM" },
    { name: "Vitamin D", dosage: "1000IU", time: "9:00 AM", taken: true, nextDue: "Tomorrow 9:00 AM" },
  ]);

  const [upcomingReminders] = useState([
    { type: "medication", title: "Take Lisinopril", time: "in 2 hours", urgent: true },
    { type: "appointment", title: "Cardiology Check-up", time: "Tomorrow 2:00 PM", urgent: false },
    { type: "test", title: "Blood Test Due", time: "in 3 days", urgent: false },
  ]);

  const [appointments] = useState([
    { doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "Dec 25, 2024", time: "2:00 PM", type: "Follow-up" },
    { doctor: "Dr. Michael Chen", specialty: "Internal Medicine", date: "Dec 28, 2024", time: "10:30 AM", type: "Consultation" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getVitalStatus = (vital: string, value: number) => {
    if (vital === "bpm") {
      if (value >= 60 && value <= 100) return "healthy";
      if (value >= 50 && value <= 120) return "warning";
      return "critical";
    }
    if (vital === "spo2") {
      if (value >= 95) return "healthy";
      if (value >= 90) return "warning";
      return "critical";
    }
    if (vital === "temperature") {
      if (value >= 97.8 && value <= 99.1) return "healthy";
      if (value >= 96.8 && value <= 100.4) return "warning";
      return "critical";
    }
    return "healthy";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header with Gradient */}
      <div className="bg-gradient-to-r from-medical-primary/10 to-medical-secondary/10 border-b border-border">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-medical-primary rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-medical-primary">Health Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back, John Doe • {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </Button>
              <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Quick Stats & Reminders */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className={`vital-card pulse-vital ${getVitalStatus("bpm", vitals.bpm) === "healthy" ? "status-healthy" : getVitalStatus("bpm", vitals.bpm) === "warning" ? "status-warning" : "status-critical"}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                  <Heart className="h-5 w-5 text-medical-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{vitals.bpm}</div>
                  <p className="text-xs text-muted-foreground">BPM</p>
                  <Badge variant="secondary" className={`mt-2 status-${getVitalStatus("bpm", vitals.bpm)}`}>
                    {getVitalStatus("bpm", vitals.bpm)}
                  </Badge>
                </CardContent>
              </Card>

              <Card className={`vital-card ${getVitalStatus("spo2", vitals.spo2) === "healthy" ? "status-healthy" : getVitalStatus("spo2", vitals.spo2) === "warning" ? "status-warning" : "status-critical"}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Oxygen</CardTitle>
                  <Droplets className="h-5 w-5 text-medical-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{vitals.spo2}</div>
                  <p className="text-xs text-muted-foreground">SpO2 %</p>
                  <Progress value={vitals.spo2} className="mt-2" />
                </CardContent>
              </Card>

              <Card className={`vital-card ${getVitalStatus("temperature", vitals.temperature) === "healthy" ? "status-healthy" : getVitalStatus("temperature", vitals.temperature) === "warning" ? "status-warning" : "status-critical"}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <Thermometer className="h-5 w-5 text-medical-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{vitals.temperature}</div>
                  <p className="text-xs text-muted-foreground">°F</p>
                  <Badge variant="secondary" className={`mt-2 status-${getVitalStatus("temperature", vitals.temperature)}`}>
                    {getVitalStatus("temperature", vitals.temperature)}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="vital-card status-healthy">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ECG Status</CardTitle>
                  <Activity className="h-5 w-5 text-medical-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">Normal</div>
                  <p className="text-xs text-muted-foreground">Sinus Rhythm</p>
                  <Badge variant="secondary" className="mt-2 status-healthy">
                    Stable
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Reminders Sidebar */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-medical-primary" />
                Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingReminders.map((reminder, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  reminder.urgent ? 'border-vital-critical bg-vital-critical/5' : 'border-medical-primary bg-medical-primary/5'
                }`}>
                  <div className="flex items-start gap-2">
                    {reminder.urgent ? 
                      <AlertCircle className="w-4 h-4 text-vital-critical mt-0.5" /> :
                      <CheckCircle className="w-4 h-4 text-medical-primary mt-0.5" />
                    }
                    <div className="flex-1">
                      <p className="font-medium text-sm">{reminder.title}</p>
                      <p className="text-xs text-muted-foreground">{reminder.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto lg:grid-cols-4 grid-cols-2">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="vitals" className="gap-2">
              <Activity className="w-4 h-4" />
              Vital Trends
            </TabsTrigger>
            <TabsTrigger value="medications" className="gap-2">
              <Pill className="w-4 h-4" />
              Medications
            </TabsTrigger>
            <TabsTrigger value="appointments" className="gap-2">
              <Calendar className="w-4 h-4" />
              Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Health Goals */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-medical-primary" />
                  Daily Health Goals
                </CardTitle>
                <CardDescription>Track your daily health objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {healthGoals.map((goal, index) => {
                    const IconComponent = goal.icon;
                    const percentage = (goal.current / goal.target) * 100;
                    return (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-medical-primary" />
                            <span className="font-medium">{goal.name}</span>
                          </div>
                          <Badge variant={percentage >= 100 ? "default" : "secondary"}>
                            {percentage >= 100 ? "Complete" : "In Progress"}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{goal.current}</span>
                            <span>{goal.target}</span>
                          </div>
                          <Progress value={Math.min(percentage, 100)} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-6">
            {/* Vital Signs Chart */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-medical-primary" />
                  Vital Signs Trends
                </CardTitle>
                <CardDescription>24-hour vital signs monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="time" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="bpm" 
                        stroke="hsl(var(--medical-primary))" 
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--medical-primary))", r: 4 }}
                        name="Heart Rate (BPM)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="spo2" 
                        stroke="hsl(var(--medical-secondary))" 
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--medical-secondary))", r: 4 }}
                        name="SpO2 (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Temperature Chart */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-medical-primary" />
                  Temperature Trend
                </CardTitle>
                <CardDescription>Body temperature over 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={vitalHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="time" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                        domain={['dataMin - 1', 'dataMax + 1']}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="hsl(var(--vital-warning))" 
                        fill="hsl(var(--vital-warning) / 0.2)"
                        strokeWidth={3}
                        name="Temperature (°F)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            {/* Enhanced Medications */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-medical-primary" />
                  Medication Management
                </CardTitle>
                <CardDescription>Track your daily medications and schedules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {medications.map((med, index) => (
                  <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${med.taken ? 'bg-vital-healthy' : 'bg-vital-warning'} animate-pulse`} />
                        <div className="space-y-1">
                          <p className="font-semibold">{med.name}</p>
                          <p className="text-sm text-muted-foreground">{med.dosage} • {med.time}</p>
                          <p className="text-xs text-muted-foreground">Next: {med.nextDue}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={med.taken ? "default" : "secondary"} className={med.taken ? "status-healthy" : "status-warning"}>
                          {med.taken ? "Taken" : "Pending"}
                        </Badge>
                        {!med.taken && (
                          <Button size="sm" className="btn-medical">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full btn-medical gap-2">
                  <Plus className="w-4 h-4" />
                  Add Medication
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            {/* Enhanced Appointments */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-medical-primary" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Manage your scheduled consultations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.map((apt, index) => (
                  <div key={index} className="p-6 bg-secondary/30 rounded-lg border border-border/50 hover:bg-secondary/50 transition-all hover:shadow-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-lg">{apt.doctor}</p>
                          <Badge variant="outline" className="text-xs">
                            {apt.specialty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {apt.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {apt.time}
                          </div>
                          <Badge variant="secondary">{apt.type}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" className="btn-medical gap-2">
                          <Video className="w-4 h-4" />
                          Join Call
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full btn-medical gap-2">
                  <Plus className="w-4 h-4" />
                  Book New Appointment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;