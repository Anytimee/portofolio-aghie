<script lang="ts">
	import { skills } from "$lib/data";
	import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui";
	import { Code2, Server, Wrench } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";

	const iconMap: Record<string, any> = {
		Code2,
		Server,
		Wrench
	};

	const categories = [
		{
			title: "Frontend",
			description: "Building beautiful user interfaces",
			skills: skills.frontend,
			delay: 0,
			icon: Code2
		},
		{
			title: "Backend",
			description: "Creating robust server solutions",
			skills: skills.backend,
			delay: 200,
			icon: Server
		},
		{
			title: "Tools",
			description: "Modern development tools",
			skills: skills.tools,
			delay: 400,
			icon: Wrench
		}
	];
</script>

<section 
	id="skills" 
	class="py-24 md:py-32 relative overflow-hidden"
>
	<!-- Background -->
	<div class="absolute inset-0 bg-dots opacity-30"></div>

	<!-- Mysterious gradient overlay -->
	<div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/30"></div>

	<div class="container mx-auto px-6 relative z-10">
		<!-- Section Heading - Mysterious fade -->
		<div class="text-center mb-20">
			<span 
				class="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4 block"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 200, duration: 800 }}
			>What I work with</span>
			<h2 
				class="text-display"
				use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 400, duration: 800 }}
			>Skills</h2>
			
			<p 
				class="text-muted-foreground text-lg max-w-2xl mx-auto mt-6"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 600, duration: 800 }}
			>
				Technologies and tools I work with to bring ideas to life
			</p>
		</div>

		<!-- Skills Grid - Stagger reveal -->
		<div class="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
			{#each categories as category, index}
				<div 
					class="h-full"
					use:scrollDirectionAnimate={{ type: 'stagger-reveal', delay: 800 + index * 200, duration: 800, index: index }}
				>
					<Card class="h-full bg-card/70 border-border transition-all duration-500 hover:shadow-elevated group overflow-hidden">
						<CardHeader>
							<div class="flex items-center gap-3 mb-3">
								<div class="p-2.5 rounded-sm bg-espresso-100 dark:bg-espresso-800">
									<svelte:component this={category.icon} class="w-5 h-5 text-gold-500" />
								</div>
								<CardTitle class="text-xl text-espresso-800 dark:text-cream-100">{category.title}</CardTitle>
							</div>
							<CardDescription class="text-muted-foreground">{category.description}</CardDescription>
						</CardHeader>
						
						<CardContent>
							<div class="flex flex-wrap gap-2">
								{#each category.skills as skill, skillIndex}
									<div 
										class="px-3.5 py-2 bg-muted/50 rounded-sm text-sm border border-border/50 hover:border-gold-500/30 hover:bg-espresso-50 dark:hover:bg-espresso-800/50 transition-all duration-200 cursor-default"
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
			{/each}
		</div>
	</div>
</section>
