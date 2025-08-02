import { CategoryEnum } from "../services/model-interface/interfaces";

export function incrementVersion(current: string, category: CategoryEnum): string {
  let [major, minor, patch] = current.split('.').map(num => parseInt(num, 10));

  if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
    console.warn(`Invalid version format: ${current}. Falling back to 0.0.0`);
    [major, minor, patch] = [0, 0, 0];
  }

  switch (category) {
    case CategoryEnum.Feature:
      minor += 1;
      patch = 0;
      break;
    case CategoryEnum.Bug:
      patch += 1;
      break;
    case CategoryEnum.Breaking:
      major += 1;
      minor = 0;
      patch = 0;
      break;
    default:
      patch += 1; // Fallback if unknown category
  }

  return `${major}.${minor}.${patch}`;
}
