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
    members: v.array(
      v.object({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        college: v.string(),
        resumeUrl: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    try {
      // Step 1: Check authentication
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        console.error("Authentication failed: No user identity");
        throw new Error("Unauthorized");
      }
      console.log("User authenticated:", identity.subject);

      // Step 2: Validate hackathon exists
      const hackathon = await ctx.db.get(args.hackathonId);
      if (!hackathon) {
        console.error("Hackathon not found:", args.hackathonId);
        throw new Error("Hackathon not found");
      }
      console.log("Hackathon found:", hackathon._id);

      // Step 3: Check for existing participation
      const existingParticipant = await ctx.db
        .query("hackathonParticipants")
        .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .first();

      if (existingParticipant) {
        console.error("User already participating:", identity.subject);
        throw new Error("Already participating in this hackathon");
      }
      console.log("No existing participation found");

      // Step 4: Check participant limit
      const participants = await ctx.db
        .query("hackathonParticipants")
        .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
        .collect();

      if (participants.length >= hackathon.maxParticipants) {
        console.error("Hackathon is full. Current participants:", participants.length);
        throw new Error("Hackathon is full");
      }
      console.log("Space available in hackathon");

      // Step 5: Create participant entry
      console.log("Creating participant entry...");
      const participant = await ctx.db.insert("hackathonParticipants", {
        hackathonId: args.hackathonId,
        userId: identity.subject,
        joinedAt: Date.now(),
        teamName: args.teamName,
        githubRepo: args.githubRepo,
      });
      console.log("Participant entry created:", participant);

      // Step 6: Create team members
      console.log("Creating team members...");
      const memberPromises = args.members.map(async (member, index) => {
        try {
          const teamMember = await ctx.db.insert("teamMembers", {
            participantId: participant,
            ...member,
          });
          console.log(`Team member ${index + 1} created:`, teamMember);
          return teamMember;
        } catch (error) {
          console.error(`Error creating team member ${index + 1}:`, error);
          throw error;
        }
      });

      await Promise.all(memberPromises);
      console.log("All team members created successfully");

      return participant;
    } catch (error) {
      console.error("Registration failed:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Registration failed");
    }
  },
});

// Add new query for user registrations
export const getUserRegistrations = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db
      .query("hackathonParticipants")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

// Add query to check if user is registered for a specific hackathon
export const isUserRegistered = query({
  args: { hackathonId: v.id("hackathons") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const registration = await ctx.db
      .query("hackathonParticipants")
      .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    return !!registration;
  },
});