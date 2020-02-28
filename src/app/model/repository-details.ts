import { BranchDetails } from './branch-details';

export class RepositoryDetails {
  name: string;
  owner?: string;
  branches?: BranchDetails[];
}
