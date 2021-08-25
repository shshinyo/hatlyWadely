import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Router } from "@angular/router";
@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
  // showing form
  register = false;
  registered = false;
  // toggleDec
  deliveryDec = true;
  // register form
  newClient: FormGroup;
  // toTopShow
  toTopShow = false;
  actions = [
    { txt: "اختيار طريقة الشحن : الشحن العادي أو الشحن السريع", num: "one" },
    { txt: "اختيار حجم الاوردر اعتمادا على حجم ما تريد إرساله", num: "two" },
    { txt: "أدخل المعلومات الخاصة حول الشحنة الخاصة بك", num: "3" },
    { txt: "أدخل بيانات المرسل والمستقبل", num: "4" },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.addEventListener("scroll", this.scroll.bind(this), true);
  }
  scroll(e) {
    e.srcElement.scrollTop >= 450 ? (this.toTopShow = true) : (this.toTopShow = false);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.actions, event.previousIndex, event.currentIndex);
  }

  scrollToElement($element): void {
    setTimeout(() => {
      $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, 100);
    console.log($element);
  }
}
