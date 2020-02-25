import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('./modules/repo-list/repo-list.module').then(m => m.RepoListModule)
  },
  {
    path: '**',
    redirectTo: '/overview',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
