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
  type: number, //{number:0, string:1, boolean:2, date:3, datetime:4, }
  minWidth:number
}
// export interface INcrView{
//   id: number;
//   name: string;

//}
export interface  IEntity {
  id: number,
  name: string,
  query: string,
  facade: facade,
  title: string,
  template: string,
  fields: IField[],
  // ncr:INcrView[] 
}

// boolean:0 ,
// integer: 1,
// float: 2,
// double: 3,
// date: 4,
// dateTime: 5,
// phone: 6,
// smallText:7,
// longText: 8,
// richText: 9,
// email: 10,
// website: 11,
// textNumber: 12,
// array: 13

export interface IFieldUI {
  field: string;
  checked: boolean;
  type: number;
}