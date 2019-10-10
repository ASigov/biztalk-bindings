export interface Bindings {
  applications: Application[];
}

export interface Application {
  name: string;
  receivePorts: ReceivePort[];
  sendPorts: SendPort[];
}

export interface ReceivePort {
  name: string;
  receiveLocations: ReceiveLocation[];
}

export interface ReceiveLocation {
  name: string;
  profileName: string;
  address: string;
  adapterName: string;
  adapterConfig: AdapterConfigReceive;
}

export interface SendPort {
  name: string;
  profileName: string;
  address: string;
  adapterName: string;
  adapterConfig: AdapterConfigSend;
  filter?: SendPortFilter;
}

export interface SendPortFilter {
  property: string;
  value: string;
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
  | ScheduleConfigTimeSpan
  | ScheduleConfigDaily
  | ScheduleConfigWeekly
  | ScheduleConfigMonthly;

export interface ScheduleConfigTimeSpan {
  interval: number;
}

export interface ScheduleConfigDaily {
  interval: number;
  scheduledDays: string;
}

export interface ScheduleConfigWeekly {
  interval: number;
  scheduledDays: string;
}

export interface ScheduleConfigMonthly {
  day: number;
  ordinal: string;
  weekDay: string;
  scheduledMonths: string;
}
