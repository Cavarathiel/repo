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
    if (this.repoListForm.controls.githubName.valid) {
      this.isValid = true;
      const githubUser = this.repoListForm.controls.githubName.value;
      const repoList = await this.rs.getAllRepositories(githubUser);
      this.listData = await (await this.convertListRepositories(repoList)).filter(r => r !== undefined);
    } else {
      this.isValid = false;
    }
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
