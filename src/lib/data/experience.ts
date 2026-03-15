/**
 * Experience data for SMA/High School student portfolio
 * 
 * Type categories:
 * - education: Formal schooling (SMA, kursus, dll)
 * - project: Personal or school projects
 * - extracurricular: Club activities, organizations
 * - internship: Internship or work experience
 * - competition: Competitions, competitions, olympiads
 * 
 * Edit the content below to personalize your portfolio!
 * Look for [placeholders] - replace them with your actual information
 */

export const experience = [
  {
    id: 1,
    type: "education",
    work: "SMA 2 Pandeglang",
    role: "Siswa",
    period: "2023 - 2026",
    description: "A Social Studies major with active participation in both academic and extracurricular activities."
  },
  {
    id: 2,
    type: "project",
    title: "Anime Streaming, Movie Platform & Gallery",
    role: "Full-stack Developer",
    period: "2024 - 2025",
    description: "Developed multiple hobby-based projects including an anime streaming site, movie platform, and image gallery. Built using Laravel, Bootstrap, and TailwindCSS to strengthen back-end and front-end development skills."
  },
  {
    id: 3,
    type: "project",
    title: "E-commerce & Coffee Shop Website",
    role: "Full-stack Developer",
    period: "2026",
    description: "Completed two full-stack projects within two weeks: an E-commerce platform and a Coffee shop website. Built with React.js, Node.js, and TailwindCSS, utilizing AI-assisted development to accelerate workflow and implement modern UI/UX patterns."
  }
];

/**
 * Helper function to get icon name based on type
 */
export function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    education: "graduation-cap",
    project: "code",
    extracurricular: "users",
    internship: "briefcase",
    competition: "trophy"
  };
  return icons[type] || "briefcase";
}

/**
 * Helper function to get display name for type
 */
export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    education: "Pendidikan",
    project: "Proyek",
    extracurricular: "Ekstrakurikuler",
    internship: "Magang",
    competition: "Kompetisi"
  };
  return labels[type] || "Pengalaman";
}
