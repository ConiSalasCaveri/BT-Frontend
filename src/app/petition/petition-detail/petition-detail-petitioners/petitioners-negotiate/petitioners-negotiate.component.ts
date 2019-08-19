import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { PetitionModel } from '../../../petition-create/models/petition.model';

@Component({
  selector: 'app-petitioners-negotiate',
  templateUrl: './petitioners-negotiate.component.html',
  styleUrls: ['./petitioners-negotiate.component.scss']
})
export class PetitionersNegotiateComponent implements OnInit {
  public petition: PetitionModel;
  public petitionersNegotiate = 'petitioners-negotiate-total';
  @Output() changeChild = new EventEmitter<string>();

  constructor(
    private petitionService: PetitionService,
    ) { }

  ngOnInit() {
    this.petition = this.petitionService.getPetition();
  }

  public next() {
    this.changeChild.emit('petitioners-assigned-criteria');
  }

  public back() {
    this.changeChild.emit('petitioners-petition-type');
  }

}
