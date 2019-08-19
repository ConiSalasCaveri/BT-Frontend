import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { PasswordChangeService } from './password-change.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { PasswordChangeRequest } from './models/password-change-request.model';
import { NotificationType } from 'src/app/shared/notifications/notifications-models/notification-type';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MustMatch } from 'src/app/shared/services/form-validator.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
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
export class PasswordChangeComponent implements OnInit, OnDestroy {

  public passwordChangeForm: FormGroup;
  private subscription: Subscription;
  private token: string;
  private email: string;
  public submitted = false;

  constructor(
    private notification: NotificationsService,
    private passwordChangeService: PasswordChangeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
      this.email = params['email'];
    });

    this.passwordChangeForm = this.formBuilder.group({
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]),
      'passwordRepeat': new FormControl('', Validators.required),
      'captcha': new FormControl('', Validators.required)
    },
    {
      validator: MustMatch('password', 'passwordRepeat')
    });
  }

  public changePassword() {
    if (!this.passwordChangeForm.valid) {
      this.submitted = true;
      return;
    }

    const request: PasswordChangeRequest = {
      token: this.token,
      email: this.email,
      password: this.passwordChangeForm.controls['password'].value,
      passwordRepeat: this.passwordChangeForm.controls['passwordRepeat'].value
    };

    this.passwordChangeService.changePassword(request).subscribe(() => {
      this.notification.show({
        data: { text: 'La contraseña fue actualizada con éxito.'},
        type: NotificationType.iconSuccess
      });
    }, error => {
      this.notification.show({
        data: {text: error.error.error.description },
        type: NotificationType.iconError
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}



