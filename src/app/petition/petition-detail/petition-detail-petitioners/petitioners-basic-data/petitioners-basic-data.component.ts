import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { Payment } from 'src/app/shared/models/petition/petition-payment.model';
import { FormGroup, FormControl } from '@angular/forms';
import { PetitionModel } from '../../../petition-create/models/petition.model';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-petitioners-basic-data',
  templateUrl: './petitioners-basic-data.component.html',
  styleUrls: ['./petitioners-basic-data.component.scss']
})
export class PetitionersBasicDataComponent implements OnInit {
  public petition: any;
  public awardedDate: string;
  public offerDate: string;
  public payment: string;
  private paymentTextMapper: any;

  @Output() changeChild = new EventEmitter<string>();

  constructor(
    private petitionService: PetitionService,
    private mapperService: MapperService,
    ) {
    this.paymentTextMapper = this.mapperService.paymentTextMapper();
  }

  ngOnInit() {
    this.petition = this.petitionService.getPetition();
    this.awardedDate = this.petition.awardedDate.toLocaleString();
    this.payment = this.paymentTextMapper[this.petition.payment];
    this.offerDate = this.petition.offerExpirationDate.toLocaleString();
  }


  public next() {
    this.changeChild.emit('petitioners-deliver-detail');
  }
}
