import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CategoryService } from "src/app/core/api/category.service";
import { ModalService } from "src/app/core/services/modal.service";

@Component({
  selector: "app-dash-modal",
  template: `
    <div>
      <hr />
      <form
        [formGroup]="form"
        novalidate
        class="details-form"
        fxLayout="row wrap"
        fxLayoutAlign="center center"
        fxLayout.xs="column"
        fxLayoutAlign.xs="start center"
        fxLayoutGap="4%"
        dir="rtl"
      >
        <mat-form-field fxFlex.gt-xs="30" class="m-r-5">
          <mat-label>اسم العميل</mat-label>
          <input formControlName="name" type="text" matInput />
          <mat-error>{{ requiredError }}</mat-error>
        </mat-form-field>

        <mat-form-field fxFlex.gt-xs="30">
          <mat-label>السعر</mat-label>
          <input formControlName="v" type="number" matInput />
          <mat-error>{{ requiredError }}</mat-error>
        </mat-form-field>

        <button
          type="submit"
          [disabled]="form.invalid"
          mat-button
          color="primary"
          class="editBtn"
          [mat-dialog-close]="true"
          (click)="onEditOrder()"
        >
          تعديل
        </button>
      </form>
      <hr class="hr" />
    </div>
  `,
  styles: [
    `
    .editBtn {
      border : 1px solid #ddd
    }`
  ],
})
export class DashModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: any ,
    private _fb: FormBuilder,
    private _modal: ModalService,
    private _categoryService: CategoryService,
    private dialogRef: MatDialogRef<DashModalComponent>
  ) {

    this.form = this._fb.group({
      name: ["", Validators.required],
      v: [""],
    });

    this.form.patchValue({
      name : this.data.name
    })
  }

  ngOnInit(): void {

  }

  get requiredError(): string {
    return "هذا الحقل مطلوب !";
  }

  onEditOrder() {
    // that means make overwrite second on first
    let newForm = {...this.data, ...this.form.value}
    this.dialogRef.close(newForm)
    this._modal.snackbar(`تم تعديل الاسم الي ${this.form.value.name} `, "success");
  }
}
