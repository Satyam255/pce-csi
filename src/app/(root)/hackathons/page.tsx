"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useHackathons } from "@/hooks/useHackathons";
import { PlusCircle, Calendar, Users } from "lucide-react";
import HackathonDetail from "@/components/HackathonDetail";

export default function Page() {
  const { user } = useUser();
  const [selectedHackathon, setSelectedHackathon] = useState<any>(null);
  const { hackathons, isLoading } = useHackathons("upcoming");
  const [isCreating, setIsCreating] = useState(false);
  const createHackathon = useMutation(api.hackathon.createHackathon);

  // State for the new hackathon form
  const [newHackathon, setNewHackathon] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    maxParticipants: 50,
    technologies: [] as string[],
  });

  // Handle creating a new hackathon
  const handleCreateHackathon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createHackathon({
        ...newHackathon,
        startDate: new Date(newHackathon.startDate).getTime(),
        endDate: new Date(newHackathon.endDate).getTime(),
        technologies: newHackathon.technologies,
      });
      setIsCreating(false);
      setNewHackathon({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        maxParticipants: 50,
        technologies: [],
      });
    } catch (error) {
      console.error("Error creating hackathon:", error);
    }
  };

  if (selectedHackathon) {
    return (
      <HackathonDetail
        hackathon={selectedHackathon}
        onBack={() => setSelectedHackathon(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 bg-[#00FF90] text-black px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              <PlusCircle size={20} />
              Create Hackathon
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-[#00FF90] mb-2">Featured Hackathons</h2>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons?.map((hackathon) => (
              <div
                key={hackathon._id}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 cursor-pointer hover:border-[#00FF90] transition-colors"
                onClick={() => setSelectedHackathon(hackathon)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{hackathon.title}</h3>
                  <p className="text-gray-400 mb-4">{hackathon.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={16} />
                      <span>
                        {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                        {new Date(hackathon.endDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Users size={16} />
                      <span>Max {hackathon.maxParticipants} participants</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hackathon.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-800 text-[#00FF90] px-2 py-1 rounded-md text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Hackathon Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Hackathon</h2>
            <form onSubmit={handleCreateHackathon}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Title</label>
                  <input
                    type="text"
                    value={newHackathon.title}
                    onChange={(e) =>
                      setNewHackathon({ ...newHackathon, title: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#00FF90] focus:ring-[#00FF90]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Description</label>
                  <textarea
                    value={newHackathon.description}
                    onChange={(e) =>
                      setNewHackathon({ ...newHackathon, description: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#00FF90] focus:ring-[#00FF90]"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Start Date</label>
                    <input
                      type="datetime-local"
                      value={newHackathon.startDate}
                      onChange={(e) =>
                        setNewHackathon({ ...newHackathon, startDate: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#00FF90] focus:ring-[#00FF90]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">End Date</label>
                    <input
                      type="datetime-local"
                      value={newHackathon.endDate}
                      onChange={(e) =>
                        setNewHackathon({ ...newHackathon, endDate: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#00FF90] focus:ring-[#00FF90]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Technologies</label>
                  <input
                    type="text"
                    value={newHackathon.technologies.join(", ")}
                    onChange={(e) =>
                      setNewHackathon({
                        ...newHackathon,
                        technologies: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#00FF90] focus:ring-[#00FF90]"
                    placeholder="React, Node.js, Python (comma-separated)"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-black bg-[#00FF90] rounded-md hover:bg-[#00e680]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
