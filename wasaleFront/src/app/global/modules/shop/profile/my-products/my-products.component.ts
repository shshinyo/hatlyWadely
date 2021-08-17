import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/Operators";
import { ModalService } from "src/app/core/services/modal.service";

import { ProductService } from "src/app/core/services/product.service";
import { Product } from "src/app/shared/utilities/interfaces.interface";

export interface Image {
  id: number;
  file: File;
  type: string;
  name: string;
  imageShow: any;
}
@Component({
  selector: "app-my-products",
  templateUrl: "./my-products.component.html",
  styleUrls: ["./my-products.component.scss"],
})
export class MyProductsComponent implements OnInit, AfterViewInit {
  addProduct: boolean = true;
  editProduct: boolean = false;
  StateSubject = new BehaviorSubject(false);
  StateSubject$ = this.StateSubject.asObservable();
  form: FormGroup;
  // address here
  clientProduct = [];
  // Photo picker
  filePicker: Array<Image> = [
    {
      id: 1,
      file: null,
      type: null,
      name: null,
      imageShow: null,
    },
    {
      id: 2,
      file: null,
      type: null,
      name: null,
      imageShow: null,
    },
    {
      id: 3,
      file: null,
      type: null,
      name: null,
      imageShow: null,
    },
    {
      id: 4,
      file: null,
      type: null,
      name: null,
      imageShow: null,
    },
    {
      id: 5,
      file: null,
      type: null,
      name: null,
      imageShow: null,
    },
  ];
  constructor(
    private _fb: FormBuilder,
    private _modal: ModalService,
    private _productService: ProductService
  ) {
    this._form();
  }

  ngOnInit(): void {
    this.clientProduct = [{}, {}, {}, {}, {}];
  }
  ngAfterViewInit(): void {}

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
    this._modal
      .confirmDialog("هل أنت متأكد من عدم الاكمال ؟!")
      .pipe(filter((confirm) => !!confirm))
      .subscribe((_) => {
        this.addProduct = false;
        this.editProduct = false;
        this.form.reset();
      });
  }
  saveChanges(form: FormGroup, state: "edit" | "add"): void {
    const imgUploaded = this.filePicker
      .filter((file) => file.file !== null || undefined)
      .map((file) => ({
        type: file.name,
      }));

    // merging data
    const data = { imgUploaded, ...form.value };

    const command: Product = {
      name: data.name,
      desc: data.desc,
      category: "milk",
      sellingNum: data.sellingNum,
      photos: data.imgUploaded,
      productAmount: data.productAmount,
      price: data.price,
      ProductCreator: "ProductCreator id",
    };
    console.log(command);
    if (state == "add") {
      this._productService.addProduct(command).subscribe({
        next: () => {
          this._modal.snackbar("تم اضافة منتج جديد", "success");
          this.addProduct = false;
          this.editProduct = false;
        },
        error: (err) => this._modal.snackbar("حدث خطأ اثناء تنفيذ طلبك .", "normal"),
      });
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
    fileUp.name = file.name;
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
      name: null,
      imageShow: null,
    };
  }

  get requiredError(): string {
    return "هذا الحقل مطلوب !";
  }

  private _form(): void {
    this.form = this._fb.group({
      name: ["", Validators.required],
      desc: ["", Validators.required],
      category: ["category", Validators.required],
      sellingNum: [""],
      productAmount: ["", Validators.required],
      price: ["", Validators.required],
    });
  }
}
