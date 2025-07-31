import { Observable } from "rxjs";
import { Range } from "./collection";

export abstract class AbstractBuilder<M, V>
{
  abstract compose(m: M, v: V);
  abstract decompose(v: V): M;
  abstract view(): V;
}

export class CollectionStrategy<M, V, B extends AbstractBuilder<M, V>>{
  _builder!: B;
  _view!: Range<V>;


  constructor(view: Range<V>, builder: new () => B) {
    this._view = view;
    this._builder = new builder();
  }
  compose(data: M[]): void {
    this._view.Clear();
    data.map((datum: M) => {
      let view = this._builder.view();
      this._builder.compose(datum, view);
      this._view.Add(view);
    })
  }
  decompose(): M[] {
    return this._view.map((view: V) => this._builder.decompose(view));
  }
}

export class ObjectStrategy<M, V, B extends AbstractBuilder<M, V>>{
  _builder!: B;
  _view!: V;

  constructor(view: V, builder: new () => B) {
    this._view = view;
    this._builder = new builder();
  }
  compose(data: M): void {
    this._builder.compose(data, this._view)
  }
  decompose(): M {
    return this._builder.decompose(this._view);
  }
}

export class SerializerStrategy<M, V, B extends AbstractBuilder<M, V>>
{
  _view: V;
  _serializer: { (model: M): Observable<M> };
  _builder: B;
  _result: M;
  _err: any;
  _data: M;
  constructor(view: V, serializer: { (model: M): Observable<M> }, builder: new () => B) {
    this._builder = new builder();
    this._serializer = serializer;
    this._view = view;
  }

  serialize(response: { (through: boolean, data: M, err:any): void } = null): void {
    this._data = this._builder.decompose(this._view);
    this._serializer(this._data).subscribe((result: M) => {
      this._result = result;
      response(true, this._result, null);
    }, err => {
      this._err = err
      response(false, this._data, err);
    });
  }
}
