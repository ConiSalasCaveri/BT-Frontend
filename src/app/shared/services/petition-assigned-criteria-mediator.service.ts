import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PetitionAssignedCriteriaMediatorService {
  private subjectModal = new Subject<any>();
  private subjectSubmit = new Subject();

  modal = this.subjectModal.asObservable();
  submit = this.subjectSubmit.asObservable();

  constructor() {}

  public emitModalData(data: any) {
    if (data) {
      this.subjectModal.next(data);
    }
  }

  public emitModalSubmit() {
      this.subjectSubmit.next();
  }
}
