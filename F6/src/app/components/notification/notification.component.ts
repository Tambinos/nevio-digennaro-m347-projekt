import {Component} from '@angular/core';
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notifyMe() {
    // Check if notification permissions have alredy been granted
    if (Notification.permission === 'granted') {
      this.pushNotification('Hello World!');
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this.pushNotification('Hello World!');
        }
      });
      // Request Permission for notifications
      // If accepted, create a notification
    }
    this.observable.pipe(map(value => console.log(value)));

  }
  observable = new Observable();

  pushNotification(notification: string) {
    // Producer - create a new observable, providing the subscribe function
    // Use a timeout of 2 seconds to fake a asynchronous event
    // Consumer - Subscribe to Notifications
    const notificationObservable = new Observable<string>(subscriber => {
      setTimeout(() => {
        subscriber.next(notification);
        subscriber.complete();
      }, 2000);
    });

    notificationObservable.subscribe({
      next: value => {
        alert("Notification: " + value);
      },
      error: error => console.error(error),
      complete: () => console.log(" Notification sent successfully.")
    });
  }
}
