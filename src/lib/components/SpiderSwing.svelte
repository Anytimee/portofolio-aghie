<script lang="ts">
    import { onMount } from "svelte";

    let isDarkMode = $state(false);

    onMount(() => {
        // Check if dark mode is active
        isDarkMode = document.documentElement.classList.contains("dark");

        // Listen for dark mode changes
        const observer = new MutationObserver(() => {
            isDarkMode = document.documentElement.classList.contains("dark");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    });
</script>

{#if isDarkMode}
    <div class="spider-swing-container" aria-hidden="true">
        <!-- Web line from top -->
        <div class="web-line"></div>

        <!-- Spider-Man silhouette swinging -->
        <div class="spiderman-swing">
            <svg
                viewBox="0 0 60 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <!-- Web line going up from hand -->
                <path
                    d="M45 35 L45 0"
                    stroke="rgba(225,29,46,0.6)"
                    stroke-width="2"
                    stroke-linecap="round"
                />

                <!-- Body (red suit) -->
                <path
                    d="M30 20 L30 65"
                    stroke="#E11D2E"
                    stroke-width="18"
                    stroke-linecap="round"
                />
                <path
                    d="M30 20 L30 65"
                    stroke="#0B0B0B"
                    stroke-width="2"
                    stroke-linecap="round"
                />

                <!-- Head with mask -->
                <circle cx="30" cy="12" r="12" fill="#E11D2E" />
                <circle
                    cx="30"
                    cy="12"
                    r="12"
                    stroke="#0B0B0B"
                    stroke-width="2"
                />

                <!-- White eyes on mask -->
                <rect x="23" y="8" width="6" height="4" rx="2" fill="white" />
                <rect x="31" y="8" width="6" height="4" rx="2" fill="white" />

                <!-- Arm (right - extended up holding web) -->
                <path
                    d="M38 25 L50 35"
                    stroke="#E11D2E"
                    stroke-width="8"
                    stroke-linecap="round"
                />
                <path
                    d="M38 25 L50 35"
                    stroke="#0B0B0B"
                    stroke-width="2"
                    stroke-linecap="round"
                />

                <!-- Arm (left - trailing behind) -->
                <path
                    d="M22 30 L10 45"
                    stroke="#E11D2E"
                    stroke-width="8"
                    stroke-linecap="round"
                />
                <path
                    d="M22 30 L10 45"
                    stroke="#0B0B0B"
                    stroke-width="2"
                    stroke-linecap="round"
                />

                <!-- Leg (right - swinging forward) -->
                <path
                    d="M36 60 L50 80"
                    stroke="#E11D2E"
                    stroke-width="10"
                    stroke-linecap="round"
                />
                <path
                    d="M36 60 L50 80"
                    stroke="#0B0B0B"
                    stroke-width="2"
                    stroke-linecap="round"
                />

                <!-- Leg (left - trailing) -->
                <path
                    d="M24 60 L10 75"
                    stroke="#E11D2E"
                    stroke-width="10"
                    stroke-linecap="round"
                />
                <path
                    d="M24 60 L10 75"
                    stroke="#0B0B0B"
                    stroke-width="2"
                    stroke-linecap="round"
                />

                <!-- Spider logo on chest -->
                <circle cx="30" cy="35" r="6" fill="#0B0B0B" />
                <path d="M30 29 L33 33 L30 38 L27 33 Z" fill="#E11D2E" />
            </svg>
        </div>
    </div>
{/if}

<style>
    .spider-swing-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 120px;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    }

    .web-line {
        position: absolute;
        top: 0;
        left: 45%;
        width: 2px;
        height: 100%;
        background: linear-gradient(
            to bottom,
            rgba(225, 29, 46, 0.6) 0%,
            rgba(225, 29, 46, 0.3) 50%,
            transparent 100%
        );
    }

    .spiderman-swing {
        position: absolute;
        top: 25px;
        width: 60px;
        height: 100px;
        animation: swing-across 3s ease-in-out forwards;
    }

    @keyframes swing-across {
        0% {
            left: -80px;
            transform: rotate(-30deg) scale(0.8);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        50% {
            left: 50%;
            transform: rotate(10deg) scale(1);
        }
        90% {
            opacity: 1;
        }
        100% {
            left: 110%;
            transform: rotate(-20deg) scale(0.8);
            opacity: 0;
        }
    }

    .spiderman-swing svg {
        width: 100%;
        height: 100%;
    }
</style>
