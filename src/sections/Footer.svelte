<script lang="ts">
  import { socials } from '$lib/data/socials';
  import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-svelte';

  const currentYear = new Date().getFullYear();

  const iconMap: Record<string, typeof Github> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    mail: Mail
  };
</script>

<footer class="py-12 border-t border-border/50 bg-cream-100/30 dark:bg-espresso-900/30">
  <div class="container mx-auto px-6">
    <div class="flex flex-col items-center gap-8">
      <!-- Social Media Links -->
      <div class="flex items-center gap-2">
        {#each socials as social}
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="p-3 rounded-sm bg-transparent hover:bg-espresso-100 dark:hover:bg-espresso-800 border border-transparent hover:border-border text-muted-foreground hover:text-gold-500 transition-all duration-300"
            aria-label={social.name}
          >
            <svelte:component this={iconMap[social.icon] || Mail} size={20} />
          </a>
        {/each}
      </div>

      <!-- Divider -->
      <div class="w-32 h-px bg-espresso-200 dark:bg-espresso-700"></div>

      <!-- Copyright -->
      <div class="text-center">
        <p class="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
          <span>© {currentYear} All rights reserved.</span>
          <span class="flex items-center gap-1 text-gold-500">
            Made with SVETLE
          </span>
        </p>
      </div>
    </div>
  </div>
</footer>
