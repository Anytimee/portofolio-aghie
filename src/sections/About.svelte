<script lang="ts">
	import { profile } from "$lib/data";
	import { MapPin, ArrowRight } from "lucide-svelte";
	import { scrollDirectionAnimate } from "$lib/utils/animation";
	import { onMount } from "svelte";
	import * as THREE from "three";

	let canvasContainer: HTMLDivElement;
	let mouseX = $state(0);
	let mouseY = $state(0);

	const journey = [
		{ year: "Beginning", description: "Started learning web development and fell in love with React" },
		{ year: "Learning", description: "Mastered Svelte, React, and modern frontend tools" },
		{ year: "Growing", description: "Built real-world projects with Node.js and databases" },
		{ year: "Now", description: "Creating beautiful web experiences with React & Svelte" }
	];

	onMount(() => {
		// Scene setup
		const scene = new THREE.Scene();
		
		// Camera
		const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
		camera.position.z = 6;
		
		// Renderer
		const renderer = new THREE.WebGLRenderer({ 
			alpha: true, 
			antialias: true 
		});
		renderer.setSize(400, 500);
		renderer.setPixelRatio(window.devicePixelRatio);
		canvasContainer.appendChild(renderer.domElement);
		
		// Load avatar texture
		const textureLoader = new THREE.TextureLoader();
		textureLoader.load(
			'/avatar.jpg',
			(texture) => {
				// Create photo frame geometry
				const frameGeometry = new THREE.BoxGeometry(3, 3.8, 0.15);
				
				// Create materials for each face
				const frameMaterial = new THREE.MeshStandardMaterial({
					color: 0x1a1a2e,
					metalness: 0.3,
					roughness: 0.7
				});
				
				// Photo material
				const photoMaterial = new THREE.MeshBasicMaterial({
					map: texture
				});
				
				// Create materials array for each face
				const materials = [
					frameMaterial, // right
					frameMaterial, // left
					frameMaterial, // top
					frameMaterial, // bottom
					photoMaterial, // front
					frameMaterial  // back
				];

				const frame = new THREE.Mesh(frameGeometry, materials);
				scene.add(frame);
				
				// Add glow effect
				const glowGeometry = new THREE.BoxGeometry(3.2, 4, 0.1);
				const glowMaterial = new THREE.MeshBasicMaterial({
					color: 0xd4af37,
					transparent: true,
					opacity: 0.15
				});
				const glow = new THREE.Mesh(glowGeometry, glowMaterial);
				glow.position.z = -0.1;
				scene.add(glow);
				
				// Animation
				let targetRotationX = 0;
				let targetRotationY = 0;
				
				const animate = () => {
					requestAnimationFrame(animate);
					
					// Smooth rotation based on mouse
					targetRotationY = mouseX * 0.3;
					targetRotationX = mouseY * 0.3;
					
					frame.rotation.y += (targetRotationY - frame.rotation.y) * 0.05;
					frame.rotation.x += (targetRotationX - frame.rotation.x) * 0.05;
					
					// Gentle floating animation
					frame.position.y = Math.sin(Date.now() * 0.001) * 0.1;
					
					glow.rotation.y = frame.rotation.y;
					glow.rotation.x = frame.rotation.x;
					glow.position.y = frame.position.y;
					
					renderer.render(scene, camera);
				};
				
				animate();
			},
			undefined,
			(err) => {
				console.error('Error loading texture:', err);
				// Fallback: create a simple colored frame
				const geometry = new THREE.BoxGeometry(3, 3.8, 0.15);
				const material = new THREE.MeshStandardMaterial({
					color: 0xd4af37,
					metalness: 0.5,
					roughness: 0.5
				});
				const cube = new THREE.Mesh(geometry, material);
				scene.add(cube);
				
				const animate = () => {
					requestAnimationFrame(animate);
					cube.rotation.y = mouseX * 0.3;
					cube.rotation.x = mouseY * 0.3;
					cube.position.y = Math.sin(Date.now() * 0.001) * 0.1;
					renderer.render(scene, camera);
				};
				animate();
			}
		);
		
		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);
		
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);
		
		const pointLight = new THREE.PointLight(0xd4af37, 0.5);
		pointLight.position.set(-3, 2, 4);
		scene.add(pointLight);
		
		// Mouse move handler
		const handleMouseMove = (event: MouseEvent) => {
			const rect = canvasContainer.getBoundingClientRect();
			mouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
			mouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
		};
		
		canvasContainer.addEventListener('mousemove', handleMouseMove);
		
		// Cleanup
		return () => {
			canvasContainer.removeEventListener('mousemove', handleMouseMove);
			renderer.dispose();
		};
	});
</script>

<section id="about" class="py-12 md:py-16 relative overflow-hidden">
	<!-- Subtle background -->
	<div class="absolute inset-0 bg-dots opacity-30"></div>

	<!-- Mysterious shadow overlay for reveal effect -->
	<div class="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-background/20 to-transparent"></div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="max-w-6xl mx-auto">
			<!-- Section Header - Mysterious fade -->
			<div class="text-center mb-12">
				<span 
					class="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4 block"
					use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 200, duration: 800 }}
				>Get to know me</span>
				<h2 
					class="text-3xl md:text-4xl font-bold text-espresso-800 dark:text-cream-100 mb-4"
					use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 400, duration: 800 }}
				>About Me</h2>
			</div>

			<div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
				<!-- 3D Avatar - Shadow reveal from darkness -->
				<div 
					class="about-image-container"
					use:scrollDirectionAnimate={{ type: 'shadow-reveal', delay: 600, duration: 800 }}
				>
					<div class="relative flex justify-center">
						<!-- 3D Canvas Container -->
						<div 
							bind:this={canvasContainer}
							class="w-80 h-96 md:w-96 md:h-[30rem] cursor-pointer"
							style="perspective: 1000px;"
						></div>
						
						<!-- Role Badge -->
						<div class="absolute -bottom-3 -right-2 md:-right-4 p-4 bg-card rounded-sm shadow-elevated border border-border">
							<span class="text-sm font-medium text-gold-500">{profile.role}</span>
						</div>
						
						<!-- Floating decorations -->
						<div class="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gold-500/20 animate-pulse"></div>
						<div class="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-gold-500/30 animate-pulse" style="animation-delay: 0.5s;"></div>
					</div>
				</div>

				<!-- Content - Mysterious fade with blur -->
				<div 
					class="about-content space-y-6"
					use:scrollDirectionAnimate={{ type: 'mysterious-fade', delay: 900, duration: 800 }}
				>
					<div class="flex items-center gap-2 text-muted-foreground">
						<MapPin class="w-4 h-4" />
						<span class="text-sm">{profile.location}</span>
					</div>

					<p class="text-lg md:text-xl leading-relaxed text-espresso-800 dark:text-cream-100">
						{profile.bio}
					</p>

					<p class="text-muted-foreground leading-relaxed">
						I believe in the power of React and Svelte to transform ideas into reality. 
						Every line of code is an opportunity to create something meaningful.
					</p>

					<!-- Journey - Stagger reveal -->
					<div class="pt-2">
						<h3 class="text-lg font-medium flex items-center gap-2 text-espresso-800 dark:text-cream-100 mb-4">
							<span>My Journey</span>
							<ArrowRight class="w-4 h-4 text-gold-500" />
						</h3>
						<div class="space-y-4">
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
	
	:global(canvas) {
		border-radius: 8px;
	}
</style>
