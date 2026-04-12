export async function getYouTubeStats(channelId: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    throw new Error("Missing YOUTUBE_API_KEY in .env.local");
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      `YouTube API request failed: ${res.status} ${JSON.stringify(data)}`
    );
  }

  if (!data.items || data.items.length === 0) {
    throw new Error(`YouTube channel not found. Response: ${JSON.stringify(data)}`);
  }

  const stats = data.items[0].statistics;

  return {
    subscribers: Number(stats.subscriberCount ?? 0),
    views: Number(stats.viewCount ?? 0),
    videos: Number(stats.videoCount ?? 0),
  };
}