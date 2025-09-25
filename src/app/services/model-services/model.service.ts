import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { map, Observable } from 'rxjs';
import { AppModel, ChangeFilterOption, ChangeModel, ChangeQueryParams, DeploymentModel,  ImageUploadResponse,  MilestoneModel, VersionModel } from '../model-interface/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private BaseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  // ================================== GET API ================================== //

  getApps(): Observable<AppModel[]> {
    return this.httpClient.get<AppModel[]>(`${this.BaseUrl}/apps/`);
  }

  getSingleApp(id: number): Observable<AppModel> {
    return this.httpClient.get<AppModel>(`${this.BaseUrl}/apps/${id}`);
  }

  getVersion(): Observable<VersionModel[]> {
    return this.httpClient.get<VersionModel[]>(`${this.BaseUrl}/versions/`)
  }

  getSingleVersion(id: number): Observable<VersionModel> {
    return this.httpClient.get<VersionModel>(`${this.BaseUrl}/versions/${id}`)
  }

  getDeploy(): Observable<DeploymentModel[]> {
    return this.httpClient.get<DeploymentModel[]>(`${this.BaseUrl}/deployments/`)
  }

  getSingleDeploy(id: number): Observable<DeploymentModel> {
    return this.httpClient.get<DeploymentModel>(`${this.BaseUrl}/deployments/${id}`)
  }

  getChange(params?: ChangeQueryParams): Observable<ChangeModel[]> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }

    const options = httpParams.keys().length ? { params: httpParams } : undefined;

    return this.httpClient.get<ChangeModel[]>(`${this.BaseUrl}/changes/`, options)
  }

  getChangeFilterOptions(): Observable<ChangeFilterOption[]> {
    return this.httpClient.get<ChangeFilterOption[]>(`${this.BaseUrl}/changes/filter-options`);
  }

  getSingleChange(id: number): Observable<ChangeModel> {
    return this.httpClient.get<ChangeModel>(`${this.BaseUrl}/changes/${id}`)
  }

  getMilestone(): Observable<MilestoneModel[]>{
   return this.httpClient.get<MilestoneModel[]>(`${this.BaseUrl}/milestones/`)
  }

  getSingleMilestone(id: number): Observable<MilestoneModel>{
    return this.httpClient.get<MilestoneModel>(`${this.BaseUrl}/milestones/${id}`)
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

  createMileStone(milestoneData: MilestoneModel): Observable<MilestoneModel> {
    return this.httpClient.post<MilestoneModel>(`${this.BaseUrl}/milestones/`, milestoneData)
  }

  // ================================== PUT API ================================== //

  updateApp(id: number, appData: AppModel): Observable<AppModel> {
    return this.httpClient.put<AppModel>(`${this.BaseUrl}/apps/${id}`, appData);
  }

  updateVersion(id: number, versionData: VersionModel): Observable<VersionModel> {
    return this.httpClient.put<VersionModel>(`${this.BaseUrl}/versions/${id}`, versionData);
  }
  updateDeploy(id: number, deployData: DeploymentModel): Observable<DeploymentModel> {
    return this.httpClient.put<DeploymentModel>(`${this.BaseUrl}/deployments/${id}`, deployData);
  }

  updateChange(id: number, changeData: ChangeModel): Observable<ChangeModel>{
    return this.httpClient.put<ChangeModel>(`${this.BaseUrl}/changes/${id}`, changeData)
  }

  updateMilestone(id: number, milestoneData: MilestoneModel): Observable<MilestoneModel>{
    return this.httpClient.put<MilestoneModel>(`${this.BaseUrl}/milestones/${id}`, milestoneData)
  }


  // ================================== Delete API ================================== //


  deleteApp(id: number): Observable<AppModel> {
    return this.httpClient.delete<AppModel>(`${this.BaseUrl}/apps/${id}`);
  }

  deleteVersion(id: number): Observable<VersionModel> {
    return this.httpClient.delete<VersionModel>(`${this.BaseUrl}/versions/${id}`)
  }

  deleteDeploy(id: number): Observable<DeploymentModel> {
    return this.httpClient.delete<DeploymentModel>(`${this.BaseUrl}/deployments/${id}`)
  }

  deleteChange(id: number): Observable<ChangeModel> {
    return this.httpClient.delete<ChangeModel>(`${this.BaseUrl}/changes/${id}`)
  }

  deleteMilestone(id: number): Observable<MilestoneModel>{
    return this.httpClient.delete<MilestoneModel>(`${this.BaseUrl}/milestones/${id}`)
  }

  // ================================== Get only One Item API ================================== //

  getAppNames(): Observable<string[]> {
    return this.httpClient.get<AppModel[]>(`${this.BaseUrl}/apps/`).pipe(
      map((apps) => apps.map(app => app.app))
    );
  }
  getVersions(): Observable<string[]> {
    return this.httpClient.get<VersionModel[]>(`${this.BaseUrl}/versions/`).pipe(
      map((versions) => versions.map(version => version.version))
    );
  }

  getMilestonesList(): Observable<string[]> {
    return this.httpClient.get<MilestoneModel[]>(`${this.BaseUrl}/milestones/`).pipe(
      map((milestones) => milestones.map(milestone => milestone.milestone))
    );
  }

  // ================================== IMAGE UPLOAD API ================================== //



   imageUpload(file: File): Observable<ImageUploadResponse> {
    const url =`${this.BaseUrl}/changes/upload-image/`
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<any>(url, formData);
  }

}
