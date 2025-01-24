
import React from "react";
import { projects } from "@/constants";

const LeadershipPage = () => {
  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-6xl mx-auto bg-black p-8">
        <h1 className="text-4xl font-bold text-center text-green-500 mb-8">
          Leaderboard
        </h1>
        <h4 className="text-2xl font-bold text-center text-green-500 mb-8">
          Here are some Leading Hackathon Winning projects
        </h4>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700"
            >
              {/* Rank and Title */}
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-xl font-semibold text-green-500 mr-6">
                  #{index + 1}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Status:{" "}
                    <span className="font-semibold text-green-400">
                      {project.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Start Date:{" "}
                    <span className="font-semibold text-white">
                      {project.startDate}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    End Date:{" "}
                    <span className="font-semibold text-white">
                      {project.endDate}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Technologies:{" "}
                    <span className="font-semibold text-green-400">
                      {project.technologies.join(", ")}
                    </span>
                  </p>
                </div>
              </div>

              {/* Team and Links */}
              <div className="text-right md:text-left">
                <p className="font-semibold text-white mb-2">Team:</p>
                <ul className="list-none">
                  {project.team.map((member, idx) => (
                    <li key={idx} className="text-sm text-gray-400">
                      - {member.name}{" "}
                      <span className="text-green-400">({member.role})</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex space-x-4">
                  <a
                    href={project.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.socialLinks.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadershipPage;
