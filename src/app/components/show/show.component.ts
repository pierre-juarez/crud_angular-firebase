import { Component, OnInit } from '@angular/core';

/** Importamos el modelo y el servicio */
import { Post } from 'src/app/post.model';
import { PostService } from 'src/app/post.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  Posts : Post[];
  constructor(private PostService : PostService) { }

  ngOnInit(): void {
    console.log(this.PostService.getPosts());
    this.PostService.getPosts().subscribe( resp => {
      this.Posts = resp.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Post)
        }
      });
    });
  }

  deletePost = (post) => this.PostService.deletePost(post);

}
