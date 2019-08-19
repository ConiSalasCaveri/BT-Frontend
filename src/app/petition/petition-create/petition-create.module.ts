import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { PetitionCreateComponent } from './petition-create.component';
import { PetitionCreateBasicDataComponent } from './petition-create-basic-data/petition-create-basic-data.component';
import { PetitionCreateDeliverDetailComponent } from './petition-create-deliver-detail/petition-create-deliver-detail.component';
import { PetitionCreateItemsComponent } from './petition-create-items/petition-create-items.component';
import { PetitionCreatePetitionTypeComponent } from './petition-create-petition-type/petition-create-petition-type.component';
import { ModalFileuploadComponent } from './petition-create-items/modals/modal-fileupload/modal-fileupload.component';


@NgModule({
    declarations: [
      PetitionCreateComponent,
      PetitionCreateBasicDataComponent,
      PetitionCreateDeliverDetailComponent,
      PetitionCreateItemsComponent,
      PetitionCreatePetitionTypeComponent,
      ModalFileuploadComponent
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

export class PetitionCreateModule { }
