export class Post{
    constructor(
      public title: string,
      public subreddit: string,
      public selftext: string,
      public score: number,
      public preview: string,
      public media: string,
      public subredditlink: string,
      public permalink: string,
      public postlink: string
    ) {}
  }