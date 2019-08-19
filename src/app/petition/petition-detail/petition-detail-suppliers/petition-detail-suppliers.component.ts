import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-petition-detail-suppliers',
  templateUrl: './petition-detail-suppliers.component.html',
  styleUrls: ['./petition-detail-suppliers.component.scss']
})
export class PetitionDetailSuppliersComponent implements OnInit {

  // AVAILABLE start
  // suppliersDetail = 'suppliers-items';
  // AVAILABLE end
  // NEGOTIATE start
  suppliersDetail = 'suppliers-edit-items';
  // NEGOTIATE end  
  // ASSIGNED start
  // suppliersDetail = 'suppliers-chosen';
  // ASSIGNED end

  constructor() { }

  ngOnInit() {
  }

}
