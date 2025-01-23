import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface UserRegistrations {
    registrations: any[];
    isLoading: boolean;
}

export const useUserRegistrations = (userId: string): UserRegistrations => {
    const registrations = useQuery(api.hackathonParticipants.getRegistrationsByUser, { userId });

    return {
        registrations: registrations || [],
        isLoading: registrations === undefined,
    };
};  