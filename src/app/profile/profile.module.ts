import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NotificationsService } from '../shared/notifications/notifications.service';
import { LoadingService } from '../shared/loading/loading.service';
import { ProfileComponent } from './profile.component';
import { ProfileGeneralComponent } from './profile-general/profile-general.component';
import { ProfileGeneralSuppliersComponent } from './profile-general/profile-general-suppliers/profile-general-suppliers.component';
import { ProfileListUserComponent } from './profile-list-user/profile-list-user.component';
import { ProfileListSuppliersComponent } from './profile-list-suppliers/profile-list-suppliers.component';
import { ModalCreateUsersComponent } from './modals/modal-create-users/modal-create-users.component';



@NgModule({
    declarations: [
      ProfileComponent,
      ProfileGeneralComponent,
      ProfileGeneralSuppliersComponent,
      ProfileListUserComponent,
      ProfileListSuppliersComponent,
      ModalCreateUsersComponent
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

export class ProfileModule { }
