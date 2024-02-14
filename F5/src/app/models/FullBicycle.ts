// Purpose: This file contains the FullBicycle class which is used to create a full bicycle object.
export class FullBicycle{
  id:number;
  name:string;
  value:number;
  brand:string;
  type:string;
  constructor(id: number, name: string, value: number, brand: string, type: string) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.brand = brand;
    this.type = type;
  }

}
