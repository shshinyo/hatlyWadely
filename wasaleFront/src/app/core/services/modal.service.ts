import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog.component";
import { Category } from "src/app/shared/utilities/interfaces.interface";
import { DashModalComponent } from "src/app/global/modules/shop/dash-board/dash-modal.component";
import { FormGroup } from "@angular/forms";

export type SnackBarVariant = "normal" | "success" | "error";

function _panelClass(variant: SnackBarVariant): string[] | undefined {
  return variant === "success"
    ? ["snack-success"]
    : variant === "error"
    ? ["snack-error"]
    : undefined;
}

@Injectable({ providedIn: "root" })
export class ModalService {
  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _dialog: MatDialog
  ) {}

  snackbar(message: string, variant?: SnackBarVariant, duration = 10000): void {
    this._snackBar.open(message, "إغلاق", {
      direction: "rtl",
      duration,
      panelClass: _panelClass(variant),
    });
  }

  confirmDialog(message: string, title = "هل أنت متأكد !!"): Observable<boolean> {
    const ref = this._dialog.open(ConfirmDialogComponent, {
      data: { title: title, message },
      width: "500px",
      direction: "rtl",
      closeOnNavigation: true,
    });

    return ref.afterClosed();
  }

  
}
