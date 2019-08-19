import { Component, OnInit } from '@angular/core';
import { Clients } from '../models/sign-up-clients.model';
import { SignUpService } from '../sign-up.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { SignUpStep2Request } from './models/sign-up-step2-request.model';
import { SignUpStep2Service } from './sign-up-step2.service';
import { NotificationType } from '../../../shared/notifications/notifications-models/notification-type';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sign-up-step2',
  templateUrl: './sign-up-step2.component.html',
  styleUrls: ['./sign-up-step2.component.scss'],
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
export class SignUpStep2Component implements OnInit {

  public client: Clients;
  public signUpStep2Form: FormGroup;
  public submitted = false;
  private captchaResponse: string;

  constructor(
    private signUpService: SignUpService,
    private signUpStep2Service: SignUpStep2Service,
    private notification: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.client = this.signUpService.getClient();
    if (!this.client) {
      this.router.navigate(['signup/step1']);
    }
    this.signUpStep2Form = new FormGroup({
      'cuit': new FormControl('', [
        Validators.required,
        Validators.minLength(11)
      ]),
      'captcha': new FormControl('', Validators.required)
    });
  }

  public validate() {
    if (!this.signUpStep2Form.valid) {
      this.submitted = true;
      return;
    }
    const request: SignUpStep2Request = {
      id: this.signUpStep2Form.controls['cuit'].value,
      gRecaptchaResponse: this.captchaResponse
    };

    this.signUpStep2Service.validateFiscalEntity(request).subscribe(response => {
       this.signUpService.setCuit(request.id);
       this.signUpService.setToken(response.data.token);
      if (this.client === Clients.petitioner) {
        this.router.navigate(['signup/signup-form/petitioners']);
      } else if (this.client === Clients.supplier) {
        this.router.navigate(['signup/signup-form/suppliers']);
      }
    }, error => {
      if (error.status === 0 || error.status === 500) {
        this.notification.show({
          data: { text: 'Ocurrió un error desconocido, intente más tarde.' },
          type: NotificationType.Error
        });
        return;
      }
      if (error.status === 400) {
        this.notification.show({
          data: { text: 'Captcha o CUIT inválidos.' },
          type: NotificationType.Error
        });
        return;
      }
      this.notification.show({
        data: { text: error.error.error.description},
        type: NotificationType.Error
      });
    });
  }

  public resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

}
