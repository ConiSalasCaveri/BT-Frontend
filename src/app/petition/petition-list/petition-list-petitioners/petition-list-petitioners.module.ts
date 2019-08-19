import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../../app-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { LoadingService } from '../../../shared/loading/loading.service';
import { PetitionListPetitionersComponent } from './petition-list-petitioners.component';
import { PetitionersDraftListComponent } from './petitioners-draft-list/petitioners-draft-list.component';
import { PetitionersPublishListComponent } from './petitioners-publish-list/petitioners-publish-list.component';
import { PetitionersNegotiateListComponent } from './petitioners-negotiate-list/petitioners-negotiate-list.component';
import { PetitionersAssignedListComponent } from './petitioners-assigned-list/petitioners-assigned-list.component';
import { PetitionersFinishListComponent } from './petitioners-finish-list/petitioners-finish-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
      PetitionListPetitionersComponent,
      PetitionersDraftListComponent,
      PetitionersPublishListComponent,
      PetitionersNegotiateListComponent,
      PetitionersAssignedListComponent,
      PetitionersFinishListComponent
    ],
    imports: [
      AppRoutingModule,
      SharedModule,
      NgSelectModule,
      FormsModule
    ],
    providers: [
      NotificationsService,
      LoadingService
    ]
})

export class PetitionListPetitionersModule { }
