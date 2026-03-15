<script lang="ts">
	import { experience, getTypeLabel } from "$lib/data";
	import { Card, CardContent, CardHeader } from "$lib/components/ui";
	import { GraduationCap, Briefcase, Code, Trophy, Calendar } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";

	const typeColors: Record<string, string> = {
		education: "bg-blue-500",
		project: "bg-green-500",
		extracurricular: "bg-purple-500",
		internship: "bg-orange-500",
		competition: "bg-yellow-500"
	};

	const typeIcons: Record<string, any> = {
		education: GraduationCap,
		project: Code,
		extracurricular: Briefcase,
		internship: Briefcase,
		competition: Trophy
	};

	function getTypeColor(type: string): string {
		return typeColors[type] || "bg-gold-500";
	}

	function getTypeIcon(type: string) {
		return typeIcons[type] || Briefcase;
	}
</script>

<section 
	id="experience" 
	class="py-24 md:py-32 relative overflow-hidden bg-cream-100/50 dark:bg-espresso-900/30"
>
	<!-- Background -->
	<div class="absolute inset-0 bg-dots opacity-30"></div>

	<!-- Mysterious gradient overlay -->
	<div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/30 via-transparent to-background/30"></div>

	<div class="container mx-auto px-6 relative z-10">
		<!-- Section Header - Mysterious fade -->
		<div class="text-center mb-20">
			<span 
				class="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4 block"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 200, duration: 800 }}
			>My background</span>
			<h2 
				class="text-display"
				use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 400, duration: 800 }}
			>Experience</h2>
			<p 
				class="text-muted-foreground text-lg max-w-2xl mx-auto mt-6"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 600, duration: 800 }}
			>
				My professional journey
			</p>
		</div>

		<!-- Timeline - Timeline fade -->
		<div class="relative max-w-4xl mx-auto">
			<!-- Vertical line -->
			<div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-espresso-200 dark:bg-espresso-700 transform -translate-x-1/2"></div>
			<div class="md:hidden absolute left-6 top-0 bottom-0 w-px bg-espresso-200 dark:bg-espresso-700"></div>

			<div class="space-y-12">
				{#each experience as exp, index}
					<div 
						class="relative flex flex-col md:flex-row experience-item"
						use:scrollDirectionAnimate={{ type: 'timeline-fade', delay: 800 + index * 200, duration: 800, index: index }}
					>
						<!-- Timeline dot with pulse -->
						<div class="absolute left-6 md:left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 mt-6 ring-4 ring-cream-100 dark:ring-espresso-900 z-10 {getTypeColor(exp.type)}"></div>
						
						<!-- Card -->
						<div class="md:w-1/2 pl-14 md:pl-0 {index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}">
							<Card class="bg-card/70 border-border transition-all duration-300 hover:shadow-elevated">
								<CardHeader>
									<div class="flex items-start gap-3 {index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}">
										<div class="p-2.5 rounded-sm {getTypeColor(exp.type)} flex-shrink-0">
											<svelte:component this={getTypeIcon(exp.type)} class="w-4 h-4 text-white" />
										</div>
										<div class="flex-1">
											<span class="inline-block px-2.5 py-1 text-xs font-medium rounded-sm bg-espresso-100 dark:bg-espresso-800 text-espresso-700 dark:text-cream-200 mb-2">
												{exp.type ? getTypeLabel(exp.type) : 'Experience'}
											</span>
											
											<h3 class="text-lg font-medium text-espresso-800 dark:text-cream-100">{exp.role}</h3>
											
											<p class="text-muted-foreground text-sm">{exp.work}</p>
											
											<div class="flex items-center gap-1.5 text-sm text-gold-500 mt-2.5 {index % 2 === 0 ? 'md:justify-end' : ''}">
												<Calendar class="w-3.5 h-3.5" />
												{exp.period}
											</div>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<p class="text-sm text-muted-foreground leading-relaxed">
										{exp.description}
									</p>
								</CardContent>
							</Card>
						</div>
						
						<div class="hidden md:block md:w-1/2"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.experience-item {
		will-change: opacity, filter, transform;
	}
</style>
