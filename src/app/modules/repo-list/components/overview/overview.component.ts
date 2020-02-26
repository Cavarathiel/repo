import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RepoListService } from '../../services/repo-list.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public repoListForm: FormGroup;

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
    const githubUser = this.repoListForm.controls.githubName.value;
    const fleets = await this.rs.getAllRepositories(githubUser);
  }

}
