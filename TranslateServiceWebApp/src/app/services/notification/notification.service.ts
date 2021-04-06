import { Injectable } from '@angular/core';
import { INotification, NotificationType } from '@models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications: INotification[] = [];
  private notificationCounter = 0;
  private readonly autoCloseTimeout = 5000;
  private readonly fadeOutTime = 500;

  success(description: string): void {
    this.add({
      id: this.notificationCounter,
      type: NotificationType.success,
      message: 'Success',
      description: description
    });
  }

  error(description: string): void {
    this.add({
      id: this.notificationCounter,
      type: NotificationType.error,
      message: 'Error',
      description: description
    });
  }

  close(notification: INotification): void {
    const i = this.getNotificationIndexById(notification.id);
    if (i >= 0) {
      this.notifications[i]['isClosing'] = true;

      setTimeout(() => {
        this.notifications.splice(i, 1);
      }, this.fadeOutTime);
    }
  }

  private add(notification: INotification, autoClose = true): void {
    this.notifications.push(notification);
    this.notificationCounter++;

    if (autoClose) {
      setTimeout(() => {
        this.close(notification);
      }, this.autoCloseTimeout);
    }
  }

  private getNotificationIndexById(id: number): number {
    return this.notifications.findIndex(notification => notification.id === id);
  }
}
