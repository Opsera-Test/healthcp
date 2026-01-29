import { useState, useEffect, useCallback } from "react";
import { Medication, DEMO_MEDICATIONS } from "@/data/mockData";

const STORAGE_KEY = "healthapp_medications";

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEMO_MEDICATIONS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medications));
  }, [medications]);

  const addMedication = useCallback((medication: Omit<Medication, "id">) => {
    const newMedication: Medication = {
      ...medication,
      id: `med-${Date.now()}`,
    };
    setMedications((prev) => [...prev, newMedication]);
  }, []);

  const updateMedication = useCallback((id: string, updates: Partial<Medication>) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, ...updates } : med))
    );
  }, []);

  const deleteMedication = useCallback((id: string) => {
    setMedications((prev) => prev.filter((med) => med.id !== id));
  }, []);

  return {
    medications,
    addMedication,
    updateMedication,
    deleteMedication,
  };
}
