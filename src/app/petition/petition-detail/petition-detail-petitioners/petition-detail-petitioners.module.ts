import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../../app-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { LoadingService } from '../../../shared/loading/loading.service';
import { PetitionDetailPetitionersComponent } from './petition-detail-petitioners.component';
import { PetitionersBasicDataComponent } from './petitioners-basic-data/petitioners-basic-data.component';
import { PetitionersDeliverDetailComponent } from './petitioners-deliver-detail/petitioners-deliver-detail.component';
import { PetitionersItemsComponent } from './petitioners-items/petitioners-items.component';
import { PetitionersPetitionTypeComponent } from './petitioners-petition-type/petitioners-petition-type.component';
import { PetitionersNegotiateComponent } from './petitioners-negotiate/petitioners-negotiate.component';
import { PetitionersNegotiateTotalComponent } from './petitioners-negotiate/petitioners-negotiate-total/petitioners-negotiate-total.component';
import { PetitionersNegotiateSubcategoryComponent } from './petitioners-negotiate/petitioners-negotiate-subcategory/petitioners-negotiate-subcategory.component';
import { PetitionersAssignedComponent } from './petitioners-assigned/petitioners-assigned.component';
import { PetitionersAssignedCriteriaComponent } from './petitioners-assigned-criteria/petitioners-assigned-criteria.component';
import { PetitionersAssignedCriteriaSubcategoryComponent } from './petitioners-assigned-criteria/petitioners-assigned-criteria-subcategory/petitioners-assigned-criteria-subcategory.component';
import { PetitionersAssignedCriteriaTotalComponent } from './petitioners-assigned-criteria/petitioners-assigned-criteria-total/petitioners-assigned-criteria-total.component';
import { ModalAssignedCriteriaComponent } from './petitioners-assigned-criteria/modals/modal-assigned-criteria/modal-assigned-criteria.component';
import { PetitionersAssignedAnonymousComponent } from './petitioners-assigned/petitioners-assigned-anonymous/petitioners-assigned-anonymous.component';
import { PetitionersAssignedChosenComponent } from './petitioners-assigned/petitioners-assigned-chosen/petitioners-assigned-chosen.component';


@NgModule({
    declarations: [
      PetitionDetailPetitionersComponent,
      PetitionersBasicDataComponent,
      PetitionersDeliverDetailComponent,
      PetitionersItemsComponent,
      PetitionersPetitionTypeComponent,
      PetitionersNegotiateComponent,
      PetitionersNegotiateTotalComponent,
      PetitionersNegotiateSubcategoryComponent,
      PetitionersAssignedComponent,
      PetitionersAssignedCriteriaComponent,
      PetitionersAssignedCriteriaSubcategoryComponent,
      PetitionersAssignedCriteriaTotalComponent,
      ModalAssignedCriteriaComponent,
      PetitionersAssignedAnonymousComponent,
      PetitionersAssignedChosenComponent
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

export class PetitionDetailPetitionersModule { }
