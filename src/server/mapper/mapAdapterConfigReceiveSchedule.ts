import ReceiveLocationState from '../parser/ReceiveLocationState';
import parseTransportTypeData from '../parser/parseTransportTypeData';
import {
  ScheduleConfig,
  ScheduleConfigTimeSpan,
  ScheduleConfigDaily,
  ScheduleConfigWeekly,
  ScheduleConfigMonthly,
  AdapterConfigReceiveSchedule,
} from '../../shared/model';

interface AdapterConfig {
  config: Config;
}

interface Config {
  uri: string;
  name: string;
  suspend: boolean;
  Schedule: Schedule;
  task: Task;
}

type Schedule = TimeSpanSchedule | DaySchedule | WeekSchedule | MonthSchedule;

interface TimeSpanSchedule {
  '@_type': 'TimeSpanSchedule';
  LastActivated: string;
  NextActivated: NillableString;
  StartTime: string;
  StartDate: string;
  Interval: number;
}

interface DaySchedule {
  '@_type': 'DaySchedule';
  LastActivated: string;
  NextActivated: NillableString;
  StartTime: string;
  StartDate: string;
  Interval: number;
  ScheduledDays: string;
}

interface WeekSchedule {
  '@_type': 'WeekSchedule';
  LastActivated: string;
  NextActivated: NillableString;
  StartTime: string;
  StartDate: string;
  Interval: number;
  ScheduledDays: string;
}

interface MonthSchedule {
  '@_type': 'MonthSchedule';
  LastActivated: string;
  NextActivated: NillableString;
  StartTime: string;
  StartDate: string;
  Day: number;
  Ordinal: string;
  WeekDay: string;
  ScheduledMonths: string;
}

type NillableString = string | XmlNil;

interface XmlNil {
  '@_nil': 'true';
}

type Task = TaskFile | TaskHttpDownload | TaskSQL | TaskXmlString;

interface TaskFile {
  qualifiedname: string;
  FileArguments: FileArguments;
}

interface TaskHttpDownload {
  qualifiedname: string;
  HttpDownloadArguments: HttpDownloadArguments;
}

interface TaskSQL {
  qualifiedname: string;
  SQLArguments: SQLArguments;
}

interface TaskXmlString {
  qualifiedname: string;
  XmlStringArguments: XmlStringArguments;
}

interface FileArguments {
  FileName: string;
}

interface HttpDownloadArguments {
  Url: string;
  User: string;
  Password: string;
}

interface SQLArguments {
  ConnectionString: string;
  SQLCommand: string;
  TargetNamespace: string;
  RootElementName: string;
}

interface XmlStringArguments {
  XmlString: string;
}

const mapTimeSpanScheduleConfig = (
  schedule: TimeSpanSchedule,
): ScheduleConfigTimeSpan => ({
  interval: schedule.Interval,
});

const mapDayScheduleConfig = (schedule: DaySchedule): ScheduleConfigDaily => ({
  interval: schedule.Interval,
  scheduledDays: schedule.ScheduledDays,
});

const mapWeekScheduleConfig = (
  schedule: WeekSchedule,
): ScheduleConfigWeekly => ({
  interval: schedule.Interval,
  scheduledDays: schedule.ScheduledDays,
});

const mapMonthScheduleConfig = (
  schedule: MonthSchedule,
): ScheduleConfigMonthly => ({
  day: schedule.Day,
  ordinal: schedule.Ordinal,
  weekDay: schedule.WeekDay,
  scheduledMonths: schedule.ScheduledMonths,
});

const assertNever = (schedule: never): never => {
  throw new Error(`Unexpected schedule type ${schedule}`);
};

const mapScheduleConfig = (schedule: Schedule): ScheduleConfig => {
  switch (schedule['@_type']) {
    case 'TimeSpanSchedule':
      return mapTimeSpanScheduleConfig(schedule as TimeSpanSchedule);
    case 'DaySchedule':
      return mapDayScheduleConfig(schedule as DaySchedule);
    case 'WeekSchedule':
      return mapWeekScheduleConfig(schedule as WeekSchedule);
    case 'MonthSchedule':
      return mapMonthScheduleConfig(schedule as MonthSchedule);
    default:
      return assertNever(schedule);
  }
};

const mapAdapterConfigReceiveSchedule = (
  state: ReceiveLocationState,
): AdapterConfigReceiveSchedule => {
  const config = parseTransportTypeData<AdapterConfig>(state.transportTypeData);
  return {
    name: config.config.name,
    scheduleType: config.config.Schedule['@_type'],
    scheduleConfig: mapScheduleConfig(config.config.Schedule),
  };
};

export default mapAdapterConfigReceiveSchedule;
