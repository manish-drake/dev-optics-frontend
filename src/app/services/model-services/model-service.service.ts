import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdapterService } from "./adapter.service";
import {  first,  map, mergeMap, Observable} from "rxjs";
import { environment } from "../../../environment/environment";
import { Data } from "../model-interface/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private modelsServerUrl: string = environment.apiUrl;
  constructor(private _httpClient: HttpClient, private _adapter: AdapterService) {
    
  }
  create(type: string, entity: any): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`
    return this._adapter.modulateOne(type, entity).pipe(mergeMap(modata => {
      console.log(modata)
      return this._httpClient.post<any>(url, modata);
    }));
  }
  read(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`
    console.log(url)
    return this._httpClient.get<any>(url);
  }
  readOne(type: string, id: number): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}=${id}`
    console.log(url);

    return this._httpClient.get<any>(url);
  }
  update(type: string, entity: any, id: number) {
    const url = `${this.modelsServerUrl}/${type}`
    // entity.values = JSON.parse(entity.values)
    return this._adapter.modulateOne(type, entity).pipe(mergeMap(modata => {
      console.log(url, "::", modata)
      return this._httpClient.put<any>(url, modata);
    }));

  }
  delete(type: string, id: number): Observable<any> {
    let _type = type;
    const pos = type.indexOf("_");
    if (pos >= 0) {
      _type = type.split("_").join("-");
    }
    let url = `${this.modelsServerUrl}/${_type}`
    return this._adapter.modulateOne(type, { "id": id }).pipe(mergeMap(modata => {
      console.log("sending DELETE on ", url, "with data:\n", modata)
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: modata
      };
      return this._httpClient.delete<any>(url, httpOptions);
    }));
  }


  updateMetaType(type: string, entity: any, id: number) {
    const url = `${this.modelsServerUrl}/meta-type?id='${id}'`;
    const value = JSON.stringify(entity.values);
    const data = {
      table: "meta_type",
      columns: [{ field: "values", type: 1, value: `${value}` }],
      criteria: [{ field: "id", value: `${id}` }],
    };
    return this._httpClient.put<any>(url, data);
  }


  deleteView(type: string, id: number): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}/view/${id}`
    console.log(url)
    return this._httpClient.delete<any>(url);
  }

  schema(type: string) {
    const url = `${this.modelsServerUrl}/${type}/schema`
    return this._httpClient.get<any>(url);
  }

  views(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}/views`
    return this._httpClient.get<any>(url);
  }

  private _getSelectedList<I extends Data.Base>(resource: string, id: number): Observable<I[]> {
    return this._adapter.demodulate(resource, this.readOne(resource, id))
      .pipe(map(models => models.map((model: any) => {
        console.log(model)
        return model as I
      })));
  }

  /********************************************************************************
  ********* <><> Get  List Of Data And Single Data without Demodulate *******************
  *********************************************************************************/

  private getList<I extends Data.Base>(resource: string, pred=(d: any)=>d): Observable<I[]> {
    return this.read(resource)
    .pipe(map(blob => blob["Gateway Response"].result))
    .pipe(map(blob=>pred(blob)))
      .pipe(map(models => models.map((model: any) => {
        console.log(model,model as I);
        return model as I
      })));
  }
  private data<M, I extends Data.Base>(resource: string, type: new (I: Data.Base) => M): Observable<M[]> {
    return this.getList<I>(resource)
      .pipe(map((data: I[]) => data.map((datum: I) => new type(datum))));
  }

  /********************************************************************************
  ********* Get List Of Data And Single Data without Demodulate </></> *******************
  *********************************************************************************/

  private _getList<I extends Data.Base>(resource: string): Observable<I[]> {

    return this._adapter.demodulate(resource, this.read(resource))
      .pipe(map(models => models.map((model: any) => {
        // console.log(model);
        return model as I
      })));
  }
  private _getFirst<I>(resource: string, pred=(d: any)=>d): Observable<I> {

    return this.read(resource)
    .pipe(map(blob => blob["Gateway Response"].result))
    .pipe(map(blob=>pred(blob)))
    .pipe(map(models => models.map((model: any) => {
        return model as I
      })))
    .pipe(first())

  }

//   private _getFirst<I>(resource: string, pred = (d: any) => d): Observable<I> {
//   return this.read(resource).pipe(
//     map(blob => blob["Gateway Response"].result),
//     map(pred),
//     switchMap((models: any[]) => from(models)), 
//     map((model: any) => model as I),
//     first()
//   );
// }


  private _get<I extends Data.Base>(resource: string, id: number): Observable<I> {

    return this._adapter.demodulate(resource, this.readOne(resource, id))
      .pipe(map(models => models.map((model: any) => {
        return model as I
      })));
  }

  private _data<M, I extends Data.Base>(
    resource: string,
    type: new (I: I) => M
  ): Observable<M[]> {
    return this._getList<I>(resource).pipe(
      map((data: I[]) => data.map((datum: I) => new type(datum)))
    );
  }

  private _datum<M, I extends Data.Base>(resource: string, id: number, type: new (I: Data.Base) => M): Observable<M> {

    return this._get<I>(resource, id)
      .pipe(first())
      .pipe(map((datum: I) => new type(datum)))
      ;
  }

  private _selectData<M, I extends Data.Base>(resource: string, id: number, type: new (I: I) => M): Observable<M[]> {
    return this._getSelectedList<I>(resource, id)
      .pipe(map((data: I[]) => data.map((datum: I) => new type(datum))))
  }

  private _selectOne<M, I extends Data.Base>(
    resource: string,
    id: number,
    type: new (I: I) => M
  ): Observable<M> {
    return this._selectData(resource, id, type).pipe(
      map((data: M[]) => data[0])
    );
  }

  private getEntitiesByDynamicQuery(type: string, key: string, keyType: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}?${keyType}=${key}`;
    console.log(url)
    return this._httpClient.get<any>(url);
  }

  private _getSelectedQueryType<I extends Data.Base>(
    resource: string,
    key: string,
    keyType: string
  ): Observable<I[]> {
    return this._adapter.demodulate(resource,
      this.getEntitiesByDynamicQuery(resource, key, keyType)
    ).pipe(
      map((models) =>
        models.map((model: any) => {
          return model as I;
        })
      )
    );
  }

  private _selectQueryData<M, I extends Data.Base>(
    resource: string,
    key: string,
    keyType: string,
    type: new (I: Data.Base) => M
  ): Observable<M[]> {
    return this._getSelectedQueryType<I>(resource, key, keyType).pipe(
      map((data: I[]) => data.map((datum: I) => new type(datum)))
    );
  }

  private _selectQueryOne<M>(
    resource: string,
    key: string,
    keyType: string,
    type: new (I: Data.Base) => M
  ): Observable<M> {
    return this._selectQueryData(resource, key, keyType, type).pipe(
      map((data: M[]) => data[0])
    );
  }

  //============================================================All reuseable realated  funtions declared  avobe=========================================//


  //============================================================ All Data Post realated  funtions Below =========================================//



  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ All Data retrival realated service funtions are Below ++++++++++++++++++++++++++++++++++++++++//

}
