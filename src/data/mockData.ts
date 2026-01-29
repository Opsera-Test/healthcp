// Demo healthcare data - No real PHI, HIPAA-safe mock data only

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  type: "in-person" | "telehealth";
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate?: string;
  instructions?: string;
}

export interface VitalRecord {
  id: string;
  type: "blood_pressure" | "heart_rate" | "temperature" | "weight" | "blood_sugar";
  value: string;
  unit: string;
  recordedAt: string;
  status: "normal" | "elevated" | "critical";
}

export interface PatientSummary {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  conditions: string[];
  upcomingAppointment?: string;
}

// Static demo appointments
export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-001",
    doctorName: "Dr. Sarah Chen",
    specialty: "Primary Care",
    date: "2024-02-15",
    time: "10:00 AM",
    location: "Main Clinic, Room 204",
    type: "in-person",
  },
  {
    id: "apt-002",
    doctorName: "Dr. Michael Ross",
    specialty: "Cardiology",
    date: "2024-02-20",
    time: "2:30 PM",
    location: "Heart Center, Suite 500",
    type: "in-person",
  },
  {
    id: "apt-003",
    doctorName: "Dr. Emily Watson",
    specialty: "Dermatology",
    date: "2024-02-28",
    time: "11:00 AM",
    location: "Virtual Visit",
    type: "telehealth",
  },
];

// Initial demo medications
export const DEMO_MEDICATIONS: Medication[] = [
  {
    id: "med-001",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedBy: "Dr. Sarah Chen",
    startDate: "2024-01-15",
    instructions: "Take in the morning with water",
  },
  {
    id: "med-002",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescribedBy: "Dr. Sarah Chen",
    startDate: "2024-01-15",
    instructions: "Take with meals",
  },
  {
    id: "med-003",
    name: "Vitamin D3",
    dosage: "2000 IU",
    frequency: "Once daily",
    prescribedBy: "Dr. Emily Watson",
    startDate: "2023-12-01",
    instructions: "Take with food for better absorption",
  },
];

// Demo vitals history
export const DEMO_VITALS: VitalRecord[] = [
  {
    id: "vital-001",
    type: "blood_pressure",
    value: "120/80",
    unit: "mmHg",
    recordedAt: "2024-02-10T09:00:00",
    status: "normal",
  },
  {
    id: "vital-002",
    type: "heart_rate",
    value: "72",
    unit: "bpm",
    recordedAt: "2024-02-10T09:00:00",
    status: "normal",
  },
  {
    id: "vital-003",
    type: "temperature",
    value: "98.6",
    unit: "°F",
    recordedAt: "2024-02-10T09:05:00",
    status: "normal",
  },
  {
    id: "vital-004",
    type: "weight",
    value: "165",
    unit: "lbs",
    recordedAt: "2024-02-08T08:00:00",
    status: "normal",
  },
  {
    id: "vital-005",
    type: "blood_sugar",
    value: "105",
    unit: "mg/dL",
    recordedAt: "2024-02-09T07:30:00",
    status: "normal",
  },
];

// Demo patients for doctor view
export const DEMO_PATIENTS: PatientSummary[] = [
  {
    id: "patient-001",
    name: "Alex Johnson",
    age: 45,
    lastVisit: "2024-02-10",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    upcomingAppointment: "2024-02-15",
  },
  {
    id: "patient-002",
    name: "Maria Garcia",
    age: 32,
    lastVisit: "2024-02-08",
    conditions: ["Asthma"],
    upcomingAppointment: "2024-03-01",
  },
  {
    id: "patient-003",
    name: "James Wilson",
    age: 58,
    lastVisit: "2024-02-05",
    conditions: ["Arthritis", "Hypertension"],
  },
  {
    id: "patient-004",
    name: "Sarah Lee",
    age: 28,
    lastVisit: "2024-01-28",
    conditions: ["Allergies"],
    upcomingAppointment: "2024-02-20",
  },
];

// Vital type configurations
export const VITAL_CONFIGS = {
  blood_pressure: {
    label: "Blood Pressure",
    unit: "mmHg",
    icon: "Heart",
    placeholder: "120/80",
  },
  heart_rate: {
    label: "Heart Rate",
    unit: "bpm",
    icon: "Activity",
    placeholder: "72",
  },
  temperature: {
    label: "Temperature",
    unit: "°F",
    icon: "Thermometer",
    placeholder: "98.6",
  },
  weight: {
    label: "Weight",
    unit: "lbs",
    icon: "Scale",
    placeholder: "165",
  },
  blood_sugar: {
    label: "Blood Sugar",
    unit: "mg/dL",
    icon: "Droplet",
    placeholder: "100",
  },
} as const;
