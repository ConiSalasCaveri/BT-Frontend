import { PetitionService } from 'src/app/shared/services/petition.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-petitioners-assigned-criteria',
  templateUrl: './petitioners-assigned-criteria.component.html',
  styleUrls: ['./petitioners-assigned-criteria.component.scss']
})
export class PetitionersAssignedCriteriaComponent implements OnInit {

  @Output() changeChild = new EventEmitter<string>();
  public state: number;

  constructor(
    private petitionService: PetitionService
  ) { }

  ngOnInit() {
    const petition = this.petitionService.getPetition();
    this.state = petition.state;
  }

  public next() {
    this.changeChild.emit('petitioners-assigned');
  }

  public back() {
    this.changeChild.emit('petitioners-negotiate');
  }

}
