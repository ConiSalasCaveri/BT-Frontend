import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesService } from 'src/app/shared/datatables/datatables.service';

@Component({
  selector: 'app-reports-petitioners-products',
  templateUrl: './reports-petitioners-products.component.html',
  styleUrls: ['./reports-petitioners-products.component.scss']
})
export class ReportsPetitionersProductsComponent implements OnInit {

  productsDetail = 'card-empty';

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
            name: 'Cemento Loma Negra Bolsa de 50 Kgs.'
          },
          {
            name: 'Ladrillos de cemento de 20 Kgs.'
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
        orderable: true,
        render: (data: any) => `<a href="" class="text-primary" data-toggle="tooltip" data-placement="bottom" data-trigger="hover" title="Ver detalle">${data}</a>`
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
