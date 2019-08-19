import { Injectable } from '@angular/core';
import { PageParams } from '../models/pageparams.model';
import { SortParams } from '../models/searchparams.model';

@Injectable()
export class DatatablesService {

  private static Tooltips = {
    showHideFilters: 'Mostrar/Ocultar filtros',
    showHideColumns: 'Agregar/Ocultar columnas',
    filterResults: 'Filtrar sobre los resultados',
    rowsPerPage: 'Cantidad de filas por página',
    previousPage: 'Página anterior',
    nextPage: 'Página siguiente'
  };

  buildOptions(settings: DataTables.Settings): DataTables.Settings {
    return Object.assign({
      dom: '<<"dtbl_toolbar"plf>t<r>>',
      paging: true,
      responsive: true,
      pagingType: 'simple_numbers',
      pageLength: 10,
      info: true,
      serverSide: true,
      processing: false,
      searching: true,
      ordering: true,
      lengthChange: true,
      searchDelay: 400,
      language: {
        info: '_START_ - _END_ / _TOTAL_',
        infoEmpty: '0 - 0 / 0',
        emptyTable: 'Ningún registro encontrado',
        processing: '<div class="spinner-border spinner-border-sm text-secondary mr-3" role="status"><span class="sr-only">Loading...</span></div> Procesando',
        search: '',
        lengthMenu: '_MENU_', // hides the length title
        zeroRecords: 'No hay datos disponibles',
        paginate: {
          next: ',', // points to a custom font
          previous: '+' // points to a custom font
        }
      }
    }, settings, {
      initComplete: (initSettings, json) => {
        var $tableContainer = $(initSettings.nTableWrapper);
        this.initTableTooltips($tableContainer);
        this.initToggleFilters($tableContainer);
        if (settings.initComplete) {
          settings.initComplete(initSettings, json);
        }
      },
      drawCallback: drawSettings => {
        var $tableContainer = $(drawSettings.nTableWrapper);
        this.initPaginatorTooltips($tableContainer);
        if (settings.drawCallback) {
          settings.drawCallback(drawSettings);
        }
      }
    });
  }

  buildOptionsWithoutToolbar(settings: DataTables.Settings): DataTables.Settings {
    return this.buildOptions(Object.assign({
      dom: '<<"btn_icon_clpsearch">>flip>t<"dtbl_bottom">>',
      paging: false,
      pagingType: 'simple_numbers',
      pageLength: 10,
      info: true,
      serverSide: true,
      processing: false,
      searching: false,
      ordering: false,
      lengthChange: true,
      searchDelay: 400
    }, settings));
  }

  private initTableTooltips($tableContainer) {
    (<any>$tableContainer.find('.btn_icon_clpsearch')
      .attr('data-toggle', 'tooltip')
      .attr('data-placement', 'bottom')
      .attr('title', DatatablesService.Tooltips.showHideFilters))
      .tooltip({ container: '.dataTables_wrapper' });
    (<any>$tableContainer.find('.ColVis_Button.ColVis_MasterButton')
      .attr('data-toggle', 'tooltip')
      .attr('data-placement', 'bottom')
      .attr('title', DatatablesService.Tooltips.showHideFilters))
      .tooltip();
    (<any>$tableContainer.find('.dataTables_filter label input')
      .attr('data-toggle', 'tooltip')
      .attr('data-placement', 'bottom')
      .attr('title', DatatablesService.Tooltips.filterResults))
      .tooltip();
    (<any>$tableContainer.find('select[name=table_length]')
      .attr('data-toggle', 'tooltip')
      .attr('data-placement', 'bottom')
      .attr('title', DatatablesService.Tooltips.rowsPerPage))
      .tooltip();
    this.initPaginatorTooltips($tableContainer);
  }

  private initToggleFilters($tableContainer) {
    $tableContainer.find('.btn_icon_clpsearch').click(function () {
      const $search = $(this).closest('.cnt_clpsearch');
      $search.toggleClass('active');
    });
  }

  private initPaginatorTooltips($tableContainer) {
    (<any>$tableContainer.find('.paginate_button.previous')
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'bottom')
        .attr('title', DatatablesService.Tooltips.previousPage))
        .tooltip();

    (<any>$tableContainer.find('.paginate_button.next')
        .attr('data-toggle', 'tooltip')
        .attr('data-placement', 'bottom')
        .attr('title', DatatablesService.Tooltips.nextPage))
        .tooltip();
  }

  buildPageParams(params): PageParams {
    return { skip: params.start, take: params.length };
  }

  buildSortParams(params): SortParams {
    const sortParams: SortParams = {
      sortDir: [],
      sortBy: []
    };
    for (let i = 0; i < params.order.length; i++) {
      const order = params.order[i];
      sortParams.sortBy.push(params.columns[order.column].name);
      sortParams.sortDir.push(order.dir);
    }
    return sortParams;
  }
}
