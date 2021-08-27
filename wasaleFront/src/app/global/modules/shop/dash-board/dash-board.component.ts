import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { filter } from "rxjs/Operators";
import { CategoryService } from "src/app/core/api/category.service";

import { ModalService } from "src/app/core/services/modal.service";

import { Category } from "src/app/shared/utilities/interfaces.interface";
import { DashModalComponent } from "./dash-modal.component";

@Component({
  selector: "app-dash-board", 
  templateUrl: "./dash-board.component.html",
  styleUrls: ["./dash-board.component.scss"],
})
export class DashBoardComponent implements OnInit {
  form: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _modal: ModalService,
    private _dialog: MatDialog
  ) {
    this.form = this._fb.group({
      name: ["", Validators.required],
      v: ["", Validators.required],
    });
  }

  allCategories: Category[] = [];
  edit;
  ngOnInit(): void {
    this._categoryService.getAllCategories$.subscribe(
      (cats) => (this.allCategories = cats)
    );
  }

  get requiredError(): string {
    return "هذا الحقل مطلوب !";
  }

  onSaveOrder(form: FormGroup) {
    if (!form.value) {
      return;
    }

    let command: Category = {
      name: form.value.name,
      __v: form.value["v"],
    };


    this._categoryService.addCategory(command).subscribe({
      next: () => {
        this.allCategories.push(command);
        this._modal.snackbar("تم اضافة category جديد", "success");
      },
    });
  }

  onRemoveClient(category: Category) {
    this._categoryService.deleteCategory(category._id).subscribe({
      next: () => {
        this._modal.snackbar(`تم حذف المنتج (${category.name}) بنجاح`, "success");
        let index = this.allCategories.findIndex((elem) => elem._id === category._id);
        this.allCategories.splice(index, 1);
      },
      error: () =>
        this._modal.snackbar(`تم حذف المنتج (${category.name}) بنجاح`, "error"),
    });
  }

  onEdit(category) {
    this._dialog
      .open(DashModalComponent, {
        width: "500px",
        direction: "rtl",
        data: category,
      })
      .afterClosed()
      .pipe(filter((data) => !!data))
      .subscribe((newCategory: Category) => {
        this._categoryService.eidtCategory(newCategory._id, newCategory).subscribe({
          next: () => {
            let index = this.allCategories.findIndex((elem) => elem._id == newCategory._id);
            this.allCategories[index] = newCategory;
          },
        });
      });
  }
}
