import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Video, User } from "lucide-react";
import { DEMO_APPOINTMENTS } from "@/data/mockData";
import { format, parseISO } from "date-fns";

export function AppointmentsCard() {
  return (
    <Card className="health-card">
      <CardHeader className="health-card-header">
        <Calendar className="icon-health" />
        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {DEMO_APPOINTMENTS.map((apt, index) => (
          <div
            key={apt.id}
            className="p-4 bg-secondary/50 rounded-lg space-y-3 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="font-medium">{apt.doctorName}</span>
              </div>
              <Badge
                variant={apt.type === "telehealth" ? "secondary" : "outline"}
                className="text-xs"
              >
                {apt.type === "telehealth" ? (
                  <><Video className="w-3 h-3 mr-1" /> Virtual</>
                ) : (
                  "In-Person"
                )}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">{apt.specialty}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {format(parseISO(apt.date), "MMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {apt.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {apt.location}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
