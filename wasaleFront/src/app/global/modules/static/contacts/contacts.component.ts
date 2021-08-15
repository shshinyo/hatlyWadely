import { Component, OnInit } from "@angular/core";

interface Text {
  hed?: string;
}

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"],
})
export class ContactsComponent implements OnInit {
  // detect what route is it !!
  url = window.location.href;
  constructor() {}

  ngOnInit(): void {}

  get text(): Text {
    return this.url.includes("prices")
      ? {
          hed: "اتصل لتعرف السعر",
        }
      : {
          hed: "الاتصالات",
        };
  }
}
