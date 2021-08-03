import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
export interface Type {
  type: string;
  value: number;
}
@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  types: Array<Type> = [
    {
      type: "ذكر",
      value: 0,
    },
    {
      type: "انثي",
      value: 1,
    },
  ];
  form: FormGroup;
  constructor(private _fb: FormBuilder) {
    this._form();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    this.form.patchValue({
      firstName: "Mohamed",
      lastName: "Eldeeb",
      email: "moahmed.eldeib5@gmail.com",
      phoneNumber: "01098799837",
      type: "mail",
    });
  }

  saveChanges(form: FormGroup): void {
    console.log(form.value);
  }

  get requiredError(): string {
    return "هذا الحقل مطلوب !";
  }
  private _form(): void {
    const patternNumberOnly = /^01[0125][0-9]{8}$/;

    this.form = this._fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: [{ value: "", disabled: true }],
      phoneNumber: ["", [Validators.required, Validators.pattern(patternNumberOnly)]],
      type: [""],
      date: [""],
    });
  }
}
