import { EventEmitter } from "@angular/core";
import { facade } from "./facade";

export interface InputUnit {
  operators: string[],
  values: string[],
  selectedOperator: string,
  selectedValue: string
}
export interface InputWrap {
  datum: InputUnit,
  isSet: boolean
}
export interface InputPair {
  first: InputWrap,
  second: InputWrap,
  logicalOperator:number,
  id:string
}
// clear: any;
export interface selectionList<T> {
  name: string;
  type: number;
  values: T[];
  selected: T;
  clear: EventEmitter<any>
}
export interface selectedFilters<T> {
  name: string;
  selectedValue: T;
}
export interface sortChange {
  field: string;
  direction: boolean;
}
export interface IField {
  name: string,
  type: number,//{number:0, string:1, boolean:2, date:3, datetime:4, }
  minWidth:number
}
// export interface INcrView{
//   id: number;
//   name: string;

//}
export interface IEntity {
  id: number,
  name: string,
  query: string,
  facade: facade,
  title: string,
  template: string,
  fields: IField[],
  // ncr:INcrView[] 
}
export class PageControl extends EventEmitter<any> {
  private _gridSize: number = 25;
  get gridSize(): number {
    return this._gridSize;
  }
  set gridSize(value: number) {
    this._gridSize = value;
    this.recallibrate();
  }

  private _pageNumber: number = 1;
  get pageNumber(): number {
    return this._pageNumber;
  }
  set pageNumber(value: number) {
    this._pageNumber = value;
    this.recallibrate();
  }

  private _pageRowStart: number = 0;
  get pageRowStart(): number {
    return this._pageRowStart;
  }

  private _pageRowEnd: number = 25;
  get pageRowEnd(): number {
    return this._pageRowEnd;
  }
  constructor() {
    super();
    this._gridSize = 25;
    this._pageNumber = 1;
    this._pageRowStart = 0;
    this._pageRowEnd = 25;
  }
  recallibrate() {
    this._pageRowStart = (this.pageNumber -1) * this.gridSize;
    this._pageRowEnd = this.pageRowStart + +this.gridSize;
    this.emit({'change:pageRowStart': this.pageRowStart});
    this.emit({'change:pageRowEnd': this.pageRowEnd});
  }
}
