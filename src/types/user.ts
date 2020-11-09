export interface IUser {
  accessToken: string;
  info: IUserInfo;
  role: string;
}

interface IUserInfo {
  accountId: string;
  id: string;
  role: string;
  staff: any;
}

export interface IHospital {
  address: string;
  country: string;
  domain: string;
  email: string;
  id: string;
  imageUrl: string;
  name: string;
  phoneNumber: string;
  state: string;
  status: string;
}

export interface IStaff {
  accountId: string;
  firstName: string;
  gender: string;
  hospitalId: string;
  id: string;
  imageUrl: string;
  lastName: string;
  otherName: string;
  phoneNumber: string;
  title: string
}

export interface IAppointmentInput {
  reason: string;
  otherReason: string;
  status: string;
  notes: string;
  appointmentDate: string;
  emailReminder: boolean;
  smsReminder: boolean;
  allDay: boolean;
}

export interface IAppointment {
  appointments: IAppointmentArray[];
  patientNo: string; 
}

export interface IAppointmentArray {
  allDay: boolean;
  appointmentDate: string;
  createdAt: string;
  emailReminder: boolean;
  id: string;
  lastModifiedBy: string;
  notes: string;
  patientId: string;
  reason: string;
  scheduledBy: string;
  smsReminder: boolean;
  status: string;
  updatedAt: string;
}