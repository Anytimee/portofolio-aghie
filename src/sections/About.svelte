<script lang="ts">
	import { profile } from "$lib/data";
	import { MapPin, ArrowRight } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";
	import { onMount } from "svelte";
	import ProtectedImage from "$lib/components/ProtectedImage.svelte";
	import SpidermanFont from "$lib/components/SpidermanFont.svelte";

	let isDarkMode = $state(false);
	let isHovering = $state(false);
	let mouseX = $state(50);
	let mouseY = $state(50);

	const journey = [
		{
			year: "Beginning",
			description:
				"Started learning web development and fell in love with React",
		},
		{
			year: "Learning",
			description: "Mastered Svelte, React, and modern frontend tools",
		},
		{
			year: "Growing",
			description: "Built real-world projects with Node.js and databases",
		},
		{
			year: "Now",
			description:
				"Creating beautiful web experiences with React & Svelte",
		},
	];

	onMount(() => {
		// Check dark mode
		isDarkMode = document.documentElement.classList.contains("dark");
		const darkModeObserver = new MutationObserver(() => {
			isDarkMode = document.documentElement.classList.contains("dark");
		});
		darkModeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
	});
</script>

<section id="about" class="py-12 md:py-16 relative overflow-hidden">
	<!-- Subtle background -->
	<div class="absolute inset-0 bg-dots opacity-30"></div>

	<!-- Mysterious shadow overlay for reveal effect -->
	<div
		class="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-background/20 to-transparent"
	></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="max-w-6xl mx-auto">
			<!-- Section Header - Mysterious fade -->
			<SpidermanFont>
				<div class="text-center mb-12">
					<span
						class="text-xs uppercase tracking-[0.2em] text-gold-500 dark:text-[#E11D2E] mb-4 block"
						style={isDarkMode
							? " font-family: 'The Amazing Spider-Man', sans-serif!important"
							: ""}
						use:scrollDirectionAnimate={{
							type: "mysterious-fade",
							delay: 200,
							duration: 800,
						}}>Get to know me</span
					>
					<h2
						class="text-3xl md:text-4xl font-bold text-espresso-800 dark:text-cream-100 mb-4"
						style={isDarkMode
							? " font-family: 'The Amazing Spider-Man', sans-serif!important"
							: ""}
						use:scrollDirectionAnimate={{
							type: "shadow-reveal",
							delay: 400,
							duration: 800,
						}}
					>
						About Me
					</h2>
				</div>
			</SpidermanFont>

			<div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
				<!-- 3D Avatar - Shadow reveal from darkness -->
				<div
					class="about-image-container"
					use:scrollDirectionAnimate={{
						type: "shadow-reveal",
						delay: 600,
						duration: 800,
					}}
				>
					<div class="relative flex justify-center">
						<!-- Avatar with Cursor Reveal -->
						<div
							class="w-80 h-96 md:w-96 md:h-[30rem] cursor-pointer relative overflow-hidden rounded-lg"
							onmouseenter={() => (isHovering = true)}
							onmouseleave={() => (isHovering = false)}
							onmousemove={(e) => {
								const rect =
									e.currentTarget.getBoundingClientRect();
								mouseX =
									((e.clientX - rect.left) / rect.width) *
									100;
								mouseY =
									((e.clientY - rect.top) / rect.height) *
									100;
							}}
							role="img"
							aria-label="Avatar"
						>
							<!-- Base Avatar -->
							<ProtectedImage
								src="/avatar.jpg"
								alt="Avatar"
								className="w-full h-full object-cover"
							/>

							<!-- Spider-Man Reveal (Dark Mode Only) -->
							{#if isDarkMode}
								<div
									class="spiderman-reveal"
									class:visible={isHovering}
									style="--mouse-x: {mouseX}%; --mouse-y: {mouseY}%;"
								>
									<ProtectedImage
										src="/spiderman.jpg"
										alt="Spider-Man"
										className="w-full h-full object-cover"
									/>
								</div>
							{/if}
						</div>

						<!-- Role Badge -->
						<div
							class="absolute -bottom-3 -right-2 md:-right-4 p-4 bg-card rounded-sm shadow-elevated border border-border"
						>
							<span class="text-sm font-medium text-gold-500"
								>{profile.role}</span
							>
						</div>

						<!-- Floating decorations -->
						<div
							class="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gold-500/20 animate-pulse"
						></div>
						<div
							class="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-gold-500/30 animate-pulse"
							style="animation-delay: 0.5s;"
						></div>
					</div>
				</div>

				<!-- Content - Mysterious fade with blur -->
				<div
					class="about-content space-y-6"
					use:scrollDirectionAnimate={{
						type: "mysterious-fade",
						delay: 900,
						duration: 800,
					}}
				>
					<div class="flex items-center gap-2 text-muted-foreground">
						<MapPin class="w-4 h-4" />
						<span class="text-sm">{profile.location}</span>
					</div>

					<p
						class="text-lg md:text-xl leading-relaxed text-espresso-800 dark:text-cream-100"
					>
						{profile.bio}
					</p>

					<p class="text-muted-foreground leading-relaxed">
						I believe in the power of React and Svelte to transform
						ideas into reality. Every line of code is an opportunity
						to create something meaningful.
					</p>

					<!-- Journey - Stagger reveal -->
					<div class="pt-2">
						<h3
							class="text-lg font-medium flex items-center gap-2 text-espresso-800 dark:text-cream-100 mb-4"
						>
							<span>My Journey</span>
							<ArrowRight class="w-4 h-4 text-gold-500" />
						</h3>
						<div class="space-y-4">
							{#each journey as item, index}
								<div
									class="flex gap-4 items-start journey-item"
									use:scrollDirectionAnimate={{
										type: "stagger-reveal",
										delay: 1200 + index * 150,
										duration: 800,
										index: index,
									}}
								>
									<div class="flex flex-col items-center">
										<div
											class="w-2 h-2 rounded-full bg-gold-500 mt-1.5 animate-mystic-pulse"
										></div>
										{#if index < journey.length - 1}
											<div
												class="w-px h-12 bg-espresso-200 dark:bg-espresso-700 mt-2"
											></div>
										{/if}
									</div>
									<div class="pt-0.5">
										<span
											class="text-sm font-medium text-espresso-700 dark:text-cream-200"
											>{item.year}</span
										>
										<p
											class="text-muted-foreground text-sm mt-0.5"
										>
											{item.description}
										</p>
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

	:global(canvas) {
		border-radius: 8px;
		pointer-events: none;
		position: relative;
		z-index: 0;
	}

	/* Spider-Man cursor reveal overlay */
	.spiderman-reveal {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		opacity: 0;
		transition: opacity 0.2s ease;
		pointer-events: none;
		mask-image: radial-gradient(
			circle 80px at var(--mouse-x) var(--mouse-y),
			black 0%,
			black 100%,
			transparent 100%
		);
		-webkit-mask-image: radial-gradient(
			circle 80px at var(--mouse-x) var(--mouse-y),
			black 0%,
			black 100%,
			transparent 100%
		);
		mask-size: 100% 100%;
		-webkit-mask-size: 100% 100%;
		mask-repeat: no-repeat;
		-webkit-mask-repeat: no-repeat;
	}

	.spiderman-reveal.visible {
		opacity: 1;
	}
</style>
