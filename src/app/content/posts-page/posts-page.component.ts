import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { PostsService } from 'src/app/services/posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent implements OnInit, OnDestroy {
  logged: boolean = false;
  userRole: string;
  userEmail: string;
  posts: IPost[] = [];
  addForm = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required)
  }) 

  constructor(
    private af: AngularFireAuth, 
    private db: AngularFireDatabase, 
    private postService: PostsService, 
    private authService: AuthService
  ) { }
  
  ngOnInit() {
    this.authService.isAuthenticated ? this.logged = true : this.logged = false;

    this.af.auth.onAuthStateChanged(user => {
      this.userEmail = user.email;
      this.db.database.ref(user.uid).once('value').then(data => {
        this.userRole = data.val().role;
      })

      this.db.list('posts').valueChanges().subscribe((posts: IPost[]) => {
        this.posts = this.postService.renderPosts(posts);
      })
    })
  }

  ngOnDestroy() {
    this.authService.isAuthenticated ? this.logged = true : this.logged = false;
  }

  onAddNew(e) {
    e.preventDefault();

    let max = 9999,
        min = 1;

    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    const post: IPost = {
      title: this.addForm.value.title,
      text: this.addForm.value.text,
      id: id,
    }

    this.addForm.controls.title.setValue('');
    this.addForm.controls.text.setValue('');

    this.postService.addPost(post);
  }


}
