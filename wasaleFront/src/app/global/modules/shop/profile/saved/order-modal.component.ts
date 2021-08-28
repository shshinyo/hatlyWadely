import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-modal',
  template: `
  <div class="title-1" fxLayout="row" fxLayoutAlign="center" >
  مرحبا بك في خدمة هاتلي و ديلي
  </div>
  <form
  [formGroup]="form"
  (ngSubmit)="onSaveOrder(form.value)"
  novalidate
  class="details-form"
  fxLayout="column"
  fxLayoutAlign="center stretch"
  fxLayout.xs="column"
  fxLayoutAlign.xs="start center"
  fxLayoutGap="4%"
  dir="rtl"
>

<mat-form-field fxFlex="35" >
<mat-label>اسم العميل</mat-label>
<input formControlName="name" type="text" matInput />
<mat-error>{{ requiredError }}</mat-error>
</mat-form-field>

<mat-form-field fxFlex="35">
<mat-label>العنوان</mat-label>
<input formControlName="address" type="text" matInput />
<mat-error>{{ requiredError }}</mat-error>
</mat-form-field>

  <mat-form-field fxFlex="35" fxLayoutAlign.xs="start center">
    <mat-label>رقم الهاتف</mat-label>
    <input formControlName="phone" type="number" matInput />
    <mat-error>{{ requiredError }}</mat-error>
  </mat-form-field>

 
  <mat-form-field fxFlex="35">
  <mat-label>ادخل تفاصل الاوردر</mat-label>
  <textarea matInput formControlName="orderDetails"></textarea>
  </mat-form-field>

  <div fxLayout="row" fxLayoutAlign="center" fxLayoutGap="2%">
  <button mat-button color="primary" (click)="onCancelOrder()" fxFlex="25" style="border:1px solid" >
  <mat-icon aria-hidden="false" aria-label="Example home icon">cancel</mat-icon>
  الغاء</button>

  <button mat-button color="primary"  fxFlex="25"  style="border:1px solid">
  <mat-icon aria-hidden="false" aria-label="Example home icon">save</mat-icon>
  موافق</button>

  </div>


  </form>
  `,
  styles : [
    `textarea {
      margin-top: -2px;
    margin-bottom: -2px;
    height: 40px;
    };
  
    `
  ]
})
export class OrderModalComponent implements OnInit {
form : FormGroup
get requiredError(): string {
  return "هذا الحقل مطلوب !";
}

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: any , private fb : FormBuilder  , private _matDialogRef : MatDialogRef<any>) {
    this.form = this.fb.group({
      name: [" " , Validators.required] , 
      address : [" " , Validators.required] , 
      phone :  [" " , Validators.required] ,
      orderDetails : [""]
    })
   }

  ngOnInit(): void {
  }

  onCancelOrder() {
    this._matDialogRef.close()
  }
 
  onSaveOrder(form) {
    console.log(form)
    this._matDialogRef.close()

  }

}
