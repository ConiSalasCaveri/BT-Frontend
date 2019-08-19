import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './shared/config.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { InterceptorService } from './shared/interceptor.service';
import { AuthorizeGuard } from './shared/authorize-guard.service';
import { AuthComponent } from './_layout/anonymous/auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { SignUpFormComponent } from './_layout/anonymous/sign-up-form/sign-up-form.component';
import { AuthorizedComponent } from './_layout/authorized/authorized.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatatablesService } from './shared/datatables/datatables.service';
import { PetitionModule } from './petition/petition.module';
import { ProfileModule } from './profile/profile.module';
import { ReportsModule } from './reports/reports.module';

export function init(config: ConfigService) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignUpFormComponent,
    AuthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    PetitionModule,
    ProfileModule,
    ReportsModule,
    SharedModule,
    NgbModule
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: init, deps: [ConfigService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    HttpClient,
    AuthorizeGuard,
    DatatablesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
