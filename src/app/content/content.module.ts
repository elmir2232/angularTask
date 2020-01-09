import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PostsPageComponent } from './posts-page/posts-page.component';
import { PostComponent } from './posts-page/post/post.component';
import { PostViewComponent } from './posts-page/post-view/post-view.component';
import { AuthGuardService } from '../services/auth-guard.service';

@NgModule({
  declarations: [
    PostsPageComponent,
    PostComponent,
    PostViewComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    AuthGuardService
  ]
})
export class ContentModule { }
