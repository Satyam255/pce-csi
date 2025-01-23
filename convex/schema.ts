  import { defineSchema, defineTable } from "convex/server";
  import { v } from "convex/values";

  export default defineSchema({
    users: defineTable({
      name: v.string(),
      email: v.string(),
      image: v.optional(v.string()),
      role: v.union(v.literal("candidate"), v.literal("interviewer")),
      clerkId: v.string(),
    }).index("by_clerk_id", ["clerkId"]),

    interviews: defineTable({
      title: v.string(),
      description: v.optional(v.string()),
      startTime: v.number(),
      endTime: v.optional(v.number()),
      status: v.string(),
      streamCallId: v.string(),
      candidateId: v.string(),
      interviewerIds: v.array(v.string()),
    })
      .index("by_candidate_id", ["candidateId"])
      .index("by_stream_call_id", ["streamCallId"]),

    comments: defineTable({
      content: v.string(),
      rating: v.number(),
      interviewerId: v.string(),
      interviewId: v.id("interviews"),
    }).index("by_interview_id", ["interviewId"]),

    hackathons: defineTable({
      title: v.string(),
      description: v.string(),
      startDate: v.number(),
      endDate: v.number(),
      maxParticipants: v.number(),
      prizePool: v.optional(v.string()),
      status: v.union(v.literal("upcoming"), v.literal("active"), v.literal("completed")),
      creatorId: v.string(),
      image: v.optional(v.string()),
      technologies: v.array(v.string()),
    }).index("by_status", ["status"]),

    hackathonParticipants: defineTable({
      hackathonId: v.id("hackathons"),
      userId: v.string(),
      joinedAt: v.number(),
      teamName: v.string(),
      githubRepo: v.optional(v.string()),
    })
      .index("by_hackathon", ["hackathonId"])
      .index("by_user", ["userId"]),
  });