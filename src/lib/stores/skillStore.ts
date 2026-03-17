import { writable } from 'svelte/store';

export interface Skill {
    name: string;
    category: 'languages' | 'frontend' | 'backend' | 'tools';
}

const STORAGE_KEY = 'portfolio_skills';
const isBrowser = typeof window !== 'undefined';

// Default skills from the original data
const initialSkills: Skill[] = [
    // Languages
    { name: "JavaScript", category: "languages" },
    { name: "TypeScript", category: "languages" },
    { name: "Python", category: "languages" },
    { name: "SQL", category: "languages" },
    // Frontend
    { name: "React", category: "frontend" },
    { name: "Svelte/SvelteKit", category: "frontend" },
    { name: "TailwindCSS", category: "frontend" },
    { name: "HTML/CSS", category: "frontend" },
    // Backend
    { name: "Node.js", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "REST APIs", category: "backend" },
    // Tools
    { name: "Git", category: "tools" },
    { name: "Vercel", category: "tools" },
    { name: "Figma", category: "tools" }
];

function createSkillStore() {
    // Try to load from localStorage
    let storedSkills: Skill[] = initialSkills;
    if (isBrowser) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                storedSkills = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored skills', e);
            }
        }
    }

    const { subscribe, set, update } = writable<Skill[]>(storedSkills);

    // Save to localStorage whenever skills change
    function persist(skills: Skill[]) {
        if (isBrowser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
        }
    }

    return {
        subscribe,
        addSkill: (skill: Skill) => {
            update(skills => {
                const updated = [...skills, skill];
                persist(updated);
                return updated;
            });
        },
        updateSkill: (oldName: string, newSkill: Skill) => {
            update(skills => {
                const updated = skills.map(s =>
                    s.name === oldName ? newSkill : s
                );
                persist(updated);
                return updated;
            });
        },
        deleteSkill: (name: string) => {
            update(skills => {
                const updated = skills.filter(s => s.name !== name);
                persist(updated);
                return updated;
            });
        },
        reset: () => {
            set(initialSkills);
            persist(initialSkills);
        }
    };
}

export const skillStore = createSkillStore();

// Helper function to get skills by category
export function getSkillsByCategory(skills: Skill[], category: string): Skill[] {
    return skills.filter(s => s.category === category);
}
