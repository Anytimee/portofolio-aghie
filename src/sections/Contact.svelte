<script lang="ts">
	import { profile } from "$lib/data";
	import { Card, CardContent, CardHeader } from "$lib/components/ui";
	import { Input } from "$lib/components/ui";
	import { Button } from "$lib/components/ui";
	import { Mail, MapPin, Clock, Send, CheckCircle } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";

	let name = $state("");
	let email = $state("");
	let message = $state("");
	let isSubmitting = $state(false);
	let submitStatus = $state<"idle" | "success" | "error">("idle");
	let errors = $state({ name: "", email: "", message: "" });

	const profileEmail = profile.email;
	const profileLocation = profile.location;

	function validateEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	function validateForm(): boolean {
		let isValid = true;
		errors = { name: "", email: "", message: "" };

		if (!name.trim()) {
			errors.name = "Name is required";
			isValid = false;
		}

		if (!email.trim()) {
			errors.email = "Email is required";
			isValid = false;
		} else if (!validateEmail(email)) {
			errors.email = "Please enter a valid email";
			isValid = false;
		}

		if (!message.trim()) {
			errors.message = "Message is required";
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (!validateForm()) { return; }

		isSubmitting = true;
		submitStatus = "idle";

		await new Promise(resolve => setTimeout(resolve, 1000));

		isSubmitting = false;
		submitStatus = "success";
		
		name = "";
		email = "";
		message = "";

		setTimeout(() => { submitStatus = "idle"; }, 5000);
	}
</script>

<section id="contact" class="py-24 md:py-32 relative overflow-hidden">
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
			>Get in touch</span>
			<h2 
				class="text-display"
				use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 400, duration: 800 }}
			>Contact</h2>
			<p 
				class="text-muted-foreground text-lg max-w-2xl mx-auto mt-6"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 600, duration: 800 }}
			>Get in touch for collaborations or just to say hello</p>
		</div>

		<div class="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
			<!-- Contact Form - Form reveal -->
			<div 
				class="contact-form-container"
				use:scrollDirectionAnimate={{ type: 'form-reveal', delay: 800, duration: 800 }}
			>
				<Card class="bg-card/70 border-border overflow-hidden">
					<CardHeader>
						<h3 class="text-xl font-medium flex items-center gap-2 text-espresso-800 dark:text-cream-100">
							<Send class="w-5 h-5 text-gold-500" />
							Send a Message
						</h3>
						<p class="text-muted-foreground text-sm mt-2">Fill out the form below and I will get back to you as soon as possible.</p>
					</CardHeader>
					<CardContent>
						<form onsubmit={handleSubmit} class="space-y-5">
							<div class="space-y-2">
								<label for="name" class="text-sm font-medium text-espresso-700 dark:text-cream-200">Name</label>
								<Input 
									id="name"
									type="text" 
									placeholder="Your name" 
									bind:value={name}
									class="{errors.name ? 'border-red-500' : ''} bg-muted/50 border-border focus:border-gold-500 rounded-sm"
								/>
								{#if errors.name}
									<p class="text-xs text-red-500">{errors.name}</p>
								{/if}
							</div>

							<div class="space-y-2">
								<label for="email" class="text-sm font-medium text-espresso-700 dark:text-cream-200">Email</label>
								<Input 
									id="email"
									type="email" 
									placeholder="your@email.com" 
									bind:value={email}
									class="{errors.email ? 'border-red-500' : ''} bg-muted/50 border-border focus:border-gold-500 rounded-sm"
								/>
								{#if errors.email}
									<p class="text-xs text-red-500">{errors.email}</p>
								{/if}
							</div>

							<div class="space-y-2">
								<label for="message" class="text-sm font-medium text-espresso-700 dark:text-cream-200">Message</label>
								<textarea 
									id="message"
									class="flex min-h-[140px] w-full rounded-sm border border-border bg-muted/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 transition-all duration-200 {errors.message ? 'border-red-500' : ''}"
									placeholder="Your message..."
									bind:value={message}
								></textarea>
								{#if errors.message}
									<p class="text-xs text-red-500">{errors.message}</p>
								{/if}
							</div>

							<Button 
								type="submit" 
								class="w-full rounded-sm bg-espresso-800 hover:bg-espresso-700 dark:bg-gold-500 dark:hover:bg-gold-400 dark:text-espresso-900 font-medium transition-all duration-300"
								disabled={isSubmitting}
							>
								{#if isSubmitting}
									Sending...
								{:else}
									<Send class="w-4 h-4 mr-2" />
									Send Message
								{/if}
							</Button>

							{#if submitStatus === "success"}
								<div class="p-3 rounded-sm bg-green-500/10 text-green-500 text-sm text-center flex items-center justify-center gap-2">
									<CheckCircle class="w-4 h-4" />
									Message sent successfully!
								</div>
							{/if}

							{#if submitStatus === "error"}
								<div class="p-3 rounded-sm bg-red-500/10 text-red-500 text-sm text-center">
									Something went wrong. Please try again.
								</div>
							{/if}
						</form>
					</CardContent>
				</Card>
			</div>

			<!-- Contact Info - Mysterious fade -->
			<div 
				class="contact-info-container"
				use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 1100, duration: 800 }}
			>
				<Card class="h-full bg-card/70 border-border">
					<CardHeader>
						<h3 class="text-xl font-medium flex items-center gap-2 text-espresso-800 dark:text-cream-100">
							<Mail class="w-5 h-5 text-gold-500" />
							Contact Information
						</h3>
						<p class="text-muted-foreground text-sm mt-2">Feel free to reach out through any of these channels.</p>
					</CardHeader>
					<CardContent class="space-y-5">
						<!-- Email -->
						<div class="flex items-start gap-4 p-4 rounded-sm bg-muted/30 border border-border/50">
							<div class="w-11 h-11 rounded-sm bg-espresso-100 dark:bg-espresso-800 flex items-center justify-center flex-shrink-0">
								<Mail class="w-5 h-5 text-gold-500" />
							</div>
							<div>
								<p class="font-medium text-espresso-800 dark:text-cream-100">Email</p>
								<a href="mailto:{profileEmail}" class="text-muted-foreground hover:text-gold-500 transition-colors">{profileEmail}</a>
							</div>
						</div>

						<!-- Location -->
						<div class="flex items-start gap-4 p-4 rounded-sm bg-muted/30 border border-border/50">
							<div class="w-11 h-11 rounded-sm bg-espresso-100 dark:bg-espresso-800 flex items-center justify-center flex-shrink-0">
								<MapPin class="w-5 h-5 text-gold-500" />
							</div>
							<div>
								<p class="font-medium text-espresso-800 dark:text-cream-100">Location</p>
								<p class="text-muted-foreground">{profileLocation}</p>
							</div>
						</div>

						<!-- Availability -->
						<div class="flex items-start gap-4 p-4 rounded-sm bg-muted/30 border border-border/50">
							<div class="w-11 h-11 rounded-sm bg-espresso-100 dark:bg-espresso-800 flex items-center justify-center flex-shrink-0">
								<Clock class="w-5 h-5 text-gold-500" />
							</div>
							<div>
								<p class="font-medium text-espresso-800 dark:text-cream-100">Availability</p>
								<p class="text-muted-foreground">Open to new opportunities</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-form-container, .contact-info-container {
		will-change: opacity, filter, transform;
	}
</style>
