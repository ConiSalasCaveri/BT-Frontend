import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { NotificationType } from 'src/app/shared/notifications/notifications-models/notification-type';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { LoginRequest } from './models/login-request.model';
import { SignInService } from './sign-in.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
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
export class SignInComponent implements OnInit {

  public loginForm: FormGroup;
  private captchaResponse: string;
  public submitted = false;

  constructor(
    private notification: NotificationsService,
    private loadingService: LoadingService,
    private router: Router,
    private signInService: SignInService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'captcha': new FormControl('', Validators.required)
    });
  }

  public onSubmit() {
    console.log(this.loginForm);
    if (!this.loginForm.valid && this.loginForm.controls['captcha'].errors !== null) {
      console.log('mal');
      this.submitted = true;
      return;
    }

    this.loadingService.show();
    const request: LoginRequest = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
      gRecaptchaResponse: this.captchaResponse
    };

    this.signInService.login(request).subscribe(response => {
      this.loadingService.hide();
      localStorage.setItem(SignInService.TOKEN, response.data.accessToken);
      localStorage.setItem(SignInService.REFRESHTOKEN, response.data.refreshToken);
      console.log('Logeado! ', response);
      this.router.navigate([`petition/list/petitioners`]);
      // TODO: go to home
    }, error => {
      if (error.status === 0) {
        this.notification.show({
          data: { text: 'Ocurrió un error desconocido, intente más tarde.' },
          type: NotificationType.Error
        });
        this.loadingService.hide();
        return;
      }
      this.notification.show({
        data: { text: error.error.error.description },
        type: NotificationType.Error
      });
      this.loadingService.hide();
    });
  }

  public resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    console.log(this.captchaResponse);
  }
}
