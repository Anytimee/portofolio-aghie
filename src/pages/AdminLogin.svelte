<script lang="ts">
    import { authStore } from "$lib/stores/authStore";
    import SpidermanFont from "$lib/components/SpidermanFont.svelte";

    let password = $state("");
    let error = $state("");
    let isLoading = $state(false);

    function handleLogin(e: Event) {
        e.preventDefault();
        error = "";
        isLoading = true;

        setTimeout(() => {
            const success = authStore.login(password);
            if (success) {
                window.location.hash = "#/admin/dashboard";
                window.location.reload();
            } else {
                error = "Invalid password";
            }
            isLoading = false;
        }, 500);
    }
</script>

<!-- Full Black Background with Spider-Man Red Theme -->
<div
    class="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4 relative overflow-hidden"
>
    <!-- Spider-Web Background Pattern -->
    <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern
                    id="web"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M25 0 L25 50 M0 25 L50 25 M0 0 L50 50 M50 0 L0 50"
                        stroke="#E11D2E"
                        stroke-width="0.5"
                        fill="none"
                    />
                    <circle cx="25" cy="25" r="3" fill="#E11D2E" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#web)" />
        </svg>
    </div>

    <div class="max-w-md w-full relative z-10">
        <!-- Logo/Header - Spider-Man Style -->
        <div class="text-center mb-8">
            <SpidermanFont>
                <div
                    class="inline-flex items-center justify-center w-24 h-24 bg-[#E11D2E] rounded-full mb-4 shadow-lg ring-4 ring-[#E11D2E]/30"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-12 h-12 text-[#0B0B0B]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                        />
                    </svg>
                </div>
            </SpidermanFont>
            <SpidermanFont>
                <h1 class="text-4xl font-bold text-[#E11D2E] mb-2">ADMIN</h1>
            </SpidermanFont>
            <p class="text-white/50 mt-2">Access the project management</p>
        </div>

        <!-- Login Form - Dark Theme -->
        <form
            onsubmit={handleLogin}
            class="bg-[#1A1A1A] rounded-lg p-8 shadow-xl border-2 border-[#E11D2E]"
        >
            <div class="mb-6">
                <label
                    for="password"
                    class="block text-sm font-medium text-[#E11D2E]/80 mb-2"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    bind:value={password}
                    placeholder="Enter admin password"
                    class="w-full px-4 py-3 bg-[#0B0B0B] border border-[#E11D2E]/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#E11D2E] transition-all"
                />
            </div>

            {#if error}
                <div
                    class="mb-4 p-3 bg-[#E11D2E]/20 border border-[#E11D2E]/50 rounded-lg text-[#E11D2E] text-sm"
                >
                    {error}
                </div>
            {/if}

            <button
                type="submit"
                disabled={isLoading}
                class="w-full py-3 px-4 bg-[#E11D2E] hover:bg-[#B81828] text-[#0B0B0B] font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
                {isLoading ? "Accessing..." : "LOGIN"}
            </button>

            <div class="mt-6 text-center">
                <a
                    href="#/"
                    class="text-sm text-[#E11D2E]/60 hover:text-[#E11D2E] transition-colors"
                >
                    ← Back to Portfolio
                </a>
            </div>
        </form>

        <!-- Demo Hint -->
        <div
            class="mt-6 p-4 bg-[#1A1A1A]/50 rounded-lg text-center border border-[#E11D2E]/20"
        >
            <p class="text-white/50 text-sm">
                Demo password: <span class="text-[#E11D2E] font-mono"
                    >admin123</span
                >
            </p>
        </div>
    </div>
</div>
