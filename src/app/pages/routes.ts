import { Route } from "@angular/router";
import { AppsPresenter } from "./apps/apps.presenter";
import { ChangesPresenter } from "./changes/changes.presenter";
import { DeploymentsPresenter } from "./deployments/deployments.presenter";
import { VersionsPresenter } from "./versions/versions.presenter";
import { AppFormPresenter } from "./apps/components/app-form/app-form.presenter";
import { ChangeFormPresenter } from "./changes/components/change-form/change-form.presenter";
import { DeploymentFormPresenter } from "./deployments/components/deployment-form/deployment-form.presenter";
import { VersionFormPresenter } from "./versions/components/version-form/version-form.presenter";
import { MilestonesPresenter } from "./milestones/milestones.presenter";
import { MilestoneFormPresenter } from "./milestones/components/milestone-form/milestone-form.presenter";
import { ChangesDetailCardPresenter } from "./changes/components/changes-detail-card/changes-detail-card.presenter";

export const PAGE_ROUTES: Route[] = [
    { path: 'Apps', component: AppsPresenter},
    { path: 'app-form', component: AppFormPresenter },
    { path: 'edit-app/:id', component: AppFormPresenter},
    { path: 'change', component: ChangesPresenter},
    { path: 'change-detail-card/:id', component: ChangesDetailCardPresenter},
    { path: 'change-form', component: ChangeFormPresenter},
    { path: 'edit-change/:id', component: ChangeFormPresenter},
    { path: 'deployment', component: DeploymentsPresenter},
    { path: 'deploy-form', component: DeploymentFormPresenter},
    { path: 'edit-deploy/:id', component: DeploymentFormPresenter},
    { path: 'versions', component: VersionsPresenter},
    { path: 'version-form', component: VersionFormPresenter},
    { path: 'edit-version/:id', component: VersionFormPresenter},
    { path: 'milestones', component: MilestonesPresenter},
    { path: 'milestone-form', component: MilestoneFormPresenter},
    { path: 'edit-milestone/:id', component: MilestoneFormPresenter},


     /**********************************************************************/
  { path: '', redirectTo: 'Apps', pathMatch: 'full' },
  { path: '**', redirectTo: 'Apps' },
]