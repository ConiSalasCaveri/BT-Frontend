import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Payment } from 'src/app/shared/models/petition/petition-payment.model';
import { Roles } from '../../petition-detail/petition-detail-petitioners/petitioners-negotiate/models/roles.model';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { CurrencyPipe } from '@angular/common';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-petition-finished-petitioners',
  templateUrl: './petition-finished-petitioners.component.html',
  styleUrls: ['./petition-finished-petitioners.component.scss']
})
export class PetitionFinishedPetitionersComponent implements OnInit {

  public assignedForm: FormGroup;
  public petition: any;
  private paymentTextMapper: any;
  private rolesTextMapper: any;
  private paymentPeriodMapper: any;

  constructor(
    private petitionService: PetitionService,
    private currencyPipe: CurrencyPipe,
    private mapperService: MapperService,
  ) {
    this.paymentTextMapper = this.mapperService.paymentTextMapper();
    this.rolesTextMapper = this.mapperService.rolesTextMapper();
    this.paymentPeriodMapper = this.mapperService.paymentPeriodTextMapper();
   }

  ngOnInit() {
    this.assignedForm = new FormGroup({
      'deliveryonsiteStart': new FormControl(''),
    });
    this.petitionService.getFinished('somePetitionId').subscribe(response => {
      this.petition = response;
      this.petition.shippingCostOwner = this.rolesTextMapper[response.shippingCostOwner];
      this.petition.paymentPeriod = this.paymentPeriodMapper[this.petition.paymentPeriod];
      this.petition.payment = this.paymentTextMapper[this.petition.payment];
    });
  }

}
