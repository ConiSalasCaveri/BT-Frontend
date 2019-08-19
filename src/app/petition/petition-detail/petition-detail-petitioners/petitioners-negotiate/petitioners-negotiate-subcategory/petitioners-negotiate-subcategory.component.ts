import { Component, OnInit } from '@angular/core';
import { PetitionOfferType } from '../models/petition-offer-type.model';
import { CurrencyPipe } from '@angular/common';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { PetitionersNegotiateMediatorService } from 'src/app/shared/services/petitioners-negotiate-mediator.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-petitioners-negotiate-subcategory',
  templateUrl: './petitioners-negotiate-subcategory.component.html',
  styleUrls: ['./petitioners-negotiate-subcategory.component.scss']
})
export class PetitionersNegotiateSubcategoryComponent implements OnInit {
  public petitionOffers: Array<any> = [];
  private roleMapper: any;
  private paymentMapper: any;
  private paymentPeriodMapper: any;
  constructor(
    private currencyPipe: CurrencyPipe,
    private petitionService: PetitionService,
    private mapperService: MapperService,
    private mediatorService: PetitionersNegotiateMediatorService,
  ) {
      this.roleMapper = mapperService.rolesTextMapper();
      this.paymentMapper = mapperService.paymentTextMapper();
      this.paymentPeriodMapper = mapperService.paymentPeriodTextMapper();
   }

  ngOnInit() {
    this.petitionService.getPetitionOffersSubcategory(PetitionOfferType.subcategory).subscribe(response => {
      this.petitionOffers = response.data;
    });
  }

  public openModal(data: any) {
    this.mediatorService.emit(data);
  }

  public createIndex(subcategoryIndex: string, petitionId: string) {
    return petitionId.concat(subcategoryIndex);
  }

  public getUpdatedOn(date: Date) {
    return date;
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

}
