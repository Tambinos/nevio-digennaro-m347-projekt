import {Injectable} from '@angular/core';
import {Type} from '../models/Type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  data: Type[] = [
    new Type(1, "Trio"),
    new Type(2, "Solo"),
    new Type(3, "Duo")
  ]

  getAllTypes(): Type[] {
    return this.data;
  }

  getTypes(ids: number[]): Type[] {
    if (this.data.filter(type => ids.includes(type.id)).length === 0) {
      throw new Error("Types not found")
    }
    return this.data.filter(type => ids.includes(type.id));
  }

  getTypesName(ids: number[]): string[] {
    if (this.getTypes(ids).length === 0) {
      throw new Error("Types not found")
    }
    let typesName: string[] = new Array(ids.length);
    for (let i = 0; i < this.getTypes(ids).length; i++) {
      typesName[i] = this.getTypes(ids)[i].type
    }
    return typesName;
  }
}
