import * as model from '../../shared/model';
import ReceiveLocationState from '../parser/ReceiveLocationState';
import parseAdapterConfig from './parseAdapterConfig';

const mapTimeSpanScheduleConfig = (
  schedule: any,
): model.TimeSpanScheduleConfig => {
  return {
    interval: schedule.Interval.text,
  };
};

const mapDailyScheduleConfig = (schedule: any): model.DayScheduleConfig => {
  return {
    interval: schedule.Interval.text,
    scheduledDays: schedule.ScheduledDays.text,
  };
};

const mapWeeklyScheduleConfig = (schedule: any): model.WeekScheduleConfig => {
  return {
    interval: schedule.Interval.text,
    scheduledDays: schedule.ScheduledDays.text,
  };
};

const mapMonthlyScheduleConfig = (schedule: any): model.MonthScheduleConfig => {
  return {
    day: schedule.Day.text,
    ordinal: schedule.Ordinal.text,
    weekDay: schedule.WeekDay.text,
    scheduledMonths: schedule.ScheduledMonths.text,
  };
};

const mapScheduleConfig = (schedule: any): model.ScheduleConfig => {
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

const mapAdapterConfigReceiveSchedule = (
  state: ReceiveLocationState,
): model.AdapterConfigReceiveSchedule => {
  const config = parseAdapterConfig(state.transportTypeData, true);
  return {
    name: config.config.name.text,
    scheduleType: config.config.Schedule.attr['xsi:type'],
    scheduleConfig: mapScheduleConfig(config.config.Schedule),
  };
};

export default mapAdapterConfigReceiveSchedule;
