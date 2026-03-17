<script lang="ts">
    import { onMount } from "svelte";

    let isDarkMode = $state(false);

    onMount(() => {
        // Check initial dark mode state
        const checkDarkMode = () => {
            isDarkMode = document.documentElement.classList.contains("dark");
        };

        checkDarkMode();

        // Listen for dark mode changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            observer.disconnect();
        };
    });
</script>

<div class:spiderman-font={isDarkMode}>
    <slot />
</div>

<style>
    .spiderman-font {
        font-family: "SpiderMan", sans-serif !important;
    }
</style>
