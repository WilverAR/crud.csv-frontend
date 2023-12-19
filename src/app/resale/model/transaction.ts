export class Transaction {
  id: number;
  month: string;
  town: string;
  flatType: string;
  block: string;
  streetName: string;
  storeyRange: string;
  floorAreaSqm: number;
  flatModel: string;
  leaseCommenceDate: string;
  resalePrice: number;
  constructor() {
    this.id = 0;
    this.month = '';
    this.town = '';
    this.flatType = '';
    this.block = '';
    this.streetName = '';
    this.storeyRange = '';
    this.floorAreaSqm = 0;
    this.flatModel = '';
    this.leaseCommenceDate = '';
    this.resalePrice = 0;
  }
}
