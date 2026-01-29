import { useState, useEffect, useCallback } from "react";
import { VitalRecord, DEMO_VITALS } from "@/data/mockData";

const STORAGE_KEY = "healthapp_vitals";

export function useVitals() {
  const [vitals, setVitals] = useState<VitalRecord[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEMO_VITALS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vitals));
  }, [vitals]);

  const addVital = useCallback((vital: Omit<VitalRecord, "id" | "recordedAt">) => {
    const newVital: VitalRecord = {
      ...vital,
      id: `vital-${Date.now()}`,
      recordedAt: new Date().toISOString(),
    };
    setVitals((prev) => [newVital, ...prev]);
  }, []);

  const getLatestVitals = useCallback(() => {
    const latest: Record<string, VitalRecord> = {};
    vitals.forEach((vital) => {
      if (!latest[vital.type] || new Date(vital.recordedAt) > new Date(latest[vital.type].recordedAt)) {
        latest[vital.type] = vital;
      }
    });
    return latest;
  }, [vitals]);

  const getVitalsByType = useCallback(
    (type: VitalRecord["type"]) => {
      return vitals.filter((v) => v.type === type).slice(0, 10);
    },
    [vitals]
  );

  return {
    vitals,
    addVital,
    getLatestVitals,
    getVitalsByType,
  };
}
