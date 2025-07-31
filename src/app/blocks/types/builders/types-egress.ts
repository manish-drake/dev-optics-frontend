
import { Data } from "../../../app/service/models-interface/interface";
import { AbstractBuilder } from "../../strategies";
import { TypesView } from "../views/types";


export class TypesEgressBuilder extends AbstractBuilder<
  Data.MetaTypeEgress,
  TypesView
> {
  compose(m: Data.MetaTypeEgress, v: TypesView) {
    throw new Error("Method not implemented.");
  }
  view(): TypesView {
    throw new Error("Method not implemented.");
  }
  decompose(v: TypesView): Data.MetaTypeEgress {
    const values = v.existingTypes.concat([v.newType]);
    return {
      id: v.id,
      values: values,
      newItem: v.newType,
    };
  }
}
