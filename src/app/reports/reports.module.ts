import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NotificationsService } from '../shared/notifications/notifications.service';
import { LoadingService } from '../shared/loading/loading.service';
import { ReportsPetitionersModule } from './reports-petitioners/reports-petitioners.module';
import { ReportsSuppliersModule } from './reports-suppliers/reports-suppliers.module';



@NgModule({
    declarations: [],
    imports: [
      AppRoutingModule,
      SharedModule,
      ReportsPetitionersModule,
      ReportsSuppliersModule
    ],
    providers: [
      NotificationsService,
      LoadingService,
      DatePipe
    ]
})

export class ReportsModule { }
