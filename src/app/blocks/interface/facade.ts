import { Type } from "@angular/core";

export interface facadeBase {
    id: string;
    title: string;
    showTitle: boolean;
}
export interface cell extends facadeBase {
    label: string;
    value: string;
    address:string;
    icon:string;
}
export interface block extends facadeBase {
    cells: cell[];
    resolution:string;
    width:number;
}

export interface TCell extends facadeBase {
    label: string;
    value: string;
    // address:string;
    icon:string;
}
export interface TBlock extends facadeBase {
    cells: cell[];
    // resolution:string;
    width:number;
}

export interface group extends facadeBase {
    icon: string;
    blocks: block[];
}
export interface facade extends facadeBase {
    groups: group[];
}

export class FacadeItem {
    constructor(public component: Type<any>, public facade:facade, public data: any,public related: any,public viewDelete:string) { }
}

export interface IFacadeComponent{
    facade: facade,
    data: any,
    related: any;
    viewDelete:string
}