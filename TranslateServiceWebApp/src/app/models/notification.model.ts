export enum NotificationType {
  success = 'success',
  error = 'error'
}

export interface INotification {
  id: number;
  type: NotificationType;
  message: string;
  description: string;
}
