import { Data } from "../app/service/models-interface/interface";
import { Collection } from "./collection";
import { AbstractBuilder } from "./strategies";



export class MetaTypeBuilder extends AbstractBuilder<
    Data.MetaType,
    Collection<string>
> {
    view(): Collection<string> {
        return new Collection<string>();
    }
    compose(m: Data.MetaType, v: Collection<string>) {
        m?.values.forEach((t) => v.Add(t));
    }
    decompose(v: Collection<string>): Data.MetaType {
        throw new Error("Method not implemented.");
    }
}
