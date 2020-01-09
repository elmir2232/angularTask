import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable ({
    providedIn: 'root'
})
export class PostsService {
    constructor(private db: AngularFireDatabase) {}

    renderPosts(posts: IPost[]) {
        const postsTransformed = [];
        posts.map(post => {
          postsTransformed.push(post);
        })
        return postsTransformed;
    }

    addPost(post:IPost) {
        this.db.object('posts').update({[post.id]: post})
    } 

    deletePost(id) {
        this.db.database.ref('posts/' + id).remove();
    }

    updatePost(post:IPost) {
        this.db.database.ref('posts/' + post.id).set(post);
    }



}