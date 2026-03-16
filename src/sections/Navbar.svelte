<script lang="ts">
  import { profile } from "$lib/data";
  import Button from "$lib/components/ui/button.svelte";

  let mobileMenuOpen = $state(false);
  let darkMode = $state(false);
  let scrolled = $state(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const firstName = profile.name.split(" ")[0];
  const lastName = profile.name.split(" ").slice(1).join(" ");

  // The navbar should stay visible at all times
  // We only use scroll position to change background (blur effect), not to hide the navbar
  // Navbar stays fixed and visible regardless of scroll direction

  $effect(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function toggleDarkMode() {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function handleNavClick(event: MouseEvent, href: string) {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (mobileMenuOpen) {
      mobileMenuOpen = false;
    }
  }

  const navbarClasses = scrolled
    ? "bg-cream-100/95 dark:bg-espresso-900/95 backdrop-blur-md border-border/50 shadow-subtle"
    : "bg-transparent border-transparent";
</script>

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 translate-y-0"
>
  <div
    class="absolute inset-0 {navbarClasses} border-b transition-all duration-500"
  ></div>

  <div class="container mx-auto px-6 relative">
    <div class="flex h-16 md:h-20 items-center justify-between">
      <!-- Logo -->
      <a
        href="#home"
        class="flex items-center text-lg md:text-xl font-medium tracking-tight group relative z-10"
        onclick={(e) => handleNavClick(e, "#home")}
      >
        <span class="relative">
          <span
            class="text-espresso-800 dark:text-cream-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-300"
          >
            {firstName}
          </span>
          <span
            class="text-gold-500 group-hover:opacity-100 opacity-60 transition-opacity duration-300"
          >
            {lastName}
          </span>
          <span
            class="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300"
          ></span>
        </span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center gap-1">
        {#each navLinks as link}
          <a
            href={link.href}
            class="px-4 py-2 text-sm text-muted-foreground hover:text-espresso-800 dark:hover:text-cream-100 transition-all duration-200 relative group"
            onclick={(e) => handleNavClick(e, link.href)}
          >
            {link.name}
            <span
              class="absolute inset-x-4 -bottom-1 h-px bg-spider-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left dark:bg-[#E11D2E]"
            ></span>
          </a>
        {/each}
      </div>

      <!-- Desktop Actions -->
      <div class="hidden lg:flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onclick={toggleDarkMode}
          aria-label="Toggle dark mode"
          class="rounded-sm hover:bg-espresso-100 dark:hover:bg-espresso-800"
        >
          {#if darkMode}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-espresso-800 dark:text-cream-100"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-espresso-800"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          {/if}
        </Button>

        <Button
          onclick={(e) => handleNavClick(e, "#contact")}
          class="rounded-sm px-6 py-5 text-sm tracking-wider bg-espresso-800 hover:bg-espresso-700 dark:bg-transparent dark:hover:bg-[#E11D2E] dark:text-[#E11D2E] dark:border dark:border-[#E11D2E] dark:hover:text-[#0B0B0B] text-cream-50 border-0 transition-all duration-300"
        >
          Let's Talk
        </Button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex lg:hidden items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onclick={toggleDarkMode}
          aria-label="Toggle dark mode"
          class="rounded-sm"
        >
          {#if darkMode}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-espresso-800 dark:text-cream-100"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-espresso-800"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          {/if}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onclick={toggleMobileMenu}
          aria-label="Toggle menu"
          class="rounded-sm"
        >
          {#if mobileMenuOpen}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-espresso-800 dark:text-cream-100"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-espresso-800 dark:text-cream-100"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          {/if}
        </Button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div
      class="lg:hidden absolute top-full left-0 right-0 bg-cream-100/98 dark:bg-espresso-900/98 backdrop-blur-md border-b border-border/50 shadow-elevated"
    >
      <div class="container px-6 py-6 flex flex-col gap-1">
        {#each navLinks as link, index}
          <a
            href={link.href}
            class="px-4 py-3 text-base font-medium text-muted-foreground hover:text-espresso-800 dark:hover:text-cream-100 hover:bg-espresso-100/50 dark:hover:bg-espresso-800/50 rounded-sm transition-all duration-200"
            onclick={(e) => handleNavClick(e, link.href)}
            style="animation-delay: {index * 50}ms"
          >
            {link.name}
          </a>
        {/each}
        <div class="pt-4 pb-2">
          <Button
            onclick={(e) => handleNavClick(e, "#contact")}
            class="w-full rounded-sm py-6 bg-espresso-800 hover:bg-espresso-700 dark:bg-transparent dark:hover:bg-[#E11D2E] dark:text-[#E11D2E] dark:border dark:border-[#E11D2E] dark:hover:text-[#0B0B0B] text-cream-50 tracking-wider"
          >
            Let's Talk
          </Button>
        </div>
      </div>
    </div>
  {/if}
</nav>
