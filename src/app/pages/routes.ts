import { Route } from "@angular/router";
import { AppsPresenter } from "./apps/apps.presenter";
import { ChangesPresenter } from "./changes/changes.presenter";
import { DeploymentsPresenter } from "./deployments/deployments.presenter";
import { VersionsPresenter } from "./versions/versions.presenter";

export const PAGE_ROUTES: Route[] = [
    { path: 'Apps', component: AppsPresenter},
    { path: 'change', component: ChangesPresenter},
    { path: 'deployment', component: DeploymentsPresenter},
    { path: 'versions', component: VersionsPresenter},


     /**********************************************************************/
  { path: '', redirectTo: 'Apps', pathMatch: 'full' },
  { path: '**', redirectTo: 'Apps' },
]