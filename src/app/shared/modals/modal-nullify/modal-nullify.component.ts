import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { NullifyModel } from '../../models/nullify.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetitionService } from '../../services/petition.service';
import { PetitionersListMediatorService } from '../../services/petitioners-list-mediator.service';
import { NotificationType } from '../../notifications/notifications-models/notification-type';

@Component({
  selector: 'app-modal-nullify',
  templateUrl: './modal-nullify.component.html',
  styleUrls: ['./modal-nullify.component.scss']
})
export class ModalNullifyComponent implements OnInit, OnChanges {

  public nullifyForm: FormGroup;
  public submited = false;
  @Input() nullify: any;
  @Output() submit = new EventEmitter<NullifyModel>();

  constructor(
    private petitionService: PetitionService,
    private mediatorService: PetitionersListMediatorService) { }

  ngOnInit() {
    this.nullifyForm = new FormGroup({
      'observation': new FormControl('', Validators.required)
    });
  }

  ngOnChanges() {
    this.nullifyForm = new FormGroup({
      'observation': new FormControl('', Validators.required)
    });
    if (this.nullify) {
      this.nullifyForm.controls['observation'].setValue(this.nullify.observation);
    }
  }

  public onSubmit() {
    if (this.nullifyForm.invalid) {
      this.submited = true;
      return;
    }

    const petition = this.petitionService.getPetition();

    const request = new NullifyModel({
      id: 'idnullify',
      petitionId: petition.id,
      observation: this.nullifyForm.controls['observation'].value
    });

    const notification = {
      text: 'La solicitud ha sido anulada con éxito',
      type: NotificationType.iconSuccess
    };
    this.mediatorService.emitNotification(notification);
    this.onClose();
    console.log(request);
    (<any>$('#ModalNullify')).modal('hide');
  }

  public onClose() {
    this.nullifyForm.controls['observation'].setValue('');
    this.submited = false;
  }

}
