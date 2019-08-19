import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PetitionAssignedCriteriaMediatorService } from '../../../../../../shared/services/petition-assigned-criteria-mediator.service';

@Component({
  selector: 'app-modal-assigned-criteria',
  templateUrl: './modal-assigned-criteria.component.html',
  styleUrls: ['./modal-assigned-criteria.component.scss']
})
export class ModalAssignedCriteriaComponent implements OnInit, OnDestroy {

  @Input() data: any;
  private subscriptionData: Subscription;

  constructor(
    private assignedMediator: PetitionAssignedCriteriaMediatorService
  ) { }

  ngOnInit() {
    this.subscriptionData = this.assignedMediator.modal.subscribe(x => {
      this.data = x;
    });
  }

  ngOnDestroy() {
    this.subscriptionData.unsubscribe();
  }

  public asdd() {
    this.assignedMediator.emitModalSubmit();
    (<any>$('#ModalAssignedCriteria')).modal('hide');
  }

}
