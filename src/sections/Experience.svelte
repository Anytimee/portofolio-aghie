<script lang="ts">
	import { experience, getTypeLabel } from "$lib/data";
	import { Card, CardContent, CardHeader } from "$lib/components/ui";
	import { GraduationCap, Briefcase, Code, Trophy, Calendar } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";
	import { onMount } from "svelte";

	let cardRefs: HTMLDivElement[] = [];

	const typeColors: Record<string, string> = {
		education: "from-blue-500 to-blue-600",
		project: "from-green-500 to-green-600",
		extracurricular: "from-purple-500 to-purple-600",
		internship: "from-orange-500 to-orange-600",
		competition: "from-yellow-500 to-yellow-600"
	};

	const typeIcons: Record<string, any> = {
		education: GraduationCap,
		project: Code,
		extracurricular: Briefcase,
		internship: Briefcase,
		competition: Trophy
	};

	function getTypeColor(type: string): string {
		return typeColors[type] || "from-gold-500 to-gold-600";
	}

	function getTypeIcon(type: string) {
		return typeIcons[type] || Briefcase;
	}

	function handleMouseMove(event: MouseEvent, index: number) {
		const card = cardRefs[index];
		if (!card) return;

		const rect = card.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = (y - centerY) / 20;
		const rotateY = (centerX - x) / 20;

		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
	}

	function handleMouseLeave(index: number) {
		const card = cardRefs[index];
		if (!card) return;
		card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
	}
</script>

<section 
	id="experience" 
	class="py-12 md:py-16 relative overflow-hidden bg-cream-100/50 dark:bg-espresso-900/30"
>
	<!-- Background -->
	<div class="absolute inset-0 bg-dots opacity-30"></div>

	<!-- Gradient orbs -->
	<div class="absolute top-1/4 -left-32 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
	<div class="absolute bottom-1/4 -right-32 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="max-w-6xl mx-auto">
			<!-- Section Header -->
			<div class="text-center mb-12">
				<span 
					class="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4 block"
					use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 200, duration: 800 }}
				>My background</span>
				<h2 
					class="text-3xl md:text-4xl font-bold text-espresso-800 dark:text-cream-100 mb-4"
					use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 400, duration: 800 }}
				>Experience</h2>
				<p 
					class="text-muted-foreground text-lg max-w-2xl mx-auto mt-4 leading-relaxed"
					use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 600, duration: 800 }}
				>
					My professional journey
				</p>
			</div>

			<!-- 3D Timeline -->
			<div class="relative max-w-4xl mx-auto">
				<!-- Vertical line with glow -->
				<div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent transform -translate-x-1/2"></div>
				<div class="md:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent"></div>

				<div class="space-y-8">
					{#each experience as exp, index}
						<div 
							class="relative flex flex-col md:flex-row experience-item"
							use:scrollDirectionAnimate={{ type: 'timeline-fade', delay: 800 + index * 200, duration: 800, index: index }}
						>
							<!-- 3D Timeline dot -->
							<div class="absolute left-6 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 mt-5.5 ring-8 ring-cream-100 dark:ring-espresso-900 z-10 bg-gradient-to-br {getTypeColor(exp.type)} shadow-lg"></div>
							
							<!-- 3D Card -->
							<div 
								class="md:w-1/2 pl-14 md:pl-0 {index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}"
								bind:this={cardRefs[index]}
								onmousemove={(e) => handleMouseMove(e, index)}
								onmouseleave={() => handleMouseLeave(index)}
								role="article"
							>
								<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-default" style="transform-style: preserve-3d; transition: transform 0.3s ease;">
									<div class="flex items-start gap-3 {index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}">
										<div class="p-2.5 rounded-lg bg-gradient-to-br {getTypeColor(exp.type)} shadow-lg">
											<svelte:component this={getTypeIcon(exp.type)} class="w-4 h-4 text-white" />
										</div>
										<div class="flex-1">
											<span class="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 mb-2">
												{exp.type ? getTypeLabel(exp.type) : 'Experience'}
											</span>
											
											<h3 class="text-lg font-semibold text-gray-800">{exp.role}</h3>
											
											<p class="text-muted-foreground text-sm">{exp.work}</p>
											
											<div class="flex items-center gap-1.5 text-sm text-gold-500 mt-2 {index % 2 === 0 ? 'md:justify-end' : ''}">
												<Calendar class="w-3.5 h-3.5" />
												{exp.period}
											</div>
										</div>
									</div>
									<p class="text-sm text-muted-foreground leading-relaxed mt-4">
										{exp.description}
									</p>
								</div>
							</div>
							
							<div class="hidden md:block md:w-1/2"></div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.experience-item {
		will-change: opacity, filter, transform;
	}
</style>
