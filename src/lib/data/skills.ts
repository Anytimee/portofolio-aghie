import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiMysql,
  SiReact, 
  SiSvelte, 
  SiTailwindcss, 
  SiHtml5, 
  SiCss3,
  SiNodedotjs, 
  SiPostgresql, 
  SiJson,
  SiGit, 
  SiVercel, 
  SiFigma 
} from 'react-icons/si';
import { 
  FaJava, 
  FaDatabase,
  FaCode,
  FaServer,
  FaTools
} from 'react-icons/fa';

export const skills = {
  languages: [
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Python", icon: SiPython },
    { name: "SQL", icon: SiMysql }
  ],
  frontend: [
    { name: "React", icon: SiReact },
    { name: "Svelte/SvelteKit", icon: SiSvelte },
    { name: "TailwindCSS", icon: SiTailwindcss },
    { name: "HTML/CSS", icon: FaCode }
  ],
  backend: [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "REST APIs", icon: SiJson }
  ],
  tools: [
    { name: "Git", icon: SiGit },
    { name: "Vercel", icon: SiVercel },
    { name: "Figma", icon: SiFigma }
  ]
};
