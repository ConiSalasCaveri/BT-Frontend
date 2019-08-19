import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers-ranking',
  templateUrl: './suppliers-ranking.component.html',
  styleUrls: ['./suppliers-ranking.component.scss']
})
export class SuppliersRankingComponent implements OnInit {

  suppliersRanking = 'suppliers-ranking-total';

  constructor() { }

  ngOnInit() {
  }

}
