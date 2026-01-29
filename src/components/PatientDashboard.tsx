import { AppointmentsCard } from "./AppointmentsCard";
import { MedicationsCard } from "./MedicationsCard";
import { VitalsCard } from "./VitalsCard";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Pill, Activity } from "lucide-react";

export function PatientDashboard() {
  const { user } = useAuth();

  const quickStats = [
    { label: "Next Appointment", value: "Feb 15", icon: Calendar },
    { label: "Active Medications", value: "3", icon: Pill },
    { label: "Last Vitals Check", value: "Today", icon: Activity },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Welcome back, {user?.name?.split(" ")[0]}</h2>
              <p className="text-muted-foreground">
                Here's an overview of your health dashboard
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <CardContent className="p-4 text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-lg font-semibold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <AppointmentsCard />
        <VitalsCard />
      </div>

      <MedicationsCard />
    </div>
  );
}
