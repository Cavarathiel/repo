import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverviewComponent } from './components/overview/overview.component';
import { ListComponent } from './components/list/list.component';
import { RouterModule } from '@angular/router';
import { RepoCommonModule } from '../repo-common/repo-common.module';
import { RepoListService } from './services/repo-list.service';



@NgModule({
  declarations: [
    OverviewComponent,
    ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OverviewComponent
      }
    ]),
    RepoCommonModule,
    ReactiveFormsModule
  ],
  providers: [RepoListService]
})
export class RepoListModule { }
