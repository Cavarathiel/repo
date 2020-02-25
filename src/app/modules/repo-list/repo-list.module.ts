import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './components/overview/overview.component';
import { ListComponent } from './components/list/list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [OverviewComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OverviewComponent
      }
    ]),
  ]
})
export class RepoListModule { }
