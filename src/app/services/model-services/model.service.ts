import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { AppModel, ChangeModel, DeploymentModel, VersionModel } from '../model-interface/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private BaseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  // ================================== GET API ================================== //

  getApps(): Observable<AppModel[]>{
    return this.httpClient.get<AppModel[]>(`${this.BaseUrl}/apps/`);
  }

  getSingleApp(id: number): Observable<AppModel> {
    return this.httpClient.get<AppModel>(`${this.BaseUrl}/apps/${id}`);
  }

  getVersion(): Observable<VersionModel[]>{
    return this.httpClient.get<VersionModel[]>(`${this.BaseUrl}/versions/`)
  }

  getSingleVersion(id: number): Observable<VersionModel>{
    return this.httpClient.get<VersionModel>(`${this.BaseUrl}/versions/${id}`)
  }

  getDeploy(): Observable<DeploymentModel[]>{
    return this.httpClient.get<DeploymentModel[]>(`${this.BaseUrl}/deployments/`)
  }

  getSingleDeploy(id: number): Observable<DeploymentModel>{
    return this.httpClient.get<DeploymentModel>(`${this.BaseUrl}/deployments/${id}`)
  }

  getChange(): Observable<ChangeModel[]>{
    return this.httpClient.get<ChangeModel[]>(`${this.BaseUrl}/changes/`)
  }

  getSingleChange(id: number): Observable<ChangeModel>{
    return this.httpClient.get<ChangeModel>(`${this.BaseUrl}/changes/${id}`)
  }


  // ================================== POST API ================================== //

  createApp(appData: AppModel): Observable<AppModel> {
    return this.httpClient.post<AppModel>(`${this.BaseUrl}/apps/`, appData);
  }

  createVersion(versionData: VersionModel): Observable<VersionModel> {
    return this.httpClient.post<VersionModel>(`${this.BaseUrl}/versions/`, versionData)
  }

  createDeploy(deployData: DeploymentModel): Observable<DeploymentModel> {
    return this.httpClient.post<DeploymentModel>(`${this.BaseUrl}/deployments/`, deployData)
  }

  createChange(changeData: ChangeModel): Observable<ChangeModel> {
    return this.httpClient.post<ChangeModel>(`${this.BaseUrl}/changes/`, changeData)
  }

  // ================================== PUT API ================================== //

  updateApp(id: number, appData: AppModel): Observable<AppModel> {
    return this.httpClient.put<AppModel>(`${this.BaseUrl}/apps/${id}`, appData);
  }

  updateVersion(id: number, versionData: VersionModel): Observable<VersionModel> {
    return this.httpClient.put<VersionModel>(`${this.BaseUrl}/versions/${id}`, versionData);
  }


  // ================================== Delete API ================================== //


  deleteApp(id: number): Observable<AppModel> {
    return this.httpClient.delete<AppModel>(`${this.BaseUrl}/apps/${id}`);
  }

  deleteVersion(id: number): Observable<VersionModel>{
    return this.httpClient.delete<VersionModel>(`${this.BaseUrl}/versions/${id}`)
  }
 

}
