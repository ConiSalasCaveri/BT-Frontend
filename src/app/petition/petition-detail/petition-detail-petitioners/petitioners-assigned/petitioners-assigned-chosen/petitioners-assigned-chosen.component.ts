import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-petitioners-assigned-chosen',
  templateUrl: './petitioners-assigned-chosen.component.html',
  styleUrls: ['./petitioners-assigned-chosen.component.scss']
})
export class PetitionersAssignedChosenComponent implements OnInit {

  public assignedForm: FormGroup;
  public offerList = [];
  private paymentTextMapper: any;
  private RolesTextMapper: any;
  private paymentPeriodMapper: any;

  constructor(
    private petitionService: PetitionService,
    private mapperService: MapperService,
    private currencyPipe: CurrencyPipe,
  ) {
    this.paymentTextMapper = this.mapperService.paymentTextMapper();
    this.RolesTextMapper = this.mapperService.rolesTextMapper();
    this.paymentPeriodMapper = mapperService.paymentPeriodTextMapper();
   }

  ngOnInit() {
    this.assignedForm = new FormGroup({
      'deliveryonsiteStart': new FormControl(''),
    });

    this.petitionService.getAwardedChosen('someId').subscribe(response => {
      this.offerList = response.data;
    });
  }

  public getShippingCostOwner(shippingCostOwner: any) {
    return this.RolesTextMapper[shippingCostOwner];
  }

  public getPaymentPeriod(paymentPeriod: any) {
    return this.paymentPeriodMapper[paymentPeriod];
  }

  public getPayment(payment: any) {
      return this.paymentTextMapper[payment];
  }

}
