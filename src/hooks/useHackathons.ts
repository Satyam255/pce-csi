  import { useQuery } from "convex/react";
  import { api } from "../../convex/_generated/api";

  export const useHackathons = (status?: "upcoming" | "active" | "completed") => {
    const allHackathons = useQuery(api.hackathon.getAllHackathons);
    const hackathonsByStatus = status
      ? useQuery(api.hackathon.getHackathonsByStatus, { status })
      : undefined;

    return {
      hackathons: status ? hackathonsByStatus : allHackathons,
      isLoading: status ? hackathonsByStatus === undefined : allHackathons === undefined,
    };
  };