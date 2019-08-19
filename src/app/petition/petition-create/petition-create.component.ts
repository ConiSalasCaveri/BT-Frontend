import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { NotificationType } from '../../shared/notifications/notifications-models/notification-type';
import { PetitionService } from '../../shared/services/petition.service';
import { ActivatedRoute } from '@angular/router';
import { PetitionCreateMediatorService } from 'src/app/shared/services/petition-create-mediator.service';
import { PetitionState } from '../models/petition-state.model';
import { PetitionModel } from './models/petition.model';

@Component({
  selector: 'app-petition-create',
  templateUrl: './petition-create.component.html',
  styleUrls: ['./petition-create.component.scss']
})
export class PetitionCreateComponent implements OnInit {

  public petitionCreate = 'petition-create-basic-data';
  public basicDataIsValid: boolean;
  public deliverDetailIsValid: boolean;
  public itemsIsValid: boolean;
  public petitionTypeIsValid: boolean;
  public disabledValue: boolean;
  public state: number;
  public parentPetition: any;

  public parentForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private mediatorService: PetitionCreateMediatorService,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    private petitionService: PetitionService) { }

  ngOnInit() {
    this.parentForm = this.formBuilder.group({});
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
    this.petitionService.getPetitionById(id).subscribe(response => {
        this.state = response.state;
        this.parentPetition = response;
        this.isDisabledState(response.state);
        this.petitionService.setPetition(response);
      });
    } else {
      this.petitionService.setPetition(new PetitionModel);
    }
  }

  public changeChild(data: any) {
    this.petitionCreate = data;
  }

  public onSubmit() {
    this.submitted = true;
    this.mediatorService.emitSubmit(this.submitted);
    if (this.areChildsInvalid()) {
      this.notification.show({
        data: { text: `Es necesario completar todos los campos requeridos` },
        type: NotificationType.iconError
      });
      return;
    }
    (<any>$('#ModalPublish')).modal('show');
    console.log('Petition: ', this.petitionService.getPetition());
    console.log('Form valid!');
  }

  public onCreate() {
    this.notification.show({
      data: { text: `La solicitud ha sido publicada con éxito.` },
      type: NotificationType.iconSuccess
    });
  }

  public onSave() {
    console.log('Petition: ', this.petitionService.getPetition());
    this.notification.show({
      data: { text: `La solicitud ha sido creada con éxito.` },
      type: NotificationType.iconSuccess
    });
  }

  public areChildsInvalid() {
    if (this.basicDataIsValid &&
        this.deliverDetailIsValid &&
        this.itemsIsValid &&
        this.petitionTypeIsValid) {
        return false;
      } else {
        return true;
      }
  }

  private isDisabledState(state: number) {
    if (state === PetitionState.Draft_Rejected ||
      state === PetitionState.Draft_UnderTest) {
      this.disabledValue = true;
    }
  }

}
