import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/post.service';
ActivatedRoute
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public editForm : FormGroup;
  postRef : any;

  constructor(
    public formBuilder : FormBuilder,
    public router : Router,
    public activatedRoute : ActivatedRoute,
    public postService : PostService
  ) { 
    this.editForm = this.formBuilder.group({
      title : [''],
      author: [''],
      content : ['']
    })
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe( resp => {
      this.postRef = resp;
      this.editForm = this.formBuilder.group({
        title : [this.postRef.title],
        author : [this.postRef.author],
        content : [this.postRef.content],
      })
    });
  }

  onSubmit(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.postService.updatePost(this.editForm.value,id);
    this.router.navigate(['']);
  }

}
