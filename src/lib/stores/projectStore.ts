import { writable } from 'svelte/store';

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    demoUrl: string;
    githubUrl: string;
}

const STORAGE_KEY = 'portfolio_projects';
const isBrowser = typeof window !== 'undefined';

function createProjectStore() {
    // Load initial data from localStorage or use default
    const initialProjects: Project[] = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-featured e-commerce platform built with React and Node.js. Features include product management, admin dashboard, user authentication, and payment integration.",
            image: "/project1.png",
            technologies: ["React", "TailwindCSS", "Node.js", "PostgreSQL"],
            demoUrl: "https://storeia.my.id",
            githubUrl: "https://github.com/user/ecommerce"
        },
        {
            id: 2,
            title: "Coffee Shop Website",
            description: "A beautiful e-commerce website for a coffee shop with online ordering, reservation system, and admin dashboard.",
            image: "/project2.png",
            technologies: ["React", "Svelte", "TailwindCSS", "Supabase"],
            demoUrl: "https://ruang-indah.vercel.app/",
            githubUrl: "https://github.com/user/coffee-shop"
        }
    ];

    // Try to load from localStorage
    let storedProjects: Project[] = initialProjects;
    if (isBrowser) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                storedProjects = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored projects', e);
            }
        }
    }

    const { subscribe, set, update } = writable<Project[]>(storedProjects);

    // Save to localStorage whenever projects change
    function persist(projects: Project[]) {
        if (isBrowser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        }
    }

    return {
        subscribe,
        addProject: (project: Omit<Project, 'id'>) => {
            update(projects => {
                const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
                const newProject = { ...project, id: newId };
                const updated = [...projects, newProject];
                persist(updated);
                return updated;
            });
        },
        updateProject: (id: number, updatedProject: Partial<Project>) => {
            update(projects => {
                const updated = projects.map(p =>
                    p.id === id ? { ...p, ...updatedProject } : p
                );
                persist(updated);
                return updated;
            });
        },
        deleteProject: (id: number) => {
            update(projects => {
                const updated = projects.filter(p => p.id !== id);
                persist(updated);
                return updated;
            });
        },
        reset: () => {
            set(initialProjects);
            persist(initialProjects);
        }
    };
}

export const projectStore = createProjectStore();
