import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { CurrencyPipe } from '@angular/common';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-petitioners-assigned-anonymous',
  templateUrl: './petitioners-assigned-anonymous.component.html',
  styleUrls: ['./petitioners-assigned-anonymous.component.scss']
})
export class PetitionersAssignedAnonymousComponent implements OnInit {

  public assignedForm: FormGroup;
  public offer: any;
  private paymentTextMapper: any;
  private paymentPeriodMapper: any;
  private RolesTextMapper: any;

  constructor(
    private petitionService: PetitionService,
    private currencyPipe: CurrencyPipe,
    private mapperService: MapperService,
  ) {
    this.paymentTextMapper = this.mapperService.paymentTextMapper();
    this.RolesTextMapper = this.mapperService.rolesTextMapper();
    this.paymentPeriodMapper = this.mapperService.paymentPeriodTextMapper();
   }

  async ngOnInit() {
    this.assignedForm = new FormGroup({
      'deliveryonsiteStart': new FormControl(''),
    });
    await this.petitionService.getAwardedAnonymous('someId').subscribe(response => {
      this.offer = response.data;
    });

  }

  public getShippingCostOwner(offerShippingCostOwner: any) {
    return this.RolesTextMapper[offerShippingCostOwner];
  }

  public getPaymentPeriod(offerPaymentPeriod: any) {
      return this.paymentPeriodMapper[offerPaymentPeriod];
  }

  public getPayment(offerPayment: any) {
      return this.paymentTextMapper[offerPayment];
  }

}
