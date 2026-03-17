<script lang="ts">
    import { projectStore, type Project } from "$lib/stores/projectStore";
    import { skillStore, type Skill } from "$lib/stores/skillStore";
    import { authStore } from "$lib/stores/authStore";
    import {
        Plus,
        Edit2,
        Trash2,
        LogOut,
        ArrowLeft,
        Save,
        X,
        Code,
        Palette,
        Server,
        Wrench,
    } from "lucide-svelte";
    import SpidermanFont from "$lib/components/SpidermanFont.svelte";

    // Project state
    let projects = $state<Project[]>([]);
    let isEditingProject = $state(false);
    let editingProject = $state<Project | null>(null);
    let isAddingProject = $state(false);

    // Skill state
    let skills = $state<Skill[]>([]);
    let isEditingSkill = $state(false);
    let editingSkill = $state<Skill | null>(null);
    let isAddingSkill = $state(false);
    let activeTab = $state<"projects" | "skills">("projects");

    // Project form state
    let projectFormData = $state({
        title: "",
        description: "",
        image: "",
        technologies: "",
        demoUrl: "",
        githubUrl: "",
    });

    // Skill form state
    let skillFormData = $state({
        name: "",
        category: "frontend" as "languages" | "frontend" | "backend" | "tools",
    });

    // Subscribe to stores
    projectStore.subscribe((value) => {
        projects = value;
    });

    skillStore.subscribe((value) => {
        skills = value;
    });

    function handleLogout() {
        authStore.logout();
        window.location.hash = "#/admin";
        window.location.reload();
    }

    // Project functions
    function startAddProject() {
        isAddingProject = true;
        isEditingProject = false;
        editingProject = null;
        projectFormData = {
            title: "",
            description: "",
            image: "/project1.png",
            technologies: "",
            demoUrl: "",
            githubUrl: "",
        };
    }

    function startEditProject(project: Project) {
        isEditingProject = true;
        isAddingProject = false;
        editingProject = project;
        projectFormData = {
            title: project.title,
            description: project.description,
            image: project.image,
            technologies: project.technologies.join(", "),
            demoUrl: project.demoUrl,
            githubUrl: project.githubUrl,
        };
    }

    function cancelProjectEdit() {
        isEditingProject = false;
        isAddingProject = false;
        editingProject = null;
    }

    function saveProject() {
        const techArray = projectFormData.technologies
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        const projectData = {
            title: projectFormData.title,
            description: projectFormData.description,
            image: projectFormData.image,
            technologies: techArray,
            demoUrl: projectFormData.demoUrl,
            githubUrl: projectFormData.githubUrl,
        };

        if (isAddingProject) {
            projectStore.addProject(projectData);
        } else if (editingProject) {
            projectStore.updateProject(editingProject.id, projectData);
        }

        cancelProjectEdit();
    }

    function deleteProject(id: number) {
        if (confirm("Are you sure you want to delete this project?")) {
            projectStore.deleteProject(id);
        }
    }

    // Skill functions
    function startAddSkill() {
        isAddingSkill = true;
        isEditingSkill = false;
        editingSkill = null;
        skillFormData = {
            name: "",
            category: "frontend",
        };
    }

    function startEditSkill(skill: Skill) {
        isEditingSkill = true;
        isAddingSkill = false;
        editingSkill = skill;
        skillFormData = {
            name: skill.name,
            category: skill.category,
        };
    }

    function cancelSkillEdit() {
        isEditingSkill = false;
        isAddingSkill = false;
        editingSkill = null;
    }

    function saveSkill() {
        if (isAddingSkill) {
            skillStore.addSkill(skillFormData);
        } else if (editingSkill) {
            skillStore.updateSkill(editingSkill.name, skillFormData);
        }
        cancelSkillEdit();
    }

    function deleteSkill(name: string) {
        if (confirm("Are you sure you want to delete this skill?")) {
            skillStore.deleteSkill(name);
        }
    }

    function goToPortfolio() {
        window.location.hash = "#/";
        window.location.reload();
    }

    function getCategoryIcon(category: string) {
        switch (category) {
            case "languages":
                return Code;
            case "frontend":
                return Palette;
            case "backend":
                return Server;
            case "tools":
                return Wrench;
            default:
                return Code;
        }
    }
</script>

<!-- Full Black Background with Spider-Man Red Theme -->
<div class="min-h-screen bg-[#0B0B0B] text-[#E11D2E]">
    <!-- Header - Red Border Bottom -->
    <header class="bg-[#0B0B0B] border-b-2 border-[#E11D2E]">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <button
                        onclick={goToPortfolio}
                        class="flex items-center gap-2 text-[#E11D2E]/70 hover:text-[#E11D2E] transition-colors"
                    >
                        <ArrowLeft class="w-5 h-5" />
                        <span class="hidden sm:inline">Back to Portfolio</span>
                    </button>
                    <SpidermanFont>
                        <h1 class="text-2xl font-bold text-[#E11D2E]">
                            ADMIN DASHBOARD
                        </h1>
                    </SpidermanFont>
                </div>
                <button
                    onclick={handleLogout}
                    class="flex items-center gap-2 px-4 py-2 bg-[#E11D2E] hover:bg-[#B81828] text-[#0B0B0B] rounded-lg transition-colors font-bold"
                >
                    <LogOut class="w-4 h-4" />
                    Logout
                </button>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-8">
        <!-- Tab Navigation - Spider-Man Style -->
        <div class="flex gap-4 mb-8">
            <button
                onclick={() => (activeTab = "projects")}
                class="px-6 py-3 rounded-lg font-bold transition-all {activeTab ===
                'projects'
                    ? 'bg-[#E11D2E] text-[#0B0B0B]'
                    : 'bg-[#1A1A1A] text-[#E11D2E] hover:bg-[#E11D2E] hover:text-[#0B0B0B]'}"
            >
                PROJECTS ({projects.length})
            </button>
            <button
                onclick={() => (activeTab = "skills")}
                class="px-6 py-3 rounded-lg font-bold transition-all {activeTab ===
                'skills'
                    ? 'bg-[#E11D2E] text-[#0B0B0B]'
                    : 'bg-[#1A1A1A] text-[#E11D2E] hover:bg-[#E11D2E] hover:text-[#0B0B0B]'}"
            >
                SKILLS ({skills.length})
            </button>
        </div>

        <!-- PROJECTS TAB -->
        {#if activeTab === "projects"}
            <!-- Actions -->
            <div class="flex items-center justify-between mb-8">
                <SpidermanFont>
                    <h2 class="text-3xl font-bold text-[#E11D2E]">
                        MANAGE PROJECTS
                    </h2>
                </SpidermanFont>
                <button
                    onclick={startAddProject}
                    class="flex items-center gap-2 px-4 py-2 bg-[#E11D2E] hover:bg-[#B81828] text-[#0B0B0B] rounded-lg transition-all transform hover:scale-105 active:scale-95 font-bold shadow-lg"
                >
                    <Plus class="w-4 h-4" />
                    Add Project
                </button>
            </div>

            <!-- Add/Edit Project Form -->
            {#if isAddingProject || isEditingProject}
                <div
                    class="bg-[#1A1A1A] rounded-lg p-6 mb-8 border-2 border-[#E11D2E]"
                >
                    <SpidermanFont>
                        <h3 class="text-xl font-bold text-[#E11D2E] mb-4">
                            {isAddingProject
                                ? "ADD NEW PROJECT"
                                : "EDIT PROJECT"}
                        </h3>
                    </SpidermanFont>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label
                                for="project-title"
                                class="block text-sm font-medium text-[#E11D2E]/80 mb-2"
                                >Title</label
                            >
                            <input
                                type="text"
                                id="project-title"
                                bind:value={projectFormData.title}
                                class="w-full px-4 py-2 bg-[#0B0B0B] border border-[#E11D2E]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
                                placeholder="Project title"
                            />
                        </div>

                        <div class="md:col-span-2">
                            <label
                                for="project-desc"
                                class="block text-sm font-medium text-[#E11D2E]/80 mb-2"
                                >Description</label
                            >
                            <textarea
                                id="project-desc"
                                bind:value={projectFormData.description}
                                rows="3"
                                class="w-full px-4 py-2 bg-[#0B0B0B] border border-[#E11D2E]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
                                placeholder="Project description"
                            ></textarea>
                        </div>

                        <div class="md:col-span-2">
                            <label
                                for="project-image"
                                class="block text-sm font-medium text-[#E11D2E]/80 mb-2"
                                >Image URL</label
                            >
                            <div class="flex gap-2">
                                <input
                                    type="text"
                                    id="project-image"
                                    bind:value={projectFormData.image}
                                    class="flex-1 px-4 py-2 bg-[#0B0B0B] border border-[#E11D2E]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
                                    placeholder="/project1.png"
                                />
                                {#if projectFormData.image}
                                    <div
                                        class="w-16 h-16 bg-[#0B0B0B] rounded-lg overflow-hidden flex items-center justify-center border border-[#E11D2E]/30"
                                    >
                                        <img
                                            src={projectFormData.image}
                                            alt="Preview"
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                {/if}
                            </div>
                        </div>

                        <div class="md:col-span-2">
                            <label
                                for="project-tech"
                                class="block text-sm font-medium text-[#E11D2E]/80 mb-2"
                                >Technologies (comma separated)</label
                            >
                            <input
                                type="text"
                                id="project-tech"
                                bind:value={projectFormData.technologies}
                                class="w-full px-4 py-2 bg-[#0B0B0B] border border-[#E11D2E]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
                                placeholder="React, Node.js, TailwindCSS"
                            />
                        </div>

                        <div>
                            <label
                                for="project-demo"
                                class="block text-sm font-medium text-[#11D2E]/80 mb-2"
                                >Demo URL</label
                            >
                            <input
                                type="text"
                                id="project-demo"
                                bind:value={projectFormData.demoUrl}
                                class="w-full px-4 py-2 bg-[#0B0B0B] border border-[#E11D2E]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
                                placeholder="https://demo.com"
                            />
                        </div>

                        <div>
                            <label
                                for="project-github"
                                class="block text-sm font-medium text-[#E11D2E]/80 mb-2"
                                >GitHub URL</label
                            >
                            <input
                                type="text"
                                id="project-github"
                                bind:value={projectFormData.githubUrl}
                                class="w-full px-4 py-2 bg-[#0B0B0B] border border-[#E11D2E]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
                                placeholder="https://github.com/user/project"
                            />
                        </div>
                    </div>

                    <div class="flex gap-3 mt-6">
                        <button
                            onclick={saveProject}
                            class="flex items-center gap-2 px-4 py-2 bg-[#E11D2E] hover:bg-[#B81828] text-[#0B0B0B] rounded-lg transition-all transform hover:scale-105 font-bold"
                        >
                            <Save class="w-4 h-4" />
                            Save Project
                        </button>
                        <button
                            onclick={cancelProjectEdit}
                            class="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#E11D2E] border border-[#E11D2E] rounded-lg transition-colors"
                        >
                            <X class="w-4 h-4" />
                            Cancel
                        </button>
                    </div>
                </div>
            {/if}

            <!-- Projects List -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each projects as project (project.id)}
                    <div
                        class="bg-[#1A1A1A] rounded-lg overflow-hidden border-2 border-[#E11D2E]/20 hover:border-[#E11D2E] transition-colors"
                    >
                        <div class="aspect-video bg-[#0B0B0B] relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                class="w-full h-full object-cover"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 to-transparent"
                            ></div>
                        </div>
                        <div class="p-4">
                            <h3 class="font-bold text-lg mb-2 text-white">
                                {project.title}
                            </h3>
                            <p class="text-white/60 text-sm mb-3 line-clamp-2">
                                {project.description}
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                {#each project.technologies as tech}
                                    <span
                                        class="px-2 py-1 bg-[#E11D2E]/20 text-[#E11D2E] text-xs rounded"
                                        >{tech}</span
                                    >
                                {/each}
                            </div>
                            <div class="flex gap-2">
                                <button
                                    onclick={() => startEditProject(project)}
                                    class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#E11D2E] hover:bg-[#B81828] text-[#0B0B0B] rounded-lg transition-colors text-sm font-bold"
                                >
                                    <Edit2 class="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onclick={() => deleteProject(project.id)}
                                    class="flex items-center justify-center gap-2 px-3 py-2 bg-[#E11D2E]/20 hover:bg-[#E11D2E] text-[#E11D2E] hover:text-[#0B0B0B] rounded-lg transition-colors text-sm"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <!-- SKILLS TAB -->
            <!-- Actions -->
            <div class="flex items-center justify-between mb-8">
                <SpidermanFont>
                    <h2 class="text-3xl font-bold text-[#E11D2E]">
                        MANAGE SKILLS
                    </h2>
                </SpidermanFont>
                <button
                    onclick={startAddSkill}
                    class="flex items-center gap-2 px-4 py-2 bg-[#E11D2E] hover:bg-[#B81828] text-[#0B0B0B] rounded-lg transition-all transform hover:scale-105 active:scale-95 font-bold shadow-lg"
                >
                    <Plus class="w-4 h-4" />
                    Add Skill
                </button>
            </div>

            <!-- Add/Edit Skill Form -->
            {#if isAddingSkill || isEditingSkill}
                <div
                    class="bg-[#1A1A1A] rounded-lg p-6 mb-8 border-2 border-[#E11D2E]"
                >
                    <SpidermanFont>
                        <h3 class="text-xl font-bold text-[#E11D2E] mb-4">
                            {isAddingSkill ? "ADD NEW SKILL" : "EDIT SKILL"}
                        </h3>
                    </SpidermanFont>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                for="skill-name"
                                class="block text-sm font-medium text-[#E11D2E]/80 mb-2"
                                >Skill Name</label
                            >
                            <input
                                type="text"
                                id="skill-name"
                                bind:value={skillFormData.name}
                                class="w-full px-4 py-2 bg-[#0B0B0B] border border-[#E11D2E]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
                                placeholder="React, Node.js, etc."
                            />
                        </div>

                        <div>
                            <label
                                for="skill-category"
                                class="block text-sm font-medium text-[#E11D2E]/80 mb-2"
                                >Category</label
                            >
                            <select
                                id="skill-category"
                                bind:value={skillFormData.category}
                                class="w-full px-4 py-2 bg-[#0B0B0B] border border-[#E11D2E]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E11D2E]"
                            >
                                <option value="languages">Languages</option>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="tools">Tools</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex gap-3 mt-6">
                        <button
                            onclick={saveSkill}
                            class="flex items-center gap-2 px-4 py-2 bg-[#E11D2E] hover:bg-[#B81828] text-[#0B0B0B] rounded-lg transition-all transform hover:scale-105 font-bold"
                        >
                            <Save class="w-4 h-4" />
                            Save Skill
                        </button>
                        <button
                            onclick={cancelSkillEdit}
                            class="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#E11D2E] border border-[#E11D2E] rounded-lg transition-colors"
                        >
                            <X class="w-4 h-4" />
                            Cancel
                        </button>
                    </div>
                </div>
            {/if}

            <!-- Skills by Category -->
            {#each ["languages", "frontend", "backend", "tools"] as category}
                <div class="mb-8">
                    <div class="flex items-center gap-2 mb-4">
                        <svelte:component
                            this={getCategoryIcon(category)}
                            class="w-5 h-5 text-[#E11D2E]"
                        />
                        <SpidermanFont>
                            <h3
                                class="text-xl font-bold text-[#E11D2E] uppercase"
                            >
                                {category}
                            </h3>
                        </SpidermanFont>
                        <span
                            class="px-2 py-1 bg-[#E11D2E]/20 text-[#E11D2E] text-xs rounded"
                        >
                            {skills.filter((s) => s.category === category)
                                .length}
                        </span>
                    </div>

                    <div
                        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                        {#each skills.filter((s) => s.category === category) as skill}
                            <div
                                class="bg-[#1A1A1A] rounded-lg p-4 border-2 border-[#E11D2E]/20 hover:border-[#E11D2E] transition-colors flex items-center justify-between"
                            >
                                <span class="font-bold text-white"
                                    >{skill.name}</span
                                >
                                <div class="flex gap-1">
                                    <button
                                        onclick={() => startEditSkill(skill)}
                                        class="p-2 bg-[#E11D2E]/20 hover:bg-[#E11D2E] hover:text-[#0B0B0B] text-[#E11D2E] rounded-lg transition-colors"
                                    >
                                        <Edit2 class="w-3 h-3" />
                                    </button>
                                    <button
                                        onclick={() => deleteSkill(skill.name)}
                                        class="p-2 bg-[#E11D2E]/20 hover:bg-[#E11D2E] hover:text-[#0B0B0B] text-[#E11D2E] rounded-lg transition-colors"
                                    >
                                        <Trash2 class="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        {/if}
    </main>
</div>
