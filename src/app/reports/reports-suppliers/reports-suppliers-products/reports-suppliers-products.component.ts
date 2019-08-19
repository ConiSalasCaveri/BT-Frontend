import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesService } from 'src/app/shared/datatables/datatables.service';

@Component({
  selector: 'app-reports-suppliers-products',
  templateUrl: './reports-suppliers-products.component.html',
  styleUrls: ['./reports-suppliers-products.component.scss']
})
export class ReportsSuppliersProductsComponent implements OnInit {

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
            name: 'Cemento Loma Negra Bolsa de 50 Kgs.',
            category: 'Rubro 10',
            subcategory: 'Sububro 10',
            petition: 20
          },
          {
            name: 'Ladrillos de cemento de 20 Kgs.',
            category: 'Rubro 10',
            subcategory: 'Sububro 20',
            petition: 10
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
        name: 'category',
        data: 'category',
        render: (data: any) => `${data}`
      },
      {
        name: 'subcategory',
        data: 'subcategory',
        render: (data: any) => `${data}`
      },
      {
        name: 'petition',
        data: 'petition',
        render: (data: boolean) =>
          `<span class="btn btn-outline-dark" data-toggle="tooltip" data-placement="right" data-trigger="hover"
            data-html="true" title="<h6>Solicitudes</h6><ul class='tooltip__list'><li>Construcción edificio de Av. Álvarez Thomas 1131</li><li>Construcción edificio de Av. Álvarez Thomas 1131</li><li>Construcción edificio de Av. Álvarez Thomas 1131</li></ul>">
            ${data}
          </span>`
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
