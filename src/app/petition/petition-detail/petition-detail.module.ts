import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { PetitionDetailPetitionersModule } from './petition-detail-petitioners/petition-detail-petitioners.module';
import { PetitionDetailSuppliersModule } from './petition-detail-suppliers/petition-detail-suppliers.module';
import { CurrencyPipe } from '@angular/common';


@NgModule({
    declarations: [],
    imports: [
      AppRoutingModule,
      SharedModule,
      PetitionDetailPetitionersModule,
      PetitionDetailSuppliersModule
    ],
    providers: [
      NotificationsService,
      LoadingService,
      CurrencyPipe,
    ]
})

export class PetitionDetailModule { }
