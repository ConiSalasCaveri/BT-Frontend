import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../../app-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { LoadingService } from '../../../shared/loading/loading.service';
import { PetitionDetailSuppliersComponent } from './petition-detail-suppliers.component';
import { SuppliersItemsComponent } from './suppliers-items/suppliers-items.component';
import { SuppliersEditItemsComponent } from './suppliers-edit-items/suppliers-edit-items.component';
import { SuppliersRankingComponent } from './suppliers-ranking/suppliers-ranking.component';
import { SuppliersChosenComponent } from './suppliers-chosen/suppliers-chosen.component';


@NgModule({
    declarations: [
      PetitionDetailSuppliersComponent,
      SuppliersItemsComponent,
      SuppliersEditItemsComponent,
      SuppliersRankingComponent,
      SuppliersChosenComponent
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

export class PetitionDetailSuppliersModule { }
