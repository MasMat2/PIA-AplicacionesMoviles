import { Component, OnInit,  OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RedditAPIService } from './../../services/reddit-api.service';
import { Post } from './../../services/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  form: FormGroup;
  posts: Post[];
  private postsSub: Subscription;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private redditAPI: RedditAPIService) { 
    this.form = this.formBuilder.group({
      query: ["", Validators.required],
      sortby: ["", Validators.required],
      limit: ["", Validators.required]
    })
  }

  ngOnInit() {
    this.postsSub = this.redditAPI.posts.subscribe(posts => {
      this.posts = posts;
    });
  }
  
  onSubmit(){
    if(!this.form.valid){
      return;
    }

    this.redditAPI.get_posts(this.form.value.query, this.form.value.limit, this.form.value.sortby).subscribe(() => {
        this.isLoading = true;
        console.log(this.posts);
    });
  }

  ngOnDestroy(){
    if(this.postsSub){
      this.postsSub.unsubscribe();
    }

  }
}
