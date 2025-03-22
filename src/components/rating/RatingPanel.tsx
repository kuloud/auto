import { Button, Tooltip } from "@heroui/react";
import React from "react";

const RatingPanel: React.FC<TweetData> = ({
  username,
  handle,
  timestamp,
  content,
  media,
  replyCount,
  retweetCount,
  likeCount,
  viewCount,
  bookmarkCount,
  isVerified,
  profileImageUrl,
  tweetUrl,
}) => {
  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">Custom Content</div>
          <div className="text-tiny">This is a custom tooltip content</div>
        </div>
      }
    >
      <Button>Hover me</Button>
    </Tooltip>
  );
};

export default RatingPanel;
