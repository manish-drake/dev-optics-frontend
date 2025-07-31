import { Data } from "../app/service/models-interface/interface";
import { DataBase } from "../app/service/models-interface/model";


export class datasource<T extends DataBase<Data.Base> & { columns: () => string[] }>
{
  data: T[] = [];
  _columns: { name: string, prop: string }[] = [];
  _rows: string[] = [];
  _config: any = null;
  constructor(_data: T[], config: any = null) {
    this._config = config;
    this.data = _data;
    for (const d of this.data) {
      if (config) {
        config.mapping.forEach((mp: { label: string; field: string; }) => {
          this._columns.push({ name: mp.label, prop: mp.field })
        })
      }
      else {
        d.columns().forEach((col: string) => {
          this._columns.push({ name: col, prop: col });
        })
      }
      break;
    }

    for (const d of this.data) {
      var datum: any = {};
      d.columns().forEach((col: string) => {
        var map = this._config.mapping.find(e => e.field === col);
        if (map && map["converter"])
          datum[col] = map["converter"](d[col]);
        else
          datum[col] = d[col];
      });
      this._rows.push(datum)
    }
  }
  columns() {
    return this._columns;
  }
  rows() {
    return this._rows;
  }
}