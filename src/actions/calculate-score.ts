'use server';

import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/config/auth';

// Server action for calculating GitHub score
// Always returns data in format: { data: T | null, error: string | null }

interface GitHubScore {
  category: string;
  score: number;
  maxScore: number;
  details: Record<string, unknown>;
}

interface GitHubUserData {
  id: string;
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  avatarUrl: string;
  websiteUrl: string | null;
  createdAt: string;
  updatedAt: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  gists: { totalCount: number };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
    };
    totalCommitContributions: number;
    totalIssueContributions: number;
    totalPullRequestContributions: number;
    totalPullRequestReviewContributions: number;
  };
  repository: {
    name: string;
    readme: {
      __typename: string;
    } | null;
  } | null;
  repositories: {
    totalCount: number;
    nodes: Array<{
      name: string;
      description: string | null;
      url: string;
      stargazerCount: number;
      forkCount: number;
      primaryLanguage: { name: string } | null;
      createdAt: string;
      pushedAt: string;
      hasIssuesEnabled: boolean;
      isArchived: boolean;
      homepageUrl: string | null;
      readme: {
        __typename: string;
      } | null;
    }>;
  };
  pullRequests: {
    totalCount: number;
    nodes: Array<{
      repository: {
        owner: { login: string };
        name: string;
        isPrivate: boolean;
      };
      mergedAt: string | null;
    }>;
  };
}

interface GitHubGraphQLResponse {
  data?: {
    user: GitHubUserData;
  };
  errors?: Array<{ message: string }>;
}

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

function calculateGitHubScores(userData: GitHubUserData): GitHubScore[] {
  const scores: GitHubScore[] = [];

  // 1. Open Source Contribution Activity (25 points)
  const externalPRs = userData.pullRequests.nodes.filter(
    (pr) => pr.repository.owner.login !== userData.login && !pr.repository.isPrivate
  );
  const uniqueRepos = new Set(
    externalPRs.map(
      (pr) => `${pr.repository.owner.login}/${pr.repository.name}`
    )
  );

  const contributionScore = Math.min(
    25,
    externalPRs.length * 0.5 +
      uniqueRepos.size * 1 +
      userData.contributionsCollection.totalPullRequestContributions * 0.1 +
      Math.min(
        5,
        userData.contributionsCollection.contributionCalendar.totalContributions *
          0.1
      )
  );

  scores.push({
    category: 'Overall Contributions',
    score: Math.round(contributionScore),
    maxScore: 25,
    details: {
      'External PRs merged': externalPRs.length,
      'Unique repos contributed': uniqueRepos.size,
      'Total PR contributions':
        userData.contributionsCollection.totalPullRequestContributions,
      'Total commit contributions last year':
        userData.contributionsCollection.contributionCalendar.totalContributions,
    },
  });

  // 2. Repository Quality (20 points)
  const repos = userData.repositories.nodes.filter((repo) => !repo.isArchived);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazerCount, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forkCount, 0);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const recentRepos = repos.filter((repo) => {
    const pushedDate = new Date(repo.pushedAt);
    return pushedDate > sixMonthsAgo;
  });

  const repoScore = Math.min(
    20,
    Math.min(8, totalStars * 0.1) +
      Math.min(4, totalForks * 0.2) +
      Math.min(4, repos.length * 0.5) +
      Math.min(4, recentRepos.length * 0.8)
  );

  scores.push({
    category: 'Repository Quality',
    score: Math.round(repoScore),
    maxScore: 20,
    details: {
      'Total repositories owned': repos.length,
      'Total stars': totalStars,
      'Total forks': totalForks,
      'Recently active repos': recentRepos.length,
    },
  });

  // 3. Project Presentation (15 points)
  const projectReposWithDescription = repos.filter(
    (repo) => repo.description && repo.description.length > 10
  ).length;

  const projectReposWithReadme = repos.filter(
    (repo) => repo.readme && repo.readme.__typename === 'Blob'
  ).length;

  const projectReposWithLiveLink = repos.filter((repo) => repo.homepageUrl).length;

  const presentationScore = Math.min(
    20,
    Math.min(5, (projectReposWithDescription / Math.max(repos.length, 1)) * 5) +
      Math.min(5, (projectReposWithReadme / Math.max(repos.length, 1)) * 5) +
      Math.min(
        10,
        (projectReposWithLiveLink / Math.max(repos.length, 1)) * 10
      )
  );

  scores.push({
    category: 'Project Presentation',
    score: Math.round(presentationScore),
    maxScore: 20,
    details: {
      'Project repos with description': projectReposWithDescription,
      'Project repos with live link': projectReposWithLiveLink,
      'Project repos with readme': projectReposWithReadme,
    },
  });

  // 4. Technical Diversity (10 points)
  const languages = new Set<string>();
  repos.forEach((repo) => {
    if (repo.primaryLanguage) {
      languages.add(repo.primaryLanguage.name);
    }
  });

  const diversityScore = Math.min(10, languages.size * 2.5);

  scores.push({
    category: 'Technical Diversity',
    score: Math.round(diversityScore),
    maxScore: 10,
    details: {
      'Programming languages': Array.from(languages),
      'Language count': languages.size,
    },
  });

  // 5. Community Engagement (15 points)
  const engagementScore = Math.min(
    15,
    Math.min(3, userData.followers.totalCount * 0.2) +
      Math.min(
        9,
        userData.contributionsCollection.totalIssueContributions * 0.4
      ) +
      Math.min(3, userData.gists.totalCount * 0.5)
  );

  scores.push({
    category: 'Community Engagement',
    score: Math.round(engagementScore),
    maxScore: 15,
    details: {
      Followers: userData.followers.totalCount,
      Following: userData.following.totalCount,
      'Issue contributions':
        userData.contributionsCollection.totalIssueContributions,
      Gists: userData.gists.totalCount,
    },
  });

  // 6. Profile Completeness (10 points)
  const profileScore =
    (userData.name ? 2 : 0) +
    (userData.bio ? 2 : 0) +
    (userData.location ? 2 : 0) +
    (userData.websiteUrl ? 2 : 0) +
    (userData?.repository?.readme?.__typename === 'Blob' ? 2 : 0);

  scores.push({
    category: 'Profile Completeness',
    score: profileScore,
    maxScore: 10,
    details: {
      'Has name':
        userData.name !== null && userData.name.length > 0 ? 'Yes' : 'No',
      'Has bio': userData.bio ? 'Yes' : 'No',
      'Has location': userData.location ? 'Yes' : 'No',
      'Has website': userData.websiteUrl ? 'Yes' : 'No',
      'Has readme':
        userData?.repository?.readme?.__typename === 'Blob' ? 'Yes' : 'No',
    },
  });

  return scores;
}

export async function calculateScore(
  targetUsername: string
): Promise<CalculateScoreResult> {
  try {
    const session = await getServerSession(authOptions);
    const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

    if (!session || !session.accessToken) {
      return {
        data: null,
        error: 'Unauthorized - Please sign in with GitHub',
      };
    }

    if (!targetUsername || !targetUsername.trim()) {
      return {
        data: null,
        error: 'Target username is required',
      };
    }

    const githubToken = session.accessToken;

    // Simplified GitHub data query for limited scopes
    const mainQuery = `
  query($login: String!) {
    user(login: $login) {
      id
      login
      name
      bio
      location
      avatarUrl
      websiteUrl
      createdAt
      updatedAt
      followers { totalCount }
      following { totalCount }
      gists(privacy: PUBLIC) { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
      repository(name: $login) {
        name
        readme: object(expression: "HEAD:README.md") {
          __typename 
        }
      }
      repositories(first: 100, privacy: PUBLIC, ownerAffiliations: [OWNER], isFork: false) {
        totalCount
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage { name }
          createdAt
          pushedAt
          hasIssuesEnabled
          isArchived
          homepageUrl
          readme: object(expression: "HEAD:README.md") {
            __typename
          }
        }
      }
      pullRequests(first: 100, states: [MERGED]) {
        totalCount
        nodes {
          repository {
            owner { login }
            name
            isPrivate
          }
          mergedAt
        }
      }
    }
  }
`;

    const response = await axios.post<GitHubGraphQLResponse>(
      GITHUB_GRAPHQL_API,
      {
        query: mainQuery,
        variables: { login: targetUsername.trim() },
      },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    // Check for GraphQL errors
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
    }

    // Check if response has the expected structure
    if (!data || !data.data || !data.data.user) {
      console.error('Unexpected response structure:', data);
      return {
        data: null,
        error: 'User not found or invalid response from GitHub',
      };
    }

    const userData = data.data.user;

    // Calculate scores for each category
    const scores = calculateGitHubScores(userData);
    const totalScore = scores.reduce((sum, category) => sum + category.score, 0);
    const maxTotalScore = scores.reduce(
      (sum, category) => sum + category.maxScore,
      0
    );

    return {
      data: {
        username: targetUsername.trim(),
        totalScore,
        maxTotalScore,
        percentage: Math.round((totalScore / maxTotalScore) * 100),
        categories: scores,
        profileData: {
          name: userData.name,
          bio: userData.bio,
          location: userData.location,
          avatarUrl: userData.avatarUrl,
          followers: userData.followers.totalCount,
          following: userData.following.totalCount,
        },
      },
      error: null,
    };
  } catch (error) {
    console.error('Error calculating GitHub score:', error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Error calculating GitHub score',
    };
  }
}

