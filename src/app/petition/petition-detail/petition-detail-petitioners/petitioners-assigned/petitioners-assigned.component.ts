import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PetitionService } from 'src/app/shared/services/petition.service';

@Component({
  selector: 'app-petitioners-assigned',
  templateUrl: './petitioners-assigned.component.html',
  styleUrls: ['./petitioners-assigned.component.scss']
})
export class PetitionersAssignedComponent implements OnInit {
  @Output() changeChild = new EventEmitter<string>();
  public petition: any;

  petitionersAssigned = 'petitioners-assigned-anonymous';

  constructor(
    private petitionService: PetitionService,
  ) { }

  ngOnInit() {
    this.petition = this.petitionService.getPetition();
    if (this.petition.state === 10) {
      this.petitionersAssigned = 'petitioners-assigned-chosen';
    } else {
      this.petitionersAssigned = 'petitioners-assigned-anonymous';
    }
  }

}
