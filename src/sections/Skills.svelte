<script lang="ts">
	import { skills } from "$lib/data";
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription,
	} from "$lib/components/ui";
	import { Code2, Server, Database, Wrench } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";
	import SpidermanFont from "$lib/components/SpidermanFont.svelte";

	let skillCardRefs: HTMLDivElement[] = [];

	const iconMap: Record<string, any> = {
		Code2,
		Server,
		Database,
		Wrench,
	};

	const categories = [
		{
			title: "Frontend",
			description: "Building beautiful user interfaces",
			skills: skills.frontend,
			delay: 0,
			icon: Code2,
			borderColor: "border-espresso-300 dark:border-espresso-600",
			hoverBorder:
				"hover:border-espresso-400 dark:hover:border-espresso-500",
		},
		{
			title: "Backend",
			description: "Creating robust server solutions",
			skills: skills.backend,
			delay: 200,
			icon: Server,
			borderColor: "border-espresso-300 dark:border-espresso-600",
			hoverBorder:
				"hover:border-espresso-400 dark:hover:border-espresso-500",
		},
		{
			title: "Tools",
			description: "Development & deployment tools",
			skills: skills.tools,
			delay: 600,
			icon: Wrench,
			borderColor: "border-espresso-300 dark:border-espresso-600",
			hoverBorder:
				"hover:border-espresso-400 dark:hover:border-espresso-500",
		},
	];

	// Map skill names to Lucide icons for better compatibility
	const skillIconMap: Record<string, any> = {
		JavaScript: Code2,
		TypeScript: Code2,
		Python: Code2,
		SQL: Database,
		React: Code2,
		"Svelte/SvelteKit": Code2,
		TailwindCSS: Code2,
		"HTML/CSS": Code2,
		"Node.js": Server,
		PostgreSQL: Database,
		"REST APIs": Server,
		Git: Code2,
		Vercel: Server,
		Figma: Code2,
	};

	function getSkillIcon(skillName: string) {
		return skillIconMap[skillName] || Code2;
	}

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
		card.style.transform =
			"perspective(1000px) rotateX(0) rotateY(0) scale(1)";
	}
</script>

<section id="skills" class="py-12 md:py-16 relative overflow-hidden">
	<!-- Background -->
	<div class="absolute inset-0 bg-dots opacity-20"></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="max-w-6xl mx-auto">
			<!-- Section Heading -->
			<div class="text-center mb-12">
				<SpidermanFont>
					<span
						class="text-xs uppercase tracking-[0.2em] text-espresso-500 dark:text-cream-300 mb-4 block"
						use:scrollDirectionAnimate={{
							type: "mysterious-fade",
							delay: 200,
							duration: 800,
						}}>What I work with</span
					>
					<h2
						class="text-3xl md:text-4xl font-bold text-espresso-800 dark:text-cream-100 mb-4"
						use:scrollDirectionAnimate={{
							type: "shadow-reveal",
							delay: 400,
							duration: 800,
						}}
					>
						Skills
					</h2>
				</SpidermanFont>

				<p
					class="text-muted-foreground text-lg max-w-2xl mx-auto mt-4 leading-relaxed"
					use:scrollDirectionAnimate={{
						type: "mysterious-fade",
						delay: 600,
						duration: 800,
					}}
				>
					Technologies and tools I work with to bring ideas to life
				</p>
			</div>

			<!-- Skills Grid -->
			<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
				{#each categories as category, index}
					<div
						class="h-full"
						use:scrollDirectionAnimate={{
							type: "stagger-reveal",
							delay: 800 + index * 200,
							duration: 800,
							index: index,
						}}
					>
						<div
							class="h-full bg-gray-50 rounded-lg p-4 border border-gray-200"
							bind:this={skillCardRefs[index]}
							onmousemove={(e) => handleMouseMove(e, index)}
							onmouseleave={() => handleMouseLeave(index)}
							role="article"
							style="transform-style: preserve-3d; transition: transform 0.3s ease;"
						>
							<div class="mb-4">
								<div class="flex items-center gap-3 mb-2">
									<div class="p-2 rounded bg-blue-100">
										<svelte:component
											this={category.icon}
											class="w-5 h-5 text-blue-600"
										/>
									</div>
									<h3
										class="text-lg font-semibold text-gray-800"
									>
										{category.title}
									</h3>
								</div>
								<p class="text-muted-foreground text-sm">
									{category.description}
								</p>
							</div>

							<div class="flex flex-wrap gap-2">
								{#each category.skills as skill, skillIndex}
									{@const SkillIcon = getSkillIcon(
										skill.name,
									)}
									<div
										class="px-3 py-2 bg-white rounded-md text-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-default flex items-center gap-2"
										use:scrollDirectionAnimate={{
											type: "stagger-reveal",
											delay:
												1200 +
												index * 200 +
												skillIndex * 50,
											duration: 800,
											index: skillIndex,
										}}
									>
										<SkillIcon
											class="w-4 h-4 text-blue-500"
										/>
										<span class="text-gray-700 text-sm">
											{skill.name}
										</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
