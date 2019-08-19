import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { Subscription } from 'rxjs';
import { Type } from '../models/petition-type.model';
import { PetitionType } from '../models/petition-petition-type.model';
import { PetitionModel } from '../models/petition.model';
import { PetitionCreateMediatorService } from 'src/app/shared/services/petition-create-mediator.service';
import { PetitionState } from '../../models/petition-state.model';

@Component({
  selector: 'app-petition-create-petition-type',
  templateUrl: './petition-create-petition-type.component.html',
  styleUrls: ['./petition-create-petition-type.component.scss']
})
export class PetitionCreatePetitionTypeComponent implements OnInit, OnDestroy {

  private submitSubscription: Subscription;
  public state: any;
  public disabled = false;
  public petitionType: PetitionType;
  @Output() changeChild = new EventEmitter<string>();
  @Output() isValid = new EventEmitter<boolean>();

  constructor(
    private petitionService: PetitionService,
    private mediatorService: PetitionCreateMediatorService
  ) { }

  ngOnInit() {
    const servicePetition = this.petitionService.getPetition();
    if (servicePetition) {
      this.setInputValues(servicePetition);
    }

    this.submitSubscription = this.mediatorService.submit.subscribe((x) => {
      if (x && this.petitionType) {
        this.isValid.emit(true);
      }
    });
  }

  ngOnDestroy() {
    this.onSubmit();
    if (this.petitionType) {
      this.isValid.emit(true);
    }
    this.submitSubscription.unsubscribe();
  }

  public onSubmit() {
    const petition = this.petitionService.getPetition();
    petition.type = this.petitionType;
    this.petitionService.setPetition(petition);
  }

  public setPetitionType(petitionType: Type, inviteSuppliers?: boolean) {
    this.petitionType = {
      type: petitionType,
      inviteSuppliers: inviteSuppliers
    };
    this.onSubmit();
  }

  public back() {
    this.changeChild.emit('petition-create-items');
  }

  private setInputValues(petitionData: PetitionModel) {
    if (petitionData.type) {
      this.setPetitionType(petitionData.type.type, petitionData.type.inviteSuppliers);
    }
    this.state = petitionData.state;
    this.disabled = this.petitionService.isDraftStatusToDisable(petitionData.state);
  }
}
