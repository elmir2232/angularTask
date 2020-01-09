import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsPageComponent } from './posts-page/posts-page.component';
import { PostViewComponent } from './posts-page/post-view/post-view.component';
import { AuthGuardService } from '../services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: PostsPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'post/:post.id',
    component: PostViewComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ContentRoutingModule { }
