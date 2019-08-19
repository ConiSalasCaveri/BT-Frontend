import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NotificationsService } from '../shared/notifications/notifications.service';
import { LoadingService } from '../shared/loading/loading.service';
import { PetitionCreateModule } from '../petition/petition-create/petition-create.module';
import { PetitionListModule } from './petition-list/petition-list.module';
import { PetitionDetailModule } from './petition-detail/petition-detail.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetitionFinishedModule } from './petition-finished/petition-finished.module';


@NgModule({
    declarations: [],
    imports: [
      AppRoutingModule,
      SharedModule,
      PetitionCreateModule,
      PetitionListModule,
      FormsModule,
      ReactiveFormsModule,
      PetitionDetailModule,
      PetitionFinishedModule,
    ],
    providers: [
      NotificationsService,
      LoadingService,
      DatePipe
    ]
})

export class PetitionModule { }
