import { Province } from "./province";

export class Country {

  constructor(id: string, name: string, provinces: Province[]) {
    this.id = id;
    this.name = name;
    this.provinces = provinces;
  }

  id!: string;
  name!: string;
  provinces!: Province[];
}
