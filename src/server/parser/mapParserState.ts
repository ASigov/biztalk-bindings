import path from 'path';
import convert from 'xml-js';
import ParserState from './ParserState';
import ReceiveLocationState from './ReceiveLocationState';
import SendPortState from './SendPortState';
import {
  SendPort,
  ReceiveLocation,
  Application,
  Bindings,
  ReceiveAdapterConfig,
  SendAdapterConfig,
  FileSendConfig,
  NSoftwareFtpSendConfig,
  NSoftwareSftpSendConfig,
  FileReceiveConfig,
  NSoftwareFtpReceiveConfig,
  NSoftwareSftpReceiveConfig,
  ScheduleReceiveConfig,
  ScheduleConfig,
  TimeSpanScheduleConfig,
  DayScheduleConfig,
  WeekScheduleConfig,
  MonthScheduleConfig,
} from '../../shared/model';

const getApplicationNames = (state: ParserState): string[] => {
  return state.receivePorts
    .map((rp): string => rp.applicationName)
    .concat(state.sendPorts.map((sp): string => sp.applicationName))
    .filter((val, index, self): boolean => self.indexOf(val) === index);
};

const mapFileSendConfig = (state: SendPortState): FileSendConfig => {
  return {
    path: path.dirname(state.address),
    fileName: path.basename(state.address),
  };
};

const parseAdapterConfig = (
  text: string,
  includeAttributes: boolean = false,
): any => {
  const options = {
    compact: true,
    ignoreAttributes: !includeAttributes,
    attributesKey: 'attr',
    textKey: 'text',
  };
  const customProps: any = convert.xml2js(text, options);
  const config: any = convert.xml2js(
    customProps.CustomProps.AdapterConfig.text,
    options,
  );
  return config;
};

const mapNSoftwareFtpSendConfig = (
  state: SendPortState,
): NSoftwareFtpSendConfig => {
  const config = parseAdapterConfig(state.transportTypeData);
  return {
    path: config.Config.RemotePath.text,
    fileName: config.Config.RemoteFile.text,
    server: config.Config.FTPServer.text,
    port: config.Config.FTPPort.text,
    userName: config.Config.User.text,
    ssoAffiliate: config.Config.SSOAffiliate.text,
  };
};

const mapNSoftwareSftpSendConfig = (
  state: SendPortState,
): NSoftwareSftpSendConfig => {
  const config = parseAdapterConfig(state.transportTypeData);
  return {
    path: config.Config.RemotePath.text,
    fileName: config.Config.RemoteFile.text,
    server: config.Config.SSHHost.text,
    port: config.Config.SSHPort.text,
    userName: config.Config.SSHUser.text,
    ssoAffiliate: config.Config.SSOAffiliate.text,
  };
};

const mapFileReceiveConfig = (
  state: ReceiveLocationState,
): FileReceiveConfig => {
  return {
    path: path.dirname(state.address),
    fileMask: path.basename(state.address),
  };
};

const mapNSoftwareFtpReceiveConfig = (
  state: ReceiveLocationState,
): NSoftwareFtpReceiveConfig => {
  const config = parseAdapterConfig(state.transportTypeData);
  return {
    path: config.Config.RemotePath.text,
    fileMask: config.Config.FileMask.text,
    server: config.Config.FTPServer.text,
    port: config.Config.FTPPort.text,
    userName: config.Config.User.text,
    ssoAffiliate: config.Config.SSOAffiliate.text,
    pollingInterval: config.Config.PollingInterval.text,
  };
};

const mapNSoftwareSftpReceiveConfig = (
  state: ReceiveLocationState,
): NSoftwareSftpReceiveConfig => {
  const config = parseAdapterConfig(state.transportTypeData);
  return {
    path: config.Config.RemotePath.text,
    fileMask: config.Config.FileMask.text,
    server: config.Config.SSHHost.text,
    port: config.Config.SSHPort.text,
    userName: config.Config.SSHUser.text,
    ssoAffiliate: config.Config.SSOAffiliate.text,
    pollingInterval: config.Config.PollingInterval.text,
  };
};

const mapSendAdapterConfig = (state: SendPortState): SendAdapterConfig => {
  if (state.adapterName === 'FILE') {
    return mapFileSendConfig(state);
  }

  if (
    state.adapterName === 'nsoftware.FTP v4' ||
    state.adapterName === 'nsoftware.FTP 2016'
  ) {
    return mapNSoftwareFtpSendConfig(state);
  }

  if (
    state.adapterName === 'nsoftware.SFTP v4' ||
    state.adapterName === 'nsoftware.SFTP 2016'
  ) {
    return mapNSoftwareSftpSendConfig(state);
  }

  return undefined;
};

const mapTimeSpanScheduleConfig = (schedule: any): TimeSpanScheduleConfig => {
  return {
    interval: schedule.Interval.text,
  };
};

const mapDailyScheduleConfig = (schedule: any): DayScheduleConfig => {
  return {
    interval: schedule.Interval.text,
    scheduledDays: schedule.ScheduledDays.text,
  };
};

const mapWeeklyScheduleConfig = (schedule: any): WeekScheduleConfig => {
  return {
    interval: schedule.Interval.text,
    scheduledDays: schedule.ScheduledDays.text,
  };
};

const mapMonthlyScheduleConfig = (schedule: any): MonthScheduleConfig => {
  return {
    day: schedule.Day.text,
    ordinal: schedule.Ordinal.text,
    weekDay: schedule.WeekDay.text,
    scheduledMonths: schedule.ScheduledMonths.text,
  };
};

const mapScheduleConfig = (schedule: any): ScheduleConfig => {
  if (schedule.attr['xsi:type'] === 'TimeSpanSchedule') {
    return mapTimeSpanScheduleConfig(schedule);
  }
  if (schedule.attr['xsi:type'] === 'DaySchedule') {
    return mapDailyScheduleConfig(schedule);
  }
  if (schedule.attr['xsi:type'] === 'WeekSchedule') {
    return mapWeeklyScheduleConfig(schedule);
  }
  if (schedule.attr['xsi:type'] === 'MonthSchedule') {
    return mapMonthlyScheduleConfig(schedule);
  }
  return undefined;
};

const mapScheduleReceiveConfig = (
  state: ReceiveLocationState,
): ScheduleReceiveConfig => {
  const config = parseAdapterConfig(state.transportTypeData, true);
  return {
    name: config.config.name.text,
    scheduleType: config.config.Schedule.attr['xsi:type'],
    scheduleConfig: mapScheduleConfig(config.config.Schedule),
  };
};

const mapReceiveAdapterConfig = (
  state: ReceiveLocationState,
): ReceiveAdapterConfig => {
  if (state.adapterName === 'FILE') {
    return mapFileReceiveConfig(state);
  }

  if (
    state.adapterName === 'nsoftware.FTP v4' ||
    state.adapterName === 'nsoftware.FTP 2016'
  ) {
    return mapNSoftwareFtpReceiveConfig(state);
  }

  if (
    state.adapterName === 'nsoftware.SFTP v4' ||
    state.adapterName === 'nsoftware.SFTP 2016'
  ) {
    return mapNSoftwareSftpReceiveConfig(state);
  }

  if (state.adapterName === 'Schedule') {
    return mapScheduleReceiveConfig(state);
  }

  return undefined;
};

const mapSendPorts = (
  state: ParserState,
  applicationName: string,
): SendPort[] => {
  return state.sendPorts
    .filter((sp): boolean => sp.applicationName === applicationName)
    .map(
      (sp): SendPort => ({
        name: sp.name,
        address: sp.address,
        adapterName: sp.adapterName,
        adapterConfig: mapSendAdapterConfig(sp),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

const mapReceiveLocations = (
  state: ParserState,
  applicationName: string,
): ReceiveLocation[] => {
  return state.receivePorts
    .filter((rp): boolean => rp.applicationName === applicationName)
    .map((rp): ReceiveLocationState[] => rp.receiveLocations)
    .reduce((prev, curr): ReceiveLocationState[] => prev.concat(curr), [])
    .map(
      (rl): ReceiveLocation => ({
        name: rl.name,
        address: rl.address,
        adapterName: rl.adapterName,
        adapterConfig: mapReceiveAdapterConfig(rl),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

const mapApplications = (state: ParserState): Application[] => {
  return getApplicationNames(state)
    .map(
      (name): Application => ({
        name,
        sendPorts: mapSendPorts(state, name),
        receiveLocations: mapReceiveLocations(state, name),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

const mapParserState = (state: ParserState): Bindings => ({
  applications: mapApplications(state),
});

export default mapParserState;
