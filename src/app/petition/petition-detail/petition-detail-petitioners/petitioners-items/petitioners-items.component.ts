import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PetitionModel } from '../../../petition-create/models/petition.model';
import { PetitionService } from 'src/app/shared/services/petition.service';

@Component({
  selector: 'app-petitioners-items',
  templateUrl: './petitioners-items.component.html',
  styleUrls: ['./petitioners-items.component.scss']
})
export class PetitionersItemsComponent implements OnInit {
  public petition: PetitionModel;
  public products: Array<any>;

  @Output() changeChild = new EventEmitter<string>();

  constructor(private petitionService: PetitionService) { }

  ngOnInit() {
    this.petition = this.petitionService.getPetition();
    this.petitionService.getPetitionProducts(this.petition.id).subscribe(response => {
      this.products = response.data.products;
    });
  }

  public next() {
    this.changeChild.emit('petitioners-petition-type');
  }

  public back() {
    this.changeChild.emit('petitioners-deliver-detail');
  }

}
