
export enum UserRole {
  ADMIN = 'ADMIN',
  PETUGAS = 'PETUGAS_LAPANGAN',
  MONITORING = 'MONITORING'
}

export enum IncidentStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  RESOLVED = 'RESOLVED',
  CRITICAL = 'CRITICAL'
}

export interface Incident {
  id: string;
  type: string;
  location: string;
  coordinates: [number, number];
  status: IncidentStatus;
  reportedAt: string;
  reporter: string;
  description: string;
  impactLevel: 'Low' | 'Medium' | 'High' | 'Catastrophic';
  requiredResources: string[];
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  status: 'Available' | 'Deployed' | 'Maintenance';
  location: string;
}
