export interface AppModel {

  id: number;
  app: string;
  description: string;
  tech_stack: string;
  github_repo: string;
  docker_repo: string;

}

export interface VersionModel {
  id: number;
  version: string;
  app: string;
  dt_started: string;
  description: string;
  delta_maj: number;
  delta_min: number;
  delta_pat: number;
  current: boolean;

}

export interface DeploymentModel {
  id: number
  dtt_deploy: string
  milestone: string
  app: string
  version: string
  git_tag: string
  docker_tag: string
  change_log: string

}

export interface ChangeModel {
  app: string
  version: string
  dtt_change: string
  change_title: string
  change_desc: string
  category: CategoryEnum
  dev: string
  image_url: string
  id: 0
}

export enum CategoryEnum {
  Bug = 'bug',
  Feature = 'feature',
  Refactoring = 'refactoring',
  Breaking = 'breaking',
}


