import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, LogOut, RefreshCw } from "lucide-react";

export function DashboardHeader() {
  const { user, logout, switchRole } = useAuth();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">HealthCare Portal</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant={user.role === "doctor" ? "default" : "secondary"}
            className="capitalize"
          >
            {user.role}
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={switchRole}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Switch to {user.role === "patient" ? "Doctor" : "Patient"}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
