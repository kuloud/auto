// Extract tweet data from an article element
export function extractTweetData(tweet: HTMLElement): TweetData {
  // Find closest tweet container
  const tweetContainer = tweet.closest(
    'article[data-testid="tweet"]'
  ) as HTMLElement;

  // Username
  const usernameEl = tweetContainer.querySelector(
    'div[data-testid="User-Name"] span'
  );
  const username = usernameEl?.textContent || "Unknown";

  // Handle
  const handleEl =
    tweetContainer.querySelector('a[href*="/"] span')?.nextElementSibling;
  const handle = handleEl?.textContent || "@unknown";

  // Timestamp
  const timestampEl = tweetContainer.querySelector("time");
  const timestamp =
    timestampEl?.getAttribute("datetime") ||
    timestampEl?.textContent ||
    "Unknown";

  // Content (not always present in the provided HTML, but check for text)
  const contentEl = tweetContainer.querySelector("div[lang]");
  const content = contentEl?.textContent || undefined;

  // Media (images or videos)
  const media: { type: "image" | "video"; url: string }[] = [];
  const imageEl = tweetContainer.querySelector(
    'img[src*="pbs.twimg.com/media"]'
  );
  if (imageEl) {
    media.push({ type: "image", url: imageEl.getAttribute("src") || "" });
  }
  const videoEl = tweetContainer.querySelector("video");
  if (videoEl) {
    const videoSrc =
      videoEl.querySelector("source")?.getAttribute("src") ||
      videoEl.getAttribute("poster") ||
      "";
    media.push({ type: "video", url: videoSrc });
  }

  // Engagement metrics
  const statsGroup = tweetContainer.querySelector('div[role="group"]');
  const replyCount = parseCount(
    statsGroup?.querySelector('[data-testid="reply"] span')?.textContent ??
      undefined
  );
  const retweetCount = parseCount(
    statsGroup?.querySelector('[data-testid="retweet"] span')?.textContent ??
      undefined
  );
  const likeCount = parseCount(
    statsGroup?.querySelector('[data-testid="like"] span')?.textContent ??
      undefined
  );
  const viewCount = parseCount(
    statsGroup?.querySelector('a[href*="/analytics"] span')?.textContent ??
      undefined
  );
  const bookmarkCount = parseCount(
    statsGroup?.querySelector('[data-testid="bookmark"] span')?.textContent ??
      undefined
  );

  // Verified status
  const isVerified = !!tweetContainer.querySelector(
    'svg[data-testid="icon-verified"]'
  );

  // Profile image URL
  const profileImageEl = tweetContainer.querySelector(
    'div[data-testid="Tweet-User-Avatar"] img'
  );
  const profileImageUrl = profileImageEl?.getAttribute("src") || "";

  // Tweet URL
  const tweetLinkEl = tweetContainer.querySelector('a[href*="/status/"] time')
    ?.parentElement as HTMLAnchorElement;
  const tweetUrl = tweetLinkEl
    ? `https://x.com${tweetLinkEl.getAttribute("href")}`
    : "";

  return {
    username,
    handle,
    timestamp,
    content,
    media: media.length > 0 ? media : undefined,
    replyCount,
    retweetCount,
    likeCount,
    viewCount,
    bookmarkCount,
    isVerified,
    profileImageUrl,
    tweetUrl,
  };
}

// Helper to parse counts (e.g., "1万" -> 10000, "3,016万" -> 30160000)
function parseCount(text?: string): number {
  if (!text) return 0;
  text = text.replace(/,/g, ""); // Remove commas
  if (text.includes("万")) {
    const num = parseFloat(text.replace("万", ""));
    return Math.round(num * 10000);
  }
  return parseInt(text) || 0;
}
