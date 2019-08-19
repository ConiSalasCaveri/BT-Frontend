import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { PetitionOfferType } from '../../petitioners-negotiate/models/petition-offer-type.model';
import { PetitionAssignedCriteriaMediatorService } from '../../../../../shared/services/petition-assigned-criteria-mediator.service';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/notifications/notifications-models/notification-type';
import { PetitionersListMediatorService } from 'src/app/shared/services/petitioners-list-mediator.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-petitioners-assigned-criteria-total',
  templateUrl: './petitioners-assigned-criteria-total.component.html',
  styleUrls: ['./petitioners-assigned-criteria-total.component.scss']
})
export class PetitionersAssignedCriteriaTotalComponent implements OnInit, OnDestroy {

  private roleMapper: any;
  private paymentMapper: any;
  private paymentPeriodMapper: any;
  private offerId: string;
  private subscription: Subscription;
  public petitionOffers: Array<any> = [];

  constructor(
    private currencyPipe: CurrencyPipe,
    private petitionService: PetitionService,
    private mapperService: MapperService,
    private assignedMediator: PetitionAssignedCriteriaMediatorService,
    private mediatorNotificationService: PetitionersListMediatorService
  ) {
    this.roleMapper = mapperService.rolesTextMapper();
    this.paymentMapper = mapperService.paymentTextMapper();
    this.paymentPeriodMapper = mapperService.paymentPeriodTextMapper();
  }

  ngOnInit() {
    this.petitionService.getPetitionAssignedCriteriaTotal(PetitionOfferType.total).subscribe(response => {
      this.petitionOffers = response.data;
      this.offerId = this.petitionOffers.find((x: any) => x.place === 1).id;
    });
    this.sendModalData();

    this.subscription = this.assignedMediator.submit.subscribe(x => {
      const notification = {
        text: 'La solicitud ha sido adjudicada por precio total.',
        type: NotificationType.iconSuccess
      };
      this.mediatorNotificationService.emitNotification(notification);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  public onCheck(index: number, id: string) {
    $(`[name="check"]`).prop('checked', false);
    $(`#SuppliersOneCheck${index}`).prop('checked', true);
    this.offerId = id;
  }

  public getRoleString(role: number) {
    return this.roleMapper[role];
  }

  public getPaymentString(payment: number) {
    return this.paymentMapper[payment];
  }


  public getPaymentPeriodString(paymentPeriod: number) {
    return this.paymentPeriodMapper[paymentPeriod];
  }

  public sendModalData() {
    const dataModal = {
      header: '¿Confirma que el criterio de adjudicación es por el precio total de la solicitud?'
    };
    this.assignedMediator.emitModalData(dataModal);
  }

}
