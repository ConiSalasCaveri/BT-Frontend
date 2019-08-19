import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { Day, Month, WeekVisibleModel } from '../../datetime.models';
import { DateTimeFormatterService } from '../../date-time-formatter.service';

@Component({
  selector: 'app-dt-daytime',
  templateUrl: './dt-daytime.component.html',
  styleUrls: ['./dt-daytime.component.scss']
})
export class DtDaytimeComponent implements OnInit {
  days: Day[] = [
    { order: 1, name: 'Monday' },
    { order: 2, name: 'Tuesday' },
    { order: 3, name: 'Wednesday' },
    { order: 4, name: 'Thursday' },
    { order: 5, name: 'Friday' },
    { order: 6, name: 'Saturday' },
    { order: 7, name: 'Sunday' }
  ];

  months: Month[] = [
    { order: 1, name: 'January' },
    { order: 2, name: 'February' },
    { order: 3, name: 'March' },
    { order: 4, name: 'April' },
    { order: 5, name: 'May' },
    { order: 6, name: 'June' },
    { order: 7, name: 'July' },
    { order: 8, name: 'August' },
    { order: 9, name: 'September' },
    { order: 10, name: 'October' },
    { order: 11, name: 'November' },
    { order: 12, name: 'December' }
  ];

  weeksActive: WeekVisibleModel[] = [
    { order: 1, days: [] },
    { order: 2, days: [] },
    { order: 3, days: [] },
    { order: 4, days: [] },
    { order: 5, days: [] },
    { order: 6, days: [] }
  ];

  ctx = { text: '', identifier: '' };

  currentYear: number;
  currentMonth: Month;
  selected: Date;
  isYear: boolean;
  isFrom = true;

  private interval: any;

  @Output() OnSelectDate = new EventEmitter<any>();
  @Input() withToday = true;
  @Input() withTime = true;
  @Input() initialDate: Date = null;
  @Input() customTemplate: TemplateRef<any>;
  @Input() restrictionDate: Date = null;
  @Input() identifier = null;

  constructor(private dateTimeFormatter: DateTimeFormatterService) {}

  ngOnInit() {
    this.initializeComponent();
    this.clear();

    if (this.initialDate !== null) {
      this.ctx.text = this.dateTimeFormatter
        .formatDateISO(this.initialDate)
        .substring(0, 16);
    }

    if (this.identifier !== '' && this.identifier !== null) {
      this.ctx.identifier = this.identifier;
    }
  }

  @Input() clear() {
    this.ctx.text = '';
    this.initialDate = new Date();
  }

  private initializeComponent() {
    // change to show months
    this.isYear = false;

    let d = new Date();

    // date to select
    if (this.initialDate != null) {
      d = this.initialDate;
      this.selected = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes()
      );
    } else {
      this.selected = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        0,
        0
      );
    }

    // show visible week
    this.getVisibleMonth(new Date());

    // show date on input
    this.formatDateShown(new Date(this.selected));
    this.clear();

    // header picker
    this.currentMonth = this.months.find(
      x => x.order === this.selected.getMonth() + 1
    );
    this.currentYear = this.selected.getUTCFullYear();


  }

  public restrict(date: Date, isFrom: boolean) {
    this.restrictionDate = date;
    this.isFrom = isFrom;
  }

  protected isRestricted(date: Date) {
    if (this.restrictionDate != null) {
      if (this.isFrom) {
        return date < this.restrictionDate;
      } else {
        return date > this.restrictionDate;
      }
    }
    return false;
  }

  private getVisibleMonth(actual: Date) {
    // get dates
    const curr = new Date(actual);
    const prev = new Date(actual.setMonth(actual.getMonth() - 1));
    const next = new Date(actual.setMonth(actual.getMonth() + 2));

    // get all days
    const prevMonth: Date[] = this.getDaysInMonth(
      prev.getMonth(),
      prev.getFullYear()
    );
    let currMonth: Date[] = this.getDaysInMonth(
      curr.getMonth(),
      curr.getFullYear()
    );
    const nextMonth: Date[] = this.getDaysInMonth(
      next.getMonth(),
      next.getFullYear()
    );

    const lengthPrev =
      currMonth[0].getDay() === 0
        ? 6
        : this.days[currMonth[0].getDay() - 1].order - 1;
    currMonth = prevMonth
      .slice(prevMonth.length - lengthPrev, prevMonth.length)
      .concat(currMonth)
      .concat(nextMonth.slice(0, 48 - currMonth.length));

    let i = 1;
    while (i < 7) {
      this.weeksActive.find(x => x.order === i).days = currMonth.splice(0, 7);
      i++;
    }
  }

  private getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  private formatDateShown(date: Date, delimiter: string = '-') {
    const day =
      date.getDate() <= 9
        ? `0${date.getDate().toString()}`
        : date.getDate();

    const month =
      date.getMonth() + 1 <= 9
        ? `0${(date.getMonth() + 1).toString()}`
        : date.getMonth();
    // Show formated date in input

    let text = `${date.getFullYear()}${delimiter}${month}${delimiter}${day}`;

    if (this.withTime) {
      const hour =
        date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours();
      const min =
        date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes();
      text = `${text} ${hour}:${min}`;
    }
    this.ctx.text = text;
  }

  public mode($event: any) {
    $event.stopPropagation();
    this.isYear = !this.isYear;
  }

  protected isOffside(date: Date) {
    return date.getMonth() !== this.currentMonth.order - 1;
  }

  public addMonthYear($event: any, incr: number) {
    $event.stopPropagation();
    if (this.isYear) {
      this.currentYear = this.currentYear + incr;
      this.getVisibleMonth(
        new Date(this.currentYear, this.selected.getMonth(), 1)
      );
    } else {
      const next = this.currentMonth.order + incr;
      if (next === 13) {
        this.currentMonth = this.months[0];
        this.currentYear += incr;
      } else if (next < 1) {
        this.currentMonth = this.months[11];
        this.currentYear += incr;
      } else {
        this.currentMonth = this.months[next - 1];
      }
      this.getVisibleMonth(
        new Date(this.currentYear, this.currentMonth.order - 1, 1)
      );
    }
  }

  protected onSelectDate($event: any, date: Date) {
    if (!this.isRestricted(date)) {
      this.selected = new Date(date);
      this.formatDateShown(new Date(date));
      this.emit(date);
      if (this.withTime) {
        $event.stopPropagation();
      }
    } else {
      $event.stopPropagation();
    }
  }

  protected onMonthSelect($event: any, date: Month) {
    $event.stopPropagation();
    this.isYear = !this.isYear;
    this.currentMonth = date;
    this.getVisibleMonth(new Date(this.currentYear, date.order - 1, 1));
  }

  protected formatNumber(hm: number) {
    return hm.toString().length === 2 ? hm.toString() : `0${hm.toString()}`;
  }

  protected onSelectToday($event: any) {
    const date = new Date();
    this.currentMonth = this.months.find(x => x.order === date.getMonth() + 1);
    this.currentYear = date.getUTCFullYear();
    this.getVisibleMonth(date);
    this.onSelectDate($event, new Date());
  }

  protected isActual(day: Date) {
    return (
      this.selected.getDate() === day.getDate() &&
      this.selected.getFullYear() === day.getFullYear() &&
      this.selected.getMonth() === day.getMonth()
    );
  }

  private emit(value: any) {
    this.OnSelectDate.emit(value);
  }

  protected addHour($event: any, incr: number) {
    $event.stopPropagation();
    this.selected.setHours(this.selected.getHours() + incr);
    this.formatDateShown(new Date(this.selected));
    this.emit(this.selected);
  }

  protected addHourPress($event: any, incr: number) {
    this.selected.setHours(this.selected.getHours() + incr);
    this.formatDateShown(new Date(this.selected));
    $event.stopPropagation();
    this.interval = setInterval(() => {
      this.selected.setHours(this.selected.getHours() + incr);
      this.formatDateShown(new Date(this.selected));
    }, 200);

  }

  protected killIncrease() {
    clearInterval(this.interval);
    this.emit(this.selected);
  }

  protected addMin($event: any, incr: number) {
    $event.stopPropagation();
    this.selected.setMinutes(this.selected.getMinutes() + incr);
    this.formatDateShown(new Date(this.selected));
    this.emit(this.selected);
  }

  protected addMinPress($event: any, incr: number) {
    this.selected.setMinutes(this.selected.getMinutes() + incr);
    this.formatDateShown(new Date(this.selected));
    $event.stopPropagation();
    this.interval = setInterval(() => {
      this.selected.setMinutes(this.selected.getMinutes() + incr);
      this.formatDateShown(new Date(this.selected));
    }, 150);

  }
}
