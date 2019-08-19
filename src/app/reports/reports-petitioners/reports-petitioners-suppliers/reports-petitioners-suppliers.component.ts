import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesService } from 'src/app/shared/datatables/datatables.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports-petitioners-suppliers',
  templateUrl: './reports-petitioners-suppliers.component.html',
  styleUrls: ['./reports-petitioners-suppliers.component.scss']
})
export class ReportsPetitionersSuppliersComponent implements OnInit {

  public dtOptions: DataTables.Settings = {};
  public dtElement: DataTableDirective;

  constructor(
    private datatablesService: DatatablesService
  ) { }

  ngOnInit() {
    this.dtOptions = this.datatablesService.buildOptions({
      ajax: (params: any, callback) => {
        const list: Array<any> = [
          {
            name: 'LOMA NEGRA CIA INDUSTRIAL ARGENTINA SA',
            ranking: '5',
            price: '$ 1.000.000,00'
          },
          {
            name: 'ORIGIN SOFTWARE SA',
            ranking: '4',
            price: '$ 10.000.000,00'
          }
        ];
        callback({
          recordsTotal: 10,
          recordsFiltered: 10,
          data: list
        });
      },
      columns: [{
        name: 'name',
        data: 'name',
        orderable: false,
        render: (data: any) => `${data}`
      },
      {
        name: 'ranking',
        data: 'ranking',
        render: (data: boolean) =>
        `<ngb-rating [rate]="${data}" [readonly]="true" max="5" class="text-warning icon--star"></ngb-rating>`
      },
      {
        name: 'price',
        data: 'price',
        render: (data: any) => `${data}`
      }],
      drawCallback: settings => {
        (<any>$('[data-toggle=tooltip]')).tooltip();
      },
      rowCallback: (row: Node, data: any[] | Object) => {
        return row;
      }
    });
  }

}
