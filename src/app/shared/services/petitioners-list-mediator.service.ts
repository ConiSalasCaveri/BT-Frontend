import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PetitionersListMediatorService {
  private subjectNotification = new Subject<any>();

  notification = this.subjectNotification.asObservable();

  constructor() {}

  public emitNotification(data: any) {
    if (data) {
      this.subjectNotification.next(data);
    }
  }
}
