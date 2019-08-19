import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SignUpService } from '../sign-up.service';
import { SignUpPetitionersRequest } from './models/sign-up-petitioners-request.model';
import { SignUpPetitionersService } from './sign-up-petitioners.service';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { NotificationType } from '../../../shared/notifications/notifications-models/notification-type';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MustMatch } from 'src/app/shared/services/form-validator.service';

@Component({
  selector: 'app-sign-up-form-petitioners',
  templateUrl: './sign-up-form-petitioners.component.html',
  styleUrls: ['./sign-up-form-petitioners.component.scss'],
  animations: [
    trigger('auth', [
      transition ('void => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(650, style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition ('* => void', [
        animate(650, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SignUpFormPetitionersComponent implements OnInit {

  public signUpPetitionerForm: FormGroup;
  public submitted = false;
  public cuit: string;
  public provinces = [];
  public localities = [];

  constructor(
    private signUpService: SignUpService,
    private signUpPetitionersService: SignUpPetitionersService,
    private notification: NotificationsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.cuit = this.signUpService.getCuit();
    if (!this.cuit) {
      this.router.navigate(['signup/step1']);
    }
    this.validations();
    this.getProvinces();
  }

  public createPetitionerAccount() {
    if (!this.signUpPetitionerForm.valid) {
      this.submitted = true;
      return;
    }
    const request = this.requestMapper();

    this.signUpPetitionersService.createPetitionerAccount(request).subscribe(() => {
      this.notification.show({
        data: { text: 'Verifica tu correo electrónico para activar tu cuenta Solicitante.' },
        type: NotificationType.iconSuccess
      });
      setTimeout(() => {
        this.router.navigate(['signin']);
      }, 3000);
    }, error => {
      if (error.status === 0) {
        this.notification.show({
          data: { text: 'Ocurrió un error desconocido, intente más tarde.' },
          type: NotificationType.Error
        });
        return;
      }
      this.notification.show({
        data: { text: error.error.error.description },
        type: NotificationType.Error
      });
    });
  }

  public getProvinces() {
   this.signUpPetitionersService.getProvinces().subscribe((result: any) => {
     this.provinces = result.data;
   });
  }

  public getLocalities(provinceId: any) {
    this.signUpPetitionersService.getLocalities(provinceId).subscribe((result: any) => {
      this.localities = result.data;
    });
  }

  private requestMapper(): SignUpPetitionersRequest {
    return {
      cuit: this.cuit,
      email: this.signUpPetitionerForm.controls['email'].value,
      password: this.signUpPetitionerForm.controls['password'].value,
      passwordRepeat: this.signUpPetitionerForm.controls['passwordRepeat'].value,
      businessName: this.signUpPetitionerForm.controls['businessName'].value,
      phone: this.signUpPetitionerForm.controls['phone'].value,
      street: this.signUpPetitionerForm.controls['street'].value,
      streetNumber: this.signUpPetitionerForm.controls['streetNumber'].value,
      apartment: this.signUpPetitionerForm.controls['apartment'].value,
      postCode: this.signUpPetitionerForm.controls['postCode'].value,
      localityId: <number>this.signUpPetitionerForm.controls['locality'].value,
      provinceId: <number>this.signUpPetitionerForm.controls['province'].value,
      name: this.signUpPetitionerForm.controls['name'].value,
      lastName: this.signUpPetitionerForm.controls['lastName'].value,
      emailAccountManager: this.signUpPetitionerForm.controls['amEmail'].value,
      phoneAccountManager: this.signUpPetitionerForm.controls['amPhone'].value,
      termsAndConditions: this.signUpPetitionerForm.controls['terms'].value,
      tokenCaptcha: this.signUpService.getToken()
    };
  }
  private validations() {
    this.signUpPetitionerForm = this.formBuilder.group({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]),
      'passwordRepeat': new FormControl('', Validators.required),
      'businessName': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'streetNumber': new FormControl('', Validators.required),
      'apartment': new FormControl(''),
      'postCode': new FormControl('', Validators.required),
      'locality': new FormControl(null, Validators.required),
      'province': new FormControl(null, Validators.required),
      'name': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'amEmail': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'amPhone': new FormControl('', Validators.required),
      'terms': new FormControl('', Validators.requiredTrue),
      'areaCode': new FormControl('', Validators.required),
    },
    {
      validator: MustMatch('password', 'passwordRepeat')
    });
  }
}

