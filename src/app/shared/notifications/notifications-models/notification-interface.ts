import { NotificationType } from './notification-type';

export interface INotification {
  type: NotificationType;
  timeout?: boolean;
  data: any;
}
