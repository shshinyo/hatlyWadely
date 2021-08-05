import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})
export class AddressComponent implements OnInit {
  addAddress: boolean = false;
  editAddress: boolean = false;
  form: FormGroup;
  // address here
  address = [];
  constructor(private _fb: FormBuilder) {
    this._form();
  }

  ngOnInit(): void {}

  // If there is Id then Edit else add new address
  onAddEditAddressForm(id?: any): void {
    this.editAddress = id ? true : false;
    this.addAddress = true;
    this.form.reset();
    if (id) {
      this.form.patchValue({
        firstName: "mohamed",
        lastName: "eldeeb",
        phoneNumber: "01098799837",
        anotherPhoneNumber: "",
        address: "النجيلة كوم حمادة البحيرة",
        addressDetails: "",
        area: "saab",
        city: "mercedes",
        makeDefault: true,
      });
    }
    // Add new
  }
  backButton(): void {
    this.addAddress = false;
    this.editAddress = false;
  }
  saveChanges(form: FormGroup): void {
    console.log(form.value);
    this.addAddress = false;
    this.editAddress = false;
  }

  get requiredError(): string {
    return "هذا الحقل مطلوب !";
  }
  private _form(): void {
    const patternNumberOnly = /^01[0125][0-9]{8}$/;

    this.form = this._fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phoneNumber: ["", [Validators.pattern(patternNumberOnly)]],
      anotherPhoneNumber: ["", [Validators.pattern(patternNumberOnly)]],
      address: ["", Validators.required],
      addressDetails: [""],
      area: ["", Validators.required],
      city: ["", Validators.required],
      makeDefault: [false],
    });
  }
}
