<script lang="ts">
	import { profile } from "$lib/data";
	import { MapPin, ArrowRight } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";

	let imageLoaded = $state(false);

	const journey = [
		{ year: "Beginning", description: "Started my journey with curiosity and a passion for building things" },
		{ year: "Learning", description: "Mastered core concepts and built first projects" },
		{ year: "Growing", description: "Worked with amazing teams and delivered real-world solutions" },
		{ year: "Now", description: "Creating impactful digital experiences every day" }
	];

	function handleImageLoad() {
		imageLoaded = true;
	}
</script>

<section id="about" class="py-24 md:py-32 relative overflow-hidden">
	<!-- Subtle background -->
	<div class="absolute inset-0 bg-dots opacity-30"></div>

	<!-- Mysterious shadow overlay for reveal effect -->
	<div class="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-background/20 to-transparent"></div>

	<div class="container mx-auto px-6 relative z-10">
		<div class="max-w-5xl mx-auto">
			<!-- Section Header - Mysterious fade -->
			<div class="text-center mb-20">
				<span 
					class="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4 block"
					use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 200, duration: 800 }}
				>Get to know me</span>
				<h2 
					class="text-display"
					use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 400, duration: 800 }}
				>About Me</h2>
			</div>

			<div class="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
				<!-- Image - Shadow reveal from darkness -->
				<div 
					class="about-image-container"
					use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 600, duration: 800 }}
				>
					<div class="relative">
						<div class="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-sm overflow-hidden shadow-elevated bg-cream-200 dark:bg-espresso-800">
							<img 
								src="/src/assets/avatar/avatar.jpg" 
								alt={profile.name} 
								class="w-full h-full object-cover transition-opacity duration-700 {imageLoaded ? 'opacity-100' : 'opacity-0'}"
								onload={handleImageLoad}
							/>
						</div>
						<div class="absolute -inset-3 border border-espresso-200 dark:border-espresso-700 rounded-sm -z-10"></div>
						<div class="absolute -bottom-5 -right-5 p-5 bg-card rounded-sm shadow-elevated border border-border">
							<span class="text-sm font-medium text-gold-500">{profile.role}</span>
						</div>
					</div>
				</div>

				<!-- Content - Mysterious fade with blur -->
				<div 
					class="about-content"
					use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 900, duration: 800 }}
				>
					<div class="flex items-center gap-2 text-muted-foreground mb-6">
						<MapPin class="w-4 h-4" />
						<span class="text-sm">{profile.location}</span>
					</div>

					<p class="text-lg md:text-xl leading-relaxed text-espresso-800 dark:text-cream-100 mb-6">
						{profile.bio}
					</p>

					<p class="text-muted-foreground leading-relaxed mb-10">
						I believe in the power of technology to transform ideas into reality. 
						Every line of code is an opportunity to create something meaningful.
					</p>

					<!-- Journey - Stagger reveal -->
					<div class="pt-2">
						<h3 class="text-lg font-medium mb-6 flex items-center gap-2 text-espresso-800 dark:text-cream-100">
							<span>My Journey</span>
							<ArrowRight class="w-4 h-4 text-gold-500" />
						</h3>
						<div class="space-y-5">
							{#each journey as item, index}
								<div 
									class="flex gap-4 items-start journey-item"
									use:scrollDirectionAnimate={{ type: 'stagger-reveal', delay: 1200 + index * 150, duration: 800, index: index }}
								>
									<div class="flex flex-col items-center">
										<div class="w-2 h-2 rounded-full bg-gold-500 mt-1.5 animate-mystic-pulse"></div>
										{#if index < journey.length - 1}
											<div class="w-px h-12 bg-espresso-200 dark:bg-espresso-700 mt-2"></div>
										{/if}
									</div>
									<div class="pt-0.5">
										<span class="text-sm font-medium text-espresso-700 dark:text-cream-200">{item.year}</span>
										<p class="text-muted-foreground text-sm mt-0.5">{item.description}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-image-container {
		will-change: opacity, filter, transform;
	}
	.about-content {
		will-change: opacity, filter;
	}
	.journey-item {
		will-change: opacity, filter, transform;
	}
</style>
