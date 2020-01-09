import { Component, Input } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent{

  @Input() post: IPost;
  @Input() userRole: string;

  constructor(private ps: PostsService) {}

  onRemove() {
    const id = this.post.id;
    this.ps.deletePost(id);
  }

  onEdit() {
    const post: IPost = {
      title: this.post.title,
      text: this.post.text,
      id: this.post.id
    }
    this.post.editable = false;

    this.ps.updatePost(post);
  }

  makeEditable() {
    this.post.editable = true;
  }

}
