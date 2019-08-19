import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeFormatterService {
  constructor() {}

  public formatDateISO(date: Date) {
    const day =
      date.getDate() <= 9 ? `0${date.getDate().toString()}` : date.getDate();

    const month =
      date.getMonth() + 1 <= 9
        ? `0${(date.getMonth() + 1).toString()}`
        : date.getMonth();

    const hour = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours();

    const min =
      date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes();

    const dateFormat =
      date.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hour +
      ':' +
      min +
      ':00.000';

    return dateFormat;
  }


  public formatSafari(value: string) {
    return value.replace(/-/g, '/');
  }

  public validTimeFormat(value: string) {
    const reg = new RegExp('^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9])|(24:?00))');
    return reg.test(value);
  }

  public addColon(value: string) {
    return `${value}:`;
  }

  public removeColon(value: string) {
    return value.replace(':', '');
  }
}
