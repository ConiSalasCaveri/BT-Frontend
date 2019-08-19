import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ReportsSuppliersProductsComponent } from './reports-suppliers-products/reports-suppliers-products.component';



@NgModule({
    declarations: [
      ReportsSuppliersProductsComponent
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

export class ReportsSuppliersModule { }
