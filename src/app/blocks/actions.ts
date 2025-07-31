import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
// import Swal from "sweetalert2";
// import { Views } from "../models/ro-interface";
import { AbstractBuilder } from "./strategies";
import { Transformer } from "./transformer";
import { Views } from "../app/service/models-interface/interface";

export class PresenterAction<M, V> implements Views.FormActions {
  onComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
  data: EventEmitter<any> = new EventEmitter<any>();
  protected state: Views.FormState = null;
  fn: () => V = null;
  static fromLazyPull<M, V>(
    resource: string,
    primaryView: () => V,
    saveAction: { (data: M): Observable<M> },
    builder: new () => AbstractBuilder<M, V>,
    router: Router
  ) {
    const p = new PresenterAction(resource, null, saveAction, builder, router);
    p.fn = primaryView;
    return p;
  }
  constructor(
    private resource: string,
    public primaryView: V,
    public saveAction: { (data: M): Observable<M> },
    public builder: new () => AbstractBuilder<M, V>,
    private router: Router
  ) {
    this.state = { error: false, data: [] };
  }
  onSave(): void {
    if (this.fn) this.primaryView = this.fn();

    Transformer.Serialize(
      this.primaryView,
      this.saveAction,
      this.builder,
      (success: boolean, data: any, err: any = null) => {
        if (!success) {
          this.onComplete.emit(false);
          this.state = { error: true, data: err };
          // this.opensweetalertsave();
        } else {
          this.onComplete.emit(true);
          this.state = { error: false, data: data };
          console.log("Saved Responsed",data);
          
          const id = data?.["Gateway Response"]?.["result"]?.[0]?.[0]?.["value"];
       
          this.data.emit({ id: id });

          // Navigate only if resource is defined
          if (this.resource !== null) {
            this.router.navigate([this.resource]);
          }

        }
      }
    );
  }

  onCancel(): void {
    //navigate
    this.router.navigate([this.resource]);
  }

  // opensweetalertsave() {
  //   if (this.state.error == true) {
  //     var msg = "";
  //     msg = this.state.data?.error?.error?.message;
  //     const errs = this.state.data?.error?.error?.details?.errors;
  //     if (Array.isArray(errs)) {
  //       errs.forEach((err) => {
  //         msg += `<h5 style="color: red;">${(err as any).path[0]
  //           }</h5><br /><br>`;
  //       });
  //     }
  //     if (errs && errs.find((err) => (err as any).path[0] === "roNumber")) {
  //       Swal.fire({
  //         title: "Validation Error",
  //         html: `<h5 style="color: red;">RO Number not available. Your RO Number has been incremented. Try saving again.</h5><br /><br>`,
  //         icon: "error",
  //       });
  //     } else {
  //       Swal.fire({
  //         title: "Validation Error",
  //         html: msg,
  //         icon: "error",
  //       });
  //     }
  //   } else {
  //     Swal.fire({
  //       title: "Success",
  //       html: `<h5 style="color: green;">Record Saved</h5><br /><br>`,
  //       icon: "success",
  //     });
  //   }
  // }
}
export class ModalActions<M, V> implements Views.FormActions {
  onComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    public primaryView: V,
    public saveAction: { (data: M): Observable<M> },
    public builder: new () => AbstractBuilder<M, V>,
    private onClose: EventEmitter<any>
  ) {
    this.state = { error: false, data: [] };
  }
  protected state: Views.FormState = null;
  onSave(): void {
    Transformer.Serialize(
      this.primaryView,
      this.saveAction,
      this.builder,
      (success: boolean, data: any, err: any = null) => {
        if (!success) {
          this.onComplete.emit(false);

          this.state = { error: true, data: err };
        } else {
          this.onComplete.emit(true);
          this.state = { error: false, data: data };
          //navigate
          if (data["Gateway Response"].count == 0) {
            data = { newItem: this.primaryView["newType"] };
          }
          this.onClose.emit(data);
        }
      }
    );
  }
  onCancel(): void {
    this.onClose.emit(null);
  }
}

@Injectable({
  providedIn: "root",
})
export class WorkflowActions implements Views.FormActions {
  onComplete: EventEmitter<boolean>;
  private _resource: string;
  public get resource(): string {
    return this._resource;
  }
  public set resource(v: string) {
    this._resource = v;
  }

  constructor(private router: Router) { }
  onSave(): void {
    this.onComplete.emit(true);

    this.router.navigate([this.resource]);
  }
  onCancel(): void {
    this.router.navigate([this.resource]);
  }
}
