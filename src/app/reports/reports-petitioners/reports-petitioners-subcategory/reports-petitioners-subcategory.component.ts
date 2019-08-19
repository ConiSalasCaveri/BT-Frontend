import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesService } from 'src/app/shared/datatables/datatables.service';

@Component({
  selector: 'app-reports-petitioners-subcategory',
  templateUrl: './reports-petitioners-subcategory.component.html',
  styleUrls: ['./reports-petitioners-subcategory.component.scss']
})
export class ReportsPetitionersSubcategoryComponent implements OnInit {

  subcategoryDetail = 'card-filled';

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
            name: 'Construcción edificio de Av. Álvarez Thomas 1131'
          },
          {
            name: 'Construcción edificio de Av. Álvarez Thomas 450'
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
