import { EventEmitter, Type } from "@angular/core";

export namespace Data {

  export interface Base {
    id: number;
    _path?: number;
  }
}




export namespace Views {
  export interface Datasource {
    id: number;
  }
  export interface FormState {
    error: boolean;
    data: any;
  }
  export interface alerAction {
    onCancel(): void;
    onYes(): void;
    onComplete: EventEmitter<boolean>;
    data?: EventEmitter<any>;
  }
  export interface FormActions {
    onSave(): void;
    onCancel(): void;
    onComplete: EventEmitter<boolean>;
    data?: EventEmitter<any>;
  }
  export interface FormModal {
    actions: FormActions;
    setModalActions(onClose: EventEmitter<any>): void;
  }
  export interface ModalHost {
    properties: { [key: string]: any };
    component: Type<Views.FormModal>;
    open(): Promise<any>;
    close(data: any): void;
    dismiss(): void;
  }
}

