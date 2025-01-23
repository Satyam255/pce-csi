import React, { useState } from 'react';
import { Calendar, Trophy, Users, Code2, Github } from 'lucide-react';
import Confetti from './Confetti';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

interface HackathonDetailProps {
  hackathon: {
    _id: Id<'hackathons'>;
    title: string;
    description: string;
    startDate: number;
    endDate: number;
    maxParticipants: number;
    prizePool?: string;
    technologies: string[];
  };
  onBack: () => void;
}

export default function HackathonDetail({ hackathon, onBack }: HackathonDetailProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [error, setError] = useState('');
  const joinHackathon = useMutation(api.hackathon.joinHackathon);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setError('Team name is required');
      return;
    }

    setIsRegistering(true);
    setError('');

    try {
      await joinHackathon({
        hackathonId: hackathon._id,
        teamName: teamName.trim(),
        githubRepo: githubRepo.trim() || undefined,
      });

      setShowConfetti(true);
      setTimeout(() => {
        onBack();
      }, 5000);
    } catch (error) {
      console.error('Error registering:', error);

      if (error instanceof Error) {
        setError(
          error.message === 'Already participating in this hackathon'
            ? "You're already registered for this hackathon!"
            : error.message === 'Hackathon is full'
            ? 'Sorry, this hackathon is already full. Please try another one.'
            : error.message === 'Unauthorized'
            ? 'Please sign in to register for the hackathon.'
            : error.message === 'Hackathon not found'
            ? 'This hackathon no longer exists.'
            : 'Failed to register. Please try again later.'
        );
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {showConfetti && <Confetti />}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <button onClick={onBack} className="text-[#00FF90] hover:opacity-90 transition-opacity mb-6">
          ← Back to Hackathons
        </button>

        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{hackathon.title}</h1>
            <p className="text-gray-400 text-lg mb-8">{hackathon.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#00FF90]" />
                  <div>
                    <h3 className="font-semibold">Timeline</h3>
                    <p className="text-gray-400">
                      {new Date(hackathon.startDate).toLocaleDateString()} -{' '}
                      {new Date(hackathon.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="text-[#00FF90]" />
                  <div>
                    <h3 className="font-semibold">Participants</h3>
                    <p className="text-gray-400">Max {hackathon.maxParticipants} participants</p>
                  </div>
                </div>

                {hackathon.prizePool && (
                  <div className="flex items-center gap-3">
                    <Trophy className="text-[#00FF90]" />
                    <div>
                      <h3 className="font-semibold">Prize Pool</h3>
                      <p className="text-gray-400">{hackathon.prizePool}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="text-[#00FF90]" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hackathon.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-800 text-[#00FF90] px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <h2 className="text-2xl font-bold mb-6">Register for Hackathon</h2>

              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-[#00FF90] focus:ring-[#00FF90] text-white"
                    required
                    disabled={isRegistering || showConfetti}
                    placeholder="Enter your team name"
                    minLength={2}
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub Repository (Optional)
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="url"
                      value={githubRepo}
                      onChange={(e) => setGithubRepo(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-[#00FF90] focus:ring-[#00FF90] text-white"
                      placeholder="https://github.com/username/repo"
                      disabled={isRegistering || showConfetti}
                      pattern="https://github.com/.*"
                      title="Please enter a valid GitHub repository URL"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    You can add this later if you haven't created the repository yet
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isRegistering || showConfetti}
                  className="w-full bg-[#00FF90] text-black font-semibold py-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isRegistering ? 'Registering...' : showConfetti ? 'Registered!' : 'Register for Hackathon'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
