// "use client";

// import React, { useState } from 'react';

// import { useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import { api } from "../../../../convex/_generated/api";
// import { useHackathons } from '@/hooks/useHackathons';
// import { PlusCircle, Calendar, Trophy, Users, Code2 } from 'lucide-react';
// import { Id } from '../../../../convex/_generated/dataModel';

// function App() {
//   const { user } = useUser();
//   const [selectedStatus, setSelectedStatus] = useState<"upcoming" | "active" | "completed">("upcoming");
//   const { hackathons, isLoading } = useHackathons(selectedStatus);
//   const createHackathon = useMutation(api.hackathon.createHackathon);
//   const joinHackathon = useMutation(api.hackathon.joinHackathon);

//   const [isCreating, setIsCreating] = useState(false);
//   const [newHackathon, setNewHackathon] = useState({
//     title: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     maxParticipants: 50,
//     prizePool: '',
//     technologies: [] as string[],
//   });

//   const handleCreateHackathon = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await createHackathon({
//         ...newHackathon,
//         startDate: new Date(newHackathon.startDate).getTime(),
//         endDate: new Date(newHackathon.endDate).getTime(),
//         technologies: newHackathon.technologies,
//       });
//       setIsCreating(false);
//       setNewHackathon({
//         title: '',
//         description: '',
//         startDate: '',
//         endDate: '',
//         maxParticipants: 50,
//         prizePool: '',
//         technologies: [],
//       });
//     } catch (error) {
//       console.error('Error creating hackathon:', error);
//     }
//   };

//   const handleJoinHackathon = async (hackathonId: Id<"hackathons">) => {
//     try {
//       await joinHackathon({ hackathonId });
//     } catch (error) {
//       console.error('Error joining hackathon:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-gray-900">Hackathon Hub</h1>
//             <button
//               onClick={() => setIsCreating(true)}
//               className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//             >
//               <PlusCircle size={20} />
//               Create Hackathon
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex gap-4 mb-8">
//           {(['upcoming', 'active', 'completed'] as const).map((status) => (
//             <button
//               key={status}
//               onClick={() => setSelectedStatus(status)}
//               className={`px-4 py-2 rounded-md ${
//                 selectedStatus === status
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-white text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </button>
//           ))}
//         </div>

//         {isLoading ? (
//           <div className="text-center py-8">Loading...</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {hackathons?.map((hackathon) => (
//               <div key={hackathon._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 {hackathon.image && (
//                   <img
//                     src={hackathon.image}
//                     alt={hackathon.title}
//                     className="w-full h-48 object-cover"
//                   />
//                 )}
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold mb-2">{hackathon.title}</h3>
//                   <p className="text-gray-600 mb-4">{hackathon.description}</p>
                  
//                   <div className="flex items-center gap-2 text-gray-500 mb-2">
//                     <Calendar size={16} />
//                     <span>
//                       {new Date(hackathon.startDate).toLocaleDateString()} -{' '}
//                       {new Date(hackathon.endDate).toLocaleDateString()}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center gap-2 text-gray-500 mb-2">
//                     <Users size={16} />
//                     <span>Max {hackathon.maxParticipants} participants</span>
//                   </div>
                  
//                   {hackathon.prizePool && (
//                     <div className="flex items-center gap-2 text-gray-500 mb-2">
//                       <Trophy size={16} />
//                       <span>Prize Pool: {hackathon.prizePool}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex items-center gap-2 text-gray-500 mb-4">
//                     <Code2 size={16} />
//                     <div className="flex flex-wrap gap-2">
//                       {hackathon.technologies.map((tech) => (
//                         <span
//                           key={tech}
//                           className="bg-gray-100 px-2 py-1 rounded-md text-sm"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <button
//                     onClick={() => handleJoinHackathon(hackathon._id)}
//                     className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                   >
//                     Join Hackathon
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {isCreating && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
//             <h2 className="text-2xl font-bold mb-6">Create New Hackathon</h2>
//             <form onSubmit={handleCreateHackathon}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Title</label>
//                   <input
//                     type="text"
//                     value={newHackathon.title}
//                     onChange={(e) => setNewHackathon({ ...newHackathon, title: e.target.value })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     value={newHackathon.description}
//                     onChange={(e) => setNewHackathon({ ...newHackathon, description: e.target.value })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     rows={3}
//                     required
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                     <input
//                       type="datetime-local"
//                       value={newHackathon.startDate}
//                       onChange={(e) => setNewHackathon({ ...newHackathon, startDate: e.target.value })}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">End Date</label>
//                     <input
//                       type="datetime-local"
//                       value={newHackathon.endDate}
//                       onChange={(e) => setNewHackathon({ ...newHackathon, endDate: e.target.value })}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Max Participants</label>
//                   <input
//                     type="number"
//                     value={newHackathon.maxParticipants}
//                     onChange={(e) => setNewHackathon({ ...newHackathon, maxParticipants: parseInt(e.target.value) })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     min="1"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Prize Pool</label>
//                   <input
//                     type="text"
//                     value={newHackathon.prizePool}
//                     onChange={(e) => setNewHackathon({ ...newHackathon, prizePool: e.target.value })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="e.g., $5000"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Technologies</label>
//                   <input
//                     type="text"
//                     value={newHackathon.technologies.join(', ')}
//                     onChange={(e) => setNewHackathon({
//                       ...newHackathon,
//                       technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
//                     })}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="React, Node.js, Python (comma-separated)"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsCreating(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//                 >
//                   Create Hackathon
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

"use client";

import React, { useState } from 'react';

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
  import { api } from "../../../../convex/_generated/api";
import { useHackathons } from '@/hooks/useHackathons';
import { PlusCircle, Calendar, Trophy, Users, Code2 } from 'lucide-react';
import { Id } from '../../../../convex/_generated/dataModel';
import HackathonCard from '@/components/HackathonCard';
import { hackathons } from "@/constants";



export default function App() {
  const { user } = useUser()
  const [selectedStatus, setSelectedStatus] = useState<"upcoming" | "active" | "completed">("upcoming")
  const { hackathons, isLoading } = useHackathons(selectedStatus)
  const createHackathon = useMutation(api.hackathon.createHackathon)
  const joinHackathon = useMutation(api.hackathon.joinHackathon)
  const [isCreating, setIsCreating] = useState(false)
  const [newHackathon, setNewHackathon] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    maxParticipants: 50,
    prizePool: "",
    technologies: [] as string[],
  })

  const handleCreateHackathon = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createHackathon({
        ...newHackathon,
        startDate: new Date(newHackathon.startDate).getTime(),
        endDate: new Date(newHackathon.endDate).getTime(),
        technologies: newHackathon.technologies,
      })
      setIsCreating(false)
      setNewHackathon({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        maxParticipants: 50,
        prizePool: "",
        technologies: [],
      })
    } catch (error) {
      console.error("Error creating hackathon:", error)
    }
  }

  const handleJoinHackathon = async (hackathonId: Id<"hackathons">) => {
    try {
      await joinHackathon({ hackathonId })
    } catch (error) {
      console.error("Error joining hackathon:", error)
    }
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
          {/* Replaced welcome message */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer">
            <Code2 className="text-[#00FF90] mb-4" size={24} />
            <h3 className="text-white text-lg font-semibold mb-2">Web3 Hackathon</h3>
            <p className="text-gray-400">Build the future of decentralized apps</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer">
            <Users className="text-[#00FF90] mb-4" size={24} />
            <h3 className="text-white text-lg font-semibold mb-2">AI Challenge</h3>
            <p className="text-gray-400">Create innovative AI solutions</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer">
            <Calendar className="text-[#00FF90] mb-4" size={24} />
            <h3 className="text-white text-lg font-semibold mb-2">Mobile Dev Jam</h3>
            <p className="text-gray-400">Design next-gen mobile apps</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer">
            <Trophy className="text-[#00FF90] mb-4" size={24} />
            <h3 className="text-white text-lg font-semibold mb-2">Game Dev Quest</h3>
            <p className="text-gray-400">Create engaging game experiences</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Open</h2>
            <button className="text-[#00FF90] hover:opacity-90 transition-opacity">Explore All Hackathons</button>
          </div>
          {/* <div className="grid gap-6 md:grid-cols-2">
            {hackathons.map((hackathon, i) => (
              <HackathonCard key={i} {...hackathon} />
            ))}
          </div> */}77
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons?.map((hackathon) => (
              <div key={hackathon._id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
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

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hackathon.technologies.map((tech) => (
                      <span key={tech} className="bg-gray-800 text-[#00FF90] px-2 py-1 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleJoinHackathon(hackathon._id)}
                    className="w-full bg-[#00FF90] text-black px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                  >
                    Join Hackathon
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

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
                    onChange={(e) => setNewHackathon({ ...newHackathon, title: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#00FF90] focus:ring-[#00FF90]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Description</label>
                  <textarea
                    value={newHackathon.description}
                    onChange={(e) => setNewHackathon({ ...newHackathon, description: e.target.value })}
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
                      onChange={(e) => setNewHackathon({ ...newHackathon, startDate: e.target.value })}
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#00FF90] focus:ring-[#00FF90]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">End Date</label>
                    <input
                      type="datetime-local"
                      value={newHackathon.endDate}
                      onChange={(e) => setNewHackathon({ ...newHackathon, endDate: e.target.value })}
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
                  className="px-4 py-2 text-sm font-medium text-black bg-[#00FF90] rounded-md hover:opacity-90 transition-opacity"
                >
                  Create Hackathon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

