import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { PetitionFinishedPetitionersComponent } from './petition-finished-petitioners/petition-finished-petitioners.component';
import { PetitionFinishedSuppliersComponent } from './petition-finished-suppliers/petition-finished-suppliers.component';


@NgModule({
    declarations: [
      PetitionFinishedPetitionersComponent,
      PetitionFinishedSuppliersComponent
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

export class PetitionFinishedModule { }
