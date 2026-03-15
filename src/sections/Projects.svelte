<script lang="ts">
	import { projects } from "$lib/data";
	import { Badge } from "$lib/components/ui";
	import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";
	import { onMount } from "svelte";
	import { fade, slide } from "svelte/transition";

	let selectedProject = $state<number | null>(null);
	let currentIndex = $state(0);
	let isMobile = $state(false);

	function checkMobile() {
		isMobile = window.innerWidth < 768;
	}

	onMount(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	function selectProject(id: number) {
		currentIndex = projects.findIndex(p => p.id === id);
		selectedProject = id;
	}

	function nextProject() {
		currentIndex = (currentIndex + 1) % projects.length;
		selectedProject = projects[currentIndex].id;
	}

	function prevProject() {
		currentIndex = (currentIndex - 1 + projects.length) % projects.length;
		selectedProject = projects[currentIndex].id;
	}

	function closePreview() {
		selectedProject = null;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && selectedProject) {
			closePreview();
		} else if (event.key === 'ArrowRight' && selectedProject) {
			nextProject();
		} else if (event.key === 'ArrowLeft' && selectedProject) {
			prevProject();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	const projectTitles = ["Storeia", "Ruang Indah", "Portfolio", "Weather"];
</script>

<section 
	id="projects" 
	class="py-12 md:py-16 relative overflow-hidden"
>
	<!-- Background -->
	<div class="absolute inset-0 bg-dots opacity-30"></div>
	<div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/50 via-transparent to-background/50"></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="max-w-6xl mx-auto">
			<!-- Section Header -->
			<div class="text-center mb-12">
				<span 
					class="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4 block"
					use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 200, duration: 800 }}
				>My work</span>
				<h2 
					class="text-3xl md:text-4xl font-bold text-espresso-800 dark:text-cream-100 mb-4"
					use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 400, duration: 800 }}
				>Projects</h2>
			</div>

			<!-- Project Selection Grid (when no project selected) -->
			{#if selectedProject === null}
				<div 
					class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
					use:scrollDirectionAnimate={{ type: 'stagger-reveal', delay: 600, duration: 800 }}
				>
					{#each projects as project, index}
						<button
							class="project-thumb"
							onclick={() => selectProject(project.id)}
						>
							<!-- Card -->
							<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
								<!-- Monitor/TV Frame -->
								<div class="monitor-frame">
									<!-- Monitor Screen -->
									<div class="monitor-screen">
										<img 
											src={project.image || "/project1.png"} 
											alt={project.title}
											class="monitor-img"
											loading="lazy"
										/>
										<div class="monitor-overlay">
											<span class="monitor-title">{projectTitles[index]}</span>
										</div>
									</div>
									<!-- Monitor Stand -->
									<div class="monitor-stand">
										<div class="monitor-base"></div>
									</div>
								</div>
								<!-- Project Label -->
								<div class="project-label mt-4">
									<span class="text-xs uppercase tracking-[0.2em] text-gold-500">Click to preview</span>
								</div>
							</div>
						</button>
					{/each}
				</div>
			{:else}
				<!-- Single TV/Monitor Display -->
				<div class="flex flex-col items-center" transition:fade={{ duration: 200 }}>
					<!-- Close Button -->
					<button class="close-btn" onclick={closePreview}>
						<X class="w-5 h-5" />
					</button>

					<!-- TV/Monitor Frame -->
					<div class="tv-frame" class:mobile={isMobile}>
						<!-- TV Screen -->
						<div class="tv-screen">
							<iframe 
								src={projects[currentIndex]?.demoUrl}
								title={projects[currentIndex]?.title}
								class="tv-iframe"
								sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
							></iframe>
						</div>
						
						<!-- TV Stand -->
						<div class="tv-stand"></div>
					</div>

					<!-- Project Info & Navigation -->
					<div class="project-info mt-6">
						<div class="flex items-center justify-between w-full">
							<button class="nav-btn" onclick={prevProject}>
								<ChevronLeft class="w-5 h-5" />
							</button>
							
							<div class="text-center">
								<h3 class="text-xl font-semibold text-gray-800">
									{projectTitles[currentIndex]}
								</h3>
								<div class="flex gap-2 justify-center mt-2 flex-wrap">
									{#each projects[currentIndex]?.technologies || [] as tech}
										<Badge variant="secondary" class="text-xs">
											{tech}
										</Badge>
									{/each}
								</div>
							</div>
							
							<button class="nav-btn" onclick={nextProject}>
								<ChevronRight class="w-5 h-5" />
							</button>
						</div>

						<!-- External Links -->
						<div class="flex gap-3 mt-4">
							<a 
								href={projects[currentIndex]?.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="external-link-btn"
							>
								<ExternalLink class="w-4 h-4" />
								<span>Visit Website</span>
							</a>
							<a 
								href={projects[currentIndex]?.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="external-link-btn"
							>
								<Github class="w-4 h-4" />
								<span>Source Code</span>
							</a>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Project Thumbnails */
	.project-thumb {
		border: none;
		background: transparent;
		padding: 0;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.project-thumb:hover {
		transform: translateY(-4px);
	}

	/* Monitor Frame */
	.monitor-frame {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
		border-radius: 16px;
		padding: 12px;
		box-shadow: 
			0 0 0 2px rgba(255,255,255,0.1),
			0 0 0 6px rgba(0,0,0,0.3),
			0 20px 50px rgba(0,0,0,0.5);
	}

	.monitor-screen {
		width: 100%;
		aspect-ratio: 16/10;
		background: #000;
		border-radius: 8px;
		overflow: hidden;
		position: relative;
	}

	.monitor-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.project-thumb:hover .monitor-img {
		transform: scale(1.05);
	}

	.monitor-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 16px;
		background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.monitor-title {
		color: #fff;
		font-weight: 700;
		font-size: 16px;
		text-shadow: 0 2px 4px rgba(0,0,0,0.5);
	}

	/* Monitor Stand */
	.monitor-stand {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 8px;
	}

	.monitor-stand::before {
		content: '';
		width: 60px;
		height: 8px;
		background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%);
		border-radius: 4px 4px 0 0;
	}

	.monitor-base {
		width: 100px;
		height: 6px;
		background: linear-gradient(180deg, #333 0%, #222 100%);
		border-radius: 0 0 4px 4px;
	}

	/* Project Label */
	.project-label {
		text-align: center;
		opacity: 0.7;
	}

	/* Responsive Styles */
	@media (max-width: 640px) {
		.monitor-frame {
			max-width: 100%;
			padding: 8px;
			border-radius: 12px;
		}

		.monitor-title {
			font-size: 14px;
		}

		.monitor-stand::before {
			width: 40px;
			height: 6px;
		}

		.monitor-base {
			width: 70px;
			height: 4px;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.monitor-frame {
			max-width: 400px;
		}
	}

	/* Close Button */
	.close-btn {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0,0,0,0.5);
		border: none;
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		margin-bottom: 16px;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background: rgba(0,0,0,0.7);
		transform: scale(1.1);
	}

	/* TV Frame */
	.tv-frame {
		width: 100%;
		max-width: 90vw;
		max-height: 80vh;
		aspect-ratio: 16/9;
		background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
		border-radius: 24px;
		padding: 20px;
		box-shadow: 
			0 0 0 3px rgba(255,255,255,0.15),
			0 0 0 8px rgba(0,0,0,0.3),
			0 40px 100px rgba(0,0,0,0.7);
	}

	.tv-frame.mobile {
		max-width: 320px;
		aspect-ratio: 9/19;
		border-radius: 32px;
		padding: 8px;
	}

	.tv-screen {
		width: 100%;
		height: 100%;
		background: #000;
		border-radius: 8px;
		overflow: hidden;
	}

	.tv-frame.mobile .tv-screen {
		border-radius: 24px;
	}

	.tv-iframe {
		width: 100%;
		height: 100%;
		border: none;
		background: #fff;
	}

	/* TV Stand */
	.tv-stand {
		width: 120px;
		height: 8px;
		background: linear-gradient(180deg, #333 0%, #222 100%);
		border-radius: 0 0 4px 4px;
		margin: 0 auto;
	}

	.tv-frame.mobile .tv-stand {
		display: none;
	}

	/* Project Info */
	.project-info {
		width: 100%;
		max-width: 500px;
	}

	.nav-btn {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(212, 175, 55, 0.2);
		border: 1px solid rgba(212, 175, 55, 0.3);
		border-radius: 50%;
		color: #d4af37;
		cursor: pointer;
		transition: all 0.2s;
	}

	.nav-btn:hover {
		background: rgba(212, 175, 55, 0.3);
		transform: scale(1.1);
	}

	.external-link-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: #d4af37;
		color: #000;
		border-radius: 8px;
		font-weight: 600;
		font-size: 14px;
		transition: all 0.2s;
	}

	.external-link-btn:hover {
		background: #e5c158;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.project-info {
			padding: 0 20px;
		}
		
		.external-link-btn {
			padding: 8px 16px;
			font-size: 13px;
		}
	}
</style>
