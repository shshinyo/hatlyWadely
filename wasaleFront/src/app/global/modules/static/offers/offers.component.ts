import { moveItemInArray } from "@angular/cdk/drag-drop";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { distinct, filter, map, tap } from "rxjs/Operators";
import { User } from "src/app/shared/utilities/interfaces.interface";
import { ModalService } from "src/app/shared/services/modal.service";
import { UsersService } from "src/app/shared/services/users.service";
@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersComponent implements OnInit {
  // showing form
  register = false;
  registered = false;
  // toggleDec
  deliveryDec = true;
  // register form
  newClient: FormGroup;
  // canDeactivate
  isDirty = true;
  // autoPaly Video
  play: boolean;
  // window width
  winWidth;
  users: User[];

  // well use it directly in HTML as async Pipe
  allUsers$ = this.userService.getUsers$;
  // scroll to an element
  scrollToElement($element): void {
    this.userService.getUsers$
      .pipe(map((users) => this.uniqueUsers(users)))
      .subscribe((users) => {
        this.users = users;
        console.log(users);
      });
    setTimeout(() => {
      $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, 200);
    this.register = true;
  }
  // listen to window
  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    // this.winHeight = window.innerHeight;
    this.winWidth = window.innerWidth;
    this.winWidth >= 1000 ? (this.play = true) : (this.play = false);
  }
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private userService: UsersService,
    private toastr: ToastrService,
    private _modal: ModalService
  ) {
    this._newClient();
    this.getScreenSize();
  }

  ngOnInit(): void {}

  cancel(): void {
    this._modal.confirmDialog("هل أنت متأكد من إلغاء العملية ؟!").pipe(filter((confirm) => !!confirm)).subscribe(() => {
      this._modal.snackbar("تم إلغاء العملية بنجاح", "success")
      this._router.navigateByUrl("/welcome")
    });

  }

  postNew(client: User): void {
    this.userService.createUser(client).subscribe((res: any) => {
      if (res.state === true) {
        this.toastr.success(
          "سيتم تحويلك الان علي الصفحة الرئيسية",
          " تم التسجيل بنجاح شكرا لثقتك فى هاتلى ووديلى "
        );
        this.register = false;
        this.registered = true;
        this.isDirty = false;
        setTimeout(() => {
          this._router.navigate(["/welcome"]);
        }, 2000);
      } else if (res.state === false) {
        this.toastr.error(" حدث خطأ أثناء التسجيل ");
      }
    });
  }

  private uniqueUsers(users) {
    const uniUser: User = {};
    const newUsers: User[] = [];
    // tslint:disable-next-line: forin
    for (const i in users) {
      // tslint:disable-next-line: no-string-literal
      const userName = users[i]["name"];
      uniUser[userName] = users[i];
    }
    // tslint:disable-next-line: forin
    for (const i in uniUser) {
      newUsers.push(uniUser[i]);
    }
    return newUsers;
  }

  // isPhoneNumberDuplicated() {
  //   const phone = this.newClient.get("phone").value;
  //   return !!this.users.find((user) => user.phone === phone);
  // }

  get nameError(): string {
    const name = this.newClient.get("name");
    if (!name) {
      return "";
    }

    return name.hasError("required")
      ? "من فضلك ادخل الاسم"
      : name.hasError("isNameDuplicated")
      ? "هذا الاسم مسجل لدينا بالفعل"
      : "كلم القسم المختص بخدمة العملاء";
  }

  get phoneError(): string {
    const phone = this.newClient.get("phone");

    if (!phone) {
      return "";
    }

    return phone.hasError("required")
      ? "من فضلك ادخل رقم الهاتف"
      : phone.hasError("pattern")
      ? "لابد من البد بالارقام الاتية 010 ،012 ،015 ،011 ويكون مكون من 11 رقم"
      : phone.hasError("isPhoneNumberDuplicated")
      ? "هذا الرقم مسجل بالفعل...برجاء التسجيل برقم أخر."
      : "الرقم الذي ادخلــته غير صحيــح";
  }

  private _newClient(): void {
    const patternTextOnly =
      "^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$";
    const patternNumberOnly = /^01[0125][0-9]{8}$/;
    this.newClient = this._fb.group({
      name: ["", [Validators.required, this.isNameDuplicated]],
      phone: [
        "",
        [
          Validators.required,
          Validators.pattern(patternNumberOnly),
          this.isPhoneNumberDuplicated,
        ],
      ],
      address: ["", Validators.required],
    });
  }

  // custom validator
  isPhoneNumberDuplicated: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    if (control.value) {
      return this.users.find((user) => user.phone === control.value)
        ? { isPhoneNumberDuplicated: true }
        : null;
    }
    return null;
  };

  isNameDuplicated: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    if (control.value) {
      return this.users.find((user) => user.name === control.value)
        ? { isNameDuplicated: true }
        : null;
    }
    return null;
  };
}
