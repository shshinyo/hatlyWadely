import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface IDialogContent {
  /** Dialog title. */
  readonly title: string;
  /** Dialog message - can contain markup. */
  readonly message: string;
}

@Component({
  template: `
    <h1 mat-dialog-title class="text-end text-gray-800">
      <mat-icon style="font-size:20px;">arrow_back_ios_new</mat-icon>
      {{ data.title }}
    </h1>

    <div
      mat-dialog-content
      class="m-y-8 h-t-18"
      style="min-height: 40px;"
      [innerHTML]="data.message"
    ></div>

    <div mat-dialog-actions>
      <button mat-flat-button color="warn" [mat-dialog-close]="true" aria-label="Ok">
        موافق
      </button>
      <button mat-button [mat-dialog-close]="false" aria-label="Cancel">الغاء</button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: IDialogContent) {}
}
