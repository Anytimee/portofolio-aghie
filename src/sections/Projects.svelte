<script lang="ts">
	import { projects } from "$lib/data";
	import { Card, CardContent, CardFooter, CardHeader } from "$lib/components/ui";
	import { Badge } from "$lib/components/ui";
	import { Button } from "$lib/components/ui";
	import { ExternalLink, Github, ArrowUpRight } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";

	const projectsList = [
		{
			id: 1,
			title: "E-Commerce Platform",
			description: "A full-featured e-commerce platform with product management, admin dashboard, role management, real-time analytics, security CSP and captcha.",
			image: "/src/assets/project/project1.png",
			technologies: ["React", "TailwindCSS", "Supabase"],
			demoUrl: "https://storeia.my.id",
			githubUrl: "https://github.com/user/repo"
		},
		{
			id: 2,
			title: "Coffee Shop",
			description: "A full-featured e-commerce coffee shop with notification, product management, admin dashboard, role management, and payment integration.",
			image: "/src/assets/project/project2.png",
			technologies: ["React", "Node.js", "TailwindCSS", "Supabase"],
			demoUrl: "https://ruang-indah.vercel.app/",
			githubUrl: "https://github.com/user/repo"
		},
		{
			id: 3,
			title: "Weather Dashboard",
			description: "An interactive weather dashboard with forecasts, maps, and location-based alerts.",
			image: "/src/assets/project/project1.png",
			technologies: ["Vue.js", "Python", "OpenWeather API"],
			demoUrl: "https://demo.com",
			githubUrl: "https://github.com/user/repo"
		},
		{
			id: 4,
			title: "Portfolio Generator",
			description: "A static site generator for creating beautiful portfolios with customizable themes.",
			image: "/src/assets/project/project2.png",
			technologies: ["SvelteKit", "Markdown", "TailwindCSS"],
			demoUrl: "https://demo.com",
			githubUrl: "https://github.com/user/repo"
		}
	];
</script>

<section 
	id="projects" 
	class="py-24 md:py-32 relative overflow-hidden"
>
	<!-- Background -->
	<div class="absolute inset-0 bg-dots opacity-30"></div>

	<!-- Mysterious gradient overlay -->
	<div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/50 via-transparent to-background/50"></div>

	<div class="container mx-auto px-6 relative z-10">
		<!-- Section Header - Mysterious fade -->
		<div class="text-center mb-20">
			<span 
				class="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4 block"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 200, duration: 800 }}
			>My work</span>
			<h2 
				class="text-display"
				use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 400, duration: 800 }}
			>Projects</h2>
			<p 
				class="text-muted-foreground text-lg max-w-2xl mx-auto mt-6"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 600, duration: 800 }}
			>
				A selection of projects I have worked on
			</p>
		</div>

		<!-- Projects Grid - Stagger reveal with blur -->
		<div class="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
			{#each projectsList as project, index}
				<div 
					class="project-card"
					use:scrollDirectionAnimate={{ type: 'stagger-reveal', delay: 800 + index * 200, duration: 800, index: index }}
				>
					<Card class="h-full bg-card/70 border-border overflow-hidden group transition-all duration-500 hover:shadow-elevated">
						<!-- Image -->
						<div class="relative h-56 overflow-hidden">
							<img 
								src={project.image} 
								alt={project.title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
								loading="lazy"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-espresso-900/30 to-transparent"></div>
							
							<!-- Links -->
							<div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<button
									onclick={() => window.open(project.demoUrl, '_blank')}
									class="p-2.5 rounded-sm bg-card/90 hover:bg-card text-espresso-800 dark:text-cream-100 transition-colors"
									aria-label="View demo"
								>
									<ExternalLink class="w-4 h-4" />
								</button>
								<button
									onclick={() => window.open(project.githubUrl, '_blank')}
									class="p-2.5 rounded-sm bg-card/90 hover:bg-card text-espresso-800 dark:text-cream-100 transition-colors"
									aria-label="View GitHub"
								>
									<Github class="w-4 h-4" />
								</button>
							</div>
						</div>
						
						<!-- Content -->
						<CardHeader>
							<h3 class="text-xl font-medium text-espresso-800 dark:text-cream-100 flex items-center gap-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-300">
								{project.title}
								<ArrowUpRight class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</h3>
						</CardHeader>
						
						<CardContent>
							<p class="text-muted-foreground text-sm mb-5 leading-relaxed">
								{project.description}
							</p>
							
							<div class="flex flex-wrap gap-2">
								{#each project.technologies as tech}
									<Badge variant="secondary" class="bg-espresso-100 dark:bg-espresso-800 text-espresso-700 dark:text-cream-200 rounded-sm text-xs">
										{tech}
									</Badge>
								{/each}
							</div>
						</CardContent>
						
						<CardFooter class="gap-3 pt-2">
							<Button 
								variant="default" 
								size="sm"
								class="rounded-sm font-medium bg-espresso-800 hover:bg-espresso-700 dark:bg-gold-500 dark:hover:bg-gold-400 dark:text-espresso-900 border-0 transition-all duration-300"
								onclick={() => window.open(project.demoUrl, '_blank')}
							>
								<ExternalLink class="w-4 h-4 mr-2" />
								Live Demo
							</Button>
							<Button 
								variant="outline" 
								size="sm"
								class="rounded-sm border-espresso-300 dark:border-espresso-600 hover:bg-espresso-100 dark:hover:bg-espresso-800/50 transition-all duration-300"
								onclick={() => window.open(project.githubUrl, '_blank')}
							>
								<Github class="w-4 h-4 mr-2" />
								Source
							</Button>
						</CardFooter>
					</Card>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.project-card {
		will-change: opacity, filter, transform;
	}
</style>
