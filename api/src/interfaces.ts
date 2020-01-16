export interface IStats {
  today: IStatsCounters;
  week: IStatsCounters;
  month: IStatsCounters;
}

interface IStatsCounters {
  all: number;
  errors: number;
}