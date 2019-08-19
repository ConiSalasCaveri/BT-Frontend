import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetitionOfferType } from '../../petitioners-negotiate/models/petition-offer-type.model';
import { CurrencyPipe } from '@angular/common';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { PetitionAssignedCriteriaMediatorService } from '../../../../../shared/services/petition-assigned-criteria-mediator.service';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/shared/notifications/notifications-models/notification-type';
import { PetitionersListMediatorService } from 'src/app/shared/services/petitioners-list-mediator.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-petitioners-assigned-criteria-subcategory',
  templateUrl: './petitioners-assigned-criteria-subcategory.component.html',
  styleUrls: ['./petitioners-assigned-criteria-subcategory.component.scss']
})
export class PetitionersAssignedCriteriaSubcategoryComponent implements OnInit, OnDestroy {

  private roleMapper: any;
  private paymentMapper: any;
  private paymentPeriodMapper: any;
  private finalArray: Array<any> = [];
  private subscription: Subscription;
  public petitionOffers: Array<any> = [];

  constructor(
    private currencyPipe: CurrencyPipe,
    private petitionService: PetitionService,
    private assignedMediator: PetitionAssignedCriteriaMediatorService,
    private mapperService: MapperService,
    private mediatorNotificationService: PetitionersListMediatorService
  ) {
    this.roleMapper = mapperService.rolesTextMapper();
    this.paymentMapper = mapperService.paymentTextMapper();
    this.paymentPeriodMapper = mapperService.paymentPeriodTextMapper();
   }

  ngOnInit() {
    this.petitionService.getPetitionAssignedCriteriaSubcategory(PetitionOfferType.subcategory).subscribe(response => {
      this.petitionOffers = response.data;
      this.petitionOffers.map(x => {
        x.subcategories.map((y: any) => {
          const petition = y.petitionOffers.find((z: any) => z.place === 1);
          this.finalArray.push({ id: y.subcategoryId, offerId: petition.id });
        });
      });
    });
    this.sendModalData();
    this.subscription = this.assignedMediator.submit.subscribe(x => {
      const notification = {
        text: 'La solicitud ha sido adjudicada por precio de cada uno de los subrubros.',
        type: NotificationType.iconSuccess
      };
      this.mediatorNotificationService.emitNotification(notification);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public concatIndexId (subcategoryIndex: string, petitionId: any) {
    return petitionId.concat(subcategoryIndex);
  }

  public concatIndexIndex (categoryIndex: string, subcategoryIndex: string) {
    return categoryIndex.concat(subcategoryIndex);
  }

  public onCheck(index: any, petitionOfferId: string, subcategoryId: string, subcategoryIndex: number) {
    $(`[name="check${subcategoryIndex}"]`).prop('checked', false);
    $(`#SuppliersOneCheck${index}`).prop('checked', true);

    if (this.finalArray.find(x => x.id === subcategoryId)) {
      this.finalArray = this.finalArray.filter(x => x.id !== subcategoryId);
    }
    const subcategory = { id: subcategoryId, offerId: petitionOfferId };
    this.finalArray.push(subcategory);
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
      header: '¿Confirma que el criterio de adjudicación es por el precio de cada uno de los subrubros de la solicitud?'
    };
    this.assignedMediator.emitModalData(dataModal);
  }
}
