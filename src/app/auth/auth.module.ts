import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpStep1Component } from './sign-up/sign-up-step1/sign-up-step1.component';
import { SignUpStep2Component } from './sign-up/sign-up-step2/sign-up-step2.component';
import { SignUpFormPetitionersComponent } from './sign-up/sign-up-form-petitioners/sign-up-form-petitioners.component';
import { NotificationsService } from '../shared/notifications/notifications.service';
import { LoadingService } from '../shared/loading/loading.service';
import { SignInService } from './sign-in/sign-in.service';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { SignUpFormSuppliersComponent } from './sign-up/sign-up-form-suppliers/sign-up-form-suppliers.component';
import { AccountValidationComponent } from './account-validation/account-validation.component';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { AccountValidationService } from './account-validation/account-validation.service';
import { PasswordRecoverService } from './password-recover/password-recover.service';
import { PasswordChangeService } from './password-change/password-change.service';
import { SignUpService } from './sign-up/sign-up.service';
import { SignUpStep2Service } from './sign-up/sign-up-step2/sign-up-step2.service';
import { SignUpPetitionersService } from './sign-up/sign-up-form-petitioners/sign-up-petitioners.service';
import { SignUpSuppliersService } from './sign-up/sign-up-form-suppliers/sign-up-suppliers.service';
import { ModalCategoryComponent } from './sign-up/sign-up-form-suppliers/modals/modal-category/modal-category.component';


@NgModule({
    declarations: [
        SignInComponent,
        SignUpStep1Component,
        SignUpStep2Component,
        SignUpFormPetitionersComponent,
        SignUpFormSuppliersComponent,
        AccountValidationComponent,
        PasswordRecoverComponent,
        PasswordChangeComponent,
        ModalCategoryComponent
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
        RecaptchaModule,
        RecaptchaFormsModule
    ],
    providers: [
      NotificationsService,
      LoadingService,
      SignInService,
      AccountValidationService,
      PasswordRecoverService,
      PasswordChangeService,
      SignUpService,
      SignUpStep2Service,
      SignUpPetitionersService,
      SignUpSuppliersService,
      {
        provide: RECAPTCHA_SETTINGS,
        useValue: { siteKey: '6Lc-7J0UAAAAABBpFt1NSeYfA6eySr51PDSmz41K' } as RecaptchaSettings,
      },
    ]
})

export class AuthModule { }
