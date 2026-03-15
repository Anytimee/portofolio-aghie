<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils";

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div class={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className)} {...restProps}>
	<div class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
		{@render children()}
	</div>
</div>
