// Data fetcher for calculating GitHub score
// Always returns data in format: { data: T | null, error: string | null }
// This is a wrapper that calls the server action directly

import { calculateScore } from '@/actions/calculate-score';

interface CalculateScoreResponse {
  username: string;
  totalScore: number;
  maxTotalScore: number;
  percentage: number;
  categories: Array<{
    category: string;
    score: number;
    maxScore: number;
    details: Record<string, unknown>;
  }>;
  profileData: {
    name: string | null;
    bio: string | null;
    location: string | null;
    avatarUrl: string;
    followers: number;
    following: number;
  };
}

interface CalculateScoreResult {
  data: CalculateScoreResponse | null;
  error: string | null;
}

export async function fetchCalculateScore(
  targetUsername: string
): Promise<CalculateScoreResult> {
  // Call the server action directly
  return await calculateScore(targetUsername);
}

