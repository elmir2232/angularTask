import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  post: IPost;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.db.database.ref('posts/' + params.get('post.id')).once('value').then(post => {
        this.post = {
          title: post.val().title,
          text: post.val().text,
          id: post.val().id
        }
      })
    })
  }

}
