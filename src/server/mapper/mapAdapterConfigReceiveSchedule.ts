import * as model from '../../shared/model';
import ReceiveLocationState from '../parser/ReceiveLocationState';
import parseTransportTypeData from '../parser/parseTransportTypeData';

const mapTimeSpanScheduleConfig = (
  schedule: any,
): model.TimeSpanScheduleConfig => {
  return {
    interval: schedule.Interval,
  };
};

const mapDailyScheduleConfig = (schedule: any): model.DayScheduleConfig => {
  return {
    interval: schedule.Interval,
    scheduledDays: schedule.ScheduledDays,
  };
};

const mapWeeklyScheduleConfig = (schedule: any): model.WeekScheduleConfig => {
  return {
    interval: schedule.Interval,
    scheduledDays: schedule.ScheduledDays,
  };
};

const mapMonthlyScheduleConfig = (schedule: any): model.MonthScheduleConfig => {
  return {
    day: schedule.Day,
    ordinal: schedule.Ordinal,
    weekDay: schedule.WeekDay,
    scheduledMonths: schedule.ScheduledMonths,
  };
};

const mapScheduleConfig = (schedule: any): model.ScheduleConfig => {
  if (schedule['@_type'] === 'TimeSpanSchedule') {
    return mapTimeSpanScheduleConfig(schedule);
  }
  if (schedule['@_type'] === 'DaySchedule') {
    return mapDailyScheduleConfig(schedule);
  }
  if (schedule['@_type'] === 'WeekSchedule') {
    return mapWeeklyScheduleConfig(schedule);
  }
  if (schedule['@_type'] === 'MonthSchedule') {
    return mapMonthlyScheduleConfig(schedule);
  }
  return undefined;
};

const mapAdapterConfigReceiveSchedule = (
  state: ReceiveLocationState,
): model.AdapterConfigReceiveSchedule => {
  const config = parseTransportTypeData(state.transportTypeData);
  return {
    name: config.config.name,
    scheduleType: config.config.Schedule['@_type'],
    scheduleConfig: mapScheduleConfig(config.config.Schedule),
  };
};

export default mapAdapterConfigReceiveSchedule;
