export class DateTimeType {
  public static readonly Month = 'month';
  public static readonly Week = 'week';
  public static readonly Year = 'year';
  public static readonly Range = 'range';
}

export interface Month {
  order: number;
  name: string;
}
export interface Day {
  order: number;
  name: string;
}

export interface WeekVisibleModel {
  order: number;
  days: Date[];
}

export interface Idata {
  month: number;
  year: number;
}

export interface WeekSelected {
  weekFirstDay: Date;
  weekLastDay: Date;
}

export interface RangeSelection {
  first: Date;
  last: Date;
}

export interface RestrictionDate {
  restrict: boolean;
  date: Date;
}
