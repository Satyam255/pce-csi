import { Octokit } from 'octokit';

// Initialize Octokit with your GitHub token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface RepoDetails {
  name: string;
  description: string;
  url: string;
  commits: number;
  branches: number;
  pullRequests: number;
}

export async function getRepoDetails(owner: string, repo: string): Promise<RepoDetails> {
  try {
    const [repoData, commits, branches, pulls] = await Promise.all([
      octokit.rest.repos.get({ owner, repo }),
      octokit.rest.repos.getCommitActivityStats({ owner, repo }),
      octokit.rest.repos.listBranches({ owner, repo }),
      octokit.rest.pulls.list({ owner, repo, state: 'all' })
    ]);

    return {
      name: repoData.data.name,
      description: repoData.data.description || '',
      url: repoData.data.html_url,
      commits: commits.data?.reduce((acc, week) => acc + week.total, 0) || 0,
      branches: branches.data.length,
      pullRequests: pulls.data.length
    };
  } catch (error) {
    console.error('Error fetching repository details:', error);
    throw error;
  }
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') return null;
    
    const [, owner, repo] = urlObj.pathname.split('/');
    if (!owner || !repo) return null;
    
    return { owner, repo: repo.replace('.git', '') };
  } catch {
    return null;
  }
}