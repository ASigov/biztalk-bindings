export interface Bindings {
  applications: Application[];
}

export interface Application {
  name: string;
  receiveLocations: ReceiveLocation[];
  sendPorts: SendPort[];
}

export interface ReceiveLocation {
  name: string;
  address: string;
  adapterName: string;
  adapterConfig: AdapterConfigReceive;
}

export interface SendPort {
  name: string;
  address: string;
  adapterName: string;
  adapterConfig: AdapterConfigSend;
}

export type AdapterConfigReceive =
  | AdapterConfigReceiveFile
  | AdapterConfigReceiveNSoftwareFtp
  | AdapterConfigReceiveNSoftwareSftp
  | AdapterConfigReceiveSchedule
  | undefined;

export type AdapterConfigSend =
  | AdapterConfigSendFile
  | AdapterConfigSendNSoftwareFtp
  | AdapterConfigSendNSoftwareSftp
  | undefined;

export interface AdapterConfigReceiveFile {
  path: string;
  fileMask: string;
}

export interface AdapterConfigSendFile {
  path: string;
  fileName: string;
}

export interface AdapterConfigReceiveNSoftwareFtp {
  path: string;
  fileMask: string;
  server: string;
  port: number;
  userName: string;
  ssoAffiliate: string;
  pollingInterval: number;
}

export interface AdapterConfigSendNSoftwareFtp {
  path: string;
  fileName: string;
  server: string;
  port: number;
  userName: string;
  ssoAffiliate: string;
}

export interface AdapterConfigReceiveNSoftwareSftp {
  path: string;
  fileMask: string;
  server: string;
  port: number;
  userName: string;
  ssoAffiliate: string;
  pollingInterval: number;
}

export interface AdapterConfigSendNSoftwareSftp {
  path: string;
  fileName: string;
  server: string;
  port: number;
  userName: string;
  ssoAffiliate: string;
}

export interface AdapterConfigReceiveSchedule {
  name: string;
  scheduleType: string;
  scheduleConfig: ScheduleConfig;
}

export type ScheduleConfig =
  | TimeSpanScheduleConfig
  | DayScheduleConfig
  | WeekScheduleConfig
  | MonthScheduleConfig
  | undefined;

export interface TimeSpanScheduleConfig {
  interval: number;
}

export interface DayScheduleConfig {
  interval: number;
  scheduledDays: string;
}

export interface WeekScheduleConfig {
  interval: number;
  scheduledDays: string;
}

export interface MonthScheduleConfig {
  day: number;
  ordinal: string;
  weekDay: string;
  scheduledMonths: string;
}
