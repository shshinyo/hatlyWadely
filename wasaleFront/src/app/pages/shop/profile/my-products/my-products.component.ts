import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
export class MyProductsComponent implements OnInit {
  addProduct: boolean = false;
  editProduct: boolean = false;
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
    this.clientProduct = [{}, {}, {}];
  }

  // If there is Id then Edit else add new address
  onAddEditProductForm(id?: any): void {
    this.editProduct = id ? true : false;
    this.addProduct = true;
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
    this.form.reset();
  }
  backButton(): void {
    this.addProduct = false;
    this.editProduct = false;
    this.form.reset();
  }
  saveChanges(form: FormGroup): void {
    console.log(form.value);
    console.log(this.filePicker);
    this.addProduct = false;
    this.editProduct = false;
    this._modal.snackbar("تم اضافة منتج جديد", "success");
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
