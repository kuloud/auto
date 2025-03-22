interface TweetData {
  username: string;
  handle: string;
  timestamp: string;
  content?: string;
  media?: { type: "image" | "video"; url: string }[];
  replyCount: number;
  retweetCount: number;
  likeCount: number;
  viewCount: number;
  bookmarkCount?: number;
  isVerified: boolean;
  profileImageUrl: string;
  tweetUrl: string;
}
