<script lang="ts">
  /**
   * Spider-Man Cursor Reveal Avatar Component
   * Shows spiderman.jpg through a circular cursor mask when hovering in dark mode
   * Only activates in dark mode
   */
  import ProtectedImage from "./ProtectedImage.svelte";

  let { showQuote = true, size = 280 } = $props();

  let isDarkMode = $state(false);
  let containerRef: HTMLDivElement;
  let mouseX = $state(50);
  let mouseY = $state(50);
  let isHovering = $state(false);

  // Check theme on mount and when it changes
  $effect(() => {
    const checkTheme = () => {
      isDarkMode = document.documentElement.classList.contains("dark");
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  });

  function handleMouseMove(event: MouseEvent) {
    if (!containerRef) return;

    const rect = containerRef.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    mouseX = x;
    mouseY = y;
  }

  function handleMouseEnter() {
    isHovering = true;
  }

  function handleMouseLeave() {
    isHovering = false;
  }
</script>

<div
  class="avatar-container"
  style="width: {size}px; height: {size}px;"
  bind:this={containerRef}
  onmousemove={handleMouseMove}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="img"
  aria-label="Avatar"
>
  <!-- Base Avatar (always visible) -->
  <ProtectedImage src="/avatar.jpg" alt="Avatar" className="base-avatar" />

  <!-- Spider-Man Layer (only visible in dark mode with cursor reveal) -->
  {#if isDarkMode}
    <div
      class="spiderman-layer"
      class:visible={isHovering}
      style="
        --mask-x: {mouseX}%;
        --mask-y: {mouseY}%;
      "
    >
      <ProtectedImage
        src="/spiderman.jpg"
        alt="Spider-Man Avatar"
        className="spiderman-avatar"
      />
    </div>
  {/if}
</div>

<style>
  .avatar-container {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    display: inline-block;
    cursor: pointer;
    z-index: 1;
  }

  .base-avatar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  .spiderman-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.2s ease;
    mask-image: radial-gradient(
      circle 80px at var(--mask-x) var(--mask-y),
      black 0%,
      black 100%,
      transparent 100%
    );
    -webkit-mask-image: radial-gradient(
      circle 80px at var(--mask-x) var(--mask-y),
      black 0%,
      black 100%,
      transparent 100%
    );
    mask-size: 100% 100%;
    -webkit-mask-size: 100% 100%;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
  }

  .spiderman-layer.visible {
    opacity: 1;
  }

  .spiderman-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
