import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FiltersMediatorService {
  private listFilter = new Subject<any>();

  filter = this.listFilter.asObservable();

  constructor() {}

  public emitFilter(data: any) {
    if (data) {
      this.listFilter.next(data);
    }
  }
}
