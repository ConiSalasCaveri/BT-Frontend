import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { INotificationCommand } from './notifications-models/notification-interface-command';
import { INotification } from './notifications-models/notification-interface';

@Injectable()
export class NotificationsService {
  private notificationSubject: Subject<INotificationCommand>;
  public notificationState: Observable<INotificationCommand>;

  constructor() {
    this.notificationSubject = new Subject<INotificationCommand>();
    this.notificationState = this.notificationSubject.asObservable();
  }

  public show(notification: INotification) {
    this.notificationSubject.next({
      operation: 'show',
      notification: notification
    });
  }

  public clear() {
    this.notificationSubject.next({
      operation: 'clear',
      notification: null
    });
  }
}
