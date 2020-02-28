import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RepoListService } from '../../services/repo-list.service';
import { RepositoryResponse } from 'src/app/model/repository-response';
import {tap} from 'rxjs/operators';
import { RepositoryDetails } from 'src/app/model/repository-details';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public repoListForm: FormGroup;
  public isValid = true;
  public listData: RepositoryDetails[];
  public isLoading = false;
  public error;

  constructor(
    private fb: FormBuilder,
    private rs: RepoListService
    ) { }

  ngOnInit(): void {
    this.repoListForm = this.fb.group({
      githubName: this.fb.control('', Validators.required)
    });
  }

  async getGithubRepositories() {
    this.error = null;
    this.listData = null;
    if (this.repoListForm.controls.githubName.valid) {
      this.isLoading = true;
      this.isValid = true;
      const githubUser = this.repoListForm.controls.githubName.value;
      const repoList = await this.rs.getAllRepositories(githubUser);
      if (typeof repoList === 'number' || repoList.length === 0) {
        this.isLoading = false;
        this.error = {
          details: {
          name: 'No repositories were found'
          },
          errorNumber: 404};
      } else {
        this.listData = await (await this.convertListRepositories(repoList)).filter(r => r !== undefined);
        this.isLoading = false;
      }
    } else {
      this.isValid = false;
      this.listData  = [];
    }
    this.repoListForm.get('githubName').patchValue('');
  }

  async convertListRepositories(repoList: RepositoryResponse[]) {
    return Promise.all(repoList.map(async repository => {
      if (!repository.fork) {
        const response = await this.rs.getBranchesForRepository(repository.owner.login, repository.name);
        return {
          name: repository.name,
          owner: repository.owner.login,
          branches: response.map(branch => {
            return ({
              name: branch.name,
              last_sha: branch.commit.sha
            });
          }
          )
         }; }
        }));
  }

}
