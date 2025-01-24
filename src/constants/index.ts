import { Clock, Code2, Calendar, Users } from "lucide-react";

export const INTERVIEW_CATEGORY = [
  { id: "upcoming", title: "Upcoming Interviews", variant: "outline" },
  { id: "completed", title: "Completed", variant: "secondary" },
  { id: "succeeded", title: "Succeeded", variant: "default" },
  { id: "failed", title: "Failed", variant: "destructive" },
] as const;

export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const QUICK_ACTIONS = [
  {
    icon: Code2,
    title: "New Call",
    description: "Start an instant call",
    color: "primary",
    gradient: "from-primary/10 via-primary/5 to-transparent",
  },
  {
    icon: Users,
    title: "Join Interview",
    description: "Enter via invitation link",
    color: "purple-500",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
  },
  {
    icon: Calendar,
    title: "Schedule",
    description: "Plan upcoming interviews",
    color: "blue-500",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
  },
  {
    icon: Clock,
    title: "Recordings",
    description: "Access past interviews",
    color: "orange-500",
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
  },
];

export const CODING_QUESTIONS: CodeQuestion[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers in the array such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
      python: `def two_sum(nums, target):
    # Write your solution here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
    },
    constraints: [
      "2 ≤ nums.length ≤ 104",
      "-109 ≤ nums[i] ≤ 109",
      "-109 ≤ target ≤ 109",
      "Only one valid answer exists.",
    ],
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}`,
      python: `def reverse_string(s):
    # Write your solution here
    pass`,
      java: `class Solution {
    public void reverseString(char[] s) {
        // Write your solution here
        
    }
}`,
    },
  },
  {
    id: "palindrome-number",
    title: "Palindrome Number",
    description:
      "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation: "121 reads as 121 from left to right and from right to left.",
      },
      {
        input: "x = -121",
        output: "false",
        explanation:
          "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.",
      },
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
  // Write your solution here
  
}`,
      python: `def is_palindrome(x):
    # Write your solution here
    pass`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your solution here
        
    }
}`,
    },
  },
];

export const LANGUAGES = [
  { id: "javascript", name: "JavaScript", icon: "/javascript.png" },
  { id: "python", name: "Python", icon: "/python.png" },
  { id: "java", name: "Java", icon: "/java.png" },
] as const;

export interface CodeQuestion {
  id: string;
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
  constraints?: string[];
}

export type QuickActionType = (typeof QUICK_ACTIONS)[number];




  export const hackathons = [
    {
      title: "Flowathon 2025",
      startDate: "2025-02-09",
      isOnline: false,
      theme: "NO RESTRICTIONS",
      participantCount: 250,
      participants: [
        { name: "User 1", image: "/placeholder.svg" },
        { name: "User 2", image: "/placeholder.svg" },
        { name: "User 3", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
    {
      title: "Mira Hackathon",
      startDate: "2025-01-24",
      isOnline: true,
      theme: "NO RESTRICTIONS",
      participantCount: 250,
      participants: [
        { name: "User 1", image: "/placeholder.svg" },
        { name: "User 2", image: "/placeholder.svg" },
        { name: "User 3", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
    {
      title: "CodeSprint 2025",
      startDate: "2025-03-15",
      isOnline: true,
      theme: "AI & Machine Learning",
      participantCount: 300,
      participants: [
        { name: "Alice", image: "/placeholder.svg" },
        { name: "Bob", image: "/placeholder.svg" },
        { name: "Charlie", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
    {
      title: "DevHack 2025",
      startDate: "2025-04-01",
      isOnline: false,
      theme: "Web Development",
      participantCount: 200,
      participants: [
        { name: "Dave", image: "/placeholder.svg" },
        { name: "Eva", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
    {
      title: "Hackfinity 2025",
      startDate: "2025-05-20",
      isOnline: true,
      theme: "Blockchain and Fintech",
      participantCount: 400,
      participants: [
        { name: "Frank", image: "/placeholder.svg" },
        { name: "Grace", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
    {
      title: "InnovateHack 2025",
      startDate: "2025-06-10",
      isOnline: false,
      theme: "EdTech Innovations",
      participantCount: 350,
      participants: [
        { name: "Hank", image: "/placeholder.svg" },
        { name: "Isla", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
    {
      title: "CyberSecure Hackathon",
      startDate: "2025-07-01",
      isOnline: false,
      theme: "Cybersecurity",
      participantCount: 280,
      participants: [
        { name: "Jake", image: "/placeholder.svg" },
        { name: "Laura", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
    {
      title: "GreenCode Hack",
      startDate: "2025-08-15",
      isOnline: true,
      theme: "Sustainable Technology",
      participantCount: 220,
      participants: [
        { name: "Mike", image: "/placeholder.svg" },
        { name: "Nina", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
    {
      title: "QuantumHack",
      startDate: "2025-09-10",
      isOnline: false,
      theme: "Quantum Computing",
      participantCount: 100,
      participants: [
        { name: "Olivia", image: "/placeholder.svg" },
        { name: "Pete", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
    {
      title: "GameDev Hackathon",
      startDate: "2025-10-05",
      isOnline: true,
      theme: "Game Development",
      participantCount: 300,
      participants: [
        { name: "Quinn", image: "/placeholder.svg" },
        { name: "Rita", image: "/placeholder.svg" },
      ],
      socialLinks: {
        twitter: "#",
        discord: "#",
      },
    },
  ];
  export const projects = [
    {
      title: "AI-Powered Chatbot",
      startDate: "2025-01-15",
      endDate: "2025-02-20",
      status: "In Progress",
      technologies: ["Python", "TensorFlow", "React"],
      team: [
        { name: "Alice", role: "Team Lead", image: "/placeholder.svg" },
        { name: "Bob", role: "Developer", image: "/placeholder.svg" },
        { name: "Charlie", role: "UI/UX Designer", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
    {
      title: "E-Commerce Platform",
      startDate: "2025-02-01",
      endDate: "2025-03-15",
      status: "Completed",
      technologies: ["Node.js", "Express", "MongoDB", "Next.js"],
      team: [
        { name: "Dave", role: "Backend Developer", image: "/placeholder.svg" },
        { name: "Eva", role: "Frontend Developer", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
    {
      title: "Health Monitoring App",
      startDate: "2025-03-10",
      endDate: "2025-04-30",
      status: "Planned",
      technologies: ["Flutter", "Firebase"],
      team: [
        { name: "Frank", role: "Mobile Developer", image: "/placeholder.svg" },
        { name: "Grace", role: "Data Scientist", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
    {
      title: "Blockchain Wallet",
      startDate: "2025-04-01",
      endDate: "2025-05-15",
      status: "In Progress",
      technologies: ["Solidity", "Web3.js", "React"],
      team: [
        { name: "Hank", role: "Blockchain Developer", image: "/placeholder.svg" },
        { name: "Isla", role: "Project Manager", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
    {
      title: "IoT Smart Home",
      startDate: "2025-05-01",
      endDate: "2025-06-10",
      status: "Planned",
      technologies: ["Arduino", "C++", "Node.js"],
      team: [
        { name: "Jake", role: "Hardware Engineer", image: "/placeholder.svg" },
        { name: "Laura", role: "Software Engineer", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
    {
      title: "Social Media Analytics Tool",
      startDate: "2025-06-01",
      endDate: "2025-07-20",
      status: "Completed",
      technologies: ["Python", "Django", "React"],
      team: [
        { name: "Mike", role: "Full Stack Developer", image: "/placeholder.svg" },
        { name: "Nina", role: "Data Analyst", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
    {
      title: "Game Development Platform",
      startDate: "2025-07-15",
      endDate: "2025-09-01",
      status: "In Progress",
      technologies: ["Unity", "C#", "Firebase"],
      team: [
        { name: "Olivia", role: "Game Designer", image: "/placeholder.svg" },
        { name: "Pete", role: "Backend Developer", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
    {
      title: "Green Energy Dashboard",
      startDate: "2025-08-01",
      endDate: "2025-09-15",
      status: "Planned",
      technologies: ["Angular", "Node.js", "MongoDB"],
      team: [
        { name: "Quinn", role: "Frontend Developer", image: "/placeholder.svg" },
        { name: "Rita", role: "Data Scientist", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
    {
      title: "Quantum Computing SDK",
      startDate: "2025-09-10",
      endDate: "2025-11-01",
      status: "Planned",
      technologies: ["Python", "Qiskit"],
      team: [
        { name: "Sam", role: "Quantum Researcher", image: "/placeholder.svg" },
        { name: "Tina", role: "Software Developer", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
    {
      title: "EdTech Learning Platform",
      startDate: "2025-10-01",
      endDate: "2025-12-01",
      status: "In Progress",
      technologies: ["React", "Node.js", "PostgreSQL"],
      team: [
        { name: "Uma", role: "Frontend Developer", image: "/placeholder.svg" },
        { name: "Victor", role: "Backend Developer", image: "/placeholder.svg" },
      ],
      socialLinks: {
        github: "#",
        liveDemo: "#",
      },
    },
  ];
  
  