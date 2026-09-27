// Server-only. Pulls recent posts from the Positive Print & Promotion
// Instagram Business account via the Meta Graph API, so they can be
// blended into the Studio Journal alongside Sanity-authored posts.
//
// Requires two environment variables (set in Vercel → Project → Settings
// → Environment Variables — never commit real values here):
//   INSTAGRAM_ACCESS_TOKEN        long-lived Instagram Graph API token
//   INSTAGRAM_BUSINESS_ACCOUNT_ID the linked Instagram Business Account ID
//
// If either is missing, or the Graph API call fails for any reason (token
// expired, network issue, account not yet linked), this quietly returns an
// empty array so the Journal page still renders fine with just Sanity
// posts — the site never breaks because of an Instagram hiccup.

const GRAPH_API_VERSION = "v21.0";
const MAX_POSTS = 12;

export type InstagramPost = {
  id: string;
  caption: string | null;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string | null;
  thumbnailUrl: string | null;
  permalink: string;
  timestamp: string; // ISO 8601
};

type GraphMediaResponse = {
  data?: Array<{
    id: string;
    caption?: string;
    media_type?: string;
    media_url?: string;
    thumbnail_url?: string;
    permalink?: string;
    timestamp?: string;
  }>;
  error?: { message?: string };
};

function isInstagramConfigured() {
  return Boolean(
    process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  );
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  if (!isInstagramConfigured()) return [];

  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
  ].join(",");

  const url =
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${accountId}/media` +
    `?fields=${fields}&limit=${MAX_POSTS}&access_token=${accessToken}`;

  try {
    const res = await fetch(url, {
      // Cache for 5 minutes on the server, same as the rest of the site's
      // Sanity-backed content — keeps this well within Graph API rate
      // limits without needing a webhook or cron job.
      next: { revalidate: 300 },
    });

    const json: GraphMediaResponse = await res.json();

    if (!res.ok || json.error) {
      console.error("Instagram Graph API error:", json.error?.message ?? res.statusText);
      return [];
    }

    if (!Array.isArray(json.data)) return [];

    return json.data
      .filter((item) => item.media_type !== "VIDEO" || item.thumbnail_url) // need something to show
      .map((item) => ({
        id: item.id,
        caption: item.caption ?? null,
        mediaType: (item.media_type as InstagramPost["mediaType"]) ?? "IMAGE",
        mediaUrl: item.media_url ?? null,
        thumbnailUrl: item.thumbnail_url ?? null,
        permalink: item.permalink ?? "https://instagram.com",
        timestamp: item.timestamp ?? new Date().toISOString(),
      }));
  } catch (err) {
    console.error("Instagram Graph API request failed:", err);
    return [];
  }
}

// Turns an Instagram caption's first line (or first ~80 chars) into a
// short display title, since Instagram posts don't have a "title" field
// the way Sanity journal posts do.
export function instagramPostTitle(post: InstagramPost): string {
  if (!post.caption) return "Instagram update";
  const firstLine = post.caption.split("\n")[0].trim();
  if (firstLine.length <= 80) return firstLine;
  return firstLine.slice(0, 77).trimEnd() + "…";
}
