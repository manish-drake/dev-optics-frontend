import { Collection, Range } from "./collection";
import { AbstractBuilder } from "./strategies";



export class ArrayBuilder<T> extends AbstractBuilder<T[], Collection<T>> {
    view(): Collection<T> {
        return new Collection<T>();
    }
    compose(m: T[], v: Collection<T>) {
        m.forEach(t => v.Add(t));
    }
    decompose(v: Collection<T>): T[] {
        throw new Error("Method not implemented.");
    }
}
export class RangeBuilder<T> extends AbstractBuilder<T[], Range<T>> {
    view(): Range<T> {
        return new Range<T>();
    }
    compose(m: T[], v: Range<T>) {
        m.forEach(t => v.Add(t));
    }
    decompose(v: Range<T>): T[] {
        throw new Error("Method not implemented.");
    }
}