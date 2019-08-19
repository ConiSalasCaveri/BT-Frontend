import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  TemplateRef
} from '@angular/core';

export class TimeModel {
  hour: number;
  minutes: number;
}

@Component({
  selector: 'app-dt-time',
  templateUrl: './dt-time.component.html',
  styleUrls: ['./dt-time.component.scss']
})
export class DtTimeComponent implements OnInit {
  @Input() customTemplate: TemplateRef<any>;
  @Output() OnSelectDate = new EventEmitter<TimeModel>();
  @Input() withNow = false;
  @Input() initialTime = '';
  @Input() identifier = null;
  hour = 0;
  min = 0;
  dataTxt = '';
  ctx = { text: '', identifier: '' };

  private interval: any;

  constructor() {}

  ngOnInit() {
    this.initializeComponent();
    if (this.initialTime !== '' && this.initialTime !== null) {
      this.ctx.text = this.initialTime;
    }

    if (this.identifier !== '' && this.identifier !== null) {
      this.ctx.identifier = this.identifier;
    }
  }

  private initializeComponent() {
    if (this.initialTime !== '' && this.initialTime !== null) {
      const d = this.initialTime.split(':');
      this.hour = Number(d[0]);
      this.min = Number(d[1]);
    }
  }

  addHour($event: any, incr: number) {
    $event.stopPropagation();
    this.hour = this.increaseHour(incr);
    this.showSelected();
  }

  addHourPress(e: any, incr: number) {
    this.hour = this.increaseHour(incr);
    e.stopPropagation();
    this.interval = setInterval(() => {
      this.hour = this.increaseHour(incr);
    }, 200);
  }

  addMinPress(e: any, incr: number) {
    this.min = this.increaseMinute(incr);
    e.stopPropagation();
    this.interval = setInterval(() => {
      this.min = this.increaseMinute(incr);
    }, 130);
  }

  killIncrease() {
    clearInterval(this.interval);
    this.showSelected();
  }

  addMin($event: any, incr: number) {
    $event.stopPropagation();
    this.min = this.increaseMinute(incr);
    this.showSelected();
  }

  private increaseMinute(incr: number) {
    let m = this.min + incr;
    if (m === 60) {
      m = 0;
      this.hour = this.increaseHour(incr);
    }
    if (m === -1) {
      m = 59;
      this.hour = this.increaseHour(incr);
    }
    return m;
  }

  private increaseHour(incr: number) {
    let h = this.hour + incr;
    if (h === 24) {
      h = 0;
    }
    if (h === -1) {
      h = 23;
    }
    return h;
  }

  formatNumber(hm: number) {
    return hm.toString().length === 2 ? hm.toString() : `0${hm.toString()}`;
  }

  showSelected() {
    this.dataTxt = `${this.formatNumber(this.hour)}:${this.formatNumber(
      this.min
    )}`;
    this.ctx.text = this.dataTxt;
    this.OnSelectDate.emit({ hour: this.hour, minutes: this.min });
  }

  onSelectNow() {
    const date = new Date();
    this.hour = date.getHours();
    this.min = date.getMinutes();
    this.showSelected();
  }
}
