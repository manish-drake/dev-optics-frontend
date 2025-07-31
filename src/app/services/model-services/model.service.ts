import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { AppModel } from '../model-interface/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private BaseUrl = 'http://drake.in:1337';

  constructor(private httpClient: HttpClient) { }

  getApps(): Observable<AppModel[]>{
    return this.httpClient.get<AppModel[]>(`${this.BaseUrl}/apps`);
  }

}
