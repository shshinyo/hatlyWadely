import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Const } from "src/app/shared/utilities/const";
import { MatchValidator } from "src/app/shared/utilities/customValidators";

@Component({
  selector: "app-reset-pass",
  templateUrl: "./reset-pass.component.html",
  styleUrls: ["./reset-pass.component.scss"],
})
export class ResetPassComponent implements OnInit {
  form: FormGroup;
  hideNewPass = true;
  hideConfirmPass = true;
  hideCurrentPass = true;
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group(
      {
        newPass: [
          null,
          [
            Validators.required,
            Validators.maxLength(Const.Password.MaxLength),
            Validators.minLength(Const.Password.MinLength),
          ],
        ],
        confirmPass: [null, [Validators.required]],
        currentPass: [
          null,
          [Validators.required, Validators.minLength(Const.Password.MinLength)],
        ],
      },
      {
        validators: MatchValidator("newPass", "confirmPass"),
      }
    );
  }

  ngOnInit(): void {}

  saveChanges(form: FormGroup): void {
    console.log(form.value);
  }

  passErrMessage(pass: AbstractControl): string {

    return pass.hasError("required")
      ? "هذا الحقل مطلوب"
      : pass.hasError("minlength")
      ? `كلمة المرور يجب ان تكون اكثر من ${Const.Password.MinLength} حرف او رقم..`
      : pass.hasError("maxlength")
      ? `كلمة المرور يجب الا تزيد عن ${Const.Password.MaxLength} حرف او رقم..`
      : pass.hasError("isMatch")
      ? "كلمة المرور الجديدة وتأكيدها غير متطابقتان !"
      : "من فضلك تاكد من ادخال قيمة صحيحة.";
  }
}
