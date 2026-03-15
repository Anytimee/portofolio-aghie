<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		class?: string;
		children: Snippet;
	}

	let { open = $bindable(false), onOpenChange, class: className, children }: Props = $props();
</script>

{#if open}
	{@render children()}
{/if}
