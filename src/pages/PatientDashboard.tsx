import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Thermometer, Activity, Droplets, Calendar, Pill, Video, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [vitals] = useState({
    bpm: 72,
    spo2: 98,
    temperature: 98.6,
    ecg: "Normal Sinus Rhythm"
  });

  const [medications] = useState([
    { name: "Aspirin", dosage: "81mg", time: "8:00 AM", taken: true },
    { name: "Metformin", dosage: "500mg", time: "12:00 PM", taken: true },
    { name: "Lisinopril", dosage: "10mg", time: "6:00 PM", taken: false },
  ]);

  const [appointments] = useState([
    { doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "Dec 25, 2024", time: "2:00 PM" },
    { doctor: "Dr. Michael Chen", specialty: "Internal Medicine", date: "Dec 28, 2024", time: "10:30 AM" },
  ]);

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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-medical-primary">Patient Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, John Doe</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Vitals Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className={`vital-card pulse-vital ${getVitalStatus("bpm", vitals.bpm) === "healthy" ? "status-healthy" : getVitalStatus("bpm", vitals.bpm) === "warning" ? "status-warning" : "status-critical"}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
              <Heart className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vitals.bpm} BPM</div>
              <Badge variant="secondary" className={`mt-2 status-${getVitalStatus("bpm", vitals.bpm)}`}>
                {getVitalStatus("bpm", vitals.bpm)}
              </Badge>
            </CardContent>
          </Card>

          <Card className={`vital-card ${getVitalStatus("spo2", vitals.spo2) === "healthy" ? "status-healthy" : getVitalStatus("spo2", vitals.spo2) === "warning" ? "status-warning" : "status-critical"}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Oxygen Saturation</CardTitle>
              <Droplets className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vitals.spo2}%</div>
              <Progress value={vitals.spo2} className="mt-2" />
            </CardContent>
          </Card>

          <Card className={`vital-card ${getVitalStatus("temperature", vitals.temperature) === "healthy" ? "status-healthy" : getVitalStatus("temperature", vitals.temperature) === "warning" ? "status-warning" : "status-critical"}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vitals.temperature}°F</div>
              <Badge variant="secondary" className={`mt-2 status-${getVitalStatus("temperature", vitals.temperature)}`}>
                {getVitalStatus("temperature", vitals.temperature)}
              </Badge>
            </CardContent>
          </Card>

          <Card className="vital-card status-healthy">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ECG</CardTitle>
              <Activity className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{vitals.ecg}</div>
              <Badge variant="secondary" className="mt-2 status-healthy">
                Normal
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medications */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-medical-primary" />
                Today's Medications
              </CardTitle>
              <CardDescription>Your daily medication schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((med, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-muted-foreground">{med.dosage} at {med.time}</p>
                  </div>
                  <Badge variant={med.taken ? "default" : "secondary"}>
                    {med.taken ? "Taken" : "Pending"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Appointments */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-medical-primary" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>Your scheduled consultations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.map((apt, index) => (
                <div key={index} className="p-4 bg-secondary/50 rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{apt.doctor}</p>
                      <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                      <p className="text-sm">{apt.date} at {apt.time}</p>
                    </div>
                    <Button size="sm" className="btn-medical gap-2">
                      <Video className="w-4 h-4" />
                      Join
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full btn-medical">
                Book New Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;