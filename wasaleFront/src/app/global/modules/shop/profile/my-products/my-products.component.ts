import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, filter, tap } from "rxjs/Operators";
import { ModalService } from "src/app/shared/services/modal.service";

export interface Image {
  id: number;
  file: File;
  type: string;
  imageShow: any;
}
@Component({
  selector: "app-my-products",
  templateUrl: "./my-products.component.html",
  styleUrls: ["./my-products.component.scss"],
})
export class MyProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  addProduct: boolean = false;
  editProduct: boolean = false;
  StateSubject = new BehaviorSubject(false);
  StateSubject$ = this.StateSubject.asObservable();
  formState: boolean;
  form: FormGroup;
  // address here
  clientProduct = [];
  // Photo picker
  filePicker: Array<Image> = [
    {
      id: 1,
      file: null,
      type: null,
      imageShow: null,
    },
    {
      id: 2,
      file: null,
      type: null,
      imageShow: null,
    },
    {
      id: 3,
      file: null,
      type: null,
      imageShow: null,
    },
    {
      id: 4,
      file: null,
      type: null,
      imageShow: null,
    },
    {
      id: 5,
      file: null,
      type: null,
      imageShow: null,
    },
  ];
  constructor(
    private _fb: FormBuilder,
    private _cd: ChangeDetectorRef,
    private _modal: ModalService
  ) {
    this._form();
  }

  ngOnInit(): void {
    this.StateSubject$.subscribe((x) => (this.formState = x));
    this.clientProduct = [{}, {}, {}, {}, {}];
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    if (this.formState == false) {
    }
  }
  // If there is Id then Edit else add new address
  onAddEditProductForm(id?: any): void {
    this.editProduct = id ? true : false;
    this.addProduct = true;
    this.form.reset();
    this.StateSubject.next(true);
    if (id) {
      // get product image array and assign it to filePicker
      this.form.patchValue({
        categoryType: "category",
        name: "تليفون محمول",
        details:
          "شويه هبد حلوين شويه هبد حلوين شويه هبد حلوين شويه هبد حلوين شويه هبد حلوين شويه هبد حلوين ",
        price: 2500,
        afterDiscount: 200,
        color: "اسود",
        searchWord: "موبايل",
      });
    }
    // Add new
  }
  backButton(): void {
    if (this.formState) {
      this._modal
        .confirmDialog("هل أنت متأكد من عدم الاكمال ؟!")
        .pipe(filter((confirm) => !!confirm))
        .subscribe((_) => {
          this.addProduct = false;
          this.editProduct = false;
          this.form.reset();
        });
    }
  }
  saveChanges(form: FormGroup, state: string): void {
    const imgUploaded = this.filePicker.filter((file) => file.file !== null || undefined);
    const data = { ...imgUploaded, ...form.value };

    const command = {
      images: data[0],
      name: data.name,
      categoryType: data.categoryType,
      details: data.details,
      price: data.price,
      afterDiscount: 200,
      color: data.color,
      searchWord: data.searchWord,
    };
    console.log(command);

    this.addProduct = false;
    this.editProduct = false;
    this.StateSubject.next(false);
    if (state == "new") {
      // call post API
      this._modal.snackbar("تم اضافة منتج جديد", "success");
    }
    if (state == "edit") {
      // call path API
      this._modal.snackbar("تم تعديل المنتج بنجاح", "success");
    }
  }

  // file selector
  onSelectFile(event, files: FileList | null, id: number): void {
    const file = files[0];

    // image reader
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    // file 'll send to API
    const fileUp = this.filePicker.find((x) => x.id === id);

    // file type
    fileUp.type = file.type;

    if (!file || !file.type.match(/image\/*/)) {
      this._modal.snackbar("من فضلك ادخل صورة فقط", "error");
      return;
    }
    reader.onload = (event) => {
      fileUp.imageShow = reader.result;
    };

    fileUp.file = file;
  }

  onRemoveImg(id?): void {
    if (!id) {
      return;
    }

    const imgIndex = this.filePicker.findIndex((x) => x.id === id);
    this.filePicker[imgIndex] = {
      id: id,
      file: null,
      type: null,
      imageShow: null,
    };
  }

  get requiredError(): string {
    return "هذا الحقل مطلوب !";
  }

  private _form(): void {
    this.form = this._fb.group({
      name: [null, Validators.required],
      categoryType: ["category", Validators.required],
      details: [null, Validators.required],
      price: [null, Validators.required],
      afterDiscount: [null],
      color: [null],
      searchWord: [null],
    });
  }
}
