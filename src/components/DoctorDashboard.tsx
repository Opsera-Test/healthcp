import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Activity, User, Clock } from "lucide-react";
import { DEMO_PATIENTS, DEMO_APPOINTMENTS } from "@/data/mockData";
import { format, parseISO } from "date-fns";

export function DoctorDashboard() {
  const todayAppointments = DEMO_APPOINTMENTS.length;
  const totalPatients = DEMO_PATIENTS.length;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Appointments", value: todayAppointments, icon: Calendar },
          { label: "Total Patients", value: totalPatients, icon: Users },
          { label: "Pending Reviews", value: 3, icon: Activity },
          { label: "Avg. Wait Time", value: "12 min", icon: Clock },
        ].map((stat, index) => (
          <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient List */}
        <Card className="health-card">
          <CardHeader className="health-card-header">
            <Users className="icon-health" />
            <CardTitle className="text-lg">My Patients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEMO_PATIENTS.map((patient, index) => (
              <div
                key={patient.id}
                className="p-4 bg-secondary/50 rounded-lg flex items-center gap-4 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{patient.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      {patient.age}y
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.conditions.map((condition) => (
                      <Badge key={condition} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="text-muted-foreground">Last visit</p>
                  <p>{format(parseISO(patient.lastVisit), "MMM d")}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card className="health-card">
          <CardHeader className="health-card-header">
            <Calendar className="icon-health" />
            <CardTitle className="text-lg">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEMO_APPOINTMENTS.map((apt, index) => (
              <div
                key={apt.id}
                className="p-4 bg-secondary/50 rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{apt.time}</span>
                  <Badge variant={apt.type === "telehealth" ? "secondary" : "outline"}>
                    {apt.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Patient consultation - {apt.specialty}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {apt.location}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
