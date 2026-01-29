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
import { Pill, Plus, Trash2, Edit2 } from "lucide-react";
import { useMedications } from "@/hooks/useMedications";
import { Medication } from "@/data/mockData";

export function MedicationsCard() {
  const { medications, addMedication, updateMedication, deleteMedication } = useMedications();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addMedication({
      name: formData.get("name") as string,
      dosage: formData.get("dosage") as string,
      frequency: formData.get("frequency") as string,
      prescribedBy: formData.get("prescribedBy") as string,
      startDate: new Date().toISOString().split("T")[0],
      instructions: formData.get("instructions") as string,
    });
    setIsAddOpen(false);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingMed) return;
    const formData = new FormData(e.currentTarget);
    updateMedication(editingMed.id, {
      name: formData.get("name") as string,
      dosage: formData.get("dosage") as string,
      frequency: formData.get("frequency") as string,
      instructions: formData.get("instructions") as string,
    });
    setEditingMed(null);
  };

  const MedicationForm = ({
    medication,
    onSubmit,
  }: {
    medication?: Medication;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Medication Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={medication?.name}
          placeholder="e.g., Lisinopril"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            name="dosage"
            defaultValue={medication?.dosage}
            placeholder="e.g., 10mg"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Input
            id="frequency"
            name="frequency"
            defaultValue={medication?.frequency}
            placeholder="e.g., Once daily"
            required
          />
        </div>
      </div>
      {!medication && (
        <div className="space-y-2">
          <Label htmlFor="prescribedBy">Prescribed By</Label>
          <Input
            id="prescribedBy"
            name="prescribedBy"
            placeholder="e.g., Dr. Smith"
            required
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions (optional)</Label>
        <Input
          id="instructions"
          name="instructions"
          defaultValue={medication?.instructions}
          placeholder="e.g., Take with food"
        />
      </div>
      <Button type="submit" className="w-full">
        {medication ? "Update Medication" : "Add Medication"}
      </Button>
    </form>
  );

  return (
    <Card className="health-card">
      <CardHeader className="health-card-header">
        <Pill className="icon-health" />
        <CardTitle className="text-lg flex-1">Medications</CardTitle>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <MedicationForm onSubmit={handleAdd} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-3">
        {medications.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No medications added yet
          </p>
        ) : (
          medications.map((med, index) => (
            <div
              key={med.id}
              className="p-4 bg-secondary/50 rounded-lg animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{med.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {med.dosage} • {med.frequency}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Dialog
                    open={editingMed?.id === med.id}
                    onOpenChange={(open) => !open && setEditingMed(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => setEditingMed(med)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Medication</DialogTitle>
                      </DialogHeader>
                      <MedicationForm medication={med} onSubmit={handleUpdate} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => deleteMedication(med.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {med.instructions && (
                <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                  {med.instructions}
                </p>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
