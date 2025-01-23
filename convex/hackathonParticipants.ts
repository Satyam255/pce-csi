// convex/api/hackathonParticipants.js
import { mutation, query } from "./_generated/server";


export const getRegistrationsByUser = query(async ({ db }, { userId }: { userId: string }) => {
  return await db
    .query("hackathonParticipants")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .collect();
});
