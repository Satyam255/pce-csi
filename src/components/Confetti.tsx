import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { useHackathons } from '../hooks/useHackathons';
import { PlusCircle, Calendar, Trophy, Users, Code2 } from 'lucide-react';
import HackathonDetail from '../components/HackathonDetail';

export default function Page() {
  const { user } = useUser();
  const [selectedHackathon, setSelectedHackathon] = useState<any>(null);
  const { hackathons, isLoading } = useHackathons("upcoming");
  const [isCreating, setIsCreating] = useState(false);

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
    </div>
  );
}