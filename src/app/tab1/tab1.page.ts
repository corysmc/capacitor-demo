import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
const { LocalNotifications } = Plugins;
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor() {}

  async dailyReminderHandler(e: CustomEvent) {
    const value = e.detail.value;
    console.log("daily reminder", value);
    const date = new Date(value);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const pending = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Daily Reminder",
          body: "Daily Reminder Body",
          id: 1,
          schedule: {
            every: "day",
            on: {
              hour,
              minute
            }
          }
        }
      ]
    });
    console.log("pending notifications", pending);
  }

  async oneTimeReminderHandler(e: CustomEvent) {
    const value = e.detail.value;
    console.log("one time reminder", value);
    const date = new Date(value);
    const pending = await LocalNotifications.schedule({
      notifications: [
        {
          title: "One Time Reminder",
          body: "One Time Reminder Body",
          id: 2,
          schedule: {
            at: date
          }
        }
      ]
    });
    console.log("pending notifications", pending);
  }
}
