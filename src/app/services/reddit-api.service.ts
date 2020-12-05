import { RedditModel } from './reddit.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Post } from './post.model';
import { BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RedditAPIService {
  private _posts =  new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) { }
  // constructor(){}

  get posts(){
    return this._posts.asObservable();
  }

  get_posts(searchTerm: string, searchLimit: number, sortBy: string) {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
    console.log(targetUrl);
    return this.http.get<RedditModel>(proxyUrl + targetUrl)
    .pipe(map(data => {
      const posts = [];
      data.data.children.forEach(post => {
        // Check for image
        let image = post.data.preview ? post.data.preview.images[0].source.url : "https://cdn.vox-cdn.com/thumbor/SfU1irp-V79tbpVNmeW1N6PwWpI=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/uploads/chorus_image/image/45970810/reddit_logo_640.0.jpg";
        // The g replaces all instances of regex not just first
        image = image.replace(/amp;/g, "");
        // Check for video
        const media = post.data.is_video ? post.data.media.reddit_video.fallback_url : post.data.url
        //Build subreddit link
        let subredditlink = "https://www.reddit.com/r/"+post.data.subreddit;
        // Build post link
        let postlink = "https://www.reddit.com"+post.data.permalink;
        // Only show the firs 100 characters of post
        let text = this.truncateText(post.data.selftext, 100);
        posts.push(new Post(post.data.title, post.data.subreddit, text, post.data.score, image, media, subredditlink, post.data.permalink, postlink));
      });
      return posts;
    }), tap(posts => {
      this._posts.next(posts);
    }));
  }

  truncateText(text: string, limit: number){
    const shortened = text.slice(limit).search(/(\n|\s)/);
    if(shortened == -1) return text;
    console.log(shortened)
    return text.substring(0, shortened+limit)
}
}
