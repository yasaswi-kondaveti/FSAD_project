// ─── Workshop Data ───────────────────────────────────────────────────────────
export const workshops = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Sarah Chen",
    category: "Development",
    date: "Feb 24, 2026",
    time: "10:00 AM EST",
    duration: "3h",
    capacity: 30,
    registered: 22,
    status: "upcoming",
    level: "Advanced",
    thumbnail: "⚛️",
    color: "#3B82F6",
    description:
      "Deep-dive into advanced React patterns including compound components, render props, and custom hooks. Walk away with practical patterns you can apply to real projects immediately.",
    materials: ["slides.pdf", "starter-code.zip"],
    tags: ["React", "JavaScript", "Hooks"],
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Marcus Rivera",
    category: "Design",
    date: "Feb 26, 2026",
    time: "2:00 PM EST",
    duration: "2h",
    capacity: 25,
    registered: 25,
    status: "full",
    level: "Beginner",
    thumbnail: "🎨",
    color: "#EC4899",
    description:
      "Learn core design principles: typography, color theory, layout, and user-centered thinking. Perfect for developers and aspiring designers who want to build beautiful, usable interfaces.",
    materials: ["design-kit.fig"],
    tags: ["Figma", "Design", "UX"],
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    instructor: "Dr. Priya Nair",
    category: "Data Science",
    date: "Mar 3, 2026",
    time: "11:00 AM EST",
    duration: "4h",
    capacity: 20,
    registered: 8,
    status: "upcoming",
    level: "Intermediate",
    thumbnail: "🤖",
    color: "#10B981",
    description:
      "Introduction to ML concepts, supervised learning, and building your first predictive model with Python and scikit-learn. No prior ML experience needed — just Python basics.",
    materials: ["notebook.ipynb"],
    tags: ["Python", "ML", "Data"],
  },
  {
    id: 4,
    title: "Product Management 101",
    instructor: "James Okafor",
    category: "Business",
    date: "Mar 7, 2026",
    time: "3:00 PM EST",
    duration: "2.5h",
    capacity: 35,
    registered: 19,
    status: "upcoming",
    level: "Beginner",
    thumbnail: "📊",
    color: "#F59E0B",
    description:
      "From ideation to launch — learn how PMs prioritize, plan, and ship products that users love. Covers frameworks like RICE scoring, roadmap building, and stakeholder alignment.",
    materials: ["pm-framework.pdf", "roadmap-template.xlsx"],
    tags: ["Product", "Strategy", "Agile"],
  },
  {
    id: 5,
    title: "Cloud Architecture with AWS",
    instructor: "Lei Zhang",
    category: "Development",
    date: "Feb 20, 2026",
    time: "9:00 AM EST",
    duration: "3h",
    capacity: 20,
    registered: 20,
    status: "live",
    level: "Advanced",
    thumbnail: "☁️",
    color: "#8B5CF6",
    description:
      "Design scalable, fault-tolerant cloud systems using AWS core services and best practices. Covers VPC, EC2, RDS, Lambda, and infrastructure-as-code with Terraform.",
    materials: ["aws-architecture.pdf"],
    tags: ["AWS", "Cloud", "DevOps"],
  },
  {
    id: 6,
    title: "Brand Storytelling",
    instructor: "Amara Diallo",
    category: "Marketing",
    date: "Feb 16, 2026",
    time: "1:00 PM EST",
    duration: "2h",
    capacity: 40,
    registered: 40,
    status: "completed",
    level: "Beginner",
    thumbnail: "✍️",
    color: "#EF4444",
    description:
      "Craft compelling brand narratives that connect emotionally with your audience and drive action. Includes exercises in voice, tone, and content strategy.",
    materials: ["storytelling-guide.pdf", "recording.mp4"],
    tags: ["Marketing", "Content", "Brand"],
  },
];

// ─── Constants ───────────────────────────────────────────────────────────────
export const CATEGORIES = ["All", "Development", "Design", "Data Science", "Business", "Marketing"];
export const STATUSES   = ["All", "upcoming", "live", "full", "completed"];
export const LEVELS     = ["Beginner", "Intermediate", "Advanced"];

export const STATUS_COLORS = {
  upcoming:  "#3B82F6",
  live:      "#EF4444",
  full:      "#6B7280",
  completed: "#10B981",
};

export const STATUS_LABELS = {
  upcoming:  "Upcoming",
  live:      "● Live Now",
  full:      "Full",
  completed: "Completed",
};

export const FILE_ICONS = {
  ".pdf":   "📄",
  ".zip":   "📦",
  ".mp4":   "🎬",
  ".ipynb": "📓",
  ".fig":   "🎨",
  ".xlsx":  "📊",
};

export const getFileIcon = (filename) => {
  const ext = Object.keys(FILE_ICONS).find((e) => filename.endsWith(e));
  return ext ? FILE_ICONS[ext] : "📁";
};

// ─── Admin Stats (static for prototype) ─────────────────────────────────────
export const ADMIN_STATS = [
  { label: "Total Workshops", value: "6",   icon: "📚", trend: "+2 this month",      trendColor: "#10B981" },
  { label: "Registered Users",value: "134", icon: "👥", trend: "+18 this week",       trendColor: "#10B981" },
  { label: "Active Sessions",  value: "1",  icon: "🔴", trend: "Live now",            trendColor: "#EF4444" },
  { label: "Completion Rate",  value: "91%",icon: "🏆", trend: "+3% vs last month",   trendColor: "#10B981" },
];
