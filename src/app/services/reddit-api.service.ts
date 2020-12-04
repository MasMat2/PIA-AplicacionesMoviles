import { RedditModel } from './reddit.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class RedditAPIService {

  constructor(private http: HttpClient) { }

  get_posts(searchTerm: string, searchLimit: number, sortBy: string) {
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}&nsfw=1&include_over_18=on`
    return this.http.get<RedditModel>(proxyUrl + targetUrl)
    .pipe(map(data => {
      const posts = [];
      data.data.children.forEach(post => {
        // Check for image
        const image = post.data.preview ? post.data.preview.images[0].source.url : "https://cdn.vox-cdn.com/thumbor/SfU1irp-V79tbpVNmeW1N6PwWpI=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/uploads/chorus_image/image/45970810/reddit_logo_640.0.jpg";
        // Check for video
        const media = post.data.is_video ? post.data.media.reddit_video.fallback_url : post.data.url
        posts.push(new Post(post.data.title, post.data.subreddit, post.data.permalink, this.truncateText(post.data.selftext, 100), post.data.score, image, media));
      });
      return posts;
    }));
  }

  truncateText(text: string, limit: number){
    const shortened = text.slice(limit).search(/(\n|\s)/);
    if(shortened == -1) return text;
    console.log(shortened)
    return text.substring(0, shortened+limit)
}
}
