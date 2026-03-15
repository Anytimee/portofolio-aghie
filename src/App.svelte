<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from "./sections/Navbar.svelte";
	import Hero from "./sections/Hero.svelte";
	import About from "./sections/About.svelte";
	import Skills from "./sections/Skills.svelte";
	import Projects from "./sections/Projects.svelte";
	import Experience from "./sections/Experience.svelte";
	import Contact from "./sections/Contact.svelte";
	import Footer from "./sections/Footer.svelte";
	import { initScrollDirection } from '$lib/utils/animation';

	onMount(() => {
		initScrollDirection();
	});
</script>

<div class="min-h-screen bg-background text-foreground">
	<Navbar />
	<main>
		<Hero />
		<About />
		<Skills />
		<Projects />
		<Experience />
		<Contact />
	</main>
	<Footer />
</div>
