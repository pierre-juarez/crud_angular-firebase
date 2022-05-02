import { Injectable } from '@angular/core';

/** Importamos los módulos para BD con Firestore */
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Post } from './post.model'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore : AngularFirestore) { }

  /** Creamos los métodos para el CRUD */
  getPosts(){
    return this.angularFirestore
              .collection('posts')
              .snapshotChanges();
  }

  getPostById(id){
    return this.angularFirestore
            .collection('posts')
            .doc(id)
            .valueChanges();
  }

  createPost(post : Post){
    return new Promise<any> ( (resolve, reject) => {
      this.angularFirestore
        .collection('posts')
        .add(post)
        .then((response) => {
          console.log(response);
        },
        (error) => {
          reject(error);
        })
    })
  }

  updatePost(post: Post, id){
    return this.angularFirestore
            .collection('posts')
            .doc(id)
            .update({
              title: post.title,
              content: post.content,
              author: post.author
            });
  }

  deletePost(post){
    return this.angularFirestore
            .collection('posts')
            .doc(post.id)
            .delete()

  }
}
