import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesService } from 'src/app/shared/datatables/datatables.service';
import { Subscription, throwError } from 'rxjs';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { PetitionService } from 'src/app/shared/services/petition.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { DatePipe } from '@angular/common';
import { PetitionsGroups } from '../models/petitions-list-enum.model';
import { NotificationType } from 'src/app/shared/notifications/notifications-models/notification-type';
import { FiltersMediatorService } from 'src/app/shared/services/filters-mediator.service';
import { MapperService } from 'src/app/shared/services/mapper.service';

@Component({
  selector: 'app-petitioners-assigned-list',
  templateUrl: './petitioners-assigned-list.component.html',
  styleUrls: ['./petitioners-assigned-list.component.scss']
})
export class PetitionersAssignedListComponent implements OnInit, OnDestroy {

  public dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;
  @Output() states = new EventEmitter<any>();

  private recordsPage: number;
  private subscription: Subscription;
  private statusMapper: any;
  private currentStatus: any;
  private filterSubscription: Subscription;
  private filters: any;

  constructor(
    private datatablesService: DatatablesService,
    private loadingService: LoadingService,
    private petitionService: PetitionService,
    private mapperService: MapperService,
    private notification: NotificationsService,
    private datePipe: DatePipe,
    private router: Router,
    private filterMediatorService: FiltersMediatorService) {
      this.statusMapper = this.mapperService.awardedStatusTextMapper();
    }

  ngOnInit() {
    const states = Object.keys(this.statusMapper)
      .map((item: any) => ({id: parseInt(item, 10), text: `${this.statusMapper[item]}`}));
    this.states.emit({ states: states, group: PetitionsGroups.Awarded });

    this.filterSubscription = this.filterMediatorService.filter.subscribe((x) => {
      if (x.group === PetitionsGroups.Awarded) {
        this.filters = x.filters;
        this.dtElement.dtInstance.then((dtInstance) => {
          dtInstance.ajax.reload();
        });
      }
    });

    this.dtOptions = this.datatablesService.buildOptions({
      ajax: (params: any, callback) => {
        if (this.subscription) {
          this.subscription.unsubscribe();
          this.loadingService.hide();
        }
        if (params.order[0].column === 0) {
          params.order.push( {column: 1, dir: 'asc'});
        }

        const pageParams = this.datatablesService.buildPageParams(params);
        const sortParams = this.datatablesService.buildSortParams(params);
        const search = params.search.value;

        this.loadingService.show();
        this.subscription = this.petitionService
          .getPetitionsAwarded(pageParams, sortParams, search, PetitionsGroups.Awarded, this.filters)
          .subscribe(response => {
            this.recordsPage = response.data.results.length;
            callback({
              recordsTotal: response.data.total,
              recordsFiltered: response.data.total,
              data: response.data.results
            });
            this.loadingService.hide();
          }, error => {
            this.loadingService.hide();
            if (error.status === 0) {
              this.notification.show({
                data: { text: 'Ocurrió un error en la conexión. Intente nuevamente.' },
                type: NotificationType.Error
              });
              return;
            }
            if (error.status === 401) {
              this.notification.show({
                data: { text: 'EL usuario no esta autorizado.' },
                type: NotificationType.iconError
              });
            }
            this.notification.show({
              data: { text: error.message },
              type: NotificationType.iconError
            });
            throwError(error);
          });
      },
      columns: [{
        name: 'name',
        data: 'name',
        orderable: false,
        render: (data: any) => `<a class="text-primary" data-toggle="tooltip" data-placement="bottom"
        data-trigger="hover" title="Ver detalle">${data}</a>`
      }, {
        name: 'outerCode',
        data: 'outerCode',
        render: (data: string) => `${data}`
      }, {
        name: 'offerExpirationDate',
        data: 'offerExpirationDate',
        render: (data: any) => `${this.datePipe.transform(data, 'dd-MM-yyyy')}`
      }, {
        name: 'deliveryDate',
        data: 'deliveryDate',
        render: (data: any) => `${this.datePipe.transform(data, 'dd-MM-yyyy')}`
      }, {
        name: 'categories',
        data: 'categories',
        render: (categories: any[]) =>
          `<span class="btn btn-outline-dark" ${(categories.length
            ? `data-toggle="tooltip" data-placement="right" data-trigger="hover"
            data-html="true" title="<h6>Rubros</h6><ul class='tooltip__list'>
            ${categories.slice(0, 5).map(x => `<li>${x.categoryModel.name}</li>`).join('')}
            ${`${(categories.length > 5 ? `<li class='text-secondary'>Más...</li>` : '')}`}</ul>"`
            : '')}>${categories.length}
          </span>`
      }, {
        name: 'subcategories',
        data: 'subcategories',
        render: (subcategories: any[]) =>
        `<span class="btn btn-outline-dark" ${(subcategories.length
          ? `data-toggle="tooltip" data-placement="right" data-trigger="hover"
          data-html="true" title="<h6>Subrubros</h6><ul class='tooltip__list'>
          ${subcategories.slice(0, 5).map((x: any) => `<li>${x.subCategory.name}</li>`).join('')}
          ${`${(subcategories.length > 5 ? `<li class='text-secondary'>Más...</li>` : '')}`}</ul>"`
          : '')}>${subcategories.length}
        </span>`
      }, {
        name: 'state',
        data: 'state',
        render: (data: number) => `<span class="${this.getClass(data)}">${this.getStatus(data)}</span>`
      }, {
        name: 'action',
        data: 'action',
        orderable: false,
        render: (data: boolean) => `
        <button class="btn btn-primary btn-sm" ${this.disable({disableStatus: [10]})}>Finalizar</button>
        <button class="btn text-danger" data-toggle="modal"
        data-target="#ModalNullify" ${this.disable({disableStatus: [11]})}>Anular</button>`
      }],
      drawCallback: () => {
        (<any>$('[data-toggle=tooltip]')).tooltip();
        (<any>$('#table')).on('responsive-display.dt', () => {
          (<any>$('[data-toggle=tooltip]')).tooltip();
        });
      },
      rowCallback: (row: Node, data: any[] | Object) => {
        $('.text-primary', row).bind('click', () => {
          (<any>$('[data-toggle=tooltip]')).tooltip('hide');
          this.goToDetail(data);
        });
      }
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  private goToDetail(data: any) {
    this.router.navigate([`petition/detail/petitioners/${data.id}`]);
  }

  private disable(data: any) {
    const disableMapping = data;
    if (disableMapping.disableStatus.some((x: any) => x === this.currentStatus)) {
      return '';
    } else {
      return 'disabled';
    }
  }

  private getClass(state: number) {
    if (state === 10) {
      return 'badge badge__dotted--success';
    } else if (state === 13) {
      return 'badge badge__dotted--dark';
    } else if (state === 11) {
      return 'badge badge__dotted--warning';
    } else if (state === 12) {
      return 'badge badge__dotted--danger';
    }
  }

  private getStatus(data: number) {
    this.currentStatus = data;
    return this.statusMapper[data];
  }

  public initDatatable(filters?: any) {
      }

}
