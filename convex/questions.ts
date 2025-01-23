// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// export const getQuestions = query({
//   args: {},
//   handler: async (ctx) => {
//     return await ctx.db.query("questions").order("desc").collect();
//   },
// });

// export const createQuestion = mutation({
//   args: {
//     title: v.string(),
//     content: v.string(),
//     userId: v.string(),
//     userName: v.string(),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("questions", {
//       ...args,
//       votes: 0,
//       answered: false,
//       createdAt: Date.now(),
//     });
//   },
// });

// export const voteQuestion = mutation({
//   args: {
//     questionId: v.id("questions"),
//     userId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const existingVote = await ctx.db
//       .query("votes")
//       .filter(
//         (q) =>
//           q.eq(q.field("questionId"), args.questionId) &&
//           q.eq(q.field("userId"), args.userId)
//       )
//       .first();

//     if (existingVote) {
//       await ctx.db.delete(existingVote._id);
//       await ctx.db.patch(args.questionId, {
//         votes: (await ctx.db.get(args.questionId))!.votes - 1,
//       });
//     } else {
//       await ctx.db.insert("votes", args);
//       await ctx.db.patch(args.questionId, {
//         votes: (await ctx.db.get(args.questionId))!.votes + 1,
//       });
//     }
//   },
// });

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
    const existingVote = await ctx.db
      .query("votes")
      .filter(
        (q) =>
          q.eq(q.field("questionId"), args.questionId) &&
          q.eq(q.field("userId"), args.userId)
      )
      .first();

    if (existingVote) {
      await ctx.db.delete(existingVote._id);
      await ctx.db.patch(args.questionId, {
        votes: (await ctx.db.get(args.questionId))!.votes - 1,
      });
    } else {
      await ctx.db.insert("votes", args);
      await ctx.db.patch(args.questionId, {
        votes: (await ctx.db.get(args.questionId))!.votes + 1,
      });
    }
  },
});
