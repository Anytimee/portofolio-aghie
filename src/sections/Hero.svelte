<script lang="ts">
	import { Button } from "$lib/components/ui";
	import { profile, socials } from "$lib/data";
	import { Github, Linkedin, Twitter, Mail, ArrowRight, ChevronDown, Code } from "lucide-svelte";
	import { onMount } from "svelte";

	let mounted = $state(false);
	let typedName = $state("");
	let isTypingComplete = $state(false);
	let heroElement: HTMLElement;
	let typingTimeout: ReturnType<typeof setTimeout> | null = null;
	let wasInView = $state(false);

	onMount(() => {
		mounted = true;
		
		// Start typing animation on mount
		startTypingAnimation();

		// Set up scroll detection
		const handleScroll = () => {
			if (!heroElement) return;
			
			const rect = heroElement.getBoundingClientRect();
			const isInView = rect.top <= window.innerHeight * 0.5 && rect.bottom > 0;
			
			// When scrolling back UP to Hero section
			if (isInView && !wasInView) {
				// Restart typing animation
				restartTypingAnimation();
			}
			
			wasInView = isInView;
		};

		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (typingTimeout) clearTimeout(typingTimeout);
		};
	});

	const restartTypingAnimation = () => {
		// Clear any existing timeout
		if (typingTimeout) {
			clearTimeout(typingTimeout);
			typingTimeout = null;
		}
		
		// Reset state
		typedName = "";
		isTypingComplete = false;
		
		// Start typing animation
		startTypingAnimation();
	};

	const startTypingAnimation = () => {
		// Extract first name from full name
		const fullName = profile.name.split(' ').slice(0, 2).join(' ');
		let currentIndex = 0;
		const charDuration = 100;

		const typeChar = () => {
			if (currentIndex < fullName.length) {
				typedName = fullName.slice(0, currentIndex + 1);
				currentIndex++;
				typingTimeout = setTimeout(typeChar, charDuration);
			} else {
				isTypingComplete = true;
			}
		};

		typeChar();
	};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const socialIcons: Record<string, any> = {
		github: Github,
		linkedin: Linkedin,
		twitter: Twitter,
		mail: Mail,
		code: Code
	};
</script>

<section
	id="home"
	class="relative min-h-screen flex items-center justify-center overflow-hidden"
	bind:this={heroElement}
>
	<!-- Subtle background pattern -->
	<div class="absolute inset-0 bg-dots opacity-40"></div>
	
	<!-- Mysterious floating orbs - Parallax depth -->
	<div class="absolute inset-0 pointer-events-none overflow-hidden">
		<div class="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-500/5 dark:bg-gold-500/3 blur-3xl animate-slow-float"></div>
		<div class="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-espresso-300/5 dark:bg-espresso-700/10 blur-3xl animate-slow-float" style="animation-delay: -3s;"></div>
		<div class="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-gold-500/3 dark:bg-gold-500/5 blur-2xl animate-parallax" style="animation-delay: -5s;"></div>
	</div>
	
	<!-- Vignette overlay for mysterious atmosphere -->
	<div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/50"></div>
	
	<!-- Subtle warm glow lines -->
	<div class="absolute inset-0 pointer-events-none">
		<div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
		<div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent"></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<div class="max-w-4xl mx-auto text-center">
			<!-- Available indicator - Visible immediately on load -->
			<div 
				class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-card border border-border text-xs tracking-wide text-muted-foreground mb-10 animate-fade-in"
				style="animation-delay: 300ms;"
			>
				<span class="w-1.5 h-1.5 rounded-full bg-gold-500 animate-mystic-pulse"></span>
				Available for projects
			</div>

			<!-- Name with elegant typography - Visible immediately with typing animation on load -->
			<h1 
				class="text-display mb-8 animate-fade-in-up"
				style="animation-delay: 600ms;"
			>
				<span 
						class="text-muted-foreground font-normal"
						style="animation-delay: 400ms;"
					>Hello, I'm</span>
				<br />
				<span 
					class="text-espresso-800 dark:text-cream-100"
				>{typedName}<span class="typing-cursor" class:hidden={isTypingComplete}></span></span>
			</h1>

			<!-- Role - Visible immediately on load -->
			<p 
				class="text-2xl md:text-3xl lg:text-4xl text-espresso-600 dark:text-gold-400/80 font-light mb-6 tracking-wide animate-fade-in-up"
				style="animation-delay: 800ms;"
			>
				{profile.role}
			</p>

			<!-- Tagline - Visible immediately on load -->
			<p 
				class="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
				style="animation-delay: 1100ms;"
			>
				{profile.tagline}
			</p>

			<!-- CTA Buttons - Visible immediately on load -->
			<div 
				class="flex flex-col sm:flex-row gap-5 justify-center mb-16 animate-fade-in-up"
				style="animation-delay: 1400ms;"
			>
				<Button 
					size="lg" 
					onclick={() => scrollToSection("projects")}
					class="rounded-none px-8 py-6 text-sm tracking-wider bg-espresso-800 hover:bg-espresso-700 dark:bg-gold-500 dark:hover:bg-gold-400 dark:text-espresso-900 text-cream-50 border-0 transition-all duration-300 group"
				>
					<span class="mr-2">View Projects</span>
					<ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
				</Button>
				<Button 
					size="lg" 
					variant="outline"
					onclick={() => scrollToSection("contact")}
					class="rounded-none px-8 py-6 text-sm tracking-wider border-espresso-300 dark:border-espresso-600 hover:bg-espresso-100 dark:hover:bg-espresso-800/50 transition-all duration-300"
				>
					<Mail class="w-4 h-4 mr-2" />
					Contact
				</Button>
			</div>

			<!-- Social Links - Visible immediately on load -->
			<div 
				class="flex justify-center gap-3 animate-fade-in-up"
				style="animation-delay: 1700ms;"
			>
				{#each socials as social, i}
					{@const Icon = socialIcons[social.icon]}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="p-3 rounded-sm bg-transparent hover:bg-card border border-transparent hover:border-border transition-all duration-300 group animate-fade-in"
						style="animation-delay: {1900 + i * 100}ms;"
						aria-label={social.name}
					>
						<Icon class="w-5 h-5 text-muted-foreground/60 group-hover:text-gold-500 transition-colors duration-300" />
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- Scroll indicator - Visible immediately on load -->
	<button 
		onclick={() => scrollToSection("about")}
		class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground/40 hover:text-gold-500/60 transition-colors cursor-pointer group animate-fade-in"
		style="animation-delay: 2200ms;"
	>
		<span class="text-xs uppercase tracking-[0.2em]">Explore</span>
		<ChevronDown class="w-5 h-5 transition-transform duration-500 group-hover:translate-y-1" />
	</button>
</section>

<style>
	.typing-cursor {
		display: inline-block;
		width: 2px;
		height: 1.2em;
		margin-left: 2px;
		background-color: currentColor;
		vertical-align: text-bottom;
		animation: typing-cursor-blink 1s infinite;
	}

	@keyframes typing-cursor-blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}
</style>
