import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './_layout/anonymous/auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpStep1Component } from './auth/sign-up/sign-up-step1/sign-up-step1.component';
import { SignUpStep2Component } from './auth/sign-up/sign-up-step2/sign-up-step2.component';
import { SignUpFormComponent } from './_layout/anonymous/sign-up-form/sign-up-form.component';
import { SignUpFormPetitionersComponent } from './auth/sign-up/sign-up-form-petitioners/sign-up-form-petitioners.component';
import { SignUpFormSuppliersComponent } from './auth/sign-up/sign-up-form-suppliers/sign-up-form-suppliers.component';
import { AccountValidationComponent } from './auth/account-validation/account-validation.component';
import { PasswordRecoverComponent } from './auth/password-recover/password-recover.component';
import { PasswordChangeComponent } from './auth/password-change/password-change.component';
import { AuthorizedComponent } from './_layout/authorized/authorized.component';
import { PetitionCreateComponent } from './petition/petition-create/petition-create.component';
import { PetitionListSuppliersComponent } from './petition/petition-list/petition-list-suppliers/petition-list-suppliers.component';
import { PetitionListPetitionersComponent } from './petition/petition-list/petition-list-petitioners/petition-list-petitioners.component';
import { AuthorizeGuard } from './shared/authorize-guard.service';
import { PetitionDetailSuppliersComponent } from './petition/petition-detail/petition-detail-suppliers/petition-detail-suppliers.component';
import { PetitionDetailPetitionersComponent } from './petition/petition-detail/petition-detail-petitioners/petition-detail-petitioners.component';
import { PetitionFinishedSuppliersComponent } from './petition/petition-finished/petition-finished-suppliers/petition-finished-suppliers.component';
import { PetitionFinishedPetitionersComponent } from './petition/petition-finished/petition-finished-petitioners/petition-finished-petitioners.component';
import { ReportsPetitionersProductsComponent } from './reports/reports-petitioners/reports-petitioners-products/reports-petitioners-products.component';
import { ReportsPetitionersSubcategoryComponent } from './reports/reports-petitioners/reports-petitioners-subcategory/reports-petitioners-subcategory.component';
import { ReportsPetitionersSuppliersComponent } from './reports/reports-petitioners/reports-petitioners-suppliers/reports-petitioners-suppliers.component';
import { ReportsSuppliersProductsComponent } from './reports/reports-suppliers/reports-suppliers-products/reports-suppliers-products.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
 // Login routes goes here here
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'signin', component: SignInComponent },
      { path: 'signup/step1', component: SignUpStep1Component },
      { path: 'signup/step2', component: SignUpStep2Component },
      { path: 'account-validation', component: AccountValidationComponent },
      { path: 'password-recover', component: PasswordRecoverComponent },
      { path: 'password-change', component: PasswordChangeComponent },
      { path: '', redirectTo: '/signin', pathMatch: 'full'}
    ]
  },
  {
    path: '',
    component: SignUpFormComponent,
    children: [
      { path: 'signup/signup-form/petitioners', component: SignUpFormPetitionersComponent },
      { path: 'signup/signup-form/suppliers', component: SignUpFormSuppliersComponent },
      { path: '', redirectTo: '/signin', pathMatch: 'full'}
    ]
  },
  // Site routes goes here
  {
    path: '',
    component: AuthorizedComponent,
    children: [
      { path: 'petition/create', component: PetitionCreateComponent },
      { path: 'petition/create/:id', component: PetitionCreateComponent },
      { path: 'petition/list/suppliers', component: PetitionListSuppliersComponent },
      { path: 'petition/list/petitioners', component: PetitionListPetitionersComponent},
      // TODO: Add authorize guard after authorization is completed
      // { path: 'petition/list/suppliers', component: PetitionListSuppliersComponent, canActivate: [AuthorizeGuard] },
      { path: 'petition/detail/suppliers', component: PetitionDetailSuppliersComponent },
      { path: 'petition/detail/petitioners/:id', component: PetitionDetailPetitionersComponent },
      { path: 'petition/finished/suppliers', component: PetitionFinishedSuppliersComponent },
      { path: 'petition/finished/petitioners', component: PetitionFinishedPetitionersComponent },
      { path: 'profile', component: ProfileComponent },
      // Reports Petitioners
      { path: 'reports/petitioners/products', component: ReportsPetitionersProductsComponent },
      { path: 'reports/petitioners/subcategory', component: ReportsPetitionersSubcategoryComponent },
      { path: 'reports/petitioners/suppliers', component: ReportsPetitionersSuppliersComponent },
      // Reports Suppliers
      { path: 'reports/suppliers/products', component: ReportsSuppliersProductsComponent },
      // Suppliers
      { path: '', redirectTo: '/petition/list/suppliers', pathMatch: 'full'},
      // Petitioners
      { path: '', redirectTo: '/petition/list/petitioners', pathMatch: 'full'}




    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
