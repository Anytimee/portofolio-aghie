<script lang="ts">
	import { skills } from "$lib/data";
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui";
	import { Code2, Server, Database, Wrench } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";

	let skillCardRefs: HTMLDivElement[] = [];

	const iconMap: Record<string, any> = {
		Code2,
		Server,
		Database,
		Wrench
	};

	const categories = [
		{
			title: "Frontend",
			description: "Building beautiful user interfaces",
			skills: skills.frontend,
			delay: 0,
			icon: Code2,
			borderColor: "border-espresso-300 dark:border-espresso-600",
			hoverBorder: "hover:border-espresso-400 dark:hover:border-espresso-500"
		},
		{
			title: "Backend",
			description: "Creating robust server solutions",
			skills: skills.backend,
			delay: 200,
			icon: Server,
			borderColor: "border-espresso-300 dark:border-espresso-600",
			hoverBorder: "hover:border-espresso-400 dark:hover:border-espresso-500"
		},
		{
			title: "Tools",
			description: "Development & deployment tools",
			skills: skills.tools,
			delay: 600,
			icon: Wrench,
			borderColor: "border-espresso-300 dark:border-espresso-600",
			hoverBorder: "hover:border-espresso-400 dark:hover:border-espresso-500"
		}
	];

	function handleMouseMove(event: MouseEvent, cardIndex: number) {
		const card = skillCardRefs[cardIndex];
		if (!card) return;

		const rect = card.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = (y - centerY) / 30;
		const rotateY = (centerX - x) / 30;

		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
	}

	function handleMouseLeave(cardIndex: number) {
		const card = skillCardRefs[cardIndex];
		if (!card) return;
		card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
	}
</script>

<section 
	id="skills" 
	class="py-24 md:py-32 relative overflow-hidden"
>
	<!-- Background -->
	<div class="absolute inset-0 bg-dots opacity-20"></div>

	<div class="container mx-auto px-6 relative z-10">
		<!-- Section Heading -->
		<div class="text-center mb-20">
			<span 
				class="text-xs uppercase tracking-[0.2em] text-espresso-500 dark:text-cream-300 mb-4 block"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 200, duration: 800 }}
			>What I work with</span>
			<h2 
				class="text-display text-espresso-800 dark:text-cream-100"
				use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 400, duration: 800 }}
			>Skills</h2>
			
			<p 
				class="text-muted-foreground text-lg max-w-2xl mx-auto mt-6"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 600, duration: 800 }}
			>
				Technologies and tools I work with to bring ideas to life
			</p>
		</div>

		<!-- 3D Skills Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
			{#each categories as category, index}
				<div 
					class="h-full"
					use:scrollDirectionAnimate={{ type: 'stagger-reveal', delay: 800 + index * 200, duration: 800, index: index }}
				>
					<div 
						class="h-full"
						bind:this={skillCardRefs[index]}
						onmousemove={(e) => handleMouseMove(e, index)}
						onmouseleave={() => handleMouseLeave(index)}
						role="article"
						style="transform-style: preserve-3d; transition: transform 0.3s ease;"
					>
						<Card class="h-full bg-card/60 border border-espresso-200 dark:border-espresso-700 transition-all duration-300 {category.hoverBorder} cursor-pointer">
							<CardHeader>
								<div class="flex items-center gap-3 mb-3">
									<div class="p-2.5 rounded-sm bg-espresso-100 dark:bg-espresso-800">
										<svelte:component this={category.icon} class="w-5 h-5 text-espresso-600 dark:text-cream-300" />
									</div>
									<CardTitle class="text-xl text-espresso-800 dark:text-cream-100">{category.title}</CardTitle>
								</div>
								<CardDescription class="text-muted-foreground">{category.description}</CardDescription>
							</CardHeader>
							
							<CardContent>
								<div class="flex flex-wrap gap-2">
									{#each category.skills as skill, skillIndex}
										<div 
											class="px-3.5 py-2 bg-muted/40 rounded-sm text-sm border border-espresso-200/50 dark:border-espresso-700/50 hover:border-espresso-400 dark:hover:border-espresso-600 transition-all duration-200 cursor-default"
											use:scrollDirectionAnimate={{ type: 'stagger-reveal', delay: 1200 + index * 200 + skillIndex * 50, duration: 800, index: skillIndex }}
										>
											<span class="text-base mr-1.5">{skill.icon}</span>
											<span class="text-muted-foreground text-sm">
												{skill.name}
											</span>
										</div>
									{/each}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
