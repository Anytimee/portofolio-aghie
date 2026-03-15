/**
 * Experience data for Full Stack Developer portfolio
 * 
 * Type categories:
 * - education: Formal schooling
 * - project: Personal or professional projects
 * - internship: Internship or work experience
 * - certification: Certifications and courses
 * - competition: Competitions, olympiads
 */

export const experience = [
  {
    id: 1,
    type: "education",
    work: "SMA 2 Pandeglang",
    role: "Student",
    period: "2023 - 2026",
    description: "Social Studies major with a passion for technology and web development."
  },
  {
    id: 2,
    type: "project",
    role: "Full-stack Developer",
    period: "2024 - 2025",
    description: "Developed an anime streaming and gallery website using Laravel, HTML, Node.js, and TailwindCSS."
  },
  {
    id: 3,
    type: "project",
    role: "Full-stack Developer",
    period: "2025",
    description: "Developed a beautiful e-commerce and coffee shop website with React, tailwindCSS nodejs and postgreSQL."
  },
];

/**
 * Helper function to get icon name based on type
 */
export function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    education: "graduation-cap",
    project: "code",
    internship: "briefcase",
    certification: "award",
    competition: "trophy"
  };
  return icons[type] || "briefcase";
}

/**
 * Helper function to get display name for type
 */
export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    education: "Education",
    project: "Projects",
    internship: "Internship",
    certification: "Certification",
    competition: "Competition"
  };
  return labels[type] || "Experience";
}
