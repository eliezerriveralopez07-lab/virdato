export type SocialStats = {
  youtubeViews?: number;
  youtubeLikes?: number;
  youtubeImpressions?: number;
  tiktokViews?: number;
  tiktokLikes?: number;
  tiktokImpressions?: number;
};

export type VirdTier = "None" | "Bronze" | "Silver" | "Gold" | "Platinum";

export function calculateEngagementTotal(stats: SocialStats) {
  return (
    (stats.youtubeViews ?? 0) +
    (stats.youtubeLikes ?? 0) +
    (stats.youtubeImpressions ?? 0) +
    (stats.tiktokViews ?? 0) +
    (stats.tiktokLikes ?? 0) +
    (stats.tiktokImpressions ?? 0)
  );
}

export function getVirdTier(total: number): VirdTier {
  if (total >= 1_000_000) return "Platinum";
  if (total >= 500_000) return "Gold";
  if (total >= 100_000) return "Silver";
  if (total >= 1_000) return "Bronze";
  return "None";
}

export function getEstimatedVirdReward(tier: VirdTier): number {
  switch (tier) {
    case "Bronze":
      return 100;
    case "Silver":
      return 1000;
    case "Gold":
      return 5000;
    case "Platinum":
      return 10000;
    default:
      return 0;
  }
}