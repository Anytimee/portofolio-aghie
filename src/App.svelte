<script lang="ts">
	import { onMount } from "svelte";
	import Navbar from "./sections/Navbar.svelte";
	import Hero from "./sections/Hero.svelte";
	import About from "./sections/About.svelte";
	import Skills from "./sections/Skills.svelte";
	import Projects from "./sections/Projects.svelte";
	import Experience from "./sections/Experience.svelte";
	import Contact from "./sections/Contact.svelte";
	import Footer from "./sections/Footer.svelte";
	import AdminLogin from "./pages/AdminLogin.svelte";
	import AdminDashboard from "./pages/AdminDashboard.svelte";
	import { initScrollDirection } from "$lib/utils/animation";
	import { authStore } from "$lib/stores/authStore";

	let currentRoute = $state("");
	let isAuthenticated = $state(false);

	onMount(() => {
		initScrollDirection();

		// Check initial auth state
		isAuthenticated = authStore.isAuthenticated();

		// Listen for hash changes
		const handleHashChange = () => {
			currentRoute = window.location.hash.slice(1) || "/";
		};

		window.addEventListener("hashchange", handleHashChange);
		handleHashChange();

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	});

	// Check if we're on an admin route
	const isAdminRoute = $derived(currentRoute.startsWith("/admin"));
	const isLoginPage = $derived(
		currentRoute === "/admin" || currentRoute === "/admin/login",
	);
	const isDashboardPage = $derived(currentRoute === "/admin/dashboard");
</script>

{#if isAdminRoute}
	{#if isDashboardPage && isAuthenticated}
		<AdminDashboard />
	{:else if isLoginPage}
		<AdminLogin />
	{:else}
		<!-- Redirect to login -->
		<AdminLogin />
	{/if}
{:else}
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
{/if}
