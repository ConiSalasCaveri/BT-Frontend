import { SubcategoryService } from './services/subcategory.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModalsFrameComponent } from './modals/modals-frame/modals-frame.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { AuthorizeGuard } from './authorize-guard.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { IconsModule } from './icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCancelComponent } from './modals/modal-cancel/modal-cancel.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FiltersComponent } from './filters/filters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { ModalImportComponent } from './modals/modal-import/modal-import.component';
import { ModalInvitationComponent } from './modals/modal-invitation/modal-invitation.component';
import { PetitionService } from './services/petition.service';
import { DtDaytimeComponent } from './datetimepicker/dt-daytime/dt-daytime.component';
import { DtTimeComponent } from './datetimepicker/dt-time/dt-time.component';
import { DateTimeFormatterService } from './date-time-formatter.service';
import { ModalDeleteComponent } from './modals/modal-delete/modal-delete.component';
import { ModalPublishComponent } from './modals/modal-publish/modal-publish.component';
import { Select2Module } from 'ng2-select2';
import { ModalNullifyComponent } from './modals/modal-nullify/modal-nullify.component';
import { ModalNegotiateComponent } from './modals/modal-negotiate/modal-negotiate.component';
import { PetitionCreateMediatorService } from './services/petition-create-mediator.service';
import { PetitionersNegotiateMediatorService } from './services/petitioners-negotiate-mediator.service';
import { PetitionersListMediatorService } from './services/petitioners-list-mediator.service';
import { PetitionAssignedCriteriaMediatorService } from './services/petition-assigned-criteria-mediator.service';
import { ModalRedirectComponent } from './modals/modal-redirect/modal-redirect.component';
import { LocalityService } from './services/locality.service';
import { ProvinceService } from './services/province.service';
import { CategoryService } from './services/category.service';
import { UnitService } from './services/unit.service';
import { FiltersMediatorService } from './services/filters-mediator.service';
import { MapperService } from './services/mapper.service';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    ModalsFrameComponent,
    LoadingComponent,
    NotificationsComponent,
    ModalCancelComponent,
    BreadcrumbComponent,
    FiltersComponent,
    ModalImportComponent,
    ModalInvitationComponent,
    DtDaytimeComponent,
    DtTimeComponent,
    ModalDeleteComponent,
    ModalPublishComponent,
    ModalNullifyComponent,
    ModalNegotiateComponent,
    ModalRedirectComponent,
    FileuploadComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule,
    Select2Module,
    FileDropModule
  ],
  providers: [
    LoadingService,
    AuthorizeGuard,
    PetitionService,
    PetitionCreateMediatorService,
    DateTimeFormatterService,
    PetitionersNegotiateMediatorService,
    PetitionersListMediatorService,
    PetitionAssignedCriteriaMediatorService,
    LocalityService,
    ProvinceService,
    CategoryService,
    SubcategoryService,
    UnitService,
    FiltersMediatorService,
    MapperService
  ],
  exports: [
  // MODULES
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    DataTablesModule,
    NgbModule,
    Select2Module,
  // COMPONENTS
    ModalsFrameComponent,
    ModalCancelComponent,
    ModalDeleteComponent,
    ModalPublishComponent,
    ModalImportComponent,
    ModalInvitationComponent,
    ModalNullifyComponent,
    ModalNegotiateComponent,
    ModalRedirectComponent,
    LoadingComponent,
    NotificationsComponent,
    BreadcrumbComponent,
    FiltersComponent,
    DtDaytimeComponent,
    DtTimeComponent,
    FileuploadComponent,
    FileDropModule
  ]
})

export class SharedModule {}
