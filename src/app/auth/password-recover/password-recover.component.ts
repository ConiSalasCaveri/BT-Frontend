import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { PasswordRecoverRequest } from './models/password-recover-request.model';
import { PasswordRecoverService } from './password-recover.service';
import { NotificationType } from 'src/app/shared/notifications/notifications-models/notification-type';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.scss'],
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
export class PasswordRecoverComponent implements OnInit {

  public passwordRecoverForm: FormGroup;
  public buttonText: string;
  private captchaResponse: string;
  public submitted = false;

  constructor(
    private notification: NotificationsService,
    private passwordRecoverService: PasswordRecoverService
  ) { }

  ngOnInit() {
    this.passwordRecoverForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'captcha': new FormControl('', Validators.required)
    });
    this.buttonText = 'Restablecer contraseña';
  }

  public recoverPassword() {
    if (!this.passwordRecoverForm.valid) {
      this.submitted = true;
      return;
    }
    const request: PasswordRecoverRequest = {
      email: this.passwordRecoverForm.controls['email'].value,
      tokenCaptcha: this.captchaResponse
    };

    this.passwordRecoverService.recoverPassword(request).subscribe(() => {
      this.notification.show({
        data: { text: 'Se ha enviado un correo electrónico. Compruebe su bandeja de entrada.'},
        type: NotificationType.iconSuccess
      });
      this.buttonText = 'Reenviar correo';
    }, error => {
      if (error.status === 0) {
        this.notification.show({
          data: { text: 'Ocurrió un error desconocido, intente más tarde.' },
          type: NotificationType.iconError
        });
        return;
      }
      this.notification.show({
        data: { text: error.error.error.description },
        type: NotificationType.iconError
      });
    });
   }

  public resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }
}
