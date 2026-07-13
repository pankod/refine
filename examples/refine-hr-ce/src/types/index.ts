export type ResponseLogin = {
  user: Employee;
  accessToken: string;
  refreshToken: string;
};

export type Employee = {
  id: number;
  createdAt: string;
  updatedAt: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  role: string;
  email: string;
  address: string;
  phone: string;
  birthdate: string;
  links: string[];
  availableAnnualLeaveDays: number;
  teamId: number;
};

export type TimeOff = {
  id: number;
  createdAt: string;
  updatedAt: string;
  timeOffType: TimeOffType;
  startsAt: string;
  endsAt: string;
  notes: string | null;
  status: TimeOffStatus;
  employeeId: number;
};

export enum Role {
  MANAGER = "Manager",
  EMPLOYEE = "Employee",
}

export enum TimeOffStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export enum TimeOffType {
  ANNUAL = "Annual",
  SICK = "Sick",
  CASUAL = "Casual",
}
