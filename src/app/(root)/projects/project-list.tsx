"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, GitCommit, GitPullRequest } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const projects = [
  {
    id: 1,
    name: "DecentralArt Market",
    description: "A decentralized marketplace for digital artists",
    progress: 75,
    team: "Web3 Innovators",
    lastUpdated: "2 hours ago",
    commits: 156,
    branches: 4,
    pullRequests: 8,
    tags: ["Web3", "Marketplace", "Art"],
  },
  {
    id: 2,
    name: "HealthGuard AI",
    description: "AI-powered health monitoring system",
    progress: 45,
    team: "AI Health Assistant",
    lastUpdated: "5 hours ago",
    commits: 89,
    branches: 3,
    pullRequests: 5,
    tags: ["Healthcare", "AI/ML", "Monitoring"],
  },
];

export default function ProjectList() {
  return (
    <div className="space-y-6"> 
      {projects.map((project) => (
        <Card key={project.id} className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <div className="text-sm text-muted-foreground">
                Updated {project.lastUpdated}
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <GitCommit className="h-4 w-4 mr-1" />
                {project.commits} commits
              </div>
              <div className="flex items-center">
                <GitBranch className="h-4 w-4 mr-1" />
                {project.branches} branches
              </div>
              <div className="flex items-center">
                <GitPullRequest className="h-4 w-4 mr-1" />
                {project.pullRequests} pull requests
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}