import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "itemName",
})
export class ItemName implements PipeTransform {
  transform(input: string): string {
    const words = input.split(" ");
    // just change size value to change your word
    const size = 4;
    const pipedWord = words.splice(0, size).join(" ");

    return pipedWord + "...";
  }
}
