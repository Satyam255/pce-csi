import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    hackathonId: v.id("hackathons"),
    teamId: v.id("hackathonParticipants"),
    githubRepo: v.optional(v.string()),
    progress: v.number(),
    status: v.union(
      v.literal("draft"),
      v.literal("in-progress"),
      v.literal("submitted"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      ...args,
      submittedAt: Date.now()
    });
  }
});

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  }
});

export const getByHackathon = query({
  args: { hackathonId: v.id("hackathons") },
  handler: async (ctx, args) => {
    return await ctx.db.query("projects")
      .filter(q => q.eq(q.field("hackathonId"), args.hackathonId))
      .collect();
  }
});