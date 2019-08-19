import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { NotificationType } from 'src/app/shared/notifications/notifications-models/notification-type';
import { AccountValidationRequest } from './models/account-validation-request.model';
import { AccountValidationService } from './account-validation.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-account-validation',
  templateUrl: './account-validation.component.html',
  styleUrls: ['./account-validation.component.scss'],
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
export class AccountValidationComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private token: string;
  private email: string;
  public result = false;

  constructor(
    private route: ActivatedRoute,
    private notification: NotificationsService,
    private accountValidationService: AccountValidationService
  ) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token'].toString();
      this.email = params['email'].toString();
    });
     this.validateAccount();
  }

  private validateAccount() {
    const request: AccountValidationRequest = {
      email: this.email,
      token: this.token
    };

    this.accountValidationService.confirm(request).subscribe(() => {
      this.result = true;
      this.notification.show({
        data: { text: `La cuenta ${ this.email } fue activada con éxito.` },
        type: NotificationType.iconSuccess
      });
    }, error => {
      this.result = true;
      this.notification.show({
        data: { text: `La cuenta ${ this.email } no pudo ser activada. Intenta nuevamente, ingresando tu correo electrónico.` },
        type: NotificationType.iconError
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
