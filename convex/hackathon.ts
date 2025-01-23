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

// Get all hackathons
export const getAllHackathons = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const hackathons = await ctx.db.query("hackathons").collect();
    return hackathons;
  },
});

// Get hackathon by status
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

// Join a hackathon
export const joinHackathon = mutation({
  args: {
    hackathonId: v.id("hackathons"),
    teamName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Check if user is already participating
    const existingParticipant = await ctx.db
      .query("hackathonParticipants")
      .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (existingParticipant) {
      throw new Error("Already participating in this hackathon");
    }

    // Check if hackathon is full
    const hackathon = await ctx.db.get(args.hackathonId);
    if (!hackathon) throw new Error("Hackathon not found");

    const participantCount = await ctx.db
      .query("hackathonParticipants")
      .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
      .collect();

    if (participantCount.length >= hackathon.maxParticipants) {
      throw new Error("Hackathon is full");
    }

    return await ctx.db.insert("hackathonParticipants", {
      hackathonId: args.hackathonId,
      userId: identity.subject,
      joinedAt: Date.now(),
      teamName: args.teamName,
    });
  },
});