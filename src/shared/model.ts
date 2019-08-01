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
  adapterConfig: ReceiveAdapterConfig;
}

export interface SendPort {
  name: string;
  address: string;
  adapterName: string;
  adapterConfig: SendAdapterConfig;
}

export type ReceiveAdapterConfig =
  | FileReceiveConfig
  | NSoftwareFtpReceiveConfig
  | NSoftwareSftpReceiveConfig
  | ScheduleReceiveConfig
  | undefined;

export type SendAdapterConfig =
  | FileSendConfig
  | NSoftwareFtpSendConfig
  | NSoftwareSftpSendConfig
  | undefined;

export interface FileReceiveConfig {
  path: string;
  fileMask: string;
}

export interface FileSendConfig {
  path: string;
  fileName: string;
}

export interface NSoftwareFtpReceiveConfig {
  path: string;
  fileMask: string;
  server: string;
  port: number;
  userName: string;
  ssoAffiliate: string;
  pollingInterval: number;
}

export interface NSoftwareFtpSendConfig {
  path: string;
  fileName: string;
  server: string;
  port: number;
  userName: string;
  ssoAffiliate: string;
}

export interface NSoftwareSftpReceiveConfig {
  path: string;
  fileMask: string;
  server: string;
  port: number;
  userName: string;
  ssoAffiliate: string;
  pollingInterval: number;
}

export interface NSoftwareSftpSendConfig {
  path: string;
  fileName: string;
  server: string;
  port: number;
  userName: string;
  ssoAffiliate: string;
}

export interface ScheduleReceiveConfig {
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
