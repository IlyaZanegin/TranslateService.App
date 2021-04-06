import { Component } from '@angular/core';
import { NotificationService } from '@services';
import { INotification } from '@models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(
    public notificationService: NotificationService
  ) { }

  trackFn(index, notification: INotification) {
    return notification.id;
  }
}
