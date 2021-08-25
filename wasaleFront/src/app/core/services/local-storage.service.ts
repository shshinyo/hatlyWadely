import { Injectable } from "@angular/core";
import { isEmptyObject } from "src/app/shared/utilities/utils";

@Injectable()
export class LocalStorageService {
  private _storage = localStorage;

  /** Returns the object that matches the @key or null if not exist or empty */
  get(key: string): unknown | null {
    const val = this._storage.getItem(key);

    if (!val) {
      return null;
    }

    try {
      const obj = JSON.parse(val) || {};
      return isEmptyObject(obj) ? null : obj;
    } catch (error) {
      this.remove(key);
      return null;
    }
  }

  set(key: string, value: any): boolean {
    this._storage.setItem(key, JSON.stringify(value));
    return true;
  }

  remove(key: string): void {
    this._storage.removeItem(key);
  }

  clear(): void {
    this._storage.clear();
  }
}
