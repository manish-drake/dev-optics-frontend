import { Component, EventEmitter, Input, OnInit } from "@angular/core";
// import { ModalActions } from 'app/main/test-set/blocks/actions';
// import { Transformer } from 'app/main/test-set/blocks/transformer';
// import { DataFactoryService } from 'app/main/test-set/models/data-factory.service';
// import { Views } from 'app/main/test-set/models/ro-interface';
// import { MetaTypeBuilder } from '../../blocks/meta-type.builder';
import { TypesBuilder } from "./builders/types";
import { TypesEgressBuilder } from "./builders/types-egress";
import { TypesView } from "./views/types";
import { Transformer } from "../transformer";
import { TypesComponent } from "./types.component";
import { ModalActions } from "../actions";
import { ModelService } from "../../app/service/model-services/model-service.service";
import { Views } from "../../app/service/models-interface/interface";


@Component({
  selector: "app-types-presenter",
  standalone: true,
  template: `<app-types
    [datasource]="ds"
    (save)="actions.onSave()"
    (cancel)="actions.onCancel()"
  ></app-types>`,
  styleUrls: ["./types.component.scss"],
  imports: [TypesComponent]
})
export class TypesPresenter {
  ds: TypesView;
  private _key: string;
  public get key(): string {
    return this._key;
  }
  public set key(v: string) {
    if (v != this._key) {
      this._key = v;
      Transformer.ComposeObjectAsync(
        this.modelService.MetaTypeByKey(v),
        this.ds,
        TypesBuilder
      );
    }
  }

  constructor(private modelService: ModelService) {
    this.ds = new TypesView();
  }
  private _actions!: Views.FormActions;
  public get actions(): Views.FormActions {
    return this._actions;
  }
  public set actions(value: Views.FormActions) {
    this._actions = value;
  }
  setModalActions(onClose: EventEmitter<any>): void {
    this.actions = new ModalActions(
      this.ds,
      this.modelService.SaveMetaType,
      TypesEgressBuilder,
      onClose
    );
  }
}
