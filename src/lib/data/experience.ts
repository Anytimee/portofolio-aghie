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
    work: "Universitas Pamulang (Unpam)",
    role: "S1 Sistem Informasi",
    period: "2026 – Sekarang",
    description:
      "Mempelajari dasar pemrograman dan pengembangan web, sambil membangun proyek pribadi untuk memperkuat skill praktik."
  },
  {
    id: 2,
    type: "project",
    work: "Coffee Shop E-commerce Website",
    role: "Full-stack Developer",
    period: "2026",
    description:
      "Membangun situs e-commerce coffee shop dengan React, Tailwind CSS, Node.js, dan PostgreSQL."
  },
  {
    id: 3,
    type: "project",
    work: "Anime Streaming & Gallery Website",
    role: "Web Developer",
    period: "2024",
    description:
    "Belajar membangun situs streaming dan galeri anime menggunakan Laravel, Node.js, HTML, dan Tailwind CSS."
  },
  {
    id: 4,
    type: "education",
    work: "SMA 2 Pandeglang",
    role: "Student — Social Studies",
    period: "2023 – 2026",
    description:
      "Jurusan IPS dengan ketertarikan pada teknologi, mulai belajar web development secara mandiri."
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