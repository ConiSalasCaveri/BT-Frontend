import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { PetitionListSuppliersModule } from '../../petition/petition-list/petition-list-suppliers/petition-list-suppliers.module';
import { PetitionListPetitionersModule } from './petition-list-petitioners/petition-list-petitioners.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectModule } from 'ng2-select';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
    ],
    imports: [
      AppRoutingModule,
      SharedModule,
      PetitionListSuppliersModule,
      PetitionListPetitionersModule,
    ],
    providers: [
      NotificationsService,
      LoadingService
    ]
})

export class PetitionListModule { }
