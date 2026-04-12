import { NextRequest, NextResponse } from "next/server";
import { getYouTubeStats } from "@/lib/youtube";
import {
  calculateEngagementTotal,
  getEstimatedVirdReward,
  getVirdTier,
} from "@/lib/virdScore";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get("channelId");

    if (!channelId) {
      throw new Error("Missing channelId query parameter");
    }

    const yt = await getYouTubeStats(channelId);

    // For now, YouTube API channel statistics gives us views.
    // Likes/impressions are placeholders until you add more sources.
    const engagementTotal = calculateEngagementTotal({
      youtubeViews: yt.views,
      youtubeLikes: 0,
      youtubeImpressions: 0,
      tiktokViews: 0,
      tiktokLikes: 0,
      tiktokImpressions: 0,
    });

    const tier = getVirdTier(engagementTotal);
    const estimatedVirdReward = getEstimatedVirdReward(tier);

    return NextResponse.json({
      channelId,
      youtube: yt,
      engagementTotal,
      tier,
      estimatedVirdReward,
      tierThresholds: {
        bronze: 1_000,
        silver: 100_000,
        gold: 500_000,
        platinum: 1_000_000,
      },
    });
  } catch (err: any) {
    console.error("Rewards route error:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}