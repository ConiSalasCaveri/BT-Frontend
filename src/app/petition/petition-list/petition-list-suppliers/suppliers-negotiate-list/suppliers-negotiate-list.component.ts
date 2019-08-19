import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesService } from 'src/app/shared/datatables/datatables.service';

@Component({
  selector: 'app-suppliers-negotiate-list',
  templateUrl: './suppliers-negotiate-list.component.html',
  styleUrls: ['./suppliers-negotiate-list.component.scss']
})
export class SuppliersNegotiateListComponent implements OnInit {

  public dtOptions: DataTables.Settings = {};
  //@ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;

  constructor(
    private datatablesService: DatatablesService
  ) { }

  ngOnInit() {
    this.dtOptions = this.datatablesService.buildOptions({
      ajax: (params: any, callback) => {

        const list: Array<any> = [
          {
            name: 'Construcción edificio de Av. Álvarez Thomas 1131',
            code: '12121212',
            expire: '13-01-2019',
            date: '02-04-2019',
            category: 34,
            subcategory: 23,
            state: '<span class="badge badge__dotted--success">En negociación</span>', // Estado
            action: 'Negociar'
          },
          {
            name: 'Construcción edificio de Av. Álvarez Thomas 1131',
            code: '12121212',
            expire: '13-01-2019',
            date: '02-04-2019',
            category: 34,
            subcategory: 23,
            state: '<span class="badge badge__dotted--light">No seleccionada</span>', // Estado
            action: 'Negociar' // disabled
          },
          {
            name: 'Construcción edificio de Av. Álvarez Thomas 1131',
            code: '12121212',
            expire: '13-01-2019',
            date: '02-04-2019',
            category: 34,
            subcategory: 23,
            state: '<span class="badge badge__dotted--danger">Anulada</span>', // Estado
            action: 'Negociar' // disabled
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
        render: (data: any) => `<a href="" class="text-primary" data-toggle="tooltip" data-placement="bottom" data-trigger="hover" title="Ver detalle">${data}</a>`
      }, {
        name: 'code',
        data: 'code',
        render: (data: string) => `${data}`
      }, {
        name: 'expire',
        data: 'expire',
        render: (data: number) => `${data}`
      }, {
        name: 'date',
        data: 'date',
        render: (data: boolean) => `${data}`
      },
      {
        name: 'category',
        data: 'category',
        render: (data: boolean) =>
          `<span class="btn btn-outline-dark" data-toggle="tooltip" data-placement="right" data-trigger="hover"
            data-html="true" title="<h6>Rubros</h6><ul class='tooltip__list'><li>Rubro 10</li><li>Rubro 10</li><li>Rubro 10</li></ul>">
            ${data}
          </span>`
      },
      {
        name: 'subcategory',
        data: 'subcategory',
        render: (data: boolean) =>
          `<span class="btn btn-outline-dark" data-toggle="tooltip" data-placement="right" data-trigger="hover"
            data-html="true" title="<h6>Sububros</h6><ul class='tooltip__list'><li>Rubro 10</li><li>Rubro 10</li><li>Rubro 10</li></ul>">
            ${data}
          </span>`
      },
      {
        name: 'state',
        data: 'state',
        render: (data: boolean) => `<span class="badge badge__dotted--success">${data}</span>`
      },
      {
        name: 'action',
        data: 'action',
        orderable: false,
        render: (data: boolean) => `<a href="" class="btn btn-primary btn-sm">${data}</a>`
      }],
      drawCallback: settings => {
        (<any>$('[data-toggle=tooltip]')).tooltip();
      },
      rowCallback: (row: Node, data: any[] | Object) => {
        (<any>$('[data-toggle=tooltip]')).tooltip('hide');
        return row;
      }
    });
  }

}
