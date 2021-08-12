import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "itemName",
})
export class ItemName implements PipeTransform {
  transform(input: string, size: number): string {
    let substring = input.substr(0, size);
    return substring + "...";
  }
}
