import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PetitionersNegotiateMediatorService } from 'src/app/shared/services/petitioners-negotiate-mediator.service';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { PetitionOfferType } from '../models/petition-offer-type.model';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-petitioners-negotiate-total',
  templateUrl: './petitioners-negotiate-total.component.html',
  styleUrls: ['./petitioners-negotiate-total.component.scss']
})
export class PetitionersNegotiateTotalComponent implements OnInit {

  public petitionOffers: Array<any> = [];
  private roleMapper: any;
  private paymentMapper: any;
  private paymentPeriodMapper: any;

  constructor(
    private currencyPipe: CurrencyPipe,
    private petitionService: PetitionService,
    private mediatorService: PetitionersNegotiateMediatorService,
    private mapperService: MapperService,
  ) {
    this.roleMapper = mapperService.rolesTextMapper();
    this.paymentMapper = mapperService.paymentTextMapper();
    this.paymentPeriodMapper = mapperService.paymentPeriodTextMapper();
   }

  ngOnInit() {
    this.petitionService.getPetitionOffers(PetitionOfferType.total).subscribe(response => {
      this.petitionOffers = response.data;
    });
  }

  public openModal(data: any) {
    this.mediatorService.emit(data);
  }

  public getUpdatedOn(date: Date) {
    return date.toLocaleString();
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
