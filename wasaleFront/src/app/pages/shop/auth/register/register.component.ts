import { Component, ElementRef, OnInit, ViewChildren } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { fromEvent, Observable, merge } from "rxjs";
import { debounceTime } from "rxjs/Operators";
import { AuthService } from "src/app/shared/services/auth.service";
import { Const } from "src/app/shared/utilities/const";
import { MatchValidator } from "src/app/shared/utilities/customValidators";
import { GenericValidator } from "src/app/shared/utilities/genericValidator";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  hidePass = true;
  errorMessage$ = this._authService.errorMessage$;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  form: FormGroup;

  // Use with the generic validation message class
  displayErrorMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    this._registration();
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      name: {
        required: "من فضلك ادخل الاسم",
      },
      phone: {
        required: "من فضلك ادخل رقم الهاتف المحمول",
        pattern: "لابد من البد بالارقام الاتية 010 ،012 ،015 ،011 ويكون مكون من 11 رقم",
      },
      location: {
        required: "ادخل محل السكن",
      },
      _email: {
        isMatch: "البريد الالكتروني غير متطابق",
      },

      email: {
        required: "البريد الالكتروني مطلوب",
        email: "ادخل بريد صالح(لابد من ان يحتوي عليexample.com@)",
      },
      passwordGroup: {
        match: "كلمة السر غير متطابقة !",
      },
      password: {
        required: "ادخل كلمة السر",
        manlength: "يجب ان لا تقل كلمة السر عن 8 حروف او ارقام.",
      },
      confirmPassword: {
        required: "اعادة تعين كلمة السر مطلوب",
      },
      type: {
        required: "يجب اختيار نوع من المعروض امامك",
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur")
    );

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.form.valueChanges, ...controlBlurs)
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.displayErrorMessage = this.genericValidator.processMessages(this.form);
      });
  }

  login(authForm): void {
    if (authForm && authForm.valid) {
      this._authService.login(authForm.value.email, authForm.value.password);

      if (this._authService.redirectUrl) {
        this._router.navigateByUrl(this._authService.redirectUrl);
      }
      // else {
      //   this.router.navigateByUrl("/welcome");
      // }
    }
  }

  registration(registerForm) {
    console.log(registerForm);
    // post form here
  }

  passwordMatcher = (control: AbstractControl) => {
    const pass = control.get("password");
    const confirmPass = control.get("confirmPassword");
    if (pass.pristine || confirmPass.pristine) {
      return null;
    }
    if (confirmPass.value === "") {
      return null;
    }
    if (pass.value === confirmPass.value) {
      return null;
    }
    return confirmPass.setErrors({ match: true }), { match: true };
  };

  private _registration(): void {
    this.form = this._fb.group({
      name: this._fb.group({
        firstName: [
          "",
          [
            Validators.required,
            Validators.minLength(Const.Name.MinLength),
            Validators.maxLength(Const.Name.MaxLength),
          ],
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.minLength(Const.Name.MinLength),
            Validators.maxLength(Const.Name.MaxLength),
          ],
        ],
      }),

      phoneNumber: [
        "",
        [Validators.required, Validators.pattern(Const.PhoneNumber.Pattern)],
      ],
      location: ["", Validators.required],
      _email: this._fb.group(
        {
          email: ["", [Validators.required, Validators.email]],
          confirmEmail: ["", [Validators.required, Validators.email]],
        },
        { validators: MatchValidator("email", "confirmEmail") }
      ),

      passwordGroup: this._fb.group(
        {
          password: [
            "",
            [Validators.required, Validators.minLength(Const.Password.MinLength)],
          ],
          confirmPassword: [
            "",
            [Validators.required, Validators.minLength(Const.Password.MinLength)],
          ],
        },
        { validators: MatchValidator("password", "confirmPassword") }
      ),
      role: ["", [Validators.required]],
    });
  }
}
