import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../../app-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { LoadingService } from '../../../shared/loading/loading.service';
import { PetitionListSuppliersComponent } from './petition-list-suppliers.component';
import { SuppliersAvailableListComponent } from './suppliers-available-list/suppliers-available-list.component';
import { SuppliersNegotiateListComponent } from './suppliers-negotiate-list/suppliers-negotiate-list.component';
import { SuppliersAssignedListComponent } from './suppliers-assigned-list/suppliers-assigned-list.component';
import { SuppliersFinishListComponent } from './suppliers-finish-list/suppliers-finish-list.component';


@NgModule({
    declarations: [
      PetitionListSuppliersComponent,
      SuppliersAvailableListComponent,
      SuppliersNegotiateListComponent,
      SuppliersAssignedListComponent,
      SuppliersFinishListComponent
    ],
    imports: [
      AppRoutingModule,
      SharedModule
    ],
    providers: [
      NotificationsService,
      LoadingService
    ]
})

export class PetitionListSuppliersModule { }
