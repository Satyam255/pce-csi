import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new hackathon
export const createHackathon = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    maxParticipants: v.number(),
    prizePool: v.optional(v.string()),
    image: v.optional(v.string()),
    technologies: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("hackathons", {
      ...args,
      creatorId: identity.subject,
      status: "upcoming",
    });
  },
});

export const getAllHackathons = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.query("hackathons").collect();
  },
});

export const getHackathonsByStatus = query({
  args: { status: v.union(v.literal("upcoming"), v.literal("active"), v.literal("completed")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db
      .query("hackathons")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const joinHackathon = mutation({
  args: {
    hackathonId: v.id("hackathons"),
    teamName: v.string(),
    githubRepo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Validate the hackathon
    const hackathon = await ctx.db.get(args.hackathonId);
    if (!hackathon) {
      throw new Error("Hackathon not found");
    }

    // Check if the hackathon is full
    const participants = await ctx.db
      .query("hackathonParticipants")
      .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
      .collect();

    if (participants.length >= hackathon.maxParticipants) {
      throw new Error("Hackathon is full");
    }

    // Check if the user is already registered
    const existingParticipant = await ctx.db
      .query("hackathonParticipants")
      .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (existingParticipant) {
      throw new Error("Already participating in this hackathon");
    }

    // Register the user
    await ctx.db.insert("hackathonParticipants", {
      hackathonId: args.hackathonId,
      userId: identity.subject,
      joinedAt: Date.now(),
      teamName: args.teamName,
      githubRepo: args.githubRepo,
    });

    return { success: true, message: "Successfully registered for the hackathon!" };
  },
});