import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter } from "rxjs/Operators";
import { ModalService } from "src/app/core/services/modal.service";

import { Image } from "src/app/shared/utilities/interfaces.interface";

import { Product } from "src/app/shared/utilities/interfaces.interface";
import { CategoryService } from "src/app/core/services/category.service";
import { ProductService } from "src/app/core/services/product.service";

@Component({
  selector: "app-my-products",
  templateUrl: "./my-products.component.html",
  styleUrls: ["./my-products.component.scss"],
})
export class MyProductsComponent implements OnInit, AfterViewInit {
  addProduct: boolean = false;
  editProduct: boolean = false;
  displayProduct: boolean = true;
  form: FormGroup;
  // address here
  clientProduct: Product[] = [];
  productToEdit: Product;
  saleCount(price: number, selling: number): number {
    const sale = ((price - selling) / price) * 100 + 0.5;
    // return Math.round(sale);
    return sale > 0 ? Math.round(sale) : 0;
  }
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
  ];
  constructor(
    private _fb: FormBuilder,
    private _modal: ModalService,
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) {
    this._form();
  }

  ngOnInit(): void {
    this._productService.getCategoryProducts("milk").subscribe({
      next: (cat) => {
        this.clientProduct = cat.data;
      },
    });
  }
  ngAfterViewInit(): void {}

  // If there is Id then Edit else add new address
  onAddEditProductForm(product?: Product): void {
    this.editProduct = product ? true : false;
    this.addProduct = true;
    this.form.reset();
    if (product) {
      this.productToEdit = product;
      // photos: product.imgUploaded,
      // get product image array and assign it to filePicker
      this.form.patchValue({
        name: product.name,
        desc: product.desc,
        category: "milk",
        sellingNum: product.sellingNum,
        productAmount: product.productAmount,
        price: product.price,
        ProductCreator: "ProductCreator id",
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
  saveChanges(form: FormGroup, state: "add" | "edit"): void {
    const imgUploaded = this.filePicker
      .filter((file) => file.file !== null || undefined)
      .map((file) => file.name);

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

    if (state == "add") {
      this._productService.addProduct(command).subscribe({
        next: () => {
          this.clientProduct.unshift(command);
          this._modal.snackbar("تم اضافة منتج جديد", "success");

          this.addProduct = false;
          this.editProduct = false;
        },
        error: (err) => this._modal.snackbar("حدث خطأ اثناء تنفيذ طلبك .", "normal"),
      });
    }
    if (state == "edit" && !!this.productToEdit) {
      this._productService.editProduct(this.productToEdit._id, command).subscribe({
        next: () => {
          const index = this.clientProduct.findIndex(
            (i) => i._id === this.productToEdit._id
          );
          this.clientProduct[index] = command;
          this._modal.snackbar("تم تعديل المنتج بنجاح", "success");

          this.addProduct = false;
          this.editProduct = false;
          this.productToEdit = null;
        },
        error: (err) => this._modal.snackbar("حدث خطأ اثناء تنفيذ طلبك .", "normal"),
      });
    }
  }

  onRemoveProduct(product: Product): void {
    if (!product) {
      return;
    }
    this._modal
      .confirmDialog(`هل أنت متأكد من حذف المنتج (${product.name}) ؟!`)
      .pipe(filter((confirm) => !!confirm))
      .subscribe((_) => {
        this._productService.deleteProduct(product._id).subscribe({
          next: () => {
            this._modal.snackbar(`تم حذف النتج (${product.name}) بنجاح`, "success");
          },
          error: (err) => this._modal.snackbar("حدث خطأ اثناء تنفيذ العمليه .", "normal"),
        });

        const index = this.clientProduct.findIndex((i) => i._id === product._id);
        this.clientProduct.splice(index, 1);

        this.addProduct = false;
        this.editProduct = false;
      });
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

    if (file && file.size >= 500000) {
      this._modal.snackbar("حجم الصورة المسموح به يجب الا يزيد عن ( 500KB )", "error");
      return;
    }
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
