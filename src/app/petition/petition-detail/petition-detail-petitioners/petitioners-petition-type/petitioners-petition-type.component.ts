import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { PetitionModel } from '../../../petition-create/models/petition.model';

@Component({
  selector: 'app-petitioners-petition-type',
  templateUrl: './petitioners-petition-type.component.html',
  styleUrls: ['./petitioners-petition-type.component.scss']
})
export class PetitionersPetitionTypeComponent implements OnInit {
  public petition: PetitionModel;

  @Output() changeChild = new EventEmitter<string>();

  constructor(private petitionService: PetitionService) { }

  ngOnInit() {
    this.petition = this.petitionService.getPetition();
  }

  public next() {
    this.changeChild.emit('petitioners-negotiate');
  }

  public back() {
    this.changeChild.emit('petitioners-items');
  }

}
