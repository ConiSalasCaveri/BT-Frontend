import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ReportsPetitionersProductsComponent } from './reports-petitioners-products/reports-petitioners-products.component';
import { ReportsPetitionersSubcategoryComponent } from './reports-petitioners-subcategory/reports-petitioners-subcategory.component';
import { ReportsPetitionersSuppliersComponent } from './reports-petitioners-suppliers/reports-petitioners-suppliers.component';



@NgModule({
    declarations: [
      ReportsPetitionersProductsComponent,
      ReportsPetitionersSubcategoryComponent,
      ReportsPetitionersSuppliersComponent
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

export class ReportsPetitionersModule { }
