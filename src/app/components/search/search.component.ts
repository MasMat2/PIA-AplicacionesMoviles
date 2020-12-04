import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RedditAPIService } from './../../services/reddit-api.service';
import { Post } from './../../services/post.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  posts: Post[];

  constructor(private formBuilder: FormBuilder, private redditAPI: RedditAPIService) { 
    this.form = this.formBuilder.group({
      query: ["", Validators.required],
      sortby: ["", Validators.required],
      limit: ["", Validators.required]
    })
  }

  ngOnInit() {
  }
  
  onCreateOffer(){
    if(!this.form.valid){
      return;
    }

    this.posts = [this.redditAPI.get_posts(this.form.value.query, this.form.value.limit, this.form.value.sortby)];
  }
  
}
