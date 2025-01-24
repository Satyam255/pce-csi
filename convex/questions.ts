import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Queries and mutations
export const getQuestions = query({
  handler: async (ctx) => {
    return await ctx.db.query("questions").order("desc").collect();
  },
});

export const createQuestion = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    userId: v.string(),
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("questions", {
      ...args,
      votes: 0,
      answered: false,
      createdAt: Date.now(),
    });
  },
});

export const voteQuestion = mutation({
  args: {
    questionId: v.id("questions"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const { questionId, userId } = args;

    // Check if the user has already voted
    const existingVote = await ctx.db
      .query("votes")
      .filter((q) =>
        q
          .eq(q.field("questionId"), questionId)
          && q.eq(q.field("userId"), userId)
      )
      .first();

    const question = await ctx.db.get(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (existingVote) {
      // Remove the vote
      await ctx.db.delete(existingVote._id);
      await ctx.db.patch(questionId, { votes: question.votes - 1 });
    } else {
      // Add the vote
      await ctx.db.insert("votes", { questionId, userId });
      await ctx.db.patch(questionId, { votes: question.votes + 1 });
    }
  },
});