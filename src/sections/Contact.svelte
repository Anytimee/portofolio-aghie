<script lang="ts">
	import { profile } from "$lib/data";
	import { Card, CardContent, CardHeader } from "$lib/components/ui";
	import { Input } from "$lib/components/ui";
	import { Button } from "$lib/components/ui";
	import {
		Mail,
		MapPin,
		Clock,
		Send,
		CheckCircle,
		MessageCircle,
	} from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";
	import SpidermanFont from "$lib/components/SpidermanFont.svelte";

	let name = $state("");
	let email = $state("");
	let message = $state("");
	let isSubmitting = $state(false);
	let submitStatus = $state<"idle" | "success" | "error">("idle");
	let errors = $state({ name: "", email: "", message: "" });
	let isDarkMode = $state(false);

	$effect(() => {
		const checkDarkMode = () => {
			isDarkMode = document.documentElement.classList.contains("dark");
		};
		checkDarkMode();
		const observer = new MutationObserver(checkDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
	});

	const profileEmail = profile.email;
	const profileWhatsApp = profile.whatsapp;
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

		if (!validateForm()) {
			return;
		}

		isSubmitting = true;
		submitStatus = "idle";

		await new Promise((resolve) => setTimeout(resolve, 1000));

		isSubmitting = false;
		submitStatus = "success";

		name = "";
		email = "";
		message = "";

		setTimeout(() => {
			submitStatus = "idle";
		}, 5000);
	}

	function handleWhatsApp() {
		if (!name.trim() || !message.trim()) {
			errors = {
				name: name.trim() ? "" : "Name is required",
				email: "",
				message: message.trim() ? "" : "Message is required",
			};
			return;
		}

		const whatsappMessage = `Hi ${name}, ${message}`;
		const whatsappUrl = `https://wa.me/${profileWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;
		window.open(whatsappUrl, "_blank");
	}
</script>

<section id="contact" class="py-12 md:py-16 relative overflow-hidden">
	<!-- Background -->
	<div class="absolute inset-0 bg-dots opacity-30"></div>

	<!-- Mysterious gradient overlay -->
	<div
		class="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/50 via-transparent to-background/50"
	></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="max-w-6xl mx-auto">
			<!-- Section Header - Mysterious fade -->
			<div class="text-center mb-12">
				<SpidermanFont>
					<span
						class="text-xs uppercase tracking-[0.2em] text-gold-500 dark:text-[#E11D2E] mb-4 block"
						style={isDarkMode
							? " font-family: 'The Amazing Spider-Man', sans-serif!important"
							: ""}
						use:scrollDirectionAnimate={{
							type: "mysterious-fade",
							delay: 200,
							duration: 800,
						}}>Get in touch</span
					>
					<h2
						class="text-3xl md:text-4xl font-bold text-espresso-800 dark:text-cream-100 mb-4"
						style={isDarkMode
							? "  font-family: 'The Amazing Spider-Man', sans-serif!important"
							: ""}
						use:scrollDirectionAnimate={{
							type: "shadow-reveal",
							delay: 400,
							duration: 800,
						}}
					>
						Contact<span>{isDarkMode ? " –" : ""}</span>
					</h2>
				</SpidermanFont>
				<p
					class="text-muted-foreground text-lg max-w-2xl mx-auto mt-4 leading-relaxed"
					style={isDarkMode
						? " font-family: 'The Amazing Spider-Man', sans-serif!important"
						: ""}
					use:scrollDirectionAnimate={{
						type: "mysterious-fade",
						delay: 600,
						duration: 800,
					}}
				>
					Get in touch for collaborations or just to say hello
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8">
				<!-- Contact Form - Form reveal -->
				<div
					class="contact-form-container"
					use:scrollDirectionAnimate={{
						type: "form-reveal",
						delay: 800,
						duration: 800,
					}}
				>
					<Card
						class="bg-white border border-gray-200 rounded-lg shadow-sm"
					>
						<CardHeader>
							<h3
								class="text-xl font-semibold flex items-center gap-2 text-gray-800"
							>
								<Send class="w-5 h-5 text-blue-500" />
								Send a Message
							</h3>
							<p class="text-muted-foreground text-sm mt-2">
								Fill out the form below and I will get back to
								you as soon as possible.
							</p>
						</CardHeader>
						<CardContent>
							<form onsubmit={handleSubmit} class="space-y-5">
								<div class="space-y-2">
									<label
										for="name"
										class="text-sm font-medium text-gray-700"
										>Name</label
									>
									<Input
										id="name"
										type="text"
										placeholder="Your name"
										bind:value={name}
										class="{errors.name
											? 'border-red-500'
											: 'border-gray-300'} rounded-lg px-4 py-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
									/>
									{#if errors.name}
										<p class="text-xs text-red-500">
											{errors.name}
										</p>
									{/if}
								</div>

								<div class="space-y-2">
									<label
										for="email"
										class="text-sm font-medium text-gray-700"
										>Email</label
									>
									<Input
										id="email"
										type="email"
										placeholder="your@email.com"
										bind:value={email}
										class="{errors.email
											? 'border-red-500'
											: 'border-gray-300'} rounded-lg px-4 py-3 w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
									/>
									{#if errors.email}
										<p class="text-xs text-red-500">
											{errors.email}
										</p>
									{/if}
								</div>

								<div class="space-y-2">
									<label
										for="message"
										class="text-sm font-medium text-gray-700"
										>Message</label
									>
									<textarea
										id="message"
										class="flex min-h-[140px] w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 {errors.message
											? 'border-red-500'
											: ''}"
										placeholder="Your message..."
										bind:value={message}
									></textarea>
									{#if errors.message}
										<p class="text-xs text-red-500">
											{errors.message}
										</p>
									{/if}
								</div>

								<Button
									type="button"
									onclick={handleWhatsApp}
									class="w-full rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 transition-colors duration-200"
									disabled={isSubmitting}
								>
									<MessageCircle class="w-4 h-4 mr-2" />
									Send via WhatsApp
								</Button>

								{#if submitStatus === "success"}
									<div
										class="p-3 rounded-lg bg-green-500/10 text-green-500 text-sm text-center flex items-center justify-center gap-2"
									>
										<CheckCircle class="w-4 h-4" />
										Message sent successfully!
									</div>
								{/if}

								{#if submitStatus === "error"}
									<div
										class="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm text-center"
									>
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
					use:scrollDirectionAnimate={{
						type: "mysterious-fade",
						delay: 1100,
						duration: 800,
					}}
				>
					<Card
						class="h-full bg-white border border-gray-200 rounded-lg shadow-sm"
					>
						<CardHeader>
							<h3
								class="text-xl font-semibold flex items-center gap-2 text-gray-800"
							>
								<Mail class="w-5 h-5 text-blue-500" />
								Contact Information
							</h3>
							<p class="text-muted-foreground text-sm mt-2">
								Feel free to reach out through any of these
								channels.
							</p>
						</CardHeader>
						<CardContent class="space-y-4">
							<!-- Email -->
							<div
								class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100"
							>
								<div
									class="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"
								>
									<Mail class="w-5 h-5 text-blue-600" />
								</div>
								<div>
									<p class="font-medium text-gray-800">
										Email
									</p>
									<a
										href="mailto:{profileEmail}"
										class="text-muted-foreground hover:text-blue-500 transition-colors"
										>{profileEmail}</a
									>
								</div>
							</div>

							<!-- WhatsApp -->
							<div
								class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100"
							>
								<div
									class="w-11 h-11 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0"
								>
									<MessageCircle
										class="w-5 h-5 text-green-600"
									/>
								</div>
								<div>
									<p class="font-medium text-gray-800">
										WhatsApp
									</p>
									<a
										href="https://wa.me/{profileWhatsApp}"
										target="_blank"
										class="text-muted-foreground hover:text-green-500 transition-colors"
										>Chat on WhatsApp</a
									>
								</div>
							</div>

							<!-- Location -->
							<div
								class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100"
							>
								<div
									class="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"
								>
									<MapPin class="w-5 h-5 text-blue-600" />
								</div>
								<div>
									<p class="font-medium text-gray-800">
										Location
									</p>
									<p class="text-muted-foreground">
										{profileLocation}
									</p>
								</div>
							</div>

							<!-- Availability -->
							<div
								class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100"
							>
								<div
									class="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"
								>
									<Clock class="w-5 h-5 text-blue-600" />
								</div>
								<div>
									<p class="font-medium text-gray-800">
										Availability
									</p>
									<p class="text-muted-foreground">
										Open to new opportunities
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-form-container,
	.contact-info-container {
		will-change: opacity, filter, transform;
	}
</style>
