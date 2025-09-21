import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Stethoscope, Users, Video, Activity, Pill, LogOut, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  
  const [patients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 45,
      condition: "Hypertension",
      status: "stable",
      lastVisit: "2024-12-20",
      vitals: { bpm: 72, spo2: 98, temperature: 98.6 },
      medications: ["Lisinopril 10mg", "Aspirin 81mg"]
    },
    {
      id: 2,
      name: "Sarah Wilson",
      age: 32,
      condition: "Diabetes Type 2",
      status: "monitoring",
      lastVisit: "2024-12-18",
      vitals: { bpm: 68, spo2: 97, temperature: 98.2 },
      medications: ["Metformin 500mg", "Insulin"]
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 58,
      condition: "Heart Disease",
      status: "critical",
      lastVisit: "2024-12-21",
      vitals: { bpm: 95, spo2: 94, temperature: 99.1 },
      medications: ["Atorvastatin 20mg", "Metoprolol 50mg"]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable": return "status-healthy";
      case "monitoring": return "status-warning";
      case "critical": return "status-critical";
      default: return "status-healthy";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-medical-primary">Doctor Dashboard</h1>
            <p className="text-muted-foreground mt-1">Dr. Sarah Johnson - Cardiology</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
              <p className="text-xs text-muted-foreground">Active patients</p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
              <Activity className="h-4 w-4 text-vital-critical" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-vital-critical">
                {patients.filter(p => p.status === "critical").length}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Consultations</CardTitle>
              <Stethoscope className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patients List */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-medical-primary" />
                My Patients
              </CardTitle>
              <CardDescription>Click on a patient to view details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {patients.map((patient) => (
                <div 
                  key={patient.id}
                  className={`p-4 bg-secondary/50 rounded-lg cursor-pointer transition-all hover:bg-secondary/70 ${
                    selectedPatient?.id === patient.id ? 'ring-2 ring-medical-primary' : ''
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">Age {patient.age} • {patient.condition}</p>
                        <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                        <Button size="sm" className="btn-medical gap-1">
                          <Video className="w-3 h-3" />
                          Meet
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Patient Details */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-medical-primary" />
                Patient Details
              </CardTitle>
              <CardDescription>
                {selectedPatient ? `${selectedPatient.name}'s medical information` : "Select a patient to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPatient ? (
                <div className="space-y-6">
                  {/* Vitals */}
                  <div>
                    <h3 className="font-semibold mb-3">Current Vitals</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Heart Rate</p>
                        <p className="text-lg font-bold">{selectedPatient.vitals.bpm} BPM</p>
                      </div>
                      <div className="text-center p-3 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">SpO2</p>
                        <p className="text-lg font-bold">{selectedPatient.vitals.spo2}%</p>
                      </div>
                      <div className="text-center p-3 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Temp</p>
                        <p className="text-lg font-bold">{selectedPatient.vitals.temperature}°F</p>
                      </div>
                    </div>
                  </div>

                  {/* Medications */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Current Medications
                    </h3>
                    <div className="space-y-2">
                      {selectedPatient.medications.map((med: string, index: number) => (
                        <div key={index} className="p-2 bg-secondary/50 rounded text-sm">
                          {med}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button className="w-full btn-medical gap-2">
                      <Video className="w-4 h-4" />
                      Start Video Consultation
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline">
                        View History
                      </Button>
                      <Button variant="outline">
                        Update Treatment
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a patient from the list to view their details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;