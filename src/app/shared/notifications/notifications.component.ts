import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { INotification } from './notifications-models/notification-interface';
import { NotificationsService } from './notifications.service';
import { INotificationCommand } from './notifications-models/notification-interface-command';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private subscriptionRouter: Subscription;
  public notifications: INotification[];
  constructor(
    private notificationsService: NotificationsService) {
    this.notifications = [];
  }

  ngOnInit() {
    this.subscription = this.notificationsService.notificationState.subscribe(state => {
      if (state.operation === 'show') {
        this.showNotification(state);
      } else if (state.operation === 'clear') {
        this.clearNotifications();
      }
    });
  }

  private clearNotifications() {
    this.notifications = [];
  }

  private showNotification(state: INotificationCommand) {
    this.notifications = [state.notification];
    if (state.notification.timeout) {
      setTimeout(() => {
        this.notifications.splice(this.notifications.indexOf(state.notification), 1);
      }, 10000);
    }
  }

  hide(i: any) {
    this.notifications.splice(i, 1);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionRouter) {
      this.subscriptionRouter.unsubscribe();
    }
  }

}
