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

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      firstName: {
        required: "هذا الحقل مطلوب",
        minLength : `يجب الا يقل الاسم عن ${Const.Name.MinLength} احرف` ,
        maxLength : `يجب الا يزيد الاسم عن ${Const.Name.MaxLength} احرف`
      },
      lastName: {
        required: "هذا الحقل مطلوب",
        minLength : `احرف ${Const.Name.MinLength} يجب الا يقل الاسم عن` ,
        maxLength : `احرف ${Const.Name.MaxLength} يجب الا يزيد الاسم عن`
      },
      phone: {
        required: "من فضلك ادخل رقم الهاتف المحمول",
        pattern: "لابد من البد بالارقام الاتية 010 ،012 ،015 ،011 ويكون مكون من 11 رقم",
      },
      location: {
        required: " ادخل العنوان الخاص بك",
      },
      _email: {
        match: "البريد الالكتروني غير متطابق",
      },

      email: {
        required: "ادخل البريد الالكتروني",
        email: "ادخل بريد صالح(لابد من ان يحتوي عليexample.com@)",
      },
      passwordGroup: {
        match: "كلمة السر غير متطابقة !",
      },
      password: {
        required: "ادخل كلمة السر",
        MinLength: `ارقام او حروف ${Const.Password.MinLength} يجب الا تقل كلمه السر عن`
      },
      confirmPassword: {
        required: "اعادة كتابة كلمة السر ",
        MinLength: `ارقام او حروف ${Const.Password.MinLength} يجب الا تقل كلمه السر عن`
      },
      type: {
        required: "يجب اختيار نوع من المعروض امامك",
      },
    };
  }
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur")
    );

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.form.valueChanges, ...controlBlurs)
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.displayErrorMessage = this.genericValidator.processMessages(this.form);
      });
  }

  registration(registerForm) {
    console.log(registerForm);
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
