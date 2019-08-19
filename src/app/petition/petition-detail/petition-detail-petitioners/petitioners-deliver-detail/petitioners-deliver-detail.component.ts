import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { PetitionModel } from '../../../petition-create/models/petition.model';
import { ProvinceService } from '../../../../shared/services/province.service';
import { LocalityService } from '../../../../shared/services/locality.service';

@Component({
  selector: 'app-petitioners-deliver-detail',
  templateUrl: './petitioners-deliver-detail.component.html',
  styleUrls: ['./petitioners-deliver-detail.component.scss']
})
export class PetitionersDeliverDetailComponent implements OnInit {
  public petition: any;
  public provinceName: string;
  public localityName: string;
  public deliveryOnSiteDateStart: string;
  @Output() changeChild = new EventEmitter<string>();

  constructor(
    private petitionService: PetitionService,
    private provinceService: ProvinceService,
    private localityService: LocalityService) {
  }

  ngOnInit() {
    this.petition = this.petitionService.getPetition();
    this.deliveryOnSiteDateStart = this.petition.deliveryOnSiteDateStart;
    this.provinceService.getProvince(this.petition.provinceId).subscribe(response => {
      this.provinceName = response.text;
    });
    this.localityService.getLocality(this.petition.localityId).subscribe(response => {
      this.localityName = response.text;
    });
  }

  public next() {
    this.changeChild.emit('petitioners-items');
  }

  public back() {
    this.changeChild.emit('petitioners-basic-data');
  }

}
