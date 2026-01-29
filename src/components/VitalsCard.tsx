import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity, Plus, Heart, Thermometer, Scale, Droplet } from "lucide-react";
import { useVitals } from "@/hooks/useVitals";
import { VitalRecord, VITAL_CONFIGS } from "@/data/mockData";
import { format } from "date-fns";

const VITAL_ICONS = {
  blood_pressure: Heart,
  heart_rate: Activity,
  temperature: Thermometer,
  weight: Scale,
  blood_sugar: Droplet,
};

export function VitalsCard() {
  const { addVital, getLatestVitals } = useVitals();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<VitalRecord["type"]>("blood_pressure");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<VitalRecord["status"]>("normal");

  const latestVitals = getLatestVitals();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    
    addVital({
      type: selectedType,
      value: value.trim(),
      unit: VITAL_CONFIGS[selectedType].unit,
      status,
    });
    setValue("");
    setIsAddOpen(false);
  };

  const getStatusClass = (status: VitalRecord["status"]) => {
    switch (status) {
      case "normal":
        return "vital-normal";
      case "elevated":
        return "vital-elevated";
      case "critical":
        return "vital-critical";
    }
  };

  return (
    <Card className="health-card">
      <CardHeader className="health-card-header">
        <Activity className="icon-health" />
        <CardTitle className="text-lg flex-1">Vitals</CardTitle>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" /> Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Vital</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label>Vital Type</Label>
                <Select
                  value={selectedType}
                  onValueChange={(v) => setSelectedType(v as VitalRecord["type"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(VITAL_CONFIGS).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Value ({VITAL_CONFIGS[selectedType].unit})</Label>
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={VITAL_CONFIGS[selectedType].placeholder}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={status}
                  onValueChange={(v) => setStatus(v as VitalRecord["status"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="elevated">Elevated</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Save Vital
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(VITAL_CONFIGS).map(([type, config], index) => {
            const vital = latestVitals[type];
            const Icon = VITAL_ICONS[type as keyof typeof VITAL_ICONS];
            
            return (
              <div
                key={type}
                className="p-4 bg-secondary/50 rounded-lg text-center animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground mb-1">{config.label}</p>
                {vital ? (
                  <>
                    <p className="text-lg font-semibold">
                      {vital.value}
                      <span className="text-xs text-muted-foreground ml-1">
                        {vital.unit}
                      </span>
                    </p>
                    <span
                      className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full border ${getStatusClass(
                        vital.status
                      )}`}
                    >
                      {vital.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(vital.recordedAt), "MMM d")}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">No data</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
