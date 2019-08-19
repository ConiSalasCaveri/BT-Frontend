import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PetitionCreateMediatorService {
  private subject = new Subject<boolean>();
  private disabledSubject = new Subject<boolean>();

  submit = this.subject.asObservable();
  disable = this.disabledSubject.asObservable();

  constructor() {}

  public emitDisable(data: boolean) {
    if (data) {
      this.disabledSubject.next(data);
    }
  }

  public emitSubmit(data: boolean) {
    if (data) {
      this.subject.next(data);
    }
  }
}
